/**
 * Source unique des témoignages clients (page d'accueil + /customers).
 *
 * ⚠️ RÈGLE : `status: 'published'` est réservé aux verbatims RÉELLEMENT
 * recueillis auprès du client, avec son accord. Les entrées `status: 'draft'`
 * sont des propositions de rédaction — elles ne sont PAS affichées tant que
 * quelqu'un ne les a pas validées auprès de l'entreprise citée. Publier une
 * citation attribuée à une société qui ne l'a pas prononcée est un faux
 * témoignage, avec le risque juridique et réputationnel qui va avec.
 *
 * Pour publier une entrée : remplacer son texte par le verbatim validé, puis
 * passer `status` à 'published'.
 */

export type Testimonial = {
  quote: string
  /** Fonction de la personne citée. */
  author: string
  company: string
  sector: string
  /** `alt` d'une entrée CLIENT_LOGOS, ou null si aucun logo n'est disponible. */
  logoAlt: string | null
  /** Logo hors dossier /public/logos, en dépannage. */
  fallbackLogo?: string
  color: string
  rating: number
  status: 'published' | 'draft'
}

export const TESTIMONIALS: Testimonial[] = [
  /* ---------- Verbatims réels, déjà en ligne ---------- */
  {
    quote:
      'L’intégration de CIPA a considérablement simplifié nos audits et nos opérations quotidiennes. La plateforme a amélioré notre conformité réglementaire tout en nous aidant à résoudre efficacement des problématiques récurrentes de qualité et de suivi.',
    author: 'Quality Manager',
    company: 'Warda Company',
    sector: 'Industrie agroalimentaire',
    logoAlt: 'Warda',
    color: '#DAA250',
    rating: 5,
    status: 'published',
  },
  {
    quote:
      'Grâce à CIPA, nous avons simplifié la gestion de nos lots de production et renforcé la fiabilité de nos processus industriels. Les plans d’action automatisés ainsi que le suivi qualité garantissent désormais une production conforme, fluide et performante.',
    author: 'General Manager',
    company: 'Polyroto Group',
    sector: 'Industrie navale',
    logoAlt: 'Polyroto Group',
    color: '#22C55E',
    rating: 5,
    status: 'published',
  },
  {
    quote:
      'CIPA nous a permis d’obtenir une meilleure visibilité sur nos opérations techniques et nos performances industrielles. Les outils d’analyse et le suivi intelligent des interventions ont réduit les temps d’arrêt et amélioré l’efficacité globale de nos équipes.',
    author: 'Directeur Technique',
    company: 'Bakou Motors',
    sector: 'Industrie automobile',
    // Aucun logo Bakou Motors dans /public/logos.
    logoAlt: null,
    color: '#3B82F6',
    rating: 5,
    status: 'published',
  },

  /* ---------- Propositions de rédaction — NON PUBLIÉES ----------
     Textes écrits en interne, jamais prononcés par ces entreprises.
     À faire relire et valider par chaque client avant de passer en
     'published'. Sinon : les supprimer. */
  {
    quote:
      'Les contrôles en cours de fabrication sont désormais saisis directement au poste, avec photo et validation. Nous avons supprimé la ressaisie et divisé par deux le délai de clôture de nos dossiers de lot.',
    author: 'Responsable Assurance Qualité',
    company: 'Médis',
    sector: 'Industrie pharmaceutique',
    logoAlt: 'Médis',
    color: '#DAA250',
    rating: 5,
    status: 'draft',
  },
  {
    quote:
      'La traçabilité de nos non-conformités est complète de bout en bout : déclaration terrain, analyse de cause, plan d’action, vérification d’efficacité. Nos audits se préparent maintenant en quelques heures.',
    author: 'Directrice Qualité',
    company: 'Saiph',
    sector: 'Industrie pharmaceutique',
    logoAlt: 'Saiph',
    color: '#22C55E',
    rating: 5,
    status: 'draft',
  },
  {
    quote:
      'Nos tournées d’inspection sur les lignes de conditionnement sont standardisées et horodatées. Les écarts remontent en temps réel aux superviseurs, ce qui a nettement réduit nos rebuts.',
    author: 'Responsable Production',
    company: 'Rose Blanche Group',
    sector: 'Industrie agroalimentaire',
    logoAlt: 'Rose Blanche Group',
    color: '#3B82F6',
    rating: 5,
    status: 'draft',
  },
  {
    quote:
      'CIPA nous donne une lecture unique de la performance de nos sites : conformité, arrêts, actions ouvertes. Les revues mensuelles se font sur des données partagées plutôt que sur des tableurs divergents.',
    author: 'Directeur des Opérations',
    company: 'Opella',
    sector: 'Santé grand public',
    logoAlt: 'Opella',
    color: '#DAA250',
    rating: 5,
    status: 'draft',
  },
  {
    quote:
      'Le déploiement s’est fait par étapes, en commençant par un périmètre pilote. Les équipes terrain ont adopté l’outil rapidement parce qu’il correspond à leur façon de travailler.',
    author: 'Responsable Amélioration Continue',
    company: 'Neapolis Pharma',
    sector: 'Industrie pharmaceutique',
    logoAlt: 'Neapolis Pharma',
    color: '#22C55E',
    rating: 5,
    status: 'draft',
  },
]

/** Témoignages affichables. Passer `includeDrafts` à true une fois les propositions validées. */
export function getTestimonials(includeDrafts = false): Testimonial[] {
  return includeDrafts
    ? TESTIMONIALS
    : TESTIMONIALS.filter((testimonial) => testimonial.status === 'published')
}
