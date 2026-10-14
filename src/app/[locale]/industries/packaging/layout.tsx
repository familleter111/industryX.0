import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

// La page est un composant client : ses métadonnées vivent ici.
const META = {
  fr: {
    title: 'CIPA pour le packaging & la plasturgie | Industry X.0',
    description:
      'Conformité contact alimentaire, lignes d’injection et d’extrusion, traçabilité résine et maintenance prédictive : CIPA digitalise le packaging et la plasturgie.',
  },
  en: {
    title: 'CIPA for packaging & plastics | Industry X.0',
    description:
      'Food-contact compliance, injection and extrusion lines, resin traceability and predictive maintenance: CIPA digitizes packaging and plastics.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/industries/packaging', ...META[locale] })
}

export default function PackagingLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
