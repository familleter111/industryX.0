import { beforeEach, describe, expect, it, vi } from 'vitest'

import { POST } from '@/app/api/contact/route'

// Pas d'écriture Excel pendant les tests : on vérifie seulement ce que la
// route transmet au journal des leads.
const { appendLead } = vi.hoisted(() => ({ appendLead: vi.fn() }))
vi.mock('@/services/leads', () => ({ appendLead }))

const VALID = {
  firstName: 'Amel',
  lastName: 'Ben Salah',
  email: 'amel@usine.tn',
  company: 'Usine SA',
  industry: 'Pharmaceutique',
  message: 'Démo CIPA pour notre usine',
  consent: true,
  phoneCountry: 'TN',
  phone: '20 123 456',
  locale: 'fr',
}

let ip = 0
function post(body: unknown, from?: string) {
  // Une IP par requête : le limiteur (5 envois par IP) ne gêne pas les tests.
  const headers = { 'content-type': 'application/json', 'x-forwarded-for': from ?? `10.0.0.${++ip}` }
  return POST(
    new Request('http://localhost/api/contact', { method: 'POST', headers, body: JSON.stringify(body) }),
  )
}

beforeEach(() => {
  appendLead.mockReset()
  appendLead.mockResolvedValue({ file: 'contacts.xlsx' })
  vi.spyOn(console, 'info').mockImplementation(() => {})
})

describe('POST /api/contact', () => {
  it('enregistre une demande valide, téléphone au format E.164', async () => {
    const res = await post(VALID)
    expect(res.status).toBe(200)
    expect(appendLead).toHaveBeenCalledOnce()
    expect(appendLead.mock.calls[0][0]).toMatchObject({ email: 'amel@usine.tn', phone: '+21620123456' })
  })

  it('ajoute industrie stable, langue et heure du consentement', async () => {
    await post({ ...VALID, locale: 'en' })
    const lead = appendLead.mock.calls[0][0]
    expect(lead).toMatchObject({ industry: 'Pharmaceutique', industryKey: 'pharma', locale: 'en' })
    expect(new Date(lead.consentAt).toString()).not.toBe('Invalid Date')
  })

  it('renvoie les erreurs de champ dans la langue de la page', async () => {
    const res = await post({ ...VALID, firstName: '', locale: 'en' })
    expect(res.status).toBe(422)
    expect((await res.json()).fields).toEqual({ firstName: 'First name is required' })
  })

  it('joint la source de la visite et l’identifiant PostHog au lead', async () => {
    await post({
      ...VALID,
      attribution: {
        first: { utm_source: 'linkedin', utm_medium: 'social', landing: '/', at: '' },
        last: { utm_source: 'event-sifp', utm_campaign: 'salon-2026-11', ref: 'stand12', landing: '/', at: '' },
      },
      posthogId: 'ph-123',
    })
    expect(appendLead.mock.calls[0][0]).toMatchObject({
      utmSource: 'event-sifp',
      utmCampaign: 'salon-2026-11',
      ref: 'stand12',
      firstTouch: 'linkedin / social',
      posthogId: 'ph-123',
    })
  })

  it('accepte une demande sans attribution (visiteur qui a refusé la mesure)', async () => {
    await post(VALID)
    expect(appendLead.mock.calls[0][0]).toMatchObject({ utmSource: '', firstTouch: '', posthogId: '' })
  })

  it('refuse un email invalide et un consentement absent', async () => {
    const res = await post({ ...VALID, email: 'pas-un-email', consent: false })
    expect(res.status).toBe(422)
    const json = await res.json()
    expect(Object.keys(json.fields)).toEqual(expect.arrayContaining(['email', 'consent']))
    expect(appendLead).not.toHaveBeenCalled()
  })

  it('répond « ok » au robot qui remplit le pot de miel, sans rien écrire', async () => {
    const res = await post({ ...VALID, website: 'spam.example' })
    expect(res.status).toBe(200)
    expect(appendLead).not.toHaveBeenCalled()
  })

  it('renvoie 500 si le journal ne peut pas être écrit', async () => {
    appendLead.mockRejectedValueOnce(new Error('disque plein'))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await post(VALID)
    expect(res.status).toBe(500)
  })
})

describe('double envoi (L1-09)', () => {
  it('ne livre qu’une fois la même demande renvoyée, et répond « ok » aux deux', async () => {
    const body = { ...VALID, email: 'double@usine.tn' }
    const first = await post(body, '10.9.0.1')
    const second = await post(body, '10.9.0.1')
    expect([first.status, second.status]).toEqual([200, 200])
    expect(appendLead).toHaveBeenCalledOnce()
  })

  it('ne livre qu’une fois deux envois simultanés (double clic)', async () => {
    const body = { ...VALID, email: 'clic@usine.tn' }
    const responses = await Promise.all([post(body, '10.9.0.2'), post(body, '10.9.0.2')])
    expect(responses.map((r) => r.status)).toEqual([200, 200])
    expect(appendLead).toHaveBeenCalledOnce()
  })

  it('laisse renvoyer après un échec', async () => {
    appendLead.mockRejectedValueOnce(new Error('disque plein'))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const body = { ...VALID, email: 'retry@usine.tn' }
    expect((await post(body, '10.9.0.3')).status).toBe(500)
    expect((await post(body, '10.9.0.3')).status).toBe(200)
    expect(appendLead).toHaveBeenCalledTimes(2)
  })

  it('livre deux demandes différentes du même visiteur', async () => {
    await post({ ...VALID, email: 'deux@usine.tn' }, '10.9.0.4')
    await post({ ...VALID, email: 'deux@usine.tn', message: 'Autre besoin : formation des équipes' }, '10.9.0.4')
    expect(appendLead).toHaveBeenCalledTimes(2)
  })
})
