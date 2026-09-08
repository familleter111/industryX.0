/**
 * Qualité & conformité — /solutions/qualite-conformite.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO — REFERENTIELS NORMATIFS
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Aucune norme n'est nommee sur cette page, volontairement. Le texte parle de
 * « normes qualite et securite industrielles » et renvoie le detail au
 * cadrage.
 *
 * Avant d'afficher le moindre nom — ISO 9001, IATF 16949, GMP, HACCP, ISO
 * 45001, exigence client sectorielle — l'equipe qualite doit etablir la liste
 * exacte des referentiels que CIPA couvre, et surtout a quel titre : la
 * plateforme produit-elle les enregistrements exiges, ou pretend-elle a une
 * conformite ? Les deux affirmations n'engagent pas du tout la meme chose, et
 * un auditeur fera la difference.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - le verrouillage des enregistrements. Le brief demandait « horodates et
 *     infalsifiables » ; « infalsifiable » affirme une inviolabilite
 *     technique — scellement, journal en ajout seul — qui se prouve ou ne se
 *     dit pas. La page ecrit donc ce qui est mecaniquement descriptible : un
 *     enregistrement valide n'est plus modifiable, une correction conserve la
 *     valeur precedente et son auteur. A confirmer, et a durcir seulement si
 *     l'implementation le porte reellement ;
 *   - le blocage d'une version perimee de plan de controle ;
 *   - le rattachement d'une reclamation client aux lots concernes.
 *
 *  Le chiffre « -30 % » de preparation d'audit est le MEME que celui de
 *  content/plateforme.ts. Il n'est source ni ici ni la-bas : une seule
 *  validation doit couvrir les deux pages, sans quoi elles finiront par
 *  afficher deux valeurs differentes pour la meme promesse.
 */

import {
  CalendarClock,
  ClipboardList,
  Clock,
  EyeOff,
  FileLock2,
  FileSearch,
  FolderCheck,
  Route,
  Timer,
} from 'lucide-react'

import type {
  MarketingPageContent,
  RelatedContent,
  ScenarioContent,
} from './types'

/**
 * La page remplace le visuel produit par le scenario d'audit, et ajoute un
 * renvoi vers les deux pages Plateforme qui portent concretement ce qu'elle
 * decrit.
 */
type QualiteContent = Omit<MarketingPageContent, 'shot'> & {
  scenario: ScenarioContent
  related: RelatedContent
}

const related: RelatedContent = {
  eyebrow: 'Sur la plateforme',
  title: 'Ce qui porte tout cela,',
  accent: 'concrètement.',
  subtitle:
    'La qualité n’est pas un module à part : elle s’appuie sur la saisie terrain d’un côté et sur le pilotage de l’autre.',
  hrefs: ['/plateforme/capture-terrain', '/plateforme/tableaux-de-bord'],
}

const scenario: ScenarioContent = {
  eyebrow: 'Le jour de l’audit',
  title: 'Ce qui change, concrètement, quand un auditeur',
  accent: 'se déplace.',
  subtitle:
    'C’est la seule journée qui compte vraiment pour juger d’un système qualité. Voici les trois moments où la différence se voit.',
  beforeLabel: 'Aujourd’hui',
  afterLabel: 'Avec CIPA',
  moments: [
    {
      when: 'La semaine qui précède',
      before:
        'Deux personnes ressortent les classeurs, recoupent les tableurs et rappellent les chefs d’équipe pour reconstituer ce qui a été fait. C’est à ce moment-là qu’on découvre les trous, quand il est trop tard pour les combler.',
      after:
        'Le dossier est déjà constitué : il s’est rempli à chaque contrôle des mois précédents. La préparation consiste à choisir un périmètre et une période, puis à relire ce qui en sort.',
    },
    {
      when: 'Pendant la séance',
      before:
        'L’auditeur demande la preuve d’un contrôle sur un lot précis. Quelqu’un sort de la salle et revient dix minutes plus tard avec une photocopie — ou sans rien, et l’écart est ouvert.',
      after:
        'Le relevé s’ouvre à l’écran : sa date, son opérateur, son poste, sa photo. La question suivante arrive dans la minute, et l’entretien avance au rythme de l’auditeur.',
    },
    {
      when: 'Après la clôture',
      before:
        'Les écarts relevés sont notés dans un compte rendu. Leur suivi retombe sur une personne et une liste, et se réveille à l’approche de l’audit suivant.',
      after:
        'Chaque écart devient une action nominative avec son échéance. Le suivi est visible de tous, et la vérification d’efficacité est planifiée dès l’ouverture, pas promise pour plus tard.',
    },
  ],
}

