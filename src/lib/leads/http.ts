/**
 * Appels HTTP sortants des leads (CRM, webhook, email de secours).
 *
 * Chaque appel a un délai maximum et une seconde chance : une coupure réseau
 * ou un 5xx passager ne doit pas coûter un prospect. Une erreur 4xx, elle,
 * ne se corrige pas en réessayant (token invalide, champ inconnu) : elle
 * remonte tout de suite.
 *
 * Les erreurs ne portent que le statut et l'URL sans paramètres : le corps de
 * réponse d'un CRM renvoie souvent l'email du contact, il ne doit pas finir
 * dans les logs. Il reste lisible dans `body` pour le code qui en a besoin.
 */

export const TIMEOUT_MS = 8000
export const ATTEMPTS = 2
export const BACKOFF_MS = 600

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly url: string,
    /** Corps de la réponse. Ne pas journaliser : peut contenir des données personnelles. */
    readonly body: string,
  ) {
    super(`HTTP ${status} ${url}`)
    this.name = 'HttpError'
  }
}

/** URL sans paramètres ni fragment, pour les messages d'erreur. */
function safeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    return `${parsed.origin}${parsed.pathname}`
  } catch {
    return 'url-invalide'
  }
}

function retryable(error: unknown): boolean {
  if (error instanceof HttpError) return error.status === 429 || error.status >= 500
  return true // délai dépassé, réseau coupé, DNS…
}

/**
 * Corps d'une réponse réussie. Un 2xx non JSON (n8n, Make et Zapier
 * répondent parfois « Accepted ») reste un succès : il ne doit surtout pas
 * déclencher un nouvel essai, qui doublerait le lead.
 */
function parseBody(body: string): unknown {
  if (!body) return null
  try {
    return JSON.parse(body)
  } catch {
    return null
  }
}

/**
 * Cause lisible d'un échec sans réponse HTTP : délai dépassé, ou code réseau
 * (ECONNREFUSED, ENOTFOUND…) que `fetch` range dans `cause`.
 */
function networkReason(error: unknown): string {
  if (!(error instanceof Error)) return 'erreur'
  if (error.name === 'TimeoutError' || error.name === 'AbortError') return 'délai dépassé'
  const code = (error.cause as { code?: unknown } | undefined)?.code
  return typeof code === 'string' ? code : error.name
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export type RequestOptions = {
  timeoutMs?: number
  attempts?: number
  backoffMs?: number
}

/**
 * `fetch` avec délai, nouvel essai et lecture JSON. Renvoie le corps décodé
 * (ou `null` pour une réponse vide, 204 compris).
 */
export async function requestJson<T = unknown>(
  url: string,
  init: RequestInit,
  { timeoutMs = TIMEOUT_MS, attempts = ATTEMPTS, backoffMs = BACKOFF_MS }: RequestOptions = {},
): Promise<T> {
  let lastError: unknown

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) })
      const body = await response.text()
      if (!response.ok) throw new HttpError(response.status, safeUrl(url), body)
      return parseBody(body) as T
    } catch (error) {
      lastError =
        error instanceof HttpError
          ? error
          : new Error(`${safeUrl(url)} : ${networkReason(error)}`)
      if (attempt === attempts || !retryable(error)) break
      await wait(backoffMs * 2 ** (attempt - 1))
    }
  }

  throw lastError
}

/* ------------------------------------------------------------- logs */

/** a***@usine.tn */
export function maskEmail(email: string): string {
  const [user, domain] = email.split('@')
  if (!domain) return '***'
  return `${user.slice(0, 1)}***@${domain}`
}

/** +216******56 */
export function maskPhone(phone: string): string {
  if (!phone) return ''
  return `${phone.slice(0, 4)}${'*'.repeat(Math.max(0, phone.length - 6))}${phone.slice(-2)}`
}

/** Message d'erreur sûr à journaliser. */
export function errorSummary(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

/** Échappe le texte saisi avant de l'insérer dans une note HTML de CRM. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>')
}
