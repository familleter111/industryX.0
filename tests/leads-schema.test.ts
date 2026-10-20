import { describe, expect, it } from 'vitest'

import { INDUSTRY_OPTIONS, industryKey } from '@/lib/leads/industries'
import { MESSAGE_MAX, parseContact } from '@/lib/leads/schema'

const VALID = {
  firstName: '  Amel ',
  lastName: 'Ben Salah',
  email: 'amel@usine.tn',
  company: 'Usine SA',
  industry: 'Pharmaceutique',
  message: 'Démo CIPA pour notre usine',
  consent: true,
  phoneCountry: 'tn',
  phone: '20 123 456',
}

describe('parseContact', () => {
  it('accepte une demande valide et normalise les champs', () => {
    const result = parseContact(VALID, 'fr')
    expect(result).toEqual({
      ok: true,
      data: expect.objectContaining({
        firstName: 'Amel',
        industry: 'Pharmaceutique',
        industryKey: 'pharma',
        phone: '+21620123456',
        phoneDial: '+216',
        source: '/contact',
      }),
    })
  })

  it('laisse le téléphone vide quand il n’est pas renseigné', () => {
    const result = parseContact({ ...VALID, phone: '' }, 'fr')
    expect(result.ok && result.data).toMatchObject({ phone: '', phoneDial: '', phoneCountry: '' })
  })

  it('retombe sur la Tunisie pour un indicatif inconnu', () => {
    const result = parseContact({ ...VALID, phoneCountry: 'ZZ' }, 'fr')
    expect(result.ok && result.data.phone).toBe('+21620123456')
  })

  it('renvoie une erreur par champ manquant, dans la langue demandée', () => {
    const result = parseContact({}, 'en')
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(Object.keys(result.fields).sort()).toEqual(
      ['company', 'consent', 'email', 'firstName', 'industry', 'lastName', 'message'].sort(),
    )
    expect(result.fields.firstName).toBe('First name is required')
  })

  it('refuse un email invalide', () => {
    const result = parseContact({ ...VALID, email: 'pas-un-email' }, 'fr')
    expect(!result.ok && result.fields.email).toBe('Adresse email invalide (ex. nom@entreprise.com)')
  })

  it('exige un consentement explicite (true, pas "true")', () => {
    expect(parseContact({ ...VALID, consent: 'true' }, 'fr').ok).toBe(false)
    expect(parseContact({ ...VALID, consent: false }, 'fr').ok).toBe(false)
  })

  it(`refuse un message de plus de ${MESSAGE_MAX} caractères`, () => {
    expect(parseContact({ ...VALID, message: 'a'.repeat(MESSAGE_MAX) }, 'fr').ok).toBe(true)
    const result = parseContact({ ...VALID, message: 'a'.repeat(MESSAGE_MAX + 1) }, 'fr')
    expect(!result.ok && Object.keys(result.fields)).toEqual(['message'])
  })

  it('refuse une industrie hors liste', () => {
    const result = parseContact({ ...VALID, industry: 'Aéronautique' }, 'fr')
    expect(!result.ok && Object.keys(result.fields)).toEqual(['industry'])
  })

  it('refuse un téléphone trop court', () => {
    const result = parseContact({ ...VALID, phone: '123' }, 'fr')
    expect(!result.ok && Object.keys(result.fields)).toEqual(['phone'])
  })

  it('applique les règles partagées avec le formulaire', () => {
    const result = parseContact(
      { ...VALID, firstName: 'Amel2', company: '-', message: 'Démo', phone: '2012345' },
      'fr',
    )
    expect(!result.ok && result.fields).toEqual({
      firstName: 'Lettres, espaces, tirets et apostrophes uniquement',
      company: 'Nom de société trop court (2 caractères minimum)',
      message: 'Message trop court (10 caractères minimum)',
      phone: 'Numéro incomplet',
    })
  })

  it('valide le numéro selon le pays choisi', () => {
    // 9 chiffres : valide au Maroc, trop long en Tunisie.
    expect(parseContact({ ...VALID, phoneCountry: 'MA', phone: '612345678' }, 'fr').ok).toBe(true)
    const result = parseContact({ ...VALID, phoneCountry: 'TN', phone: '612345678' }, 'en')
    expect(!result.ok && result.fields.phone).toBe('Number too long for this country')
  })

  it('refuse l’indicatif +972, choisi ou collé', () => {
    for (const body of [
      { ...VALID, phoneCountry: 'IL', phone: '501234567' },
      { ...VALID, phoneCountry: 'TN', phone: '+972 50 123 4567' },
    ]) {
      const result = parseContact(body, 'fr')
      expect(!result.ok && result.fields.phone).toBe('Cet indicatif n’est pas accepté')
    }
  })

  it('normalise noms et domaine de l’email', () => {
    const result = parseContact({ ...VALID, lastName: ' Ben   Salah ', email: 'Amel@Usine.TN' }, 'fr')
    expect(result.ok && result.data).toMatchObject({ lastName: 'Ben Salah', email: 'Amel@usine.tn' })
  })

  it('ignore les types inattendus sans planter', () => {
    const result = parseContact({ ...VALID, firstName: 42, email: ['a@b.co'] }, 'fr')
    expect(!result.ok && Object.keys(result.fields).sort()).toEqual(['email', 'firstName'])
  })
})

describe('industryKey', () => {
  it('associe chaque libellé à une clé stable et unique', () => {
    const keys = INDUSTRY_OPTIONS.map((option) => industryKey(option.label))
    expect(keys).toEqual([
      'pharma',
      'agroalimentaire',
      'cosmetique',
      'automobile',
      'electronique',
      'packaging',
      'chimie',
      'logistique',
      'autre',
    ])
  })

  it('accepte aussi une clé directement', () => {
    expect(industryKey('chimie')).toBe('chimie')
    expect(industryKey('inconnue')).toBeUndefined()
  })
})
