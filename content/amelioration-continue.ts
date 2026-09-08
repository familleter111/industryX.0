/**
 * Amélioration continue — /solutions/amelioration-continue.
 *
 * C'est la page qui porte le nom du produit : CIPA signifie Continuous
 * Improvement Process Audit, et le H1 le dit en toutes lettres. C'est le seul
 * endroit du site ou le sigle est developpe. Point de coherence de marque a ne
 * pas retirer en reformulant.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  L'ARGUMENT DE LA PAGE : UNE ACTION PEUT ETRE REFUSEE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * C'est ce qui separe la plateforme d'un registre d'actions, et c'est repris a
 * trois endroits : le sous-titre du bloc « la boucle », la troisieme capacite,
 * et le premier chiffre du bandeau. Si l'un des trois est reformule, les deux
 * autres doivent suivre — sinon la page affirme trois fois la meme chose de
 * trois manieres qui ne se recoupent plus.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  PAS DE CHIFFRE INVENTE SUR CETTE PAGE, ET C'EST STRUCTUREL
 * ─────────────────────────────────────────────────────────────────────────
 *
 * La page promet un progres mesurable. Afficher a cote une amelioration
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
 *   - le circuit d'approbation du change control : qui valide une montee de
 *     version, et selon quel niveau de criticite ? Le bloc ci-dessous dit que
 *     le module est distinct et relie aux actions, rien de plus ;
 *   - le pourcentage d'avancement d'une action : saisi a la main par le
 *     titulaire, ou deduit de sous-taches ? La page l'affiche comme un champ
 *     de l'action sans dire lequel des deux ;
 *   - la maille exacte du Pareto : categorie, sous-categorie et probleme sont
 *     annonces comme trois niveaux ; confirmer qu'ils sont bien hierarchiques
 *     et non trois axes independants ;
 *   - la mesure avant / apres : la plateforme rapproche-t-elle reellement un
 *     indicateur de l'action qui devait l'inflechir, sur un meme perimetre ?
 *
 *  TODO SOCIETE
 *
 *   - ADRESSE CONTRADICTOIRE. Le bloc « Industry X.0, au-dela du logiciel »
 *     annonce la societe « basee a l'Ariana ». Le pied de page affiche « Cité
 *     les pins, Tunis 1053 » (voir COMPANY dans content/shared.ts) et la page
 *     /about ecrit « Fondee en 2019 a Tunis ». Les deux ne peuvent pas etre
 *     vrais en meme temps : trancher, puis corriger les trois endroits ;
 *   - l'accompagnement methodologique : inclus au deploiement ou facture a
 *     part ? Le bloc societe et la FAQ 4 l'annoncent comme venant avec l'outil.
 *     C'est un engagement commercial, pas une fonctionnalite.
 */

import {
  BarChart3,
  CalendarClock,
  Compass,
  Database,
  GitBranch,
  History,
  ListChecks,
  MessageSquareOff,
  MessagesSquare,
  Ruler,
  ShieldCheck,
  Share2,
  Tags,
} from 'lucide-react'

import type {
  CalloutContent,
  MarketingPageContent,
  PdcaContent,
  RelatedContent,
  SolutionContent,
} from './types'

/**
 * La page ajoute a la structure commune : la boucle PDCA, le bloc change
 * control, et l'encart qui replace le logiciel dans l'offre d'Industry X.0.
 * Elle n'a ni visuel produit ni bloc de conformite.
 */
type AmeliorationContent = Omit<MarketingPageContent, 'shot' | 'proof'> & {
  changeControl: SolutionContent
  pdca: PdcaContent
  related: RelatedContent
  company: CalloutContent
}

/* ── La boucle, outillée de bout en bout ───────────────────────────────── */

