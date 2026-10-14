import type { Locale } from '@/i18n/routing'
import { PHONE_COUNTRY_GROUPS, type PhoneCountryGroup } from '@/lib/data/phoneCountries'

/**
 * Liste des pays du champ téléphone dans la langue de la page.
 *
 * phoneCountries.ts est généré avec les noms français : plutôt que de
 * dupliquer le fichier, la version anglaise reprend les mêmes pays et demande
 * leur nom à Intl.DisplayNames. Le premier groupe (pays fréquents) garde son
 * ordre ; les autres sont triés alphabétiquement dans la langue affichée.
 */

const GROUP_EN: Record<string, string> = {
  'Pays fréquents': 'Frequent countries',
  Afrique: 'Africa',
  Europe: 'Europe',
  'Moyen-Orient': 'Middle East',
  Amériques: 'Americas',
  Asie: 'Asia',
  Océanie: 'Oceania',
}

let englishGroups: PhoneCountryGroup[] | null = null

function buildEnglish(): PhoneCountryGroup[] {
  const names = new Intl.DisplayNames(['en'], { type: 'region' })
  return PHONE_COUNTRY_GROUPS.map((group, index) => {
    const countries = group.countries.map((country) => ({
      ...country,
      name: names.of(country.iso) ?? country.name,
    }))
    if (index > 0) countries.sort((a, b) => a.name.localeCompare(b.name, 'en'))
    return { label: GROUP_EN[group.label] ?? group.label, countries }
  })
}

export function phoneCountryGroups(locale: Locale): PhoneCountryGroup[] {
  if (locale !== 'en') return PHONE_COUNTRY_GROUPS
  englishGroups ??= buildEnglish()
  return englishGroups
}

export function findLocalizedPhoneCountry(iso: string, locale: Locale) {
  for (const group of phoneCountryGroups(locale)) {
    const found = group.countries.find((country) => country.iso === iso)
    if (found) return found
  }
  return undefined
}
