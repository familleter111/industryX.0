import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

// La page est un composant client : ses métadonnées vivent ici.
const META = {
  fr: {
    title: 'CIPA pour l’électronique & le câblage | Industry X.0',
    description:
      'Conformité IPC-A-610, traçabilité SMT des bobines aux cartes, contrôles de câblage et TRS : CIPA digitalise les ateliers d’électronique.',
  },
  en: {
    title: 'CIPA for electronics & wiring | Industry X.0',
    description:
      'IPC-A-610 compliance, SMT traceability from reels to boards, wiring checks and OEE: CIPA digitizes electronics workshops.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/industries/electronics', ...META[locale] })
}

export default function ElectronicsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
