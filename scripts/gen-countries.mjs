#!/usr/bin/env node
/**
 * Génère lib/data/phoneCountries.ts et public/flags/*.png.
 *
 * Exécuté à la main (`npm run gen:countries`), jamais au build : le résultat
 * est un fichier statique versionné. libphonenumber-js reste donc une
 * devDependency — aucune de ses métadonnées (~150 ko) ne part au navigateur.
 *
 * Pour chaque pays on retient :
 *   - l'indicatif       getCountryCallingCode()
 *   - le nom français   Intl.DisplayNames — plutôt qu'une liste recopiée
 *   - le gabarit        déduit du numéro d'exemple au format international,
 *                       privé de son indicatif : « +216 20 123 456 » donne
 *                       « ## ### ### », la forme que le champ imposera.
 *
 * Les drapeaux viennent de flagcdn.com et sont COPIÉS dans public/flags : le
 * site ne doit dépendre d'aucun tiers à l'exécution (RGPD, hors-ligne, latence).
 */
import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { getCountryCallingCode, getExampleNumber } from 'libphonenumber-js/max'
import { Metadata } from 'libphonenumber-js/core'
import metadata from 'libphonenumber-js/max/metadata'
import examples from 'libphonenumber-js/mobile/examples'

/* ---------------------------------------------------------------- groupes */

// Tête de liste : les pays réellement visés par le formulaire. Ils sont
// retirés de leur continent plus bas — un pays n'apparaît qu'une seule fois,
// sinon la recherche renvoie deux « France » et le doute s'installe.
const PRIORITY = ['TN', 'FR', 'ES', 'IT', 'DE']

const REGIONS = [
  {
    label: 'Afrique',
    codes: [
      'AO', 'BF', 'BI', 'BJ', 'BW', 'CD', 'CF', 'CG', 'CI', 'CM', 'CV', 'DJ',
      'DZ', 'EG', 'ER', 'ET', 'GA', 'GH', 'GM', 'GN', 'GQ', 'GW', 'KE', 'KM',
      'LR', 'LS', 'LY', 'MA', 'MG', 'ML', 'MR', 'MU', 'MW', 'MZ', 'NA', 'NE',
      'NG', 'RE', 'RW', 'SC', 'SD', 'SL', 'SN', 'SO', 'SS', 'ST', 'SZ', 'TD',
      'TG', 'TN', 'TZ', 'UG', 'YT', 'ZA', 'ZM', 'ZW',
    ],
  },
  {
    label: 'Europe',
    codes: [
      'AD', 'AL', 'AT', 'BA', 'BE', 'BG', 'BY', 'CH', 'CY', 'CZ', 'DE', 'DK',
      'EE', 'ES', 'FI', 'FO', 'FR', 'GB', 'GE', 'GI', 'GR', 'HR', 'HU', 'IE',
      'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MD', 'ME', 'MK', 'MT', 'NL',
      'NO', 'PL', 'PT', 'RO', 'RS', 'RU', 'SE', 'SI', 'SK', 'SM', 'UA', 'VA',
      'XK',
    ],
  },
  {
    label: 'Moyen-Orient',
    codes: [
      'AE', 'BH', 'IL', 'IQ', 'IR', 'JO', 'KW', 'LB', 'OM', 'PS', 'QA', 'SA',
      'SY', 'TR', 'YE',
    ],
  },
  {
    label: 'Amériques',
    codes: [
      'AR', 'BB', 'BO', 'BR', 'BS', 'BZ', 'CA', 'CL', 'CO', 'CR', 'CU', 'DO',
      'EC', 'GF', 'GP', 'GT', 'HN', 'HT', 'JM', 'MQ', 'MX', 'NI', 'PA', 'PE',
      'PR', 'PY', 'SV', 'TT', 'US', 'UY', 'VE',
    ],
  },
  {
    label: 'Asie',
    codes: [
      'AF', 'AM', 'AZ', 'BD', 'BN', 'BT', 'CN', 'HK', 'ID', 'IN', 'JP', 'KG',
      'KH', 'KR', 'KZ', 'LA', 'LK', 'MM', 'MN', 'MO', 'MV', 'MY', 'NP', 'PH',
      'PK', 'SG', 'TH', 'TJ', 'TM', 'TW', 'UZ', 'VN',
    ],
  },
  {
    label: 'Océanie',
    codes: ['AU', 'FJ', 'NC', 'NZ', 'PF', 'PG', 'SB', 'VU', 'WS'],
  },
]

/* ------------------------------------------------------------------ outils */

const frenchName = new Intl.DisplayNames(['fr'], { type: 'region' })
const plans = new Metadata(metadata)
const collator = new Intl.Collator('fr', { sensitivity: 'base' })

const skipped = []

function build(iso) {
  let dial
  try {
    dial = getCountryCallingCode(iso)
  } catch {
    skipped.push(iso + ' (indicatif inconnu)')
    return null
  }

  const name = frenchName.of(iso)
  if (!name || name === iso) {
    skipped.push(iso + ' (nom français inconnu)')
    return null
  }

  // Gabarit : le numéro d'exemple au format international, moins l'indicatif.
  let mask = ''
  let example = ''
  try {
    const sample = getExampleNumber(iso, examples)
    if (sample) {
      const intl = sample.formatInternational() // « +216 20 123 456 »
      const national = intl.slice(('+' + dial).length).trim()
      if (national && /\d/.test(national)) {
        mask = national.replace(/\d/g, '#')
        example = national
      }
    }
  } catch {
    /* pas d'exemple pour ce pays : le champ restera libre. */
  }

  // Prefixe interurbain (le 0 de « 06 12 … »). Absent en Italie, en Tunisie,
  // en Espagne : la ou le 0 initial fait partie du numero et ne se retire pas.
  let trunk = ''
  try {
    plans.country(iso)
    trunk = plans.numberingPlan.nationalPrefix() || ''
  } catch {
    /* pays sans plan de numerotation connu */
  }

  return { iso, name, dial, mask, example, trunk }
}

