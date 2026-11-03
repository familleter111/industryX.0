/**
 * Guides de /resources : Sanity quand il est configuré (document `guide`,
 * studio/schemaTypes/guide.ts), sinon lib/data/guides.ts.
 *
 * Le corps d'un guide est édité dans le Studio en texte riche (Portable Text,
 * une version par langue) et converti ici vers les blocs typés que la page
 * sait afficher : intertitre, paragraphe avec liens, liste, encadré. Le même
 * module fait la conversion inverse pour l'import initial
 * (scripts/cms-seed.mjs) : tests/cms.test.ts vérifie que l'aller-retour ne
 * perd rien.
 */

import type { Locale } from '@/i18n/routing'
import { cmsConfig, cmsQuery, localized, type CmsEnv, type Localized } from '@/lib/cms/client'
import {
  GUIDE_CATEGORIES,
  guidesFor,
  type Guide,
  type GuideBlock,
  type GuideCategory,
  type GuideLink,
} from '@/lib/data/guides'

/* ------------------------------------------------------------ Portable Text */

export type PtSpan = { _type?: string; _key?: string; text?: string | null; marks?: string[] | null }
export type PtMarkDef = { _type?: string; _key?: string; href?: string | null }
export type PtBlock = {
  _type?: string
  _key?: string
  style?: string | null
  listItem?: string | null
  level?: number | null
  markDefs?: PtMarkDef[] | null
  children?: PtSpan[] | null
}

/** Style Portable Text de l'encadré doré (« l'idée à retenir »). */
export const CALLOUT_STYLE = 'callout'

const span = (key: string, text: string, marks: string[] = []): PtSpan => ({ _type: 'span', _key: key, text, marks })

function ptBlock(key: string, style: string, children: PtSpan[], extra: Partial<PtBlock> = {}): PtBlock {
  return { _type: 'block', _key: key, style, markDefs: [], children, ...extra }
}

/**
 * Paragraphe et ses liens. Comme la page (withLinks), chaque lien est cherché
 * dans la suite du texte, dans l'ordre ; un passage introuvable reste du
 * texte simple.
 */
function ptParagraph(key: string, text: string, links: GuideLink[] = []): PtBlock {
  const children: PtSpan[] = []
  const markDefs: PtMarkDef[] = []
  let rest = text
  for (const link of links) {
    const at = rest.indexOf(link.text)
    if (at < 0) continue
    const mark = `l${markDefs.length}`
    markDefs.push({ _type: 'link', _key: mark, href: link.href })
    if (at > 0) children.push(span(`s${children.length}`, rest.slice(0, at)))
    children.push(span(`s${children.length}`, link.text, [mark]))
    rest = rest.slice(at + link.text.length)
  }
  if (rest || children.length === 0) children.push(span(`s${children.length}`, rest))
  return ptBlock(key, 'normal', children, { markDefs })
}

/** Blocs du site → Portable Text (import initial). */
export function blocksToPortableText(blocks: GuideBlock[]): PtBlock[] {
  const out: PtBlock[] = []
  const key = () => `b${out.length}`
  for (const block of blocks) {
    if (block.type === 'list') {
      for (const item of block.items) out.push(ptBlock(key(), 'normal', [span('s0', item)], { listItem: 'bullet', level: 1 }))
    } else if (block.type === 'p') {
      out.push(ptParagraph(key(), block.text, block.links))
    } else {
      out.push(ptBlock(key(), block.type === 'h2' ? 'h2' : CALLOUT_STYLE, [span('s0', block.text)]))
    }
  }
  return out
}

/**
 * Portable Text → blocs du site. Les éléments de liste consécutifs forment
 * une liste ; un bloc vide ou d'un type inconnu (image collée, etc.) est
 * ignoré.
 */
export function portableTextToBlocks(blocks: PtBlock[] | null | undefined): GuideBlock[] {
  const out: GuideBlock[] = []
  for (const block of Array.isArray(blocks) ? blocks : []) {
    if (block?._type !== 'block') continue
    const spans = (block.children ?? []).filter((child) => typeof child?.text === 'string')
    const text = spans.map((child) => child.text).join('')
    if (!text.trim()) continue

    const last = out[out.length - 1]
    if (block.listItem) {
      if (last?.type === 'list') last.items.push(text)
      else out.push({ type: 'list', items: [text] })
    } else if (block.style === 'h2') {
      out.push({ type: 'h2', text })
    } else if (block.style === CALLOUT_STYLE || block.style === 'blockquote') {
      out.push({ type: 'callout', text })
    } else {
      const hrefs = new Map(
        (block.markDefs ?? []).flatMap((def) => (def?._type === 'link' && def._key && def.href ? [[def._key, def.href]] : [])),
      )
      const links = spans.flatMap((child) => {
        const href = child.marks?.map((mark) => hrefs.get(mark)).find(Boolean)
        return href && child.text ? [{ text: child.text, href }] : []
      })
      out.push(links.length ? { type: 'p', text, links } : { type: 'p', text })
    }
  }
  return out
}

/* ------------------------------------------------------------ guides */

/** Un guide tel que le renvoie GUIDES_QUERY. */
export type CmsGuide = {
  slug?: string | null
  title?: Localized | null
  metaTitle?: Localized | null
  metaDescription?: Localized | null
  excerpt?: Localized | null
  category?: string | null
  readingMinutes?: number | null
  date?: string | null
  updated?: string | null
  author?: Localized | null
  featured?: boolean | null
  image?: { url?: string | null; path?: string | null; alt?: Localized | null } | null
  related?: { label?: Localized | null; href?: string | null } | null
  body?: { fr?: PtBlock[] | null; en?: PtBlock[] | null } | null
}

