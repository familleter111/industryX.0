import type { Locale } from '@/i18n/routing'

/**
 * Images de partage (Open Graph, Twitter), une par page et par langue,
 * générées à la construction par app/og/[image]/route.tsx.
 *
 * Le nom de fichier encode la langue et le chemin : /og/fr.png pour
 * l'accueil, /og/en__plateforme__gestion-ecarts.png… Il finit par « .png » :
 * le middleware de langue ignore les chemins qui contiennent un point, donc
 * l'image est servie telle quelle, sans redirection.
 */

export const OG_SIZE = { width: 1200, height: 630 }

/** Nom de fichier de l'image d'une page (chemin français, sans /en). */
export function ogImageKey(path: string, locale: Locale): string {
  const segments = path.split('/').filter(Boolean)
  return `${[locale, ...segments].join('__')}.png`
}

export const ogImagePath = (path: string, locale: Locale) => `/og/${ogImageKey(path, locale)}`

/** Rubrique affichée au-dessus du titre, sur l'image. */
export function ogEyebrow(path: string, locale: Locale): string {
  const fr = locale === 'fr'
  if (path === '/') return fr ? 'CIPA par Industry X.0' : 'CIPA by Industry X.0'
  if (path === '/plateforme/entiwin') return fr ? 'Nouveau · Industry X.0' : 'New · Industry X.0'
  if (path.startsWith('/plateforme/')) return fr ? 'Plateforme CIPA' : 'CIPA platform'
  if (path.startsWith('/industries/')) return fr ? 'Secteurs industriels' : 'Industries'
  if (path.startsWith('/resources/')) return fr ? 'Guide pratique' : 'Practical guide'
  if (path === '/resources') return fr ? 'Guides & insights' : 'Guides & insights'
  return 'Industry X.0'
}
