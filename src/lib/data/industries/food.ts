import {
  CheckCircle2,
  ClipboardCheck,
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
  Wheat,
} from 'lucide-react'

import type { IndustryPageData } from '@/lib/data/industries/types'

export const food: IndustryPageData = {
  slug: "food",
  metaTitle: "CIPA pour l’agroalimentaire & les boissons | Industry X.0",
  metaDescription:
    "HACCP, sécurité alimentaire, contrôles qualité en ligne et traçabilité de la ferme à la fourchette : CIPA digitalise les opérations agroalimentaires.",

  headline: "agroalimentaire & des boissons",
  intro:
    "CIPA transforme les opérations agroalimentaires et FMCG grâce à l'automatisation intelligente, l'IA, la traçabilité et les analyses avancées — améliorant la sécurité alimentaire, la qualité, la conformité et la performance sur toute votre chaîne de valeur.",
  hero: {
    src: "/Secteur/agroalimentaire_hero.png",
    alt: "Plateforme CIPA en usine agroalimentaire : tableau de bord qualité, conformité HACCP et assistance IA",
  },
  heroIcon: Wheat,
  badgeIcon: Factory,
  indicators: [
    "Efficacité opérationnelle",
    "Erreurs de conformité en moins",
    "Déviations qualité en moins",
  ],

  overview:
    "Des matières premières aux produits finis, CIPA aide les organisations agroalimentaires à améliorer la qualité, la conformité, la rapidité et la résilience — à travers sept domaines de valeur.",
  useCasesTitle: "opérations agroalimentaires essentielles",

  coreAccentLabel: "Opérations essentielles",
  coreSlides: [
  {
    num: '01',
    tag: 'Sécurité Alimentaire & Conformité',
    title: 'Documentation automatisée de conformité et de sécurité alimentaire',
    desc: "Assurez une conformité HACCP, FSMA et ISO 22000 grâce à une documentation digitale de bout en bout. Chaque point de contrôle critique (CCP) est enregistré, horodaté et prêt pour l'audit — sans papier.",
    before: [
      'Journaux manuels et enregistrements papier',
      'Documentation incomplète ou incohérente',
      "Constats et écarts lors des audits",
      'Réponse lente aux incidents et rappels'
    ],
    after: [
      'Conformité HACCP automatisée',
      "Enregistrements temps réel, prêts pour l'audit",
      'Inspections et audits plus rapides',
      'Confiance totale en sécurité alimentaire'
    ],
    kpis: [
      { value: '90%', label: "de réduction du temps de préparation des audits" },
      { value: '100%', label: 'des CCP tracés et horodatés digitalement' }
    ],
    visual: 'compliance-flow',
    visualCaption: 'Workflow HACCP digitalisé : chaque point de contrôle critique est validé en temps réel dans CIPA.'
  },
  {
    num: '02',
    tag: 'Production & Qualité',
    title: 'Production digitale et contrôle qualité',
    desc: "Standardisez la production et les contrôles qualité avec une visibilité et un contrôle en temps réel. Les opérateurs suivent des instructions digitales guidées, les écarts sont détectés immédiatement.",
    before: [
      'Contrôles qualité manuels',
      'Qualité de lot incohérente',
      'Visibilité limitée sur la production en cours',
      'Taux élevé de rebuts et de gaspillage'
    ],
    after: [
      'SPC en temps réel et alertes qualité',
      'Qualité constante, lot après lot',
      'Traçabilité complète de chaque lot',
      'Rework et rebuts fortement réduits'
    ],
    kpis: [
      { value: '30%', label: 'de réduction des rebuts et du gaspillage matière' },
      { value: '25%', label: "d'amélioration de la régularité des lots" }
    ],
    visual: 'tablet',
    visualCaption: "Application CIPA sur tablette industrielle : instructions guidées et contrôles qualité en ligne."
  },
  {
    num: '03',
    tag: 'IA & Maintenance Prédictive',
    title: 'Analyses prédictives pour la qualité et la maintenance',
    desc: "Utilisez l'IA pour prédire les problèmes et prévenir les pannes avant qu'elles n'impactent la production. Les modèles CIPA détectent les dérives de process et anticipent les défaillances d'équipements.",
    before: [
      "Pannes d'équipement inattendues",
      'Maintenance uniquement réactive',
      'Problèmes qualité détectés trop tard',
      "Temps d'arrêt non planifiés"
    ],
    after: [
      'Plannings de maintenance prédictive',
      'Détection précoce des risques qualité',
      'Disponibilité machine améliorée',
      'Flux de production plus fluide'
    ],
    kpis: [
      { value: '+15%', label: 'de disponibilité des équipements critiques' },
      { value: '-45%', label: "de temps d'arrêt non planifiés" }
    ],
    visual: 'predictive-chart',
    visualCaption: 'Score de santé machine : la dérive est détectée et corrigée avant la panne.'
  },
  {
    num: '04',
    tag: 'Traçabilité de la Ferme à la Fourchette',
    title: 'Traçabilité des ingrédients et matières premières',
    desc: "Traçabilité de bout en bout pour les ingrédients, les allergènes et les produits finis. Chaque lot est généalogiquement relié à ses matières premières, ses fournisseurs et ses destinations.",
    before: [
      'Visibilité fournisseur limitée',
      'Processus de traçabilité manuels',
      'Rappels et investigations lents',
      'Généalogie de lot imprécise'
    ],
    after: [
      'Traçabilité complète, de la ferme à la fourchette',
      'Visibilité fournisseurs et lots entrants',
      'Rappels ciblés et analyse des causes racines',
      'Généalogie de lot précise et instantanée'
    ],
    kpis: [
      { value: '-70%', label: "de temps d'exécution d'un rappel produit" },
      { value: '100%', label: 'de généalogie amont / aval par lot' }
    ],
    visual: 'supply-chain',
    visualCaption: "Chaîne généalogique d'un lot : du fournisseur d'ingrédients jusqu'à la distribution."
  }
  ],

  performanceAccentLabel: "Performance durable",
  performanceTitle: "qualité, l’innovation et la performance durable",
  performanceSlides: [
  {
    num: '01',
    tag: 'Innovation & Go-To-Market',
    title: 'Développement produit et mise sur le marché accélérés',
    desc: "Rationalisez la formulation, les tests et les approbations pour lancer vos produits plus vite. R&D, qualité et production collaborent sur un référentiel unique de recettes et d'essais.",
    before: [
      'R&D et qualité en silos',
      'Cycles de validation interminables',
      'Approbations lentes et dispersées',
      'Opportunités de marché manquées'
    ],
    after: [
      'Données de formulation centralisées',
      'Tests et validations accélérés',
      'Approbations digitales fluides',
      'Time-to-market réduit'
    ],
    kpis: [
      { value: '-40%', label: 'de réduction du time-to-market' },
      { value: '2x', label: "plus d'itérations de recettes testées par an" }
    ],
    visual: 'launch-timeline',
    visualCaption: 'Cycle de lancement produit : chaque phase est raccourcie par la collaboration digitale.'
  },
  {
    num: '02',
    tag: 'Reporting Automatisé',
    title: 'Surveillance qualité continue avec reporting automatisé',
    desc: "Automatisez la capture de données et générez des rapports en temps réel pour les inspections et le management. Fini la ressaisie : les tableaux de bord se construisent tout seuls.",
    before: [
      'Saisie manuelle des données',
      'Reporting chronophage',
      'Visibilité retardée sur la qualité',
      'Préparation des audits sous pression'
    ],
    after: [
      'Capture de données automatique',
      'Rapports et dashboards en temps réel',
      'Alertes instantanées sur déviation',
      "Toujours prêt pour l'inspection"
    ],
    kpis: [
      { value: '100%', label: 'de visibilité qualité en temps réel' },
      { value: '-80%', label: 'de temps passé sur le reporting manuel' }
    ],
    visual: 'dashboard',
    visualCaption: 'Tableau de bord qualité CIPA : indicateurs en direct, alertes et tendances automatiques.'
  },
  {
    num: '03',
    tag: 'Durabilité & Ressources',
    title: "Réduction de la consommation d'énergie et des déchets",
    desc: "Optimisez les ressources et réduisez les déchets pour des opérations plus durables. CIPA suit l'énergie, l'eau et les pertes matière en temps réel et identifie les gisements d'économies.",
    before: [
      "Consommation d'énergie et d'eau élevée",
      'Gaspillage matière excessif',
      'Visibilité limitée sur les pertes',
      "Coûts d'élimination des déchets élevés"
    ],
    after: [
      'Suivi énergie et ressources en temps réel',
      'Consommations et émissions réduites',
      "Moins de gaspillage d'énergie et d'eau",
      'Opérations plus durables et rentables'
    ],
    kpis: [
      { value: '-20%', label: 'de réduction de la production de déchets' },
      { value: '-15%', label: "de consommation d'énergie par tonne produite" }
    ],
    visual: 'energy-chart',
    visualCaption: "Profil de consommation énergétique : la courbe optimisée par CIPA décroche de la base historique."
  }
  ],

  platform: {
    title: "Une plateforme unique pour la qualité, la traçabilité et l'excellence opérationnelle.",
    desc: "CIPA unifie les personnes, les processus et les données pour fournir des insights connectés sur toute la chaîne de valeur alimentaire — sécurité des aliments, visibilité atelier, visibilité fournisseurs et amélioration continue.",
    features: [
      { icon: Database, label: "Données connectées" },
      { icon: Eye, label: "Visibilité atelier" },
      { icon: Truck, label: "Visibilité fournisseurs" },
      { icon: ShieldCheck, label: "Assurance sécurité alimentaire" },
    ],
  },

  steps: [
    { icon: Network, title: "1. Connecter", desc: "Unifiez les données des systèmes, équipements et opérateurs." },
    { icon: FlaskConical, title: "2. Analyser", desc: "L'IA et les analyses transforment les données en insights actionnables." },
    { icon: Rocket, title: "3. Agir", desc: "Automatisez les workflows et déclenchez la meilleure action." },
    { icon: TrendingUp, title: "4. Améliorer", desc: "Surveillez, mesurez et optimisez en continu." },
    { icon: Leaf, title: "5. Impact", desc: "Des résultats mesurables en qualité, efficacité et croissance durable." },
  ],

  cta: {
    title: "Prêt à transformer vos opérations agroalimentaires ?",
    text: "Découvrez comment CIPA by Industry X.0 peut vous aider à garantir la sécurité alimentaire, améliorer l'efficacité et générer une croissance durable. Nos experts réalisent une démonstration personnalisée basée sur vos lignes et vos contraintes réelles.",
  },

  visuals: {
    complianceFlow: [
      { n: 1, title: "Réception matières premières", sub: "Contrôle température & certificat fournisseur", state: 'done' },
      { n: 2, title: "CCP — Pasteurisation 72°C / 15s", sub: "Relevé capteur automatique + validation opérateur", state: 'active' },
      { n: 3, title: "Étiquetage allergènes & libération", sub: "Vérification automatique avant expédition", state: 'todo' },
    ],
    complianceFlowIcons: { done: CheckCircle2, todo: ClipboardCheck },

    tablet: {
      orderLabel: "Ordre de Fabrication",
      orderId: "OF-2026-FOOD-L2-118",
      instructionsLabel: "Contrôles Qualité en Ligne",
      checks: [
        { label: "pH sauce : 4.2 (cible 4.0–4.4)", done: true },
        { label: "Poids net : 502 g (± 3 g)", done: true },
        { label: "Détection métaux : en cours…", done: false },
      ],
      progressLabel: "Lot conforme",
      progress: 98.6,
      ctaLabel: "Valider le contrôle qualité du lot",
    },

    predictiveChart: {
      points: [
        { x: 30, y: 35, val: "96%" },
        { x: 120, y: 45, val: "92%" },
        { x: 210, y: 70, val: "84%" },
        { x: 300, y: 55, val: "89%" },
        { x: 370, y: 30, val: "97%" },
      ],
      path: "M30 35 C 70 38, 90 40, 120 45 C 160 52, 180 65, 210 70 C 245 74, 270 62, 300 55 C 330 47, 350 34, 370 30",
      thresholdLabel: "Seuil d'alerte IA",
      annotation: { label: "Maintenance planifiée ici", x: 210, y: 70, boxX: 158, boxWidth: 104 },
      axisLabels: ["Sem. 1", "Sem. 12"],
    },

    supplyChain: {
      steps: [
        { icon: Wheat, title: "Fournisseur", id: "ING-2214" },
        { icon: Truck, title: "Réception", id: "REC-0917" },
        { icon: Cpu, title: "Production", id: "LOT-FB-33" },
        { icon: Network, title: "Distribution", id: "EXP-4820" },
      ],
      noteLabel: "Rappel simulé :",
      noteText:
        "le lot ING-2214 (allergène arachide) est isolé — CIPA identifie en 3 minutes les 2 lots finis et 14 points de vente impactés.",
    },

    launchTimeline: [
      { name: "Formulation", before: 90, after: 55 },
      { name: "Essais pilotes", before: 75, after: 45 },
      { name: "Validation qualité", before: 60, after: 30 },
      { name: "Industrialisation", before: 80, after: 50 },
    ],
    launchTimelineNote: "Durée relative des phases (%)",

    dashboard: {
      tiles: [
        { label: "Taux de conformité", value: "99.2%", trend: "+0.8", good: true },
        { label: "Déviations ouvertes", value: "3", trend: "-5", good: true },
        { label: "Alertes allergènes", value: "0", trend: "0", good: true },
        { label: "Plaintes clients", value: "1.2‰", trend: "-40%", good: true },
      ],
      activity: {
        label: "Contrôles réalisés / jour",
        note: "Rapport auto — chaque matin 06:00",
        bars: [62, 75, 58, 88, 70, 92, 84],
        days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      },
    },

    energyChart: {
      baselinePath: "M30,30 L110,26 L190,34 L270,29 L350,27",
      optimisedPath: "M30,30 L110,46 L190,62 L270,78 L350,88",
      markers: [
        { x: 110, y: 46 },
        { x: 190, y: 62 },
        { x: 270, y: 78 },
        { x: 350, y: 88 },
      ],
      baselineLabel: 'Base',
      deltaLabel: "-20%",
      deltaY: 92,
      xLabels: ['T0', 'Mois 1', 'Mois 3', 'Mois 6', 'Mois 12'],
    },
  },
}
