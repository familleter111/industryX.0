/**
 * Intégrations industrielles — /plateforme/integrations.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  REGLE EDITORIALE DE CETTE PAGE : AUCUN NOM D'EDITEUR
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Rien ici ne nomme un logiciel, un editeur ni un connecteur. Uniquement des
 * familles de systemes. Un nom propre sur une page d'integration se lit comme
 * un connecteur livre et disponible : c'est verifiable en dix secondes en
 * demonstration, et c'est la premiere chose qu'une DSI ira tester.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT — A VALIDER AVANT PUBLICATION
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - la liste reelle des connecteurs existants, famille par famille. Les six
 *     categories ci-dessous decrivent ce vers quoi une plateforme de ce type
 *     s'interface ; elles n'attestent pas qu'un connecteur est livre pour
 *     chacune. C'est le point le plus important de cette page ;
 *   - la surface de l'API : objets exposes, mode d'authentification,
 *     pagination, et l'existence d'une documentation publiable ;
 *   - la liste des evenements reellement emis en webhook ;
 *   - le rapport d'import et son detail des lignes rejetees ;
 *   - l'existence et les modalites d'un environnement de test.
 *
 *  TODO JURIDIQUE
 *
 *   - les options d'hebergement et la region ;
 *   - l'engagement de reversibilite et le format d'export en fin de contrat ;
 *   - les protocoles d'authentification supportes.
 */

import {
  ArrowLeftRight,
  BarChart3,
  Boxes,
  Code2,
  Cpu,
  Factory,
  KeyRound,
  Layers,
  Plug,
  Repeat,
  Unplug,
  Webhook,
  Wrench,
} from 'lucide-react'

import type {
  BlockImage,
  CalloutContent,
  MarketingPageContent,
  RelatedContent,
  SolutionContent,
} from './types'

/**
 * La page pose deux blocs de capacites — les familles de systemes, puis les
 * interfaces qui permettent de s'y brancher — et un encart de relance. Elle
 * n'a pas de visuel produit : une page de plomberie n'a rien a montrer qu'une
 * capture d'ecran rendrait plus clair.
 */
