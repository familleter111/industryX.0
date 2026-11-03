import { afterEach, describe, expect, it, vi } from 'vitest'

import { faqFromCms, loadFaq, type CmsFaq } from '@/lib/cms/faq'
import {
  blocksToPortableText,
  guideDocument,
  guideFromCms,
  guidesFromCms,
  loadGuides,
  portableTextToBlocks,
  type CmsGuide,
} from '@/lib/cms/guides'
import { industryDocument, industryTextFromCms, loadIndustryText, type CmsIndustry } from '@/lib/cms/industries'
import { cmsPageSeo, cmsPublicPaths } from '@/lib/cms/seo'
import { FAQ_ENTRIES } from '@/lib/data/faq'
import { guidesFor } from '@/lib/data/guides'
import { industryData, industrySlugs } from '@/lib/data/industries'
import { overlay } from '@/lib/i18n'

import { mockFetch } from './leads-fixtures'

const ENV = { SANITY_PROJECT_ID: 'abc123' }
const LOCALES = ['fr', 'en'] as const

/** Ce que Sanity rend d'un document : du JSON, sans les `undefined`. */
const stored = <T>(doc: T): T => JSON.parse(JSON.stringify(doc))

/** Un guide importé, tel que le projette GUIDES_QUERY. */
function queried(doc: ReturnType<typeof guideDocument>): CmsGuide {
  const { slug, image, ...rest } = stored(doc)
  return { ...rest, slug: slug.current, image: { url: null, path: image.path, alt: image.alt } }
}

