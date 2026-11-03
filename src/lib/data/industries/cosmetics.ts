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

/**
 * Cosmétique & dispositifs médicaux : dernière page migrée de son fichier
 * dédié (app/[locale]/industries/cosmetics) vers le gabarit commun. Textes,
 * chiffres et visuels repris tels quels ; seuls les trois chiffres du hero
 * (40 %, 90 %, 30 %, sans source) deviennent les trois points cochés des
 * autres pages.
 */
export const cosmetics: IndustryPageData = {
  slug: 'cosmetics',
  metaTitle: 'Logiciel qualité cosmétique et dispositifs médicaux',
  metaDescription:
    'ISO 22716, ISO 13485, salle blanche, traçabilité UDI et contrôles qualité : CIPA digitalise la production cosmétique et des dispositifs médicaux. Voir la démo.',

  headline: 'cosmétique & des dispositifs médicaux',
  intro:
    'La fabrication de dispositifs médicaux et de cosmétiques exige une rigueur opérationnelle et une traçabilité totale. CIPA fournit une plateforme digitale complète pour standardiser vos opérations en salle blanche stérile.',
  hero: {
    src: '/Secteur/cosmetique_hero_visual.png',
    alt: 'Plateforme CIPA en salle blanche cosmétique : tableau de bord qualité, conformité et assistance IA',
    width: 1058,
    height: 715,
  },
  heroIcon: ShieldCheck,
  indicators: ['Efficacité opérationnelle', 'Préparation constante aux audits', 'Baisse du taux de rebuts en ligne'],

  overview:
    "Des composants bruts de seringues ou d'implants au scellage final stérile, CIPA aide les fabricants à garantir la conformité ISO et FDA, à accélérer la libération et à piloter l'efficacité.",
  useCasesTitle: 'opérations de cosmétiques & dispositifs médicaux',

  coreAccentLabel: 'Opérations Cosmétiques & DM',
  coreSlides: [
    {
      num: '01',
      tag: 'Conformité ISO & FDA',
      title: 'Renforcer la conformité réglementaire ISO 13485 & 22716',
      desc: "Garantissez le respect des normes strictes de l'ISO 13485 (dispositifs médicaux) et de l'ISO 22716 (BPF cosmétiques). Suivez les exigences FDA (21 CFR Part 820) grâce à la centralisation et à la traçabilité des données d'exécution.",
      before: [
        'Préparation manuelle complexe pour les audits ISO/FDA',
        'Risque élevé d’omissions documentaires papier',
        'Suivi des non-conformités et CAPA déconnecté',
        'Piste d’audit difficile à reconstituer en direct',
      ],
      after: [
        'Préparation instantanée aux audits ISO et FDA',
        'Piste d’audit numérique complète et inaltérable',
        'Gestion automatisée des écarts et plans CAPA',
        'Documentation conforme aux standards de classe médicale',
      ],
      kpis: [
        { value: '90%', label: "d'état de préparation aux audits" },
        { value: '40%', label: 'de réduction du temps de préparation' },
      ],
      visual: 'compliance-flow',
      visualCaption: 'Workflow de conformité réglementaire : validation des requis ISO 13485 et ISO 22716 sur CIPA.',
    },
    {
      num: '02',
      tag: 'Digitalisation Salle Blanche',
      title: 'Efficacité renforcée par la digitalisation du shop-floor',
      desc: "Digitalisez vos instructions de travail et checklists d'auto-contrôle. Guidez pas à pas vos opérateurs en salle blanche stérile pour l'assemblage de dispositifs de précision ou le dosage cosmétique.",
      before: [
        'Dossiers de lot papier encombrants en zone stérile',
        'Saisie manuelle lente et sujette aux erreurs de dosage',
        'Absence de détrompeurs lors du scan des composants',
        'Temps d’arrêt opérateurs dus aux revues papier',
      ],
      after: [
        'Instructions guidées sur tablettes en salle blanche',
        'Scan et contrôle des composants stérile en temps réel',
        'Vérifications de nettoyage de cuves enregistrées',
        'Productivité accrue et cycle de libération accéléré',
      ],
      kpis: [
        { value: '40%', label: "d'augmentation de l'efficacité opérationnelle" },
        { value: '30%', label: 'de réduction du cycle de libération des lots' },
      ],
      visual: 'tablet',
      visualCaption: 'Interface opérateur CIPA : checklist d’assemblage stérile guidée sur tablette industrielle.',
    },
    {
      num: '03',
      tag: 'IA & Maintenance',
      title: 'Analyses avancées et IA pour l’amélioration continue',
      desc: "Surveillez les dérives physiques de vos mélangeurs cosmétiques sous vide ou de vos lignes d'extrusion médicale par IA pour anticiper les pannes et prévenir les micro-arrêts.",
      before: [
        'Dérive de pression ou de vitesse d’extrusion non détectée',
        'Micro-arrêts fréquents non documentés sur les lignes',
        'Maintenance réactive causant des retards de livraison',
        'Gaspillage élevé de matières premières nobles',
      ],
      after: [
        'Suivi prédictif IA des paramètres d’extrusion et mélange',
        'Alerte immédiate en cas de vibration ou surchauffe',
        'Maintenance planifiée aux moments opportuns',
        'Stabilité du process et rendement optimisés',
      ],
      kpis: [
        { value: '60%', label: 'de réduction des arrêts de ligne imprévus' },
        { value: '15%', label: 'd’augmentation du rendement de production' },
      ],
      visual: 'predictive-chart',
      visualCaption: 'Suivi prédictif d’extrudeuse : alerte IA sur pression de filière avant anomalie.',
    },
    {
      num: '04',
      tag: 'Traçabilité & UDI',
      title: 'Améliorer la transparence de la supply chain et de la traçabilité',
      desc: "Conservez une traçabilité totale lot par lot depuis la matière première polymère ou cosmétique brute jusqu'à l'étiquetage sérialisé UDI (Unique Device Identifier).",
      before: [
        'Traçabilité généalogique fragmentée et manuelle',
        'Reconstitution longue de la généalogie des pièces',
        'Risques d’erreurs lors de l’étiquetage UDI médical',
        'Traitement lent des rappels de lots de dispositifs',
      ],
      after: [
        'Généalogie de lot ascendante et descendante instantanée',
        'Contrôle automatique et scan de l’identifiant UDI',
        'Traçabilité fournisseur de matières premières fiable',
        'Gestion rapide et ciblée d’un rappel produit',
      ],
      kpis: [
        { value: '30%', label: 'de réduction des délais de livraison' },
        { value: '20%', label: 'de baisse des coûts de stockage' },
      ],
      visual: 'supply-chain',
      visualCaption: 'Généalogie de lot UDI : traçabilité continue de la matière brute au dispositif emballé.',
    },
  ],

  performanceAccentLabel: 'Performance durable',
  performanceTitle: 'qualité produit, l’innovation et la performance durable',
  performanceSlides: [
    {
      num: '01',
      tag: 'Innovation & NPI',
      title: 'Accélérer l’innovation et l’optimisation du transfert R&D',
      desc: 'Facilitez le transfert industriel de vos formules cosmétiques ou de vos designs de dispositifs médicaux vers les lignes de production de masse en centralisant vos recettes.',
      before: [
        'Transfert de recette R&D vers méthodes sur papier',
        'Difficulté à documenter la mise à l’échelle (scale-up)',
        'Lancement de nouveaux produits (NPI) long et rigide',
        'Erreurs d’adaptation des formulations en production',
      ],
      after: [
        'Référentiel centralisé de recettes digitales standard',
        'Collaboration en direct entre R&D, qualité et méthodes',
        'Processus de mise à l’échelle documenté pas à pas',
        'Time-to-market drastiquement raccourci',
      ],
      kpis: [
        { value: '50%', label: 'de réduction du time-to-market des lancements' },
        { value: '2x', label: 'plus de formulations testées et industrialisées par an' },
      ],
      visual: 'launch-timeline',
      visualCaption: 'Timeline NPI : cycle de transfert accéléré entre conception R&D et production.',
    },
    {
      num: '02',
      tag: 'Qualité & Fiabilité',
      title: 'Assurer la qualité produit et la fiabilité',
      desc: "Garantissez un produit final zéro défaut grâce aux inspections visuelles en ligne et à la saisie automatisée des contrôles d'étanchéité, protégeant vos clients et la marque.",
      before: [
        'Inspections qualité manuelles subjectives',
        'Découverte tardive de défauts de scellage ou d’étiquette',
        'Coûts de reprise et de rebuts de dispositifs élevés',
        'Difficulté à consolider les rapports de non-conformités',
      ],
      after: [
        'Inspections visuelles automatisées en cours de process',
        'Détection immédiate des défauts d’étanchéité flacons',
        'Rebuts réduits à la source par des alertes directes',
        'Tableaux de bord qualité consolidés instantanément',
      ],
      kpis: [
        { value: '70%', label: 'de réduction du taux de défauts en ligne' },
        { value: '30%', label: 'de diminution du coût de la qualité' },
      ],
      visual: 'dashboard',
      visualCaption: 'Dashboard qualité CIPA : Pareto des causes de rebus et taux de conformité en direct.',
    },
    {
      num: '03',
      tag: 'Durabilité',
      title: 'Durabilité et réduction de l’impact environnemental',
      desc: "Suivez et optimisez l'utilisation des ressources, notamment de l'eau purifiée et de l'énergie, tout en minimisant la production de déchets matières dans vos ateliers de conditionnement.",
      before: [
        'Gaspillage élevé d’eau purifiée lors des nettoyages (CIP)',
        'Absence de mesure continue des consommations de fluides',
        'Quantités de déchets de découpe/emballage mal évaluées',
        'Coûts environnementaux de production élevés',
      ],
      after: [
        'Optimisation des cycles de nettoyage et d’eau purifiée',
        'Visualisation en temps réel de la consommation énergétique',
        'Réduction significative de la production de déchets',
        'Pratiques d’usine verte conformes aux chartes RSE',
      ],
      kpis: [
        { value: '-30%', label: 'de réduction constatée de la production de déchets' },
        { value: '-15%', label: 'de réduction de la consommation d’électricité' },
      ],
      visual: 'energy-chart',
      visualCaption: 'Suivi de durabilité CIPA : profil d’économie d’eau purifiée et d’électricité sur un an.',
    },
  ],

  platform: {
    title: 'Une plateforme unique pour la qualité, la traçabilité et la conformité ISO.',
    desc: 'CIPA unifie les personnes, les processus et les données pour fournir des insights connectés sur toute la chaîne de valeur — conformité ISO 13485 et ISO 22716 BPF, eBR de salle blanche stérile, sérialisation UDI et audits automatisés.',
    features: [
      { icon: Database, label: 'Données connectées' },
      { icon: Eye, label: 'Visibilité atelier' },
      { icon: Truck, label: 'Visibilité fournisseurs' },
      { icon: ShieldCheck, label: 'Assurance conformité ISO' },
    ],
  },

  steps: [
    { icon: Network, title: '1. Connecter', desc: 'Unifiez les données des équipements et opérateurs en salle blanche.' },
    { icon: FlaskConical, title: '2. Analyser', desc: "L'IA et les analyses prédisent les dérives et identifient les rebuts." },
    { icon: Rocket, title: '3. Agir', desc: 'Automatisez les workflows qualité et pilotez les écarts.' },
    { icon: TrendingUp, title: '4. Améliorer', desc: 'Surveillez, mesurez et optimisez les temps de cycle.' },
    { icon: Leaf, title: '5. Impact', desc: 'Des résultats mesurables en libération de lot, conformité et énergie.' },
  ],

  cta: {
    title: 'Prêt à digitaliser vos opérations cosmétiques & DM ?',
    text: 'Rejoignez les leaders industriels qui utilisent CIPA pour assurer leur conformité, maximiser la traçabilité et optimiser le TRS. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles.',
  },

  visuals: {
    complianceFlow: [
      { n: 1, title: 'Validation Dossier DMR', sub: 'Plan de contrôle ISO 13485 validé', state: 'done' },
      { n: 2, title: 'Inspection Ligne Cleanroom', sub: 'Validation étanchéité sachet stérile en cours', state: 'active' },
      { n: 3, title: 'Double Signature & Libération', sub: 'Rapport de libération de lot généré', state: 'todo' },
    ],

    tablet: {
      orderLabel: 'Ordre de Fabrication',
      orderId: 'OF-2026-COSM-L1-089',
      instructionsLabel: "Instructions d'Assemblage",
      instructions: [
        'Vérifier le nettoyage de la cuve / trémie',
        'Scanner le code UDI du composant stérile',
        "Lancer le cycle d'assemblage / remplissage",
      ],
      progressLabel: 'Mélange',
      progress: 78,
      ctaLabel: "Confirmer l'étape de production",
    },

    predictiveChart: {
      points: [
        { x: 30, y: 35, val: '97%' },
        { x: 120, y: 40, val: '94%' },
        { x: 210, y: 70, val: '86%' },
        { x: 300, y: 55, val: '90%' },
        { x: 370, y: 28, val: '98%' },
      ],
      path: 'M30 35 C 70 38, 90 40, 120 40 C 160 48, 180 65, 210 70 C 245 75, 270 60, 300 55 C 330 48, 350 32, 370 28',
      thresholdLabel: 'Seuil alerte pression filière',
      annotation: { label: 'Régulation de pression filière', x: 210, y: 70, boxX: 150, boxWidth: 120 },
    },

    supplyChain: {
      steps: [
        { icon: Truck, title: 'Poly / Actif', id: 'Lot-RAW-402' },
        { icon: Cpu, title: 'Mélange / Extrus.', id: 'Lot-EXT-11' },
        { icon: ShieldCheck, title: 'Étiquette UDI', id: 'Lot-UDI-55' },
      ],
      noteLabel: 'Généalogie UDI :',
      noteText:
        'Traçabilité complète à travers toutes les étapes de mélange et de découpe, simplifiant la réponse en cas de rappel produit.',
    },

    launchTimeline: [
      { name: 'Tests Compatibilité', before: 80, after: 35 },
      { name: 'Prototype Moules', before: 90, after: 45 },
      { name: 'Dossier Conception', before: 70, after: 30 },
      { name: 'Série de Validation', before: 85, after: 50 },
    ],

    dashboard: {
      tiles: [
        { label: 'Taux Rebuts Ligne', value: '0.4%', trend: '-70%', good: true },
        { label: 'Déviations Ouvertes', value: '2', trend: '-5', good: true },
        { label: 'Efficacité Nettoyage', value: '99.8%', trend: '+1.5%', good: true },
        { label: 'Coût Qualité', value: '-30%', trend: 'Global', good: true },
      ],
      auditLabel: 'Contrôles Vision AOI :',
      auditText:
        "Inspections en ligne automatiques activées, détection instantanée des défauts d'étiquetage ou de scellage.",
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