type IntegrationsPageContent = Omit<MarketingPageContent, 'shot'> & {
  interfaces: SolutionContent
  callout: CalloutContent
  related: RelatedContent
  /**
   * Illustrations des blocs qui en portent une. Le hero range la sienne dans
   * `hero.image` : elle fait partie de son contenu, pas d'un lot a part.
   */
  images: {
    problem: BlockImage
    outcomes: BlockImage
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   ILLUSTRATIONS — CHOIX DES FICHIERS

   Les fichiers viennent de public/plateforme/. Trois des dix-huit y sont
   ecartes volontairement :

     - 03-indicateurs-conformite.png porte « 98 % Conformite » et « 112 % »
       incrustes dans l'image. Un chiffre grave dans un pixel echappe a toute
       relecture editoriale et se lit comme un resultat constate ;
     - 04 a 07 portent leur libelle en dur — « Audit qualite terrain », etc.
       Ces libelles ne sont pas ceux de cette page, et un texte incruste n'est
       ni traduisible ni lisible par une synthese vocale ;
     - 08-x montrent des secteurs industriels, sujet d'une autre page.

   TODO produit — confirmer que les ecrans montres sur 01 correspondent bien
   au produit livre. La legende dit deja que les chiffres sont des exemples ;
   elle ne couvre pas des ecrans qui n'existeraient pas.
   ═══════════════════════════════════════════════════════════════════════ */

const images = {
  problem: {
    src: '/plateforme/09-abstrait-site-industriel.png',
    alt: 'Une unité de production recomposée en aplats géométriques, traversée par des fragments de photographie.',
    width: 380,
    height: 302,
  },
  outcomes: {
    src: '/plateforme/02-inspection-terrain-tablette.png',
    alt: 'Un opérateur en casque et gilet haute visibilité remplit une inspection sur tablette, devant une installation industrielle.',
    width: 449,
    height: 450,
  },
} satisfies IntegrationsPageContent['images']

/* ═══════════════════════════════════════════════════════════════════════
   TODO PRODUIT — LISTE DES CONNECTEURS A VALIDER PAR L'EQUIPE PRODUIT

   Ces six entrees decrivent des FAMILLES de systemes et ce que CIPA echange
   avec chacune. Elles ne disent pas qu'un connecteur pret a l'emploi existe
   pour chaque famille. Avant publication, l'equipe produit doit trancher, pour
   chaque ligne : connecteur livre, integration sur mesure au cadrage, ou pas
   encore couvert — et la formulation doit suivre.
   ═══════════════════════════════════════════════════════════════════════ */

const categories: SolutionContent = {
  eyebrow: 'Catégories d’intégration',
  title: 'Les familles de systèmes que CIPA',
  accent: 'sait rejoindre.',
  subtitle:
    'Dans chaque cas, le référentiel reste chez lui. CIPA le lit et s’y rattache ; il ne le recopie pas et ne prétend pas le remplacer.',
  items: [
    {
      icon: Boxes,
      title: 'ERP',
      body: 'Ordres de fabrication, articles, lots et tiers. Un contrôle se rattache au lot réel plutôt qu’à un numéro retapé à la main.',
    },
    {
      icon: Factory,
      title: 'MES',
      body: 'Événements de production, temps de cycle, arrêts. Le relevé terrain se replace dans ce qui tournait au moment où il a été fait.',
    },
    {
      icon: Wrench,
      title: 'GMAO',
      body: 'Équipements, interventions et historique. Une anomalie constatée peut ouvrir une demande dans l’outil qui la traitera.',
    },
    {
      icon: BarChart3,
      title: 'BI et reporting',
      body: 'Les indicateurs CIPA alimentent vos tableaux de bord d’entreprise, avec les mêmes définitions des deux côtés.',
    },
    {
      icon: Cpu,
      title: 'IoT et capteurs',
      body: 'Mesures relevées automatiquement — température, pression, comptage — versées à côté des constats saisis par les équipes.',
    },
    {
      icon: KeyRound,
      title: 'Annuaire et SSO',
      body: 'Comptes, rôles et périmètres repris de votre annuaire. Aucun mot de passe supplémentaire à créer ni à révoquer.',
    },
  ],
}

const interfaces: SolutionContent = {
  eyebrow: 'Interfaces disponibles',
  title: 'Trois façons de brancher CIPA sur',
  accent: 'le reste.',
  subtitle:
    'Du temps réel au dépôt de fichier hebdomadaire. Le bon niveau est celui que votre DSI accepte de maintenir, pas le plus sophistiqué.',
  items: [
    {
      icon: Code2,
      title: 'API REST',
      body: 'Une interface documentée et authentifiée pour lire et écrire les objets de la plateforme : relevés, non-conformités, actions et référentiels.',
      points: [
        'Authentification par jeton, portée limitée aux droits accordés',
        'Filtrage et pagination sur les collections volumineuses',
        'Documentation remise au cadrage, avant tout développement',
      ],
    },
    {
      icon: Webhook,
      title: 'Webhooks sur événements',
      body: 'CIPA prévient vos systèmes quand quelque chose se produit, au lieu de les obliger à interroger la plateforme en boucle pour le découvrir.',
      points: [
        'Anomalie créée ou requalifiée',
        'Action corrective clôturée',
        'Seuil d’indicateur dépassé',
      ],
    },
    {
      icon: ArrowLeftRight,
      title: 'Imports et exports de fichiers',
      body: 'Quand une interface temps réel n’est ni nécessaire ni souhaitée : dépôt et extraction de fichiers, à la demande ou selon une programmation.',
      points: [
        'Import des référentiels depuis un fichier tabulaire',
        'Export programmé vers un dépôt que vous désignez',
        'Compte rendu d’import listant les lignes rejetées et leur motif',
      ],
    },
  ],
}

const callout: CalloutContent = {
  icon: Plug,
  title: 'Vous ne trouvez pas votre système ?',
  body: 'La grille ci-dessus décrit des familles de systèmes, pas un catalogue de connecteurs. Décrivez-nous le vôtre : nos équipes techniques vous disent ce qu’il faut pour l’interfacer — ou si ce n’est pas raisonnable.',
  cta: { label: 'Parler à un expert technique', href: '/contact' },
}

const related: RelatedContent = {
  eyebrow: 'Par métier',
  title: 'Ce que l’intégration rend',
  accent: 'possible.',
  subtitle:
    'Rattacher un constat à un lot ou à un équipement suppose de lire vos référentiels. Deux pages où cela se voit.',
  hrefs: [
    '/solutions/production-dossier-de-lot',
    '/solutions/qualite-conformite',
  ],
}

export const integrations: IntegrationsPageContent = {
  seo: {
    // 47 caracteres.
    title: 'CIPA — Intégrations ERP, MES, GMAO et outils BI',
    // 143 caracteres.
    description:
      'CIPA se connecte à vos ERP, MES, GMAO, outils de BI et capteurs. API REST, webhooks sur événements, imports de fichiers, SSO et gestion des rôles.',
    path: '/plateforme/integrations',
  },

  hero: {
    eyebrow: 'Intégrations industrielles',
    title: 'Connectez CIPA à vos ERP, MES et',
    accent: 'outils BI',
    description:
      'CIPA ne remplace aucun de vos systèmes. Il occupe la place que personne n’occupe : entre ce qui se passe sur la ligne et ce que votre SI sait déjà.',
    proofs: [
      'Aucune double saisie entre CIPA et vos systèmes',
      'API REST et webhooks sur les événements métier',
      'Comptes et rôles repris de votre annuaire',
    ],
    image: {
      src: '/plateforme/01-dashboard-web-mobile.png',
      alt: 'Le tableau de bord CIPA ouvert sur un ordinateur portable, et l’application mobile affichant une liste de tâches à côté.',
      width: 607,
      height: 450,
      caption:
        'Illustration de la plateforme. Les valeurs affichées sur les écrans sont des données d’exemple.',
    },
  },

  problem: {
    eyebrow: 'Côté SI',
    title: 'Trois raisons de se méfier d’un',
    accent: 'outil de plus.',
    items: [
      {
        icon: Repeat,
        title: 'Chaque système redemande ce que l’autre sait déjà',
        body: 'Le numéro de lot est dans l’ERP, l’équipement dans la GMAO, le contrôle sur papier. Quelqu’un finit par retaper les trois dans un quatrième fichier.',
      },
      {
        icon: Unplug,
        title: 'La qualité vit à côté du reste du SI',
        body: 'Les écarts et les actions correctives restent dans leur propre outil. Les rapprocher d’un ordre de fabrication ou d’un équipement demande un export et une matinée.',
      },
      {
        icon: Layers,
        title: 'La DSI ne veut pas d’un logiciel supplémentaire',
        body: 'Et elle a raison. Un outil qui ne s’interface avec rien devient un silo de plus, avec son référentiel, ses comptes et sa dette à lui.',
      },
    ],
  },

  solution: categories,
  interfaces,
  callout,
  images,

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    subtitle:
      'Une intégration réussie ne se voit pas : elle se mesure au travail qu’elle supprime. Les trois points ci-contre sont ceux que vos équipes constatent en premier.',
    items: [
      {
        value: '0',
        label: 'Ressaisie entre CIPA et vos systèmes',
        detail: 'Les référentiels sont lus là où ils vivent, jamais recréés.',
        source: 'Principe d’intégration de la plateforme',
      },
      {
        value: 'Temps réel',
        label: 'Notification de vos systèmes sur événement',
        detail:
          'Un webhook part quand l’événement se produit, sans interrogation en boucle.',
        source: 'Fonctionnement des webhooks',
      },
      {
        // TODO valider — chiffre non source. Affiche comme objectif de
        // deploiement tant qu'aucun projet mesure ne l'etaye.
        value: '4 à 6 sem.',
        label: 'Mise en service d’une première interface',
        detail: 'Entre le cadrage technique et le passage en production.',
      },
    ],
  },

  proof: {
    kind: 'compliance',
    eyebrow: 'Sécurité et déploiement',
    title: 'Ce que votre DSI va',
    accent: 'demander.',
    subtitle:
      'Les questions arrivent toujours dans le même ordre. Autant y répondre avant la réunion.',
    items: [
      {
        // TODO juridique — protocoles d'authentification supportes.
        name: 'Authentification',
        body: 'Connexion par votre fournisseur d’identité, sans compte local à créer ni mot de passe supplémentaire à faire tourner.',
      },
      {
        name: 'Rôles et périmètres',
        body: 'Les droits se donnent par rôle et par périmètre, et peuvent être alimentés depuis les groupes de votre annuaire.',
      },
      {
        // TODO juridique — options et region d'hebergement.
        name: 'Options d’hébergement',
        body: 'Le mode d’hébergement, la région et les engagements de conservation sont arrêtés au contrat, avant le déploiement.',
      },
      {
        name: 'Journalisation',
        body: 'Les accès et les modifications sont tracés, et exportables vers votre outil de supervision.',
      },
      {
        // TODO produit — existence et modalites d'un environnement de test.
        name: 'Environnement de test',
        body: 'Un environnement séparé, sur données non réelles, pour valider une interface avant de la passer en production.',
      },
      {
        // TODO juridique — engagement de reversibilite et format d'export.
        name: 'Réversibilité',
        body: 'Vos données restent extractibles dans un format ouvert, en cours comme en fin de contrat.',
      },
    ],
    note: 'Les modalités précises — protocoles d’authentification, région d’hébergement, engagements de réversibilité — sont arrêtées au contrat de service et revues avec votre DSI pendant le cadrage.',
  },

  faq: {
    title: 'Ce que les DSI nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Quel effort attendre côté DSI ?',
        answer:
          'Moins qu’on ne le craint, à condition de commencer petit. Un premier périmètre se met en service avec une ou deux interfaces — le référentiel des équipements et celui des produits, le plus souvent — et ne demande à vos équipes que d’ouvrir un accès et de valider un jeu de données. Le développement, quand il y en a, est de notre côté. Ce qui coûte réellement du temps est la mise d’accord sur les référentiels, pas la technique.',
      },
      {
        question: 'Quelles données sont synchronisées ?',
        answer:
          'Uniquement celles dont CIPA a besoin pour rattacher un constat à quelque chose de réel : équipements, lignes, produits, lots, ordres de fabrication et comptes utilisateurs. CIPA ne rapatrie pas votre ERP. Le périmètre exact est arrêté au cadrage, champ par champ, et il est plus court que ce à quoi la plupart des DSI s’attendent.',
      },
      {
        question: 'Dans quel sens va la synchronisation ?',
        answer:
          'Dans les deux, mais pas pour les mêmes données. Les référentiels descendent de vos systèmes vers CIPA, qui les lit sans jamais les modifier — leur source de vérité reste chez vous. Ce que CIPA produit, lui, remonte : constats, non-conformités, actions et indicateurs. Chaque flux a un sens unique et un propriétaire désigné, ce qui évite les conflits d’écriture et les boucles de mise à jour.',
      },
      {
        // TODO produit — existence d'un environnement de test a confirmer.
        question: 'Peut-on disposer d’un environnement de test ?',
        answer:
          'Oui. Un environnement séparé, alimenté par des données non réelles, permet à vos équipes de valider une interface, de rejouer un import et de vérifier le comportement d’un webhook avant toute mise en production. Aucune intégration ne part en production sans y être passée d’abord.',
      },
    ],
  },

  related,
}
