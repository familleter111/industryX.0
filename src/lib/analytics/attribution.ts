/**
 * Attribution des visites : d'où vient le visiteur (campagne, QR code, site
 * référent), pour la rattacher à ses événements et à sa demande de démo.
 *
 * Deux « touches » :
 *   - first : la toute première arrivée connue, gardée 90 jours ;
 *   - last  : la dernière arrivée porteuse d'une source (UTM, ref, référent
 *     externe), le temps de la session. Une navigation interne ou une visite
 *     directe ne l'écrase pas.
 *
 * Tant que le visiteur n'a pas consenti, tout reste en mémoire : la touche
 * suit la navigation dans le site (l'App Router ne recharge pas la page) mais
 * disparaît au rechargement. Le consentement la fait persister.
 *
 * Paramètres lus : utm_source, utm_medium, utm_campaign, utm_content,
 * utm_term, et `ref` pour les QR codes et URL dédiées (salons, radio…).
 */

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
export type UtmKey = (typeof UTM_KEYS)[number]

export type Touch = Partial<Record<UtmKey | 'ref', string>> & {
  /** Hôte du site référent (www.linkedin.com), jamais l'URL complète. */
  referrer?: string
  /** Chemin d'arrivée, sans paramètres. */
  landing: string
  /** Date ISO de l'arrivée. */
  at: string
}

export type Attribution = { first?: Touch; last?: Touch }

const FIRST_COOKIE = 'ix0_ft'
const FIRST_MAX_AGE = 60 * 60 * 24 * 90
const LAST_KEY = 'ix0_lt'
const VALUE_MAX = 100

/** Borne une valeur venue de l'URL : sans caractère de contrôle, 100 caractères au plus. */
export function cleanValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  // eslint-disable-next-line no-control-regex
  const cleaned = value.replace(/[\u0000-\u001f\u007f<>"]/g, '').trim().slice(0, VALUE_MAX)
  return cleaned || undefined
}

/**
 * Touche portée par une arrivée, ou `null` si elle n'en porte aucune
 * (visite directe, navigation interne).
 */
export function parseTouch(url: URL, referrer: string, now = new Date()): Touch | null {
  const touch: Touch = { landing: url.pathname.slice(0, VALUE_MAX), at: now.toISOString() }
  let found = false

  for (const key of [...UTM_KEYS, 'ref'] as const) {
    const value = cleanValue(url.searchParams.get(key))
    if (value) {
      touch[key] = value.toLowerCase()
      found = true
    }
  }

  if (referrer) {
    try {
      const host = new URL(referrer).hostname
      if (host && host !== url.hostname) {
        touch.referrer = host
        found = true
      }
    } catch {
      // Référent illisible : ignoré.
    }
  }

  return found ? touch : null
}

/** Visite sans source connue. */
export function directTouch(url: URL, now = new Date()): Touch {
  return { utm_source: 'direct', landing: url.pathname.slice(0, VALUE_MAX), at: now.toISOString() }
}

/** Nouvelle attribution après une arrivée. */
export function nextAttribution(previous: Attribution, url: URL, referrer: string, now = new Date()): Attribution {
  const touch = parseTouch(url, referrer, now)
  return {
    first: previous.first ?? touch ?? directTouch(url, now),
    last: touch ?? previous.last,
  }
}

/** Résumé lisible d'une touche, pour une cellule de tableur : « linkedin / social / salon-2026-11 ». */
export function describeTouch(touch?: Touch): string {
  if (!touch) return ''
  const parts = [touch.utm_source ?? touch.referrer ?? 'direct', touch.utm_medium, touch.utm_campaign]
  if (touch.ref) parts.push(`ref:${touch.ref}`)
  return parts.filter(Boolean).join(' / ')
}

/**
 * Ajoute la source de la visite à un lien sortant (Enti Win…) : l'outil
 * d'arrivée attribue ainsi ses conversions à la bonne campagne, et peut
 * relier son parcours à celui du site via `ix0_id`.
 */
export function withAttribution(href: string, attribution: Attribution, distinctId?: string): string {
  let url: URL
  try {
    url = new URL(href)
  } catch {
    return href
  }
  const touch = attribution.last ?? attribution.first
  for (const key of [...UTM_KEYS, 'ref'] as const) {
    const value = touch?.[key]
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value)
  }
  if (distinctId) url.searchParams.set('ix0_id', distinctId)
  return url.toString()
}

