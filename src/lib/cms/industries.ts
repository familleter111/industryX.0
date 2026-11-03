/**
 * Pages sectorielles (/industries/<slug>) : les textes viennent de Sanity
 * quand il est configuré (document `industry`, studio/schemaTypes/industry.ts),
 * la structure reste dans le code (lib/data/industries).
 *
 * Une page sectorielle mêle du texte et du dessin : icônes, nombre de
 * diapositives, visuels animés tracés à la main. Le CMS ne porte que le
 * texte, posé sur la page du code par `overlay`, position par position,
 * exactement comme la traduction anglaise. Un texte vide dans le Studio
 * laisse celui du code ; les visuels (maquettes d'écran, courbes) restent
 * dans le code.
 */

import type { Locale } from '@/i18n/routing'
import { cmsConfig, cmsQuery, type CmsEnv, type Localized } from '@/lib/cms/client'
import type { CarouselSlide, IndustryPageData } from '@/lib/data/industries/types'
import type { TextOverlay } from '@/lib/i18n'

/** Textes d'une page sectorielle, à poser sur sa version du code. */
export type IndustryText = TextOverlay<IndustryPageData>

type Text = Localized | null | undefined

type CmsSlide = {
  num?: string | null
  tag?: Text
  title?: Text
  desc?: Text
  before?: Text[] | null
  after?: Text[] | null
  kpis?: { value?: string | null; label?: Text }[] | null
  visualCaption?: Text
}

/** Un secteur tel que le renvoie INDUSTRIES_QUERY. */
export type CmsIndustry = {
  slug?: string | null
  metaTitle?: Text
  metaDescription?: Text
  headlinePrefix?: Text
  headline?: Text
  heroStatement?: { eyebrow?: Text; title?: Text[] | null } | null
  intro?: Text
  heroAlt?: Text
  indicators?: Text[] | null
  overview?: Text
  useCasesTitle?: Text
  coreAccentLabel?: Text
  coreSlides?: CmsSlide[] | null
  performanceAccentLabel?: Text
  performanceTitle?: Text
  performanceSlides?: CmsSlide[] | null
  platform?: { title?: Text; desc?: Text; features?: { label?: Text }[] | null } | null
  steps?: { title?: Text; desc?: Text }[] | null
  cta?: { title?: Text; text?: Text } | null
}

/** Tous les secteurs en une requête : un seul cache pour les cinq pages. */
export const INDUSTRIES_QUERY = '*[_type == "industry" && defined(slug)]'

/**
 * Document du CMS → textes de la page. Les textes vides sont omis : le code
 * garde alors le sien, dans la même langue (le code a toujours les deux, et
 * certains textes anglais sont vides exprès, comme le « de » du titre). Les
 * listes gardent leurs positions : `overlay` associe le n-ième texte au
 * n-ième élément de la page.
 */
export function industryTextFromCms(doc: CmsIndustry, locale: Locale): IndustryText {
  const text = (value: Text) => {
    const translated = value?.[locale]
    return translated?.trim() ? translated : undefined
  }
  const plain = (value: string | null | undefined) => value?.trim() || undefined
  const texts = (list: Text[] | null | undefined) => list?.map(text)
  const slides = (list: CmsSlide[] | null | undefined) =>
    list?.map((slide) => ({
      num: plain(slide?.num),
      tag: text(slide?.tag),
      title: text(slide?.title),
      desc: text(slide?.desc),
      before: texts(slide?.before),
      after: texts(slide?.after),
      kpis: slide?.kpis?.map((kpi) => ({ value: plain(kpi?.value), label: text(kpi?.label) })),
      visualCaption: text(slide?.visualCaption),
    }))

  // Les trous (`undefined`) sont voulus : overlay garde alors le texte du code.
  return {
    metaTitle: text(doc.metaTitle),
    metaDescription: text(doc.metaDescription),
    headlinePrefix: text(doc.headlinePrefix),
    headline: text(doc.headline),
    heroStatement: doc.heroStatement
      ? { eyebrow: text(doc.heroStatement.eyebrow), title: texts(doc.heroStatement.title) }
      : undefined,
    intro: text(doc.intro),
    hero: { alt: text(doc.heroAlt) },
    indicators: texts(doc.indicators),
    overview: text(doc.overview),
    useCasesTitle: text(doc.useCasesTitle),
    coreAccentLabel: text(doc.coreAccentLabel),
    coreSlides: slides(doc.coreSlides),
    performanceAccentLabel: text(doc.performanceAccentLabel),
    performanceTitle: text(doc.performanceTitle),
    performanceSlides: slides(doc.performanceSlides),
    platform: doc.platform
      ? {
          title: text(doc.platform.title),
          desc: text(doc.platform.desc),
          features: doc.platform.features?.map((feature) => ({ label: text(feature?.label) })),
        }
      : undefined,
    steps: doc.steps?.map((step) => ({ title: text(step?.title), desc: text(step?.desc) })),
    cta: doc.cta ? { title: text(doc.cta.title), text: text(doc.cta.text) } : undefined,
  } as IndustryText
}

