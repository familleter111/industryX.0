/**
 * FAQ publiée, pour les réponses locales de l'assistant (lib/chat/local.ts).
 *
 * Le widget la demande à son ouverture à /api/chat/faq/<langue> : une route
 * en cache, rafraîchie par le webhook du CMS comme les pages. Une réponse
 * corrigée dans le Studio l'est donc aussi dans le chat, sans que chaque
 * page du site dépende du CMS. Tant qu'elle n'est pas arrivée, ou si l'appel
 * échoue, le fichier local répond. La requête n'emporte rien du visiteur.
 */

import type { ChatLocale } from '@/lib/chat/config'
import { FAQ_ENTRIES, type FaqEntry } from '@/lib/data/faq'

const loaded: Partial<Record<ChatLocale, FaqEntry[]>> = {}
const pending = new Set<ChatLocale>()

export const chatFaqPath = (locale: ChatLocale) => `/api/chat/faq/${locale}`

const isEntry = (value: unknown): value is FaqEntry =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as FaqEntry).question === 'string' &&
  typeof (value as FaqEntry).answer === 'string'

/** Charge la FAQ publiée de cette langue, une fois par visite (nouvel essai après un échec). */
export function prefetchChatFaq(locale: ChatLocale): Promise<void> {
  if (loaded[locale] || pending.has(locale)) return Promise.resolve()
  pending.add(locale)
  return fetch(chatFaqPath(locale))
    .then((response) => (response.ok ? response.json() : null))
    .then((body: { faq?: unknown } | null) => {
      if (Array.isArray(body?.faq) && body.faq.every(isEntry)) loaded[locale] = body.faq
    })
    .catch(() => {})
    .finally(() => pending.delete(locale))
}

/** La FAQ publiée si elle est arrivée, sinon celle du fichier local. */
export function chatFaq(locale: ChatLocale): FaqEntry[] {
  return loaded[locale] ?? FAQ_ENTRIES[locale]
}

/** Tests : oublie les FAQ chargées. */
export function resetChatFaq(): void {
  delete loaded.fr
  delete loaded.en
  pending.clear()
}
