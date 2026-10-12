import {
  ClipboardCheck,
  Factory,
  GitBranch,
  Route,
  SearchCheck,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { platformHref } from '@/lib/data/platform'
import type { Locale } from '@/i18n/routing'

/**
 * Les six usages presentes dans le carrousel de CasesSection.
 *
 * `screenshot` decrit la capture affichee dans le mockup tablette. Les
 * fichiers sont les public/ecran-*.png ; si l'un d'eux manque, le
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
  /**
   * Capture au format tablette portrait (3:4, ex. 1536 x 2048), facultative.
   * Absente, le mockup tablette montre le haut de `screenshot`.
   */
  tablet?: { src: string; width: number; height: number }
}

/** Captures sources (public/ecran-*.png), exportees en 1170 x 2532. */
const SHOT = { width: 1170, height: 2532 } as const

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
    href: platformHref('terrain', 'audits'),
    screenshot: {
      src: '/ecran-teaser-v2.png',
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
    href: platformHref('terrain', 'inspections'),
    screenshot: {
      src: '/ecran-inspections-qualite.png',
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
    href: platformHref('qualite', 'deviations'),
    screenshot: {
      src: '/ecran-deviations-nc.png',
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
    href: platformHref('terrain', 'production'),
    screenshot: {
      src: '/ecran-controles-production.png',
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
    href: platformHref('terrain', 'tournees'),
    screenshot: {
      src: '/ecran-tournees-terrain.png',
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
    href: platformHref('qualite', 'amelioration'),
    screenshot: {
      src: '/ecran-amelioration-continue.png',
      alt: 'Écran CIPA de pilotage des plans d’action sur mobile',
      ...SHOT,
    },
  },
]

/* ------------------------------------------------------------
   Version anglaise : memes onglets, memes captures, textes traduits.
   ------------------------------------------------------------ */

type TabText = Pick<FeatureTab, 'label' | 'title' | 'description' | 'badge' | 'bullets'> & {
  alt: string
}

const EN: Record<string, TabText> = {
  audits: {
    label: 'Internal audits',
    title: 'Internal audits',
    description:
      'Prepare, run and follow up your audits in a standardized environment with full traceability.',
    badge: 'Fully traceable process',
    bullets: ['Smart checklists', 'Automatic reports', 'Deviation tracking', 'Digital sign-off'],
    alt: 'CIPA screen running an internal audit on mobile',
  },
  quality: {
    label: 'Quality inspections',
    title: 'Quality inspections',
    description:
      'Digitize shop-floor inspections to improve data quality and speed up decisions.',
    badge: 'Fully traceable process',
    bullets: ['Mobile capture', 'Annotated photos', 'Standardized checks', 'Complete history'],
    alt: 'CIPA screen entering a quality inspection on mobile',
  },
  deviations: {
    label: 'Deviations & NC',
    title: 'Deviations & NC',
    description: 'Manage non-conformities in one place, from detection to closure.',
    badge: 'Fully traceable process',
    bullets: ['Automated workflow', 'Corrective actions', 'Multi-level approval', 'Real-time tracking'],
    alt: 'CIPA screen handling a non-conformity on mobile',
  },
  production: {
    label: 'Production checks',
    title: 'Production checks',
    description: 'Strengthen quality control right on the production lines.',
    badge: 'Fully traceable process',
    bullets: ['Periodic checks', 'Instant alerts', 'Shop-floor indicators', 'Full traceability'],
    alt: 'CIPA screen for a production check on mobile',
  },
  rounds: {
    label: 'Field rounds',
    title: 'Field rounds',
    description: 'Organize operational rounds and inspections that every team carries out the same way.',
    badge: 'Fully traceable process',
    bullets: ['Simple planning', 'GPS tracking', 'Field checklists', 'Visit history'],
    alt: 'CIPA screen tracking a field round on mobile',
  },
  improvement: {
    label: 'Continuous improvement',
    title: 'Continuous improvement',
    description: 'Turn your shop-floor data into action plans and performance gains.',
    badge: 'Fully traceable process',
    bullets: ['Dashboards', 'Real-time KPIs', 'Advanced analytics', 'Progress tracking'],
    alt: 'CIPA screen managing action plans on mobile',
  },
}

const FEATURE_TABS_EN: FeatureTab[] = FEATURE_TABS.map((tab) => {
  const { alt, ...text } = EN[tab.id]
  return { ...tab, ...text, screenshot: { ...tab.screenshot, alt } }
})

/** Les six onglets dans la langue demandee. */
export function featureTabs(locale: Locale): FeatureTab[] {
  return locale === 'en' ? FEATURE_TABS_EN : FEATURE_TABS
}
