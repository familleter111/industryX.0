import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import LandingView from '@/features/landing/LandingView'
import { loadLandings } from '@/lib/cms/landings'
import { loadTestimonials } from '@/lib/cms/testimonials'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo/metadata'

/**
 * Pages d'atterrissage par canal (lib/data/landings.ts, lib/cms/landings.ts).
 *
 * Pages connues générées au build ; une page publiée ensuite dans le CMS est
 * rendue à sa première visite, un slug inconnu répond 404. Toujours en
 * `noindex` et hors sitemap : on y arrive par un lien de campagne.
 */

type Params = { params: { slug: string; locale: Locale } }

export async function generateStaticParams() {
  return (await loadLandings('fr')).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = (await loadLandings(params.locale)).find((candidate) => candidate.slug === params.slug)
  if (!page) return {}
  return {
    ...pageMetadata({
      locale: params.locale,
      path: `/lp/${page.slug}`,
      title: page.metaTitle,
      description: page.metaDescription,
    }),
    robots: { index: false, follow: true },
  }
}

export default async function LandingRoute({ params }: Params) {
  setRequestLocale(params.locale)
  const [pages, testimonials] = await Promise.all([
    loadLandings(params.locale),
    // Verbatims validés seulement : une page de campagne ne cite pas de proposition de rédaction.
    loadTestimonials(params.locale),
  ])
  const page = pages.find((candidate) => candidate.slug === params.slug)
  if (!page) notFound()
  return <LandingView page={page} locale={params.locale} testimonials={testimonials} />
}
