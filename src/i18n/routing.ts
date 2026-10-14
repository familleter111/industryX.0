import { defineRouting } from 'next-intl/routing'

/**
 * Deux langues. Le français reste servi aux adresses historiques (`/`,
 * `/plateforme/terrain`…) : aucun lien existant ne casse. L'anglais vit sous
 * `/en/...`.
 *
 * Pas de détection par `Accept-Language` : un visiteur tunisien dont le
 * navigateur est en anglais arriverait sinon sur la version anglaise sans
 * l'avoir demandé. Le choix passe par le sélecteur de la barre de navigation,
 * qui le mémorise ensuite dans le cookie NEXT_LOCALE.
 */
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
