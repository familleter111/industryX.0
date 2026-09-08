/**
 * Amélioration continue — /solutions/amelioration-continue.
 *
 * C'est la page qui porte le nom du produit : CIPA signifie Continuous
 * Improvement Process Audit, et le hero le dit explicitement. Point de
 * coherence de marque a ne pas retirer en reformulant.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  PAS DE CHIFFRE INVENTE SUR CETTE PAGE, ET C'EST STRUCTUREL
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le H1 promet un « progres mesurable ». Afficher a cote une amelioration
 * chiffree que personne n'a mesuree reviendrait a contredire l'argument dans
 * le meme ecran. Les trois resultats sont donc des proprietes constatables du
 * systeme, toutes sourcees.
 *
 * A INSERER quand l'equipe aura mesure : l'effet moyen constate d'une action
 * standardisee sur la recurrence d'un defaut, avec sa source. L'emplacement
 * prevu est le troisieme `Outcome` ci-dessous.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - la mesure avant / apres : la plateforme rapproche-t-elle reellement un
 *     indicateur de l'action qui devait l'infléchir, sur un meme perimetre ?
 *     C'est la promesse centrale de la page (capacite 3 et FAQ 2) ;
 *   - le canal de remontee d'idees et d'irritants par les operateurs : objet
 *     dedie, ou declaration d'ecart d'un type particulier ? ;
 *   - la diffusion d'un standard valide vers d'autres lignes ou sites.
 *
 *  TODO SOCIETE
 *
 *   - l'accompagnement lean d'Industry X.0 : prestation formalisee, incluse au
 *     deploiement ou facturee a part ? La capacite 5 et la FAQ 4 l'annoncent
 *     comme faisant partie du deploiement. A confirmer avec la direction avant
 *     publication — c'est un engagement commercial, pas une fonctionnalite.
 */

import {
  Compass,
  Database,
  LineChart,
  MessageSquareOff,
  MessageSquarePlus,
  MessagesSquare,
  RotateCw,
  Ruler,
  Share2,
  TrendingUp,
} from 'lucide-react'

import type {
  CalloutContent,
  MarketingPageContent,
  RelatedContent,
  PdcaContent,
} from './types'

/**
 * La page remplace le visuel produit par la boucle PDCA, et ajoute l'encart
 * qui replace le logiciel dans l'offre d'Industry X.0.
 */
type AmeliorationContent = Omit<MarketingPageContent, 'shot' | 'proof'> & {
  pdca: PdcaContent
  related: RelatedContent
  company: CalloutContent
}

const related: RelatedContent = {
  eyebrow: 'Sur la plateforme',
  title: 'Ce qui mesure, et ce qui',
  accent: 'repère.',
  subtitle:
    'Une boucle d’amélioration sans mesure est une réunion. Les deux modules ci-dessous fournissent l’indicateur et la détection des récurrences.',
  hrefs: [
    '/plateforme/tableaux-de-bord',
    '/plateforme/intelligence-operationnelle',
  ],
}

/* ── La boucle ─────────────────────────────────────────────────────────── */

const pdca: PdcaContent = {
  eyebrow: 'La boucle',
  title: 'Plan, Do, Check, Act —',
  accent: 'et ce que CIPA y fait.',
  subtitle:
    'La méthode n’est pas de nous et n’a pas besoin de l’être. Ce qui manque le plus souvent n’est pas le cadre, c’est la donnée qui permet de le tenir jusqu’au bout.',
  phases: [
    {
      letter: 'P',
      name: 'Plan',
      body: 'Identifier le problème qui mérite un chantier, comprendre pourquoi il se produit, et décider ce qu’on va tenter.',
      points: [
        'Écarts et récurrences remontés depuis le terrain',
        'Occurrences passées du même problème consultables',
        'Objectif et indicateur de succès posés dès l’ouverture',
      ],
    },
    {
      letter: 'D',
      name: 'Do',
      body: 'Mettre en œuvre l’action sur un périmètre défini, sans attendre qu’elle soit parfaite pour la tester.',
      points: [
        'Action nominative et datée, avec son périmètre explicite',
        'Nouveau standard poussé au poste concerné',
        'Exécution tracée par les relevés de la ligne',
      ],
    },
    {
      letter: 'C',
      name: 'Check',
      body: 'Mesurer l’effet réel, et non l’effet attendu. C’est l’étape que les démarches essoufflées sautent en premier.',
      points: [
        // TODO produit — rapprochement indicateur / action sur un meme
        // perimetre : promesse centrale de la page, a confirmer.
        'Indicateur suivi avant et après sur le même périmètre',
        'Vérification d’efficacité à une échéance fixée d’avance',
        'Récurrence du défaut surveillée après l’action',
      ],
    },
    {
      letter: 'A',
      name: 'Act',
      body: 'Standardiser ce qui a marché, abandonner ce qui n’a pas marché — et acter les deux avec la même rigueur.',
      points: [
        // TODO produit — diffusion d'un standard vers d'autres perimetres.
        'Standard retenu diffusé aux autres lignes et sites',
        'Checklists et plans de contrôle mis à jour en conséquence',
        'Décision d’abandon tracée au même titre qu’un succès',
      ],
    },
  ],
  loopNote:
    'Act referme la boucle : le standard retenu devient le point de départ du cycle suivant, sur un autre périmètre ou sur le problème d’après.',
}