const loop: SolutionContent = {
  eyebrow: 'La boucle',
  title: 'Du constat terrain au standard',
  accent: 'validé.',
  // Les trois phrases qui portent l'argument de la page. Voir l'en-tete.
  subtitle:
    'Ce qui sépare CIPA d’un registre d’actions tient en un mot : une action peut être refusée. Elle ne se ferme pas parce que son titulaire la déclare faite, mais parce qu’un valideur a regardé ce qui a été produit et a tranché. Un refus est un état normal du circuit — il rouvre l’action avec son motif, et cette trace reste attachée au dossier.',
  items: [
    {
      icon: Tags,
      title: 'Le constat devient une déviation classée',
      body: 'Un relevé terrain n’est pas un commentaire libre. Il est rangé en catégorie, sous-catégorie et problème — ce qui le rend comparable à tous les autres.',
    },
    {
      icon: CalendarClock,
      // TODO produit — pourcentage d'avancement : saisi ou deduit ?
      title: 'La déviation devient une action assignée',
      body: 'Un titulaire, une échéance, un pourcentage d’avancement. Un chantier sans ces trois-là n’existe pas dans le système.',
    },
    {
      icon: ShieldCheck,
      title: 'L’action est validée, ou refusée',
      body: 'Avant clôture, un valideur tranche sur ce qui a réellement été produit. Le refus rouvre l’action avec son motif au lieu de la faire disparaître.',
    },
    {
      icon: BarChart3,
      // TODO produit — maille du Pareto : trois niveaux hierarchiques ?
      title: 'Le Pareto dit si les causes reviennent',
      body: 'L’analyse par catégorie, sous-catégorie et problème classe les récurrences par poids, au lieu de les laisser se diluer dans le volume.',
    },
  ],
}

/* ── Change control ────────────────────────────────────────────────────── */

const changeControl: SolutionContent = {
  eyebrow: 'Change control',
  title: 'Une modification de processus est un',
  accent: 'dossier à part.',
  subtitle:
    'Le change control n’est pas un statut de plus sur une action : c’est un module distinct, relié aux actions dans les deux sens.',
  items: [
    {
      icon: GitBranch,
      // TODO produit — circuit d'approbation : qui valide, selon quelle
      // criticite ? Non decrit ici faute d'element valide.
      title: 'Un module distinct',
      body: 'La modification de processus a son propre dossier et son propre circuit, séparé de celui des actions correctives qu’elle peut entraîner.',
    },
    {
      icon: ListChecks,
      title: 'Qui génère ses propres actions',
      body: 'Une modification validée peut ouvrir des actions correctives, assignées et suivies exactement comme celles nées d’une déviation terrain.',
    },
    {
      icon: History,
      title: 'Et fait monter la version',
      body: 'Le processus change de version, et les actions produites par la modification lui restent rattachées. On sait ce qui a changé, et ce que ça a déclenché.',
    },
  ],
}

/* ── La boucle PDCA ────────────────────────────────────────────────────── */

const pdca: PdcaContent = {
  eyebrow: 'La méthode',
  title: 'Plan, Do, Check, Act —',
  accent: 'et ce que CIPA outille.',
  subtitle:
    'La méthode n’est pas de nous et n’a pas besoin de l’être. Ce qui manque le plus souvent n’est pas le cadre, c’est la donnée qui permet de le tenir jusqu’au bout. Sous chaque quadrant, ce que la plateforme y fait concrètement.',
  phases: [
    {
      letter: 'P',
      name: 'Plan',
      body: 'Décider ce qu’on va regarder, à quelle fréquence, et selon quelle grille de lecture.',
      points: [
        'Planificateur d’audit : qui audite quoi, et quand',
        'Classification en catégorie, sous-catégorie et problème',
      ],
    },
    {
      letter: 'D',
      name: 'Do',
      body: 'Aller voir, et enregistrer ce qu’on voit au moment où on le voit, pas le soir même de mémoire.',
      points: [
        'Capture terrain sur mobile ou tablette',
        'Déclaration de déviation au moment du constat',
      ],
    },
    {
      letter: 'C',
      name: 'Check',
      body: 'Mesurer l’effet réel, et non l’effet attendu. C’est l’étape que les démarches essoufflées sautent en premier.',
      points: [
        'Scoring de l’audit',
        'Analyse Pareto des récurrences',
        'Taux d’accomplissement des actions',
      ],
    },
    {
      letter: 'A',
      name: 'Act',
      body: 'Acter ce qui a marché comme ce qui n’a pas marché, et faire passer le processus à la version suivante.',
      points: [
        'CAPA avec validation ou refus avant clôture',
        'Montée de version du processus modifié',
      ],
    },
  ],
  loopNote:
    'Act referme la boucle : la version du processus qui sort d’un cycle est celle que le planificateur d’audit ira contrôler au suivant.',
}

/* ── Renvois de fin de page ────────────────────────────────────────────── */

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

/* ── Industry X.0 au-delà du logiciel ──────────────────────────────────── */

