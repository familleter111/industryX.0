import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

// La page est un composant client : ses métadonnées vivent ici.
const META = {
  fr: {
    title: 'CIPA pour la cosmétique & les dispositifs médicaux | Industry X.0',
    description:
      'Conformité ISO 13485 et ISO 22716, salle blanche, traçabilité UDI et contrôles qualité : CIPA digitalise la production cosmétique et des dispositifs médicaux.',
  },
  en: {
    title: 'CIPA for cosmetics & medical devices | Industry X.0',
    description:
      'ISO 13485 and ISO 22716 compliance, cleanroom operations, UDI traceability and quality checks: CIPA digitizes cosmetics and medical device production.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/industries/cosmetics', ...META[locale] })
}

export default function CosmeticsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
