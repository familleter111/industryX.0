import { describe, expect, it } from 'vitest'

import { FAQ_ENTRIES } from '@/lib/data/faq'
import { GUIDES } from '@/lib/data/guides'
import {
  ORGANIZATION_ID,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  serializeJsonLd,
  softwareApplicationSchema,
} from '@/lib/seo/schema'
import { SITE_URL } from '@/lib/site'

describe('serializeJsonLd', () => {
  it('ne laisse sortir aucune balise du <script>', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script> & co' })
    expect(out).not.toMatch(/[<>&]/)
    expect(JSON.parse(out)).toEqual({ name: '</script><script>alert(1)</script> & co' })
  })
})

describe('données structurées', () => {
  it('déclare CIPA comme nom alternatif de l’organisation', () => {
    const org = organizationSchema()
    expect(org).toMatchObject({
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Industry X.0',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      address: { addressLocality: 'Tunis', postalCode: '1053', addressCountry: 'TN' },
    })
    expect(org.alternateName).toContain('CIPA')
  })

  it('n’invente ni note ni prix pour CIPA', () => {
    const app = softwareApplicationSchema({ locale: 'fr' })
    expect(app).toMatchObject({ name: 'CIPA', applicationCategory: 'BusinessApplication' })
    expect(app).not.toHaveProperty('aggregateRating')
    expect(app).not.toHaveProperty('offers')
    expect(app).not.toHaveProperty('review')
  })

  it('reprend la FAQ affichée, question par question', () => {
    for (const locale of ['fr', 'en'] as const) {
      const faq = faqSchema(FAQ_ENTRIES[locale], locale) as { mainEntity: { name: string }[] }
      expect(faq.mainEntity.map((q) => q.name)).toEqual(FAQ_ENTRIES[locale].map((q) => q.question))
    }
  })

  it('donne des URL absolues dans la langue de la page', () => {
    const crumbs = breadcrumbSchema('en', [
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/resources' },
    ]) as { itemListElement: { item: string; position: number }[] }
    expect(crumbs.itemListElement).toEqual([
      expect.objectContaining({ position: 1, item: `${SITE_URL}/en` }),
      expect.objectContaining({ position: 2, item: `${SITE_URL}/en/resources` }),
    ])
  })

  it('date chaque guide et le rattache à l’éditeur', () => {
    const article = articleSchema(GUIDES[0], 'fr')
    expect(article).toMatchObject({
      '@type': 'Article',
      datePublished: GUIDES[0].date,
      dateModified: GUIDES[0].updated ?? GUIDES[0].date,
      publisher: { '@id': ORGANIZATION_ID },
    })
  })
})
