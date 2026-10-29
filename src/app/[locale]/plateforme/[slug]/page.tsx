import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/seo/JsonLd'
import PlatformPage from '@/features/platform/PlatformPage'
import { PLATFORM_PAGES, platformHref, platformPage } from '@/lib/data/platform'
import type { Locale } from '@/lib/i18n'
import { seoMetadata } from '@/lib/seo/metadata'
import { HOME_CRUMB, breadcrumbSchema, softwareApplicationSchema } from '@/lib/seo/schema'

/**
 * Les sept pages Solution : /plateforme/remontee-terrain,
 * /plateforme/gestion-ecarts… (et leurs versions /en/...). Contenu dans
 * lib/data/platform.ts.
 */

type Params = { params: { slug: string; locale: Locale } }

export const dynamicParams = false

export function generateStaticParams() {
  return PLATFORM_PAGES.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  return seoMetadata(platformHref(params.slug), params.locale)
}

export default function Page({ params }: Params) {
  setRequestLocale(params.locale)
  const page = platformPage(params.slug, params.locale)
  if (!page) notFound()
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema({
            locale: params.locale,
            featureList: page.sections.map((section) => section.title),
          }),
          breadcrumbSchema(params.locale, [
            HOME_CRUMB[params.locale],
            { name: page.name, path: platformHref(page.slug) },
          ]),
        ]}
      />
      <PlatformPage page={page} />
    </>
  )
}
