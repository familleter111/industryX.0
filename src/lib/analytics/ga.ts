import type { Consent } from './consent'

/**
 * Google Analytics 4, côté navigateur.
 *
 * Contrairement à PostHog, GA n'est chargé qu'après « Accepter » : avant
 * réponse ou après un refus, aucune requête ne part vers Google. Sans
 * NEXT_PUBLIC_GA_ID (dev, tests, preview), rien n'est chargé.
 *
 * Les pages vues de l'App Router (changements d'URL sans rechargement) sont
 * comptées par la « mesure améliorée » de GA4, active par défaut sur le flux.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

export const gaEnabled = GA_ID !== ''

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

let loaded = false

function disable(off: boolean) {
  ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = off
}

/** Charge gtag.js une seule fois, quand le visiteur a accepté. */
function load() {
  if (loaded) return
  loaded = true
  window.dataLayer = window.dataLayer || []
  // gtag doit pousser l'objet `arguments` lui-même, pas un tableau.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { cookie_expires: 60 * 60 * 24 * 180 })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

/** Applique le choix du visiteur : chargement si accepté, coupure si refusé. */
export function applyGaConsent(consent: Consent | null) {
  if (!gaEnabled || typeof window === 'undefined') return
  if (consent === 'granted') {
    disable(false)
    load()
  } else if (consent === 'denied' && loaded) {
    disable(true)
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  }
}
