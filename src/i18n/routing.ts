import { defineRouting } from 'next-intl/routing'

/**
 * Deux langues. Le français reste servi aux adresses historiques (`/`,
 * `/plateforme/remontee-terrain`…) : aucun lien existant ne casse. L'anglais vit sous
 * `/en/...`.
 *
 * Pas de détection par `Accept-Language` : un visiteur tunisien dont le
 * navigateur est en anglais arriverait sinon sur la version anglaise sans
 * l'avoir demandé. Le choix passe par le sélecteur de la barre de navigation,
 * qui le mémorise ensuite dans le cookie NEXT_LOCALE.
 */
// TODO(seo): les pages anglaises gardent des slugs français
// (/en/plateforme/remontee-terrain, /en/resources/digitaliser-audits-terrain…).
// Migration reportée : il faudrait passer next-intl en `pathnames` typés,
// réécrire la quarantaine de liens codés en dur (dont les ancres
// /plateforme/…#section), traduire les valeurs de slug dans le sélecteur de
// langue, et poser une redirection 301 par ancienne URL — sans suite de
// tests navigateur pour attraper une régression. Plan détaillé dans
// SEO-REPORT.md, section G.
export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value)
}
