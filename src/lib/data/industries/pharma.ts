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

export const pharma: IndustryPageData = {
  slug: 'pharma',
  metaTitle: 'CIPA pour l’industrie pharmaceutique | Industry X.0',
  metaDescription:
    'Conformité FDA 21 CFR Part 11 et BPF, dossier de lot électronique, déviations et traçabilité API : CIPA digitalise la qualité et la production pharmaceutiques.',

  heroStatement: {
    eyebrow: 'Pharma / Biotech / Life Sciences',
    title: ['CIPA transforme', 'la', 'donnée terrain', 'en performance durable'],
  },
  intro:
    'Une plateforme intégrée pour orchestrer la qualité, la production, la maintenance et la R&D dans les environnements réglementés, et accélérer l’amélioration continue grâce à l’IA.',
  hero: {
    src: '/Secteur/pharma22.png',
    alt: 'Plateforme CIPA en salle blanche pharmaceutique : tableau de bord qualité, conformité et assistance IA',
  },
  heroIcon: ShieldCheck,
  indicators: ['Données unifiées', 'Processus maîtrisés', 'Conformité renforcée'],

  overview:
    'Des matières actives en vrac au conditionnement final sous blister, CIPA aide les laboratoires pharmaceutiques à sécuriser la conformité réglementaire, optimiser l’eBR et accélérer la libération des lots.',
  useCasesTitle: 'opérations pharmaceutiques essentielles',

  coreAccentLabel: 'Opérations Pharma',
  coreSlides: [
  {
    num: '01',
    tag: 'Conformité & Normes',
    title: 'Renforcer la conformité réglementaire FDA & BPF',
    desc: "Assurez la conformité aux directives strictes de la FDA (21 CFR Part 11) et BPF (GMP) grâce à des pistes d'audit (audit trail) automatisées et une traçabilité numérique complète de chaque étape.",
    before: [
      'Préparation manuelle des audits lente et risquée',
      'Risque élevé d’erreurs de transcription papier',
      'Données de conformité fragmentées en silos',
      'Piste d’audit difficile à reconstituer à la main'
    ],
    after: [
      'Pistes d’audit (audit trail) 100% automatisées',
      'Conformité stricte à la norme 21 CFR Part 11',
      'Double validation et signatures électroniques',
      'Rapports de conformité et audits instantanés'
    ],
    kpis: [
      { value: '90%', label: "de préparation constante aux audits" },
      { value: '30%', label: 'de réduction du coût global de conformité' }
    ],
    visual: 'compliance-flow',
    visualCaption: 'Workflow de conformité FDA & BPF : double validation et signature électronique sur CIPA.'
  },
  {
    num: '02',
    tag: 'Dossier de Lot Électronique',
    title: 'Efficacité renforcée par le dossier de lot électronique (eBR)',
    desc: "Éliminez les dossiers de lot papier lents et sujets aux erreurs. CIPA permet aux opérateurs de suivre des instructions de travail digitales guidées en salle blanche stérile et de valider les étapes en temps réel.",
    before: [
      'Dossiers de lot papier volumineux et lents à relire',
      'Risque d’erreurs de pesée et de dosage d’excipients',
      'Absence de validation en direct des étapes critiques',
      'Revue de dossiers de lots fastidieuse post-production'
    ],
    after: [
      'Dossiers de lot électroniques (eBR) guidés',
      'Contrôle automatique des pesées et mélanges',
      'Validation systématique des étapes en direct',
      'Libération de lot accélérée et simplifiée'
    ],
    kpis: [
      { value: '30%', label: 'de réduction des temps de libération de lot' },
      { value: '40%', label: 'de diminution des erreurs documentaires' }
    ],
    visual: 'tablet',
    visualCaption: 'Interface eBR opérateur CIPA : instructions de formulation guidées sur tablette en salle blanche.'
  },
  {
    num: '03',
    tag: 'IA & Déviations',
    title: 'Analyses avancées et IA pour l’amélioration continue',
    desc: "Exploitez les modèles d'IA prédictifs intégrés pour surveiller en continu les paramètres physiques de vos réacteurs et anticiper les déviations de qualité des lots.",
    before: [
      'Dérive de température ou pH de bioréacteur tardive',
      'Déviations qualité détectées en fin de batch',
      'Maintenance réactive entraînant des arrêts de lignes',
      'Rebuts de lots complets coûteux en fin de cycle'
    ],
    after: [
      'Surveillance prédictive IA des paramètres process',
      'Alerte précoce sur dérive de température ou pH',
      'Maintenance prédictive planifiée hors production',
      'Réduction significative des pertes de lots'
    ],
    kpis: [
      { value: '50%', label: 'de réduction du taux de déviations qualité' },
      { value: '10%', label: "d'augmentation du rendement de production global" }
    ],
    visual: 'predictive-chart',
    visualCaption: 'Suivi prédictif de bioréacteur : détection de dérive thermique avant altération du lot.'
  },
  {
    num: '04',
    tag: 'Traçabilité API',
    title: 'Améliorer la transparence de la supply chain et de la traçabilité',
    desc: "Conservez un historique numérique complet depuis la réception des matières actives (API) et des excipients jusqu'à la distribution finale du médicament. Isolez les lots en quelques minutes.",
    before: [
      'Traçabilité complexe et manuelle des matières actives',
      'Reconstitution de la généalogie de lot lente',
      'Difficulté à localiser les flacons sérialisés',
      'Temps de réaction long en cas de rappel produit'
    ],
    after: [
      'Généalogie de lot ascendante/descendante instantanée',
      'Traçabilité complète des fournisseurs de matières',
      'Sérialisation et code UDI suivis en direct',
      'Exécution de rappel produit ciblée en moins de 3 min'
    ],
    kpis: [
      { value: '20%', label: 'de réduction des délais de livraison' },
      { value: '25%', label: 'de baisse des coûts de stockage' }
    ],
    visual: 'supply-chain',
    visualCaption: 'Chaîne généalogique Lot : traçabilité continue du principe actif (API) au conditionnement.'
  }
  ],

  performanceAccentLabel: 'Performance durable Pharma',
  performanceSlides: [
  {
    num: '01',
    tag: 'Innovation & NPI',
    title: 'Accélérer l’innovation et l’optimisation du transfert R&D',
    desc: "Facilitez le transfert technologique entre les laboratoires R&D et l'usine de production. Centralisez les formules et standardisez les recettes pour accélérer l'industrialisation des médicaments.",
    before: [
      'Transfert de formulation R&D vers usine sur papier',
      'Mise à l’échelle (scale-up) complexe et non documentée',
      'Lancement de nouveaux médicaments long et coûteux',
      'Erreurs d’adaptation des formules en production'
    ],
    after: [
      'Référentiel unique de formules digitales standardisées',
      'Collaboration fluide entre laboratoires et usines',
      'Mise à l’échelle documentée et automatisée',
      'Time-to-market drastiquement raccourci'
    ],
    kpis: [
      { value: '70%', label: 'd’augmentation de la vitesse de documentation' },
      { value: '-40%', label: 'de réduction du time-to-market pour les lancements' }
    ],
    visual: 'launch-timeline',
    visualCaption: 'Timeline NPI : réduction du temps de transfert technologique de la R&D à la fabrication.'
  },
  {
    num: '02',
    tag: 'Assurance Qualité',
    title: 'Assurer la qualité produit et la sécurité des patients',
    desc: "Intégrez des contrôles qualité en ligne et automatisez le mirage visuel pour garantir le respect strict des spécifications des produits et préserver la sécurité des patients.",
    before: [
      'Mirage et inspection manuels subjectifs',
      'Incidents qualité détectés tardivement',
      'Temps de contrôle qualité lents hors ligne',
      'Coûts de quarantaine et de rebuts élevés'
    ],
    after: [
      'Mirage automatique et contrôles en ligne fiables',
      'Détection immédiate des défauts et corps étrangers',
      'Rapports d’assurance qualité automatisés en direct',
      'Sécurité des patients garantie à chaque ampoule'
    ],
    kpis: [
      { value: '50%', label: 'de diminution des défauts produits finis' },
      { value: '20%', label: 'de réduction du temps passé sur les contrôles' }
    ],
    visual: 'dashboard',
    visualCaption: 'Dashboard de libération de lot CIPA : indicateurs qualité, déviations et validation en direct.'
  },
  {
    num: '03',
    tag: 'CVC Salle Blanche',
    title: 'Optimiser la durabilité et réduire la consommation d’énergie',
    desc: "Pilotez la consommation d'énergie de vos salles blanches, notamment des systèmes de CVC (chauffage, ventilation et climatisation), pour une production durable et écoresponsable.",
    before: [
      'Salles blanches climatisées en continu à pleine puissance',
      'Manque de visibilité sur les consommations d’énergie',
      'Pertes de fluides et rejets sans mesures fiables',
      'Empreinte carbone industrielle élevée'
    ],
    after: [
      'Régulation intelligente de la CVC hors production',
      'Suivi de la consommation énergétique salle par salle',
      'Diminution significative des coûts de fluides',
      'Opérations vertes en phase avec les objectifs RSE'
    ],
    kpis: [
      { value: '-30%', label: 'de consommation d’énergie constatée sur la CVC' },
      { value: '-20%', label: 'de production de déchets et rebuts de matières' }
    ],
    visual: 'energy-chart',
    visualCaption: 'Profil énergétique CVC de salle blanche : courbe de consommation optimisée par CIPA.'
  }
  ],

  platform: {
    title: 'Une plateforme unique pour l’excellence, la traçabilité et la conformité 21 CFR Part 11.',
    desc: 'CIPA unifie les personnes, les processus et les données pour fournir des insights connectés sur toute la chaîne de valeur pharmaceutique — sécurité des patients, intégrité des données ALCOA+, audits de conformité automatisés et eBR en temps réel.',
    features: [
      { icon: Database, label: 'Données connectées' },
      { icon: Eye, label: 'Visibilité atelier' },
      { icon: Truck, label: 'Visibilité fournisseurs' },
      { icon: ShieldCheck, label: 'Assurance conformité FDA' },
    ],
  },

  steps: [
    { icon: Network, title: '1. Connecter', desc: 'Unifiez les données des équipements et opérateurs en salle blanche.' },
    { icon: FlaskConical, title: '2. Analyser', desc: 'L’IA et les analyses prédisent les dérives et identifient les écarts.' },
    { icon: Rocket, title: '3. Agir', desc: 'Automatisez les workflows qualité et signalez les déviations.' },
    { icon: TrendingUp, title: '4. Améliorer', desc: 'Surveillez, mesurez et réduisez les temps de libération.' },
    { icon: Leaf, title: '5. Impact', desc: 'Des résultats mesurables en libération eBR, conformité et énergie CVC.' },
  ],

  cta: {
    title: 'Prêt à digitaliser vos opérations pharmaceutiques ?',
    text: 'Rejoignez les leaders des sciences de la vie qui utilisent CIPA pour assurer leur conformité, maximiser la traçabilité et optimiser le rendement. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles.',
  },

  visuals: {
    complianceFlow: [
      { n: 1, title: 'Validation Dossier Formule', sub: 'Spécifications BPF validées', state: 'done' },
      { n: 2, title: 'Double Signature Opérateur & Pharmacien', sub: 'Enregistrement de signature électronique active', state: 'active' },
      { n: 3, title: 'Archivage Piste d’Audit FDA', sub: 'Rapport généré & signé 21 CFR Part 11', state: 'todo' },
    ],

    tablet: {
      orderLabel: 'Dossier de Lot Électronique',
      orderId: 'OF-2026-PHARMA-L3-042',
      instructionsLabel: 'Instructions de Formulation',
      instructions: [
        'Vérifier la stérilisation du réacteur R-101 (SIP)',
        'Ajouter 150 kg d’excipient sous agitation à 60 RPM',
        'Valider la température de consigne à 37.5°C',
      ],
      progressLabel: 'Mélange',
      progress: 78,
      ctaLabel: 'Valider l’étape de pesée/mélange',
    },

    predictiveChart: {
      points: [
        { x: 30, y: 35, val: '97%' },
        { x: 120, y: 45, val: '94%' },
        { x: 210, y: 70, val: '86%' },
        { x: 300, y: 55, val: '90%' },
        { x: 370, y: 28, val: '98%' },
      ],
      path: 'M30 35 C 70 38, 90 40, 120 45 C 160 50, 180 65, 210 70 C 245 75, 270 60, 300 55 C 330 48, 350 32, 370 28',
      thresholdLabel: 'Seuil alerte pH/Temp',
      annotation: { label: 'Régulation pH bioréacteur', x: 210, y: 70, boxX: 145, boxWidth: 130 },
    },

    supplyChain: {
      steps: [
        { icon: Network, title: 'Fournisseur API', id: 'Lot-API-992' },
        { icon: Cpu, title: 'Mélange / Granul.', id: 'Lot-MEL-04' },
        { icon: ShieldCheck, title: 'Conditionn. Sérial.', id: 'Lot-PACK-88' },
      ],
      noteLabel: 'Traçabilité complète :',
      noteText:
        'Généalogie lot à lot ascendante et descendante instantanée pour répondre aux exigences réglementaires de rappel.',
    },

    launchTimeline: [
      { name: 'Transfert Recette R&D', before: 85, after: 40 },
      { name: 'Validation Pilote', before: 75, after: 45 },
      { name: 'Essais Industriels', before: 90, after: 50 },
      { name: 'Dossier Enregistrement', before: 70, after: 30 },
    ],

    dashboard: {
      tiles: [
        { label: 'Taux Libération Directe', value: '98.5%', trend: '+4.2%', good: true },
        { label: 'Déviations Ouvertes', value: '1', trend: '-8', good: true },
        { label: 'Alertes Température', value: '0', trend: '0', good: true },
        { label: 'Revue de Dossier Lot', value: '4h', trend: '-80%', good: true },
      ],
      auditLabel: 'Rapport de Piste d’Audit (Audit Trail) :',
      auditText:
        'Système verrouillé, double signature électronique validée et horodatée sur la blockchain industrielle.',
    },

    energyChart: {
      baselinePath: 'M30,30 L110,25 L190,35 L270,30 L350,28',
      optimisedPath: 'M30,30 L110,48 L190,65 L270,80 L350,90',
      markers: [
        { x: 110, y: 48 },
        { x: 190, y: 65 },
        { x: 270, y: 80 },
        { x: 350, y: 90 },
      ],
      baselineLabel: 'Base',
      deltaLabel: '-30%',
      deltaY: 94,
      xLabels: ['T0', 'Mois 1', 'Mois 3', 'Mois 6', 'Mois 12'],
    },
  },
}
