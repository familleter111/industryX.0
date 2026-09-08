/**
 * Maintenance & sécurité — /solutions/maintenance-securite.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  REGLE EDITORIALE DE CETTE PAGE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Ton sobre et factuel, sans aucune formulation vendeuse. Concretement, deux
 * interdits tenus d'un bout a l'autre du fichier :
 *
 *  1. La page n'affirme nulle part que CIPA ameliore la securite, reduit les
 *     accidents ou previent un risque. Un logiciel enregistre, transmet et
 *     conserve ; ce sont des personnes et des mesures de prevention qui
 *     agissent sur le risque. Toute phrase qui laisse entendre le contraire
 *     est fausse, et sur ce sujet-la une phrase fausse coute autre chose
 *     qu'une deception commerciale.
 *
 *  2. Le bloc « ce que vous gagnez » ne porte AUCUN chiffre invente, alors
 *     que toutes les autres pages du site en portent un, signale comme
 *     objectif a valider. Un chiffre invente sur la securite au travail n'est
 *     pas rattrapable par une mention « a valider » : les trois valeurs sont
 *     donc des proprietes constatables du systeme, toutes sourcees.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - les permis de travail : formulaire dedie, ou formulaire generique avec
 *     circuit de validation ? Le probleme est nomme dans le bloc constat, la
 *     reponse doit etre exacte (capacite 1 et FAQ 2) ;
 *   - la relance automatique d'une alerte non prise en charge, et le niveau
 *     vers lequel elle remonte (FAQ 3) ;
 *   - le rattachement d'un constat a une zone ou a un equipement du
 *     referentiel, et la profondeur d'historique consultable (capacite 4).
 */

import {
  AlertTriangle,
  BellRing,
  ClipboardCheck,
  ClipboardX,
  FileText,
  History,
  ListChecks,
  ShieldCheck,
  Siren,
  Wrench,
} from 'lucide-react'

import type {
  LifecycleContent,
  LimitsContent,
  MarketingPageContent,
  RelatedContent,
} from './types'

/**
 * La page remplace le visuel produit par le parcours d'une alerte, et ajoute
 * un bloc de cadrage : sur ce sujet, dire ce que l'outil ne fait pas fait
 * partie de la description honnete de ce qu'il fait.
 */
type MaintenanceContent = Omit<MarketingPageContent, 'shot'> & {
  escalation: LifecycleContent
  limits: LimitsContent
  related: RelatedContent
}

const related: RelatedContent = {
  eyebrow: 'Sur la plateforme',
  title: 'Ce sur quoi cela',
  accent: 'repose.',
  subtitle:
    'La saisie au poste d’un côté, les circuits d’escalade de l’autre. Cette page décrit ce que les deux produisent une fois appliqués à la maintenance et à la sécurité.',
  hrefs: ['/plateforme/capture-terrain', '/plateforme/orchestration'],
}

/* ── Le parcours d'une alerte ──────────────────────────────────────────── */

const escalation: LifecycleContent = {
  eyebrow: 'Escalade en temps réel',
  title: 'Le parcours d’une situation',
  accent: 'dangereuse.',
  subtitle:
    'Six étapes, de la constatation au terrain jusqu’à la levée vérifiée. Les délais et les destinataires de chacune se paramètrent par zone et par niveau de gravité.',
  stages: [
    {
      title: 'Constat',
      body: 'Un opérateur ouvre un signalement depuis son poste, sans passer par un tiers.',
      owner: 'Opérateur',
    },
    {
      title: 'Photo',
      body: 'La preuve est prise dans l’application et reste attachée au signalement.',
      owner: 'Opérateur',
    },
    {
      title: 'Criticité',
      body: 'Le niveau de gravité renseigné détermine qui est prévenu, et sous quel délai.',
      owner: 'Opérateur',
    },
    {
      title: 'Notification',
      body: 'Le responsable désigné pour cette zone et ce niveau est prévenu à la saisie.',
      owner: 'Plateforme',
    },
    {
      title: 'Prise en charge',
      body: 'Une action de mise en conformité est ouverte, nominative et datée.',
      owner: 'Responsable',
    },
    {
      title: 'Vérification',
      body: 'La levée de la situation est constatée sur place avant la clôture.',
      owner: 'HSE',
    },
  ],
}

/* ── Ce que l'outil ne fait pas ────────────────────────────────────────── */

const limits: LimitsContent = {
  eyebrow: 'Cadrage',
  title: 'Ce que CIPA ne fait',
  accent: 'pas.',
  items: [
    {
      title: 'CIPA ne prévient pas un accident.',
      body: 'Il enregistre un constat, le transmet et en conserve la trace. Ce sont vos équipes et vos mesures de prévention qui agissent sur le risque.',
    },
    {
      title: 'CIPA ne remplace pas votre système de management de la sécurité.',
      body: 'Il ne se substitue ni à votre document unique, ni à votre analyse de risques, ni aux responsabilités qui vous incombent.',
    },
    {
      title: 'CIPA n’améliore rien à lui seul.',
      body: 'Une remontée n’a d’effet que si quelqu’un la traite. La plateforme rend visible ce qui ne l’est pas, et rappelle ce qui reste ouvert.',
    },
  ],
}

