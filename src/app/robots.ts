import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'

/** robots.txt : tout est indexable sauf les routes de formulaire. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
