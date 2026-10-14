import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

const META = {
  fr: {
    title: 'Partenaires — Industry X.0',
    description:
      'L’écosystème technologique, institutionnel et académique qui accompagne le déploiement de CIPA à l’échelle industrielle.',
  },
  en: {
    title: 'Partners — Industry X.0',
    description:
      'The technology, institutional and academic ecosystem that supports CIPA deployments at industrial scale.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/partners', ...META[locale] })
}

export default function PartnersLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
