import {
  Activity,
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
  ShieldCheck,
  TrendingUp,
  Users,
  WifiOff,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import type { Locale } from '@/i18n/routing'

/**
 * Les sept pages Solution, rangees sous les trois piliers de l'accueil
 * (Structurer / Orchestrer / Piloter, voir CipaSection) :
 *
 *   Structurer : Remontee terrain, Planification & maintenance
 *   Orchestrer : Gestion des ecarts, Conformite & tracabilite
 *   Piloter    : Pilotage de la performance, Intelligence operationnelle,
 *                Integrations & organisation
 *
 * Chaque usage n'apparait que sur une page : pas de contenu repete d'une
 * page a l'autre. « Intelligence operationnelle » remplace le terme « IA ».
 * Il n'y a pas de page « Vue d'ensemble » : l'accueil joue deja ce role.
 *
 * Chaque section porte un `id` stable : c'est l'ancre visee par le menu et
 * par les six cartes de fonctionnalites de l'accueil (lib/data/features.ts).
 * Renommer un `id` casse ces liens — passer par `platformHref`. Les anciennes
 * URL (/plateforme/terrain, /qualite, /pilotage) sont redirigees dans
 * next.config.mjs.
 *
 * Le texte suit les modules montres dans la video de demonstration de
 * l'application web CIPA (tableaux de bord, audits et planificateur, produits,
 * change control, deviations / actions / reclamations, workflows,
 * organisation, audit trail, preferences), completes de ce que le site
 * affirme deja ailleurs (intelligence operationnelle, integrations, section
 * architecture). Pas de promesse nouvelle qu'il faudrait pouvoir prouver.
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
  /** Pilier de l'accueil auquel la page se rattache. */
  pillar: 'Structurer' | 'Orchestrer' | 'Piloter'
  /** Libelle court : menu, cartes croisees, pied de page. */
  name: string
  /** Sous-titre court des cartes croisees. */
  summary: string
  /** Titre de l'entree dans le mega-menu Solution. */
  menuTitle: string
  /** Sous-titre de l'entree dans le mega-menu. */
  menuDescription: string
  icon: LucideIcon
  /**
   * Verbe d'action du hero. Repris en minuscules dans l'appel final
   * (« Voyons ce que CIPA peut capter chez vous ») : garder un infinitif.
   */
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
   * donnee, stack, securite). Seule la page Integrations l'affiche.
   */
  architecture?: boolean
}

/* Les trois visuels existants, partages entre les pages d'un meme pilier. */
const IMAGE_TERRAIN = '/cipa-1-digitalisation-audits-terrain.png'
const IMAGE_QUALITE = '/cipa-2-gestion-ecarts-qualite.png'
const IMAGE_PILOTAGE = '/cipa-3-pilotage-performance-ia.png'

