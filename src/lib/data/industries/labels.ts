import type { Locale } from '@/i18n/routing'
import { SECTORS, sectorHref } from '@/lib/data/sectors'

/**
 * Nom court de chaque page sectorielle, dans l'ordre du menu Industries :
 * menu, pied de page et fil d'Ariane des données structurées.
 *
 * Dérivé de lib/data/sectors.ts, la source unique des secteurs. Module
 * léger : la Navbar, composant client, l'importe sans embarquer les données
 * des pages.
 */
export const INDUSTRY_NAMES: { slug: string; name: Record<Locale, string> }[] = SECTORS.map(
  ({ slug, name }) => ({ slug, name }),
)

export const industryHref = sectorHref

export function industryName(slug: string, locale: Locale): string | undefined {
  return INDUSTRY_NAMES.find((industry) => industry.slug === slug)?.name[locale]
}
