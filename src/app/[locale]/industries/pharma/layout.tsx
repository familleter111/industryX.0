import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

// La page est un composant client : ses métadonnées vivent ici.
const META = {
  fr: {
    title: 'CIPA pour l’industrie pharmaceutique | Industry X.0',
    description:
      'Conformité FDA 21 CFR Part 11 et BPF, dossier de lot électronique, déviations et traçabilité API : CIPA digitalise la qualité et la production pharmaceutiques.',
  },
  en: {
    title: 'CIPA for the pharmaceutical industry | Industry X.0',
    description:
      'FDA 21 CFR Part 11 and GMP compliance, electronic batch records, deviations and API traceability: CIPA digitizes pharmaceutical quality and production.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/industries/pharma', ...META[locale] })
}

export default function PharmaLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
