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

import { loadFaq } from '@/lib/cms/faq'
import { azureConfig, AzureError, streamAzure } from '@/lib/chat/azure'
import type { ChatLocale } from '@/lib/chat/config'
import { spamReason } from '@/lib/chat/guard'
import { chatPassages, type Passage } from '@/lib/chat/passages'
import { chatSystemBlocks, type SystemBlocks } from '@/lib/chat/prompt'
import { retrievePassages } from '@/lib/chat/retrieve'
import {
  chatProvider,
  chatRetrieval,
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
import type { FaqEntry } from '@/lib/data/faq'
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

/**
 * FAQ publiée dans le CMS, pour la base de connaissances (lib/cms/faq.ts ;
 * repli : le fichier local). La route est dynamique, donc sans cache de
 * fetch : la FAQ est gardée 5 minutes en mémoire plutôt que relue à chaque
 * question.
 */
const FAQ_TTL_MS = 5 * 60 * 1000
const faqCache = new Map<ChatLocale, { at: number; faq: Promise<FaqEntry[]>; passages: Promise<Passage[]> }>()

/**
 * FAQ publiée et, avec elle, les passages de la recherche documentaire : la
 * même liste est réutilisée d'une question à l'autre, donc son index
 * (lib/chat/retrieve.ts) n'est construit qu'une fois par cycle.
 */
function published(locale: ChatLocale) {
  const cached = faqCache.get(locale)
  if (cached && Date.now() - cached.at < FAQ_TTL_MS) return cached
  const faq = loadFaq(locale)
  const entry = { at: Date.now(), faq, passages: faq.then((entries) => chatPassages(locale, entries)) }
  faqCache.set(locale, entry)
  return entry
}

/** Passages envoyés avec chaque question (CHAT_RETRIEVAL=keyword). */
const PASSAGES_PER_QUESTION = 8

/** Les passages proches de la question, ou `undefined` quand la recherche est coupée. */
async function retrieved(locale: ChatLocale, messages: Turn[]): Promise<Passage[] | undefined> {
  if (chatRetrieval() !== 'keyword') return undefined
  const questions = messages.filter((m) => m.role === 'user').map((m) => m.content)
  const question = questions[questions.length - 1]
  const previous = questions[questions.length - 2]
  return retrievePassages(question, await published(locale).passages, PASSAGES_PER_QUESTION, previous)
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

  // Recherche documentaire après tous les contrôles et le quota : un refus
  // n'a rien coûté, pas même un classement.
  const system = chatSystemBlocks(locale, await published(locale).faq, await retrieved(locale, messages))
  const reply = provider === 'azure' ? azureReply(messages, system) : anthropicReply(messages, system)

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

function anthropicReply(messages: Turn[], system: SystemBlocks): Reply {
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
    // donc mises en cache par l'API. Les passages retrouvés, propres à la
    // question, suivent dans un bloc sans cache.
    system: [
      { type: 'text', text: system.stable, cache_control: { type: 'ephemeral' } },
      ...(system.retrieved ? [{ type: 'text' as const, text: system.retrieved }] : []),
    ],
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

function azureReply(messages: Turn[], system: SystemBlocks): Reply {
  const controller = new AbortController()
  const outcome = { refused: false }
  // Consignes identiques à chaque question : Azure met le préfixe en cache
  // seul. Les passages retrouvés viennent après, hors du préfixe.
  const instructions = system.retrieved ? `${system.stable}\n\n${system.retrieved}` : system.stable
  const text = streamAzure(
    azureConfig()!,
    { system: instructions, messages, maxTokens: MAX_OUTPUT_TOKENS, signal: controller.signal },
    outcome,
  )
  return { text, refused: async () => outcome.refused, abort: () => controller.abort() }
}
