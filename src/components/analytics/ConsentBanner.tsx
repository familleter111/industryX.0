'use client'

import { useEffect, useState } from 'react'

import { Link } from '@/i18n/navigation'
import { OPEN_CONSENT_EVENT, readConsent, writeConsent, type Consent } from '@/lib/analytics/consent'
import { gaEnabled } from '@/lib/analytics/ga'
import { analyticsEnabled } from '@/lib/analytics/posthog'
import { useCopy, type Bilingual } from '@/lib/i18n'

const COPY = {
  fr: {
    label: 'Mesure d’audience',
    text: 'Nous mesurons la fréquentation du site et l’efficacité de nos campagnes avec PostHog, hébergé dans l’Union européenne, et Google Analytics. Sans votre accord, aucun cookie de mesure n’est déposé.',
    more: 'En savoir plus',
    accept: 'Accepter',
    refuse: 'Refuser',
  },
  en: {
    label: 'Audience measurement',
    text: 'We measure site traffic and campaign performance with PostHog, hosted in the European Union, and Google Analytics. Without your consent, no measurement cookie is set.',
    more: 'Learn more',
    accept: 'Accept',
    refuse: 'Decline',
  },
} satisfies Bilingual<Record<string, string>>

/**
 * Bandeau de consentement. N'apparaît que si la mesure est configurée
 * (clé PostHog ou identifiant Google Analytics) et que le visiteur n'a pas
 * encore répondu — ou
 * qu'il a cliqué sur « Gérer les cookies » dans le pied de page.
 * Accepter et Refuser ont le même poids visuel, comme l'exige la CNIL.
 */
export default function ConsentBanner() {
  const t = useCopy(COPY)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!analyticsEnabled && !gaEnabled) return
    if (readConsent() === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  if (!open) return null

  const answer = (consent: Consent) => {
    writeConsent(consent)
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.label}
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-2xl border border-cream-border bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.18)] sm:p-6"
    >
      <p className="font-display text-[15px] font-bold text-dark">{t.label}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-dark/70">
        {t.text}{' '}
        <Link href="/privacy" className="font-medium text-gold-ink hover:underline">
          {t.more}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => answer('denied')}
          className="rounded-full border border-dark/15 px-5 py-2.5 text-[13px] font-semibold text-dark transition-colors hover:border-dark/40"
        >
          {t.refuse}
        </button>
        <button
          type="button"
          onClick={() => answer('granted')}
          className="rounded-full border border-dark bg-dark px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-black"
        >
          {t.accept}
        </button>
      </div>
    </div>
  )
}
