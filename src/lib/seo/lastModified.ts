import { execFileSync } from 'node:child_process'

import { ENTIWIN_PATH } from '@/lib/data/entiwin'
import { guideBySlug, type Guide } from '@/lib/data/guides'

/**
 * Date de dernière modification d'une page, pour le `lastmod` du sitemap.
 *
 * - Guides : la date du contenu (`updated`, sinon `date`), comme un champ
 *   de front-matter.
 * - Autres pages : la date du dernier commit qui a touché leurs fichiers
 *   source (page, composants propres, données).
 *
 * Sans historique git complet (clone superficiel, image Docker sans .git),
 * pas de date plutôt qu'une date fausse : `lastmod` est facultatif, et une
 * date identique partout n'apprend rien aux moteurs. Le déploiement clone
 * donc tout l'historique (fetch-depth: 0 dans deploy.yml).
 */

const APP = 'src/app/[locale]'

/** Fichiers dont dépend le contenu de chaque page. */
function sources(path: string): string[] | undefined {
  const [, section, slug] = path.split('/')
  if (path === '/')
    return [
      `${APP}/page.tsx`,
      'src/components/sections',
      'src/lib/data/faq.ts',
      'src/lib/data/features.ts',
      'src/lib/data/testimonials.ts',
    ]
  if (path === ENTIWIN_PATH) return [`${APP}/plateforme/entiwin`]
  if (section === 'plateforme') return ['src/lib/data/platform.ts', 'src/features/platform']
  if (path === '/industries/cosmetics') return [`${APP}/industries/cosmetics`]
  if (section === 'industries')
    return [`src/lib/data/industries/${slug}.ts`, `src/lib/data/industries/${slug}.en.ts`, 'src/features/industries']
  if (path === '/resources')
    return [`${APP}/resources/page.tsx`, 'src/features/resources', 'src/lib/data/guides.ts', 'src/lib/data/guides.en.ts']
  if (path === '/privacy' || path === '/conditions-utilisation')
    return [`${APP}/(marketing)${path}`, 'src/features/legal']
  if (['/entreprise', '/customers', '/partners', '/contact'].includes(path))
    return [`${APP}/(marketing)${path}`]
  return undefined
}

function git(args: string[]): string | undefined {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return undefined
  }
}

let fullHistory: boolean | undefined
const hasFullHistory = () =>
  (fullHistory ??= git(['rev-parse', '--is-shallow-repository']) === 'false')

const cache = new Map<string, Date | undefined>()

/**
 * `guide` : le guide de la page quand il vient du CMS (sitemap) ; sinon, le
 * guide du fichier local. Sa date n'est pas mise en cache : elle peut changer
 * dans le Studio sans redémarrage.
 */
export function lastModified(path: string, guide?: Pick<Guide, 'date' | 'updated'>): Date | undefined {
  const [, section, slug] = path.split('/')
  const content = guide ?? (section === 'resources' && slug ? guideBySlug(slug) : undefined)
  if (content) return new Date(`${content.updated ?? content.date}T00:00:00Z`)

  if (cache.has(path)) return cache.get(path)
  let date: Date | undefined
  const files = sources(path)
  if (files && hasFullHistory()) {
    // `:(literal)` : sans lui, git lirait « [locale] » comme un motif.
    const iso = git(['log', '-1', '--format=%cI', '--', ...files.map((file) => `:(literal)${file}`)])
    if (iso) date = new Date(iso)
  }
  cache.set(path, date)
  return date
}