/* ---------------------------------------------------------------- montage */

const priority = PRIORITY.map(build).filter(Boolean) // ordre imposé, non trié
const claimed = new Set(PRIORITY)

const groups = [{ label: 'Pays fréquents', countries: priority }]

for (const region of REGIONS) {
  const countries = region.codes
    .filter((iso) => !claimed.has(iso))
    .map(build)
    .filter(Boolean)
    .sort((a, b) => collator.compare(a.name, b.name))

  for (const country of countries) claimed.add(country.iso)
  groups.push({ label: region.label, countries })
}

/* ------------------------------------------------------------ écriture TS */

const q = (value) => "'" + String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"

const body = groups
  .map((group) => {
    const rows = group.countries
      .map(
        (c) =>
          '      { iso: ' + q(c.iso) +
          ', name: ' + q(c.name) +
          ', dial: ' + q(c.dial) +
          ', mask: ' + q(c.mask) +
          ', example: ' + q(c.example) +
          ', trunk: ' + q(c.trunk) + ' },',
      )
      .join('\n')
    return '  {\n    label: ' + q(group.label) + ',\n    countries: [\n' + rows + '\n    ],\n  },'
  })
  .join('\n')

const header = [
  '/**',
  ' * Pays du champ téléphone — FICHIER GÉNÉRÉ, ne pas éditer à la main.',
  ' *',
  ' * Source : `npm run gen:countries` (scripts/gen-countries.mjs), qui lit les',
  " * métadonnées de libphonenumber-js et les noms français d'Intl.DisplayNames.",
  ' *',
  " * `mask` est le gabarit national, indicatif exclu : '#' vaut un chiffre, tout",
  ' * le reste est un séparateur littéral. Un gabarit vide veut dire « aucun',
  ' * format connu » — le champ laisse alors saisir librement.',
  ' */',
  '',
  'export type PhoneCountry = {',
  '  /** ISO 3166-1 alpha-2, en majuscules. Drapeau : /flags/<iso minuscule>.png */',
  '  iso: string',
  "  /** Nom français, tel qu'affiché dans la liste. */",
  '  name: string',
  '  /** Indicatif, sans le « + ». */',
  '  dial: string',
  "  /** Gabarit national : '## ### ###'. Vide si inconnu. */",
  '  mask: string',
  "  /** Numéro d'exemple formaté, utilisé comme placeholder. */",
  '  example: string',
  "  /** Préfixe interurbain à retirer en international. Vide si le pays n'en a pas. */",
  '  trunk: string',
  '}',
  '',
  'export type PhoneCountryGroup = {',
  '  label: string',
  '  countries: PhoneCountry[]',
  '}',
  '',
  'export const PHONE_COUNTRY_GROUPS: PhoneCountryGroup[] = [',
].join('\n')

const footer = [
  ']',
  '',
  "/** Liste à plat, dans l'ordre d'affichage. */",
  'export const PHONE_COUNTRIES: PhoneCountry[] = PHONE_COUNTRY_GROUPS.flatMap(',
  '  (group) => group.countries,',
  ')',
  '',
  "/** Le siège est en Tunisie : c'est le pays proposé par défaut. */",
  "export const DEFAULT_PHONE_COUNTRY = 'TN'",
  '',
  'export function findPhoneCountry(iso: string): PhoneCountry | undefined {',
  '  return PHONE_COUNTRIES.find((country) => country.iso === iso)',
  '}',
  '',
].join('\n')

writeFileSync(join('lib', 'data', 'phoneCountries.ts'), header + '\n' + body + '\n' + footer, 'utf8')

const total = groups.reduce((n, group) => n + group.countries.length, 0)
console.log('✓ lib/data/phoneCountries.ts — ' + total + ' pays, ' + groups.length + ' groupes')
if (skipped.length) console.warn('  ignorés : ' + skipped.join(', '))

/* --------------------------------------------------------- drapeaux (PNG) */

const dir = join('public', 'flags')
mkdirSync(dir, { recursive: true })

let downloaded = 0
let cached = 0
const failed = []

for (const group of groups) {
  for (const { iso } of group.countries) {
    const target = join(dir, iso.toLowerCase() + '.png')
    if (existsSync(target)) {
      cached += 1
      continue
    }
    // w40 : affiché sur 20 px, donc net sur les écrans à densité double.
    const url = 'https://flagcdn.com/w40/' + iso.toLowerCase() + '.png'
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      writeFileSync(target, Buffer.from(await res.arrayBuffer()))
      downloaded += 1
    } catch (error) {
      failed.push(iso + ' (' + error.message + ')')
    }
  }
}

console.log('✓ public/flags — ' + downloaded + ' téléchargés, ' + cached + ' déjà présents')
if (failed.length) console.warn('  échecs : ' + failed.join(', '))
