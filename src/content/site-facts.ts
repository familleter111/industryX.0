/**
 * Faits affichés par le site — source unique (L1-11, préparé pour L3-01).
 *
 * Identité, fondateurs et coordonnées : toute adresse, tout numéro et tout
 * lien mailto: / tel: du site passent par ces constantes. Les pages
 * sectorielles écrivaient à une ancienne adresse en .com quand le footer,
 * les pages légales et l'assistant affichaient l'adresse en .pro (audit du
 * 14/10/2026).
 *
 * Les chiffres (clients, pays, cas d'usage, partenaires) seront ajoutés ici
 * en L3-01 avec un statut : seuls les faits `validated` s'affichent.
 */

export type FactStatus = 'validated' | 'pending'

export const COMPANY = {
  name: 'Industry X.0',
  founded: 2019,
  city: 'Tunis',
  founders: [
    { name: 'Bilel Labidi', role: { fr: 'CEO & cofondateur', en: 'CEO & co-founder' } },
    { name: 'Aziz Battikh', role: { fr: 'CTO & cofondateur', en: 'CTO & co-founder' } },
  ],
} as const

export const CONTACT = {
  // TODO(À CONFIRMER : une adresse contact@ en .com doit-elle encore exister / rediriger ?)
  email: 'hello@industryx0.pro',
  phone: '+216 51 006 104',
  address: {
    street: 'Cité Les Pins',
    city: '1053 Tunis',
    country: { fr: 'Tunisie', en: 'Tunisia' },
    /** Champs séparés de l'adresse postale (données structurées). */
    postalCode: '1053',
    locality: 'Tunis',
    countryCode: 'TN',
  },
  maps: 'https://www.google.com/maps/search/?api=1&query=Cit%C3%A9+Les+Pins+1053+Tunis+Tunisie',
} as const

export const MAILTO = `mailto:${CONTACT.email}`
export const TEL = `tel:${CONTACT.phone.replace(/\s/g, '')}`

/** Adresse sur une ligne : « Cité Les Pins, 1053 Tunis, Tunisie ». */
export function postalAddress(locale: 'fr' | 'en'): string {
  const { street, city, country } = CONTACT.address
  return `${street}, ${city}, ${country[locale]}`
}