export const PLATFORM_PAGES: PlatformPageData[] = [
  /* ---------- Structurer ---------- */
  {
    slug: 'remontee-terrain',
    pillar: 'Structurer',
    name: 'Remontée terrain',
    summary: 'Audits, inspections & contrôles de production',
    menuTitle: 'Remontée terrain',
    menuDescription: 'Audits, inspections, checklists et contrôles de production',
    icon: ClipboardCheck,
    title: 'Capter',
    accent: 'la donnée terrain',
    description:
      'Audits internes, tournées qualité, checklists et suivi de production : CIPA capte la donnée sur mobile, au poste, et la range dans un référentiel unique organisé par zone, équipe et équipement.',
    metaTitle: 'Remontée terrain : audits, inspections & production — CIPA',
    metaDescription:
      'Digitalisez audits internes, tournées qualité, checklists, formulaires et suivi de production par étape avec CIPA : une saisie mobile, une donnée fiable.',
    image: {
      src: IMAGE_TERRAIN,
      alt: 'Écrans CIPA d’audit interne sur mobile, de tournée de sécurité et de traçabilité horodatée',
    },
    highlights: ['Saisie mobile', 'Checklists standardisées', 'Traçabilité complète'],
    usesIntro: {
      eyebrow: 'Usages terrain',
      title: 'Trois usages, un seul référentiel',
      lead:
        'Audits, inspections et contrôles de production partagent la même application, les mêmes zones, les mêmes équipes et la même traçabilité.',
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
    ],
    steps: [
      {
        icon: ListChecks,
        title: 'Créez vos checklists',
        text: 'À partir d’un modèle, de vos procédures existantes ou générées par l’intelligence opérationnelle de CIPA.',
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
    slug: 'planification-maintenance',
    pillar: 'Structurer',
    name: 'Planification',
    summary: 'Programme d’audit, maintenance & équipements',
    menuTitle: 'Planification & maintenance',
    menuDescription: 'Programme d’audit, contrôles de maintenance et équipements',
    icon: CalendarDays,
    title: 'Planifier',
    accent: 'audits et maintenance',
    description:
      'Programme d’audit, contrôles de maintenance, suivi des équipements et planning des équipes : CIPA organise qui contrôle quoi, où et quand, et garde l’historique de chaque intervention.',
    metaTitle: 'Planification des audits & maintenance — CIPA',
    metaDescription:
      'Planifiez vos audits au mois, à la semaine ou en liste, assignez les plans d’audit, suivez contrôles de maintenance et équipements par zone avec CIPA.',
    image: {
      src: IMAGE_TERRAIN,
      alt: 'Écrans CIPA de tournée planifiée sur mobile et de traçabilité horodatée',
    },
    highlights: ['Calendrier partagé', 'Plans d’audit assignés', 'Historique des interventions'],
    usesIntro: {
      eyebrow: 'Usages planification',
      title: 'Le bon contrôle, au bon moment',
      lead:
        'Programme d’audit, contrôles de maintenance et planning des équipes s’appuient sur les mêmes zones et le même calendrier.',
    },
    sections: [
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
  },

  /* ---------- Orchestrer ---------- */
  {
    slug: 'gestion-ecarts',
    pillar: 'Orchestrer',
    name: 'Gestion des écarts',
    summary: 'Déviations, CAPA & réclamations',
    menuTitle: 'Gestion des écarts',
    menuDescription: 'Déviations, non-conformités, CAPA et réclamations',
    icon: Bell,
    title: 'Maîtriser',
    accent: 'chaque écart',
    description:
      'Déviations, non-conformités, actions correctives et réclamations clients : CIPA trace chaque écart depuis son origine et orchestre son traitement jusqu’à la clôture.',
    metaTitle: 'Gestion des écarts : déviations, CAPA & réclamations — CIPA',
    metaDescription:
      'Gérez déviations, non-conformités, CAPA et réclamations clients jusqu’à la clôture avec CIPA : origine tracée, pilotes, échéances et validation.',
    image: {
      src: IMAGE_QUALITE,
      alt: 'Écrans CIPA d’un workflow de non-conformité, du signalement au plan CAPA',
    },
    highlights: ['Écarts classifiés', 'CAPA suivies', 'Réclamations tracées'],
    usesIntro: {
      eyebrow: 'Usages écarts',
      title: 'De l’écart à la clôture',
      lead:
        'Déviations, actions et réclamations s’enchaînent dans le même outil, sans ressaisie ni perte d’information.',
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
        title: 'Réclamations clients',
        lead:
          'Les réclamations clients suivent le même circuit que les écarts internes : enregistrées, évaluées, validées et tracées, avec leurs actions.',
        before: [
          'Réclamations reçues par e-mail, sans suivi',
          'Traitement hors du circuit qualité',
          'Lien avec les écarts internes perdu',
          'Aucune trace de qui a validé quoi',
        ],
        points: [
          'Registre des réclamations',
          'Évaluation et validation tracées',
          'Actions déclenchées depuis la réclamation',
          'Même circuit que les déviations',
        ],
      },
    ],
  },
  {
    slug: 'conformite-tracabilite',
    pillar: 'Orchestrer',
    name: 'Conformité',
    summary: 'Workflows, change control & audit trail',
    menuTitle: 'Conformité & traçabilité',
    menuDescription: 'Workflows de validation, change control et audit trail',
    icon: ShieldCheck,
    title: 'Prouver',
    accent: 'la conformité',
    description:
      'Workflows de validation, maîtrise des changements et journal d’audit : CIPA exécute vos processus tels que définis et garde la preuve de qui a fait quoi, quand, et selon quelle version.',
    metaTitle: 'Conformité & traçabilité : workflows, change control, audit trail — CIPA',
    metaDescription:
      'Modélisez vos workflows de validation, maîtrisez les changements et disposez d’un audit trail complet, web et mobile, avec CIPA.',
    image: {
      src: IMAGE_QUALITE,
      alt: 'Écrans CIPA d’un workflow de validation tracé étape par étape',
    },
    highlights: ['Workflows versionnés', 'Change control', 'Audit trail'],
    usesIntro: {
      eyebrow: 'Usages conformité',
      title: 'Chaque décision, tracée',
      lead:
        'Workflows, changements et journal d’audit gardent la preuve de qui a fait quoi, quand, et selon quelle version.',
    },
    sections: [
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
        id: 'change-control',
        icon: GitBranch,
        title: 'Maîtrise des changements',
        lead:
          'Chaque demande de changement est enregistrée, son impact évalué, puis approuvée avant d’être appliquée. Les actions nécessaires partent de la demande.',
        before: [
          'Changements décidés hors de tout circuit',
          'Impact des changements rarement évalué',
          'Aucune trace de qui a approuvé quoi',
          'Actions de mise en œuvre oubliées',
        ],
        points: [
          'Demandes de changement (change control)',
          'Évaluation de l’impact',
          'Approbation tracée',
          'Actions déclenchées depuis la demande',
        ],
      },
      {
        id: 'tracabilite',
        icon: History,
        title: 'Audit trail',
        lead:
          'Chaque action est journalisée : qui, quoi, sur quelle page, quand, depuis le web ou le mobile. Les preuves sont prêtes le jour de l’inspection.',
        before: [
          'Aucune trace des modifications',
          'Historique dispersé entre les outils',
          'Sessions mobiles invisibles',
          'Preuves reconstituées la veille d’une inspection',
        ],
        points: [
          'Journal horodaté de chaque action',
          'Utilisateur, page et action enregistrés',
          'Sessions web et mobile tracées',
          'Preuves prêtes pour l’inspection',
        ],
      },
    ],
  },

  /* ---------- Piloter ---------- */
  {
    slug: 'pilotage-performance',
    pillar: 'Piloter',
    name: 'Pilotage',
    summary: 'Tableaux de bord, rapports & amélioration continue',
    menuTitle: 'Pilotage de la performance',
    menuDescription: 'Tableaux de bord, rapports automatiques et Pareto',
    icon: LayoutDashboard,
    title: 'Piloter',
    accent: 'la performance',
    description:
      'Indicateurs en temps réel sur les audits, les tournées, les déviations et les actions, rapports envoyés automatiquement et analyse Pareto des problèmes : CIPA transforme la donnée terrain en décisions.',
    metaTitle: 'Pilotage de la performance : tableaux de bord & KPI — CIPA',
    metaDescription:
      'Tableaux de bord et KPI en temps réel, rapports automatiques et amélioration continue par Pareto : pilotez vos opérations avec CIPA.',
    image: {
      src: IMAGE_PILOTAGE,
      alt: 'Tableau de bord qualité CIPA avec indicateurs, signal faible détecté et intégrations',
    },
    highlights: ['Temps réel', 'Rapports automatiques', 'Pareto des problèmes'],
    usesIntro: {
      eyebrow: 'Usages pilotage',
      title: 'Des données terrain aux décisions',
      lead:
        'Indicateurs, rapports et analyses exploitent les mêmes données, saisies une seule fois sur le terrain.',
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
          'Scores moyen, maximum et minimum',
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
    slug: 'intelligence-operationnelle',
    pillar: 'Piloter',
    name: 'Intelligence opérationnelle',
    summary: 'Signaux faibles, cohérence & checklists générées',
    menuTitle: 'Intelligence opérationnelle',
    menuDescription: 'Détection des écarts, signaux faibles et checklists générées',
    icon: BrainCircuit,
    title: 'Anticiper',
    accent: 'les dérives',
    description:
      'CIPA exploite les données déjà saisies sur le terrain pour repérer les écarts et les signaux faibles avant qu’ils ne deviennent des incidents, et prépare vos checklists à partir de vos procédures.',
    metaTitle: 'Intelligence opérationnelle : signaux faibles & checklists — CIPA',
    metaDescription:
      'Détection des écarts, contrôles de cohérence, signaux faibles et checklists générées depuis vos procédures : l’intelligence opérationnelle de CIPA.',
    image: {
      src: IMAGE_PILOTAGE,
      alt: 'Tableau de bord CIPA signalant un signal faible détecté sur les données terrain',
    },
    highlights: ['Signaux faibles', 'Contrôles de cohérence', 'Checklists générées'],
    usesIntro: {
      eyebrow: 'Usages intelligence opérationnelle',
      title: 'Voir venir plutôt que constater',
      lead:
        'CIPA travaille sur les données déjà saisies pour signaler ce qui dérive et préparer vos checklists.',
    },
    sections: [
      {
        id: 'detection',
        icon: Activity,
        title: 'Détection des écarts & signaux faibles',
        lead:
          'CIPA analyse les données saisies sur le terrain, contrôle leur cohérence et fait remonter les écarts et signaux faibles avant qu’ils ne deviennent des incidents.',
        before: [
          'Signaux faibles noyés dans les données',
          'Incohérences repérées trop tard',
          'Analyses réservées à quelques experts',
          'Incidents constatés au lieu d’être anticipés',
        ],
        points: [
          'Détection des écarts',
          'Contrôles de cohérence',
          'Signaux faibles remontés',
          'Analyse des données déjà saisies',
        ],
      },
      {
        id: 'checklists',
        icon: ListChecks,
        title: 'Checklists générées depuis vos procédures',
        lead:
          'CIPA rédige les checklists à partir de vos procédures existantes. Vos équipes les relisent et les ajustent, puis elles servent à toutes les inspections.',
        before: [
          'Checklists rédigées et mises à jour à la main',
          'Procédures et grilles qui divergent',
          'Des jours pour créer une nouvelle grille',
          'Mises à jour oubliées après un changement de procédure',
        ],
        points: [
          'Checklists générées depuis vos procédures',
          'Relues et ajustées par vos équipes',
          'Ajoutées à la bibliothèque de checklists',
          'Utilisables sur mobile et sur le web',
        ],
      },
    ],
  },
  {
    slug: 'integrations',
    pillar: 'Piloter',
    name: 'Intégrations',
    summary: 'ERP, MES, BI, organisation & sécurité',
    menuTitle: 'Intégrations & organisation',
    menuDescription: 'ERP, MES, GMAO, BI, utilisateurs et sécurité',
    icon: Plug,
    title: 'Connecter',
    accent: 'votre écosystème',
    description:
      'CIPA se connecte à votre ERP, votre MES, votre GMAO et vos outils de BI, et partage un référentiel commun d’utilisateurs, de rôles, de zones et d’équipements. Une seule source de vérité, sécurisée.',
    metaTitle: 'Intégrations ERP, MES, BI & organisation — CIPA',
    metaDescription:
      'Intégrations ERP, MES, GMAO et BI, API, gestion des utilisateurs, rôles, zones et équipements, architecture et sécurité : CIPA s’insère dans votre SI.',
    architecture: true,
    image: {
      src: IMAGE_PILOTAGE,
      alt: 'Tableau de bord CIPA relié aux intégrations ERP, BI et MES',
    },
    highlights: ['ERP · MES · GMAO', 'Outils de BI', 'API'],
    usesIntro: {
      eyebrow: 'Usages intégration',
      title: 'Une source de vérité unique',
      lead:
        'CIPA s’insère dans votre SI existant et partage un référentiel commun : utilisateurs, rôles, zones et équipements.',
    },
    sections: [
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
      {
        id: 'organisation',
        icon: Users,
        title: 'Organisation & référentiels',
        lead:
          'Utilisateurs, rôles, zones, équipements et plannings se gèrent au même endroit et servent de référentiel commun à tous les modules.',
        before: [
          'Droits d’accès gérés au cas par cas',
          'Zones et équipes décrites différemment selon les outils',
          'Équipements listés dans plusieurs fichiers',
          'Référentiels à mettre à jour dans chaque outil',
        ],
        points: [
          'Utilisateurs et rôles : auditeur, organisateur…',
          'Droits par rôle',
          'Zones, équipements et plannings centralisés',
          'Préférences par utilisateur',
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
  'remontee-terrain': {
    name: 'Shop-floor capture',
    summary: 'Audits, inspections & production checks',
    menuTitle: 'Shop-floor data capture',
    menuDescription: 'Audits, inspections, checklists and production checks',
    title: 'Capture',
    accent: 'shop-floor data',
    description:
      'Internal audits, quality tours, checklists and production tracking: CIPA captures data on mobile, at the workstation, and files it in a single repository organized by area, team and equipment.',
    metaTitle: 'Shop-floor capture: audits, inspections & production — CIPA',
    metaDescription:
      'Digitize internal audits, quality tours, checklists, forms and step-by-step production tracking with CIPA: mobile capture, reliable data.',
    imageAlt: 'CIPA screens for a mobile internal audit, a safety tour and time-stamped traceability',
    highlights: ['Mobile capture', 'Standard checklists', 'Full traceability'],
    usesIntro: {
      eyebrow: 'Shop-floor use cases',
      title: 'Three use cases, one repository',
      lead:
        'Audits, inspections and production checks share the same app, the same areas, the same teams and the same traceability.',
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
    },
    steps: [
      {
        title: 'Create your checklists',
        text: 'From a template, from your existing procedures, or generated by CIPA’s operational intelligence.',
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
  'planification-maintenance': {
    name: 'Planning',
    summary: 'Audit programme, maintenance & equipment',
    menuTitle: 'Planning & maintenance',
    menuDescription: 'Audit programme, maintenance checks and equipment',
    title: 'Plan',
    accent: 'audits and maintenance',
    description:
      'Audit programme, maintenance checks, equipment monitoring and team schedules: CIPA organizes who checks what, where and when, and keeps the history of every intervention.',
    metaTitle: 'Audit planning & maintenance — CIPA',
    metaDescription:
      'Plan your audits by month, week or list, assign audit plans, and track maintenance checks and equipment by area with CIPA.',
    imageAlt: 'CIPA screens of a planned mobile tour and time-stamped traceability',
    highlights: ['Shared calendar', 'Assigned audit plans', 'Intervention history'],
    usesIntro: {
      eyebrow: 'Planning use cases',
      title: 'The right check, at the right time',
      lead:
        'Audit programme, maintenance checks and team schedules rely on the same areas and the same calendar.',
    },
    sections: {
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
  },
  'gestion-ecarts': {
    name: 'Deviation management',
    summary: 'Deviations, CAPA & complaints',
    menuTitle: 'Deviation management',
    menuDescription: 'Deviations, non-conformities, CAPA and complaints',
    title: 'Control',
    accent: 'every deviation',
    description:
      'Deviations, non-conformities, corrective actions and customer complaints: CIPA traces every deviation from its origin and drives its handling through to closure.',
    metaTitle: 'Deviation management: deviations, CAPA & complaints — CIPA',
    metaDescription:
      'Manage deviations, non-conformities, CAPA and customer complaints through to closure with CIPA: traced origin, owners, due dates and approval.',
    imageAlt: 'CIPA screens of a non-conformity workflow, from report to CAPA plan',
    highlights: ['Classified deviations', 'Tracked CAPA', 'Traced complaints'],
    usesIntro: {
      eyebrow: 'Deviation use cases',
      title: 'From deviation to closure',
      lead:
        'Deviations, actions and complaints follow on from each other in the same tool, with no retyping and nothing lost.',
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
        title: 'Customer complaints',
        lead:
          'Customer complaints follow the same path as internal deviations: recorded, assessed, approved and traced, along with their actions.',
        before: [
          'Complaints received by email, with no follow-up',
          'Handled outside the quality process',
          'Link with internal deviations lost',
          'No record of who approved what',
        ],
        points: [
          'Complaint register',
          'Traced assessment and approval',
          'Actions triggered from the complaint',
          'Same path as deviations',
        ],
      },
    },
  },
  'conformite-tracabilite': {
    name: 'Compliance',
    summary: 'Workflows, change control & audit trail',
    menuTitle: 'Compliance & traceability',
    menuDescription: 'Approval workflows, change control and audit trail',
    title: 'Prove',
    accent: 'compliance',
    description:
      'Approval workflows, change control and audit trail: CIPA runs your processes as defined and keeps proof of who did what, when, and under which version.',
    metaTitle: 'Compliance & traceability: workflows, change control, audit trail — CIPA',
    metaDescription:
      'Model your approval workflows, control changes and get a complete audit trail, on web and mobile, with CIPA.',
    imageAlt: 'CIPA screens of an approval workflow traced step by step',
    highlights: ['Versioned workflows', 'Change control', 'Audit trail'],
    usesIntro: {
      eyebrow: 'Compliance use cases',
      title: 'Every decision, traced',
      lead:
        'Workflows, changes and the audit trail keep proof of who did what, when, and under which version.',
    },
    sections: {
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
      'change-control': {
        title: 'Change control',
        lead:
          'Every change request is recorded, its impact assessed, then approved before it is applied. The required actions start from the request.',
        before: [
          'Changes decided outside any process',
          'Impact of changes rarely assessed',
          'No record of who approved what',
          'Implementation actions forgotten',
        ],
        points: [
          'Change requests (change control)',
          'Impact assessment',
          'Traced approval',
          'Actions triggered from the request',
        ],
      },
      tracabilite: {
        title: 'Audit trail',
        lead:
          'Every action is logged: who, what, on which page, when, from the web or from mobile. Evidence is ready on inspection day.',
        before: [
          'No record of changes',
          'History scattered across tools',
          'Mobile sessions invisible',
          'Evidence pieced together the day before an inspection',
        ],
        points: [
          'Time-stamped log of every action',
          'User, page and action recorded',
          'Web and mobile sessions traced',
          'Evidence ready for inspection',
        ],
      },
    },
  },
  'pilotage-performance': {
    name: 'Performance',
    summary: 'Dashboards, reports & continuous improvement',
    menuTitle: 'Performance management',
    menuDescription: 'Dashboards, automatic reports and Pareto',
    title: 'Drive',
    accent: 'performance',
    description:
      'Real-time indicators on audits, tours, deviations and actions, reports sent automatically and Pareto analysis of problems: CIPA turns shop-floor data into decisions.',
    metaTitle: 'Performance management: dashboards & KPIs — CIPA',
    metaDescription:
      'Real-time dashboards and KPIs, automatic reports and Pareto-based continuous improvement: run your operations with CIPA.',
    imageAlt: 'CIPA quality dashboard with indicators, a detected weak signal and integrations',
    highlights: ['Real time', 'Automatic reports', 'Problem Pareto'],
    usesIntro: {
      eyebrow: 'Performance use cases',
      title: 'From shop-floor data to decisions',
      lead:
        'Indicators, reports and analyses all use the same data, captured once on the shop floor.',
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
          'Average, highest and lowest scores',
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
  'intelligence-operationnelle': {
    name: 'Operational intelligence',
    summary: 'Weak signals, consistency & generated checklists',
    menuTitle: 'Operational intelligence',
    menuDescription: 'Deviation detection, weak signals and generated checklists',
    title: 'Anticipate',
    accent: 'drifts',
    description:
      'CIPA uses the data already captured on the shop floor to spot deviations and weak signals before they turn into incidents, and prepares your checklists from your procedures.',
    metaTitle: 'Operational intelligence: weak signals & checklists — CIPA',
    metaDescription:
      'Deviation detection, consistency checks, weak signals and checklists generated from your procedures: CIPA’s operational intelligence.',
    imageAlt: 'CIPA dashboard flagging a weak signal detected in shop-floor data',
    highlights: ['Weak signals', 'Consistency checks', 'Generated checklists'],
    usesIntro: {
      eyebrow: 'Operational intelligence use cases',
      title: 'See it coming instead of finding out',
      lead:
        'CIPA works on the data already captured to flag what is drifting and to prepare your checklists.',
    },
    sections: {
      detection: {
        title: 'Deviation & weak-signal detection',
        lead:
          'CIPA analyses shop-floor data, checks its consistency and surfaces deviations and weak signals before they turn into incidents.',
        before: [
          'Weak signals buried in the data',
          'Inconsistencies found too late',
          'Analysis limited to a few experts',
          'Incidents found rather than anticipated',
        ],
        points: [
          'Deviation detection',
          'Consistency checks',
          'Weak signals surfaced',
          'Analysis of data already captured',
        ],
      },
      checklists: {
        title: 'Checklists generated from your procedures',
        lead:
          'CIPA drafts checklists from your existing procedures. Your teams review and adjust them, then they drive every inspection.',
        before: [
          'Checklists written and updated by hand',
          'Procedures and grids that drift apart',
          'Days to build a new grid',
          'Updates forgotten after a procedure changes',
        ],
        points: [
          'Checklists generated from your procedures',
          'Reviewed and adjusted by your teams',
          'Added to the checklist library',
          'Usable on mobile and on the web',
        ],
      },
    },
  },
  integrations: {
    name: 'Integrations',
    summary: 'ERP, MES, BI, organization & security',
    menuTitle: 'Integrations & organization',
    menuDescription: 'ERP, MES, CMMS, BI, users and security',
    title: 'Connect',
    accent: 'your ecosystem',
    description:
      'CIPA connects to your ERP, MES, CMMS and BI tools, and shares common master data for users, roles, areas and equipment. A single, secure source of truth.',
    metaTitle: 'ERP, MES & BI integrations and organization — CIPA',
    metaDescription:
      'ERP, MES, CMMS and BI integrations, APIs, management of users, roles, areas and equipment, architecture and security: CIPA fits into your IT system.',
    imageAlt: 'CIPA dashboard linked to ERP, BI and MES integrations',
    highlights: ['ERP · MES · CMMS', 'BI tools', 'API'],
    usesIntro: {
      eyebrow: 'Integration use cases',
      title: 'A single source of truth',
      lead:
        'CIPA fits into your existing IT system and shares common master data: users, roles, areas and equipment.',
    },
    sections: {
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
      organisation: {
        title: 'Organization & master data',
        lead:
          'Users, roles, areas, equipment and schedules are managed in one place and serve as common master data for every module.',
        before: [
          'Access rights handled case by case',
          'Areas and teams described differently in each tool',
          'Equipment listed in several files',
          'Master data updated in every tool',
        ],
        points: [
          'Users and roles: auditor, organizer…',
          'Role-based permissions',
          'Areas, equipment and schedules in one place',
          'Per-user preferences',
        ],
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

/** Les sept pages Solution dans la langue demandée. */
export function platformPages(locale: Locale): PlatformPageData[] {
  return locale === 'en' ? PLATFORM_PAGES_EN : PLATFORM_PAGES
}

export function platformPage(slug: string, locale: Locale = 'fr') {
  return platformPages(locale).find((page) => page.slug === slug)
}

/** Lien vers une page Solution, et vers l'une de ses sections si `anchor`. */
export function platformHref(slug: string, anchor?: string) {
  return `/plateforme/${slug}${anchor ? `#${anchor}` : ''}`
}
