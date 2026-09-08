/**
 * Page pilier de la rubrique Plateforme — /plateforme.
 *
 * Son role est d'orienter, pas de tout expliquer : chaque capacite est resumee
 * en deux lignes et renvoie vers sa sous-page. Toute description qui commence
 * a detailler un parametrage appartient a la page fille, pas ici.
 */

import {
  BarChart3,
  BrainCircuit,
  Factory,
  Gauge,
  HardHat,
  MonitorSmartphone,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Workflow,
  Wrench,
} from 'lucide-react'

import { NAV_GROUPS } from './shared'
import type {
  AudiencesContent,
  FlowContent,
  MarketingPageContent,
  RelatedContent,
  SurfacesContent,
} from './types'

/**
 * La page pilier ajoute quatre blocs a la structure commune et se passe du
 * bloc solution standard : le schema en quatre temps et la grille des modules
 * tiennent ce role. Elle compose donc ses sections a la main, dans
 * `app/(marketing)/plateforme/page.tsx`, plutot que de passer par
 * `<MarketingPage />`.
 */
type PlateformeContent = Omit<MarketingPageContent, 'solution'> & {
  flow: FlowContent
  modules: RelatedContent
  solutions: RelatedContent
  surfaces: SurfacesContent
  audiences: AudiencesContent
}

/* ═══════════════════════════════════════════════════════════════════════
   LES MODULES, LUS DEPUIS LE MENU

   La consigne est que la grille reprenne « exactement les items du menu
   Plateforme ». Recopier cette liste ici la ferait diverger du mega menu au
   premier renommage. On lit donc la meme donnee, en retirant la page
   courante : une page pilier qui se propose elle-meme comme destination
   envoie le lecteur ou il se trouve deja.
   ═══════════════════════════════════════════════════════════════════════ */

const OVERVIEW_HREF = '/plateforme'

const platformGroup = NAV_GROUPS.find((group) => group.label === 'Plateforme')

if (!platformGroup) {
  // Au chargement du module, donc pendant le build. Si le groupe est renomme,
  // la page ne se construit pas — plutot qu'elle se construise vide.
  throw new Error(
    "content/plateforme.ts : groupe de navigation « Plateforme » introuvable dans NAV_GROUPS.",
  )
}

const modules: RelatedContent = {
  eyebrow: 'Les modules',
  title: 'Cinq modules, un seul socle de données.',
  subtitle:
    'Chaque module fonctionne seul et prend son sens avec les autres : le constat saisi sur le terrain alimente le workflow, qui alimente le tableau de bord.',
  // Derives du menu plutot qu'ecrits a la main : un sixieme module ajoute a la
  // navigation apparaitrait ici sans que personne ait a y penser.
  hrefs: platformGroup.items
    .map((item) => item.href)
    .filter((href) => href !== OVERVIEW_HREF),
}

/**
 * Renvoi vers la rubrique Solutions.
 *
 * La page pilier decrivait les modules sans jamais dire a quel probleme metier
 * ils repondent : un directeur d'usine arrivait au bout sans avoir croise une
 * seule page Solutions. Trois destinations, pas six — un sommaire de six cases
 * apres un autre sommaire de cinq cases ne se lit plus.
 */
const solutions: RelatedContent = {
  eyebrow: 'Par métier',
  title: 'Et concrètement, pour',
  accent: 'quel usage ?',
  subtitle:
    'Les mêmes modules, vus depuis le problème qu’ils traitent plutôt que depuis ce qu’ils font.',
  hrefs: [
    '/solutions/qualite-conformite',
    '/solutions/production-dossier-de-lot',
    '/solutions/non-conformites-capa',
  ],
}

/* ═══════════════════════════════════════════════════════════════════════
   LES QUATRE TEMPS
   ═══════════════════════════════════════════════════════════════════════ */

const flow: FlowContent = {
  title: 'Capter, orchestrer, analyser,',
  accent: 'décider.',
  subtitle:
    'Le même événement traverse les quatre étapes sans changer de support ni de format. C’est ce qui permet de remonter d’un indicateur au constat qui l’a produit.',
  steps: [
    {
      icon: ScanSearch,
      title: 'Capter',
      body: 'Inspections, audits et relevés remplis sur smartphone ou tablette, à l’endroit où le travail se fait.',
      href: '/plateforme/capture-terrain',
      linkLabel: 'Capture terrain',
    },
    {
      icon: Workflow,
      title: 'Orchestrer',
      body: 'Un écart déclenche le circuit prévu : notification du responsable, affectation, échéance, validation.',
      href: '/plateforme/orchestration',
      linkLabel: 'Orchestration des processus',
    },
    {
      icon: BrainCircuit,
      title: 'Analyser',
      body: 'L’IA générative rédige les rapports, propose des checklists et fait ressortir les écarts qui reviennent.',
      href: '/plateforme/intelligence-operationnelle',
      linkLabel: 'Intelligence opérationnelle',
    },
    {
      icon: BarChart3,
      title: 'Décider',
      body: 'Qualité, production et conformité sur un tableau de bord unique, à jour sans consolidation manuelle.',
      href: '/plateforme/tableaux-de-bord',
      linkLabel: 'Tableaux de bord',
    },
  ],
}

