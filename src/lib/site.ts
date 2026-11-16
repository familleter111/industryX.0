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
 * Préversion : déploiement d'une branche avant sa fusion dans main
 * (.github/workflows/preview.yml, NEXT_PUBLIC_SITE_ENV=preview). Rien n'y est
 * indexé (robots.txt, en-tête X-Robots-Tag de next.config.mjs) et un badge la
 * signale (components/layout/PreviewBadge). Figé au build.
 */
export function isPreview(): boolean {
  return process.env.NEXT_PUBLIC_SITE_ENV === 'preview'
}

/**
 * Identité de marque, pour les moteurs de recherche.
 *
 * « Industry X.0 » est aussi un terme générique du secteur : seul, il ne
 * désigne pas l'entreprise de façon univoque. CIPA, le produit, porte donc le
 * signal de marque (suffixe des titres, nom du site) et l'organisation le
 * déclare comme nom alternatif (lib/seo/schema.ts).
 */
export const BRAND = {
  organization: 'Industry X.0',
  product: 'CIPA',
  /** og:site_name et nom du WebSite. */
  siteName: 'CIPA by Industry X.0',
  alternateNames: ['CIPA', 'CIPA by Industry X.0'],
  /** Logo de l'organisation (public/). */
  logo: '/logo.png',
} as const

/**
 * Pages servies mais volontairement hors sitemap (`noindex`) : leur contenu
 * attend une validation (voir l'en-tête de chaque page).
 */
export const NOINDEX_PATHS = ['/mentions-legales']

/**
 * Toutes les pages publiques, en chemin français (sans préfixe de langue).
 * Une page ajoutée sans être listée ici n'entre pas dans le sitemap : le test
 * tests/site.test.ts compare cette liste aux dossiers de src/app.
 *
 * `guideSlugs` : les guides publiés, ceux du fichier local par défaut
 * (lib/cms/seo.ts passe ceux du CMS).
 */
export function publicPaths(guideSlugs: string[] = GUIDES.map(({ slug }) => slug)): string[] {
  return [
    '/',
    '/entreprise',
    '/customers',
    '/partners',
    '/contact',
    '/privacy',
    '/conditions-utilisation',
    '/resources',
    '/faq',
    ...guideSlugs.map((slug) => `/resources/${slug}`),
    ...PLATFORM_PAGES.map(({ slug }) => `/plateforme/${slug}`),
    ENTIWIN_PATH,
    ...industrySlugs().map((slug) => `/industries/${slug}`),
  ]
}
