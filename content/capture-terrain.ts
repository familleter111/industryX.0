/**
 * Capture terrain — /plateforme/capture-terrain.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CLAIMS PRODUIT A FAIRE VALIDER AVANT MISE EN LIGNE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Cette page decrit des comportements precis du produit. Plusieurs ne sont
 * etayes par aucune source interne connue au moment de l'ecriture : ils sont
 * plausibles pour une application de ce type, ce qui n'est pas la meme chose
 * qu'etre vrais. Chacun porte un `TODO produit` a l'endroit ou il est ecrit.
 * Les points a trancher :
 *
 *   - le fonctionnement hors connexion (FAQ 1) ;
 *   - les appareils supportes, et notamment l'absence d'iOS (FAQ 3) ;
 *   - les champs conditionnels, l'annotation des photos, l'accuse de prise en
 *     charge et la relance automatique (bloc capacites) ;
 *   - la conservation de la valeur precedente lors d'une correction (bloc
 *     conformite).
 *
 * Tant qu'ils ne sont pas confirmes, cette page ne doit pas etre publiee.
 */

import {
  BellRing,
  Camera,
  ClipboardList,
  Clock,
  EyeOff,
  FileSearch,
  Fingerprint,
  Hourglass,
  ImageIcon,
  MapPin,
  PenLine,
  Repeat,
  Sparkles,
  Timer,
  UserRound,
} from 'lucide-react'

import type {
  AnnotatedScreenContent,
  MarketingPageContent,
  RelatedContent,
} from './types'

/**
 * La page remplace le visuel produit standard par une maquette d'ecran
 * annotee : sur une page qui parle de saisie mobile, un cadre de navigateur
 * vide serait le mauvais objet a montrer.
 */
type CaptureContent = Omit<MarketingPageContent, 'shot'> & {
  screen: AnnotatedScreenContent
  related: RelatedContent
}

const screen: AnnotatedScreenContent = {
  eyebrow: 'Anatomie d’un constat',
  title: 'Ce que contient une ligne de',
  accent: 'checklist.',
  subtitle:
    'Une case cochée ne prouve rien. Ce qui rend un contrôle opposable, ce sont les quatre éléments que le système attache autour d’elle.',
  caption:
    'Écran de contrôle au démarrage de la ligne L3 : six des douze points sont faits, l’item « Température de consigne » est relevé à 78 °C pour une consigne de 60 à 65 °C, une photo lui est jointe et le responsable de ligne a été notifié à 9 h 41.',
  items: [
    {
      icon: Clock,
      title: 'L’heure du constat',
      body: 'Celle de la saisie au poste, pas celle de la ressaisie du soir. C’est la différence entre une trace et un souvenir.',
    },
    {
      icon: UserRound,
      title: 'L’opérateur',
      body: 'L’auteur du relevé, identifié par son compte. Personne n’a à écrire son nom dans une case libre.',
    },
    {
      icon: MapPin,
      title: 'Le poste et la ligne',
      body: 'Repris du référentiel équipements, donc écrits partout de la même façon. Un tableur, lui, accepte trois orthographes pour la même machine.',
    },
    {
      icon: ImageIcon,
      title: 'La preuve',
      body: 'La photo ou la vidéo reste attachée à l’item non conforme — pas au rapport, pas à une conversation.',
    },
  ],
}

const related: RelatedContent = {
  eyebrow: 'Par métier',
  title: 'Ce que la saisie terrain',
  accent: 'permet ensuite.',
  subtitle:
    'Une donnée saisie au poste ne vaut que par ce qu’on en fait. Deux usages où elle change quelque chose.',
  hrefs: [
    '/solutions/qualite-conformite',
    '/solutions/production-dossier-de-lot',
  ],
}

