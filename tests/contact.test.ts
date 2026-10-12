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
  industry: 'Pharma',
  message: 'Démo CIPA',
  consent: true,
  phoneCountry: 'TN',
  phone: '20 123 456',
  locale: 'fr',
}

let ip = 0
function post(body: unknown) {
  // Une IP par requête : le limiteur (5 envois par IP) ne gêne pas les tests.
  const headers = { 'content-type': 'application/json', 'x-forwarded-for': `10.0.0.${++ip}` }
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
