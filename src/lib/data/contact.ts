/**
 * Coordonnées publiques d'Industry X.0 — source unique.
 *
 * Les pages sectorielles écrivaient à contact@industryx0.com quand le footer,
 * les pages légales et l'assistant affichaient hello@industryx0.pro (audit du
 * 14/10/2026, L1-11). Toute adresse, tout numéro et tout lien mailto: / tel:
 * du site passent désormais par ces constantes.
 */

export const CONTACT = {
  email: 'hello@industryx0.pro',
  phone: '+216 51 006 104',
  address: {
    street: 'Cité les pins',
    city: 'Tunis 1053',
    country: { fr: 'Tunisie', en: 'Tunisia' },
  },
  maps: 'https://www.google.com/maps/search/?api=1&query=Cit%C3%A9+les+pins+Tunis+1053+Tunisie',
} as const

export const MAILTO = `mailto:${CONTACT.email}`
export const TEL = `tel:${CONTACT.phone.replace(/\s/g, '')}`

/** Adresse sur une ligne : « Cité les pins, Tunis 1053, Tunisie ». */
export function postalAddress(locale: 'fr' | 'en'): string {
  const { street, city, country } = CONTACT.address
  return `${street}, ${city}, ${country[locale]}`
}
