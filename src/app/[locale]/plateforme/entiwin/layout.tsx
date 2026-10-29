import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/seo/JsonLd'
import { ENTIWIN_PATH, ENTIWIN_URL } from '@/lib/data/entiwin'
import type { Locale } from '@/lib/i18n'
import { seoMetadata } from '@/lib/seo/metadata'
import { pageSeo } from '@/lib/seo/pages'
import { HOME_CRUMB, breadcrumbSchema, pageUrl, softwareApplicationSchema } from '@/lib/seo/schema'

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return seoMetadata(ENTIWIN_PATH, locale)
}

export default function EntiWinLayout({
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
        data={[
          // Outil en ligne, hébergé hors de ce site (lib/data/entiwin.ts).
          softwareApplicationSchema({
            locale,
            id: `${pageUrl(ENTIWIN_PATH, locale)}#app`,
            name: 'Enti Win',
            url: ENTIWIN_URL,
            description: pageSeo(ENTIWIN_PATH, locale)?.description,
            operatingSystem: 'Web',
          }),
          breadcrumbSchema(locale, [HOME_CRUMB[locale], { name: 'Enti Win', path: ENTIWIN_PATH }]),
        ]}
      />
      {children}
    </>
  )
}
