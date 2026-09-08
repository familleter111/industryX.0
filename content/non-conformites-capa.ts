/**
 * Non-conformités & CAPA — /solutions/non-conformites-capa.
 *
 * La page la plus importante de la rubrique Solutions. C'est le circuit que
 * tout le reste du produit alimente : un audit, une tournée qualité, un
 * événement ou un change control finissent tous en déviation, et une déviation
 * finit en action assignée.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LE BLOC « LE CHIFFRE QUE PERSONNE NE REGARDE » N'A PAS DE CHIFFRE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * C'est volontaire et c'est le point le plus delicat de la page. Un chiffre
 * pose la serait le plus visible du site, donc le premier repris en rendez-vous
 * et le premier a devoir etre defendu. Tant qu'il n'est ni mesure ni source,
 * l'argument tient mieux sans lui : « l'ecart est considerable » se discute,
 * « l'ecart est de 62 % » se verifie.
 *
 * TODO COMMERCIAL — fournir un chiffre client valide et anonymise pour
 * renforcer ce passage : le rapport entre actions correctives ouvertes et
 * actions reellement terminees et validees, sur un perimetre et une periode
 * nommes, avec l'accord du client sur la formulation anonymisee. Sans ces
 * quatre elements — valeur, perimetre, periode, accord — le bloc reste tel
 * qu'il est. Il fonctionne sans chiffre ; il ne survivrait pas a un chiffre
 * conteste.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  AUCUN COMPTEUR DANS LE PIPELINE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le bloc du circuit CAPA montre les six etats et rien d'autre. Un nombre de
 * dossiers par colonne, meme marque « donnees d'exemple », se recopie dans une
 * presentation client des la premiere capture d'ecran — la mention, elle, ne
 * survit pas au recadrage.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT — A VALIDER AVANT PUBLICATION
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - la liste exacte des sources de deviation. Quatre sont annoncees ici :
 *     audit, tournee qualite, evenement, change control. Confirmer qu'il n'y
 *     en a pas d'autre, et que ces quatre libelles sont ceux de l'interface ;
 *   - les six statuts d'une action — cree, demarre, valide, refuse, annule,
 *     termine — et surtout la difference entre « annule » et « refuse », que
 *     la page ne tente pas d'expliquer faute d'element valide ;
 *   - le pourcentage d'avancement : saisi par le pilote, ou deduit de
 *     sous-taches ? La page l'affiche comme un champ sans dire lequel des deux ;
 *   - la repartition par criticite : faible, moyenne, elevee. Trois niveaux
 *     seulement, ou une echelle plus fine reduite a trois a l'affichage ? ;
 *   - le rapport genere depuis l'ecran : format, perimetre, et s'il est
 *     parametrable ;
 *   - le lien reclamation vers lot puis lot vers controles : la page en fait un
 *     argument, il doit etre verifiable en demonstration.
 */

import {
  Activity,
  Building2,
  CheckCheck,
  EyeOff,
  FileOutput,
  Gauge,
  Hash,
  Link2,
  MapPin,
  Package,
  RotateCcw,
  ShieldCheck,
  UserSearch,
  Users,
} from 'lucide-react'

import type {
  MarketingPageContent,
  PipelineContent,
  RelatedContent,
  SolutionContent,
  StatementContent,
} from './types'

/**
 * La page remplace le visuel produit et le bloc de conformite par le circuit
 * CAPA et l'affirmation centrale. Elle n'a pas de bloc « ce que vous gagnez » :
 * l'argument de la page est justement qu'on ne peut pas encore le chiffrer.
 */
type CapaContent = Omit<
  MarketingPageContent,
  'shot' | 'proof' | 'outcomes'
> & {
  capa: SolutionContent
  statement: StatementContent
  pipeline: PipelineContent
  claims: SolutionContent
  related: RelatedContent
}

/* ── Le cycle de la déviation ──────────────────────────────────────────── */

