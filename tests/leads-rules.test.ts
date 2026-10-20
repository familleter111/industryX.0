import { describe, expect, it } from 'vitest'

import { checkPhone } from '@/lib/leads/phoneRules'
import {
  checkCompany,
  checkEmail,
  checkMessage,
  checkName,
  FIELD_MESSAGES,
  isBlockedPhone,
  normalizeEmail,
  normalizeName,
  suggestEmail,
} from '@/lib/leads/rules'

describe('checkName', () => {
  it.each(['Ben Salah', 'Jean-Pierre', 'O’Neil', "d'Arc", 'Zoé', 'محمد', 'Al', 'J. R. Martin', 'Ben  Salah'])(
    'accepte « %s »',
    (name) => expect(checkName(name)).toBeUndefined(),
  )

  it.each([
    ['', 'required'],
    ['   ', 'required'],
    ['Amel2', 'chars'],
    ['amel@usine', 'chars'],
    ['<b>Amel</b>', 'chars'],
    ['A', 'tooShort'],
    ['--', 'tooShort'],
    ['-Amel', 'invalid'],
    ["Amel''", 'invalid'],
    ['a'.repeat(61), 'tooLong'],
  ])('refuse « %s » (%s)', (name, error) => expect(checkName(name)).toBe(error))

  it('réduit les espaces multiples', () => {
    expect(normalizeName('  Ben   Salah ')).toBe('Ben Salah')
  })
})

describe('checkEmail', () => {
  it.each(['amel@usine.tn', 'a.b+c@sub.usine.co.uk', 'Amel.Ben-Salah@Usine.TN'])('accepte %s', (email) =>
    expect(checkEmail(email)).toBeUndefined(),
  )

  it.each([
    ['', 'required'],
    ['amel @usine.tn', 'chars'],
    ['amel', 'invalid'],
    ['amel@usine', 'invalid'],
    ['amel@usine.t', 'invalid'],
    ['a..b@usine.tn', 'invalid'],
    ['.amel@usine.tn', 'invalid'],
    ['amel@usine..tn', 'invalid'],
    ['amel@-usine.tn', 'invalid'],
    ['amel@usine.tn.', 'invalid'],
    ['@usine.tn', 'invalid'],
    ['a@b@usine.tn', 'invalid'],
    ['amel@usine.123', 'invalid'],
  ])('refuse « %s » (%s)', (email, error) => expect(checkEmail(email)).toBe(error))

  it('met le domaine en minuscules, pas la partie locale', () => {
    expect(normalizeEmail(' Amel.B@Usine.TN ')).toBe('Amel.B@usine.tn')
  })

  it('suggère une correction pour un domaine mal tapé', () => {
    expect(suggestEmail('amel@gmial.com')).toBe('amel@gmail.com')
    expect(suggestEmail('amel@Hotmial.fr')).toBe('amel@hotmail.fr')
    expect(suggestEmail('amel@usine.tn')).toBeUndefined()
  })
})

describe('checkCompany et checkMessage', () => {
  it('société', () => {
    expect(checkCompany('3M')).toBeUndefined()
    expect(checkCompany('Usine SA')).toBeUndefined()
    expect(checkCompany('')).toBe('required')
    expect(checkCompany('-')).toBe('tooShort')
    expect(checkCompany('http://spam.example')).toBe('chars')
  })

  it('message', () => {
    expect(checkMessage('Démo CIPA svp')).toBeUndefined()
    expect(checkMessage('')).toBe('required')
    expect(checkMessage('Démo')).toBe('tooShort')
    expect(checkMessage('a'.repeat(1001))).toBe('tooLong')
  })
})

describe('checkPhone', () => {
  it.each([
    ['20123456', 'TN'],
    ['71123456', 'TN'],
    ['612345678', 'FR'],
    ['612345678', 'MA'],
    ['', 'TN'],
  ])('accepte %s (%s)', (digits, iso) => expect(checkPhone(digits, iso)).toBeUndefined())

  it.each([
    ['2012345', 'TN', 'tooShort'],
    ['201234567', 'TN', 'tooLong'],
    ['612345', 'MA', 'tooShort'],
    ['12 34', 'TN', 'chars'],
    ['20123456', 'ZZ', 'invalid'],
  ])('refuse %s (%s) : %s', (digits, iso, error) => expect(checkPhone(digits, iso)).toBe(error))
})

describe('isBlockedPhone', () => {
  it.each([
    ['+972 50 123 4567', 'TN'],
    ['00972501234567', 'TN'],
    ['+ 972-50-1234567', 'FR'],
    ['50 123 4567', 'IL'],
  ])('refuse %s (%s)', (raw, iso) => expect(isBlockedPhone(raw, iso)).toBe(true))

  it.each([
    ['97 212 345', 'TN'],
    ['+216 20 123 456', 'TN'],
    ['+970 59 123 4567', 'PS'],
    ['', 'TN'],
  ])('accepte %s (%s)', (raw, iso) => expect(isBlockedPhone(raw, iso)).toBe(false))
})

describe('messages', () => {
  it('chaque message français a sa traduction anglaise', () => {
    for (const [field, messages] of Object.entries(FIELD_MESSAGES.fr)) {
      const en = FIELD_MESSAGES.en[field as keyof typeof FIELD_MESSAGES.en]
      expect(Object.keys(en).sort(), field).toEqual(Object.keys(messages).sort())
    }
  })
})