export const maintenanceSecurite: MaintenanceContent = {
  seo: {
    // 56 caracteres.
    title: 'CIPA — Maintenance et sécurité : rondes et interventions',
    // 139 caracteres.
    description:
      'Checklists de ronde sur mobile, signalement d’une situation dangereuse avec photo et alerte immédiate, suivi des actions jusqu’à clôture.',
    path: '/solutions/maintenance-securite',
  },

  hero: {
    eyebrow: 'Maintenance & sécurité',
    title: 'Digitalisez les interventions',
    accent: 'terrain',
    description:
      'Une ronde, un signalement, une intervention laissent chacun un enregistrement daté et attribué. Ce qui a été fait devient prouvable ; ce qui ne l’a pas été reste visible.',
    proofs: [
      'Rondes horodatées, point de contrôle par point de contrôle',
      'Situation dangereuse signalée avec photo, à la saisie',
      'Actions de mise en conformité suivies jusqu’à clôture',
    ],
    image: {
      src: '/plateforme/09-abstrait-site-industriel.png',
      alt: 'Une unité de production recomposée en aplats géométriques, traversée par des fragments de photographie.',
      width: 380,
      height: 302,
    },
  },

  problem: {
    eyebrow: 'Sur le terrain',
    title: 'Ce qui est fait, et ce qui peut',
    accent: 'être établi.',
    items: [
      {
        icon: ClipboardX,
        title: 'Les rondes sont faites mais pas prouvées',
        body: 'La tournée a eu lieu et le registre est signé en fin de poste. Rien n’indique à quelle heure chaque point a été vérifié, ni par qui.',
      },
      {
        icon: Siren,
        title: 'La remontée d’un presque-accident se perd',
        body: 'Elle est faite à l’oral au chef d’équipe, qui l’évoque en réunion la semaine suivante. Entre les deux, la situation n’a pas changé.',
      },
      {
        icon: Wrench,
        title: 'Les interventions de maintenance sont mal documentées',
        body: 'L’intervention est faite, la pièce changée. Six mois plus tard, ce qui a été remplacé et pourquoi n’est plus établi, et le diagnostic reprend de zéro.',
      },
      {
        icon: FileText,
        title: 'Le permis de travail circule sur papier',
        body: 'Rempli au bureau, signé en plusieurs exemplaires, il finit dans une poche. Vérifier qu’un permis valide couvre une intervention en cours suppose de retrouver la feuille.',
      },
    ],
  },

  solution: {
    eyebrow: 'Ce que CIPA apporte',
    title: 'Quatre enregistrements, et ce qu’ils',
    accent: 'permettent.',
    subtitle:
      'La plateforme ne modifie pas vos procédures de sécurité. Elle enregistre leur exécution, transmet ce qui doit l’être et conserve la trace de ce qui a suivi.',
    items: [
      {
        icon: ShieldCheck,
        title: 'Checklists de ronde et de sécurité sur mobile',
        body: 'La ronde se déroule point par point sur le téléphone, chaque vérification étant datée au moment où elle est faite plutôt qu’en fin de tournée.',
        points: [
          'Horodatage par point de contrôle, et non par tournée',
          'Une checklist par zone, par équipement ou par type de ronde',
          // TODO produit — permis de travail : formulaire dedie ou formulaire
          // generique avec circuit de validation ? Voir la FAQ 2.
          'Permis de travail saisi et validé comme un formulaire, avec ses signatures',
        ],
      },
      {
        icon: AlertTriangle,
        title: 'Signalement d’une situation dangereuse',
        body: 'Un opérateur ouvre un signalement depuis son poste, y joint une photo et renseigne un niveau de gravité. Le responsable désigné est prévenu à la saisie.',
        points: [
          'Photo prise dans l’application, attachée au signalement',
          'Destinataire déterminé par la zone et le niveau de gravité',
          'Presque-accident déclaré au même titre qu’un événement avéré',
        ],
      },
      {
        icon: ListChecks,
        title: 'Suivi des actions de mise en conformité',
        body: 'Chaque signalement retenu ouvre une action nominative avec son échéance. Son état est visible tant qu’elle n’est pas close.',
        points: [
          'Un titulaire nommé, jamais un service',
          'Levée de la situation vérifiée avant la clôture',
          'Actions ouvertes et en retard consultables par zone',
        ],
      },
      {
        icon: History,
        title: 'Historique par équipement ou par zone',
        body: 'Les interventions, les constats et les actions se consultent depuis l’équipement concerné, sur toute la période enregistrée.',
        points: [
          // TODO produit — rattachement au referentiel equipements et
          // profondeur d'historique consultable.
          'Constats et interventions rattachés au référentiel équipements',
          'Historique d’une machine consultable depuis le terrain',
          'Récurrences visibles sur une zone ou un équipement',
        ],
      },
    ],
  },

  escalation,
  limits,

  outcomes: {
    title: 'Ce que la plateforme',
    accent: 'établit.',
    subtitle:
      'Trois propriétés du système, vérifiables en démonstration. Aucun chiffre d’amélioration n’est avancé ici : ce serait affirmer un effet que le logiciel seul ne produit pas.',
    items: [
      {
        icon: ClipboardCheck,
        value: 'Horodatée',
        label: 'Chaque vérification d’une ronde',
        detail:
          'Un point non enregistré reste visible comme non fait, plutôt que couvert par une signature de fin de poste.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        icon: BellRing,
        value: 'À la saisie',
        label: 'Notification sur situation dangereuse',
        detail:
          'L’alerte part au moment du constat, sans attendre la fin de la ronde ni la relève.',
        source: 'Règles d’escalade paramétrées',
      },
      {
        icon: History,
        value: 'Par équipement',
        label: 'Historique des constats et des interventions',
        detail:
          'Consultable depuis la machine concernée, sur toute la période enregistrée.',
        source: 'Modèle de données de la plateforme',
      },
    ],
  },

  proof: {
    kind: 'compliance',
    eyebrow: 'Contenu d’un enregistrement',
    title: 'Ce que conserve une ronde ou une',
    accent: 'intervention.',
    subtitle:
      'De quoi établir, plus tard, ce qui a été vérifié, par qui, et ce qui en a découlé.',
    items: [
      {
        name: 'Le point de contrôle',
        body: 'L’élément vérifié, rattaché à son équipement ou à sa zone dans le référentiel.',
      },
      {
        name: 'L’heure et l’auteur',
        body: 'Renseignés par la plateforme au moment de la saisie, non déclarés en fin de tournée.',
      },
      {
        name: 'Le constat',
        body: 'Conforme, non conforme ou non applicable, avec le commentaire de l’intervenant.',
      },
      {
        name: 'La preuve',
        body: 'Photo ou vidéo prise dans l’application, attachée au point de contrôle concerné.',
      },
      {
        name: 'La suite donnée',
        body: 'Le signalement ouvert le cas échéant, l’action de mise en conformité et son titulaire.',
      },
      {
        name: 'La clôture',
        body: 'La vérification de la levée, sa date et la personne qui l’a constatée.',
      },
    ],
    note: 'Le contenu des checklists, les niveaux de gravité et les circuits d’alerte sont définis avec vos équipes HSE et maintenance pendant le cadrage, à partir de vos procédures existantes.',
  },

  related,

  faq: {
    title: 'Ce que les responsables HSE et maintenance nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Comment établit-on qu’une ronde a bien été faite ?',
        answer:
          'Chaque point de contrôle porte l’heure de sa vérification et le compte de l’intervenant, posés par la plateforme au moment de la saisie. Une tournée signée en fin de poste atteste que quelqu’un a signé ; une tournée enregistrée point par point indique ce qui a été vérifié et quand. C’est cette différence qui est opposable.',
      },
      {
        // TODO produit — permis de travail : formulaire dedie ou generique ?
        // Cette reponse doit etre exacte avant publication.
        question: 'Peut-on gérer les permis de travail dans CIPA ?',
        answer:
          'Un permis de travail est un formulaire assorti d’un circuit de validation et d’une durée de validité : la plateforme sait porter les trois. Le permis se remplit sur mobile, passe par les validations que vous avez définies et reste consultable depuis l’intervention qu’il couvre. Les modalités exactes se cadrent avec vos équipes HSE, en partant de vos formulaires actuels.',
      },
      {
        // TODO produit — relance automatique et niveau de remontee.
        question: 'Que se passe-t-il si le responsable ne prend pas l’alerte en charge ?',
        answer:
          'Le délai de prise en charge attendu est défini par niveau de gravité. Passé ce délai sans réponse, l’alerte remonte au niveau supérieur selon la règle d’escalade paramétrée pour la zone. L’absence de prise en charge est elle-même enregistrée : elle ne disparaît pas au profit d’une relance informelle.',
      },
      {
        question: 'Comment retrouve-t-on l’historique d’un équipement ?',
        answer:
          'Depuis l’équipement lui-même, dans le référentiel. Les rondes qui l’ont couvert, les constats qui le concernent, les interventions réalisées et les actions ouvertes s’affichent sur la même fiche, dans l’ordre chronologique. C’est ce qui évite de refaire un diagnostic déjà posé six mois plus tôt par quelqu’un d’autre.',
      },
    ],
  },
}
