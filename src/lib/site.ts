import { ENTIWIN_PATH } from '@/lib/data/entiwin'
import { GUIDES } from '@/lib/data/guides'
import { industrySlugs } from '@/lib/data/industries'
import { PLATFORM_PAGES } from '@/lib/data/platform'

/**
 * Adresse publique du site, sans barre finale.
 *
 * Sert de base aux URL absolues : canonical, hreflang, Open Graph, sitemap.
 * Un déploiement de prévisualisation la remplace par sa propre adresse via
 * NEXT_PUBLIC_SITE_URL, pour que ses liens ne pointent pas vers la prod.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.industryx0.pro').replace(
  /\/+$/,
  '',
)

/**
 * Industries servies par un dossier de page dédié, pas encore migrées vers
 * la route [slug] (voir lib/data/industries/index.ts).
 */
const STATIC_INDUSTRIES = ['cosmetics']

/**
 * Toutes les pages publiques, en chemin français (sans préfixe de langue).
 * Une page ajoutée sans être listée ici n'entre pas dans le sitemap : le test
 * tests/site.test.ts compare cette liste aux dossiers de src/app.
 */
export function publicPaths(): string[] {
  return [
    '/',
    '/entreprise',
    '/customers',
    '/partners',
    '/contact',
    '/privacy',
    '/conditions-utilisation',
    '/resources',
    ...GUIDES.map(({ slug }) => `/resources/${slug}`),
    ...PLATFORM_PAGES.map(({ slug }) => `/plateforme/${slug}`),
    ENTIWIN_PATH,
    ...[...STATIC_INDUSTRIES, ...industrySlugs()].map((slug) => `/industries/${slug}`),
  ]
}
