/**
 * Contrôles côté serveur de la route /api/chat, à part pour être testés.
 */

import type Anthropic from '@anthropic-ai/sdk'

import { CHAT_LIMITS } from '@/lib/chat/config'

/** La route répond seulement si le fournisseur et sa clé sont configurés. */
export function chatEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.CHAT_PROVIDER?.trim().toLowerCase() === 'anthropic' && Boolean(env.ANTHROPIC_API_KEY?.trim())
}

/**
 * Historique reçu du navigateur, rien n'est cru : rôles connus seulement,
 * textes bornés, derniers messages seulement, et la conversation doit
 * commencer par une question du visiteur et finir par une autre.
 */
export function parseHistory(value: unknown): Anthropic.MessageParam[] | null {
  if (!Array.isArray(value)) return null
  const messages: Anthropic.MessageParam[] = []
  for (const item of value.slice(-CHAT_LIMITS.historyMax)) {
    if (!item || typeof item !== 'object') return null
    const { role, content } = item as Record<string, unknown>
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null
    const text = content.trim().slice(0, CHAT_LIMITS.messageMax)
    if (text) messages.push({ role, content: text })
  }
  while (messages[0]?.role === 'assistant') messages.shift()
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') return null
  return messages
}

/** Plafond par défaut de questions envoyées à l'IA, par jour, tous visiteurs confondus. */
export const DEFAULT_DAILY_LIMIT = 50

/** CHAT_DAILY_LIMIT, ou le plafond par défaut si la valeur est absente ou invalide. */
export function dailyLimit(env: Record<string, string | undefined> = process.env): number {
  const value = env.CHAT_DAILY_LIMIT?.trim()
  const limit = value ? Number(value) : NaN
  return Number.isInteger(limit) && limit >= 0 ? limit : DEFAULT_DAILY_LIMIT
}

/**
 * Compteur quotidien de questions IA, remis à zéro chaque jour (UTC).
 *
 * Garde-fou applicatif : il vit en mémoire et repart de zéro à chaque
 * redémarrage du serveur. La vraie garantie de coût reste la limite de
 * dépense fixée dans la console Anthropic (docs/chatbot.md).
 */
export function createDailyQuota(limit: number, now: () => Date = () => new Date()) {
  let day = ''
  let used = 0
  return {
    /** Consomme une question ; `false` si le plafond du jour est atteint. */
    take(): boolean {
      const today = now().toISOString().slice(0, 10)
      if (today !== day) {
        day = today
        used = 0
      }
      if (used >= limit) return false
      used += 1
      return true
    },
  }
}

/**
 * Modèles qui acceptent le repli serveur `fallbacks: "default"` sur l'API
 * Claude. Claude Haiku 5.5 n'en a pas : une question déclinée reçoit alors
 * le message de repli de la route.
 */
const SERVER_FALLBACK_MODELS = ['claude-fable-5-1', 'claude-opus-5-5', 'claude-opus-5', 'claude-sonnet-5-5']

export function supportsServerFallback(model: string): boolean {
  return SERVER_FALLBACK_MODELS.includes(model)
}
