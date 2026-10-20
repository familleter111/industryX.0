/**
 * Assistant de chat IA : la question du visiteur part vers Claude (Anthropic),
 * la réponse revient en flux texte, lettre après lettre dans le widget.
 *
 * Désactivée par défaut. Elle ne répond que si CHAT_PROVIDER=anthropic et
 * ANTHROPIC_API_KEY sont définis ; sinon 404, et le widget reste en mode
 * local (lib/chat/local.ts). Voir docs/chatbot.md.
 *
 * Rien n'est enregistré : ni base, ni journal du contenu des messages.
 */

import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

import type { ChatLocale } from '@/lib/chat/config'
import { chatSystemPrompt } from '@/lib/chat/prompt'
import {
  chatEnabled,
  createDailyQuota,
  dailyLimit,
  parseHistory,
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

/** 20 questions par IP et par tranche de 10 minutes. */
const rateLimited = createRateLimiter(20, 10 * 60 * 1000)

const FALLBACK_TEXT: Record<ChatLocale, string> = {
  fr: 'Je ne peux pas répondre à cette question. Notre équipe peut vous aider via le formulaire de contact.',
  en: 'I can’t answer that question. Our team can help you through the contact form.',
}

export async function POST(request: Request) {
  if (!chatEnabled()) {
    return NextResponse.json({ ok: false, error: 'chat-disabled' }, { status: 404 })
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: 'too-many-requests' }, { status: 429 })
  }

  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'unreadable' }, { status: 400 })
  }

  const locale: ChatLocale = payload?.locale === 'en' ? 'en' : 'fr'
  const messages = parseHistory(payload?.messages)
  if (!messages) {
    return NextResponse.json({ ok: false, error: 'invalid-messages' }, { status: 422 })
  }

  // Compté après la validation : une requête invalide ne consomme rien.
  if (!quota.take()) {
    return NextResponse.json({ ok: false, error: 'daily-quota' }, { status: 429 })
  }

  const model = process.env.CHAT_MODEL?.trim() || DEFAULT_MODEL
  const client = new Anthropic()
  const stream = client.beta.messages.stream({
    model,
    // Réponses courtes demandées par les consignes ; la marge couvre la
    // réflexion du modèle, comptée dans ce plafond.
    max_tokens: 2000,
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

  const encoder = new TextEncoder()
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sent = false
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            sent = true
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
        const final = await stream.finalMessage()
        if (final.stop_reason === 'refusal' || !sent) {
          controller.enqueue(encoder.encode((sent ? '\n\n' : '') + FALLBACK_TEXT[locale]))
        }
      } catch (error) {
        // Statut seulement : le contenu de la conversation ne va pas dans les logs.
        const status = error instanceof Anthropic.APIError ? error.status : 'réseau'
        console.error('[chat] échec de la réponse IA :', status)
        controller.enqueue(encoder.encode((sent ? '\n\n' : '') + FALLBACK_TEXT[locale]))
      } finally {
        controller.close()
      }
    },
    cancel() {
      // Le visiteur a fermé le chat : inutile de payer la suite de la réponse.
      stream.abort()
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
