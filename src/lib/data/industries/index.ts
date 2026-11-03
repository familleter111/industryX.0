import type { IndustryPageData } from '@/lib/data/industries/types'
import type { Locale } from '@/i18n/routing'
import { overlay, type TextOverlay } from '@/lib/i18n'

import { automotive } from '@/lib/data/industries/automotive'
import { automotiveEn } from '@/lib/data/industries/automotive.en'
import { cosmetics } from '@/lib/data/industries/cosmetics'
import { cosmeticsEn } from '@/lib/data/industries/cosmetics.en'
import { electronics } from '@/lib/data/industries/electronics'
import { electronicsEn } from '@/lib/data/industries/electronics.en'
import { food } from '@/lib/data/industries/food'
import { foodEn } from '@/lib/data/industries/food.en'
import { packaging } from '@/lib/data/industries/packaging'
import { packagingEn } from '@/lib/data/industries/packaging.en'
import { pharma } from '@/lib/data/industries/pharma'
import { pharmaEn } from '@/lib/data/industries/pharma.en'

/**
 * Registre des pages sectorielles : les six secteurs, tous servis par la
 * route [slug] et le gabarit commun (features/industries/IndustryPage).
 */
export const INDUSTRIES: Record<string, IndustryPageData> = {
  automotive,
  cosmetics,
  electronics,
  food,
  packaging,
  pharma,
}

/** Textes anglais de chaque industrie, poses sur la version francaise. */
const INDUSTRIES_EN: Record<string, TextOverlay<IndustryPageData>> = {
  automotive: automotiveEn,
  cosmetics: cosmeticsEn,
  electronics: electronicsEn,
  food: foodEn,
  packaging: packagingEn,
  pharma: pharmaEn,
}

export const industrySlugs = () => Object.keys(INDUSTRIES)

/** Donnee d'une industrie dans la langue demandee. */
export function industryData(slug: string, locale: Locale): IndustryPageData | undefined {
  const data = INDUSTRIES[slug]
  if (!data || locale === 'fr') return data
  return overlay(data, INDUSTRIES_EN[slug])
}
