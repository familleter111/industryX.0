import {
  Cpu,
  Database,
  Eye,
  FlaskConical,
  Leaf,
  Network,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Truck,
} from 'lucide-react'

import type { IndustryPageData } from '@/lib/data/industries/types'

export const electronics: IndustryPageData = {
  slug: "electronics",
  metaTitle: "CIPA pour l’électronique & le câblage | Industry X.0",
  metaDescription:
    "Conformité IPC-A-610, traçabilité SMT des bobines aux cartes, contrôles de câblage et TRS : CIPA digitalise les ateliers d’électronique.",

  headlinePrefix: "de ",
  headline: "l'électronique & du câblage",
  intro:
    "CIPA offre une plateforme complète spécialement conçue pour l'industrie de l'électronique et du câblage afin de digitaliser, orchestrer et optimiser les processus clés, de renforcer la conformité, de stimuler l'efficacité et de réduire les rebuts.",
  hero: {
    src: "/Secteur/cablage.png",
    alt: "Plateforme CIPA en atelier électronique : tableau de bord qualité, conformité IPC-A-610 et assistance IA",
  },
  heroIcon: Cpu,
  indicators: [
    "Efficacité globale des équipements",
    "Conformité réglementaire garantie",
    "Réduction des défauts & rebuts",
  ],

  overview:
    "Des composants électroniques bruts aux assemblages finis de cartes de circuits imprimés, CIPA aide les fabricants à fiabiliser la production, garantir les standards de soudure et assurer une traçabilité totale.",
  useCasesTitle: "opérations d'électronique et de câblage",

  coreAccentLabel: "Opérations SMT",
  coreSlides: [
  {
    num: '01',
    tag: 'Conformité & Normes',
    title: 'Renforcer la conformité réglementaire et les standards',
    desc: "Sécurisez votre conformité et assurez la traçabilité complète de vos composants. CIPA fournit un système centralisé pour enregistrer les rapports d'inspection, documenter les contrôles qualité et suivre les indicateurs de conformité aux normes rigoureuses comme l'IPC-A-610.",
    before: [
      'Préparation manuelle des audits lente',
      'Risques élevés d’erreurs de transcription',
      'Données de traçabilité éparpillées sur papier',
      'Difficulté à prouver la conformité des lots'
    ],
    after: [
      'Pistes d’audit et rapports automatisés',
      'Préparation constante aux audits qualité',
      'Conformité stricte aux standards IPC-A-610',
      'Centralisation sécurisée de la documentation'
    ],
    kpis: [
      { value: '90%', label: "de réduction du temps de préparation des audits" },
      { value: '40%', label: 'de baisse des incidents de non-conformité' }
    ],
    visual: 'compliance-flow',
    visualCaption: 'Workflow de validation qualité IPC-A-610 : chaque étape de conformité est validée dans CIPA.'
  },
  {
    num: '02',
    tag: 'Digitalisation & Efficacité',
    title: 'Efficacité renforcée par la digitalisation du shop-floor',
    desc: "Remplacez les procédures manuelles lentes et les rapports papier par des flux de travail digitaux automatisés. Suivez en temps réel le statut des machines, pilotez les tâches des opérateurs et collectez les données sur le terrain.",
    before: [
      'Dossiers de fabrication papier volumineux',
      'Saisie manuelle des données lente',
      'Visibilité limitée sur la progression de la ligne',
      'Temps de cycle élevés dus aux contrôles physiques'
    ],
    after: [
      'Instructions de travail digitales et guidées',
      'Suivi en temps réel de la progression CMS',
      'Collecte de données automatique et fiable',
      'Temps de cycle réduits et productivité accrue'
    ],
    kpis: [
      { value: '40%', label: "d'augmentation de la productivité opérationnelle" },
      { value: '70%', label: "de hausse de l'efficacité globale des équipements (TRS)" }
    ],
    visual: 'tablet',
    visualCaption: 'Interface opérateur CIPA : instructions de câblage interactives et validation des étapes CMS.'
  },
  {
    num: '03',
    tag: 'Analyses & IA',
    title: 'Analyses avancées et IA pour l’amélioration continue',
    desc: "Exploitez vos données opérationnelles pour identifier les goulots d'étranglement et anticiper les dérives de qualité. Grâce aux modèles d'IA prédictifs intégrés, optimisez la régularité de vos processus et maximisez le rendement.",
    before: [
      'Dérive des paramètres de brasage CMS non détectée',
      'Analyse des causes racines après incident',
      'Maintenance uniquement corrective',
      'Taux élevé de rebuts en fin de ligne'
    ],
    after: [
      'Détection en temps réel des dérives de process',
      'Maintenance prédictive des buses CMS et fours',
      'IA d’aide à la décision pour le management',
      'Rendement de premier passage maximisé'
    ],
    kpis: [
      { value: '60%', label: 'de réduction du taux de rebut sur vos lignes' },
      { value: '15%', label: "d'augmentation du rendement de production global" }
    ],
    visual: 'predictive-chart',
    visualCaption: 'Analyse prédictive de dérive thermique : alerte IA avant tout défaut de refusion.'
  },
  {
    num: '04',
    tag: 'Traçabilité SMT',
    title: 'Améliorer la transparence de la supply chain et de la traçabilité',
    desc: "Tracez chaque composant depuis la réception des matières premières (lot de pâte à braser, bobines de résistances) jusqu'à l'assemblage final du circuit. Isolez rapidement les pièces défectueuses pour limiter l'impact.",
    before: [
      'Traçabilité généalogique impossible en temps réel',
      'Recherche fastidieuse du lot de composants défectueux',
      'Risque élevé de mélange de bobines sur les chargeurs',
      'Temps de réaction long en cas de rappel fournisseur'
    ],
    after: [
      'Généalogie ascendante/descendante instantanée',
      'Contrôle de bobine détrompeur intégré (feeder setup)',
      'Isolation ciblée des composants défectueux en 3 min',
      'Transparence totale vis-à-vis des clients finaux'
    ],
    kpis: [
      { value: '30%', label: 'de réduction des délais de traitement logistique' },
      { value: '20%', label: 'de baisse des anomalies issues des fournisseurs' }
    ],
    visual: 'supply-chain',
    visualCaption: 'Carte généalogique de la carte électronique : du lot de bobines SMT au produit final.'
  }
  ],

  performanceAccentLabel: "Performance durable SMT",
  performanceTitle: "qualité produit, l’innovation et la performance durable",
  performanceSlides: [
  {
    num: '01',
    tag: 'Co-Design & NPI',
    title: 'Favoriser l’innovation via l’optimisation R&D et NPI',
    desc: "Accélérez vos cycles de développement de produits et simplifiez l'introduction de nouveaux produits (NPI). Centralisez les retours d'expérience R&D et facilitez une collaboration bidirectionnelle efficace entre l'ingénierie et la production.",
    before: [
      'Transfert de conception CAO vers production manuel',
      'Modifications de design non répercutées en atelier',
      'Lancement de nouveaux produits long et coûteux',
      'Erreurs d’assemblage sur les premiers prototypes'
    ],
    after: [
      'Intégration directe de la CAO électronique',
      'Collaboration fluide entre R&D et méthodes',
      'Mise sur le marché rapide des nouveaux produits',
      'Standardisation des processus dès le premier lot'
    ],
    kpis: [
      { value: '50%', label: 'de réduction du time-to-market sur les lancements' },
      { value: '2x', label: "plus d'introductions de prototypes validées par an" }
    ],
    visual: 'launch-timeline',
    visualCaption: 'Timeline NPI : réduction drastique du cycle entre conception CAO et production de masse.'
  },
  {
    num: '02',
    tag: 'Qualité Produit',
    title: 'Assurer la qualité produit et l’inspection automatique',
    desc: "Garanti la régularité de la qualité grâce à des fiches de contrôle intégrées et des points de validation opérés en ligne. CIPA structure vos audits de poste et vos rapports qualité pour un produit fiable à 100%.",
    before: [
      'Inspections optiques manuelles subjectives',
      'Défauts détectés uniquement lors des tests finals',
      'Coût élevé de la retouche de cartes brasées',
      'Rapports qualité lents et non centralisés'
    ],
    after: [
      'Validation systématique des points de contrôle CMS',
      'Détection des défauts à la source (pâte, brasage, AOI)',
      'Diminution drastique des défauts qualité finaux',
      'Tableaux de bord qualité automatisés et instantanés'
    ],
    kpis: [
      { value: '40%', label: 'de réduction des défauts qualité et rebuts' },
      { value: '30%', label: 'de baisse du coût de la qualité (reprise/retouche)' }
    ],
    visual: 'dashboard',
    visualCaption: 'Dashboard qualité CIPA : suivi des taux de défauts et Pareto des causes CMS en direct.'
  },
  {
    num: '03',
    tag: 'Durabilité',
    title: 'Durabilité et réduction de l’impact environnemental',
    desc: "Suivez votre consommation d'énergie et optimisez l'utilisation des ressources dans vos ateliers de cartes et de câblage. CIPA suit la consommation des fours de refusion et identifie les gisements d'économies d'énergie.",
    before: [
      'Fours de refusion fonctionnant en continu hors production',
      'Manque de visibilité sur les consommations électriques',
      'Empreinte carbone élevée sans leviers d’action',
      'Rebuts de soudure et métaux mal revalorisés'
    ],
    after: [
      'Planification intelligente des veilles de fours',
      'Suivi de la consommation énergétique en temps réel',
      'Réduction significative des émissions et coûts',
      'Pratiques de production vertes et valorisées'
    ],
    kpis: [
      { value: '-30%', label: 'de réduction constatée de la consommation d’énergie' },
      { value: '-20%', label: 'de production de déchets et rebuts de métaux' }
    ],
    visual: 'energy-chart',
    visualCaption: 'Suivi de consommation énergétique des fours de refusion : profil optimisé avec CIPA.'
  }
  ],

  platform: {
    title: "Une plateforme unique pour la conformité IPC, la traçabilité et l'excellence opérationnelle.",
    desc: "CIPA unifie les personnes, les processus et les données pour fournir des insights connectés sur toute la chaîne de valeur d'assemblage électronique — traçabilité des bobines de composants, visibilité sur le chargement des feeders SMT et audits de conformité automatisés.",
    features: [
      { icon: Database, label: "Données connectées" },
      { icon: Eye, label: "Visibilité atelier" },
      { icon: Truck, label: "Visibilité fournisseurs" },
      { icon: ShieldCheck, label: "Assurance conformité standards" },
    ],
  },

  steps: [
    { icon: Network, title: "1. Connecter", desc: "Unifiez les données des systèmes, équipements et opérateurs SMT." },
    { icon: FlaskConical, title: "2. Analyser", desc: "L'IA et les analyses transforment les données en insights de production." },
    { icon: Rocket, title: "3. Agir", desc: "Automatisez les workflows qualité et signalez les dérives." },
    { icon: TrendingUp, title: "4. Améliorer", desc: "Surveillez, mesurez et réduisez les rebuts CMS." },
    { icon: Leaf, title: "5. Impact", desc: "Des résultats mesurables en TRS SMT, conformité et économie d’énergie." },
  ],

  cta: {
    title: "Prêt à digitaliser votre atelier d'électronique ?",
    text: "Rejoignez les leaders industriels qui utilisent CIPA pour assurer leur conformité, maximiser la traçabilité et optimiser le TRS. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles.",
  },

  visuals: {
    complianceFlow: [
      { n: 1, title: "Audit du Lot Composants", sub: "Vérification humidité & état PCB", state: 'done' },
      { n: 2, title: "Saisie Inspection Brasage CMS", sub: "Contrôle visuel soudure (refusion) en cours", state: 'active' },
      { n: 3, title: "Déclaration de Conformité", sub: "Rapport de lot généré & archivé Cloud", state: 'todo' },
    ],

    tablet: {
      orderLabel: "Ordre de Fabrication",
      orderId: "OF-2026-ELECTRO-094",
      instructionsLabel: "Instructions de Câblage",
      instructions: [
        "Connecter la nappe J2 sur le port principal",
        "Fixer le faisceau avec des colliers de serrage",
        "Vérifier la résistance sur le point TP-4",
      ],
      progressLabel: "Progression",
      progress: 78,
      ctaLabel: "Valider l'étape de câblage",
    },

    predictiveChart: {
      points: [
        { x: 30, y: 35, val: "98%" },
        { x: 120, y: 40, val: "96%" },
        { x: 210, y: 75, val: "82%" },
        { x: 300, y: 50, val: "91%" },
        { x: 370, y: 25, val: "99%" },
      ],
      path: "M30 35 C 70 38, 90 40, 120 40 C 160 48, 180 70, 210 75 C 245 80, 270 58, 300 50 C 330 42, 350 28, 370 25",
      thresholdLabel: "Seuil d'alerte buse CMS",
      annotation: { label: "Nettoyage buse planifié", x: 210, y: 75, boxX: 140, boxWidth: 140 },
      axisLabels: ["Lot 1", "Lot 20"],
    },

    supplyChain: {
      steps: [
        { icon: Truck, title: "Bobine A2", id: "Fournisseur" },
        { icon: Cpu, title: "Zone CMS", id: "Machine SMT" },
        { icon: ShieldCheck, title: "Rapport", id: "Test ATE" },
      ],
      noteLabel: "Traçabilité complète :",
      noteText:
        "Chaque carte est généalogiquement reliée au lot de pâte à braser et à la bobine du distributeur CMS.",
    },

    launchTimeline: [
      { name: "Import CAO", before: 80, after: 30 },
      { name: "Prototype SMT", before: 90, after: 45 },
      { name: "Audits de poste", before: 70, after: 35 },
      { name: "Série pilote", before: 85, after: 50 },
    ],

    dashboard: {
      tiles: [
        { label: "TRS Global SMT", value: "82.4%", trend: "+8.2%", good: true },
        { label: "Défauts PPM", value: "45", trend: "-120", good: true },
        { label: "Dérives buses SMT", value: "1", trend: "-4", good: true },
        { label: "Temps retouche", value: "12m", trend: "-50%", good: true },
      ],
      activity: {
        label: "Composants posés / heure (x1000)",
        bars: [40, 55, 62, 85, 74, 91, 80],
      },
    },

    energyChart: {
      baselinePath: "M30,30 L110,25 L190,35 L270,30 L350,28",
      optimisedPath: "M30,30 L110,48 L190,65 L270,80 L350,90",
      markers: [
        { x: 110, y: 48 },
        { x: 190, y: 65 },
        { x: 270, y: 80 },
        { x: 350, y: 90 },
      ],
      baselineLabel: 'Base',
      deltaLabel: "-30%",
      deltaY: 94,
      xLabels: ['T0', 'Mois 1', 'Mois 3', 'Mois 6', 'Mois 12'],
    },
  },
}
