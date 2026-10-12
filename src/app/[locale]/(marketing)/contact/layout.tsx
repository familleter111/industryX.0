import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

const META = {
  fr: {
    title: 'Contact — Industry X.0',
    description:
      'Parlons de vos opérations. Un expert Industry X.0 vous accompagne : démo personnalisée de CIPA, réponse sous 24h et accompagnement métier.',
  },
  en: {
    title: 'Contact — Industry X.0',
    description:
      'Let\'s talk about your operations. An Industry X.0 expert guides you: a tailored CIPA demo, a reply within 24 hours and hands-on support.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/contact', ...META[locale] })
}

export default function ContactLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
