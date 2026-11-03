import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'
import { loadGuides } from '@/lib/cms/guides'
import { localizedPath } from '@/lib/i18n'
import { lastModified } from '@/lib/seo/lastModified'
import { SITE_URL, publicPaths } from '@/lib/site'

/**
 * Sitemap, servi sur /sitemap.xml.
 *
 * Une entrée par page et par langue, chacune avec ses alternates hreflang
 * (fr, en, et x-default vers le français) : Google relie ainsi /contact et
 * /en/contact comme deux versions d'une même page, au lieu de les traiter en
 * doublons.
 *
 * `lastModified` est la date réelle de chaque page (lib/seo/lastModified.ts),
 * absente quand on ne la connaît pas.
 *
 * Les guides sont ceux du CMS quand il est configuré (lib/cms/guides.ts) : un
 * guide publié dans le Studio y entre sans redéploiement.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const list = await loadGuides('fr')
  const guides = new Map(list.map((guide) => [`/resources/${guide.slug}`, guide]))
  return publicPaths(list.map((guide) => guide.slug)).flatMap((path) => {
    const languages = {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, SITE_URL + localizedPath(path, locale)]),
      ),
      'x-default': SITE_URL + localizedPath(path, routing.defaultLocale),
    }
    const modified = lastModified(path, guides.get(path))
    return routing.locales.map((locale) => ({
      url: SITE_URL + localizedPath(path, locale),
      ...(modified ? { lastModified: modified } : {}),
      changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : path.split('/').length === 2 ? 0.8 : 0.6,
      alternates: { languages },
    }))
  })
}
