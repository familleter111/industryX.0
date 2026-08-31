import {
  ClipboardCheck,
  Factory,
  GitBranch,
  Route,
  SearchCheck,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

/**
 * Les six usages presentes dans le carrousel de CasesSection.
 *
 * `screenshot` decrit la capture affichee dans le mockup telephone. Les
 * fichiers sont attendus dans public/screenshots ; tant qu'ils manquent, le
 * composant retombe sur un ecran schematique (voir AppScreenPlaceholder).
 * Les dimensions sont celles de l'ecran du mockup en 3x : voir
 * public/screenshots/README.md.
 */
export type FeatureTab = {
  id: string
  label: string
  icon: LucideIcon
  title: string
  description: string
  badge?: string
  bullets: string[]
  href: string
  screenshot: { src: string; alt: string; width: number; height: number }
}

/** Ecran du mockup : 144 x 306 px, servi en 3x. */
const SHOT = { width: 432, height: 918 } as const

export const FEATURE_TABS: FeatureTab[] = [
  {
    id: 'audits',
    label: 'Audits internes',
    icon: ClipboardCheck,
    title: 'Audits internes',
    description:
      'Préparez, exécutez et suivez vos audits dans un environnement standardisé avec une traçabilité complète.',
    badge: 'Processus entièrement traçable',
    bullets: [
      'Checklists intelligentes',
      'Rapports automatiques',
      'Suivi des écarts',
      'Validation numérique',
    ],
    href: '/solutions/audits',
    screenshot: {
      src: '/screenshots/audits.webp',
      alt: "Écran CIPA d'exécution d'un audit interne sur mobile",
      ...SHOT,
    },
  },
  {
    id: 'quality',
    label: 'Inspections qualité',
    icon: SearchCheck,
    title: 'Inspections qualité',
    description:
      'Digitalisez les inspections terrain pour améliorer la qualité des données et accélérer les prises de décision.',
    badge: 'Processus entièrement traçable',
    bullets: [
      'Collecte mobile',
      'Photos annotées',
      'Contrôles standardisés',
      'Historique complet',
    ],
    href: '/solutions/quality',
    screenshot: {
      src: '/screenshots/quality.webp',
      alt: 'Écran CIPA de saisie d’une inspection qualité sur mobile',
      ...SHOT,
    },
  },
  {
    id: 'deviations',
    label: 'Déviations & NC',
    icon: GitBranch,
    title: 'Déviations & NC',
    description:
      'Centralisez la gestion des non-conformités depuis leur détection jusqu’à leur clôture.',
    badge: 'Processus entièrement traçable',
    bullets: [
      'Workflow automatisé',
      'Actions correctives',
      'Validation multi-niveaux',
      'Suivi temps réel',
    ],
    href: '/solutions/capa',
    screenshot: {
      src: '/screenshots/deviations.webp',
      alt: 'Écran CIPA de traitement d’une non-conformité sur mobile',
      ...SHOT,
    },
  },
  {
    id: 'production',
    label: 'Contrôles production',
    icon: Factory,
    title: 'Contrôles production',
    description:
      'Renforcez le pilotage qualité directement sur les lignes de fabrication.',
    badge: 'Processus entièrement traçable',
    bullets: [
      'Contrôles périodiques',
      'Alertes instantanées',
      'Indicateurs terrain',
      'Traçabilité totale',
    ],
    href: '/solutions/production',
    screenshot: {
      src: '/screenshots/production.webp',
      alt: 'Écran CIPA de contrôle de production sur mobile',
      ...SHOT,
    },
  },
  {
    id: 'rounds',
    label: 'Tournées terrain',
    icon: Route,
    title: 'Tournées terrain',
    description:
      'Organisez les rondes et inspections opérationnelles avec une exécution homogène.',
    badge: 'Processus entièrement traçable',
    bullets: [
      'Planification simple',
      'Suivi GPS',
      'Checklists terrain',
      'Historique des visites',
    ],
    href: '/solutions/maintenance',
    screenshot: {
      src: '/screenshots/rounds.webp',
      alt: 'Écran CIPA de suivi d’une tournée terrain sur mobile',
      ...SHOT,
    },
  },
  {
    id: 'improvement',
    label: 'Amélioration continue',
    icon: TrendingUp,
    title: 'Amélioration continue',
    description:
      'Transformez vos données terrain en plans d’actions et en gains de performance.',
    badge: 'Processus entièrement traçable',
    bullets: [
      'Tableaux de bord',
      'KPIs en temps réel',
      'Analyses avancées',
      'Suivi des progrès',
    ],
    href: '/solutions/improvement',
    screenshot: {
      src: '/screenshots/improvement.webp',
      alt: 'Écran CIPA de pilotage des plans d’action sur mobile',
      ...SHOT,
    },
  },
]
