import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/seo/JsonLd'
import { ENTIWIN_PATH, ENTIWIN_URL } from '@/lib/data/entiwin'
import { pageMetadata, type Locale } from '@/lib/i18n'
import { HOME_CRUMB, breadcrumbSchema, pageUrl, softwareApplicationSchema } from '@/lib/seo/schema'

const META = {
  fr: {
    title: 'Enti Win — Évaluation qualité pharmaceutique assistée par IA | Industry X.0',
    description:
      'Enti Win confronte vos procédures, déviations et CAPA aux exigences BPF/GMP. Chaque écart est justifié, sourcé et traçable. Une solution Industry X.0.',
  },
  en: {
    title: 'Enti Win — AI-assisted pharmaceutical quality assessment | Industry X.0',
    description:
      'Enti Win checks your procedures, deviations and CAPAs against GMP requirements. Every gap is justified, sourced and traceable. An Industry X.0 solution.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: ENTIWIN_PATH, ...META[locale] })
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
            description: META[locale].description,
            operatingSystem: 'Web',
          }),
          breadcrumbSchema(locale, [HOME_CRUMB[locale], { name: 'Enti Win', path: ENTIWIN_PATH }]),
        ]}
      />
      {children}
    </>
  )
}
