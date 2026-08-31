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

  tablet: {
    orderLabel: string
    orderId: string
    instructionsLabel: string
    instructions: string[]
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
  }

  supplyChain: {
    steps: { icon: LucideIcon; title: string; id: string }[]
    noteLabel: string
    noteText: string
  }

  launchTimeline: { name: string; before: number; after: number }[]

  dashboard: {
    tiles: { label: string; value: string; trend: string; good: boolean }[]
    auditLabel: string
    auditText: string
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

  /** Fin du H1, apres « Comment CIPA transforme l'industrie ». */
  headline: string
  intro: string
  hero: { src: string; alt: string }
  heroIcon: LucideIcon
  heroBadge: { label: string; value: string }

  results: { icon: LucideIcon; value: string; label: string; desc: string }[]

  /** Paragraphe de presentation, sous l'icone du secteur. */
  overview: string
  /** Fin du titre de section, apres « Cas d'usage pour vos ». */
  useCasesTitle: string

  coreSlides: CarouselSlide[]
  coreAccentLabel: string
  performanceSlides: CarouselSlide[]
  performanceAccentLabel: string

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
