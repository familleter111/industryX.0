'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  Leaf,
  Network,
  Cpu,
  Truck,
  Database,
  Eye,
  Play,
  Pause,
  FlaskConical,
  Rocket,
  TrendingUp,
  Workflow,
  Factory
} from 'lucide-react'
import Image from 'next/image'
import { viewport } from '@/lib/motion'
import Footer from '@/components/layout/Footer'
import heroStyles from './hero.module.css'
import { Link } from '@/i18n/navigation'
import { INDUSTRY_CHROME } from '@/lib/data/industries/chrome'
import { overlay, useCopy, useCurrentLocale, useTr, type TextOverlay } from '@/lib/i18n'

// Animation réutilisable
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

/* ============================================================
   TYPES & DONNÉES DES CARTES CAROUSEL
   ============================================================ */

type SlideVisual =
  | 'compliance-flow'
  | 'tablet'
  | 'predictive-chart'
  | 'supply-chain'
  | 'launch-timeline'
  | 'dashboard'
  | 'energy-chart'

interface CarouselSlide {
  num: string
  tag: string
  title: string
  desc: string
  before: string[]
  after: string[]
  kpis: { value: string; label: string }[]
  visual: SlideVisual
  visualCaption: string
}

const coreSlides: CarouselSlide[] = [
  {
    num: '01',
    tag: 'Conformité & Réglementation',
    title: 'Renforcer la conformité réglementaire',
    desc: "Les industries du packaging et de la plasturgie sont soumises à des exigences réglementaires strictes : sécurité, contact alimentaire, normes environnementales et qualité. Une non-conformité peut entraîner pénalités, rappels et atteinte à la réputation. CIPA automatise les processus de conformité pour garantir une documentation fiable et un respect constant des réglementations.",
    before: [
      'Suivi de conformité manuel générant un taux d’erreur de 20%',
      'Audits fréquents, longs et chronophages',
      'Documentation qualité dispersée entre les lignes',
      'Risque de non-conformité aux normes contact alimentaire'
    ],
    after: [
      'Automatisation complète des processus de conformité',
      'Réduction des erreurs de conformité de 90%',
      '50% de non-conformités réglementaires en moins',
      'Coûts d’audit réduits de 40%'
    ],
    kpis: [
      { value: '90%', label: 'de réduction des erreurs de conformité' },
      { value: '40%', label: 'd’économies sur les coûts d’audit' }
    ],
    visual: 'compliance-flow',
    visualCaption: 'Workflow de conformité packaging : double contrôle qualité et archivage de la piste d’audit sur CIPA.'
  },
  {
    num: '02',
    tag: 'Digitalisation & Planification',
    title: 'Booster l’efficacité par la digitalisation de la production',
    desc: "La transformation digitale est essentielle pour la plasturgie moderne, permettant un accès aux données en temps réel et des opérations rationalisées. CIPA digitalise l'ordonnancement des lignes d'injection, d'extrusion et de conditionnement, réduisant le gaspillage matière et optimisant l'allocation des ressources.",
    before: [
      'Processus papier générant 25% d’inefficacité en ordonnancement',
      'Faible visibilité sur l’utilisation des moules et des lignes',
      'Ajustements de production lents et manuels',
      'Ressources mal réparties entre les lignes'
    ],
    after: [
      'Digitalisation complète de l’ordonnancement et des ressources',
      'Gain d’efficacité opérationnelle de 30 à 40%',
      'Ajustements en temps réel selon la demande',
      'Meilleure utilisation des moules et des lignes de conditionnement'
    ],
    kpis: [
      { value: '40%', label: 'd’amélioration de l’efficacité opérationnelle' }
    ],
    visual: 'tablet',
    visualCaption: 'Ordre de fabrication digital CIPA : instructions guidées et suivi de ligne d’injection en temps réel.'
  },
  {
    num: '03',
    tag: 'Analytique Prédictive & IA',
    title: 'Analyses avancées et IA pour l’amélioration continue',
    desc: "Dans un environnement de plasturgie compétitif, exploiter les données est essentiel à l'amélioration continue. CIPA utilise l'analytique avancée et l'IA pour surveiller la performance des presses à injection et des lignes d'extrusion, optimiser les procédés et renforcer le contrôle qualité.",
    before: [
      'Pannes d’équipement imprévues causant 5 à 10% de pertes de production',
      'Arrêts de ligne perturbant les plannings de livraison',
      'Maintenance réactive coûteuse',
      'Contrôle qualité tardif sur les pièces moulées'
    ],
    after: [
      'Maintenance prédictive des presses et lignes d’extrusion',
      'Réduction des temps d’arrêt de 40 à 60%',
      'Efficacité de production optimisée',
      'Détection précoce des dérives qualité'
    ],
    kpis: [
      { value: '60%', label: 'de réduction des temps d’arrêt' },
      { value: '15%', label: 'd’économies sur les coûts de maintenance' }
    ],
    visual: 'predictive-chart',
    visualCaption: 'Suivi prédictif de presse à injection : détection de dérive pression/température avant rebut.'
  },
  {
    num: '04',
    tag: 'Traçabilité Matières & Stocks',
    title: 'Améliorer la transparence de la chaîne d’approvisionnement',
    desc: "La visibilité de la supply chain est cruciale pour maîtriser coûts, risques et délais de livraison. CIPA renforce la transparence par un suivi en temps réel des matières premières (résines, granulés) et des composants, assurant une chaîne d'approvisionnement réactive et résiliente.",
    before: [
      'Manque de visibilité augmentant les coûts de stockage de 30%',
      'Risque accru de rupture d’approvisionnement en résines',
      'Suivi des lots matière peu fiable',
      'Retards de livraison fréquents'
    ],
    after: [
      'Suivi en temps réel des matières premières et des stocks',
      'Réduction des coûts d’inventaire de 30%',
      '20% de perturbations de supply chain en moins',
      'Livraisons fiabilisées et conformes aux standards qualité'
    ],
    kpis: [
      { value: '30%', label: 'de réduction des coûts d’inventaire' },
      { value: '20%', label: 'de perturbations de supply chain en moins' }
    ],
    visual: 'supply-chain',
    visualCaption: 'Chaîne de traçabilité matière : de la résine fournisseur au produit fini conditionné.'
  }
]

