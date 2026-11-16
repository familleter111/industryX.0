import { Car, ClipboardCheck, Factory, ShieldCheck, Utensils, Zap, type LucideIcon } from 'lucide-react'

import type { Locale } from '@/i18n/routing'

/**
 * Secteurs couverts : source unique, dans l'ordre d'affichage. Chacun a sa
 * page /industries/<slug>.
 *
 * Repris par la grille « Conçu pour vos secteurs » (CipaSection), la réponse
 * de la FAQ sur les secteurs (marqueur `{secteurs}`, voir `fillSectors`), la
 * colonne Industries du pied de page, le menu Industries, le fil d'Ariane
 * des pages sectorielles et /llms.txt (via industries/labels.ts).
 *
 * Ajouter un secteur ici l'ajoute partout ; il lui faut aussi sa page
 * (lib/data/industries, ou le CMS).
 */
export type Sector = {
  slug: string
  /** Nom court : grille, menu, pied de page. */
  name: Record<Locale, string>
  /** Le secteur au fil d'une phrase (FAQ) : « la pharmaceutique ». */
  inSentence: Record<Locale, string>
  /** Pictogramme du secteur : menu Industries et grille de l'accueil. */
  icon: LucideIcon
}

export const SECTORS: Sector[] = [
  {
    slug: 'pharma',
    name: { fr: 'Pharmaceutique', en: 'Pharmaceuticals' },
    inSentence: { fr: 'la pharmaceutique', en: 'pharmaceuticals' },
    icon: ShieldCheck,
  },
  {
    slug: 'food',
    name: { fr: 'Agroalimentaire & boissons', en: 'Food & beverage' },
    inSentence: { fr: 'l’agroalimentaire et les boissons', en: 'food and beverage' },
    icon: Utensils,
  },
  {
    slug: 'cosmetics',
    name: { fr: 'Cosmétique & dispositifs médicaux', en: 'Cosmetics & medical devices' },
    inSentence: {
      fr: 'la cosmétique et les dispositifs médicaux',
      en: 'cosmetics and medical devices',
    },
    icon: ClipboardCheck,
  },
  {
    slug: 'automotive',
    name: { fr: 'Automobile & composants', en: 'Automotive & components' },
    inSentence: { fr: 'l’automobile et les composants', en: 'automotive and components' },
    icon: Car,
  },
  {
    slug: 'electronics',
    name: { fr: 'Électronique & câblage', en: 'Electronics & wiring' },
    inSentence: { fr: 'l’électronique et le câblage', en: 'electronics and wiring' },
    icon: Zap,
  },
  {
    slug: 'packaging',
    name: { fr: 'Packaging & plasturgie', en: 'Packaging & plastics' },
    inSentence: { fr: 'le packaging et la plasturgie', en: 'packaging and plastics' },
    icon: Factory,
  },
]

export const sectorHref = (slug: string) => `/industries/${slug}`

/**
 * Les secteurs en une énumération : « la pharmaceutique, …, ainsi que le
 * packaging et la plasturgie ».
 */
export function sectorList(locale: Locale): string {
  const items = SECTORS.map((sector) => sector.inSentence[locale])
  const last = items.pop()
  return `${items.join(', ')}${locale === 'fr' ? ', ainsi que ' : ', and '}${last}`
}

/** Marqueur remplacé par `sectorList` dans les réponses de la FAQ (fichier local et CMS). */
export const SECTORS_TOKEN = '{secteurs}'

export function fillSectors(text: string, locale: Locale): string {
  return text.split(SECTORS_TOKEN).join(sectorList(locale))
}
