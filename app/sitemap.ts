import type { MetadataRoute } from 'next'

import { COMPANY, navHrefs } from '@/content/shared'

/**
 * Sitemap du site, servi sur /sitemap.xml.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  IL N'Y A PAS DE LISTE D'URL ICI
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Les chemins sont lus dans `NAV_GROUPS` — la meme source que le mega menu,
 * le pied de page et les blocs de maillage interne. Une liste recopiee dans ce
 * fichier aurait diverge a la premiere page ajoutee, et c'est le genre d'ecart
 * que personne ne remarque : un sitemap obsolete ne casse rien, il se contente
 * de ne plus faire indexer les pages recentes.
 *
 * Seule l'accueil est ajoutee a la main : elle n'est dans aucun menu deroulant,
 * puisqu'on y accede par le logo.
 *
 * `lastModified` est pose a la date de construction. C'est honnete pour un site
 * entierement statique reconstruit a chaque deploiement — toutes les pages sont
 * effectivement regenerees ce jour-la. Une date par page demanderait de la lire
 * dans git, ce qui n'a d'interet que si les pages evoluent separement.
 */

/** Pages hors navigation, ou classees a part. */
const HOME = '/'

/**
 * Priorites. Elles ne sont qu'une indication d'importance relative au sein du
 * site, jamais un moyen de classement : Google les ignore largement. On reste
 * donc sobre — l'accueil devant, les pages piliers ensuite, le reste a plat.
 */
function priorityOf(path: string): number {
  if (path === HOME) return 1
  if (path === '/plateforme') return 0.9
  if (path.startsWith('/plateforme/') || path.startsWith('/solutions/')) return 0.8
  return 0.6
}

function changeFrequencyOf(
  path: string,
): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (path === HOME) return 'weekly'
  return 'monthly'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // `navHrefs()` dedoublonne deja : une page listee dans deux groupes
  // n'apparait qu'une fois.
  const paths = [HOME, ...navHrefs()]

  return paths.map((path) => ({
    url: `${COMPANY.siteUrl}${path === HOME ? '' : path}`,
    lastModified,
    changeFrequency: changeFrequencyOf(path),
    priority: priorityOf(path),
  }))
}
