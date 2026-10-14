'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import {
  captureAttribution,
  clearStoredAttribution,
  getAttribution,
  persistAttribution,
  withAttribution,
} from '@/lib/analytics/attribution'
import { CONSENT_EVENT, readConsent, type Consent } from '@/lib/analytics/consent'
import { ctaFromClick } from '@/lib/analytics/cta'
import {
  applyConsent,
  capturePageview,
  distinctId,
  initPostHog,
  registerProperties,
  track,
} from '@/lib/analytics/posthog'

import ConsentBanner from './ConsentBanner'

/**
 * Branche la mesure d'audience sur tout le site (monté une fois, dans le
 * layout de langue). Voir README, « Analytics ».
 */

let booted = false

/** Démarrage idempotent : appelé par le premier effet qui en a besoin. */
function boot(locale: string) {
  if (booted) return
  booted = true
  const consent = readConsent()
  captureAttribution(consent === 'granted')
  initPostHog(consent, locale)
  const ref = getAttribution().last?.ref
  if (ref) registerProperties({ ref })
}

/** Une page vue à chaque changement d'URL (l'App Router ne recharge pas). */
function PageviewTracker({ locale }: { locale: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Effet enfant : il passe avant celui du parent, d'où le démarrage ici.
    boot(locale)
    capturePageview()
  }, [pathname, searchParams, locale])

  return null
}

export default function AnalyticsProvider({ locale }: { locale: string }) {
  useEffect(() => {
    boot(locale)
    registerProperties({ locale })
  }, [locale])

  useEffect(() => {
    const onConsent = (event: Event) => {
      const consent = (event as CustomEvent<Consent>).detail
      applyConsent(consent, locale)
      if (consent === 'granted') persistAttribution()
      else clearStoredAttribution()
    }

    // Phase de capture : l'événement part avant que le lien ne navigue.
    const onClick = (event: MouseEvent) => {
      const cta = ctaFromClick(event.target)
      if (!cta) return
      track('cta_clicked', cta)
      if (cta.cta_id.startsWith('entiwin')) {
        track('entiwin_clicked', { location: cta.location })
        // Le lien sortant emporte la source de la visite et l'identifiant PostHog.
        const link = (event.target as Element).closest('a[href^="http"]') as HTMLAnchorElement | null
        if (link) link.href = withAttribution(link.href, getAttribution(), distinctId())
      }
    }

    window.addEventListener(CONSENT_EVENT, onConsent)
    document.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent)
      document.removeEventListener('click', onClick, true)
    }
  }, [locale])

  return (
    <>
      {/* useSearchParams exige une frontière Suspense pour garder les pages statiques. */}
      <Suspense fallback={null}>
        <PageviewTracker locale={locale} />
      </Suspense>
      <ConsentBanner />
    </>
  )
}