const performanceSlides: CarouselSlide[] = [
  {
    num: '01',
    tag: 'Innovation & R&D',
    title: 'Accélérer l’innovation produit',
    desc: "Dans un marché du packaging en constante évolution, l'agilité et la collaboration accélèrent le développement produit et l'adaptation aux besoins du marché. CIPA fluidifie la gestion des données de conception et des essais moules pour raccourcir les cycles d'innovation.",
    before: [
      'Traitement des données de développement allongeant les délais de 15 à 20%',
      'Essais moules et validations peu documentés',
      'Entrée sur le marché retardée pour les nouveaux packagings',
      'Collaboration limitée entre bureau d’études et production'
    ],
    after: [
      'Gestion de données optimisée et centralisée',
      'Time-to-market réduit de 30 à 50%',
      'Cycles d’innovation accélérés et tracés',
      'Collaboration fluide entre conception et lignes de production'
    ],
    kpis: [
      { value: '50%', label: 'de time-to-market en moins pour les nouveaux produits' }
    ],
    visual: 'launch-timeline',
    visualCaption: 'Timeline développement packaging : réduction du délai de conception au lancement commercial.'
  },
  {
    num: '02',
    tag: 'Qualité & Fiabilité',
    title: 'Garantir la qualité et la fiabilité produit',
    desc: "Le maintien d'une qualité et d'une fiabilité élevées est crucial dans le packaging et la plasturgie. CIPA renforce l'assurance qualité par un suivi continu et un reporting automatisé, réduisant les défauts et améliorant la satisfaction client.",
    before: [
      'Contrôles qualité manuels générant 5 à 10% de taux de défauts',
      'Retouches et réclamations client fréquentes',
      'Détection tardive des non-conformités dimensionnelles',
      'Reporting qualité fastidieux et peu consolidé'
    ],
    after: [
      'Suivi qualité en temps réel et reporting automatisé',
      'Réduction des taux de défauts de 50 à 70%',
      '30% de réclamations et coûts de garantie en moins',
      'Fiabilité produit renforcée sur toutes les lignes'
    ],
    kpis: [
      { value: '70%', label: 'de réduction des taux de défauts' },
      { value: '30%', label: 'd’économies sur les coûts de garantie' }
    ],
    visual: 'dashboard',
    visualCaption: 'Dashboard qualité ligne CIPA : pièces conformes, non-conformités et alertes en direct.'
  },
  {
    num: '03',
    tag: 'Durabilité & Énergie',
    title: 'Optimiser la consommation de ressources et réduire les déchets',
    desc: "La durabilité est un enjeu croissant pour le packaging et la plasturgie. CIPA aide les organisations à optimiser l'usage des ressources, réduire les déchets plastiques et aligner leurs opérations sur des objectifs environnementaux, tout en réduisant les coûts opérationnels.",
    before: [
      'Gestion des ressources peu optimisée sur les lignes d’injection',
      'Jusqu’à 10 à 15% de surcoûts liés à l’énergie et aux déchets',
      'Faible visibilité sur la consommation par ligne',
      'Taux de rebut matière élevé'
    ],
    after: [
      'Pilotage fin de la consommation énergétique et matière',
      'Réduction de la consommation d’énergie de 20 à 30%',
      'Coûts opérationnels réduits et rebuts matière limités',
      'Crédibilité renforcée sur les engagements de durabilité'
    ],
    kpis: [
      { value: '30%', label: 'de réduction de la consommation d’énergie et des coûts' }
    ],
    visual: 'energy-chart',
    visualCaption: 'Profil énergétique de ligne d’injection/extrusion : courbe de consommation optimisée par CIPA.'
  }
]

/* ============================================================
   VERSION ANGLAISE

   `SLIDES_EN` ne porte que les textes des cartes, dans l'ordre du
   francais : chiffres et visuels viennent de coreSlides /
   performanceSlides (voir `overlay`). `EN` traduit les textes propres
   a cette page, indexes par leur version francaise (voir `useTr`) ;
   les libelles communs aux pages sectorielles sont dans INDUSTRY_CHROME.
   ============================================================ */