const company: CalloutContent = {
  icon: Compass,
  title: 'Industry X.0, au-delà du logiciel',
  // TODO societe — voir l'en-tete : « l'Ariana » contredit l'adresse du pied
  // de page et la page /about, qui disent Tunis. Et l'accompagnement annonce
  // comme venant avec l'outil est un engagement commercial a confirmer.
  body: 'Société technologique tunisienne fondée en 2019, basée à l’Ariana. Transformation digitale, IoT industriel, IA appliquée et lean management. CIPA est l’outil ; l’accompagnement méthodologique vient avec.',
  cta: { label: 'Découvrir Industry X.0', href: '/about' },
}

export const ameliorationContinue: AmeliorationContent = {
  seo: {
    // 52 caracteres.
    title: 'CIPA — Amélioration continue et boucle PDCA outillée',
    // 146 caracteres.
    description:
      'Déviation classée, action assignée avec échéance et avancement, validation ou refus avant clôture, analyse Pareto des récurrences, change control.',
    path: '/solutions/amelioration-continue',
  },

  hero: {
    eyebrow: 'Amélioration continue',
    // Le sigle developpe, seul endroit du site ou il l'est. Ne pas reformuler.
    title: 'CIPA, c’est Continuous Improvement Process Audit.',
    accent: 'Le nom dit la méthode.',
    description:
      'L’amélioration continue n’est pas un module de la plateforme, c’est ce pour quoi elle existe. Chaque écart saisi sur le terrain alimente la boucle censée le faire disparaître.',
    proofs: [
      'Déviation classée, action assignée, échéance et avancement',
      'Validation ou refus avant clôture — jamais l’un sans l’autre',
      'Pareto par catégorie, sous-catégorie et problème',
    ],
    image: {
      src: '/plateforme/11-bandeau-marque-cipa.png',
      alt: 'Le logotype CIPA sur fond sombre, accompagné de la signature « Des opérations plus sûres, plus efficaces, plus durables ».',
      width: 588,
      height: 302,
    },
  },

  problem: {
    eyebrow: 'La situation aujourd’hui',
    title: 'La démarche s’essouffle parce qu’elle n’est',
    accent: 'pas mesurée.',
    subtitle:
      'Les chantiers sont lancés, rarement vérifiés, jamais comparés. Ce qui manque n’est pas la volonté, c’est la donnée qui permettrait de dire lequel a servi.',
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

  solution: loop,
  changeControl,
  pdca,
  related,
  company,

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    subtitle:
      'Trois propriétés du système, vérifiables en démonstration. Aucune amélioration chiffrée n’est avancée ici : sur une page qui promet du progrès mesurable, un chiffre non mesuré se contredirait lui-même.',
    items: [
      {
        icon: ShieldCheck,
        value: 'Validée',
        label: 'Chaque action, avant sa clôture',
        detail:
          'Un titulaire ne ferme pas son action. Un valideur tranche, et peut refuser.',
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

  faq: {
    title: 'Ce que les directions d’opérations nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Qu’est-ce qu’une action refusée, concrètement ?',
        answer:
          'Une action dont le valideur estime que ce qui a été produit ne répond pas à la déviation. Elle ne se referme pas : elle repart avec le motif du refus attaché au dossier, et l’écart reste ouvert. C’est le point qui différencie la plateforme d’un registre d’actions, où « fait » est déclaré par celui-là même qui devait faire. Un refus n’est pas un incident de parcours, c’est un état prévu du circuit.',
      },
      {
        // TODO produit — maille du Pareto, voir l'en-tete de fichier.
        question: 'Sur quoi porte l’analyse Pareto ?',
        answer:
          'Sur la classification des déviations : catégorie, sous-catégorie et problème. C’est cette classification, posée au moment du constat, qui rend l’analyse possible — un champ de commentaire libre ne se compte pas. Le Pareto range ensuite les récurrences par poids, ce qui permet de choisir le chantier suivant sur le volume réel plutôt que sur le dernier incident marquant.',
      },
      {
        question: 'À quoi sert le change control s’il y a déjà les actions ?',
        answer:
          'Les deux ne traitent pas le même objet. Une action corrective répond à un écart constaté ; une modification de processus change la règle elle-même, et engage tout le monde après elle. Elle a donc son propre dossier, sa propre validation et sa propre montée de version. Le lien entre les deux est conservé : une modification peut générer ses actions, et ces actions restent rattachées à la version du processus qui les a produites.',
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
