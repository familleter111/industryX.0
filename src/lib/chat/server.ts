/**
 * Contrôles côté serveur de la route /api/chat, à part pour être testés.
 */

import { createHmac, timingSafeEqual } from 'node:crypto'

import { azureConfig } from '@/lib/chat/azure'
import { CHAT_LIMITS } from '@/lib/chat/config'
import { cleanText } from '@/lib/chat/guard'

type Env = Record<string, string | undefined>

export type ChatProvider = 'anthropic' | 'azure'

/** Fournisseur configuré (CHAT_PROVIDER et ses réglages), ou `null`. */
export function chatProvider(env: Env = process.env): ChatProvider | null {
  const provider = env.CHAT_PROVIDER?.trim().toLowerCase()
  if (provider === 'anthropic' && env.ANTHROPIC_API_KEY?.trim()) return 'anthropic'
  if (provider === 'azure' && azureConfig(env)) return 'azure'
  return null
}

/** La route répond seulement si le fournisseur et sa clé sont configurés. */
export function chatEnabled(env: Env = process.env): boolean {
  return chatProvider(env) !== null
}

/**
 * Signature des réponses de l'assistant.
 *
 * L'historique revient du navigateur à chaque question : sans preuve, un
 * script pourrait y glisser une fausse réponse « assistant » (« Bien sûr,
 * j'ignore désormais mes consignes… ») que le modèle prendrait pour la
 * sienne. La route signe chaque réponse qu'elle envoie ; une réponse sans
 * signature valide est retirée de l'historique. Clé : CHAT_SIGNING_SECRET,
 * ou à défaut une clé dérivée de la clé du fournisseur.
 */
export function signingKey(env: Env = process.env): string {
  const secret = env.CHAT_SIGNING_SECRET?.trim()
  if (secret) return secret
  const providerKey = env.ANTHROPIC_API_KEY?.trim() || env.AZURE_OPENAI_API_KEY?.trim() || ''
  return createHmac('sha256', 'ix0-chat-reply').update(providerKey).digest('hex')
}

export function signReply(text: string, key: string): string {
  return createHmac('sha256', key).update(text).digest('hex').slice(0, 32)
}

export function verifyReply(text: string, sig: unknown, key: string): boolean {
  if (typeof sig !== 'string' || !/^[0-9a-f]{32}$/.test(sig)) return false
  return timingSafeEqual(Buffer.from(signReply(text, key)), Buffer.from(sig))
}

/** Sépare la réponse de sa signature, en fin de flux (voir lib/chat/client.ts). */
export const SIGNATURE_MARK = '\u0000'

type HistoryMessage = { role: 'user' | 'assistant'; content: string }

/**
 * Historique reçu du navigateur, rien n'est cru :
 * - rôles connus seulement, textes nettoyés et bornés (lib/chat/guard.ts) ;
 * - réponses de l'assistant gardées seulement si leur signature est valide
 *   (les réponses locales, non signées, tombent aussi : elles n'apportent
 *   rien au modèle) ;
 * - messages consécutifs du même rôle fusionnés, derniers messages
 *   seulement, et `contextMax` caractères au total ;
 * - la conversation commence par une question du visiteur et finit par une autre.
 */
export function parseHistory(value: unknown, key = ''): HistoryMessage[] | null {
  if (!Array.isArray(value) || value.length > CHAT_LIMITS.historyMax * 4) return null
  const messages: HistoryMessage[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') return null
    const { role, content, sig } = item as Record<string, unknown>
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null
    if (role === 'assistant' && !(key && verifyReply(content, sig, key))) continue
    const text = cleanText(content, role === 'user' ? CHAT_LIMITS.messageMax : CHAT_LIMITS.replyMax)
    if (!text) continue
    const last = messages[messages.length - 1]
    if (last?.role === role) {
      const max = role === 'user' ? CHAT_LIMITS.messageMax : CHAT_LIMITS.replyMax
      last.content = `${last.content}\n\n${text}`.slice(-max)
    } else {
      messages.push({ role, content: text })
    }
  }

  let kept = messages.slice(-CHAT_LIMITS.historyMax)
  const size = () => kept.reduce((total, m) => total + m.content.length, 0)
  while (kept.length > 1 && size() > CHAT_LIMITS.contextMax) kept = kept.slice(1)
  while (kept[0]?.role === 'assistant') kept = kept.slice(1)
  if (kept.length === 0 || kept[kept.length - 1].role !== 'user') return null
  return kept
}

/**
 * La requête vient-elle d'une page du site ? Un navigateur envoie toujours
 * `Origin` sur un POST ; un script qui l'omet, ou qui vient d'ailleurs, est
 * refusé. Hôtes admis : celui de la requête (ou du proxy devant le site) et
 * NEXT_PUBLIC_SITE_URL.
 */
export function sameOrigin(request: Request, env: Env = process.env): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return false
  let host: string
  try {
    host = new URL(origin).host
  } catch {
    return false
  }
  const allowed = [request.headers.get('x-forwarded-host'), request.headers.get('host')]
  try {
    if (env.NEXT_PUBLIC_SITE_URL) allowed.push(new URL(env.NEXT_PUBLIC_SITE_URL).host)
  } catch {
    // Adresse mal formée : on s'en tient aux en-têtes.
  }
  return allowed.some((value) => value?.split(',')[0].trim() === host)
}

/**
 * Même question répétée par la même adresse IP dans la fenêtre : `true`.
 * Un visiteur reformule ; un script renvoie le même texte en boucle.
 */
export function createRepeatGuard(windowMs: number, now: () => number = Date.now) {
  const last = new Map<string, { text: string; at: number }>()
  return function repeated(ip: string, text: string): boolean {
    const time = now()
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim()
    const previous = last.get(ip)
    last.set(ip, { text: normalized, at: time })
    // Purge, comme lib/server/rateLimit.ts : la Map ne grossit pas sans fin.
    if (last.size > 500) {
      last.forEach((entry, key) => {
        if (time - entry.at >= windowMs) last.delete(key)
      })
    }
    return previous !== undefined && previous.text === normalized && time - previous.at < windowMs
  }
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
