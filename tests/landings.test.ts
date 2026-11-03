import { afterEach, describe, expect, it, vi } from 'vitest'

import { generateMetadata } from '@/app/[locale]/lp/[slug]/page'
import { landingDocument, landingFromCms, loadLandings, type CmsLanding } from '@/lib/cms/landings'
import { cmsLandingPaths, cmsPageSeo } from '@/lib/cms/seo'
import { landingUrl, landingsFor } from '@/lib/data/landings'
import { publicPaths } from '@/lib/site'

import { mockFetch } from './leads-fixtures'

const ENV = { SANITY_PROJECT_ID: 'abc123' }
const LOCALES = ['fr', 'en'] as const

/** Une page importée, telle que la projette LANDINGS_QUERY. */
function queried(i: number): CmsLanding {
  const { slug, ...doc } = JSON.parse(JSON.stringify(landingDocument(landingsFor('fr')[i], landingsFor('en')[i])))
  return { ...doc, slug: slug.current }
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('pages d’atterrissage du fichier', () => {
  it('mêmes pages en français et en anglais, trois bénéfices, textes de partage aux bonnes longueurs', () => {
    expect(landingsFor('en').map((p) => p.slug)).toEqual(landingsFor('fr').map((p) => p.slug))
    for (const locale of LOCALES)
      for (const page of landingsFor(locale)) {
        expect(page.benefits).toHaveLength(3)
        expect(`${page.metaTitle} | CIPA`.length).toBeLessThanOrEqual(60)
        expect(page.metaDescription.length).toBeGreaterThanOrEqual(140)
        expect(page.metaDescription.length).toBeLessThanOrEqual(160)
      }
  })

  it('le lien de campagne porte ses UTM, avec /en en anglais', () => {
    const page = landingsFor('fr')[0]
    const url = new URL(landingUrl('https://www.industryx0.pro', page, 'en'))
    expect(url.pathname).toBe(`/en/lp/${page.slug}`)
    expect(Object.fromEntries(url.searchParams)).toEqual({
      utm_source: page.utm.source,
      utm_medium: page.utm.medium,
      utm_campaign: page.utm.campaign,
    })
  })

  it('hors sitemap : aucune page /lp dans publicPaths', () => {
    expect(publicPaths().some((path) => path.startsWith('/lp/'))).toBe(false)
  })
})

describe('lecture du CMS', () => {
  it('les pages importées se relisent à l’identique du fichier', () => {
    for (const locale of LOCALES) {
      const docs = landingsFor('fr').map((_, i) => queried(i))
      expect(docs.flatMap((doc) => landingFromCms(doc, locale) ?? [])).toEqual(landingsFor(locale))
    }
  })

  it('canal, destination, bouton et UTM ont des valeurs sûres par défaut', () => {
    const page = landingFromCms(
      {
        slug: 'nouvelle',
        channel: 'tiktok',
        target: 'ailleurs',
        title: { fr: 'Nouvelle campagne' },
        intro: { fr: 'Message.' },
        utm: { source: ' Salon Pharma 2026 ', medium: '' },
      },
      'en',
    )
    expect(page).toMatchObject({
      channel: 'autre',
      target: 'demo',
      ctaLabel: 'Book a demo',
      metaTitle: 'Nouvelle campagne',
      metaDescription: 'Message.',
      utm: { source: 'salon-pharma-2026', medium: 'campagne', campaign: 'nouvelle' },
    })
    expect(landingFromCms({ slug: 'sans-titre', title: { en: 'English only' } }, 'fr')).toBeNull()
  })

  it('sans CMS : le fichier, sans appel ; en panne : le fichier aussi', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    expect(await loadLandings('en', {})).toEqual(landingsFor('en'))
    expect(fetchSpy).not.toHaveBeenCalled()

    vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockFetch(() => ({ status: 503 }))
    expect(await loadLandings('fr', ENV)).toEqual(landingsFor('fr'))
  })

  it('une page créée dans le Studio a son titre de partage et son image', async () => {
    mockFetch(() => ({ body: { result: [{ ...queried(0), slug: 'salon-2027', metaTitle: { fr: 'Salon 2027' } }] } }))
    expect(await cmsLandingPaths(ENV)).toEqual(['/lp/salon-2027'])
    expect(await cmsPageSeo('/lp/salon-2027', 'fr', ENV)).toMatchObject({ title: 'Salon 2027' })
  })
})

describe('métadonnées de /lp/[slug]', () => {
  it('noindex, avec le titre et la description de la page', async () => {
    vi.stubEnv('SANITY_PROJECT_ID', '')
    const page = landingsFor('fr')[0]
    const metadata = await generateMetadata({ params: { slug: page.slug, locale: 'fr' } })
    expect(metadata.robots).toEqual({ index: false, follow: true })
    expect(metadata.title).toBe(`${page.metaTitle} | CIPA`)
    expect(metadata.description).toBe(page.metaDescription)
    expect(await generateMetadata({ params: { slug: 'inconnue', locale: 'fr' } })).toEqual({})
  })
})
