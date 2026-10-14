import type { IndustryPageData } from '@/lib/data/industries/types'
import type { Locale } from '@/i18n/routing'
import { overlay, type TextOverlay } from '@/lib/i18n'

import { automotive } from '@/lib/data/industries/automotive'
import { automotiveEn } from '@/lib/data/industries/automotive.en'

/**
 * Registre des pages sectorielles.
 *
 * Les industries encore servies par un fichier de page dedie sous
 * app/[locale]/industries/<slug> n'apparaissent pas ici tant qu'elles n'ont
 * pas ete migrees : elles y sont ajoutees une a une.
 */
export const INDUSTRIES: Record<string, IndustryPageData> = {
  automotive,
}

/** Textes anglais de chaque industrie, poses sur la version francaise. */
const INDUSTRIES_EN: Record<string, TextOverlay<IndustryPageData>> = {
  automotive: automotiveEn,
}

export const industrySlugs = () => Object.keys(INDUSTRIES)

/** Donnee d'une industrie dans la langue demandee. */
export function industryData(slug: string, locale: Locale): IndustryPageData | undefined {
  const data = INDUSTRIES[slug]
  if (!data || locale === 'fr') return data
  return overlay(data, INDUSTRIES_EN[slug])
}