export const captureTerrain: CaptureContent = {
  seo: {
    // 56 caracteres.
    title: 'CIPA — Capture terrain : checklists et audits sur mobile',
    // 148 caracteres.
    description:
      'Remplacez les checklists papier par une saisie mobile horodatée : photo à l’appui, opérateur et poste rattachés, écart escaladé au responsable.',
    path: '/plateforme/capture-terrain',
  },

  hero: {
    eyebrow: 'Capture terrain',
    title: 'Digitalisez formulaires, audits et',
    accent: 'données terrain',
    description:
      'Le constat est saisi au poste de travail, sur smartphone ou tablette, avec sa photo et son horodatage. Plus de ressaisie le soir, plus de preuve introuvable trois mois plus tard.',
    proofs: [
      'Saisie au poste, sans ressaisie ultérieure',
      'Photo ou vidéo attachée au constat',
      'Opérateur, poste et horodatage automatiques',
    ],
    image: {
      src: '/CIPA_images_page/02_mobile_app_phone_factory.png',
      alt: 'L’application mobile CIPA affichant la liste des tâches d’un opérateur, devant une unité de production.',
      width: 330,
      height: 255,
    },
  },

  problem: {
    title: 'Ce que coûte la',
    accent: 'checklist papier.',
    items: [
      {
        icon: Repeat,
        title: 'Le contrôle est saisi deux fois',
        body: 'Une première fois sur papier au poste, une seconde le soir dans un tableur. La deuxième saisie prend du temps et introduit ses propres erreurs — celles que personne ne relira.',
      },
      {
        icon: EyeOff,
        title: 'L’écart est vu, mais pas tracé',
        body: 'Un opérateur repère une dérive et la signale à l’oral. L’équipe suivante n’en sait rien, et rien n’atteste que le constat a existé.',
      },
      {
        icon: FileSearch,
        title: 'Au moment du litige, la preuve manque',
        body: 'Un client conteste un lot. Le contrôle a bien eu lieu, mais il n’en reste qu’une case cochée : ni photo, ni heure, ni auteur.',
      },
      {
        icon: Hourglass,
        title: 'La donnée arrive trop tard pour agir',
        body: 'Le tableur consolidé est prêt le lundi matin. La dérive, elle, a duré tout le week-end.',
      },
    ],
  },

  solution: {
    title: 'Ce que la saisie mobile',
    accent: 'change.',
    subtitle:
      'Cinq mécanismes, tous orientés vers la même chose : que la donnée entre une seule fois, au bon endroit, avec ce qui la rend vérifiable.',
    items: [
      {
        icon: ClipboardList,
        title: 'Checklists et formulaires digitaux',
        body: 'Le formulaire s’ouvre au poste de travail sur smartphone ou tablette, dans l’ordre des opérations. Champs obligatoires, valeurs attendues et seuils sont posés au paramétrage.',
        points: [
          // TODO produit — champs conditionnels : comportement a confirmer.
          'Une réponse non conforme ouvre les champs de qualification',
          'Valeur hors seuil signalée à la saisie, pas à la relecture',
          'Un formulaire par poste, par ligne ou par équipement',
        ],
      },
      {
        icon: Camera,
        title: 'Photo et vidéo comme preuve',
        body: 'Une prise de vue faite depuis l’application reste attachée au constat. Elle n’a pas de vie propre dans une messagerie et ne peut plus être dissociée de sa ligne de contrôle.',
        points: [
          'Prise dans l’application, pas importée après coup',
          // TODO produit — annotation sur l'image : a confirmer.
          'Annotation possible sur l’image pour désigner le défaut',
          'Rattachée à l’item non conforme, pas au rapport global',
        ],
      },
      {
        icon: BellRing,
        title: 'Escalade en temps réel',
        body: 'Une non-conformité notifie le responsable au moment où elle est saisie, sans attendre la fin du contrôle ni la relève d’équipe.',
        points: [
          'Destinataire déterminé par la ligne, le poste et la gravité',
          // TODO produit — accuse de prise en charge et relance : a confirmer.
          'Prise en charge horodatée, visible de l’émetteur',
          'Relance automatique si l’échéance passe sans traitement',
        ],
      },
      {
        icon: Fingerprint,
        title: 'Métadonnées attachées à chaque saisie',
        body: 'Horodatage, opérateur, poste et ligne sont renseignés par le système et non par l’opérateur. C’est ce qui fait la différence entre une donnée et une preuve.',
        points: [
          'Posées par la plateforme, jamais saisies à la main',
          'Extraction du dossier de preuves par lot ou par période',
        ],
      },
      {
        icon: Sparkles,
        title: 'Checklists générées par IA',
        body: 'L’IA générative produit une première version de la checklist à partir de vos procédures et de vos formulaires existants. Vos équipes qualité corrigent au lieu de partir d’une page blanche.',
        points: [
          'Reprise de vos formulaires papier et de vos tableurs',
          'Contrôles manquants signalés au regard du référentiel',
          'Version proposée, jamais publiée sans validation humaine',
        ],
      },
    ],
  },

  screen,

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    items: [
      {
        icon: PenLine,
        value: '0',
        label: 'Ressaisie après le contrôle',
        detail: 'La donnée entre une seule fois, au poste de travail.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        icon: Clock,
        value: '100 %',
        label: 'Des relevés horodatés et attribués',
        detail:
          'Ni l’heure ni l’auteur ne dépendent de ce que l’opérateur veut bien écrire.',
        source: 'Propriété du modèle de données',
      },
      {
        icon: Timer,
        // TODO valider — chiffre non source. Il s'affiche comme objectif de
        // deploiement tant qu'aucune mesure client ne l'etaye, et ne doit pas
        // etre repris comme un resultat constate.
        value: '-40 %',
        label: 'Temps passé à remplir et consolider les contrôles',
        detail: 'Entre la checklist papier ressaisie et la saisie mobile.',
      },
    ],
  },

  proof: {
    kind: 'compliance',
    title: 'Ce qu’un auditeur peut',
    accent: 'vérifier.',
    subtitle:
      'Un contrôle digitalisé ne vaut que s’il tient devant quelqu’un qui le conteste. Voici ce que CIPA conserve pour chaque relevé.',
    items: [
      {
        name: 'Qui a réalisé le contrôle',
        body: 'Le compte de l’opérateur, posé par le système au moment de la saisie.',
      },
      {
        name: 'Quand il a eu lieu',
        body: 'L’horodatage du relevé sur le terrain, et non celui de son import dans un tableur.',
      },
      {
        name: 'Où, exactement',
        body: 'Poste, ligne et équipement repris du référentiel, écrits partout de la même façon.',
      },
      {
        name: 'Ce qui a été constaté',
        body: 'La valeur relevée, l’écart au seuil attendu, la photo ou la vidéo et le commentaire de l’opérateur.',
      },
      {
        // TODO produit — conservation de la valeur precedente : a confirmer.
        name: 'Ce qui a été corrigé',
        body: 'Une valeur modifiée conserve la précédente et l’auteur de la correction.',
      },
      {
        name: 'Ce qui en a découlé',
        body: 'L’action corrective, son responsable, son échéance et sa validation, rattachés au constat d’origine.',
      },
    ],
    note: 'CIPA fournit les éléments de preuve ; la conformité à un référentiel donné — ISO, GMP ou exigence client — s’établit lors du cadrage, au regard de vos propres procédures.',
  },

  faq: {
    title: 'Ce que les équipes terrain nous',
    accent: 'demandent.',
    items: [
      {
        // TODO produit — comportement hors connexion a confirmer avant mise
        // en ligne. C'est la premiere question que pose un directeur d'usine,
        // et une reponse fausse se retourne des la premiere demonstration.
        question: 'L’application fonctionne-t-elle sans réseau dans l’atelier ?',
        answer:
          'Oui. Les zones mal couvertes sont la règle plutôt que l’exception dans un atelier : l’application enregistre le relevé, ses métadonnées et ses pièces jointes sur l’appareil, puis les synchronise dès que la connexion revient. L’horodatage conservé est celui de la saisie sur le terrain, pas celui de la synchronisation — sans quoi la preuve perdrait sa valeur.',
      },
      {
        question: 'Combien de temps faut-il pour former un opérateur ?',
        answer:
          'Une prise en main courte suffit, parce que le formulaire suit l’ordre des opérations qu’il connaît déjà et qu’un relevé se saisit en quelques appuis. La difficulté n’est presque jamais l’application elle-même, mais le passage du signalement oral au constat écrit : c’est là que l’accompagnement de nos experts porte, pendant les premières semaines.',
      },
      {
        // TODO produit — liste des appareils supportes a confirmer, en
        // particulier l'absence d'iOS et la version Android minimale.
        question: 'Quels appareils sont supportés ?',
        answer:
          'Les smartphones et tablettes Android pour la saisie terrain, y compris les terminaux durcis utilisés en atelier. Le pilotage, lui, passe par un navigateur récent sur n’importe quel poste. Si votre parc comporte des appareils particuliers, nous le vérifions pendant le cadrage.',
      },
      {
        question: 'Peut-on repartir de nos formulaires papier existants ?',
        answer:
          'C’est le point de départ recommandé. Vos formulaires et vos procédures servent de source à l’IA générative, qui en produit une première version digitale ; vos équipes qualité la corrigent et la valident avant publication. Vous ne redessinez pas vos contrôles, vous les transposez — et la conduite du changement s’en trouve nettement allégée.',
      },
    ],
  },

  related,
}
