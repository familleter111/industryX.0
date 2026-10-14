import {
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  Camera,
  ClipboardCheck,
  Factory,
  FileBarChart,
  FileDown,
  GitBranch,
  History,
  LayoutDashboard,
  LayoutTemplate,
  ListChecks,
  MapPin,
  MessageSquareWarning,
  PenLine,
  Plug,
  SearchCheck,
  TrendingUp,
  WifiOff,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import type { Locale } from '@/i18n/routing'

/**
 * Les trois pages Plateforme, alignees sur les piliers de l'accueil
 * (Structurer / Orchestrer / Piloter, voir CipaSection).
 *
 * Elles remplacent les douze entrees de l'ancien menu, dont beaucoup
 * disaient la meme chose. Il n'y a pas de page « Vue d'ensemble » : l'accueil
 * joue deja ce role.
 *
 * Chaque section porte un `id` stable : c'est l'ancre visee par le menu et
 * par les six cartes de fonctionnalites de l'accueil (lib/data/features.ts).
 * Renommer un `id` casse ces liens — passer par `platformHref`.
 *
 * Le texte suit les modules montres dans la video de demonstration de
 * l'application web CIPA (tableaux de bord, audits et planificateur, produits,
 * change control, deviations / actions / reclamations, workflows,
 * organisation, audit trail, preferences), completes de ce que le site
 * affirme deja ailleurs (IA, integrations, section architecture). Pas de
 * promesse nouvelle qu'il faudrait pouvoir prouver.
 */

export type PlatformSection = {
  id: string
  icon: LucideIcon
  title: string
  lead: string
  /** Situation sans CIPA : colonne « Avant CIPA » du carrousel. */
  before: string[]
  /** Apports de CIPA : colonne « Avec CIPA » et etapes de l'apercu. */
  points: string[]
}

/** Une etape de « Operationnel en trois etapes », ou un element inclus. */
export type PlatformItem = {
  icon: LucideIcon
  title: string
  text: string
}

/**
 * Preuves affichees sous le hero. A ne renseigner qu'avec des resultats
 * reels et une citation client validee : sans `proof`, la bande n'apparait
 * pas.
 */
export type PlatformProof = {
  stats: { value: string; label: string }[]
  quote?: { text: string; author: string }
}

export type PlatformPageData = {
  slug: string
  /** Pilier de l'accueil auquel la page correspond. */
  pillar: 'Structurer' | 'Orchestrer' | 'Piloter'
  /** Libelle court : menu, cartes croisees. */
  name: string
  /** Sous-titre court des cartes croisees. */
  summary: string
  /** Titre de l'entree dans le mega-menu Plateforme. */
  menuTitle: string
  /** Sous-titre de l'entree dans le mega-menu. */
  menuDescription: string
  icon: LucideIcon
  title: string
  /** Fin du titre, rendue en dore. */
  accent: string
  description: string
  metaTitle: string
  metaDescription: string
  /** Visuel du hero (public/), 3200 × 2000, fond creme. */
  image: { src: string; alt: string }
  /** Trois reperes courts sous les boutons du hero. */
  highlights: [string, string, string]
  /** En-tete de la section des usages. */
  usesIntro: { eyebrow: string; title: string; lead: string }
  sections: PlatformSection[]
  /** « Operationnel en trois etapes ». Absent : section non affichee. */
  steps?: PlatformItem[]
  /** « Inclus dans chaque usage ». Absent : section non affichee. */
  included?: PlatformItem[]
  proof?: PlatformProof
  /**
   * Ajoute en fin de page le schema « Architecture & securite » (flux de la
   * donnee, stack, securite). Seule la page Pilotage l'affiche.
   */
  architecture?: boolean
}

export const PLATFORM_PAGES: PlatformPageData[] = [
  {
    slug: 'terrain',
    pillar: 'Structurer',
    name: 'Terrain',
    summary: 'Audits, planification, produits & maintenance',
    menuTitle: 'Digitalisation des audits terrain',
    menuDescription: 'Audits, tournées, planning, produits et maintenance',
    icon: ClipboardCheck,
    title: 'Structurer',
    accent: 'la donnée terrain',
    description:
      'Audits internes, tournées qualité, checklists, suivi de production et contrôles de maintenance : CIPA capte la donnée sur mobile, au poste, et la range dans un référentiel unique organisé par zone, équipe et équipement.',
    metaTitle: 'Terrain : audits, planification, produits & maintenance — CIPA',
    metaDescription:
      'Digitalisez audits internes, tournées qualité, planification des audits, checklists, suivi de production par étape et contrôles de maintenance avec CIPA.',
    image: {
      src: '/cipa-1-digitalisation-audits-terrain.png',
      alt: 'Écrans CIPA d’audit interne sur mobile, de tournée de sécurité et de traçabilité horodatée',
    },
    highlights: ['Saisie mobile', 'Audits planifiés', 'Traçabilité complète'],
    usesIntro: {
      eyebrow: 'Usages terrain',
      title: 'Cinq usages, un seul référentiel',
      lead:
        'Audits, planning, checklists, production et maintenance partagent la même application, les mêmes zones, les mêmes équipes et la même traçabilité.',
    },
    sections: [
      {
        id: 'audits',
        icon: ClipboardCheck,
        title: 'Audits & tournées qualité',
        lead:
          'Audits LPA, BPF ou 5S et tournées qualité s’exécutent sur la même grille pour tous les auditeurs. Chaque audit reçoit un score, rattaché à sa zone et à son auditeur.',
        before: [
          'Grilles Excel ou papier différentes selon l’auditeur',
          'Ressaisie des constats après l’audit',
          'Aucun score comparable d’un audit à l’autre',
          'Constats oubliés d’un audit à l’autre',
        ],
        points: [
          'Audits et tournées qualité au même endroit',
          'Score calculé à la fin de chaque audit',
          'KPI PRP, sécurité et environnement',
          'Chaque constat devient une action suivie',
        ],
      },
      {
        id: 'planification',
        icon: CalendarDays,
        title: 'Planification des audits',
        lead:
          'Le planificateur d’audits affiche le programme au mois, à la semaine ou en liste. Les responsables créent les plans d’audit et les partagent en PDF.',
        before: [
          'Programme d’audit tenu sur un tableur',
          'Audits oubliés ou réalisés en retard',
          'Aucune vue sur la charge des auditeurs',
          'Planning renvoyé par e-mail à chaque modification',
        ],
        points: [
          'Calendrier mois, semaine et liste',
          'Plans d’audit assignés aux auditeurs',
          'Suivi des audits créés, démarrés et terminés',
          'Export du planning en PDF',
        ],
      },
      {
        id: 'inspections',
        icon: SearchCheck,
        title: 'Inspections, checklists & formulaires',
        lead:
          'Vous construisez vos checklists et formulaires une fois, avec leurs critères et leurs seuils. Ils servent ensuite à toutes les inspections, sur mobile comme sur le web.',
        before: [
          'Critères interprétés différemment selon les équipes',
          'Formulaires papier à recopier',
          'Photos dispersées sur des téléphones personnels',
          'Écarts découverts trop tard',
        ],
        points: [
          'Bibliothèque de checklists et de formulaires',
          'Critères et seuils intégrés à chaque point',
          'Photos et mesures liées au point contrôlé',
          'Écart déclaré directement depuis l’inspection',
        ],
      },
      {
        id: 'production',
        icon: Factory,
        title: 'Suivi produit & contrôles de production',
        lead:
          'Chaque produit suit son procédé, étape par étape : pesée, mélange, granulation, compression, pelliculage, conditionnement. La production et les non-conformités s’affichent pour chaque étape.',
        before: [
          'Dossiers de lot papier à compléter puis relire',
          'Erreurs de recopie et champs manquants',
          'Étape à l’origine des défauts difficile à identifier',
          'Données de production inexploitables',
        ],
        points: [
          'Référentiel produits et procédés',
          'Production suivie par étape',
          'Non-conformités rattachées à l’étape',
          'Écarts liés au lot et au produit',
        ],
      },
      {
        id: 'tournees',
        icon: Wrench,
        title: 'Maintenance & équipements',
        lead:
          'Les contrôles de maintenance, le suivi des équipements et le planning des équipes s’appuient sur les mêmes zones et le même historique.',
        before: [
          'Rondes planifiées sur un tableur',
          'Exécution variable selon l’équipe',
          'Interventions non tracées',
          'Aucune vue sur l’état des équipements',
        ],
        points: [
          'Contrôles de maintenance avec score',
          'Suivi des équipements par zone',
          'Planning de travail des équipes',
          'Historique des contrôles et interventions',
        ],
      },
    ],
    steps: [
      {
        icon: ListChecks,
        title: 'Créez vos checklists',
        text: 'À partir d’un modèle, de vos procédures existantes ou générées par l’IA de CIPA.',
      },
      {
        icon: CalendarDays,
        title: 'Planifiez et réalisez',
        text: 'Les audits sont programmés dans le planificateur puis saisis sur mobile ou tablette, avec photos et mesures.',
      },
      {
        icon: BarChart3,
        title: 'Exploitez les données',
        text: 'Scores, tableaux de bord et écarts transmis directement au traitement qualité.',
      },
    ],
    // A verifier avant publication : ne garder que ce que CIPA propose
    // reellement (voir le visuel du hero, qui montre deja hors ligne,
    // signature, photo geolocalisee et horodatage).
    included: [
      { icon: WifiOff, title: 'Mode hors ligne', text: 'Synchronisation automatique au retour du réseau.' },
      { icon: PenLine, title: 'Signature électronique', text: 'Validation de l’auditeur et du responsable.' },
      { icon: LayoutTemplate, title: 'Modèles personnalisables', text: 'Vos grilles, vos critères, vos seuils.' },
      { icon: Camera, title: 'Photos jointes', text: 'Preuves rattachées au point contrôlé.' },
      { icon: MapPin, title: 'Zones & horodatage', text: 'Qui, quoi, où et quand, pour chaque réponse.' },
      { icon: FileDown, title: 'Exports PDF', text: 'Rapports et plannings à diffuser ou archiver.' },
    ],
  },
  {
    slug: 'qualite',
    pillar: 'Orchestrer',
    name: 'Qualité',
    summary: 'Déviations, CAPA, réclamations & workflows',
    menuTitle: 'Gestion des écarts et de la qualité',
    menuDescription: 'Déviations, CAPA, réclamations et change control',
    icon: GitBranch,
    title: 'Orchestrer',
    accent: 'les processus qualité',
    description:
      'Déviations, actions correctives, réclamations, maîtrise des changements et workflows de validation : CIPA orchestre le traitement des écarts jusqu’à la clôture, puis en fait des gains durables.',
    metaTitle: 'Qualité : déviations, CAPA, réclamations & workflows — CIPA',
    metaDescription:
      'Gérez déviations, non-conformités, CAPA, réclamations, change control et workflows de validation jusqu’à la clôture, puis pilotez l’amélioration continue avec CIPA.',
    image: {
      src: '/cipa-2-gestion-ecarts-qualite.png',
      alt: 'Écrans CIPA d’un workflow de non-conformité, du signalement au plan CAPA',
    },
    highlights: ['Écarts classifiés', 'CAPA suivies', 'Workflows versionnés'],
    usesIntro: {
      eyebrow: 'Usages qualité',
      title: 'Un seul flux, de l’écart à la clôture',
      lead:
        'Déviations, actions, réclamations, changements et validations s’enchaînent dans le même outil, sans ressaisie ni perte d’information.',
    },
    sections: [
      {
        id: 'deviations',
        icon: Bell,
        title: 'Déviations & non-conformités',
        lead:
          'Chaque écart reçoit une référence et garde son origine : audit, contrôle de production ou événement terrain. Il est rattaché à une zone et à un problème du référentiel.',
        before: [
          'Écarts signalés oralement ou par e-mail',
          'Origine de l’écart perdue en route',
          'Causes décrites différemment à chaque fois',
          'Aucune vue consolidée des écarts ouverts',
        ],
        points: [
          'Référence unique par déviation',
          'Origine tracée : audit, production, événement',
          'Zone et catégorie de problème',
          'Statut suivi : créée, en cours, clôturée',
        ],
      },
      {
        id: 'capa',
        icon: ClipboardCheck,
        title: 'Gestion des actions & CAPA',
        lead:
          'Chaque action a un pilote, une échéance et un taux de réalisation. Elle passe par la validation avant d’être close, et le classement des pilotes montre où les actions s’accumulent.',
        before: [
          'Actions suivies dans un tableur partagé',
          'Causes racines rarement documentées',
          'Échéances dépassées sans alerte',
          'Efficacité des actions jamais vérifiée',
        ],
        points: [
          'Pilote, échéance et taux de réalisation',
          'Statuts : créée, en cours, terminée, validée, refusée',
          'Action liée à sa déviation d’origine',
          'Classement des pilotes d’actions',
        ],
      },
      {
        id: 'reclamations',
        icon: MessageSquareWarning,
        title: 'Réclamations & maîtrise des changements',
        lead:
          'Les réclamations clients et les demandes de changement suivent le même circuit que les écarts : enregistrées, évaluées, validées et tracées.',
        before: [
          'Réclamations reçues par e-mail, sans suivi',
          'Changements décidés hors de tout circuit',
          'Impact des changements rarement évalué',
          'Aucune trace de qui a approuvé quoi',
        ],
        points: [
          'Registre des réclamations',
          'Demandes de changement (change control)',
          'Évaluation et approbation tracées',
          'Actions déclenchées depuis la demande',
        ],
      },
      {
        id: 'workflows',
        icon: Workflow,
        title: 'Workflows & validations',
        lead:
          'Vous modélisez vos processus, par exemple un procédé de production pharmaceutique conforme BPF. CIPA les exécute tels que définis et garde l’historique de chaque version.',
        before: [
          'Validations par e-mail ou signatures papier',
          'Circuits différents selon les services',
          'Dossiers bloqués sans savoir où',
          'Traçabilité incomplète le jour de l’audit',
        ],
        points: [
          'Workflows par processus',
          'Historique des versions',
          'Validation multi-niveaux',
          'Droits par rôle',
        ],
      },
      {
        id: 'amelioration',
        icon: TrendingUp,
        title: 'Amélioration continue',
        lead:
          'Les problèmes sont classés en catégories, sous-catégories et causes. Le Pareto fait ressortir les quelques problèmes qui concentrent la majorité des écarts.',
        before: [
          'Écarts récurrents noyés dans les fichiers',
          'Chaque équipe décrit les problèmes à sa façon',
          'Plans d’actions sans priorité claire',
          'Progrès difficiles à mesurer',
        ],
        points: [
          'Référentiel catégorie, sous-catégorie, problème',
          'Pareto par problème',
          'Plans d’actions priorisés',
          'Suivi des progrès',
        ],
      },
    ],
  },
  {
    slug: 'pilotage',
    pillar: 'Piloter',
    name: 'Pilotage',
    summary: 'Tableaux de bord, traçabilité & IA',
    menuTitle: 'Pilotage de la performance et IA',
    menuDescription: 'Tableaux de bord, rapports, audit trail et IA',
    icon: LayoutDashboard,
    title: 'Piloter',
    accent: 'la performance',
    description:
      'Indicateurs en temps réel sur les audits, les tournées, les déviations et les actions, rapports envoyés automatiquement, journal d’audit complet et une IA qui prépare les checklists. CIPA se connecte à votre ERP, votre BI et votre MES.',
    metaTitle: 'Pilotage : tableaux de bord, audit trail & IA — CIPA',
    metaDescription:
      'Tableaux de bord et KPI en temps réel, rapports automatiques, audit trail, gestion des utilisateurs, IA opérationnelle et intégrations ERP, BI et MES : pilotez vos opérations avec CIPA.',
    architecture: true,
    image: {
      src: '/cipa-3-pilotage-performance-ia.png',
      alt: 'Tableau de bord qualité CIPA avec indicateurs, signal faible détecté par l’IA et intégrations',
    },
    highlights: ['Temps réel', 'Audit trail', 'ERP · BI · MES'],
    usesIntro: {
      eyebrow: 'Usages pilotage',
      title: 'Des données terrain aux décisions',
      lead:
        'Indicateurs, rapports, traçabilité, IA et intégrations exploitent les mêmes données, saisies une seule fois sur le terrain.',
    },
    sections: [
      {
        id: 'tableaux-de-bord',
        icon: LayoutDashboard,
        title: 'Tableaux de bord & KPI',
        lead:
          'Audits, tournées qualité, déviations et actions ont chacun leur tableau de bord : volume, mois de pointe, scores moyen, maximum et minimum, vus à la semaine, au mois ou à l’année.',
        before: [
          'Indicateurs consolidés à la main dans Excel',
          'Chiffres disponibles avec plusieurs jours de retard',
          'Versions contradictoires selon les services',
          'Dérives repérées après coup',
        ],
        points: [
          'KPI audits, tournées, déviations et actions',
          'Vues hebdomadaire, mensuelle et annuelle',
          'Filtres par zone, équipe et période',
          'Classement des pilotes d’actions',
        ],
      },
      {
        id: 'rapports',
        icon: FileBarChart,
        title: 'Rapports automatiques',
        lead:
          'Rapports d’audit, plannings et synthèses se génèrent à partir des données déjà saisies. Le rapport général part par e-mail au rythme choisi par chaque utilisateur.',
        before: [
          'Rapports montés par copier-coller',
          'Des heures pour préparer chaque revue',
          'Mise en forme différente selon l’auteur',
          'Exports réglementaires préparés dans l’urgence',
        ],
        points: [
          'Rapports d’audit en PDF',
          'Rapport général envoyé par e-mail',
          'Fréquence d’envoi au choix (revue mensuelle…)',
          'Exports réglementaires',
        ],
      },
      {
        id: 'tracabilite',
        icon: History,
        title: 'Audit trail & organisation',
        lead:
          'Chaque action est journalisée : qui, quoi, sur quelle page, quand, depuis le web ou le mobile. Utilisateurs, rôles, zones et référentiels se gèrent au même endroit.',
        before: [
          'Aucune trace des modifications',
          'Droits d’accès gérés au cas par cas',
          'Zones et équipes décrites différemment selon les outils',
          'Preuves reconstituées la veille d’une inspection',
        ],
        points: [
          'Journal horodaté de chaque action',
          'Sessions web et mobile tracées',
          'Utilisateurs et rôles : auditeur, organisateur…',
          'Zones, équipements et plannings centralisés',
        ],
      },
      {
        id: 'ia',
        icon: BrainCircuit,
        title: 'Intelligence opérationnelle',
        lead:
          'L’IA génère les checklists à partir de vos procédures et repère les écarts et signaux faibles avant qu’ils ne deviennent des incidents.',
        before: [
          'Checklists rédigées et mises à jour à la main',
          'Signaux faibles noyés dans les données',
          'Incohérences repérées trop tard',
          'Analyses réservées à quelques experts',
        ],
        points: [
          'Checklists générées par l’IA',
          'Détection des écarts',
          'Contrôles de cohérence',
          'Signaux faibles remontés',
        ],
      },
      {
        id: 'integrations',
        icon: Plug,
        title: 'Intégrations industrielles',
        lead:
          'CIPA se connecte à votre écosystème existant pour éviter les doubles saisies et conserver une source de vérité unique. Les échanges sont définis pendant le cadrage.',
        before: [
          'Doubles saisies entre les outils',
          'Données qualité isolées du reste du SI',
          'Exports manuels vers la BI',
          'Plusieurs sources de vérité',
        ],
        points: [
          'ERP',
          'MES et GMAO',
          'Outils de BI',
          'API et connecteurs dédiés',
        ],
      },
    ],
  },
]

/* ============================================================
   VERSION ANGLAISE

   Seuls les textes changent : slugs, ancres, icônes et visuels viennent de
   la version française. `PageText` liste exactement ce qui se traduit, et
   chaque usage est retrouvé par son `id` — une section ajoutée en français
   sans sa traduction fait échouer la compilation.
   ============================================================ */

type SectionText = Pick<PlatformSection, 'title' | 'lead' | 'before' | 'points'>
type ItemText = Pick<PlatformItem, 'title' | 'text'>

type PageText = Pick<
  PlatformPageData,
  | 'name'
  | 'summary'
  | 'menuTitle'
  | 'menuDescription'
  | 'title'
  | 'accent'
  | 'description'
  | 'metaTitle'
  | 'metaDescription'
  | 'highlights'
  | 'usesIntro'
> & {
  imageAlt: string
  sections: Record<string, SectionText>
  steps?: ItemText[]
  included?: ItemText[]
}

const EN: Record<string, PageText> = {
  terrain: {
    name: 'Shop floor',
    summary: 'Audits, planning, products & maintenance',
    menuTitle: 'Digital shop-floor audits',
    menuDescription: 'Audits, tours, planning, products and maintenance',
    title: 'Structure',
    accent: 'shop-floor data',
    description:
      'Internal audits, quality tours, checklists, production tracking and maintenance checks: CIPA captures data on mobile, at the workstation, and files it in a single repository organized by area, team and equipment.',
    metaTitle: 'Shop floor: audits, planning, products & maintenance — CIPA',
    metaDescription:
      'Digitize internal audits, quality tours, audit planning, checklists, step-by-step production tracking and maintenance checks with CIPA.',
    imageAlt: 'CIPA screens for a mobile internal audit, a safety tour and time-stamped traceability',
    highlights: ['Mobile capture', 'Planned audits', 'Full traceability'],
    usesIntro: {
      eyebrow: 'Shop-floor use cases',
      title: 'Five use cases, one repository',
      lead:
        'Audits, planning, checklists, production and maintenance share the same app, the same areas, the same teams and the same traceability.',
    },
    sections: {
      audits: {
        title: 'Audits & quality tours',
        lead:
          'LPA, GMP or 5S audits and quality tours all run on the same grid for every auditor. Each audit gets a score, linked to its area and its auditor.',
        before: [
          'Excel or paper grids that differ from one auditor to the next',
          'Findings retyped after the audit',
          'No score you can compare between audits',
          'Findings forgotten from one audit to the next',
        ],
        points: [
          'Audits and quality tours in one place',
          'Score calculated at the end of each audit',
          'PRP, safety and environment KPIs',
          'Every finding becomes a tracked action',
        ],
      },
      planification: {
        title: 'Audit planning',
        lead:
          'The audit planner shows the programme by month, by week or as a list. Managers create audit plans and share them as PDF.',
        before: [
          'Audit programme kept in a spreadsheet',
          'Audits forgotten or carried out late',
          'No view of auditor workload',
          'Schedule emailed again after every change',
        ],
        points: [
          'Month, week and list calendar',
          'Audit plans assigned to auditors',
          'Tracking of created, started and finished audits',
          'Schedule exported as PDF',
        ],
      },
      inspections: {
        title: 'Inspections, checklists & forms',
        lead:
          'You build your checklists and forms once, with their criteria and thresholds. They then drive every inspection, on mobile and on the web.',
        before: [
          'Criteria read differently by each team',
          'Paper forms that have to be retyped',
          'Photos scattered across personal phones',
          'Deviations found too late',
        ],
        points: [
          'Library of checklists and forms',
          'Criteria and thresholds built into each item',
          'Photos and measurements linked to the item checked',
          'Deviation raised straight from the inspection',
        ],
      },
      production: {
        title: 'Product tracking & production checks',
        lead:
          'Each product follows its process step by step: weighing, blending, granulation, compression, coating, packaging. Output and non-conformities are shown for each step.',
        before: [
          'Paper batch records to fill in, then review',
          'Transcription errors and missing fields',
          'Hard to tell which step causes defects',
          'Production data you cannot use',
        ],
        points: [
          'Product and process master data',
          'Production tracked step by step',
          'Non-conformities linked to their step',
          'Deviations linked to batch and product',
        ],
      },
      tournees: {
        title: 'Maintenance & equipment',
        lead:
          'Maintenance checks, equipment monitoring and team schedules rely on the same areas and the same history.',
        before: [
          'Rounds planned in a spreadsheet',
          'Execution varies from team to team',
          'Interventions not recorded',
          'No view of equipment condition',
        ],
        points: [
          'Scored maintenance checks',
          'Equipment monitoring by area',
          'Team work schedule',
          'History of checks and interventions',
        ],
      },
    },
    steps: [
      {
        title: 'Create your checklists',
        text: 'From a template, from your existing procedures, or generated by CIPA’s AI.',
      },
      {
        title: 'Plan and run them',
        text: 'Audits are scheduled in the planner, then filled in on mobile or tablet, with photos and measurements.',
      },
      {
        title: 'Use the data',
        text: 'Scores, dashboards and deviations sent straight to quality handling.',
      },
    ],
    included: [
      { title: 'Offline mode', text: 'Automatic sync when the network comes back.' },
      { title: 'Electronic signature', text: 'Sign-off by the auditor and the manager.' },
      { title: 'Custom templates', text: 'Your grids, your criteria, your thresholds.' },
      { title: 'Attached photos', text: 'Evidence tied to the item checked.' },
      { title: 'Areas & time stamps', text: 'Who, what, where and when, for every answer.' },
      { title: 'PDF exports', text: 'Reports and schedules to share or archive.' },
    ],
  },
  qualite: {
    name: 'Quality',
    summary: 'Deviations, CAPA, complaints & workflows',
    menuTitle: 'Deviation and quality management',
    menuDescription: 'Deviations, CAPA, complaints and change control',
    title: 'Orchestrate',
    accent: 'quality processes',
    description:
      'Deviations, corrective actions, complaints, change control and approval workflows: CIPA drives deviation handling through to closure, then turns it into lasting gains.',
    metaTitle: 'Quality: deviations, CAPA, complaints & workflows — CIPA',
    metaDescription:
      'Manage deviations, non-conformities, CAPA, complaints, change control and approval workflows through to closure, then drive continuous improvement with CIPA.',
    imageAlt: 'CIPA screens of a non-conformity workflow, from report to CAPA plan',
    highlights: ['Classified deviations', 'Tracked CAPA', 'Versioned workflows'],
    usesIntro: {
      eyebrow: 'Quality use cases',
      title: 'One flow, from deviation to closure',
      lead:
        'Deviations, actions, complaints, changes and approvals follow on from each other in the same tool, with no retyping and nothing lost.',
    },
    sections: {
      deviations: {
        title: 'Deviations & non-conformities',
        lead:
          'Every deviation gets a reference and keeps its origin: audit, production check or shop-floor event. It is tied to an area and to a problem from the classification.',
        before: [
          'Deviations reported verbally or by email',
          'The origin of the deviation gets lost',
          'Causes described differently every time',
          'No consolidated view of open deviations',
        ],
        points: [
          'Unique reference for each deviation',
          'Origin traced: audit, production, event',
          'Area and problem category',
          'Status tracked: created, in progress, closed',
        ],
      },
      capa: {
        title: 'Action management & CAPA',
        lead:
          'Every action has an owner, a due date and a completion rate. It goes through approval before it is closed, and the owner ranking shows where actions pile up.',
        before: [
          'Actions tracked in a shared spreadsheet',
          'Root causes rarely documented',
          'Due dates missed without any alert',
          'Action effectiveness never checked',
        ],
        points: [
          'Owner, due date and completion rate',
          'Statuses: created, in progress, finished, approved, rejected',
          'Action linked to its originating deviation',
          'Action owner ranking',
        ],
      },
      reclamations: {
        title: 'Complaints & change control',
        lead:
          'Customer complaints and change requests follow the same path as deviations: recorded, assessed, approved and traced.',
        before: [
          'Complaints received by email, with no follow-up',
          'Changes decided outside any process',
          'Impact of changes rarely assessed',
          'No record of who approved what',
        ],
        points: [
          'Complaint register',
          'Change requests (change control)',
          'Traced assessment and approval',
          'Actions triggered from the request',
        ],
      },
      workflows: {
        title: 'Workflows & approvals',
        lead:
          'You model your processes, for example a GMP-compliant pharmaceutical production process. CIPA runs them as defined and keeps the history of every version.',
        before: [
          'Approvals by email or on paper',
          'Different circuits in each department',
          'Files stuck with no idea where',
          'Incomplete traceability on audit day',
        ],
        points: [
          'Workflows per process',
          'Version history',
          'Multi-level approval',
          'Role-based permissions',
        ],
      },
      amelioration: {
        title: 'Continuous improvement',
        lead:
          'Problems are classified into categories, subcategories and causes. The Pareto chart brings out the few problems behind most deviations.',
        before: [
          'Recurring deviations buried in files',
          'Each team describes problems its own way',
          'Action plans with no clear priority',
          'Progress that is hard to measure',
        ],
        points: [
          'Category, subcategory, problem classification',
          'Pareto by problem',
          'Prioritized action plans',
          'Progress tracking',
        ],
      },
    },
  },
  pilotage: {
    name: 'Performance',
    summary: 'Dashboards, traceability & AI',
    menuTitle: 'Performance management and AI',
    menuDescription: 'Dashboards, reports, audit trail and AI',
    title: 'Drive',
    accent: 'performance',
    description:
      'Real-time indicators on audits, tours, deviations and actions, reports sent automatically, a complete audit trail and an AI that prepares checklists. CIPA connects to your ERP, BI and MES.',
    metaTitle: 'Performance: dashboards, audit trail & AI — CIPA',
    metaDescription:
      'Real-time dashboards and KPIs, automatic reports, audit trail, user management, operational AI and ERP, BI and MES integrations: run your operations with CIPA.',
    imageAlt: 'CIPA quality dashboard with indicators, an AI-detected weak signal and integrations',
    highlights: ['Real time', 'Audit trail', 'ERP · BI · MES'],
    usesIntro: {
      eyebrow: 'Performance use cases',
      title: 'From shop-floor data to decisions',
      lead:
        'Indicators, reports, traceability, AI and integrations all use the same data, captured once on the shop floor.',
    },
    sections: {
      'tableaux-de-bord': {
        title: 'Dashboards & KPIs',
        lead:
          'Audits, quality tours, deviations and actions each have their own dashboard: volume, peak month, average, highest and lowest scores, by week, month or year.',
        before: [
          'Indicators consolidated by hand in Excel',
          'Figures available several days late',
          'Conflicting versions between departments',
          'Drifts spotted after the fact',
        ],
        points: [
          'KPIs for audits, tours, deviations and actions',
          'Weekly, monthly and yearly views',
          'Filters by area, team and period',
          'Action owner ranking',
        ],
      },
      rapports: {
        title: 'Automatic reports',
        lead:
          'Audit reports, schedules and summaries are generated from data already captured. The general report goes out by email at the pace each user chooses.',
        before: [
          'Reports built by copy and paste',
          'Hours spent preparing each review',
          'Layout that changes with the author',
          'Regulatory exports prepared in a rush',
        ],
        points: [
          'Audit reports as PDF',
          'General report sent by email',
          'Choice of sending frequency (monthly review…)',
          'Regulatory exports',
        ],
      },
      tracabilite: {
        title: 'Audit trail & organization',
        lead:
          'Every action is logged: who, what, on which page, when, from the web or from mobile. Users, roles, areas and master data are managed in one place.',
        before: [
          'No record of changes',
          'Access rights handled case by case',
          'Areas and teams described differently in each tool',
          'Evidence pieced together the day before an inspection',
        ],
        points: [
          'Time-stamped log of every action',
          'Web and mobile sessions traced',
          'Users and roles: auditor, organizer…',
          'Areas, equipment and schedules in one place',
        ],
      },
      ia: {
        title: 'Operational intelligence',
        lead:
          'The AI generates checklists from your procedures and spots deviations and weak signals before they turn into incidents.',
        before: [
          'Checklists written and updated by hand',
          'Weak signals buried in the data',
          'Inconsistencies found too late',
          'Analysis limited to a few experts',
        ],
        points: [
          'AI-generated checklists',
          'Deviation detection',
          'Consistency checks',
          'Weak signals surfaced',
        ],
      },
      integrations: {
        title: 'Industrial integrations',
        lead:
          'CIPA connects to your existing ecosystem to avoid double entry and keep a single source of truth. Data exchanges are defined during scoping.',
        before: [
          'Double entry between tools',
          'Quality data cut off from the rest of the IT system',
          'Manual exports to BI',
          'Several sources of truth',
        ],
        points: ['ERP', 'MES and CMMS', 'BI tools', 'APIs and dedicated connectors'],
      },
    },
  },
}

function translate(page: PlatformPageData): PlatformPageData {
  const text = EN[page.slug]
  const { imageAlt, sections, steps, included, ...fields } = text
  return {
    ...page,
    ...fields,
    image: { ...page.image, alt: imageAlt },
    sections: page.sections.map((section) => ({ ...section, ...sections[section.id] })),
    steps: page.steps?.map((step, i) => ({ ...step, ...steps?.[i] })),
    included: page.included?.map((item, i) => ({ ...item, ...included?.[i] })),
  }
}

const PLATFORM_PAGES_EN = PLATFORM_PAGES.map(translate)

/** Les trois pages Plateforme dans la langue demandée. */
export function platformPages(locale: Locale): PlatformPageData[] {
  return locale === 'en' ? PLATFORM_PAGES_EN : PLATFORM_PAGES
}

export function platformPage(slug: string, locale: Locale = 'fr') {
  return platformPages(locale).find((page) => page.slug === slug)
}

/** Lien vers une page Plateforme, et vers l'une de ses sections si `anchor`. */
export function platformHref(slug: string, anchor?: string) {
  return `/plateforme/${slug}${anchor ? `#${anchor}` : ''}`
}
