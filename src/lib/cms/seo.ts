/**
 * Titres, descriptions et liste des pages quand une partie du contenu vient
 * du CMS : les guides (tous leurs textes, et les guides créés dans le Studio)
 * et les secteurs (titre et description). Les autres pages gardent la table
 * de lib/seo/pages.ts.
 *
 * Utilisé par les métadonnées des pages guides et secteurs, et par les images
 * de partage (app/og).
 */

import type { Metadata } from 'next'

import { loadGuides } from '@/lib/cms/guides'
import { loadIndustryText } from '@/lib/cms/industries'
import type { CmsEnv } from '@/lib/cms/client'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo/metadata'
import { pageSeo, type PageSeo } from '@/lib/seo/pages'
import { publicPaths } from '@/lib/site'

export async function cmsPageSeo(path: string, locale: Locale, env?: CmsEnv): Promise<PageSeo | undefined> {
  const [, section, slug] = path.split('/')
  if (section === 'resources' && slug) {
    const guide = (await loadGuides(locale, env)).find((candidate) => candidate.slug === slug)
    return guide && { title: guide.metaTitle, description: guide.metaDescription }
  }

  const seo = pageSeo(path, locale)
  if (section === 'industries' && slug && seo) {
    const text = await loadIndustryText(slug, locale, env)
    return { ...seo, title: text?.metaTitle || seo.title, description: text?.metaDescription || seo.description }
  }
  return seo
}

/** Métadonnées d'une page, titre et description lus dans le CMS (voir seoMetadata). */
export async function cmsSeoMetadata(
  path: string,
  locale: Locale,
  extra?: { openGraph?: Metadata['openGraph'] },
): Promise<Metadata> {
  const seo = await cmsPageSeo(path, locale)
  return seo ? pageMetadata({ locale, path, ...seo, ...extra }) : {}
}

/** Toutes les pages publiques, guides du CMS compris (voir publicPaths). */
export async function cmsPublicPaths(env?: CmsEnv): Promise<string[]> {
  return publicPaths((await loadGuides('fr', env)).map((guide) => guide.slug))
}
