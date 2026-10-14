import { describe, expect, it } from 'vitest'

import { formatNationalPhone, toE164 } from '@/lib/phone'

const TN = { dial: '216', mask: '## ### ###', trunk: '' }
const FR = { dial: '33', mask: '# ## ## ## ##', trunk: '0' }
const IT = { dial: '39', mask: '### ### ####', trunk: '' }
const DE = { dial: '49', mask: '#### #######', trunk: '0' }
const LIBRE = { dial: '672', mask: '', trunk: '' }

describe('formatNationalPhone', () => {
  it.each([
    // [pays, saisie, attendu, intention]
    [TN, '2', '2', 'premier chiffre'],
    [TN, '201', '20 1', 'le séparateur apparaît au bon moment'],
    [TN, '20123456', '20 123 456', 'numéro tunisien complet'],
    [TN, '20-12.34 56', '20 123 456', 'saisie collée, ponctuation ignorée'],
    [FR, '612345678', '6 12 34 56 78', 'mobile français sans le 0'],
    [FR, '0612345678', '6 12 34 56 78', 'le 0 en trop est abandonné'],
    [FR, '06', '6', 'le 0 français part dès la frappe'],
    [IT, '0612345678', '061 234 5678', 'le 0 italien fait partie du numéro'],
    [DE, '15123456789', '1512 3456789', 'mobile allemand'],
    [LIBRE, '12345', '12345', 'pays sans gabarit connu : saisie libre'],
    [TN, '201234561234', '20 123 456 1234', 'plus long que prévu : rien n’est coupé'],
    [FR, '2345678901234567', '2 34 56 78 90 1234', 'plafond E.164 : 13 chiffres après l’indicatif'],
  ])('+%s « %s » → « %s » (%s)', (country, input, expected) => {
    expect(formatNationalPhone(input, country)).toBe(expected)
  })
})

describe('toE164', () => {
  it('compose le numéro international', () => {
    expect(toE164(TN, '20 123 456')).toBe('+21620123456')
  })
})