/* ------------------------------------------------- validation serveur */

function cleanTouch(value: unknown): Touch | undefined {
  if (!value || typeof value !== 'object') return undefined
  const raw = value as Record<string, unknown>
  const touch: Touch = { landing: cleanValue(raw.landing) ?? '', at: cleanValue(raw.at) ?? '' }
  for (const key of [...UTM_KEYS, 'ref', 'referrer'] as const) {
    const cleaned = cleanValue(raw[key])
    if (cleaned) touch[key] = cleaned
  }
  return touch
}

/** Attribution reçue d'un formulaire : rien n'est cru, tout est borné. */
export function cleanAttribution(value: unknown): Attribution {
  if (!value || typeof value !== 'object') return {}
  const raw = value as Record<string, unknown>
  return { first: cleanTouch(raw.first), last: cleanTouch(raw.last) }
}

/* ---------------------------------------------------- navigateur */

let current: Attribution = {}

function readStored(): Attribution {
  const stored: Attribution = {}
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${FIRST_COOKIE}=([^;]*)`))
    if (match) stored.first = cleanTouch(JSON.parse(decodeURIComponent(match[1])))
    const last = sessionStorage.getItem(LAST_KEY)
    if (last) stored.last = cleanTouch(JSON.parse(last))
  } catch {
    // Stockage bloqué ou valeur corrompue : on repart de zéro.
  }
  return stored
}

/** Enregistre l'arrivée en cours ; ne persiste que si `persist` (consentement). */
export function captureAttribution(persist: boolean) {
  const stored = readStored()
  current = nextAttribution(
    { first: current.first ?? stored.first, last: current.last ?? stored.last },
    new URL(window.location.href),
    document.referrer,
  )
  if (persist) persistAttribution()
}

/** Écrit l'attribution en mémoire dans le cookie et la session (après consentement). */
export function persistAttribution() {
  try {
    if (current.first) {
      const value = encodeURIComponent(JSON.stringify(current.first))
      document.cookie = `${FIRST_COOKIE}=${value}; Max-Age=${FIRST_MAX_AGE}; Path=/; SameSite=Lax`
    }
    if (current.last) sessionStorage.setItem(LAST_KEY, JSON.stringify(current.last))
  } catch {
    // Stockage bloqué : l'attribution reste en mémoire.
  }
}

/** Efface toute trace stockée (refus du consentement). */
export function clearStoredAttribution() {
  try {
    document.cookie = `${FIRST_COOKIE}=; Max-Age=0; Path=/`
    sessionStorage.removeItem(LAST_KEY)
  } catch {
    // Rien à effacer.
  }
}

export function getAttribution(): Attribution {
  return current
}

/**
 * Colonnes d'attribution d'un lead, depuis le corps d'un formulaire
 * (`attribution`, `posthogId`). Partagé par /api/contact et /api/subscribe.
 */
export function leadAttribution(payload: Record<string, unknown>) {
  const { first, last } = cleanAttribution(payload.attribution)
  return {
    utmSource: last?.utm_source ?? '',
    utmMedium: last?.utm_medium ?? '',
    utmCampaign: last?.utm_campaign ?? '',
    ref: last?.ref ?? '',
    referrer: last?.referrer ?? '',
    firstTouch: describeTouch(first),
    posthogId: cleanValue(payload.posthogId) ?? '',
  }
}