const SLIDES_EN: { core: TextOverlay<CarouselSlide[]>; performance: TextOverlay<CarouselSlide[]> } = {
  core: [
    {
      tag: "Compliance & regulation",
      title: "Strengthen regulatory compliance",
      desc: "The packaging and plastics industries face strict regulatory requirements: safety, food contact, environmental standards and quality. A non-compliance can lead to penalties, recalls and reputational damage. CIPA automates compliance processes to guarantee reliable documentation and constant regulatory compliance.",
      before: [
        "Manual compliance tracking with a 20% error rate",
        "Frequent, long, time-consuming audits",
        "Quality documentation scattered across lines",
        "Risk of non-compliance with food-contact standards",
      ],
      after: [
        "Fully automated compliance processes",
        "90% fewer compliance errors",
        "50% fewer regulatory non-conformities",
        "Audit costs down 40%",
      ],
      kpis: [
        {
          label: "reduction in compliance errors",
        },
        {
          label: "savings on audit costs",
        },
      ],
      visualCaption: "Packaging compliance workflow: dual quality check and audit-trail archiving in CIPA.",
    },
    {
      tag: "Digitization & planning",
      title: "Boost efficiency by digitizing production",
      desc: "Digital transformation is essential for modern plastics processing, enabling real-time data access and streamlined operations. CIPA digitizes the scheduling of injection, extrusion and packaging lines, reducing material waste and optimizing resource allocation.",
      before: [
        "Paper processes causing 25% scheduling inefficiency",
        "Little visibility on mold and line utilization",
        "Slow, manual production adjustments",
        "Resources poorly spread across lines",
      ],
      after: [
        "Fully digitized scheduling and resources",
        "30 to 40% gain in operational efficiency",
        "Real-time adjustments based on demand",
        "Better use of molds and packaging lines",
      ],
      kpis: [
        {
          label: "improvement in operational efficiency",
        },
      ],
      visualCaption: "CIPA digital work order: guided instructions and real-time injection line tracking.",
    },
    {
      tag: "Predictive analytics & AI",
      title: "Advanced analytics and AI for continuous improvement",
      desc: "In a competitive plastics environment, using data is essential for continuous improvement. CIPA uses advanced analytics and AI to monitor the performance of injection presses and extrusion lines, optimize processes and strengthen quality control.",
      before: [
        "Unexpected equipment failures causing 5 to 10% production losses",
        "Line stoppages disrupting delivery schedules",
        "Costly reactive maintenance",
        "Late quality control on molded parts",
      ],
      after: [
        "Predictive maintenance of presses and extrusion lines",
        "Downtime cut by 40 to 60%",
        "Optimized production efficiency",
        "Early detection of quality drift",
      ],
      kpis: [
        {
          label: "reduction in downtime",
        },
        {
          label: "savings on maintenance costs",
        },
      ],
      visualCaption: "Predictive injection press monitoring: pressure/temperature drift detected before scrap.",
    },
    {
      tag: "Material & stock traceability",
      title: "Improve supply chain transparency",
      desc: "Supply chain visibility is crucial to control costs, risks and delivery lead times. CIPA strengthens transparency with real-time tracking of raw materials (resins, pellets) and components, for a responsive, resilient supply chain.",
      before: [
        "Lack of visibility raising storage costs by 30%",
        "Higher risk of resin supply shortages",
        "Unreliable material batch tracking",
        "Frequent delivery delays",
      ],
      after: [
        "Real-time tracking of raw materials and stock",
        "Inventory costs cut by 30%",
        "20% fewer supply chain disruptions",
        "Reliable deliveries that meet quality standards",
      ],
      kpis: [
        {
          label: "reduction in inventory costs",
        },
        {
          label: "fewer supply chain disruptions",
        },
      ],
      visualCaption: "Material traceability chain: from supplier resin to packaged finished product.",
    },
  ],
  performance: [
    {
      tag: "Innovation & R&D",
      title: "Accelerate product innovation",
      desc: "In a constantly evolving packaging market, agility and collaboration speed up product development and adaptation to market needs. CIPA streamlines design data and mold trial management to shorten innovation cycles.",
      before: [
        "Development data processing adding 15 to 20% to lead times",
        "Poorly documented mold trials and validations",
        "Delayed market entry for new packaging",
        "Limited collaboration between design office and production",
      ],
      after: [
        "Optimized, centralized data management",
        "Time-to-market cut by 30 to 50%",
        "Faster, traced innovation cycles",
        "Seamless collaboration between design and production lines",
      ],
      kpis: [
        {
          label: "shorter time-to-market for new products",
        },
      ],
      visualCaption: "Packaging development timeline: shorter lead time from design to commercial launch.",
    },
    {
      tag: "Quality & reliability",
      title: "Guarantee product quality and reliability",
      desc: "Maintaining high quality and reliability is crucial in packaging and plastics. CIPA strengthens quality assurance with continuous monitoring and automated reporting, reducing defects and improving customer satisfaction.",
      before: [
        "Manual quality checks with 5 to 10% defect rates",
        "Frequent rework and customer complaints",
        "Late detection of dimensional non-conformities",
        "Tedious, poorly consolidated quality reporting",
      ],
      after: [
        "Real-time quality monitoring and automated reporting",
        "Defect rates cut by 50 to 70%",
        "30% fewer complaints and warranty costs",
        "Stronger product reliability on every line",
      ],
      kpis: [
        {
          label: "reduction in defect rates",
        },
        {
          label: "savings on warranty costs",
        },
      ],
      visualCaption: "CIPA line quality dashboard: compliant parts, non-conformities and live alerts.",
    },
    {
      tag: "Sustainability & energy",
      title: "Optimize resource use and reduce waste",
      desc: "Sustainability is a growing challenge for packaging and plastics. CIPA helps organizations optimize resource use, reduce plastic waste and align operations with environmental goals, while lowering operating costs.",
      before: [
        "Poorly optimized resource management on injection lines",
        "Up to 10 to 15% extra costs from energy and waste",
        "Little visibility on consumption per line",
        "High material scrap rate",
      ],
      after: [
        "Fine-grained control of energy and material use",
        "Energy consumption down 20 to 30%",
        "Lower operating costs and less material scrap",
        "Greater credibility on sustainability commitments",
      ],
      kpis: [
        {
          label: "reduction in energy consumption and costs",
        },
      ],
      visualCaption: "Injection/extrusion line energy profile: consumption curve optimized by CIPA.",
    },
  ],
}