/* ── Industry X.0 au-delà du logiciel ──────────────────────────────────── */

const company: CalloutContent = {
  icon: Compass,
  title: 'Industry X.0, au-delà du logiciel',
  // TODO societe — voir l'en-tete de fichier : l'accompagnement lean est
  // annonce ici comme faisant partie du deploiement. Engagement commercial a
  // confirmer avec la direction.
  body: 'Transformation digitale, IoT industriel, intelligence artificielle et lean management : CIPA est l’outil, nos équipes sont ce qui va avec. L’accompagnement lean fait partie du déploiement plutôt que d’une prestation vendue à côté.',
  cta: { label: 'Découvrir Industry X.0', href: '/about' },
}

export const ameliorationContinue: AmeliorationContent = {
  seo: {
    // 54 caracteres.
    title: 'CIPA — Amélioration continue : la boucle PDCA outillée',
    // 150 caracteres.
    description:
      'Boucle PDCA outillée, remontées terrain suivies jusqu’à leur réponse, effet des actions mesuré sur les indicateurs et standards diffusés entre sites.',
    path: '/solutions/amelioration-continue',
  },

  hero: {
    eyebrow: 'Amélioration continue',
    title: 'Transformez les problèmes en',
    accent: 'progrès mesurable',
    description:
      'CIPA signifie Continuous Improvement Process Audit : l’amélioration continue n’est pas un module de la plateforme, c’est ce pour quoi elle existe. Chaque écart saisi alimente la boucle censée le faire disparaître.',
    proofs: [
      'Boucle PDCA outillée jusqu’à la vérification d’efficacité',
      'Remontées terrain suivies jusqu’à leur réponse',
      'Effet des actions mesuré sur les indicateurs',
    ],
    image: {
      src: '/plateforme/11-bandeau-marque-cipa.png',
      alt: 'Le logotype CIPA sur fond sombre, accompagné de la signature « Des opérations plus sûres, plus efficaces, plus durables ».',
      width: 588,
      height: 302,
    },
  },

  problem: {
    eyebrow: 'Sur le terrain',
    title: 'Pourquoi une démarche d’amélioration',
    accent: 's’essouffle.',
    items: [
      {
        icon: Database,
        title: 'La démarche s’arrête faute de données',
        body: 'Les chantiers démarrent bien, les premiers résultats se voient, puis l’animation retombe. Sans mesure, il ne reste que la conviction de ceux qui y étaient.',
      },
      {
        icon: Ruler,
        title: 'Les chantiers ne sont pas mesurés',
        body: 'On sait ce qui a été mis en place. On ne sait pas ce que ça a changé, parce que l’indicateur d’avant n’a pas été relevé de la même façon que celui d’après.',
      },
      {
        icon: MessageSquareOff,
        title: 'Les remontées des opérateurs n’aboutissent pas',
        body: 'Une idée est proposée en réunion d’équipe, notée sur un tableau, effacée au tableau suivant. Au bout de trois fois, plus personne ne propose.',
      },
    ],
  },

  solution: {
    eyebrow: 'Ce que CIPA apporte',
    title: 'De la remontée terrain au standard',
    accent: 'diffusé.',
    subtitle:
      'Cinq mécanismes qui tiennent la boucle là où elle casse habituellement : à la mesure, et à la reprise de ce qui a marché ailleurs.',
    items: [
      {
        icon: RotateCw,
        title: 'Boucle PDCA outillée',
        body: 'De la détection d’un écart à la vérification de l’efficacité de l’action, chaque étape est un état du dossier plutôt qu’une case d’un tableau de suivi.',
        points: [
          'Détection, analyse, action et vérification dans un seul objet',
          'Échéance de vérification posée à l’ouverture de l’action',
          'Chantier impossible à clôturer sans son contrôle d’effet',
        ],
      },
      {
        icon: MessageSquarePlus,
        title: 'Remontée d’idées et d’irritants',
        body: 'Un opérateur signale ce qui le gêne depuis son poste, au moment où cela le gêne, sans attendre la réunion d’équipe du vendredi.',
        points: [
          // TODO produit — canal dedie ou type particulier de declaration ?
          'Signalement depuis le poste, en quelques appuis',
          'Réponse due à chaque remontée, y compris un refus motivé',
          'Auteur informé de la suite donnée à sa proposition',
        ],
      },
      {
        icon: LineChart,
        title: 'Mesure de l’effet réel',
        body: 'L’indicateur visé par un chantier est suivi avant et après, sur le même périmètre et avec la même définition. C’est ce qui distingue un progrès d’une impression.',
        points: [
          'Même définition d’indicateur des deux côtés de l’action',
          'Comparaison sur le périmètre concerné, pas sur le site entier',
          'Absence d’effet constatée aussi clairement qu’un gain',
        ],
      },
      {
        icon: Share2,
        title: 'Capitalisation entre lignes et sites',
        body: 'Un standard qui a fait ses preuves sur une ligne est proposé aux autres, avec les données qui montrent qu’il a fonctionné.',
        points: [
          'Standard diffusé avec ses preuves, pas comme une consigne',
          'Checklists et plans de contrôle mis à jour ensemble',
          'Reprise adaptable au contexte de chaque ligne',
        ],
      },
      {
        icon: Compass,
        // TODO societe — engagement commercial, voir l'en-tete de fichier.
        title: 'Accompagnement lean d’Industry X.0',
        body: 'L’outil ne fait pas la démarche. Nos équipes interviennent sur l’animation, le choix des premiers chantiers et la montée en compétence de vos référents.',
        points: [
          'Choix des premiers chantiers avec vos équipes',
          'Animation et rituels mis en place avec l’encadrement',
          'Montée en compétence de vos référents amélioration continue',
        ],
      },
    ],
  },

  pdca,

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    subtitle:
      'Trois propriétés du système, vérifiables en démonstration. Aucune amélioration chiffrée n’est avancée ici : sur une page qui promet du progrès mesurable, un chiffre non mesuré se contredirait lui-même.',
    items: [
      {
        icon: TrendingUp,
        value: 'Avant / après',
        label: 'Effet d’une action sur son indicateur',
        detail:
          'Mesuré sur le même périmètre et avec la même définition des deux côtés.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        icon: MessagesSquare,
        value: 'Tracée',
        label: 'Chaque remontée terrain, jusqu’à sa réponse',
        detail:
          'Y compris les idées écartées, avec le motif du refus et son auteur.',
        source: 'Modèle de données de la plateforme',
      },
      {
        icon: Share2,
        // ─────────────────────────────────────────────────────────────
        //  TODO — EMPLACEMENT DU CHIFFRE VALIDE
        //
        //  C'est ici que viendra l'effet moyen constate d'une action
        //  standardisee sur la recurrence d'un defaut : remplacer `value` par
        //  la valeur mesuree et renseigner `source`. Voir l'en-tete du fichier.
        // ─────────────────────────────────────────────────────────────
        value: 'Entre sites',
        label: 'Diffusion d’un standard validé',
        detail:
          'Ce qui a fonctionné sur une ligne est proposé aux autres, avec les données qui l’étayent.',
        source: 'Capitalisation des standards',
      },
    ],
  },

  related,
  company,

  faq: {
    title: 'Ce que les directions d’opérations nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Faut-il déjà avoir une démarche lean pour utiliser CIPA ?',
        answer:
          'Non, et c’est souvent l’inverse qui se produit : les sites qui n’ont pas de démarche formalisée commencent par traiter leurs écarts, et la démarche se construit sur ce qu’ils y découvrent. Si vous en avez déjà une, CIPA lui fournit la donnée qui lui manque plutôt que de lui substituer une méthode. Dans les deux cas, l’outil ne remplace pas l’animation — c’est un point sur lequel nous préférons être clairs avant qu’après.',
      },
      {
        // TODO produit — rapprochement indicateur / action. Cette reponse
        // porte la promesse centrale de la page.
        question: 'Comment mesure-t-on l’effet réel d’une action ?',
        answer:
          'En suivant l’indicateur visé avant et après, sur le même périmètre et avec la même définition. C’est cette dernière condition qui manque le plus souvent : quand l’indicateur d’avant vient d’un relevé manuel et celui d’après d’un export, la comparaison ne vaut rien. Ici les deux sont calculés sur les mêmes relevés. Et l’absence d’effet est affichée aussi nettement qu’un gain — un chantier sans résultat est une information utile.',
      },
      {
        question: 'Comment les remontées des opérateurs sont-elles traitées ?',
        answer:
          'Chaque remontée reçoit une réponse, y compris quand cette réponse est un refus. C’est la seule règle qui compte : une idée sans réponse coûte plus cher que pas d’idée du tout, parce qu’elle apprend à l’équipe que remonter ne sert à rien. L’auteur est informé de la suite donnée, et le motif d’un refus est écrit et conservé.',
      },
      {
        // TODO societe — perimetre exact de l'accompagnement.
        question: 'En quoi consiste l’accompagnement d’Industry X.0 ?',
        answer:
          'Nos équipes viennent de l’industrie avant de venir du logiciel. L’accompagnement porte sur le choix des premiers chantiers, la mise en place des rituels d’animation avec l’encadrement, et la montée en compétence de vos référents amélioration continue. Le périmètre exact et sa durée sont arrêtés au cadrage, en fonction de la maturité de vos équipes sur le sujet.',
      },
    ],
  },
}
