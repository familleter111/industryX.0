import { describe, expect, it } from 'vitest'

import {
  cleanAttribution,
  describeTouch,
  leadAttribution,
  nextAttribution,
  parseTouch,
  withAttribution,
} from '@/lib/analytics/attribution'

const NOW = new Date('2026-10-12T10:00:00Z')
const url = (path: string) => new URL(`https://www.industryx0.pro${path}`)

describe('parseTouch', () => {
  it('lit les UTM et le ref, en minuscules', () => {
    const touch = parseTouch(url('/en/contact?utm_source=LinkedIn&utm_medium=social&utm_campaign=salon-2026-11&ref=Stand12'), '', NOW)
    expect(touch).toEqual({
      utm_source: 'linkedin',
      utm_medium: 'social',
      utm_campaign: 'salon-2026-11',
      ref: 'stand12',
      landing: '/en/contact',
      at: NOW.toISOString(),
    })
  })

  it('garde l’hôte d’un référent externe, jamais l’URL complète', () => {
    const touch = parseTouch(url('/'), 'https://www.google.com/search?q=cipa', NOW)
    expect(touch?.referrer).toBe('www.google.com')
  })

  it('ignore une visite directe ou une navigation interne', () => {
    expect(parseTouch(url('/faq'), '', NOW)).toBeNull()
    expect(parseTouch(url('/faq'), 'https://www.industryx0.pro/', NOW)).toBeNull()
  })

  it('borne et nettoie les valeurs hostiles', () => {
    const touch = parseTouch(url(`/?utm_source=${'a'.repeat(500)}&utm_campaign=%3Cscript%3E`), '', NOW)
    expect(touch?.utm_source).toHaveLength(100)
    expect(touch?.utm_campaign).toBe('script')
  })
})

describe('nextAttribution', () => {
  it('fige la première touche et remplace la dernière', () => {
    const first = nextAttribution({}, url('/?utm_source=linkedin'), '', NOW)
    const second = nextAttribution(first, url('/?utm_source=radio'), '', NOW)
    expect(second.first?.utm_source).toBe('linkedin')
    expect(second.last?.utm_source).toBe('radio')
  })

  it('note une première visite directe, sans écraser la dernière source ensuite', () => {
    const direct = nextAttribution({}, url('/'), '', NOW)
    expect(direct.first?.utm_source).toBe('direct')
    expect(direct.last).toBeUndefined()
    const campaign = nextAttribution(direct, url('/?ref=qr-salon'), '', NOW)
    const internal = nextAttribution(campaign, url('/contact'), '', NOW)
    expect(internal.last?.ref).toBe('qr-salon')
  })
})

describe('describeTouch', () => {
  it('résume une touche pour le tableur', () => {
    expect(describeTouch({ utm_source: 'linkedin', utm_medium: 'social', ref: 'stand12', landing: '/', at: '' })).toBe(
      'linkedin / social / ref:stand12',
    )
    expect(describeTouch(undefined)).toBe('')
  })
})

describe('withAttribution', () => {
  const attribution = nextAttribution({}, url('/?utm_source=radio&utm_campaign=mosaique'), '', NOW)

  it('ajoute la source et l’identifiant PostHog au lien sortant', () => {
    const href = withAttribution('https://entiwin.example/start', attribution, 'abc123')
    const out = new URL(href)
    expect(out.searchParams.get('utm_source')).toBe('radio')
    expect(out.searchParams.get('utm_campaign')).toBe('mosaique')
    expect(out.searchParams.get('ix0_id')).toBe('abc123')
  })

  it('ne remplace pas une UTM déjà présente dans le lien', () => {
    const href = withAttribution('https://entiwin.example/?utm_source=site', attribution)
    expect(new URL(href).searchParams.get('utm_source')).toBe('site')
  })

  it('laisse un lien relatif intact', () => {
    expect(withAttribution('/contact', attribution)).toBe('/contact')
  })
})

describe('validation serveur', () => {
  it('ne garde que les champs connus, bornés', () => {
    const cleaned = cleanAttribution({
      last: { utm_source: 'linkedin', evil: 'x', landing: '/', at: 'hier' },
      first: 'pas un objet',
    })
    expect(cleaned).toEqual({ last: { utm_source: 'linkedin', landing: '/', at: 'hier' }, first: undefined })
    expect(cleanAttribution(null)).toEqual({})
  })

  it('produit les colonnes du lead', () => {
    expect(
      leadAttribution({
        attribution: {
          first: { utm_source: 'linkedin', utm_medium: 'social', landing: '/', at: '' },
          last: { utm_source: 'radio', ref: 'qr1', referrer: 'www.google.com', landing: '/', at: '' },
        },
        posthogId: 'ph-1',
      }),
    ).toEqual({
      utmSource: 'radio',
      utmMedium: '',
      utmCampaign: '',
      ref: 'qr1',
      referrer: 'www.google.com',
      firstTouch: 'linkedin / social',
      posthogId: 'ph-1',
    })
  })
})
