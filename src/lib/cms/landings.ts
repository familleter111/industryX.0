/**
 * Pages d'atterrissage par canal (/lp/<slug>) : Sanity quand il est configuré
 * (document `landing`, studio/schemaTypes/landing.ts), sinon
 * lib/data/landings.ts. Une page créée dans le Studio est en ligne sans
 * redéploiement.
 */

import type { Locale } from '@/i18n/routing'
import { cmsConfig, cmsQuery, localized, type CmsEnv, type Localized } from '@/lib/cms/client'
import {
  LANDING_CHANNELS,
  landingsFor,
  type LandingChannel,
  type LandingPage,
  type LandingTarget,
} from '@/lib/data/landings'

/** Une page telle que la renvoie LANDINGS_QUERY. */
export type CmsLanding = {
  slug?: string | null
  channel?: string | null
  target?: string | null
  eyebrow?: Localized | null
  title?: Localized | null
  intro?: Localized | null
  benefits?: { title?: Localized | null; text?: Localized | null }[] | null
  ctaLabel?: Localized | null
  utm?: { source?: string | null; medium?: string | null; campaign?: string | null } | null
  metaTitle?: Localized | null
  metaDescription?: Localized | null
}

export const LANDINGS_QUERY = `*[_type == "landing" && defined(slug.current)] | order(_createdAt asc) {
  "slug": slug.current, channel, target, eyebrow, title, intro, benefits, ctaLabel, utm, metaTitle, metaDescription
}`

const TARGETS: readonly LandingTarget[] = ['demo', 'entiwin', 'contact']

const DEFAULT_CTA: Record<LandingTarget, Localized> = {
  demo: { fr: 'Demander une démo', en: 'Book a demo' },
  entiwin: { fr: 'Essayer Enti Win', en: 'Try Enti Win' },
  contact: { fr: 'Nous contacter', en: 'Contact us' },
}

/** Valeur d'UTM : minuscules, chiffres, tirets et soulignés, comme les liens du site. */
const utmValue = (value: string | null | undefined, fallback: string) =>
  value?.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || fallback

/** Document du CMS → page du site, ou `null` sans slug ni titre français. */
export function landingFromCms(doc: CmsLanding, locale: Locale): LandingPage | null {
  const slug = doc.slug?.trim()
  const title = localized(doc.title, locale)
  if (!slug || !doc.title?.fr?.trim()) return null

  const channel: LandingChannel = LANDING_CHANNELS.find((known) => known === doc.channel) ?? 'autre'
  const target: LandingTarget = TARGETS.find((known) => known === doc.target) ?? 'demo'
  const intro = localized(doc.intro, locale)
  const benefits = (doc.benefits ?? []).flatMap((benefit) => {
    const benefitTitle = localized(benefit?.title, locale)
    return benefitTitle ? [{ title: benefitTitle, text: localized(benefit?.text, locale) }] : []
  })

  return {
    slug,
    channel,
    target,
    utm: {
      source: utmValue(doc.utm?.source, channel),
      medium: utmValue(doc.utm?.medium, 'campagne'),
      campaign: utmValue(doc.utm?.campaign, slug),
    },
    eyebrow: localized(doc.eyebrow, locale),
    title,
    intro,
    benefits,
    ctaLabel: localized(doc.ctaLabel, locale) || localized(DEFAULT_CTA[target], locale),
    metaTitle: localized(doc.metaTitle, locale) || title,
    metaDescription: localized(doc.metaDescription, locale) || intro,
  }
}

/** Pages publiées, dans l'ordre de création. Repli : le fichier local. */
export async function loadLandings(locale: Locale, env?: CmsEnv): Promise<LandingPage[]> {
  const config = cmsConfig(env)
  if (!config) return landingsFor(locale)

  try {
    const docs = await cmsQuery<CmsLanding[]>(config, 'landing', LANDINGS_QUERY)
    return docs.flatMap((doc) => landingFromCms(doc, locale) ?? [])
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'erreur'
    console.warn(`[cms] pages d'atterrissage indisponibles (${reason}) : repli sur le fichier local`)
    return landingsFor(locale)
  }
}

/* ------------------------------------------------------------ import initial */

const localeString = (fr: string, en: string) => ({ _type: 'localeString', fr, en })
const localeText = (fr: string, en: string) => ({ _type: 'localeText', fr, en })

/** Document Sanity d'une page du fichier local (scripts/cms-seed.mjs). */
export function landingDocument(fr: LandingPage, en: LandingPage) {
  return {
    _id: `landing-${fr.slug}`,
    _type: 'landing',
    slug: { _type: 'slug', current: fr.slug },
    channel: fr.channel,
    target: fr.target,
    utm: fr.utm,
    eyebrow: localeString(fr.eyebrow, en.eyebrow),
    title: localeString(fr.title, en.title),
    intro: localeText(fr.intro, en.intro),
    benefits: fr.benefits.map((benefit, i) => ({
      _key: `k${i}`,
      title: localeString(benefit.title, en.benefits[i].title),
      text: localeText(benefit.text, en.benefits[i].text),
    })),
    ctaLabel: localeString(fr.ctaLabel, en.ctaLabel),
    metaTitle: localeString(fr.metaTitle, en.metaTitle),
    metaDescription: localeText(fr.metaDescription, en.metaDescription),
  }
}
