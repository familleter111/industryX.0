import {
  BadgeCheck,
  Car,
  Cpu,
  Database,
  Eye,
  FlaskConical,
  Gauge,
  Leaf,
  Network,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Truck,
} from 'lucide-react'

import type { IndustryPageData } from '@/lib/data/industries/types'

export const automotive: IndustryPageData = {
  slug: 'automotive',
  metaTitle: 'CIPA pour l’industrie automobile & des composants | Industry X.0',
  metaDescription:
    'Conformité IATF 16949, traçabilité du composant au VIN, maintenance prédictive des lignes : CIPA digitalise la qualité et la production des équipementiers et constructeurs automobiles.',

  headline: 'automobile & des composants',
  intro:
    "L'industrie automobile évolue dans un environnement où sécurité, émissions et qualité sont scrutées à chaque étape. CIPA fournit une plateforme digitale complète pour piloter la conformité, la performance de production et la traçabilité des composants, du fournisseur jusqu'au véhicule fini.",
  hero: {
    src: '/Secteur/automobile.png',
    alt: 'Production automobile Industry X.0',
  },
  heroIcon: Car,
  heroBadge: { label: 'Normes Qualité', value: 'IATF 16949 Standardisé' },

  results: [
    {
      icon: Gauge,
      value: '35%',
      label: 'Efficacité opérationnelle améliorée',
      desc: 'Digitalisation de la production et de la supply chain pour une coordination optimale.',
    },
    {
      icon: ShieldCheck,
      value: '85%',
      label: 'Réduction des erreurs de conformité',
      desc: 'Automatisation de la documentation et du suivi réglementaire terrain.',
    },
    {
      icon: BadgeCheck,
      value: '50%',
      label: 'Réduction des taux de défauts',
      desc: 'Contrôle qualité continu et reporting automatisé sur les lignes.',
    },
  ],

  overview:
    "Des composants critiques à l'assemblage final du véhicule, CIPA aide les équipementiers et constructeurs à sécuriser la conformité réglementaire, fiabiliser la production et accélérer la traçabilité des pièces.",
  useCasesTitle: 'opérations automobiles essentielles',

  coreAccentLabel: 'Opérations Automobile',
  coreSlides: [
  {
    num: '01',
    tag: 'Conformité & Réglementation',
    title: 'Renforcer la conformité réglementaire automobile',
    desc: "L'industrie automobile fait face à des réglementations strictes en matière de sécurité, d'émissions et de qualité. La conformité est essentielle non seulement pour le respect de la loi mais aussi pour la confiance des consommateurs. CIPA automatise la documentation et le suivi de conformité, réduisant les risques de non-conformité et les pénalités associées.",
    before: [
      'Suivi de conformité manuel générant un taux d’erreur de 12%',
      'Risque élevé de rappels produits et de litiges juridiques',
      'Documentation réglementaire dispersée entre plusieurs services',
      'Préparation des audits longue et incertaine'
    ],
    after: [
      'Documentation et suivi de conformité automatisés de bout en bout',
      'Réduction des erreurs de conformité de 85%',
      '40% de non-conformités liées à la réglementation en moins',
      'Coûts d’audit réduits de 30% grâce aux rapports instantanés'
    ],
    kpis: [
      { value: '85%', label: 'de réduction des erreurs de conformité' },
      { value: '30%', label: 'd’économies sur les coûts d’audit de conformité' }
    ],
    visual: 'compliance-flow',
    visualCaption: 'Workflow de conformité automobile : double contrôle qualité et archivage de la piste d’audit sur CIPA.'
  },
  {
    num: '02',
    tag: 'Digitalisation & Efficacité',
    title: 'Booster l’efficacité grâce à la digitalisation',
    desc: "La complexité de la fabrication automobile exige une coordination précise entre supply chain, ordonnancement et production. CIPA digitalise ces processus pour permettre un accès aux données en temps réel, une meilleure planification et une utilisation optimisée des ressources.",
    before: [
      'Processus papier générant 18% d’inefficacité en production',
      'Gestion des stocks et de la supply chain peu réactive',
      'Coûts et délais de production accrus',
      'Ordonnancement manuel source d’erreurs de planification'
    ],
    after: [
      'Digitalisation complète des flux de production et logistique',
      'Gain d’efficacité opérationnelle de 25 à 35%',
      'Décisions pilotées par la donnée en temps réel',
      'Réduction du gaspillage et des arrêts non planifiés'
    ],
    kpis: [
      { value: '35%', label: 'd’amélioration de l’efficacité opérationnelle' }
    ],
    visual: 'tablet',
    visualCaption: 'Ordre de fabrication digital CIPA : instructions guidées et suivi de ligne en temps réel.'
  },
  {
    num: '03',
    tag: 'Analytique Prédictive & IA',
    title: 'Analyses avancées et IA pour l’amélioration continue',
    desc: "Dans une industrie automobile en constante évolution, l'analytique de données et l'IA sont essentielles pour optimiser les opérations et la qualité produit. CIPA exploite les données de production et les retours consommateurs pour piloter l'amélioration continue.",
    before: [
      'Pannes d’équipement imprévues causant 7 à 10% de pertes de production',
      'Maintenance réactive impactant les délais de livraison',
      'Satisfaction client dégradée par les retards',
      'Allocation des ressources peu optimisée'
    ],
    after: [
      'Maintenance prédictive pilotée par l’IA',
      'Réduction des temps d’arrêt machine de 40 à 50%',
      'Meilleure allocation des ressources et TRS amélioré',
      'Anticipation des dérives avant impact qualité'
    ],
    kpis: [
      { value: '50%', label: 'de réduction des temps d’arrêt équipement' },
      { value: '15%', label: 'd’économies sur les coûts de maintenance' }
    ],
    visual: 'predictive-chart',
    visualCaption: 'Suivi prédictif de ligne d’assemblage : détection de dérive avant impact sur la qualité.'
  },
  {
    num: '04',
    tag: 'Traçabilité Composants',
    title: 'Améliorer la transparence de la chaîne d’approvisionnement',
    desc: "La transparence de la supply chain est vitale dans le secteur automobile pour garantir qualité et efficacité. CIPA améliore la visibilité en assurant un suivi en temps réel des composants et matières, permettant de réagir rapidement aux aléas et de maîtriser les risques.",
    before: [
      'Manque de visibilité augmentant les coûts de stockage de 20%',
      'Risque accru de pièces contrefaites ou non conformes',
      'Traçabilité des composants difficile à reconstituer',
      'Réactivité limitée face aux ruptures d’approvisionnement'
    ],
    after: [
      'Suivi en temps réel des composants, du fournisseur au VIN',
      'Réduction des coûts d’inventaire de 25%',
      'Authenticité et conformité garanties sur toute la chaîne',
      'Détection rapide des risques fournisseurs'
    ],
    kpis: [
      { value: '20%', label: 'de risque de pièces contrefaites en moins' },
      { value: '25%', label: 'de réduction des coûts d’inventaire' }
    ],
    visual: 'supply-chain',
    visualCaption: 'Chaîne de traçabilité composant : du fournisseur à l’assemblage jusqu’au véhicule fini (VIN).'
  }
],

  performanceAccentLabel: 'Performance durable Automobile',
  performanceSlides: [
  {
    num: '01',
    tag: 'Innovation & R&D',
    title: 'Accélérer l’innovation grâce aux données R&D',
    desc: "Dans une industrie automobile hautement concurrentielle, l'innovation est essentielle au succès. CIPA fluidifie la R&D en permettant des insights pilotés par la donnée et une collaboration renforcée entre équipes, accélérant les cycles de développement produit.",
    before: [
      'Traitement des données R&D allongeant les délais de 15 à 20%',
      'Collaboration cloisonnée entre équipes techniques',
      'Entrée sur le marché retardée pour les nouveaux modèles',
      'Difficulté à capitaliser sur les retours terrain'
    ],
    after: [
      'Référentiel unique de données et outils collaboratifs',
      'Time-to-market réduit de 30 à 40%',
      'Meilleure compétitivité sur les nouveaux modèles',
      'Cycles d’innovation accélérés et documentés'
    ],
    kpis: [
      { value: '40%', label: 'de time-to-market en moins pour les nouveaux modèles' }
    ],
    visual: 'launch-timeline',
    visualCaption: 'Timeline R&D véhicule : réduction du délai de conception à l’homologation.'
  },
  {
    num: '02',
    tag: 'Qualité & Sécurité',
    title: 'Garantir la qualité et la sécurité produit',
    desc: "Le maintien de standards de qualité élevés est primordial dans l'automobile, où les défauts peuvent entraîner rappels et problèmes de sécurité. CIPA renforce l'assurance qualité par un suivi continu et un reporting automatisé.",
    before: [
      'Contrôles qualité manuels générant 8 à 9% de taux de défauts',
      'Coûts de retouche et de rappels produits élevés',
      'Détection tardive des non-conformités',
      'Reporting qualité fastidieux et non consolidé'
    ],
    after: [
      'Suivi qualité en temps réel et reporting automatisé',
      'Réduction des taux de défauts de 50%',
      '20% de rappels en moins et retouches réduites',
      'Sécurité produit renforcée à chaque étape'
    ],
    kpis: [
      { value: '50%', label: 'de réduction des taux de défauts' },
      { value: '25%', label: 'd’économies liées à la réduction des retouches' }
    ],
    visual: 'dashboard',
    visualCaption: 'Dashboard qualité ligne CIPA : bon du premier coup, non-conformités et alertes en direct.'
  },
  {
    num: '03',
    tag: 'Durabilité & Énergie',
    title: 'Optimiser la durabilité et l’impact environnemental',
    desc: "La durabilité devient un enjeu central dans l'industrie automobile, portée par les exigences réglementaires et les attentes des consommateurs. CIPA aide à optimiser l'usage des ressources et à réduire les déchets, en cohérence avec les objectifs RSE.",
    before: [
      'Processus de production énergivores et peu optimisés',
      'Jusqu’à 12% de coûts opérationnels liés au gaspillage',
      'Faible visibilité sur la consommation par ligne',
      'Empreinte environnementale difficile à piloter'
    ],
    after: [
      'Pilotage fin de la consommation énergétique en production',
      'Réduction de la consommation d’énergie de 20 à 25%',
      'Coûts opérationnels et empreinte carbone réduits',
      'Conformité renforcée avec les objectifs de durabilité'
    ],
    kpis: [
      { value: '25%', label: 'de réduction de la consommation d’énergie et des coûts' }
    ],
    visual: 'energy-chart',
    visualCaption: 'Profil énergétique de ligne de production : courbe de consommation optimisée par CIPA.'
  }
],

  platform: {
    title: 'Une plateforme unique pour la qualité, la traçabilité et la conformité IATF 16949.',
    desc: 'CIPA unifie les personnes, les processus et les données sur toute la chaîne de valeur automobile — conformité IATF 16949, traçabilité composant à VIN, maintenance prédictive des lignes et audits automatisés.',
    features: [
      { icon: Database, label: 'Données connectées' },
      { icon: Eye, label: 'Visibilité atelier' },
      { icon: Truck, label: 'Visibilité fournisseurs' },
      { icon: ShieldCheck, label: 'Assurance conformité IATF' },
    ],
  },

  steps: [
    { icon: Network, title: '1. Connecter', desc: 'Unifiez les données machines, opérateurs et fournisseurs sur les lignes.' },
    { icon: FlaskConical, title: '2. Analyser', desc: "L'IA et les analyses prédisent les dérives et identifient les écarts qualité." },
    { icon: Rocket, title: '3. Agir', desc: 'Automatisez les workflows qualité et déclenchez les actions correctives.' },
    { icon: TrendingUp, title: '4. Améliorer', desc: 'Surveillez, mesurez et réduisez les temps d’arrêt et les défauts.' },
    { icon: Leaf, title: '5. Impact', desc: 'Des résultats mesurables en conformité, qualité et sobriété énergétique.' },
  ],

  cta: {
    title: 'Prêt à digitaliser vos opérations automobiles ?',
    text: "Rejoignez les équipementiers et constructeurs qui utilisent CIPA pour assurer leur conformité IATF, maximiser la traçabilité composant à VIN et optimiser leur performance industrielle. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles.",
  },

  visuals: {
    complianceFlow: [
      { n: 1, title: 'Validation Cahier des Charges Qualité', sub: 'Spécifications sécurité & émissions validées', state: 'done' },
      { n: 2, title: 'Double Contrôle Opérateur & Qualité', sub: 'Enregistrement de contrôle actif sur la ligne', state: 'active' },
      { n: 3, title: 'Archivage Piste d’Audit IATF 16949', sub: 'Rapport généré et horodaté automatiquement', state: 'todo' },
    ],

    tablet: {
      orderLabel: 'Ordre de Fabrication Digital',
      orderId: 'OF-2026-AUTO-L2-118',
      instructionsLabel: 'Instructions de Montage',
      instructions: [
        'Vérifier le couple de serrage du poste 12 (fixation châssis)',
        'Contrôler la référence du sous-ensemble avant assemblage',
        'Valider le scan composant et l’horodatage poste',
      ],
      progressLabel: 'Avancement',
      progress: 82,
      ctaLabel: "Valider l'étape de montage",
    },

    predictiveChart: {
      points: [
        { x: 30, y: 32, val: '98%' },
        { x: 120, y: 42, val: '95%' },
        { x: 210, y: 68, val: '87%' },
        { x: 300, y: 50, val: '92%' },
        { x: 370, y: 26, val: '99%' },
      ],
      path: 'M30 32 C 70 36, 90 38, 120 42 C 160 48, 180 62, 210 68 C 245 73, 270 58, 300 50 C 330 44, 350 30, 370 26',
      thresholdLabel: 'Seuil alerte vibration/couple',
      annotation: { label: 'Maintenance prédictive déclenchée', x: 210, y: 68, boxX: 140, boxWidth: 140 },
    },

    supplyChain: {
      steps: [
        { icon: Network, title: 'Fournisseur Composant', id: 'Lot-COMP-992' },
        { icon: Cpu, title: 'Assemblage Sous-ensemble', id: 'Lot-ASM-04' },
        { icon: ShieldCheck, title: 'Contrôle Final / VIN', id: 'VIN-TX-4471' },
      ],
      noteLabel: 'Traçabilité complète :',
      noteText:
        'Généalogie composant-lot-VIN instantanée pour répondre aux exigences de rappel et de garantie.',
    },

    launchTimeline: [
      { name: 'Conception & Cahier des Charges', before: 85, after: 45 },
      { name: 'Prototype & Validation', before: 75, after: 45 },
      { name: 'Essais Industriels', before: 90, after: 50 },
      { name: 'Homologation & Lancement', before: 70, after: 35 },
    ],

    dashboard: {
      tiles: [
        { label: 'Bon du Premier Coup', value: '97.2%', trend: '+3.8%', good: true },
        { label: 'Non-conformités Ouvertes', value: '2', trend: '-11', good: true },
        { label: 'Alertes Qualité Ligne', value: '0', trend: '0', good: true },
        { label: 'Revue de Contrôle', value: '3h', trend: '-75%', good: true },
      ],
      auditLabel: 'Rapport de Piste d’Audit :',
      auditText:
        'Contrôles qualité verrouillés, validation opérateur horodatée et conforme IATF 16949.',
    },

    energyChart: {
      baselinePath: 'M30,30 L110,25 L190,35 L270,30 L350,28',
      optimisedPath: 'M30,30 L110,45 L190,60 L270,75 L350,85',
      markers: [
        { x: 110, y: 45 },
        { x: 190, y: 60 },
        { x: 270, y: 75 },
        { x: 350, y: 85 },
      ],
      baselineLabel: 'Base',
      deltaLabel: '-25%',
      deltaY: 89,
      xLabels: ['T0', 'Mois 1', 'Mois 3', 'Mois 6', 'Mois 12'],
    },
  },
}
