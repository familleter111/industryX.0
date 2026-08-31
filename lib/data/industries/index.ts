import type { IndustryPageData } from '@/lib/data/industries/types'

import { automotive } from '@/lib/data/industries/automotive'

/**
 * Registre des pages sectorielles.
 *
 * Les industries encore servies par un fichier de page dedie sous
 * app/industries/<slug> n'apparaissent pas ici tant qu'elles n'ont pas ete
 * migrees : elles y sont ajoutees une a une.
 */
export const INDUSTRIES: Record<string, IndustryPageData> = {
  automotive,
}

export const industrySlugs = () => Object.keys(INDUSTRIES)
