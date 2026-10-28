/**
 * Destinations des appels à l'action — source unique (L1-05).
 *
 * Un CTA écrit `href={ROUTES.demo}` plutôt que `href="/contact"` : le jour où
 * une destination change (page CIPA dédiée, formulaire pré-rempli par offre),
 * elle change ici, pour tout le site. Les chemins sont en français, sans
 * préfixe de langue : le `Link` de i18n/navigation ajoute `/en` au besoin.
 */
export const ROUTES = {
  /** « Demander une démo » : formulaire de contact. */
  // L2-14 : ajouter ?offre=cipa&source=<page> quand le formulaire les lira.
  demo: '/contact',
  /** Prise de contact sans intention de démo (« Échanger avec notre équipe »). */
  contact: '/contact',
  /** « Voir la plateforme » / « Découvrir CIPA » : bloc CIPA de l'accueil. */
  // L2-05 : remplacer par la page CIPA dédiée (/products/cipa) une fois validée.
  cipa: '/#solutions',
  customers: '/customers',
  partners: '/partners',
} as const
