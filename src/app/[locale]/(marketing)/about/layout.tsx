import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

const META = {
  fr: {
    title: 'À propos — Industry X.0',
    description:
      'Nos valeurs, notre mission et notre histoire : Industry X.0 accélère la transformation digitale des usines et des entreprises industrielles.',
  },
  en: {
    title: 'About — Industry X.0',
    description:
      'Our values, mission and story: Industry X.0 accelerates the digital transformation of factories and industrial companies.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/about', ...META[locale] })
}

export default function AboutLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