const deviation: SolutionContent = {
  eyebrow: 'Le cycle de la déviation',
  title: 'Un écart n’est pas une phrase dans un cahier, c’est un',
  accent: 'dossier.',
  subtitle:
    'Ce qui rend une déviation exploitable n’est pas sa description : c’est ce qui l’entoure. Sans ces champs, deux écarts identiques déclarés à six mois d’intervalle restent deux histoires séparées.',
  items: [
    {
      icon: Hash,
      title: 'Une référence, et d’où elle vient',
      body: 'Chaque déviation porte sa référence propre et la source qui l’a produite. C’est ce qui permet, plus tard, de dire par quel canal les écarts remontent réellement.',
      points: [
        // TODO produit — liste exacte des sources, voir l'en-tete de fichier.
        'Audit, tournée qualité, événement ou change control',
        'Référence unique, reprise dans tous les échanges',
      ],
    },
    {
      icon: MapPin,
      title: 'Où, quoi, et contre quelle exigence',
      body: 'La zone concernée, la nature de l’écart et l’exigence à laquelle il contrevient. Trois champs qui transforment un constat en manquement caractérisé.',
      points: [
        'Zone et nature renseignées à la déclaration',
        'Exigence concernée rattachée au constat',
      ],
    },
    {
      icon: UserSearch,
      title: 'Qui l’a détectée, et quand',
      body: 'Le détecteur et la date de détection sont portés par le dossier, pas par la mémoire de la réunion suivante. Le statut, lui, dit où en est le traitement.',
      points: [
        'Détecteur nommé, date de détection horodatée',
        'Statut visible sans avoir à ouvrir le dossier',
      ],
    },
    {
      icon: Gauge,
      title: 'Une criticité, et sa répartition',
      body: 'Chaque déviation est qualifiée faible, moyenne ou élevée. La répartition entre les trois est affichée en permanence — c’est elle qui dit si la situation se dégrade, pas le volume brut.',
      points: [
        // TODO produit — trois niveaux, ou echelle plus fine reduite a trois ?
        'Qualification à la déclaration, révisable ensuite',
        'Répartition faible / moyenne / élevée toujours visible',
      ],
    },
  ],
}

/* ── Le cycle de l'action corrective ───────────────────────────────────── */