const guideDocs = () => {
  const en = guidesFor('en')
  return guidesFor('fr').map((guide, i) => guideDocument(guide, en[i]))
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

/* ------------------------------------------------------------ FAQ */

describe('FAQ', () => {
  it('convertit les questions complètes, anglais sinon français', () => {
    const docs: CmsFaq[] = [
      { question: { fr: 'Q1 ?', en: 'Q1?' }, answer: { fr: 'R1.' } },
      { question: { fr: 'Sans réponse ?' }, answer: { fr: ' ' } },
      { question: { en: 'English only?' }, answer: { en: 'Yes.' } },
    ]
    expect(faqFromCms(docs, 'en')).toEqual([{ question: 'Q1?', answer: 'R1.' }])
  })

  it('sans CMS : le fichier local, sans appel', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    expect(await loadFaq('en', {})).toEqual(FAQ_ENTRIES.en)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('avec CMS : mise en cache sous cms:faq', async () => {
    mockFetch(() => ({ body: { result: [{ question: { fr: 'Q ?' }, answer: { fr: 'R.' } }] } }))
    expect(await loadFaq('fr', ENV)).toEqual([{ question: 'Q ?', answer: 'R.' }])
    const init = vi.mocked(fetch).mock.calls[0][1] as RequestInit & { next?: { tags?: string[] } }
    expect(init.next?.tags).toEqual(['cms', 'cms:faq'])
  })

  it('Sanity en panne : le fichier local', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockFetch(() => ({ status: 500 }))
    expect(await loadFaq('fr', ENV)).toEqual(FAQ_ENTRIES.fr)
  })
})

/* ------------------------------------------------------------ guides */

describe('guides : Portable Text', () => {
  it('l’aller-retour garde chaque bloc de chaque guide, en français et en anglais', () => {
    for (const locale of LOCALES)
      for (const guide of guidesFor(locale)) expect(portableTextToBlocks(blocksToPortableText(guide.body))).toEqual(guide.body)
  })

  it('lit les liens, regroupe les listes, reconnaît l’encadré et ignore le reste', () => {
    const blocks = portableTextToBlocks([
      { _type: 'block', style: 'h2', children: [{ text: 'Titre' }] },
      {
        _type: 'block',
        style: 'normal',
        markDefs: [{ _type: 'link', _key: 'a', href: '/plateforme/gestion-ecarts' }],
        children: [{ text: 'Voir la ' }, { text: 'gestion des écarts', marks: ['a'] }, { text: '.' }],
      },
      { _type: 'block', listItem: 'bullet', children: [{ text: 'un' }] },
      { _type: 'block', listItem: 'bullet', children: [{ text: 'deux' }] },
      { _type: 'block', style: 'blockquote', children: [{ text: 'À retenir' }] },
      { _type: 'block', style: 'normal', children: [{ text: '   ' }] },
      { _type: 'image' },
    ])
    expect(blocks).toEqual([
      { type: 'h2', text: 'Titre' },
      { type: 'p', text: 'Voir la gestion des écarts.', links: [{ text: 'gestion des écarts', href: '/plateforme/gestion-ecarts' }] },
      { type: 'list', items: ['un', 'deux'] },
      { type: 'callout', text: 'À retenir' },
    ])
  })
})

describe('guides : documents', () => {
  it('les guides importés se relisent à l’identique du fichier local', () => {
    const docs = guideDocs().map(queried)
    for (const locale of LOCALES) expect(guidesFromCms(docs, locale)).toEqual(guidesFor(locale))
  })

  it('image envoyée prioritaire, corps anglais absent, lien externe refusé, lecture estimée', () => {
    const [first] = guideDocs().map(queried)
    const guide = guideFromCms(
      {
        ...first,
        image: { url: 'https://cdn.sanity.io/images/abc123/production/x.png', path: '/local.png', alt: { fr: 'Alt' } },
        body: { fr: first.body?.fr, en: [] },
        related: { label: { fr: 'Ailleurs' }, href: 'https://exemple.com' },
        readingMinutes: null,
        featured: false,
      },
      'en',
    )
    expect(guide?.image.src).toBe('https://cdn.sanity.io/images/abc123/production/x.png')
    expect(guide?.body).toEqual(guidesFor('fr')[0].body)
    expect(guide?.related).toEqual({ label: 'Book a demo', href: '/contact' })
    expect(guide?.readingMinutes).toBeGreaterThan(0)
    expect(guide?.featured).toBeUndefined()
  })

  it('ignore un guide sans slug, sans date valide, sans image ou sans corps', () => {
    const [first] = guideDocs().map(queried)
    expect(guideFromCms({ ...first, slug: ' ' }, 'fr')).toBeNull()
    expect(guideFromCms({ ...first, date: '15/09/2026' }, 'fr')).toBeNull()
    expect(guideFromCms({ ...first, image: { alt: { fr: 'Alt' } } }, 'fr')).toBeNull()
    expect(guideFromCms({ ...first, body: { fr: [] } }, 'fr')).toBeNull()
  })

  it('sans CMS : le fichier local ; Sanity en panne : aussi', async () => {
    expect(await loadGuides('en', {})).toEqual(guidesFor('en'))
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockFetch(() => ({ status: 503 }))
    expect(await loadGuides('fr', ENV)).toEqual(guidesFor('fr'))
  })

  it('un guide créé dans le Studio entre dans les pages publiques et a son titre', async () => {
    const [first] = guideDocs().map(queried)
    const created = { ...first, slug: 'nouveau-guide', metaTitle: { fr: 'Nouveau guide' } }
    mockFetch(() => ({ body: { result: [created] } }))
    expect(await cmsPublicPaths(ENV)).toContain('/resources/nouveau-guide')
    expect(await cmsPageSeo('/resources/nouveau-guide', 'fr', ENV)).toMatchObject({ title: 'Nouveau guide' })
  })
})

/* ------------------------------------------------------------ secteurs */

describe('secteurs', () => {
  it('les textes importés, posés sur le code, redonnent chaque page à l’identique', () => {
    for (const slug of industrySlugs()) {
      const doc = stored(industryDocument(industryData(slug, 'fr')!, industryData(slug, 'en')!)) as CmsIndustry
      for (const locale of LOCALES) {
        const page = industryData(slug, locale)!
        expect(overlay(page, industryTextFromCms(doc, locale))).toEqual(page)
      }
    }
  })

  it('un texte modifié s’affiche, un texte vide garde celui du code, icônes et visuels restent', () => {
    const page = industryData('pharma', 'fr')!
    const doc: CmsIndustry = {
      slug: 'pharma',
      metaTitle: { fr: 'Titre FR', en: 'EN title' },
      intro: { fr: '' },
      indicators: [null, { fr: 'Deuxième point' }],
      coreSlides: [{ kpis: [{ value: '42%' }] }],
    }
    const result = overlay(page, industryTextFromCms(doc, 'fr'))
    expect(result.metaTitle).toBe('Titre FR')
    expect(result.intro).toBe(page.intro)
    expect(result.indicators).toEqual([page.indicators[0], 'Deuxième point', ...page.indicators.slice(2)])
    expect(result.coreSlides[0].kpis[0]).toEqual({ ...page.coreSlides[0].kpis[0], value: '42%' })
    expect(result.heroIcon).toBe(page.heroIcon)
    expect(result.visuals).toBe(page.visuals)
    expect(result.coreSlides).toHaveLength(page.coreSlides.length)

    // Anglais : le texte anglais du CMS, sinon celui du code (jamais le français).
    const en = industryData('pharma', 'en')!
    const english = overlay(en, industryTextFromCms(doc, 'en'))
    expect(english.metaTitle).toBe('EN title')
    expect(english.indicators[1]).toBe(en.indicators[1])
  })

  it('lit le secteur demandé ; sans CMS, sans document ou en panne : les textes du code', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    expect(await loadIndustryText('pharma', 'fr', {})).toBeUndefined()
    expect(fetchSpy).not.toHaveBeenCalled()

    mockFetch(() => ({ body: { result: [{ slug: 'pharma', metaTitle: { fr: 'Pharma CMS' } }] } }))
    expect((await loadIndustryText('pharma', 'fr', ENV))?.metaTitle).toBe('Pharma CMS')
    expect(await loadIndustryText('food', 'fr', ENV)).toBeUndefined()
    expect(await cmsPageSeo('/industries/pharma', 'fr', ENV)).toMatchObject({ title: 'Pharma CMS' })

    vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockFetch(() => ({ status: 502 }))
    expect(await loadIndustryText('pharma', 'fr', ENV)).toBeUndefined()
  })
})
