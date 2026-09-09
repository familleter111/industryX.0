#!/usr/bin/env node
/**
 * Vérifie la mise en forme des numéros — `npm run test:phone`.
 *
 * Node exécute lib/phone.ts directement (--experimental-strip-types) : pas de
 * chaîne de compilation à installer pour tester quatre fonctions pures.
 */
import { formatNationalPhone, toE164 } from '../lib/phone.ts'

const TN = { dial: '216', mask: '## ### ###', trunk: '' }
const FR = { dial: '33', mask: '# ## ## ## ##', trunk: '0' }
const IT = { dial: '39', mask: '### ### ####', trunk: '' }
const DE = { dial: '49', mask: '#### #######', trunk: '0' }
const LIBRE = { dial: '672', mask: '', trunk: '' }

const cases = [
  // [pays, saisie, attendu, intention]
  [TN, '2', '2', 'premier chiffre'],
  [TN, '201', '20 1', 'le séparateur apparaît au bon moment'],
  [TN, '20123456', '20 123 456', 'numéro tunisien complet'],
  [TN, '20-12.34 56', '20 123 456', 'saisie collée, ponctuation ignorée'],
  [FR, '612345678', '6 12 34 56 78', 'mobile français sans le 0'],
  [FR, '0612345678', '6 12 34 56 78', 'le 0 en trop est abandonné'],
  [FR, '06', '6', 'le 0 français part dès la frappe : il ne se compose pas de l’étranger'],
  [IT, '0612345678', '061 234 5678', 'le 0 italien fait partie du numéro'],
  [DE, '15123456789', '1512 3456789', 'mobile allemand'],
  [LIBRE, '12345', '12345', 'pays sans gabarit connu : saisie libre'],
  [TN, '201234561234', '20 123 456 1234', 'plus long que prévu : rien n’est coupé'],
  [FR, '2345678901234567', '2 34 56 78 90 1234', 'plafond E.164 : 13 chiffres après l’indicatif'],
]

let failed = 0

for (const [country, input, expected, intent] of cases) {
  const actual = formatNationalPhone(input, country)
  const ok = actual === expected
  if (!ok) failed += 1
  console.log(
    `${ok ? '✓' : '✗'} +${country.dial} « ${input} » → « ${actual} »` +
      (ok ? `   ${intent}` : `   ATTENDU « ${expected} »`),
  )
}

const e164 = toE164(TN, '20 123 456')
if (e164 !== '+21620123456') {
  failed += 1
  console.log(`✗ toE164 → « ${e164} », attendu « +21620123456 »`)
} else {
  console.log('✓ toE164 « 20 123 456 » → « +21620123456 »')
}

if (failed > 0) {
  console.error(`\n${failed} cas en échec.`)
  process.exit(1)
}
console.log('\nTous les cas passent.')
