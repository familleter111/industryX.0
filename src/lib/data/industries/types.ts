import type { LucideIcon } from 'lucide-react'

/**
 * Forme d'une page sectorielle.
 *
 * Les six pages industries partageaient 6 642 lignes dont environ 70 % de
 * copier-coller. La comparaison bloc a bloc a montre que la structure etait
 * strictement identique : seuls le texte, les chiffres et les icones
 * changeaient. Tout ce qui variait est donc devenu de la donnee, decrite ici.
 */

export type SlideVisual =
  | 'compliance-flow'
  | 'tablet'
  | 'predictive-chart'
  | 'supply-chain'
  | 'launch-timeline'
  | 'dashboard'
  | 'energy-chart'

export type CarouselSlide = {
  num: string
  tag: string
  title: string
  desc: string
  /** Constat avant CIPA. */
  before: string[]
  /** Apport de CIPA. */
  after: string[]
  kpis: { value: string; label: string }[]
  visual: SlideVisual
  visualCaption: string
}

/** Etape d'un flux de conformite. */
export type FlowStep = {
  n: number
  title: string
  sub: string
  state: 'done' | 'active' | 'todo'
}

export type IndustryVisuals = {
  complianceFlow: FlowStep[]
  /** Icones des etapes terminee et a venir (par defaut ShieldCheck et Workflow). */
  complianceFlowIcons?: { done: LucideIcon; todo: LucideIcon }

  tablet: {
    orderLabel: string
    orderId: string
    instructionsLabel: string
    /** Liste numerotee d'instructions… */
    instructions?: string[]
    /** …ou liste de controles, coches ou en cours. */
    checks?: { label: string; done: boolean }[]
    progressLabel: string
    /** Pourcentage d'avancement, 0-100. */
    progress: number
    ctaLabel: string
  }

  predictiveChart: {
    points: { x: number; y: number; val: string }[]
    /**
     * Courbe lissee passant par `points`. Elle est ecrite a la main plutot
     * que derivee : les points de controle des beziers ont ete regles a
     * l'oeil. Toute modification de `points` doit donc etre reportee ici.
     */
    path: string
    thresholdLabel: string
    /** Annotation verte, ancree sur le point d'inflexion. */
    annotation: { label: string; x: number; y: number; boxX: number; boxWidth: number }
    /** Etiquettes de debut et de fin de l'axe horizontal. */
    axisLabels?: [string, string]
  }

  supplyChain: {
    steps: { icon: LucideIcon; title: string; id: string }[]
    noteLabel: string
    noteText: string
  }

  launchTimeline: { name: string; before: number; after: number }[]
  /** Note sous la timeline. */
  launchTimelineNote?: string

  dashboard: {
    tiles: { label: string; value: string; trend: string; good: boolean }[]
    /** Encart du bas : note d'audit… */
    auditLabel?: string
    auditText?: string
    /** …ou histogramme d'activite. */
    activity?: { label: string; note?: string; bars: number[]; days?: string[] }
  }

  energyChart: {
    baselinePath: string
    optimisedPath: string
    /** Points marques sur la courbe optimisee. */
    markers: { x: number; y: number }[]
    baselineLabel: string
    deltaLabel: string
    /** Position verticale de l'etiquette de delta. */
    deltaY: number
    xLabels: string[]
  }
}

export type IndustryPageData = {
  slug: string
  /** Titre de l'onglet et balise <title>. */
  metaTitle: string
  metaDescription: string

  /**
   * Fin du H1, apres « Comment CIPA transforme l'industrie ». Ignore quand
   * `heroStatement` est renseigne.
   */
  headline?: string
  /** Mots non colores entre le debut du H1 et `headline` (« de »). */
  headlinePrefix?: string
  /**
   * Hero « manifeste » : un bandeau de secteur et un titre propre sur trois
   * lignes, a la place du badge et du H1 par defaut. Le titre est en quatre
   * segments : ligne 1, debut de ligne 2, mot en couleur, ligne 3.
   */
  heroStatement?: { eyebrow: string; title: [string, string, string, string] }
  intro: string
  hero: { src: string; alt: string }
  heroIcon: LucideIcon
  /** Icone du badge « Secteur d'activite » (par defaut Zap). */
  badgeIcon?: LucideIcon

  /** Les trois points coches sous le hero. */
  indicators: string[]

  /** Paragraphe de presentation, sous l'icone du secteur. */
  overview: string
  /** Fin du titre de section, apres « Cas d'usage pour vos ». */
  useCasesTitle: string

  coreSlides: CarouselSlide[]
  coreAccentLabel: string
  performanceSlides: CarouselSlide[]
  performanceAccentLabel: string
  /** Fin du titre du second carrousel, si elle differe du texte commun. */
  performanceTitle?: string

  platform: {
    title: string
    desc: string
    features: { icon: LucideIcon; label: string }[]
  }

  /** Les cinq etapes de la demarche. */
  steps: { icon: LucideIcon; title: string; desc: string }[]

  cta: { title: string; text: string }

  visuals: IndustryVisuals
}
