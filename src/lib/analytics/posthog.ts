import posthog from 'posthog-js'

import type { AnalyticsEvents, EventName } from './events'
import { readConsent, type Consent } from './consent'

/**
 * PostHog, côté navigateur.
 *
 * Sans NEXT_PUBLIC_POSTHOG_KEY (dev, tests, preview sans clé), rien n'est
 * chargé et `track()` ne fait rien : le site fonctionne à l'identique.
 *
 * Les requêtes passent par /ingest sur notre propre domaine (rewrites de
 * next.config.mjs) : les bloqueurs de publicité laissent passer un appel
 * au site lui-même, pas un appel à posthog.com.
 */

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? ''
/** Interface PostHog (liens de la barre d'outils), selon la région du projet. */
const UI_HOST = process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? 'https://eu.posthog.com'

export const analyticsEnabled = POSTHOG_KEY !== ''

/**
 * Événements émis avant le démarrage de PostHog (un composant de page peut
 * monter avant le fournisseur) : gardés ici, envoyés juste après init.
 */
const pending: Array<[string, Record<string, unknown>?]> = []

function loaded(): boolean {
  return typeof window !== 'undefined' && Boolean(posthog.__loaded)
}

/** Démarre PostHog, une seule fois. Rien si pas de clé ou si le visiteur a refusé. */
export function initPostHog(consent: Consent | null, locale: string) {
  if (!analyticsEnabled || typeof window === 'undefined' || consent === 'denied') return
  if (!loaded()) {
    posthog.init(POSTHOG_KEY, {
      api_host: '/ingest',
      ui_host: UI_HOST,
      // En mémoire tant que le visiteur n'a pas accepté : aucun cookie.
      persistence: consent === 'granted' ? 'localStorage+cookie' : 'memory',
      // Durée annoncée sur /privacy.
      cookie_expiration: 180,
      // Pages vues envoyées à la main : l'App Router change de page sans recharger.
      capture_pageview: false,
      capture_pageleave: true,
      // Pas d'autocapture : seuls les événements de events.ts existent.
      autocapture: false,
      person_profiles: 'identified_only',
      respect_dnt: true,
      disable_session_recording: true,
      session_recording: { maskAllInputs: true },
    })
  }
  posthog.register({ locale })
  pending.splice(0).forEach(([event, properties]) => posthog.capture(event, properties))
  if (consent === 'granted') {
    // Un refus antérieur, mémorisé par PostHog, ne doit pas survivre à une acceptation.
    if (posthog.has_opted_out_capturing()) posthog.opt_in_capturing()
    posthog.startSessionRecording()
  }
}

/** Applique un nouveau choix de consentement à une instance déjà lancée. */
export function applyConsent(consent: Consent, locale: string) {
  if (!analyticsEnabled) return
  if (consent === 'denied') {
    if (loaded()) {
      posthog.stopSessionRecording()
      posthog.opt_out_capturing()
    }
    return
  }
  if (!loaded()) return initPostHog(consent, locale)
  if (posthog.has_opted_out_capturing()) posthog.opt_in_capturing()
  posthog.set_config({ persistence: 'localStorage+cookie' })
  posthog.startSessionRecording()
}

function active(): boolean {
  return loaded() && readConsent() !== 'denied'
}

function capture(event: string, properties?: Record<string, unknown>) {
  if (!analyticsEnabled || typeof window === 'undefined' || readConsent() === 'denied') return
  if (loaded()) posthog.capture(event, properties)
  else if (pending.length < 50) pending.push([event, properties])
}

/** Envoie un événement de la taxonomie. Sans effet si PostHog n'est pas configuré ou refusé. */
export function track<E extends EventName>(event: E, properties: AnalyticsEvents[E]) {
  capture(event, properties)
}

export function capturePageview() {
  capture('$pageview')
}

/** Enregistre une propriété envoyée avec tous les événements suivants. */
export function registerProperties(properties: Record<string, string>) {
  if (active()) posthog.register(properties)
}

/** Identifiant PostHog du visiteur, pour relier une demande de démo à son parcours. */
export function distinctId(): string | undefined {
  return active() ? posthog.get_distinct_id() : undefined
}
