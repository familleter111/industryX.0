import type { MetadataRoute } from 'next'

import { SITE_URL, isPreview } from '@/lib/site'

/**
 * robots.txt : tout est indexable sauf les routes de formulaire. Pas de
 * directive `Host` : non standard, Google l'ignore.
 *
 * Préversion (lib/site.ts) : rien à indexer, et pas de sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  if (isPreview()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