export const qualiteConformite: QualiteContent = {
  seo: {
    // 55 caracteres.
    title: 'CIPA — Qualité et conformité : contrôles et traçabilité',
    // 148 caracteres.
    description:
      'Plans de contrôle digitalisés, enregistrements horodatés et traçabilité des actions correctives. Le dossier de preuve se constitue en continu.',
    path: '/solutions/qualite-conformite',
  },

  hero: {
    eyebrow: 'Qualité & conformité',
    title: 'Contrôles, audits et traçabilité',
    accent: 'sans papier',
    description:
      'Le dossier de preuve se constitue à mesure que les contrôles se font. Le jour de l’audit, il n’y a plus rien à reconstituer — seulement à extraire.',
    proofs: [
      'Plans de contrôle à jour, affichés au poste',
      'Enregistrement horodaté, attribué, avec sa preuve',
      'Écart, action corrective et clôture dans une seule chaîne',
    ],
    image: {
      src: '/plateforme/03-indicateurs-conformite.png',
      alt: 'Des cartes d’indicateurs qualité : courbe de tendance, histogramme et anneau de taux de conformité.',
      width: 364,
      height: 450,
      caption:
        'Illustration des indicateurs. Les valeurs affichées sont des données d’exemple.',
    },
  },

  problem: {
    eyebrow: 'Côté qualité',
    title: 'La conformité se prouve mal quand elle se prouve',
    accent: 'après coup.',
    items: [
      {
        icon: FileSearch,
        title: 'La preuve se reconstitue au lieu de s’extraire',
        body: 'Le contrôle a eu lieu, tout le monde en est sûr. Mais entre un classeur, un tableur et la mémoire d’un chef d’équipe, il faut une matinée pour l’établir — et parfois on n’y arrive pas.',
      },
      {
        icon: CalendarClock,
        title: 'L’audit client se prépare dans l’urgence',
        body: 'Trois semaines de mobilisation avant chaque visite, sur un travail qui ne produit rien de nouveau : il remet en forme ce qui existait déjà, quelque part.',
      },
      {
        icon: EyeOff,
        title: 'Des contrôles sont faits mais ne laissent pas de trace',
        body: 'Un opérateur vérifie, constate que tout est bon, passe à la suite. Rien ne l’atteste. Pour un auditeur, un contrôle non tracé est un contrôle qui n’a pas eu lieu.',
      },
    ],
  },

  solution: {
    eyebrow: 'Ce que CIPA apporte',
    title: 'Un système qualité qui se remplit',
    accent: 'tout seul.',
    subtitle:
      'Quatre mécanismes qui visent le même résultat : que la preuve existe au moment du contrôle, et non le jour où on la réclame.',
    items: [
      {
        icon: ClipboardList,
        title: 'Plans de contrôle digitalisés',
        body: 'Les gammes et les plans de contrôle vivent dans la plateforme et s’ouvrent au poste concerné, dans leur version en vigueur.',
        points: [
          'Une version par poste, par ligne ou par produit',
          'Valeurs attendues et seuils portés par le plan lui-même',
          // TODO produit — blocage d'une version perimee : a confirmer.
          'Une version périmée ne peut pas être remplie',
        ],
      },
      {
        icon: FileLock2,
        // TODO produit — le brief disait « infalsifiables ». Voir l'en-tete de
        // fichier : ce titre et ces points decrivent le mecanisme constatable,
        // a durcir seulement si l'implementation porte un vrai scellement.
        title: 'Enregistrements horodatés et verrouillés',
        body: 'Chaque contrôle produit un enregistrement daté, attribué à son auteur et rattaché à son lot ou à son équipement, que la plateforme renseigne elle-même.',
        points: [
          'Horodatage et auteur posés par le système, pas saisis',
          'Un enregistrement validé n’est plus modifiable',
          'Une correction conserve la valeur précédente et son auteur',
        ],
      },
      {
        icon: Route,
        title: 'Actions correctives et réclamations clients',
        body: 'Un écart interne et une réclamation client empruntent le même circuit : qualification, action nominative, vérification d’efficacité, clôture.',
        points: [
          'Une seule chaîne, du constat à la clôture',
          // TODO produit — rattachement d'une reclamation aux lots : a confirmer.
          'Réclamation rattachée aux lots et aux contrôles concernés',
          'Récurrences visibles d’un écart à l’autre',
        ],
      },
      {
        icon: FolderCheck,
        title: 'Dossier de preuve constitué en continu',
        body: 'Le dossier n’est pas un livrable qu’on fabrique avant une visite : c’est l’état de la plateforme à un instant donné, sur un périmètre donné.',
        points: [
          'Extraction par période, par ligne, par produit ou par lot',
          'Relevés, preuves photo, écarts et actions dans le même export',
          'Disponible tous les jours de l’année, pas seulement en mars',
        ],
      },
    ],
  },

  scenario,

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    items: [
      {
        icon: FolderCheck,
        value: 'En continu',
        label: 'Constitution du dossier de preuve',
        detail: 'Il se remplit à chaque contrôle, pas la semaine d’avant.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        icon: Clock,
        value: '100 %',
        label: 'Des contrôles horodatés et attribués',
        detail:
          'Un contrôle réalisé mais non tracé n’existe pas pour un auditeur.',
        source: 'Propriété du modèle de données',
      },
      {
        icon: Timer,
        // TODO valider — chiffre non source, et identique a celui de
        // content/plateforme.ts. Une seule validation pour les deux pages.
        value: '-30 %',
        label: 'Temps passé à préparer un audit client',
        detail: 'Les preuves sont extraites, plus reconstituées.',
      },
    ],
  },

  proof: {
    kind: 'compliance',
    eyebrow: 'Référentiels',
    title: 'Vos normes, vos procédures,',
    accent: 'vos exigences client.',
    subtitle:
      'CIPA n’impose pas de référentiel et ne prétend pas en délivrer la conformité. Il produit les enregistrements que le vôtre exige, sous une forme opposable.',
    items: [
      {
        name: 'Maîtrise documentaire',
        body: 'Le plan de contrôle affiché au poste est celui en vigueur ; les versions se succèdent sans se confondre.',
      },
      {
        name: 'Enregistrements de contrôle',
        body: 'Chaque relevé est daté, attribué et rattaché à son lot, son produit ou son équipement.',
      },
      {
        name: 'Traitement des écarts',
        body: 'Non-conformité, action corrective, vérification d’efficacité et clôture forment une chaîne unique et continue.',
      },
      {
        name: 'Réclamations clients',
        body: 'Une réclamation ouvre le même circuit qu’un écart interne, avec les mêmes exigences de traçabilité.',
      },
      {
        name: 'Piste d’audit',
        body: 'Créations, modifications et validations sont tracées avec leur auteur et leur horodatage.',
      },
      {
        name: 'Revue périodique',
        body: 'Indicateurs, écarts et actions d’une période s’extraient tels quels pour la revue de direction.',
      },
    ],
    // TODO qualite — voir l'en-tete de fichier. Ne nommer aucune norme avant
    // que la liste exacte des referentiels couverts soit etablie.
    note: 'La liste exacte des référentiels couverts — normes qualité et sécurité industrielles, exigences sectorielles, exigences client — est établie pendant le cadrage, au regard de vos procédures.',
  },

  related,

  faq: {
    title: 'Ce que les responsables qualité nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Un enregistrement CIPA est-il recevable lors d’un audit client ?',
        answer:
          'Ce qu’un auditeur regarde est toujours la même chose : qui a fait le contrôle, quand, sur quoi, et ce qui a été constaté. Un enregistrement CIPA porte ces quatre éléments, posés par le système et non saisis à la main, avec la preuve photo attachée et l’historique des modifications. La recevabilité au regard de votre référentiel précis s’établit pendant le cadrage, avec vos procédures sous les yeux.',
      },
      {
        question: 'Que deviennent nos plans de contrôle existants ?',
        answer:
          'Ils servent de point de départ. Vos gammes et vos plans actuels sont transposés tels quels — l’IA générative en produit une première version digitale que vos équipes qualité corrigent et valident. Vous ne redéfinissez pas vos contrôles, ce qui évite d’ouvrir un chantier de refonte qualité en même temps qu’un déploiement d’outil.',
      },
      {
        question: 'Comment les réclamations clients sont-elles traitées ?',
        answer:
          'Comme un écart interne, et c’est délibéré. Une réclamation ouvre le même circuit : qualification, recherche de cause, action corrective nominative, vérification d’efficacité, clôture. Elle se rattache aux lots et aux contrôles concernés, ce qui permet de répondre au client avec les relevés d’origine plutôt qu’avec une reconstitution.',
      },
      {
        question: 'Combien de temps avant d’avoir un dossier de preuve exploitable ?',
        answer:
          'Le dossier commence à se constituer dès le premier contrôle saisi — sur ce périmètre, il est exploitable immédiatement. En revanche, un dossier qui couvre une année d’activité demande une année de saisie : CIPA ne reconstitue pas le passé. C’est pourquoi nous recommandons de démarrer sur le périmètre qui sera audité en premier.',
      },
    ],
  },
}