const EN: Record<string, string> = {
  "Validation Spécifications Contact Alimentaire": "Food-contact specification approval",
  "Exigences qualité & environnementales validées": "Quality & environmental requirements approved",
  "Double Contrôle Opérateur & Qualité": "Operator & quality double check",
  "Enregistrement de contrôle actif sur la ligne": "Inspection record active on the line",
  "Archivage Piste d’Audit Réglementaire": "Regulatory audit-trail archiving",
  "Rapport généré et horodaté automatiquement": "Report generated and time-stamped automatically",
  "Ordre de Fabrication Digital": "Digital work order",
  "Ligne active": "Line active",
  "Instructions Presse Injection": "Injection press instructions",
  "Vérifier la température de buse d'injection (poste 4)": "Check the injection nozzle temperature (station 4)",
  "Contrôler le poids de la pièce moulée avant conditionnement": "Check the molded part weight before packaging",
  "Valider le scan du lot résine et l'horodatage poste": "Confirm the resin batch scan and station time stamp",
  Avancement: "Progress",
  "Valider l'étape de moulage/conditionnement": "Confirm molding/packaging step",
  "Seuil alerte pression/température": "Pressure/temperature alert threshold",
  "Maintenance prédictive presse déclenchée": "Predictive press maintenance triggered",
  "Fournisseur Résine": "Resin supplier",
  "Injection / Extrusion": "Injection / Extrusion",
  "Contrôle Final / Conditionnement": "Final inspection / Packaging",
  "Traçabilité complète :": "Full traceability:",
  "Généalogie lot résine à produit fini instantanée pour répondre aux exigences qualité et rappel.": "Instant resin-batch-to-finished-product genealogy to meet quality and recall requirements.",
  "Conception Packaging": "Packaging design",
  "Essais Moule & Validation": "Mold trials & validation",
  "Pré-série Industrielle": "Industrial pre-series",
  "Lancement Commercial": "Commercial launch",
  "Pièces Conformes": "Compliant parts",
  "Non-conformités Ouvertes": "Open non-conformities",
  "Alertes Qualité Ligne": "Line quality alerts",
  "Revue de Contrôle": "Inspection review",
  "Rapport de Piste d’Audit :": "Audit trail report:",
  "Contrôles qualité verrouillés, validation opérateur horodatée et conforme aux référentiels packaging.": "Quality checks locked, operator sign-off time-stamped and compliant with packaging standards.",
  "Résultats mesurés": "Measured results",
  "Secteur d'activité": "Industry",
  "Comment CIPA transforme l'industrie ": "How CIPA is transforming the ",
  "du packaging & de la plasturgie": "packaging & plastics industry",
  "Entre lignes d'injection plastique, extrusion et conditionnement, l'industrie du packaging et de la plasturgie doit conjuguer cadences élevées, exigences qualité et pression réglementaire. CIPA offre une plateforme digitale complète pour digitaliser la production, sécuriser la conformité et piloter la performance industrielle de bout en bout.": "Across plastic injection, extrusion and packaging lines, the packaging and plastics industry has to combine high output, quality requirements and regulatory pressure. CIPA offers a complete digital platform to digitize production, secure compliance and manage industrial performance end to end.",
  "Demander une démo": "Book a demo",
  "Découvrir les solutions": "Explore the solutions",
  "Réduction des erreurs de conformité": "Fewer compliance errors",
  "Baisse des coûts de stockage": "Lower storage costs",
  "Réduction de la consommation d'énergie": "Lower energy consumption",
  "Plateforme CIPA en atelier plasturgie : tableau de bord qualité, injection, extrusion et assistance IA": "CIPA platform in a plastics workshop: quality dashboard, injection, extrusion and AI assistance",
  "De la résine brute au produit fini conditionné, CIPA aide les industriels du packaging et de la plasturgie à sécuriser la conformité réglementaire, fiabiliser les lignes d'injection/extrusion et accélérer la traçabilité matière.": "From raw resin to packaged finished product, CIPA helps packaging and plastics manufacturers secure regulatory compliance, make injection/extrusion lines more reliable and speed up material traceability.",
  "opérations de packaging & plasturgie": "packaging & plastics operations",
  "Opérations Packaging & Plasturgie": "Packaging & plastics operations",
  "qualité produit, l’innovation et la performance durable": "product quality, innovation and sustainable performance",
  "Performance durable Packaging & Plasturgie": "Sustainable packaging & plastics performance",
  "Une plateforme unique pour la qualité, la traçabilité et la conformité réglementaire.": "One platform for quality, traceability and regulatory compliance.",
  "CIPA unifie les personnes, les processus et les données sur toute la chaîne de valeur packaging & plasturgie — conformité contact alimentaire et environnementale, traçabilité matière à produit fini, maintenance prédictive des presses et audits automatisés.": "CIPA unifies people, processes and data across the packaging & plastics value chain — food-contact and environmental compliance, material-to-finished-product traceability, predictive press maintenance and automated audits.",
  "Données connectées": "Connected data",
  "Visibilité atelier": "Shop-floor visibility",
  "Visibilité fournisseurs": "Supplier visibility",
  "Assurance conformité réglementaire": "Regulatory compliance assurance",
  "1. Connecter": "1. Connect",
  "Unifiez les données des presses, lignes d’extrusion et opérateurs.": "Unify data from presses, extrusion lines and operators.",
  "2. Analyser": "2. Analyze",
  "L'IA et les analyses prédisent les dérives process et les rebuts matière.": "AI and analytics predict process drift and material scrap.",
  "3. Agir": "3. Act",
  "Automatisez les workflows qualité et les actions correctives sur ligne.": "Automate quality workflows and corrective actions on the line.",
  "4. Améliorer": "4. Improve",
  "Surveillez, mesurez et réduisez les temps d’arrêt et les rebuts.": "Monitor, measure and reduce downtime and scrap.",
  "5. Impact": "5. Impact",
  "Des résultats mesurables en conformité, qualité et sobriété énergétique.": "Measurable results in compliance, quality and energy efficiency.",
  "Prêt à digitaliser vos opérations de packaging & plasturgie ?": "Ready to digitize your packaging & plastics operations?",
  "Rejoignez les industriels du packaging et de la plasturgie qui utilisent CIPA pour sécuriser leur conformité, fiabiliser leurs lignes et réduire leurs coûts énergétiques et matière. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles.": "Join the packaging and plastics manufacturers using CIPA to secure compliance, make their lines more reliable and cut energy and material costs. Our experts are ready to give you a tailored demo based on your real constraints.",
}

/* ============================================================
   VISUELS DE CARTES (DATA-VIZ PAR SLIDE)
   ============================================================ */

function VisualPanel({ slide }: { slide: CarouselSlide }) {
  const c = useCopy(INDUSTRY_CHROME)
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-white rounded-2xl border border-black/[0.06] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-subtle">
            {slide.tag}
          </span>
          <span className="ml-auto text-[9px] bg-[#F5F5F4] text-subtle font-bold px-2 py-0.5 rounded-full">
            {c.live}
          </span>
        </div>
        <div className="flex-1 flex items-center">
          <SlideVisualRenderer visual={slide.visual} />
        </div>
        <div className="mt-3 text-[10px] text-subtle text-center italic leading-snug">
          {slide.visualCaption}
        </div>
      </div>
    </div>
  )
}

function SlideVisualRenderer({ visual }: { visual: SlideVisual }) {
  switch (visual) {
    case 'compliance-flow':
      return <ComplianceFlowVisual />
    case 'tablet':
      return <TabletVisual />
    case 'predictive-chart':
      return <PredictiveChartVisual />
    case 'supply-chain':
      return <SupplyChainVisual />
    case 'launch-timeline':
      return <LaunchTimelineVisual />
    case 'dashboard':
      return <DashboardVisual />
    case 'energy-chart':
      return <EnergyChartVisual />
  }
}

