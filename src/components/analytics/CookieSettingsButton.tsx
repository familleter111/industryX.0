'use client'

import { openConsentSettings } from '@/lib/analytics/consent'
import { gaEnabled } from '@/lib/analytics/ga'
import { analyticsEnabled } from '@/lib/analytics/posthog'

/** Lien « Gérer les cookies » : rouvre le bandeau de consentement. */
export default function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  if (!analyticsEnabled && !gaEnabled) return null
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      {label}
    </button>
  )
}
