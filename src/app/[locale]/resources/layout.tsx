import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

const META = {
  fr: {
    title: 'Guides & insights — Industry X.0',
    description:
      'Analyses sectorielles, guides pratiques et ressources pour digitaliser vos processus qualité, production et maintenance.',
  },
  en: {
    title: 'Guides & insights — Industry X.0',
    description:
      'Industry analyses, practical guides and resources to digitize your quality, production and maintenance processes.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/resources', ...META[locale] })
}

export default function ResourcesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
