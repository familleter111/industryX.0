import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

// La page est un composant client : ses métadonnées vivent ici.
const META = {
  fr: {
    title: 'CIPA pour l’agroalimentaire & les boissons | Industry X.0',
    description:
      'HACCP, sécurité alimentaire, contrôles qualité en ligne et traçabilité de la ferme à la fourchette : CIPA digitalise les opérations agroalimentaires.',
  },
  en: {
    title: 'CIPA for food & beverage | Industry X.0',
    description:
      'HACCP, food safety, in-line quality checks and farm-to-fork traceability: CIPA digitizes food and beverage operations.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/industries/food', ...META[locale] })
}

export default function FoodLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
