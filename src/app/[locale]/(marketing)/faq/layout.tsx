import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

const META = {
  fr: {
    title: 'FAQ — Industry X.0',
    description:
      'Durée d’une démonstration CIPA, intégrations, accompagnement au déploiement et délais : les réponses aux questions fréquentes.',
  },
  en: {
    title: 'FAQ — Industry X.0',
    description:
      'How long a CIPA demo takes, integrations, deployment support and timelines: answers to the most common questions.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/faq', ...META[locale] })
}

export default function FaqLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
