/**
 * Témoignages clients : Sanity quand il est configuré (document
 * `testimonial`, studio/schemaTypes/testimonial.ts), sinon le fichier local
 * lib/data/testimonials.ts, tel quel.
 *
 * Si Sanity ne répond pas, le site affiche la liste locale réduite aux
 * verbatims validés : une panne ne doit pas faire réapparaître une
 * proposition de rédaction retirée dans le CMS.
 */

import type { Locale } from '@/i18n/routing'
import { cmsConfig, cmsQuery, localized, type CmsEnv, type Localized } from '@/lib/cms/client'
import { TESTIMONIAL_COLORS, getTestimonials, type Testimonial } from '@/lib/data/testimonials'

/** Un témoignage tel que le renvoie TESTIMONIALS_QUERY. */
export type CmsTestimonial = {
  company?: string | null
  quote?: Localized | null
  author?: Localized | null
  sector?: Localized | null
  logoAlt?: string | null
  rating?: number | null
  clientApproved?: boolean | null
}

export const TESTIMONIALS_QUERY =
  '*[_type == "testimonial"] | order(order asc, _createdAt asc) {company, quote, author, sector, logoAlt, rating, clientApproved}'

function stars(rating: number | null | undefined): number {
  if (typeof rating !== 'number' || !Number.isFinite(rating)) return 5
  return Math.min(5, Math.max(1, Math.round(rating)))
}

/**
 * Documents du CMS → forme du site. Un document sans société ou sans
 * verbatim français est ignoré. Les couleurs tournent comme dans le fichier
 * local : or, vert, bleu.
 */
export function testimonialsFromCms(docs: CmsTestimonial[], locale: Locale): Testimonial[] {
  return docs
    .flatMap((doc) => {
      const company = doc.company?.trim()
      return company && doc.quote?.fr?.trim() ? [{ doc, company }] : []
    })
    .map(
      ({ doc, company }, index): Testimonial => ({
        quote: localized(doc.quote, locale),
        author: localized(doc.author, locale),
        company,
        sector: localized(doc.sector, locale),
        logoAlt: doc.logoAlt?.trim() || null,
        color: TESTIMONIAL_COLORS[index % TESTIMONIAL_COLORS.length],
        rating: stars(doc.rating),
        status: doc.clientApproved ? 'published' : 'draft',
      }),
    )
}

/**
 * Témoignages à afficher, dans l'ordre choisi dans le Studio.
 * `includeDrafts` ajoute les propositions de rédaction, comme `getTestimonials`.
 */
export async function loadTestimonials(
  locale: Locale,
  { includeDrafts = false }: { includeDrafts?: boolean } = {},
  env?: CmsEnv,
): Promise<Testimonial[]> {
  const config = cmsConfig(env)
  if (!config) return getTestimonials(includeDrafts, locale)

  try {
    const docs = await cmsQuery<CmsTestimonial[]>(config, 'testimonial', TESTIMONIALS_QUERY)
    const list = testimonialsFromCms(docs, locale)
    return includeDrafts ? list : list.filter((testimonial) => testimonial.status === 'published')
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'erreur'
    console.warn(`[cms] témoignages indisponibles (${reason}) : repli sur les verbatims validés du fichier local`)
    return getTestimonials(false, locale)
  }
}
