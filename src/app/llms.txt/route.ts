import { ENTIWIN_PATH } from '@/lib/data/entiwin'
import { INDUSTRY_NAMES, industryHref } from '@/lib/data/industries/labels'
import { PLATFORM_MENU, platformHref } from '@/lib/data/platform-menu'
import { pageSeo } from '@/lib/seo/pages'
import { BRAND, SITE_URL } from '@/lib/site'

/**
 * /llms.txt (format llmstxt.org) : résumé du site pour les assistants IA.
 *
 * Généré depuis les données du site, pas écrit à la main : chaque ligne
 * reprend un titre ou une description déjà publiés (lib/seo/pages.ts, menu
 * Plateforme, pages sectorielles), donc rien à tenir à jour en double et
 * aucune affirmation nouvelle. Les URL suivent SITE_URL (préversion
 * comprise). Construit une fois, au build.
 */
export const dynamic = 'force-static'

const url = (path: string, locale: 'fr' | 'en' = 'fr') =>
  locale === 'en' ? `${SITE_URL}/en${path === '/' ? '' : path}` : `${SITE_URL}${path}`

/** Lien vers une page, avec sa description publiée quand elle existe. */
function entry(path: string, label?: string, locale: 'fr' | 'en' = 'fr') {
  const seo = pageSeo(path, locale)
  const description = seo ? `: ${seo.description}` : ''
  return `- [${label ?? seo?.title ?? path}](${url(path, locale)})${description}`
}

function body() {
  const home = pageSeo('/', 'fr')
  return [
    `# ${BRAND.siteName}`,
    '',
    `> ${home?.description ?? ''}`,
    '',
    `${BRAND.product} est le logiciel édité par ${BRAND.organization}. Le site est en français ; la version anglaise est servie sous ${SITE_URL}/en.`,
    '',
    '## Plateforme CIPA',
    '',
    ...PLATFORM_MENU.map(
      (item) => `- [${item.title.fr}](${url(platformHref(item.slug))}): ${item.description.fr}`,
    ),
    entry(ENTIWIN_PATH),
    '',
    '## Secteurs',
    '',
    ...INDUSTRY_NAMES.map(({ slug, name }) => entry(industryHref(slug), name.fr)),
    '',
    '## Entreprise et ressources',
    '',
    ...['/entreprise', '/customers', '/partners', '/resources'].map((path) => entry(path)),
    `- [Questions fréquentes](${SITE_URL}/#faq)`,
    '',
    '## Contact',
    '',
    entry('/contact'),
    '',
    '## English',
    '',
    entry('/', 'Home', 'en'),
    entry('/contact', 'Book a demo', 'en'),
    '',
    '## Optional',
    '',
    entry('/privacy'),
    entry('/conditions-utilisation'),
    '',
  ].join('\n')
}

export function GET() {
  return new Response(body(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