/* ═══════════════════════════════════════════════════════════════════════
   WEB ET MOBILE
   ═══════════════════════════════════════════════════════════════════════ */

const surfaces: SurfacesContent = {
  title: 'Le pilotage sur le web,',
  accent: 'la saisie sur le terrain.',
  subtitle:
    'Deux usages qui n’ont ni le même contexte ni les mêmes contraintes, sur la même base de données.',
  items: [
    {
      icon: MonitorSmartphone,
      eyebrow: 'Sur le web',
      title: 'La plateforme SaaS',
      body: 'Le poste de travail de la direction d’usine et des fonctions qualité : c’est là que les processus se paramètrent et que les écarts se revoient.',
      points: [
        'Paramétrage des checklists et des circuits d’escalade',
        'Suivi des indicateurs qualité, production et conformité',
        'Extraction des preuves pour un audit ou une réclamation client',
      ],
    },
    {
      icon: Smartphone,
      eyebrow: 'Sur le terrain',
      title: 'L’application Android',
      body: 'Conçue pour être utilisée debout, dans le bruit et sous éclairage d’atelier — pas pour reproduire l’écran du bureau en plus petit.',
      points: [
        'Constat saisi en quelques appuis, au poste de travail',
        'Preuve photo ou vidéo attachée au constat',
        'Cibles tactiles larges et contraste élevé, utilisables avec des gants',
      ],
    },
  ],
}

/* ═══════════════════════════════════════════════════════════════════════
   POUR QUI
   ═══════════════════════════════════════════════════════════════════════ */

const audiences: AudiencesContent = {
  title: 'Un système, cinq façons de s’en servir.',
  subtitle:
    'Chacun voit son périmètre et ses actions ; la direction voit l’ensemble.',
  items: [
    {
      icon: Factory,
      role: 'Direction d’usine et des opérations',
      body: 'Voir l’état réel du site sans attendre le reporting du lundi : écarts ouverts, actions en retard, lignes qui décrochent.',
    },
    {
      icon: ShieldCheck,
      role: 'Qualité et conformité',
      body: 'Prouver la conformité avec des preuves horodatées, au lieu de la reconstituer à l’approche d’un audit.',
    },
    {
      icon: Gauge,
      role: 'Production',
      body: 'Suivre les contrôles en ligne et traiter les non-conformités sans interrompre le flux.',
    },
    {
      icon: Wrench,
      role: 'Maintenance',
      body: 'Déclarer une intervention depuis la machine, avec la photo du défaut et l’historique de l’équipement.',
    },
    {
      icon: HardHat,
      role: 'HSE',
      body: 'Tracer les inspections sécurité, les presque-accidents et les actions correctives qui en découlent.',
    },
  ],
}

/* ═══════════════════════════════════════════════════════════════════════
   LA PAGE
   ═══════════════════════════════════════════════════════════════════════ */

