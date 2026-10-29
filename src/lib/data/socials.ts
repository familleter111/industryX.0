/**
 * Réseaux sociaux — source unique.
 *
 * L'URL LinkedIn était recopiée dans la Navbar et sur /about, et le lien du
 * footer pointait encore sur « / » : trois vérités possibles pour une seule
 * page. Tout passe désormais par cette constante.
 */

export const LINKEDIN_URL =
  'https://www.linkedin.com/company/industryx0/posts/?feedView=all'

/**
 * Profils officiels, sous leur adresse canonique : `sameAs` des données
 * structurées (lib/seo/schema.ts). Facebook n'est plus lié depuis le pied de
 * page, mais la page reste celle de l'entreprise.
 */
// TODO(seo): confirmer que https://www.facebook.com/industryx.0 est toujours
// la page officielle (le lien du pied de page a été retiré le 28/10/2026).
export const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/industryx0/',
  'https://www.facebook.com/industryx.0',
]