// 01 — Workflow de conformité (schéma étapes)
function ComplianceFlowVisual() {
  const tr = useTr(EN)
  const c = useCopy(INDUSTRY_CHROME)
  const steps = [
    { n: 1, title: tr("Validation Spécifications Contact Alimentaire"), sub: tr("Exigences qualité & environnementales validées"), state: 'done' },
    { n: 2, title: tr("Double Contrôle Opérateur & Qualité"), sub: tr("Enregistrement de contrôle actif sur la ligne"), state: 'active' },
    { n: 3, title: tr("Archivage Piste d’Audit Réglementaire"), sub: tr("Rapport généré et horodaté automatiquement"), state: 'todo' }
  ]
  return (
    <div className="w-full flex flex-col gap-4 py-2">
      {steps.map((s, i) => (
        <div key={s.n} className="relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative z-10 flex items-center gap-3 rounded-xl p-3 shadow-sm border ${
              s.state === 'active'
                ? 'bg-gold/5 border-gold/40'
                : 'bg-slate-50/80 border-slate-200/80'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                s.state === 'todo' ? 'bg-slate-100 text-subtle' : 'bg-gold/10 text-gold'
              }`}
            >
              {s.n}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs font-bold ${s.state === 'todo' ? 'text-subtle' : 'text-dark'}`}>{s.title}</h4>
              <p className="text-[10px] text-subtle truncate">{s.sub}</p>
            </div>
            {s.state === 'done' && <ShieldCheck size={16} className="text-emerald-500 shrink-0" />}
            {s.state === 'active' && (
              <span className="text-[9px] font-bold text-gold-ink px-2 py-0.5 bg-gold/10 rounded-full shrink-0">{c.inProgress}</span>
            )}
            {s.state === 'todo' && <Workflow size={16} className="text-slate-300 shrink-0" />}
          </motion.div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-1">
              <div className="h-4 w-0.5 border-l-2 border-dashed border-slate-200" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// 02 — Ordre de fabrication digital
function TabletVisual() {
  const tr = useTr(EN)
  return (
    <div className="w-full bg-[#141520] rounded-2xl p-4 border border-white/5 text-white flex flex-col gap-3">
      <div className="flex justify-between items-center bg-[#1a1b24] p-3 rounded-xl">
        <div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{tr("Ordre de Fabrication Digital")}</div>
          <div className="text-xs font-black text-white">OF-2026-PACK-L4-233</div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[9px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          {tr("Ligne active")}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 bg-[#1a1b24] p-3 rounded-xl">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">{tr("Instructions Presse Injection")}</div>
          <ol className="text-[10px] text-slate-300 list-decimal list-inside space-y-1.5 leading-tight">
            <li>{tr("Vérifier la température de buse d'injection (poste 4)")}</li>
            <li>{tr("Contrôler le poids de la pièce moulée avant conditionnement")}</li>
            <li>{tr("Valider le scan du lot résine et l'horodatage poste")}</li>
          </ol>
        </div>
        <div className="col-span-5 bg-[#1a1b24] p-3 rounded-xl flex flex-col justify-between">
          <div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">{tr("Avancement")}</div>
            <div className="text-lg font-black text-gold">88%</div>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gold h-full w-[88%] rounded-full" />
          </div>
        </div>
      </div>
      <div className="bg-[#DAA250] hover:bg-gold text-dark text-center py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-colors">
        {tr("Valider l'étape de moulage/conditionnement")}
      </div>
    </div>
  )
}

// 03 — Courbe prédictive presse à injection
function PredictiveChartVisual() {
  const tr = useTr(EN)
  const [hovered, setHovered] = useState<number | null>(null)
  const pts = [
    { x: 30, y: 34, val: '97%' },
    { x: 120, y: 44, val: '94%' },
    { x: 210, y: 69, val: '86%' },
    { x: 300, y: 52, val: '91%' },
    { x: 370, y: 27, val: '98%' }
  ]
  return (
    <svg viewBox="0 0 400 160" className="w-full h-44">
      <line x1="20" y1="140" x2="380" y2="140" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="20" y1="10" x2="20" y2="140" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="20" y1="100" x2="380" y2="100" stroke="#F5F5F4" strokeDasharray="3,3" />
      <line x1="20" y1="60" x2="380" y2="60" stroke="#F5F5F4" strokeDasharray="3,3" />

      <line x1="20" y1="85" x2="380" y2="85" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,4" opacity="0.5" />
      <text x="375" y="81" textAnchor="end" className="fill-red-400 font-bold text-[8px]">{tr("Seuil alerte pression/température")}</text>

      <defs>
        <linearGradient id="packPredGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DAA250" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#DAA250" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M30 34 C 70 38, 90 40, 120 44 C 160 50, 180 64, 210 69 C 245 74, 270 59, 300 52 C 330 46, 350 31, 370 27 L 370 140 L 30 140 Z"
        fill="url(#packPredGlow)"
      />
      <path
        d="M30 34 C 70 38, 90 40, 120 44 C 160 50, 180 64, 210 69 C 245 74, 270 59, 300 52 C 330 46, 350 31, 370 27"
        fill="none"
        stroke="#DAA250"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g>
        <line x1="210" y1="69" x2="210" y2="112" stroke="#22C55E" strokeWidth="1" strokeDasharray="3,3" />
        <rect x="138" y="112" width="145" height="15" rx="4" className="fill-emerald-500/10" />
        <text x="210" y="123" textAnchor="middle" className="fill-emerald-600 font-bold text-[8px]">{tr("Maintenance prédictive presse déclenchée")}</text>
      </g>

      {pts.map((pt, i) => (
        <g key={i}>
          <circle
            cx={pt.x}
            cy={pt.y}
            r={hovered === i ? 6 : 4}
            className="fill-white stroke-gold stroke-[2px] transition-all cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
          {hovered === i && (
            <g>
              <rect x={pt.x - 20} y={pt.y - 26} width="40" height="16" rx="4" className="fill-[#0F172A]" />
              <text x={pt.x} y={pt.y - 15} textAnchor="middle" className="fill-white font-bold text-[9px]">{pt.val}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  )
}

// 04 — Traçabilité matières premières
function SupplyChainVisual() {
  const tr = useTr(EN)
  const steps = [
    { icon: Network, title: tr("Fournisseur Résine"), id: 'Lot-RES-770' },
    { icon: Cpu, title: tr("Injection / Extrusion"), id: 'Lot-INJ-14' },
    { icon: ShieldCheck, title: tr("Contrôle Final / Conditionnement"), id: 'Lot-PACK-56' }
  ]
  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-start relative px-6">
        <div className="absolute left-10 right-10 top-[22px] h-0.5 border-t border-dashed border-slate-200 z-0" />
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={i} className="flex flex-col items-center gap-2 relative z-10 flex-1">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-md cursor-pointer hover:border-gold hover:bg-gold/5"
              >
                <Icon size={17} className="text-gold" />
              </motion.div>
              <div className="text-center">
                <div className="text-[10px] font-bold text-dark">{step.title}</div>
                <div className="text-[8px] text-subtle bg-slate-100 px-1 py-0.5 rounded font-mono mt-0.5">{step.id}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-5 mx-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
          <Eye size={15} />
        </div>
        <p className="text-[10px] text-subtle leading-snug">
          <span className="font-bold text-dark">{tr("Traçabilité complète :")}</span>{' '}
          {tr("Généalogie lot résine à produit fini instantanée pour répondre aux exigences qualité et rappel.")}
        </p>
      </div>
    </div>
  )
}

// 05 — Timeline développement packaging
function LaunchTimelineVisual() {
  const tr = useTr(EN)
  const c = useCopy(INDUSTRY_CHROME)
  const phases = [
    { name: tr("Conception Packaging"), before: 85, after: 45 },
    { name: tr("Essais Moule & Validation"), before: 75, after: 45 },
    { name: tr("Pré-série Industrielle"), before: 90, after: 50 },
    { name: tr("Lancement Commercial"), before: 70, after: 35 }
  ]
  return (
    <div className="w-full py-2 flex flex-col gap-3">
      <div className="flex items-center gap-4 text-[9px] font-bold">
        <span className="flex items-center gap-1.5 text-subtle">
          <span className="w-3 h-2 rounded-sm bg-slate-200 inline-block" /> {c.before}
        </span>
        <span className="flex items-center gap-1.5 text-gold-ink">
          <span className="w-3 h-2 rounded-sm bg-gold inline-block" /> {c.after}
        </span>
      </div>
      {phases.map((p, i) => (
        <div key={i}>
          <div className="text-[10px] font-bold text-dark mb-1">{p.name}</div>
          <div className="flex flex-col gap-1">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-slate-200 h-full rounded-full" style={{ width: `${p.before}%` }} />
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${p.after}%` }}
                viewport={viewport}
                transition={{ duration: 0.9, delay: i * 0.12 }}
                className="bg-gold h-full rounded-full"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 06 — Mini dashboard qualité ligne
function DashboardVisual() {
  const tr = useTr(EN)
  const tiles = [
    { label: tr("Pièces Conformes"), value: '96.8%', trend: '+4.5%', good: true },
    { label: tr("Non-conformités Ouvertes"), value: '3', trend: '-9', good: true },
    { label: tr("Alertes Qualité Ligne"), value: '0', trend: '0', good: true },
    { label: tr("Revue de Contrôle"), value: '3h', trend: '-70%', good: true }
  ]
  return (
    <div className="w-full flex flex-col gap-3 py-1">
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((t, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="text-[9px] text-subtle font-bold uppercase tracking-wide truncate">{t.label}</div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base font-black font-display text-dark">{t.value}</span>
              <span className={`text-[9px] font-bold ${t.good ? 'text-emerald-700' : 'text-red-600'}`}>{t.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[9px] text-subtle">
        <span className="font-bold text-dark block mb-1">{tr("Rapport de Piste d’Audit :")}</span>
        {tr("Contrôles qualité verrouillés, validation opérateur horodatée et conforme aux référentiels packaging.")}
      </div>
    </div>
  )
}

// 07 — Suivi de consommation énergétique ligne injection/extrusion
function EnergyChartVisual() {
  const c = useCopy(INDUSTRY_CHROME)
  return (
    <svg viewBox="0 0 400 160" className="w-full h-44">
      <line x1="30" y1="10" x2="30" y2="130" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="30" y1="130" x2="370" y2="130" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="30" y1="80" x2="370" y2="80" stroke="#F5F5F4" strokeDasharray="3,3" />
      <line x1="30" y1="40" x2="370" y2="40" stroke="#F5F5F4" strokeDasharray="3,3" />

      <path d="M30,30 L110,25 L190,35 L270,30 L350,28" fill="none" stroke="#A8A29E" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x="355" y="32" className="fill-slate-400 text-[7px] font-bold">{c.baseline}</text>

      <path d="M30,30 L110,47 L190,63 L270,78 L350,88" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <text x="355" y="92" className="fill-emerald-500 text-[7px] font-bold">-30%</text>

      <circle cx="110" cy="47" r="3" className="fill-white stroke-emerald-500 stroke-2" />
      <circle cx="190" cy="63" r="3" className="fill-white stroke-emerald-500 stroke-2" />
      <circle cx="270" cy="78" r="3" className="fill-white stroke-emerald-500 stroke-2" />
      <circle cx="350" cy="88" r="3" className="fill-white stroke-emerald-500 stroke-2" />

      <text x="30" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">{c.months[0]}</text>
      <text x="110" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">{c.months[1]}</text>
      <text x="190" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">{c.months[2]}</text>
      <text x="270" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">{c.months[3]}</text>
      <text x="350" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">{c.months[4]}</text>
    </svg>
  )
}

/* ============================================================
   CAROUSEL INTELLIGENT
   ============================================================ */

function SmartCarousel({ slides, accentLabel }: { slides: CarouselSlide[]; accentLabel: string }) {
  const tr = useTr(EN)
  const c = useCopy(INDUSTRY_CHROME)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing, setPlaying] = useState(true)
  const hoverRef = useRef(false)

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1)
      setIndex(((next % slides.length) + slides.length) % slides.length)
    },
    [index, slides.length]
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      if (!hoverRef.current) next()
    }, 8000)
    return () => clearInterval(t)
  }, [playing, next])

  const slide = slides[index]

  return (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border transition-all duration-300 ${
              i === index
                ? 'bg-[#111827] text-white border-[#111827] shadow-lg'
                : 'bg-white/70 text-subtle border-slate-200 hover:border-gold hover:text-dark'
            }`}
          >
            <span className={`font-black ${i === index ? 'text-gold' : 'text-gold-ink'}`}>{s.num}</span>
            <span className="hidden sm:inline max-w-[180px] truncate">{s.tag}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next()
              else if (info.offset.x > 80) prev()
            }}
            className="bg-[#FAF9F5] rounded-[2rem] border border-[#ECE7DD] shadow-[0_25px_60px_rgba(0,0,0,0.05)] overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10">
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black font-display text-gold/30">{slide.num}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-ink">{slide.tag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#111827] tracking-tight mb-4 leading-snug">
                  {slide.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{slide.desc}</p>

                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 mb-6">
                  <div className="relative rounded-2xl sm:rounded-r-none border border-red-100 sm:border-r-0 bg-gradient-to-br from-red-50/70 to-white p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <XCircle size={13} className="text-red-600" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">{c.before}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {slide.before.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-subtle leading-snug">
                          <XCircle size={13} className="text-red-300 shrink-0 mt-[1px]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden sm:flex absolute left-1/2 top-1/2 z-10 h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-200 bg-white shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
                    <ArrowRight size={15} className="text-emerald-500" />
                  </div>

                  <div className="relative rounded-2xl sm:rounded-l-none border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-white p-4 sm:p-5 shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                        <CheckCircle2 size={13} className="text-emerald-700" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{c.after}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {slide.after.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 leading-snug">
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-[1px]" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-subtle">{tr("Résultats mesurés")}</p>
                  <div className="grid grid-cols-2 divide-x divide-black/[0.06] overflow-hidden rounded-2xl border border-black/[0.05] bg-gradient-to-br from-gold/[0.06] to-white shadow-sm">
                    {slide.kpis.map((k, i) => (
                      <div key={i} className="p-4">
                        <div className="text-xl sm:text-2xl font-black font-display text-gold-deep">{k.value}</div>
                        <div className="text-[10px] text-subtle mt-0.5 leading-snug">{k.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <VisualPanel slide={slide} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label={c.prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-dark hover:border-gold hover:text-gold transition-all z-20"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label={c.next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-dark hover:border-gold hover:text-gold transition-all z-20"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-7">
        <button
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? c.pause : c.play}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-subtle hover:border-gold hover:text-gold transition-all"
        >
          {playing ? <Pause size={12} /> : <Play size={12} />}
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`${c.goTo} ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-slate-300 hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-subtle tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <span className="sr-only">{accentLabel}</span>
      </div>
    </div>
  )
}

/* ============================================================
   PAGE PACKAGING & PLASTURGIE
   ============================================================ */

export default function PackagingPage() {
  const tr = useTr(EN)
  const localeIsEn = useCurrentLocale() === 'en'
  const core = localeIsEn ? overlay(coreSlides, SLIDES_EN.core) : coreSlides
  const performance = localeIsEn ? overlay(performanceSlides, SLIDES_EN.performance) : performanceSlides
  const c = useCopy(INDUSTRY_CHROME)
  return (
    <main className="min-h-screen bg-[#F7F7F6] text-dark overflow-x-hidden font-body selection:bg-gold/30 selection:text-gold-900">

      {/* 1. HERO — CIPA & l'industrie du packaging et de la plasturgie */}
      <section className={`${heroStyles.hero} relative overflow-hidden bg-white pt-[82px] pb-6`}>
        <div className={`${heroStyles.content} relative lg:min-h-[calc(min(40.5vw,570px,100svh_-_150px)_-_2.5rem)]`}>
          <div className={`${heroStyles.grid} mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-8 px-5 sm:px-7 lg:grid-cols-12 lg:gap-6 lg:px-10`}>
            {/* ---------- Colonne texte ---------- */}
            <div className={`${heroStyles.copy} relative z-10 pt-10 lg:col-span-6 lg:pt-[clamp(2rem,3vw,3rem)] lg:pb-4`}>
              <div className={heroStyles.intro}>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#EFDFC4] bg-[#FDF7EC] py-2 pl-3.5 pr-5"
                >
                  <Zap size={14} aria-hidden="true" className="text-[#DAA250]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B6842B] sm:text-[11px]">
                    {tr("Secteur d'activité")}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`${heroStyles.title} mt-6 font-display text-[32px] font-black leading-[1.08] tracking-[-0.02em] text-dark sm:text-[40px] lg:text-[clamp(32px,3.5vw_-_4px,46px)]`}
                >
                  {tr("Comment CIPA transforme l'industrie ")}
                  <span className="text-[#DAA250]">{tr("du packaging & de la plasturgie")}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 max-w-[34rem] text-[14px] leading-[1.75] text-[#57534E] sm:text-[15.5px]"
                >
                  {tr("Entre lignes d'injection plastique, extrusion et conditionnement, l'industrie du packaging et de la plasturgie doit conjuguer cadences élevées, exigences qualité et pression réglementaire. CIPA offre une plateforme digitale complète pour digitaliser la production, sécuriser la conformité et piloter la performance industrielle de bout en bout.")}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 flex flex-wrap items-center gap-3.5"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#111827] px-7 py-4 text-[14px] font-semibold text-white shadow-[0_10px_30px_rgba(17,24,39,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
                  >
                    {tr("Demander une démo")}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <a
                    href="#core-ops"
                    className="group inline-flex items-center gap-3 rounded-full border border-[#E4DED2] bg-white px-7 py-4 text-[14px] font-semibold text-[#292524] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_10px_26px_rgba(218,162,80,0.18)]"
                  >
                    {tr("Découvrir les solutions")}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </div>

              <ul className={`${heroStyles.indicators} mt-10 grid grid-cols-3 gap-x-3 sm:gap-x-6`}>
                {[
                  tr("Réduction des erreurs de conformité"),
                  tr("Baisse des coûts de stockage"),
                  tr("Réduction de la consommation d'énergie")
                ].map((title) => (
                  <li key={title} className="flex items-start gap-2 sm:items-center">
                    <CheckCircle2 size={15} aria-hidden="true" className="shrink-0 text-[#22C55E]" />
                    <span className="text-[13px] font-medium text-[#57534E]">{title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------- Colonne visuel ---------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={`${heroStyles.visual} relative -mx-5 sm:-mx-7 lg:absolute lg:right-0 lg:top-0 lg:m-0 lg:w-[54%] lg:max-w-[min(760px,calc((100svh_-_150px)*4/3))]`}
            >
              <div className={`${heroStyles.imageFrame} relative w-full`}>
                <Image
                  src="/Secteur/packaging.png"
                  alt={tr("Plateforme CIPA en atelier plasturgie : tableau de bord qualité, injection, extrusion et assistance IA")}
                  width={1448}
                  height={1086}
                  priority
                  sizes="(max-width: 1023px) 100vw, (max-width: 1439px) 54vw, 57vw"
                  className={`${heroStyles.image} block h-auto w-full select-none object-contain`}
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-white to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-gradient-to-t from-white to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className={`${heroStyles.footer} relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-7 lg:px-10`}>
          {/* ---------- Barre de bas de héros ---------- */}
          <div className="mt-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-9 rounded-full bg-[#DAA250]" />
                <span className="h-1.5 w-5 rounded-full bg-[#EBD3AC]" />
                <span className="h-1.5 w-5 rounded-full bg-[#E7E2D8]" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8A837A]">
                {c.tagline}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8A837A]">
              {c.domains.map((item, i) => (
                <span key={item} className="flex items-center gap-2.5">
                  {i > 0 && <span className="text-[#DAA250]">•</span>}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANDEAU DOMAINES DE VALEUR */}
      <section className="py-10 border-y border-[#ECE7DD] bg-[#F1EFE9]/40 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="bg-dark rounded-2xl px-6 py-5 md:px-10 flex flex-col md:flex-row items-center gap-5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-mesh-dark opacity-30" />
            <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 text-gold-deep flex items-center justify-center shrink-0 relative z-10">
              <Factory size={19} />
            </div>
            <p className="text-[13px] sm:text-sm text-white/85 leading-relaxed relative z-10 text-center md:text-left">
              {tr("De la résine brute au produit fini conditionné, CIPA aide les industriels du packaging et de la plasturgie à sécuriser la conformité réglementaire, fiabiliser les lignes d'injection/extrusion et accélérer la traçabilité matière.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. CAROUSEL — 4 FAÇONS */}
      <section id="core-ops" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black font-display text-dark tracking-tight leading-[1.15] mb-4">
              <span className="md:block">{c.coreTitle}</span>
              <span className="text-gold-deep md:block">
                {tr("opérations de packaging & plasturgie")}
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-subtle leading-relaxed">
              {c.coreLead}
            </p>
          </div>

          <SmartCarousel slides={core} accentLabel={tr("Opérations Packaging & Plasturgie")} />
        </div>
      </section>

      {/* 4. CAROUSEL — 3 FAÇONS */}
      <section className="py-20 md:py-28 relative bg-[#F1EFE9]/40 border-y border-[#ECE7DD]">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black font-display text-dark tracking-tight leading-[1.15] mb-4">
              <span className="md:block">{c.perfTitle}</span>
              <span className="text-gold-deep md:block">
                {tr("qualité produit, l’innovation et la performance durable")}
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-subtle leading-relaxed">
              {c.perfLead}
            </p>
          </div>

          <SmartCarousel slides={performance} accentLabel={tr("Performance durable Packaging & Plasturgie")} />
        </div>
      </section>

      {/* 5. UNE PLATEFORME UNIQUE */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="bg-dark rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-mesh-dark opacity-30" />
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-4">
                  {tr("Une plateforme unique pour la qualité, la traçabilité et la conformité réglementaire.")}
                </h2>
                <p className="text-sm text-white/70 leading-relaxed">
                  {tr("CIPA unifie les personnes, les processus et les données sur toute la chaîne de valeur packaging & plasturgie — conformité contact alimentaire et environnementale, traçabilité matière à produit fini, maintenance prédictive des presses et audits automatisés.")}
                </p>
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                {[
                  { icon: Database, label: tr("Données connectées") },
                  { icon: Eye, label: tr("Visibilité atelier") },
                  { icon: Truck, label: tr("Visibilité fournisseurs") },
                  { icon: ShieldCheck, label: tr("Assurance conformité réglementaire") }
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-gold/40 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                        <Icon size={17} />
                      </div>
                      <span className="text-xs font-bold text-white leading-snug">{f.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. COMMENT CIPA FONCTIONNE */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black font-display text-dark tracking-tight mb-3">
              {c.how[0]} <span className="text-gold-deep">CIPA</span> {c.how[1]}
            </h2>
            <p className="text-sm sm:text-[15px] text-subtle">
              {c.howLead}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            <div className="hidden lg:block absolute top-[26px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-[#ECE7DD] z-0" />
            {[
              { icon: Network, title: tr("1. Connecter"), desc: tr("Unifiez les données des presses, lignes d’extrusion et opérateurs.") },
              { icon: FlaskConical, title: tr("2. Analyser"), desc: tr("L'IA et les analyses prédisent les dérives process et les rebuts matière.") },
              { icon: Rocket, title: tr("3. Agir"), desc: tr("Automatisez les workflows qualité et les actions correctives sur ligne.") },
              { icon: TrendingUp, title: tr("4. Améliorer"), desc: tr("Surveillez, mesurez et réduisez les temps d’arrêt et les rebuts.") },
              { icon: Leaf, title: tr("5. Impact"), desc: tr("Des résultats mesurables en conformité, qualité et sobriété énergétique.") }
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-[52px] h-[52px] rounded-2xl bg-white border border-[#ECE7DD] shadow-md text-gold flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-sm font-black text-dark mb-1.5">{step.title}</h4>
                  <p className="text-[11px] text-subtle leading-relaxed max-w-[190px]">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION FINAL */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark opacity-30" />
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-6">
            {tr("Prêt à digitaliser vos opérations de packaging & plasturgie ?")}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {tr("Rejoignez les industriels du packaging et de la plasturgie qui utilisent CIPA pour sécuriser leur conformité, fiabiliser leurs lignes et réduire leurs coûts énergétiques et matière. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles.")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-dark shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-dark"
            >
              {c.ctaDemo}
              <ArrowRight size={15} className="text-dark transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:contact@industryx0.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-all duration-300"
            >
              {c.ctaAdvisor}
            </a>
          </div>
        </div>
      </section>

      <Footer variant="compact" />
    </main>
  )
}
