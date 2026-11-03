import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { POST } from '@/app/api/revalidate/route'
import { cmsConfig, localized } from '@/lib/cms/client'
import { loadTestimonials, testimonialsFromCms, type CmsTestimonial } from '@/lib/cms/testimonials'
import { getTestimonials } from '@/lib/data/testimonials'

import { mockFetch } from './leads-fixtures'

const { revalidateTag } = vi.hoisted(() => ({ revalidateTag: vi.fn() }))
vi.mock('next/cache', () => ({ revalidateTag }))

const ENV = { SANITY_PROJECT_ID: 'abc123' }

const DOCS: CmsTestimonial[] = [
  {
    company: 'Usine SA',
    quote: { fr: 'Nos audits sont prêts en une heure.', en: 'Our audits are ready in an hour.' },
    author: { fr: 'Directrice Qualité', en: 'Quality Director' },
    sector: { fr: 'Pharmaceutique' },
    logoAlt: 'Usine',
    rating: 4,
    clientApproved: true,
  },
  {
    company: 'Atelier SARL',
    quote: { fr: 'Les écarts remontent en temps réel.' },
    author: { fr: 'Responsable Production' },
    sector: { fr: 'Agroalimentaire' },
    logoAlt: '  ',
    rating: 9,
    clientApproved: false,
  },
  // Incomplets : ignorés.
  { company: 'Sans verbatim', quote: { en: 'English only' } },
  { company: '  ', quote: { fr: 'Sans société' } },
]

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('cmsConfig', () => {
  it('aucun CMS sans SANITY_PROJECT_ID', () => {
    expect(cmsConfig({})).toBeNull()
    expect(cmsConfig({ SANITY_PROJECT_ID: '  ' })).toBeNull()
  })

  it('dataset production par défaut', () => {
    expect(cmsConfig(ENV)).toEqual({ projectId: 'abc123', dataset: 'production' })
    expect(cmsConfig({ ...ENV, SANITY_DATASET: 'preview' })?.dataset).toBe('preview')
  })
})

describe('localized', () => {
  it('anglais si présent, sinon français', () => {
    expect(localized({ fr: 'Bonjour', en: 'Hello' }, 'en')).toBe('Hello')
    expect(localized({ fr: 'Bonjour', en: ' ' }, 'en')).toBe('Bonjour')
    expect(localized({ fr: 'Bonjour', en: 'Hello' }, 'fr')).toBe('Bonjour')
    expect(localized(null, 'fr')).toBe('')
  })
})

describe('testimonialsFromCms', () => {
  it('convertit les documents complets, dans l’ordre, et ignore les autres', () => {
    const list = testimonialsFromCms(DOCS, 'en')
    expect(list.map((t) => t.company)).toEqual(['Usine SA', 'Atelier SARL'])
    expect(list[0]).toMatchObject({
      quote: 'Our audits are ready in an hour.',
      author: 'Quality Director',
      sector: 'Pharmaceutique', // pas de traduction : le français
      logoAlt: 'Usine',
      rating: 4,
      status: 'published',
    })
    expect(list[1]).toMatchObject({ logoAlt: null, rating: 5, status: 'draft' })
  })

  it('reprend la rotation des couleurs du fichier local', () => {
    const [first, second] = testimonialsFromCms(DOCS, 'fr')
    const [localFirst, localSecond] = getTestimonials(true, 'fr')
    expect([first.color, second.color]).toEqual([localFirst.color, localSecond.color])
  })
})

describe('loadTestimonials', () => {
  it('sans CMS : le fichier local, tel quel', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    expect(await loadTestimonials('fr', { includeDrafts: true }, {})).toEqual(getTestimonials(true, 'fr'))
    expect(await loadTestimonials('en', {}, {})).toEqual(getTestimonials(false, 'en'))
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('avec CMS : documents publiés, par le CDN, mis en cache par type', async () => {
    const calls = mockFetch(() => ({ body: { result: DOCS } }))
    const list = await loadTestimonials('fr', { includeDrafts: true }, ENV)

    expect(list.map((t) => t.company)).toEqual(['Usine SA', 'Atelier SARL'])
    const url = new URL(calls[0].url)
    expect(url.host).toBe('abc123.apicdn.sanity.io')
    expect(url.pathname).toBe('/v2025-02-19/data/query/production')
    expect(url.searchParams.get('perspective')).toBe('published')
    expect(url.searchParams.get('query')).toContain('_type == "testimonial"')
    const init = vi.mocked(fetch).mock.calls[0][1] as RequestInit & { next?: { tags?: string[] } }
    expect(init.next?.tags).toEqual(['cms', 'cms:testimonial'])
  })

  it('sans includeDrafts : seulement les verbatims validés', async () => {
    mockFetch(() => ({ body: { result: DOCS } }))
    const list = await loadTestimonials('fr', {}, ENV)
    expect(list.map((t) => t.company)).toEqual(['Usine SA'])
  })

  it('Sanity en panne : verbatims validés du fichier local, jamais les propositions', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockFetch(() => ({ status: 503, body: { error: 'down' } }))

    const list = await loadTestimonials('fr', { includeDrafts: true }, ENV)
    expect(list).toEqual(getTestimonials(false, 'fr'))
    expect(list.every((t) => t.status === 'published')).toBe(true)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('503'))
  })

  it('réponse inattendue : même repli', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockFetch(() => ({ body: { result: 'pas une liste' } }))
    expect(await loadTestimonials('fr', { includeDrafts: true }, ENV)).toEqual(getTestimonials(false, 'fr'))
  })
})

describe('POST /api/revalidate', () => {
  const SECRET = 's3cret'

  function post(body: unknown, authorization?: string) {
    const headers: Record<string, string> = { 'content-type': 'application/json' }
    if (authorization) headers.authorization = authorization
    return POST(new Request('http://localhost/api/revalidate', { method: 'POST', headers, body: JSON.stringify(body) }))
  }

  beforeEach(() => {
    revalidateTag.mockReset()
    vi.stubEnv('SANITY_REVALIDATE_SECRET', SECRET)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('404 sans secret configuré', async () => {
    vi.stubEnv('SANITY_REVALIDATE_SECRET', '')
    expect((await post({ _type: 'testimonial' }, `Bearer ${SECRET}`)).status).toBe(404)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('401 sans le bon secret', async () => {
    expect((await post({ _type: 'testimonial' })).status).toBe(401)
    expect((await post({ _type: 'testimonial' }, 'Bearer faux')).status).toBe(401)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('rafraîchit le type publié', async () => {
    const res = await post({ _type: 'testimonial' }, `Bearer ${SECRET}`)
    expect(res.status).toBe(200)
    expect(revalidateTag).toHaveBeenCalledWith('cms:testimonial')
  })

  it('type absent ou inattendu : tout le CMS', async () => {
    await post({}, `Bearer ${SECRET}`)
    await post({ _type: '../../etc' }, `Bearer ${SECRET}`)
    expect(revalidateTag.mock.calls).toEqual([['cms'], ['cms']])
  })
})