/**
 * Textes du secteur `slug` dans Sanity, ou `undefined` : pas de CMS, pas de
 * document pour ce secteur, ou Sanity indisponible. La page affiche alors
 * les textes du code.
 */
export async function loadIndustryText(
  slug: string,
  locale: Locale,
  env?: CmsEnv,
): Promise<IndustryText | undefined> {
  const config = cmsConfig(env)
  if (!config) return undefined

  try {
    const docs = await cmsQuery<CmsIndustry[]>(config, 'industry', INDUSTRIES_QUERY)
    const doc = docs.find((candidate) => candidate.slug === slug)
    return doc && industryTextFromCms(doc, locale)
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'erreur'
    console.warn(`[cms] secteur ${slug} indisponible (${reason}) : textes du code`)
    return undefined
  }
}

/* ------------------------------------------------------------ import initial */

const localeString = (fr: string, en: string) => ({ _type: 'localeString', fr, en })
const localeText = (fr: string, en: string) => ({ _type: 'localeText', fr, en })

/** Clés `_key` des éléments de liste, exigées par Sanity. */
const keyed = <T extends object>(list: T[]) => list.map((item, i) => ({ _key: `k${i}`, ...item }))

const strings = (fr: string[], en: string[]) => keyed(fr.map((text, i) => localeString(text, en[i])))

function slidesDocument(fr: CarouselSlide[], en: CarouselSlide[]) {
  return keyed(
    fr.map((slide, i) => ({
      _type: 'industrySlide',
      num: slide.num,
      tag: localeString(slide.tag, en[i].tag),
      title: localeString(slide.title, en[i].title),
      desc: localeText(slide.desc, en[i].desc),
      before: strings(slide.before, en[i].before),
      after: strings(slide.after, en[i].after),
      kpis: keyed(slide.kpis.map((kpi, k) => ({ value: kpi.value, label: localeString(kpi.label, en[i].kpis[k].label) }))),
      visualCaption: localeString(slide.visualCaption, en[i].visualCaption),
    })),
  )
}

/**
 * Document Sanity d'un secteur du code, à partir de ses versions française et
 * anglaise (scripts/cms-seed.mjs). Seuls les champs que la page utilise sont
 * créés : le Studio masque les autres.
 */
export function industryDocument(fr: IndustryPageData, en: IndustryPageData) {
  const optional = (key: 'headline' | 'headlinePrefix' | 'performanceTitle') =>
    fr[key] ? { [key]: localeString(fr[key] ?? '', en[key] ?? '') } : {}

  return {
    _id: `industry-${fr.slug}`,
    _type: 'industry',
    slug: fr.slug,
    metaTitle: localeString(fr.metaTitle, en.metaTitle),
    metaDescription: localeText(fr.metaDescription, en.metaDescription),
    ...optional('headlinePrefix'),
    ...optional('headline'),
    ...(fr.heroStatement && en.heroStatement
      ? {
          heroStatement: {
            eyebrow: localeString(fr.heroStatement.eyebrow, en.heroStatement.eyebrow),
            title: strings(fr.heroStatement.title, en.heroStatement.title),
          },
        }
      : {}),
    intro: localeText(fr.intro, en.intro),
    heroAlt: localeString(fr.hero.alt, en.hero.alt),
    indicators: strings(fr.indicators, en.indicators),
    overview: localeText(fr.overview, en.overview),
    useCasesTitle: localeString(fr.useCasesTitle, en.useCasesTitle),
    coreAccentLabel: localeString(fr.coreAccentLabel, en.coreAccentLabel),
    coreSlides: slidesDocument(fr.coreSlides, en.coreSlides),
    performanceAccentLabel: localeString(fr.performanceAccentLabel, en.performanceAccentLabel),
    ...optional('performanceTitle'),
    performanceSlides: slidesDocument(fr.performanceSlides, en.performanceSlides),
    platform: {
      title: localeString(fr.platform.title, en.platform.title),
      desc: localeText(fr.platform.desc, en.platform.desc),
      features: keyed(fr.platform.features.map((feature, i) => ({ label: localeString(feature.label, en.platform.features[i].label) }))),
    },
    steps: keyed(fr.steps.map((step, i) => ({ title: localeString(step.title, en.steps[i].title), desc: localeText(step.desc, en.steps[i].desc) }))),
    cta: { title: localeString(fr.cta.title, en.cta.title), text: localeText(fr.cta.text, en.cta.text) },
  }
}
