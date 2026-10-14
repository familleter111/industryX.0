import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'
import { localizedPath } from '@/lib/i18n'
import { SITE_URL, publicPaths } from '@/lib/site'

/**
 * Sitemap, servi sur /sitemap.xml.
 *
 * Une entrée par page et par langue, chacune avec ses alternates hreflang :
 * Google relie ainsi /contact et /en/contact comme deux versions d'une même
 * page, au lieu de les traiter en doublons.
 *
 * `lastModified` est la date de construction : le site est statique et
 * entièrement regénéré à chaque déploiement.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return publicPaths().flatMap((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, SITE_URL + localizedPath(path, locale)]),
    )
    return routing.locales.map((locale) => ({
      url: SITE_URL + localizedPath(path, locale),
      lastModified,
      changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : path.split('/').length === 2 ? 0.8 : 0.6,
      alternates: { languages },
    }))
  })
}
