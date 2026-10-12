/**
 * Source unique des témoignages clients (page d'accueil + /customers).
 *
 * ⚠️ RÈGLE : `status: 'published'` est réservé aux verbatims RÉELLEMENT
 * recueillis auprès du client, avec son accord. Les entrées `status: 'draft'`
 * sont des propositions de rédaction — écrites en interne, jamais prononcées
 * par les entreprises citées. Publier une citation attribuée à une société qui
 * ne l'a pas prononcée est un faux témoignage, avec le risque juridique et
 * réputationnel qui va avec.
 *
 * Les deux surfaces d'affichage appellent aujourd'hui `getTestimonials(true)`,
 * donc les propositions SONT visibles en ligne : chaque entrée `draft` doit
 * être relue et validée par le client, ou remplacée par son verbatim réel.
 * Une fois validée : remplacer le texte par le verbatim et passer `status` à
 * 'published'.
 *
 * Chaque entrée doit pointer vers un logo de CLIENT_LOGOS (`logoAlt`) pour que
 * la vignette soit dimensionnée comme les autres.
 */

import type { LogoAsset } from '@/lib/data/logoSizing'
import type { Locale } from '@/i18n/routing'

export type Testimonial = {
  quote: string
  /** Fonction de la personne citée. */
  author: string
  company: string
  sector: string
  /** `alt` d'une entrée CLIENT_LOGOS, ou null si aucun logo n'est disponible. */
  logoAlt: string | null
  /**
   * Logo hors dossier /public/logos, en dépannage. Même forme qu'une entrée
   * CLIENT_LOGOS — `contentWidth` / `contentHeight` sont les proportions du
   * logo dans son cadre — pour que `logoFrameWidth()` le dimensionne comme
   * les autres.
   */
  fallbackLogo?: LogoAsset
  color: string
  rating: number
  status: 'published' | 'draft'
}

/* Palette de rotation des cartes — or / vert / bleu, dans cet ordre. */
const GOLD = '#DAA250'
const GREEN = '#22C55E'
const BLUE = '#3B82F6'

export const TESTIMONIALS: Testimonial[] = [
  /* ---------- Verbatims réels, recueillis auprès du client ---------- */
  {
    quote:
      'L’intégration de CIPA a considérablement simplifié nos audits et nos opérations quotidiennes. La plateforme a amélioré notre conformité réglementaire tout en nous aidant à résoudre efficacement des problématiques récurrentes de qualité et de suivi.',
    author: 'Quality Manager',
    company: 'Warda Company',
    sector: 'Industrie agroalimentaire',
    logoAlt: 'Warda',
    color: GOLD,
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
    color: GREEN,
    rating: 5,
    status: 'published',
  },

  /* ---------- Propositions de rédaction — À VALIDER PAR LE CLIENT ----------
     Textes écrits en interne. À faire relire et approuver par chaque
     entreprise citée, puis passer en 'published'. Sinon : les supprimer. */
  {
    quote:
      'Les contrôles en cours de fabrication sont désormais saisis directement au poste, avec photo et validation. Nous avons supprimé la ressaisie et divisé par deux le délai de clôture de nos dossiers de lot.',
    author: 'Responsable Assurance Qualité',
    company: 'Médis',
    sector: 'Industrie pharmaceutique',
    logoAlt: 'Médis',
    color: BLUE,
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
    color: GOLD,
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
    color: GREEN,
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
    color: BLUE,
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
    color: GOLD,
    rating: 5,
    status: 'draft',
  },
  {
    quote:
      'Le suivi des interventions sur nos lignes d’extrusion est centralisé : demande, affectation, pièces consommées, retour d’expérience. Nous anticipons les arrêts au lieu de les subir.',
    author: 'Responsable Maintenance',
    company: 'Medpack',
    sector: 'Packaging & plasturgie',
    logoAlt: 'Medpack',
    color: GREEN,
    rating: 5,
    status: 'draft',
  },
  {
    quote:
      'Les indicateurs de production remontent automatiquement, sans consolidation manuelle. Nos chefs d’équipe passent leur temps sur les écarts, plus sur la collecte des chiffres.',
    author: 'Directeur Industriel',
    company: 'TCH Industries',
    sector: 'Industrie mécanique',
    logoAlt: 'TCH Industries',
    color: BLUE,
    rating: 5,
    status: 'draft',
  },
]

/**
 * Version anglaise, indexée par société. Pour un verbatim réel, c'est une
 * traduction du texte validé par le client : toute modification du français
 * doit être reportée ici.
 */
const EN: Record<string, Pick<Testimonial, 'quote' | 'author' | 'sector'>> = {
  'Warda Company': {
    quote:
      'Rolling out CIPA has made our audits and day-to-day operations far simpler. The platform has improved our regulatory compliance while helping us effectively resolve recurring quality and follow-up issues.',
    author: 'Quality Manager',
    sector: 'Food industry',
  },
  'Polyroto Group': {
    quote:
      'With CIPA, we have simplified how we manage our production batches and made our industrial processes more reliable. Automated action plans and quality tracking now ensure compliant, smooth and efficient production.',
    author: 'General Manager',
    sector: 'Marine industry',
  },
  Médis: {
    quote:
      'In-process checks are now entered right at the workstation, with a photo and sign-off. We have eliminated retyping and halved the time it takes to close our batch records.',
    author: 'Quality Assurance Manager',
    sector: 'Pharmaceutical industry',
  },
  Saiph: {
    quote:
      'Our non-conformities are traceable end to end: shop-floor report, root-cause analysis, action plan, effectiveness check. Preparing for an audit now takes a few hours.',
    author: 'Quality Director',
    sector: 'Pharmaceutical industry',
  },
  'Rose Blanche Group': {
    quote:
      'Our inspection rounds on the packaging lines are standardized and time-stamped. Deviations reach supervisors in real time, which has noticeably reduced our scrap.',
    author: 'Production Manager',
    sector: 'Food industry',
  },
  Opella: {
    quote:
      'CIPA gives us a single view of how our sites are performing: compliance, downtime, open actions. Monthly reviews now run on shared data instead of conflicting spreadsheets.',
    author: 'Operations Director',
    sector: 'Consumer healthcare',
  },
  'Neapolis Pharma': {
    quote:
      'We rolled it out step by step, starting with a pilot scope. Shop-floor teams adopted the tool quickly because it matches the way they work.',
    author: 'Continuous Improvement Manager',
    sector: 'Pharmaceutical industry',
  },
  Medpack: {
    quote:
      'Interventions on our extrusion lines are tracked in one place: request, assignment, parts used, lessons learned. We anticipate stoppages instead of suffering them.',
    author: 'Maintenance Manager',
    sector: 'Packaging & plastics',
  },
  'TCH Industries': {
    quote:
      'Production indicators come in automatically, with no manual consolidation. Our team leaders spend their time on deviations, not on collecting figures.',
    author: 'Industrial Director',
    sector: 'Mechanical engineering',
  },
}

const TESTIMONIALS_EN: Testimonial[] = TESTIMONIALS.map((t) => ({ ...t, ...EN[t.company] }))

/** Témoignages affichables. `includeDrafts` inclut les propositions non validées. */
export function getTestimonials(includeDrafts = false, locale: Locale = 'fr'): Testimonial[] {
  const list = locale === 'en' ? TESTIMONIALS_EN : TESTIMONIALS
  return includeDrafts ? list : list.filter((testimonial) => testimonial.status === 'published')
}