/** Du plus récent au plus ancien, comme lib/data/guides.ts. L'image envoyée dans le Studio l'emporte sur le chemin. */
export const GUIDES_QUERY = `*[_type == "guide" && defined(slug.current)] | order(date desc, _createdAt desc) {
  "slug": slug.current, title, metaTitle, metaDescription, excerpt, category, readingMinutes, date, updated,
  author, featured, related, body,
  "image": {"url": image.file.asset->url, "path": image.path, "alt": image.alt}
}`

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const DEFAULT_AUTHOR: Localized = { fr: 'Équipe Industry X.0', en: 'Industry X.0 team' }

/** Sans page liée, le guide renvoie vers la démo (la page n'affiche alors pas de second lien). */
const DEFAULT_RELATED: Localized = { fr: 'Planifier une démo', en: 'Book a demo' }

/** Temps de lecture estimé quand le Studio n'en donne pas : 200 mots par minute. */
function readingMinutes(blocks: GuideBlock[]): number {
  const text = blocks.map((block) => (block.type === 'list' ? block.items.join(' ') : block.text)).join(' ')
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200))
}

/** Lien interne seulement : le Studio n'a pas à envoyer le lecteur hors du site. */
const internal = (href: string | null | undefined) => (href?.startsWith('/') && !href.startsWith('//') ? href : undefined)

/**
 * Document du CMS → guide du site, ou `null` s'il manque l'essentiel (slug,
 * titre, date, image, corps français). Sans corps anglais, la version
 * anglaise affiche le français.
 */
export function guideFromCms(doc: CmsGuide, locale: Locale): Guide | null {
  const slug = doc.slug?.trim()
  const title = localized(doc.title, locale)
  const date = doc.date?.trim()
  const src = doc.image?.url?.trim() || doc.image?.path?.trim()
  const translated = locale === 'en' ? portableTextToBlocks(doc.body?.en) : []
  const body = translated.length ? translated : portableTextToBlocks(doc.body?.fr)
  if (!slug || !title || !date || !ISO_DATE.test(date) || !src || !body.length) return null

  const category: GuideCategory = GUIDE_CATEGORIES.find((known) => known === doc.category) ?? 'Méthode'
  const excerpt = localized(doc.excerpt, locale)
  const updated = doc.updated?.trim()
  const relatedHref = internal(doc.related?.href)
  const minutes = doc.readingMinutes

  return {
    slug,
    title,
    metaTitle: localized(doc.metaTitle, locale) || title,
    metaDescription: localized(doc.metaDescription, locale) || excerpt,
    excerpt,
    category,
    readingMinutes: typeof minutes === 'number' && minutes > 0 ? Math.round(minutes) : readingMinutes(body),
    date,
    ...(updated && ISO_DATE.test(updated) ? { updated } : {}),
    author: localized(doc.author, locale) || localized(DEFAULT_AUTHOR, locale),
    image: { src, alt: localized(doc.image?.alt, locale) },
    ...(doc.featured ? { featured: true } : {}),
    related: relatedHref
      ? { label: localized(doc.related?.label, locale) || localized(DEFAULT_RELATED, locale), href: relatedHref }
      : { label: localized(DEFAULT_RELATED, locale), href: '/contact' },
    body,
  }
}

export function guidesFromCms(docs: CmsGuide[], locale: Locale): Guide[] {
  return docs.flatMap((doc) => guideFromCms(doc, locale) ?? [])
}

/** Guides publiés, du plus récent au plus ancien. Repli : le fichier local. */
export async function loadGuides(locale: Locale, env?: CmsEnv): Promise<Guide[]> {
  const config = cmsConfig(env)
  if (!config) return guidesFor(locale)

  try {
    return guidesFromCms(await cmsQuery<CmsGuide[]>(config, 'guide', GUIDES_QUERY), locale)
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'erreur'
    console.warn(`[cms] guides indisponibles (${reason}) : repli sur le fichier local`)
    return guidesFor(locale)
  }
}

/* ------------------------------------------------------------ import initial */

const localeString = (fr: string, en: string) => ({ _type: 'localeString', fr, en })
const localeText = (fr: string, en: string) => ({ _type: 'localeText', fr, en })

/**
 * Document Sanity d'un guide local, à partir de ses versions française et
 * anglaise (scripts/cms-seed.mjs). L'image reste un fichier de public/.
 */
export function guideDocument(fr: Guide, en: Guide) {
  return {
    _id: `guide-${fr.slug}`,
    _type: 'guide',
    title: localeString(fr.title, en.title),
    slug: { _type: 'slug', current: fr.slug },
    category: fr.category,
    excerpt: localeText(fr.excerpt, en.excerpt),
    image: { path: fr.image.src, alt: localeString(fr.image.alt, en.image.alt) },
    body: { _type: 'localeBody', fr: blocksToPortableText(fr.body), en: blocksToPortableText(en.body) },
    related: { label: localeString(fr.related.label, en.related.label), href: fr.related.href },
    author: localeString(fr.author, en.author),
    date: fr.date,
    ...(fr.updated ? { updated: fr.updated } : {}),
    readingMinutes: fr.readingMinutes,
    featured: Boolean(fr.featured),
    metaTitle: localeString(fr.metaTitle, en.metaTitle),
    metaDescription: localeText(fr.metaDescription, en.metaDescription),
  }
}
