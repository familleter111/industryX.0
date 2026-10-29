import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/lib/i18n'
import { seoMetadata } from '@/lib/seo/metadata'

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return seoMetadata('/contact', locale)
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