export const plateforme: PlateformeContent = {
  seo: {
    // 52 caracteres.
    title: 'CIPA — La plateforme de vos opérations industrielles',
    // 140 caracteres.
    description:
      'Inspections, audits, escalade des anomalies et actions correctives sur un seul système. Application terrain sur mobile, pilotage sur le web.',
    path: '/plateforme',
  },

  hero: {
    eyebrow: 'Plateforme',
    title: 'CIPA, la plateforme qui structure vos',
    accent: 'opérations industrielles',
    description:
      'De la donnée terrain à la décision, sur un seul système. Inspections, écarts, actions correctives et preuves de conformité cessent d’être répartis entre le papier, les tableurs et les messageries.',
    proofs: [
      'Audits et inspections digitalisés, sans ressaisie',
      'Anomalie escaladée en temps réel, preuve à l’appui',
      'Traçabilité complète des actions correctives',
    ],
    // Sur la page pilier, « Voir la plateforme » renverrait ici meme. Le CTA
    // secondaire descend donc a la grille des modules, qui est ce que le
    // visiteur cherche quand il clique.
    secondaryCta: { label: 'Voir les modules', href: '#modules' },
  },

  problem: {
    title: 'Trois situations que vous',
    accent: 'reconnaîtrez.',
    items: [
      {
        title: 'La donnée terrain existe, mais nulle part au même endroit',
        body: 'Un audit sur papier, un écart dans un tableur, une photo dans une messagerie. Reconstituer ce qui s’est passé sur une ligne demande d’ouvrir trois systèmes et deux classeurs.',
      },
      {
        title: 'Un écart se sait trop tard',
        body: 'Entre le constat au poste et l’alerte au responsable, il se passe une relève d’équipe. Le temps que l’information remonte, le lot est déjà parti.',
      },
      {
        title: 'La conformité se prépare au lieu de se prouver',
        body: 'À l’approche d’un audit client ou d’une certification, les équipes reconstituent après coup des preuves qui auraient dû être produites au moment du contrôle.',
      },
    ],
  },

  shot: {
    caption:
      'Le tableau de bord CIPA : inspections du jour, écarts ouverts et actions correctives en attente de validation. Capture à remplacer par l’écran réel.',
  },

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    items: [
      {
        value: 'Temps réel',
        label: 'Escalade d’une anomalie vers le responsable',
        detail:
          'L’alerte part à la saisie du constat, pas à la relève d’équipe.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        value: '1',
        label: 'Système pour la qualité, la production et la maintenance',
        detail:
          'Une source de vérité unique, au lieu d’un tableur par service.',
        source: 'Périmètre couvert par CIPA',
      },
      {
        // TODO valider — chiffre non source. Tant qu'aucune mesure client ne
        // l'etaye, il s'affiche comme objectif de deploiement et ne doit pas
        // etre repris comme un resultat constate.
        value: '-30 %',
        label: 'Temps passé à préparer un audit client',
        detail: 'Les preuves sont extraites, plus reconstituées.',
      },
    ],
  },

  proof: {
    kind: 'integrations',
    title: 'CIPA se branche sur ce que vous',
    accent: 'avez déjà.',
    subtitle:
      'L’objectif n’est pas de remplacer votre ERP, mais d’éviter la double saisie et de garder une source de vérité unique.',
    items: [
      { name: 'ERP', category: 'Ordres de fabrication, articles, lots' },
      { name: 'MES', category: 'Événements de production, temps de cycle' },
      { name: 'GMAO', category: 'Équipements, interventions, historique' },
      { name: 'Outils de BI', category: 'Export des indicateurs CIPA' },
      { name: 'Bases de données métier', category: 'Référentiels et nomenclatures' },
    ],
    note: 'Les échanges se font par API ou par connecteur dédié, définis pendant la phase de cadrage. Le détail des connecteurs disponibles est sur la page Intégrations industrielles.',
  },

  faq: {
    title: 'Ce que les directeurs d’usine nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Faut-il tout déployer d’un coup ?',
        answer:
          'Non, et ce n’est pas ce que nous recommandons. Nous démarrons sur un processus à forte valeur — audits, inspections, non-conformités ou contrôles production — sur un périmètre restreint, généralement opérationnel en quelques semaines. L’extension aux autres processus et aux autres lignes se fait ensuite, une fois les premiers résultats constatés.',
      },
      {
        question: 'CIPA remplace-t-elle notre ERP, notre MES ou notre GMAO ?',
        answer:
          'Non. CIPA couvre ce que ces systèmes ne couvrent pas : le constat terrain, sa qualification, son escalade et le suivi de l’action corrective jusqu’à sa clôture. Elle se connecte à votre écosystème existant par API ou par connecteur dédié pour éviter les doubles saisies et conserver une source de vérité unique.',
      },
      {
        question: 'Les équipes terrain vont-elles réellement l’utiliser ?',
        answer:
          'C’est la question qui décide d’un déploiement, et elle se joue sur l’application mobile. Un constat se saisit en quelques appuis, au poste de travail, avec des cibles tactiles utilisables avec des gants. Un expert dédié accompagne la formation des équipes et la conduite du changement pendant les premières semaines.',
      },
      {
        question: 'Nos processus qualité sont spécifiques. Faut-il les adapter à l’outil ?',
        answer:
          'Non. Les checklists, les circuits d’escalade et les niveaux de validation se paramètrent pendant le cadrage à partir de vos référentiels existants. L’IA générative accélère cette étape en produisant une première version des checklists et des workflows à partir de vos documents, que vos équipes qualité corrigent ensuite.',
      },
    ],
  },

  flow,
  modules,
  solutions,
  surfaces,
  audiences,
}

