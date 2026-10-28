/**
 * Assistant de chat IA : la question du visiteur part vers le modèle, Azure
 * OpenAI (lib/chat/azure.ts) ou Claude (Anthropic), et la réponse revient en
 * flux texte, lettre après lettre dans le widget.
 *
 * Désactivée par défaut. Elle ne répond que si CHAT_PROVIDER (azure ou
 * anthropic) et ses réglages sont définis ; sinon 404, et le widget reste en
 * mode local (lib/chat/local.ts). Voir docs/chatbot.md.
 *
 * Antispam, du moins cher au plus cher : origine du site, taille du corps,
 * rafales par IP, champ piège, contenu (lib/chat/guard.ts), question
 * répétée, plafond quotidien. Un refus ne coûte aucun appel au modèle ; le
 * widget répond alors en mode local.
 *
 * Rien n'est enregistré : ni base, ni journal du contenu des messages.
 */

import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

import { azureConfig, AzureError, streamAzure } from '@/lib/chat/azure'
import type { ChatLocale } from '@/lib/chat/config'
import { spamReason } from '@/lib/chat/guard'
import { chatSystemPrompt } from '@/lib/chat/prompt'
import {
  chatProvider,
  createDailyQuota,
  createRepeatGuard,
  dailyLimit,
  parseHistory,
  sameOrigin,
  SIGNATURE_MARK,
  signingKey,
  signReply,
  supportsServerFallback,
} from '@/lib/chat/server'
import { clientIp, createRateLimiter } from '@/lib/server/rateLimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Modèle par défaut : Claude Haiku 5.5, le moins cher, suffisant pour des
 * questions simples sur le site. CHAT_MODEL permet d'en changer sans toucher
 * au code.
 */
const DEFAULT_MODEL = 'claude-haiku-5-5'

/**
 * Plafond de questions IA par jour (CHAT_DAILY_LIMIT, 50 par défaut). Au-delà,
 * la route répond 429 et le widget repasse en réponses locales : le coût
 * quotidien est borné quoi qu'il arrive.
 */
const quota = createDailyQuota(dailyLimit())

/** 20 questions par IP et par tranche de 10 minutes… */
const rateLimited = createRateLimiter(20, 10 * 60 * 1000)
/** …et pas plus de 3 en 20 secondes : un humain lit la réponse avant de relancer. */
const burstLimited = createRateLimiter(3, 20 * 1000)
/** La même question deux fois en 2 minutes, depuis la même IP. */
const repeated = createRepeatGuard(2 * 60 * 1000)

/** Corps de requête maximal : l'historique borné tient largement dedans. */
const MAX_BODY_BYTES = 32 * 1024

const FALLBACK_TEXT: Record<ChatLocale, string> = {
  fr: 'Je ne peux pas répondre à cette question. Notre équipe peut vous aider via le formulaire de contact.',
  en: 'I can’t answer that question. Our team can help you through the contact form.',
}

const refuse = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status })

export async function POST(request: Request) {
  const provider = chatProvider()
  if (!provider) return refuse('chat-disabled', 404)
  if (!sameOrigin(request)) return refuse('forbidden', 403)

  const ip = clientIp(request)
  if (rateLimited(ip) || burstLimited(ip)) return refuse('too-many-requests', 429)

  const raw = await request.text().catch(() => '')
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return refuse('too-large', 413)

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(raw) as Record<string, unknown>
  } catch {
    return refuse('unreadable', 400)
  }
  if (!payload || typeof payload !== 'object') return refuse('unreadable', 400)

  // Champ piège : invisible pour un visiteur, rempli par les robots naïfs.
  if (typeof payload.website === 'string' && payload.website !== '') return refuse('spam', 422)

  const locale: ChatLocale = payload.locale === 'en' ? 'en' : 'fr'
  const key = signingKey()
  const messages = parseHistory(payload.messages, key)
  if (!messages) return refuse('invalid-messages', 422)

  const question = messages[messages.length - 1].content
  if (spamReason(question) || repeated(ip, question)) return refuse('spam', 422)

  // Compté après tous les contrôles : une requête refusée ne consomme rien.
  if (!quota.take()) return refuse('daily-quota', 429)

  const reply = provider === 'azure' ? azureReply(messages, locale) : anthropicReply(messages, locale)

  const encoder = new TextEncoder()
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Texte réellement envoyé, signé en fin de flux (lib/chat/server.ts).
      let sent = ''
      const send = (text: string) => {
        const safe = text.split(SIGNATURE_MARK).join('')
        sent += safe
        controller.enqueue(encoder.encode(safe))
      }
      try {
        for await (const text of reply.text) send(text)
        if ((await reply.refused()) || !sent) {
          send((sent ? '\n\n' : '') + FALLBACK_TEXT[locale])
        }
      } catch (error) {
        // Statut seulement : le contenu de la conversation ne va pas dans les logs.
        const status =
          error instanceof Anthropic.APIError || error instanceof AzureError ? error.status : 'réseau'
        console.error('[chat] échec de la réponse IA :', status)
        send((sent ? '\n\n' : '') + FALLBACK_TEXT[locale])
      } finally {
        try {
          controller.enqueue(encoder.encode(SIGNATURE_MARK + signReply(sent, key)))
          controller.close()
        } catch {
          // Flux déjà fermé par le visiteur : plus personne à qui répondre.
        }
      }
    },
    cancel() {
      // Le visiteur a fermé le chat : inutile de payer la suite de la réponse.
      reply.abort()
    },
  })

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

type Turn = { role: 'user' | 'assistant'; content: string }

/** Réponse d'un fournisseur : texte en flux, refus éventuel, arrêt. */
type Reply = { text: AsyncIterable<string>; refused: () => Promise<boolean>; abort: () => void }

/** Réponses courtes demandées par les consignes ; la marge couvre la réflexion du modèle. */
const MAX_OUTPUT_TOKENS = 1500

function anthropicReply(messages: Turn[], locale: ChatLocale): Reply {
  const model = process.env.CHAT_MODEL?.trim() || DEFAULT_MODEL
  const stream = new Anthropic().beta.messages.stream({
    model,
    max_tokens: MAX_OUTPUT_TOKENS,
    // Questions simples : effort bas, réponses rapides et peu coûteuses.
    output_config: { effort: 'low' },
    // Si le modèle décline une question, l'API la confie à un autre modèle,
    // sur les modèles qui le permettent (pas Claude Haiku 5.5).
    ...(supportsServerFallback(model)
      ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const }
      : {}),
    // Consignes + base de connaissances : identiques à chaque question,
    // donc mises en cache par l'API.
    system: [{ type: 'text', text: chatSystemPrompt(locale), cache_control: { type: 'ephemeral' } }],
    messages,
  })
  return {
    text: (async function* () {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') yield event.delta.text
      }
    })(),
    refused: async () => (await stream.finalMessage()).stop_reason === 'refusal',
    abort: () => stream.abort(),
  }
}

function azureReply(messages: Turn[], locale: ChatLocale): Reply {
  const controller = new AbortController()
  const outcome = { refused: false }
  // Consignes identiques à chaque question : Azure met le préfixe en cache seul.
  const text = streamAzure(
    azureConfig()!,
    { system: chatSystemPrompt(locale), messages, maxTokens: MAX_OUTPUT_TOKENS, signal: controller.signal },
    outcome,
  )
  return { text, refused: async () => outcome.refused, abort: () => controller.abort() }
}
