import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/seo/JsonLd'
import { industryHref, industryName } from '@/lib/data/industries/labels'
import type { Locale } from '@/lib/i18n'
import { seoMetadata } from '@/lib/seo/metadata'
import { HOME_CRUMB, breadcrumbSchema } from '@/lib/seo/schema'

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return seoMetadata('/industries/cosmetics', locale)
}

export default function CosmeticsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          HOME_CRUMB[locale],
          { name: industryName('cosmetics', locale)!, path: industryHref('cosmetics') },
        ])}
      />
      {children}
    </>
  )
}
