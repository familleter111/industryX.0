import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { pageMetadata, type Locale } from '@/lib/i18n'

const META = {
  fr: {
    title: 'Entreprise — Industry X.0',
    description:
      'Depuis 2019, Industry X.0 transforme l’expertise opérationnelle en solutions digitales concrètes, simples à déployer et conçues pour durer.',
  },
  en: {
    title: 'Company — Industry X.0',
    description:
      'Since 2019, Industry X.0 has turned operational expertise into practical digital solutions that are simple to deploy and built to last.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/entreprise', ...META[locale] })
}

export default function EntrepriseLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
