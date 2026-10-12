import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

const META = {
  fr: {
    title: 'Cas clients — Industry X.0',
    description:
      'Les industriels qui pilotent leurs opérations avec CIPA : témoignages, chiffres clés et cas d’usage par secteur.',
  },
  en: {
    title: 'Customer stories — Industry X.0',
    description:
      'The manufacturers running their operations with CIPA: testimonials, key figures and use cases by industry.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/customers', ...META[locale] })
}

export default function CustomersLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
