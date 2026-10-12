import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import PlatformPage from '@/features/platform/PlatformPage'
import { PLATFORM_PAGES, platformHref, platformPage } from '@/lib/data/platform'
import { pageMetadata, type Locale } from '@/lib/i18n'

/**
 * Les trois pages Plateforme : /plateforme/terrain, /plateforme/qualite et
 * /plateforme/pilotage (et leurs versions /en/...). Contenu dans
 * lib/data/platform.ts.
 */

type Params = { params: { slug: string; locale: Locale } }

export const dynamicParams = false

export function generateStaticParams() {
  return PLATFORM_PAGES.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const page = platformPage(params.slug, params.locale)
  if (!page) return {}
  return pageMetadata({
    locale: params.locale,
    path: platformHref(page.slug),
    title: page.metaTitle,
    description: page.metaDescription,
  })
}

export default function Page({ params }: Params) {
  setRequestLocale(params.locale)
  const page = platformPage(params.slug, params.locale)
  if (!page) notFound()
  return <PlatformPage page={page} />
}