const capa: SolutionContent = {
  eyebrow: 'Le cycle de l’action corrective',
  title: 'Une action porte un nom, une date et un',
  accent: 'verdict.',
  subtitle:
    'C’est le point où la plupart des registres s’arrêtent : ils enregistrent qu’une action a été lancée. Celui-ci enregistre aussi ce qu’elle est devenue.',
  items: [
    {
      icon: Link2,
      title: 'Un objet CAPA référencé',
      body: 'L’action n’est pas un champ de la déviation, c’est un objet à part avec sa propre référence — relié à la déviation d’origine et à sa classification.',
      points: [
        'Rattachement à la déviation qui l’a déclenchée',
        'Classification en catégorie et sous-catégorie',
      ],
    },
    {
      icon: Users,
      title: 'Un ou plusieurs pilotes nommés',
      body: 'Pas « la maintenance » : des personnes. Avec une description de ce qui doit être fait, une échéance, une date de création et un avancement.',
      points: [
        // TODO produit — avancement : saisi par le pilote, ou deduit ?
        'Pilotes nommés, un ou plusieurs par action',
        'Échéance, date de création, pourcentage d’avancement',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Six statuts, dont deux qui ferment sans valider',
      body: 'Créé, démarré, validé, refusé, annulé, terminé. Une action ne se clôt pas parce que son pilote l’a déclarée faite : elle passe par un verdict.',
      points: [
        // TODO produit — difference exacte entre « annule » et « refuse ».
        'Créé, démarré, validé, refusé, annulé, terminé',
        'Le refus renvoie l’action à son pilote, motif à l’appui',
      ],
    },
    {
      icon: FileOutput,
      title: 'Tri et rapport depuis l’écran',
      body: 'Le tri par date de création ou par échéance donne les deux lectures qui comptent : ce qui traîne depuis longtemps, et ce qui va tomber en retard.',
      points: [
        // TODO produit — format et perimetre du rapport genere.
        'Tri par date de création ou par échéance',
        'Rapport généré depuis l’écran, sans export intermédiaire',
      ],
    },
  ],
}

/* ── L'affirmation centrale ────────────────────────────────────────────── */

const statement: StatementContent = {
  eyebrow: 'Ce que personne ne mesure',
  title: 'Le chiffre que personne ne',
  accent: 'regarde.',
  body: [
    'Dans la plupart des usines, l’écart entre le nombre d’actions correctives lancées et le nombre d’actions réellement terminées et validées est considérable.',
    'Ce n’est pas un défaut d’organisation exotique, c’est la norme. La différence, c’est que la plupart des usines ne le mesurent pas.',
    'CIPA rend ce ratio visible, nommé et daté — et c’est à partir de là qu’il se redresse.',
  ],
}

/* ── Le circuit CAPA ───────────────────────────────────────────────────── */

const pipeline: PipelineContent = {
  eyebrow: 'Le circuit',
  title: 'Les six états d’une action',
  accent: 'corrective.',
  subtitle:
    'Aucun compteur ici, et c’est délibéré : ce bloc montre la structure du circuit, pas son remplissage à un instant donné. Les vôtres se comptent dans la plateforme.',
  stages: [
    {
      name: 'Créé',
      hint: 'L’action existe et pointe vers sa déviation. Rien n’a encore commencé.',
    },
    {
      name: 'Démarré',
      hint: 'Un pilote l’a prise en charge. L’avancement se renseigne à partir d’ici.',
    },
    {
      name: 'En validation',
      hint: 'Le pilote estime avoir fini. Quelqu’un d’autre va regarder.',
    },
    {
      name: 'Validé',
      hint: 'Un valideur a tranché sur ce qui a été produit, pas sur la déclaration.',
    },
    {
      name: 'Refusé',
      hint: 'Le verdict est négatif. L’action repart avec son motif, l’écart reste ouvert.',
      terminal: true,
    },
    {
      name: 'Clôturé',
      hint: 'Le dossier est fermé et reste consultable avec tout son historique.',
      terminal: true,
    },
  ],
  caption:
    'Le refus n’est pas un incident de parcours : c’est un état prévu du circuit, et le seul qui empêche une action de se fermer sur une simple déclaration. C’est aussi lui qui rend le ratio ci-dessus mesurable.',
}

/* ── Réclamations clients ──────────────────────────────────────────────── */

const claims: SolutionContent = {
  eyebrow: 'Réclamations clients',
  title: 'Le même circuit, quand la plainte vient de',
  accent: 'l’extérieur.',
  subtitle:
    'Une réclamation client suit le circuit des déviations internes, avec les champs qui la rattachent à ce qui a été produit. C’est ce rattachement qui fait la différence entre répondre au client et lui prouver quelque chose.',
  items: [
    {
      icon: Building2,
      title: 'Qui réclame, et à propos de quoi',
      body: 'Référence de la réclamation, client, contact et date. La plainte cesse d’être un courriel dans une boîte partagée.',
      points: [
        'Référence propre, client et contact identifiés',
        'Date d’ouverture horodatée',
      ],
    },
    {
      icon: Package,
      title: 'Rattachée au lot et au produit',
      body: 'Référence de lot et référence produit sont portées par la réclamation. Le lot, lui, porte ses contrôles — la chaîne se remonte sans exhumer d’archive.',
      points: [
        // TODO produit — chaine reclamation vers lot vers controles :
        // verifiable en demonstration ?
        'Référence de lot et référence produit',
        'Du lot vers les contrôles réalisés dessus',
      ],
    },
    {
      icon: CheckCheck,
      title: 'Approuvée ou rejetée, et tracée',
      body: 'Une réclamation reçoit un statut — approuvée ou rejetée — au même titre qu’une action reçoit un verdict. Un rejet motivé vaut mieux qu’un dossier qui reste ouvert.',
      points: [
        'Statut approuvé ou rejeté, avec son auteur',
        'Actions correctives ouvertes depuis la réclamation',
      ],
    },
  ],
}

/* ── Renvois de fin de page ────────────────────────────────────────────── */

const related: RelatedContent = {
  eyebrow: 'Sur la plateforme',
  title: 'Ce qui fait tourner le',
  accent: 'circuit.',
  subtitle:
    'Le circuit ne s’anime pas tout seul et ne détecte pas les récurrences tout seul. Deux modules s’en chargent.',
  hrefs: [
    '/plateforme/orchestration',
    '/plateforme/intelligence-operationnelle',
  ],
}

export const nonConformitesCapa: CapaContent = {
  seo: {
    // 50 caracteres.
    title: 'CIPA — Non-conformités et actions correctives CAPA',
    // 143 caracteres.
    description:
      'Chaque déviation porte sa référence, sa criticité et son détecteur. Chaque action CAPA son pilote, son échéance, son avancement et son verdict.',
    path: '/solutions/non-conformites-capa',
  },

  hero: {
    eyebrow: 'Non-conformités & CAPA',
    title: 'Une déviation ouverte est une action assignée, datée et',
    accent: 'vérifiée',
    description:
      'Déclarer un écart ne suffit pas à le traiter. Ici, chaque déviation ouvre une action qui porte un pilote, une échéance et un verdict — et qui ne se ferme pas sans lui.',
    proofs: [
      'Déviation référencée, classée, datée et qualifiée',
      'Action pilotée, avec échéance et avancement',
      'Validation ou refus avant clôture, jamais l’un sans l’autre',
    ],
    image: {
      src: '/plateforme/01-dashboard-web-mobile.png',
      alt: 'Le tableau de bord CIPA sur un ordinateur portable, avec un panneau de non-conformités et leur criticité, et l’application mobile à côté.',
      width: 607,
      height: 450,
      caption:
        'Illustration de la plateforme. Les valeurs affichées sur les écrans sont des données d’exemple.',
    },
  },

  problem: {
    eyebrow: 'La situation aujourd’hui',
    title: 'Vous déclarez des écarts. Vous ne savez pas combien sont',
    accent: 'vraiment clos.',
    subtitle:
      'Beaucoup d’écarts déclarés, et aucune vue fiable sur ce qu’ils sont devenus. Les mêmes problèmes reviennent, et personne ne peut le prouver chiffres en main.',
    image: {
      src: '/CIPA_images_page/02_mobile_app_phone_factory.png',
      alt: 'L’application mobile CIPA affichant la liste des tâches d’un opérateur, dont une non-conformité, devant une unité de production.',
      width: 330,
      height: 255,
    },
    items: [
      {
        icon: EyeOff,
        title: 'Le taux de clôture réel est inconnu',
        body: 'Le registre dit combien d’actions ont été ouvertes. Il ne dit pas combien ont été menées à leur terme et vérifiées, parce que rien ne distingue « déclarée faite » de « validée ».',
      },
      {
        icon: Activity,
        title: 'L’effet de l’action n’est pas constaté',
        body: 'Une action est close, le dossier est rangé, et personne n’est retourné voir si l’écart avait cessé de se produire. Ce contrôle-là n’a pas d’endroit où exister.',
      },
      {
        icon: RotateCcw,
        title: 'Les récurrences ne se démontrent pas',
        body: 'Tout le monde sent que le même défaut revient. Le prouver demanderait de rapprocher des dossiers rédigés en texte libre par six personnes différentes — donc personne ne le fait.',
      },
    ],
  },

  solution: deviation,
  capa,
  statement,
  pipeline,
  claims,
  related,

  faq: {
    title: 'Ce que les responsables qualité nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Qu’est-ce qui empêche une action d’être clôturée à tort ?',
        answer:
          'Le fait que son pilote ne puisse pas la clôturer lui-même. Une action déclarée finie passe en validation, et c’est un tiers qui tranche sur ce qui a été produit. S’il refuse, l’action repart avec le motif du refus attaché au dossier et l’écart reste ouvert. C’est la seule mécanique qui rend un taux de clôture crédible : sans elle, le taux mesure des déclarations, pas des résultats.',
      },
      {
        // TODO produit — difference exacte entre « annule » et « refuse ».
        question: 'Quelle différence entre une action refusée et une annulée ?',
        answer:
          'Un refus porte sur le travail : ce qui a été fait ne répond pas à la déviation, l’action repart. Une annulation porte sur l’action elle-même : elle n’avait pas lieu d’être, ou une autre l’a remplacée. Les deux ferment le dossier sans le valider, et les deux sont tracés avec leur auteur et leur motif — c’est ce qui compte pour la relecture d’un auditeur.',
      },
      {
        question: 'Comment relie-t-on une réclamation client à sa cause ?',
        answer:
          'Par le lot. La réclamation porte une référence de lot et une référence produit ; le lot porte les contrôles réalisés dessus. On remonte donc de la plainte au dossier de fabrication sans avoir à demander une extraction à trois services. C’est aussi ce qui permet de dire à un client ce qui a été contrôlé, et quand, plutôt que de lui promettre une enquête.',
      },
      {
        question: 'Peut-on savoir si les mêmes causes reviennent ?',
        answer:
          'Oui, et c’est l’intérêt de classer les déviations plutôt que de les décrire. La catégorie, la sous-catégorie et le problème rendent deux écarts comparables même s’ils ont été déclarés par deux personnes qui ne les auraient pas formulés pareil. L’analyse des récurrences se fait sur cette classification, pas sur le texte libre — un champ de commentaire ne se compte pas.',
      },
    ],
  },
}
