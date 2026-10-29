import type { Locale } from '@/i18n/routing'

/**
 * Nom court de chaque page sectorielle, dans l'ordre du menu Industries :
 * menu, pied de page et fil d'Ariane des données structurées.
 *
 * Module sans dépendance : la Navbar, composant client, l'importe sans
 * embarquer les données des pages.
 */
export const INDUSTRY_NAMES: { slug: string; name: Record<Locale, string> }[] = [
  { slug: 'pharma', name: { fr: 'Pharmaceutique', en: 'Pharmaceuticals' } },
  { slug: 'food', name: { fr: 'Agroalimentaire & boissons', en: 'Food & beverage' } },
  {
    slug: 'cosmetics',
    name: { fr: 'Cosmétique & dispositifs médicaux', en: 'Cosmetics & medical devices' },
  },
  { slug: 'automotive', name: { fr: 'Automobile & composants', en: 'Automotive & components' } },
  { slug: 'electronics', name: { fr: 'Électronique & câblage', en: 'Electronics & wiring' } },
  { slug: 'packaging', name: { fr: 'Packaging & plasturgie', en: 'Packaging & plastics' } },
]

export const industryHref = (slug: string) => `/industries/${slug}`

export function industryName(slug: string, locale: Locale): string | undefined {
  return INDUSTRY_NAMES.find((industry) => industry.slug === slug)?.name[locale]
}
