/**
 * Non-conformités & CAPA — /solutions/non-conformites-capa.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - la methode d'analyse de cause outillee : la plateforme propose-t-elle
 *     un cadre — cinq pourquoi, arbre des causes, Ishikawa — ou un champ
 *     libre structure ? La page dit « outillee », ce qui n'engage pas la meme
 *     chose selon la reponse (capacite 3 et FAQ 2) ;
 *   - la distinction action corrective / action preventive dans le modele de
 *     donnees : deux objets, ou un champ de qualification ? ;
 *   - l'accuse de reception date d'une reclamation client, et le calcul du
 *     delai de reponse ;
 *   - le rapprochement automatique d'une reclamation avec les ecarts internes
 *     portant sur les memes lots.
 *
 *  Le chiffre « -50 % » de delai de cloture est le MEME que celui de
 *  content/orchestration.ts, et c'est voulu : les deux pages font la meme
 *  promesse. Une seule validation doit couvrir les deux, sinon elles
 *  finiront par afficher deux valeurs pour un seul engagement.
 */

import {
  BadgeCheck,
  CirclePlus,
  FileText,
  Gauge,
  Inbox,
  ListChecks,
  Radar,
  Search,
} from 'lucide-react'

import type {
  MarketingPageContent,
  RelatedContent,
  SolutionContent,
} from './types'

/**
 * La page ajoute le circuit des reclamations clients a la structure commune.
 * Il occupe la place du bloc « integrations ou conformite » : sur une page
 * CAPA, la question qui reste apres les capacites n'est pas « est-ce que ca
 * s'interface » mais « est-ce que ca vaut aussi quand la plainte vient de
 * l'exterieur ».
 */
type CapaContent = MarketingPageContent & {
  claims: SolutionContent
  related: RelatedContent
}

const related: RelatedContent = {
  eyebrow: 'Sur la plateforme',
  title: 'Ce qui fait tourner le',
  accent: 'circuit.',
  subtitle:
    'Les circuits d’escalade d’un côté, la détection des récurrences de l’autre. Cette page décrit ce que les deux produisent appliqués aux écarts.',
  hrefs: [
    '/plateforme/orchestration',
    '/plateforme/intelligence-operationnelle',
  ],
}

/* ── Le circuit des réclamations clients ───────────────────────────────── */

const claims: SolutionContent = {
  eyebrow: 'Réclamations clients',
  title: 'Le même circuit, quand la plainte vient de',
  accent: 'l’extérieur.',
  subtitle:
    'Une réclamation n’est pas un objet à part : c’est un écart dont l’origine est externe, et dont quelqu’un attend la réponse à une date donnée.',
  items: [
    {
      icon: Inbox,
      title: 'Réception',
      body: 'La réclamation est enregistrée avec sa date de réception, son client, son motif et les lots ou références mis en cause.',
      points: [
        'Rattachement aux lots et aux contrôles concernés',
        // TODO produit — accuse de reception date et calcul du delai.
        'Délai de réponse fixé dès l’ouverture',
        'Origine externe distinguée d’un écart interne',
      ],
    },
    {
      icon: Gauge,
      title: 'Qualification',
      body: 'Criticité, périmètre et bien-fondé sont établis. C’est ce qui détermine le circuit appliqué et les délais qui courent.',
      points: [
        'Réclamation fondée ou non, la décision étant tracée',
        'Étendue aux autres lots potentiellement concernés',
        'Escalade selon la criticité, comme pour un écart interne',
      ],
    },
    {
      icon: Search,
      title: 'Analyse et action',
      body: 'La recherche de cause s’appuie sur les enregistrements du lot mis en cause, puis ouvre une action nominative et datée.',
      points: [
        'Accès direct aux relevés et aux preuves du lot',
        // TODO produit — rapprochement automatique avec les ecarts internes.
        'Écarts internes portant sur les mêmes lots rapprochés',
        'Action corrective et action préventive distinguées',
      ],
    },
    {
      icon: FileText,
      title: 'Réponse documentée',
      body: 'La réponse s’appuie sur les enregistrements d’origine plutôt que sur une reconstitution faite pour l’occasion.',
      points: [
        'Preuves extraites du dossier de lot, pas ressaisies',
        'Réponse et pièces jointes conservées avec la réclamation',
        'Délai de traitement mesuré de la réception à la réponse',
      ],
    },
  ],
}

