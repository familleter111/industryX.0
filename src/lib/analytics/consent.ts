/**
 * Consentement à la mesure d'audience.
 *
 * Trois états :
 *   - pas encore de réponse (`null`) : PostHog compte les visites en mémoire,
 *     sans cookie ni stockage — rien ne survit au rechargement ;
 *   - `granted` : PostHog et l'attribution UTM persistent (cookie, stockage) ;
 *   - `denied`  : aucun événement n'est envoyé.
 *
 * Le choix lui-même est un cookie strictement nécessaire (il sert à ne pas
 * redemander), gardé 6 mois — en dessous des 13 mois recommandés par la CNIL.
 */

export type Consent = 'granted' | 'denied'

export const CONSENT_COOKIE = 'ix0_consent'
const MAX_AGE = 60 * 60 * 24 * 180

/** Émis sur `window` quand le visiteur répond, avec le choix en `detail`. */
export const CONSENT_EVENT = 'ix0:consent'
/** Émis par le lien « Gérer les cookies » pour rouvrir le bandeau. */
export const OPEN_CONSENT_EVENT = 'ix0:consent-open'

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`))
  return (match?.[1] as Consent | undefined) ?? null
}

export function writeConsent(consent: Consent) {
  document.cookie = `${CONSENT_COOKIE}=${consent}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax`
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }))
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
