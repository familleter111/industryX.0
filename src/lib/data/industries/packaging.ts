import {
  Cpu,
  Database,
  Eye,
  Factory,
  FlaskConical,
  Leaf,
  Network,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Truck,
} from 'lucide-react'

import type { IndustryPageData } from '@/lib/data/industries/types'

export const packaging: IndustryPageData = {
  slug: "packaging",
  metaTitle: "CIPA pour le packaging & la plasturgie | Industry X.0",
  metaDescription:
    "Conformité contact alimentaire, lignes d’injection et d’extrusion, traçabilité résine et maintenance prédictive : CIPA digitalise le packaging et la plasturgie.",

  headline: "du packaging & de la plasturgie",
  intro:
    "Entre lignes d'injection plastique, extrusion et conditionnement, l'industrie du packaging et de la plasturgie doit conjuguer cadences élevées, exigences qualité et pression réglementaire. CIPA offre une plateforme digitale complète pour digitaliser la production, sécuriser la conformité et piloter la performance industrielle de bout en bout.",
  hero: {
    src: "/Secteur/packaging.png",
    alt: "Plateforme CIPA en atelier plasturgie : tableau de bord qualité, injection, extrusion et assistance IA",
  },
  heroIcon: Factory,
  indicators: [
    "Réduction des erreurs de conformité",
    "Baisse des coûts de stockage",
    "Réduction de la consommation d'énergie",
  ],

  overview:
    "De la résine brute au produit fini conditionné, CIPA aide les industriels du packaging et de la plasturgie à sécuriser la conformité réglementaire, fiabiliser les lignes d'injection/extrusion et accélérer la traçabilité matière.",
  useCasesTitle: "opérations de packaging & plasturgie",

  coreAccentLabel: "Opérations Packaging & Plasturgie",
  coreSlides: [
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
  ],

  performanceAccentLabel: "Performance durable Packaging & Plasturgie",
  performanceTitle: "qualité produit, l’innovation et la performance durable",
  performanceSlides: [
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
  ],

  platform: {
    title: "Une plateforme unique pour la qualité, la traçabilité et la conformité réglementaire.",
    desc: "CIPA unifie les personnes, les processus et les données sur toute la chaîne de valeur packaging & plasturgie — conformité contact alimentaire et environnementale, traçabilité matière à produit fini, maintenance prédictive des presses et audits automatisés.",
    features: [
      { icon: Database, label: "Données connectées" },
      { icon: Eye, label: "Visibilité atelier" },
      { icon: Truck, label: "Visibilité fournisseurs" },
      { icon: ShieldCheck, label: "Assurance conformité réglementaire" },
    ],
  },

  steps: [
    { icon: Network, title: "1. Connecter", desc: "Unifiez les données des presses, lignes d’extrusion et opérateurs." },
    { icon: FlaskConical, title: "2. Analyser", desc: "L'IA et les analyses prédisent les dérives process et les rebuts matière." },
    { icon: Rocket, title: "3. Agir", desc: "Automatisez les workflows qualité et les actions correctives sur ligne." },
    { icon: TrendingUp, title: "4. Améliorer", desc: "Surveillez, mesurez et réduisez les temps d’arrêt et les rebuts." },
    { icon: Leaf, title: "5. Impact", desc: "Des résultats mesurables en conformité, qualité et sobriété énergétique." },
  ],

  cta: {
    title: "Prêt à digitaliser vos opérations de packaging & plasturgie ?",
    text: "Rejoignez les industriels du packaging et de la plasturgie qui utilisent CIPA pour sécuriser leur conformité, fiabiliser leurs lignes et réduire leurs coûts énergétiques et matière. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles.",
  },

  visuals: {
    complianceFlow: [
      { n: 1, title: "Validation Spécifications Contact Alimentaire", sub: "Exigences qualité & environnementales validées", state: 'done' },
      { n: 2, title: "Double Contrôle Opérateur & Qualité", sub: "Enregistrement de contrôle actif sur la ligne", state: 'active' },
      { n: 3, title: "Archivage Piste d’Audit Réglementaire", sub: "Rapport généré et horodaté automatiquement", state: 'todo' },
    ],

    tablet: {
      orderLabel: "Ordre de Fabrication Digital",
      orderId: "OF-2026-PACK-L4-233",
      instructionsLabel: "Instructions Presse Injection",
      instructions: [
        "Vérifier la température de buse d'injection (poste 4)",
        "Contrôler le poids de la pièce moulée avant conditionnement",
        "Valider le scan du lot résine et l'horodatage poste",
      ],
      progressLabel: "Avancement",
      progress: 88,
      ctaLabel: "Valider l'étape de moulage/conditionnement",
    },

    predictiveChart: {
      points: [
        { x: 30, y: 34, val: "97%" },
        { x: 120, y: 44, val: "94%" },
        { x: 210, y: 69, val: "86%" },
        { x: 300, y: 52, val: "91%" },
        { x: 370, y: 27, val: "98%" },
      ],
      path: "M30 34 C 70 38, 90 40, 120 44 C 160 50, 180 64, 210 69 C 245 74, 270 59, 300 52 C 330 46, 350 31, 370 27",
      thresholdLabel: "Seuil alerte pression/température",
      annotation: { label: "Maintenance prédictive presse déclenchée", x: 210, y: 69, boxX: 138, boxWidth: 145 },
    },

    supplyChain: {
      steps: [
        { icon: Network, title: "Fournisseur Résine", id: "Lot-RES-770" },
        { icon: Cpu, title: "Injection / Extrusion", id: "Lot-INJ-14" },
        { icon: ShieldCheck, title: "Contrôle Final / Conditionnement", id: "Lot-PACK-56" },
      ],
      noteLabel: "Traçabilité complète :",
      noteText:
        "Généalogie lot résine à produit fini instantanée pour répondre aux exigences qualité et rappel.",
    },

    launchTimeline: [
      { name: "Conception Packaging", before: 85, after: 45 },
      { name: "Essais Moule & Validation", before: 75, after: 45 },
      { name: "Pré-série Industrielle", before: 90, after: 50 },
      { name: "Lancement Commercial", before: 70, after: 35 },
    ],

    dashboard: {
      tiles: [
        { label: "Pièces Conformes", value: "96.8%", trend: "+4.5%", good: true },
        { label: "Non-conformités Ouvertes", value: "3", trend: "-9", good: true },
        { label: "Alertes Qualité Ligne", value: "0", trend: "0", good: true },
        { label: "Revue de Contrôle", value: "3h", trend: "-70%", good: true },
      ],
      auditLabel: "Rapport de Piste d’Audit :",
      auditText:
        "Contrôles qualité verrouillés, validation opérateur horodatée et conforme aux référentiels packaging.",
    },

    energyChart: {
      baselinePath: "M30,30 L110,25 L190,35 L270,30 L350,28",
      optimisedPath: "M30,30 L110,47 L190,63 L270,78 L350,88",
      markers: [
        { x: 110, y: 47 },
        { x: 190, y: 63 },
        { x: 270, y: 78 },
        { x: 350, y: 88 },
      ],
      baselineLabel: 'Base',
      deltaLabel: "-30%",
      deltaY: 92,
      xLabels: ['T0', 'Mois 1', 'Mois 3', 'Mois 6', 'Mois 12'],
    },
  },
}