export const nonConformitesCapa: CapaContent = {
  seo: {
    // 56 caracteres.
    title: 'CIPA — Non-conformités et CAPA : de l’écart à la clôture',
    // 152 caracteres.
    description:
      'Déclaration d’écart au poste, qualification, analyse de cause, plan d’action assigné et vérification d’efficacité avant clôture. Récurrences détectées.',
    path: '/solutions/non-conformites-capa',
  },

  hero: {
    eyebrow: 'Non-conformités & CAPA',
    title: 'Déclarez et traitez les écarts jusqu’à leur',
    accent: 'clôture',
    description:
      'Un écart déclaré ouvre un circuit qui va jusqu’à la vérification d’efficacité. Ce qui reste ouvert se voit, et ce qui revient est signalé.',
    proofs: [
      'Déclaration depuis le poste, en quelques secondes',
      'Action assignée, datée et suivie jusqu’à clôture',
      'Efficacité vérifiée avant de refermer le dossier',
    ],
  },

  problem: {
    eyebrow: 'Côté qualité',
    title: 'Déclarer un écart ne suffit pas à le',
    accent: 'traiter.',
    items: [
      {
        title: 'Les actions sont lancées, jamais vérifiées',
        body: 'Le plan d’action est écrit, l’écart passe en « traité ». Que la mesure ait produit l’effet attendu, personne ne l’a établi — et rien ne l’a demandé.',
      },
      {
        title: 'La cause racine n’est pas analysée',
        body: 'On corrige ce qu’on voit : la pièce, le réglage, le lot. La raison pour laquelle c’est arrivé reste hors du dossier, donc hors de portée.',
      },
      {
        title: 'Les mêmes défauts reviennent',
        body: 'Trois occurrences en huit mois, sur deux lignes différentes. Chacune a été traitée séparément, et personne n’a fait le lien entre elles.',
      },
      {
        title: 'Le stock d’actions en retard est invisible',
        body: 'On connaît le nombre d’écarts ouverts. Leur ancienneté, leur criticité et leur détenteur, non — jusqu’à la revue annuelle, ou l’audit.',
      },
    ],
  },

  solution: {
    eyebrow: 'Ce que CIPA apporte',
    title: 'Du constat à la vérification',
    accent: 'd’efficacité.',
    subtitle:
      'Six mécanismes qui répondent à une seule exigence : qu’un dossier ne puisse pas se refermer sur une action dont personne n’a contrôlé l’effet.',
    items: [
      {
        icon: CirclePlus,
        title: 'Déclaration en quelques secondes',
        body: 'Un opérateur ouvre un écart depuis son poste, avec sa photo et son contexte, sans passer par un formulaire de bureau ni par un tiers.',
        points: [
          'Saisie au poste, sur smartphone ou tablette',
          'Lot, équipement et ligne rattachés sans saisie manuelle',
          'Déclaration possible par tout opérateur, pas seulement la qualité',
        ],
      },
      {
        icon: Gauge,
        title: 'Qualification par criticité',
        body: 'Le niveau de gravité est établi à l’ouverture. Il détermine le circuit appliqué, les délais qui courent et les personnes prévenues.',
        points: [
          'Niveaux de gravité propres à chaque type d’écart',
          'Délais et destinataires dérivés de la criticité',
          'Requalification possible, avec sa trace',
        ],
      },
      {
        icon: Search,
        title: 'Analyse de cause outillée',
        body: 'La recherche de cause est une étape du circuit, pas un champ libre en fin de formulaire. Le dossier ne progresse pas tant qu’elle est vide.',
        points: [
          // TODO produit — cadre d'analyse propose : cinq pourquoi, arbre des
          // causes, Ishikawa, ou champ structure ? Voir la FAQ 2.
          'Cadre d’analyse guidé plutôt qu’un champ de commentaire',
          'Relevés et preuves du périmètre accessibles depuis le dossier',
          'Occurrences passées du même défaut présentées à l’analyste',
        ],
      },
      {
        icon: ListChecks,
        title: 'Plan d’action correctif et préventif',
        body: 'Chaque action porte un titulaire nommé, une échéance et un statut. Le correctif traite l’occurrence, le préventif traite sa cause.',
        points: [
          // TODO produit — correctif et preventif : deux objets ou un champ ?
          'Actions correctives et préventives distinguées',
          'Un titulaire nommé, jamais un service',
          'Relance automatique à l’approche de l’échéance',
        ],
      },
      {
        icon: BadgeCheck,
        title: 'Vérification d’efficacité avant clôture',
        body: 'Une échéance de vérification est posée à l’ouverture de l’action. Le dossier ne se ferme qu’après ce contrôle, effectué par une personne.',
        points: [
          'Échéance de vérification fixée dès l’ouverture',
          'Clôture impossible tant que la vérification n’est pas faite',
          'Réouverture du dossier si l’écart réapparaît',
        ],
      },
      {
        icon: Radar,
        title: 'Détection des récurrences',
        body: 'L’IA rapproche les écarts par équipement, produit, équipe et période, et remonte ce qui se répète — y compris à faible fréquence.',
        points: [
          'Rapprochements proposés, jamais appliqués sans revue',
          'Chaque regroupement s’ouvre écart par écart',
          'Dérive lente signalée avant qu’elle devienne un motif d’audit',
        ],
      },
    ],
  },

  shot: {
    caption:
      'Le suivi des non-conformités par état : ouvertes, en analyse, en action, en vérification, clôturées. Les compteurs affichés sont un exemple et ne proviennent d’aucun client.',
  },

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    items: [
      {
        value: 'Vérifiée',
        label: 'Efficacité de chaque action avant clôture',
        detail: 'Un dossier ne se referme pas sur une action non contrôlée.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        value: 'Par état',
        label: 'Stock d’actions visible en permanence',
        detail:
          'Ancienneté, criticité et détenteur de chaque action encore ouverte.',
        source: 'Modèle de données de la plateforme',
      },
      {
        // TODO valider — chiffre non source, et identique a celui de
        // content/orchestration.ts. Une seule validation pour les deux pages.
        value: '-50 %',
        label: 'Délai moyen de clôture d’une non-conformité',
        detail: 'Entre un suivi par messagerie et un circuit outillé.',
      },
    ],
  },

  proof: {
    kind: 'compliance',
    eyebrow: 'Contenu d’un dossier',
    title: 'Ce qu’un dossier CAPA',
    accent: 'conserve.',
    subtitle:
      'De quoi établir, des mois plus tard, ce qui s’est passé, ce qui a été décidé, et sur quelle base.',
    items: [
      {
        name: 'Le constat d’origine',
        body: 'Sa date, son auteur, son poste, sa preuve photo et le lot ou l’équipement concerné.',
      },
      {
        name: 'La qualification',
        body: 'Le niveau de criticité retenu, par qui, et les requalifications éventuelles avec leur motif.',
      },
      {
        name: 'L’analyse de cause',
        body: 'Le raisonnement conduit, les éléments consultés et la cause retenue au terme de l’analyse.',
      },
      {
        name: 'Les actions décidées',
        body: 'Correctives et préventives, avec leur titulaire, leur échéance et leur date de réalisation.',
      },
      {
        name: 'La vérification d’efficacité',
        body: 'Sa date, son auteur, ce qui a été contrôlé et la conclusion qui en a été tirée.',
      },
      {
        name: 'La décision de clôture',
        body: 'Sa date, son auteur, et l’état du dossier au moment où elle a été prise.',
      },
    ],
    note: 'Les niveaux de criticité, les délais applicables et les étapes de validation sont définis avec vos équipes qualité pendant le cadrage, à partir de vos procédures existantes.',
  },

  claims,
  related,

  faq: {
    title: 'Ce que les responsables qualité nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Un opérateur peut-il déclarer un écart, ou faut-il passer par la qualité ?',
        answer:
          'Il le peut, et c’est le point de départ de tout le reste : un écart qui doit transiter par un formulaire de bureau et par une personne disponible n’est déclaré qu’une fois sur deux. La déclaration se fait au poste, en quelques secondes. La qualification, elle, reste du ressort de la qualité — déclarer et qualifier sont deux gestes différents, portés par deux rôles différents.',
      },
      {
        // TODO produit — cadre d'analyse reellement propose. Cette reponse
        // engage la credibilite de la capacite « analyse de cause outillee ».
        question: 'Comment la cause racine est-elle analysée ?',
        answer:
          'L’analyse est une étape du circuit et non un champ de commentaire en fin de formulaire : le dossier ne passe pas à l’action tant qu’elle n’est pas renseignée. L’analyste dispose depuis le dossier des relevés du périmètre concerné et des occurrences passées du même défaut. Le cadre d’analyse retenu — et son degré de formalisme — se définit avec vos équipes pendant le cadrage, à partir de la méthode que vous pratiquez déjà.',
      },
      {
        question: 'Comment sait-on qu’une action a été efficace ?',
        answer:
          'Parce que quelqu’un est allé le vérifier, à une date fixée au moment où l’action a été ouverte. La plateforme n’en juge pas : elle impose que le contrôle ait lieu et empêche la clôture tant qu’il manque. Si l’écart réapparaît par la suite, le dossier peut être rouvert plutôt que redéclaré à zéro, ce qui conserve l’historique du traitement précédent.',
      },
      {
        question: 'Comment les récurrences sont-elles détectées ?',
        answer:
          'Par rapprochement des écarts sur l’équipement, le produit, l’équipe et la période. C’est un travail que personne ne fait à la main sur plusieurs centaines de dossiers, et c’est ce que l’IA propose ici. Les regroupements restent des propositions : chacun s’ouvre écart par écart, et c’est un responsable qualité qui décide s’il s’agit d’une cause commune ou d’une coïncidence.',
      },
    ],
  },
}
