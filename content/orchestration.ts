/**
 * Orchestration des processus — /plateforme/orchestration.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CLAIMS PRODUIT A FAIRE VALIDER AVANT MISE EN LIGNE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Meme reserve que sur /plateforme/capture-terrain : plusieurs comportements
 * decrits ici sont plausibles pour une plateforme de ce type sans etre
 * etayes par une source interne. Chacun porte un `TODO produit`. A trancher :
 *
 *   - l'etendue du parametrage sans code, et ou passe exactement la frontiere
 *     avec une intervention technique (FAQ 1) ;
 *   - le modele de roles et de permissions — perimetres, delegation (FAQ 2) ;
 *   - la modification d'un circuit sans reprise des dossiers en cours ;
 *   - le transfert d'une action en cas d'absence, et sa trace ;
 *   - l'immuabilite d'une etape validee ;
 *   - la nature exacte de la signature electronique, qui commande ce que la
 *     note du bloc conformite peut affirmer.
 *
 * Tant qu'ils ne sont pas confirmes, cette page ne doit pas etre publiee.
 */

import {
  BellRing,
  CalendarClock,
  FileSignature,
  Mail,
  Send,
  Sparkles,
  Timer,
  UserCheck,
  UserX,
  Workflow,
} from 'lucide-react'

import type {
  LifecycleContent,
  MarketingPageContent,
  RelatedContent,
} from './types'

/**
 * La page remplace le visuel produit standard par la frise du cycle de vie :
 * sur une page qui parle d'enchainement, ce qu'il faut montrer est un
 * enchainement, pas une capture d'ecran.
 */
type OrchestrationContent = Omit<MarketingPageContent, 'shot'> & {
  lifecycle: LifecycleContent
  related: RelatedContent
}

const lifecycle: LifecycleContent = {
  eyebrow: 'De la détection à la clôture',
  title: 'Le cycle de vie d’une',
  accent: 'anomalie.',
  subtitle:
    'Les cinq étapes sont celles du cycle. Qui intervient à chacune, sous quel délai et avec quel niveau de validation se paramètre par processus.',
  stages: [
    {
      title: 'Détection',
      body: 'L’écart est constaté au poste et saisi avec sa preuve, son horodatage et son auteur.',
      owner: 'Opérateur',
    },
    {
      title: 'Qualification',
      body: 'Gravité, périmètre et récurrence sont établis. C’est ce qui détermine le circuit déclenché et les délais applicables.',
      owner: 'Responsable qualité',
    },
    {
      title: 'Action corrective',
      body: 'Une action nominative est ouverte, avec son titulaire, son échéance et son statut.',
      owner: 'Titulaire désigné',
    },
    {
      title: 'Vérification d’efficacité',
      body: 'On contrôle que l’écart ne réapparaît pas, à une échéance fixée dès l’ouverture de l’action.',
      owner: 'Qualité',
    },
    {
      title: 'Clôture',
      body: 'Le dossier se ferme sur une validation explicite, avec ses preuves et son historique complet.',
      owner: 'Validateur',
    },
  ],
}

const related: RelatedContent = {
  eyebrow: 'Par métier',
  title: 'Les circuits, appliqués à',
  accent: 'un métier.',
  subtitle:
    'Un workflow n’existe pas pour lui-même. Voici les deux processus où il se voit le plus.',
  hrefs: [
    '/solutions/non-conformites-capa',
    '/solutions/maintenance-securite',
  ],
}

export const orchestration: OrchestrationContent = {
  seo: {
    // 56 caracteres.
    title: 'CIPA — Orchestration des workflows qualité et production',
    // 147 caracteres.
    description:
      'Chaque constat déclenche une action assignée, datée et suivie. Workflows configurables, règles d’escalade, validation et signature électronique.',
    path: '/plateforme/orchestration',
  },

  hero: {
    eyebrow: 'Orchestration des processus',
    title: 'Pilotez vos workflows qualité et',
    accent: 'production',
    description:
      'Un écart détecté déclenche l’action prévue, chez une personne nommée, avec une échéance. Ce qui n’est pas fait se voit, et se relance sans que personne ait à y penser.',
    proofs: [
      'Action nominative, datée et suivie jusqu’à sa clôture',
      'Escalade et relance automatiques selon la gravité',
      'Validation et signature des étapes critiques',
    ],
    image: {
      src: '/plateforme/10-application-mobile-operation.png',
      alt: 'Un écran mobile de checklist entouré de fiches d’enregistrement et d’une confirmation d’opération réussie.',
      width: 508,
      height: 302,
    },
  },

  problem: {
    title: 'Un constat sans suite n’est',
    accent: 'qu’une note.',
    items: [
      {
        icon: Mail,
        title: 'Les actions correctives vivent dans les mails',
        body: 'Une décision prise en réunion, confirmée par un message, rappelée dans un fil de discussion. Six semaines plus tard, personne ne sait dire si elle a été appliquée.',
      },
      {
        icon: UserX,
        title: 'Personne n’en répond nommément',
        body: 'L’action est confiée « à la qualité » ou « à la maintenance ». Un service ne rate pas une échéance et ne rend pas de comptes : seule une personne le fait.',
      },
      {
        icon: BellRing,
        title: 'Les relances sont manuelles',
        body: 'Quelqu’un tient une liste et fait le tour des services le vendredi. Le jour où cette personne est en congé, le suivi s’arrête avec elle.',
      },
      {
        icon: CalendarClock,
        title: 'Rien ne dit ce qui est en retard',
        body: 'On connaît le nombre d’actions ouvertes. Leur âge, leur criticité et leur détenteur, non. Le retard se découvre à l’audit.',
      },
    ],
  },

  solution: {
    title: 'Ce qui transforme un constat en',
    accent: 'action suivie.',
    subtitle:
      'Cinq mécanismes qui répondent tous à la même question : qui fait quoi, pour quand, et que se passe-t-il si rien ne bouge.',
    items: [
      {
        icon: Workflow,
        title: 'Workflows configurables par processus',
        body: 'Un circuit par type d’événement : contrôle, non-conformité, réclamation client, intervention. Chacun a ses étapes, ses champs obligatoires et ses conditions de passage.',
        points: [
          'Étapes, champs et transitions définis processus par processus',
          'Plusieurs circuits en parallèle sur un même site',
          // TODO produit — reprise des dossiers en cours a confirmer.
          'Circuit modifiable sans reprendre les dossiers déjà ouverts',
        ],
      },
      {
        icon: BellRing,
        title: 'Règles d’escalade et de notification',
        body: 'Qui est prévenu, quand, et au bout de combien de temps sans réponse. Les règles se posent par rôle, par niveau de gravité et par délai — pas au cas par cas.',
        points: [
          'Destinataire déterminé par le rôle et le périmètre, jamais par un nom en dur',
          'Seuils de gravité propres à chaque processus',
          'Remontée au niveau supérieur dès que le délai est dépassé',
        ],
      },
      {
        icon: UserCheck,
        title: 'Attribution, échéance et statut',
        body: 'Chaque action porte un titulaire, une date et un statut. C’est la plus petite unité de suivi de la plateforme, et rien ne se referme sans passer par elle.',
        points: [
          'Un titulaire nommé, jamais un service',
          'Échéance dérivée de la gravité ou fixée à la main',
          // TODO produit — transfert en cas d'absence : a confirmer.
          'Transfert possible en cas d’absence, avec trace du passage de main',
        ],
      },
      {
        icon: FileSignature,
        title: 'Validation et signature électronique',
        body: 'Les étapes critiques demandent une validation explicite, tracée avec son auteur et son horodatage. Un dossier ne se clôt pas parce que personne n’a dit non.',
        points: [
          'Un ou plusieurs niveaux de validation selon la criticité',
          'Signature horodatée et attribuée à un compte',
          // TODO produit — immuabilite d'une etape validee : a confirmer.
          'Étape validée conservée dans l’état où elle a été signée',
        ],
      },
      {
        icon: Sparkles,
        title: 'Workflows générés par IA',
        body: 'L’IA générative propose un premier circuit à partir d’un mode opératoire existant : étapes, rôles, points de validation. Vos équipes ajustent au lieu de modéliser depuis une page blanche.',
        points: [
          'Lecture de vos modes opératoires et procédures en vigueur',
          'Étapes, rôles et validations proposés, jamais publiés sans revue',
          'Écarts au référentiel signalés pendant la revue',
        ],
      },
    ],
  },

  lifecycle,

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    items: [
      {
        icon: UserCheck,
        value: '0',
        label: 'Action ouverte sans titulaire ni échéance',
        detail: 'Le circuit ne permet pas d’en créer une anonyme.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        icon: Send,
        value: 'Automatique',
        label: 'Relance d’une action en retard',
        detail: 'Plus personne n’a à faire le tour des services le vendredi.',
        source: 'Règles d’escalade paramétrées',
      },
      {
        icon: Timer,
        // TODO valider — chiffre non source. Affiche comme objectif de
        // deploiement tant qu'aucune mesure client ne l'etaye ; ne pas le
        // reprendre comme un resultat constate.
        value: '-50 %',
        label: 'Délai moyen de clôture d’une non-conformité',
        detail: 'Entre un suivi par messagerie et un circuit outillé.',
      },
    ],
  },

  proof: {
    kind: 'compliance',
    title: 'Ce qu’une étape validée',
    accent: 'engage.',
    subtitle:
      'Une validation ne vaut que si l’on peut dire qui l’a donnée, quand, et sur quelle version du dossier.',
    items: [
      {
        name: 'Qui a validé',
        body: 'Le compte du validateur, et le rôle au titre duquel il est intervenu.',
      },
      {
        name: 'À quel moment',
        body: 'L’horodatage de la validation, distinct de celui du constat d’origine.',
      },
      {
        name: 'Sur quelle version',
        body: 'L’état du dossier au moment de la signature, pièces jointes comprises.',
      },
      {
        name: 'Selon quelle règle',
        body: 'Le circuit appliqué, ses niveaux de validation et les délais en vigueur ce jour-là.',
      },
      {
        name: 'Ce qui a suivi',
        body: 'L’action corrective, sa vérification d’efficacité et la décision de clôture, rattachées au même dossier.',
      },
    ],
    // TODO produit — cette note depend de la nature exacte de la signature
    // electronique implementee. Ne pas la publier avant confirmation.
    note: 'CIPA fournit les éléments de traçabilité et de signature ; leur acceptabilité au regard d’un référentiel donné — ISO, GMP, 21 CFR Part 11 ou exigence client — s’établit lors du cadrage, au regard de vos procédures et de votre politique d’authentification.',
  },

  faq: {
    title: 'Ce que les responsables qualité nous',
    accent: 'demandent.',
    items: [
      {
        // TODO produit — etendue reelle du parametrage sans code a confirmer,
        // et surtout ou passe la frontiere avec une intervention technique.
        question: 'Jusqu’où peut-on paramétrer sans écrire de code ?',
        answer:
          'Les étapes d’un circuit, les champs de chaque étape, les rôles qui interviennent, les seuils de gravité et les délais d’escalade se définissent depuis l’interface d’administration, sans développement. Ce qui sort de ce cadre — un calcul métier particulier, un échange avec un système tiers — passe par un paramétrage technique que nous réalisons pendant le cadrage.',
      },
      {
        // TODO produit — modele de roles, perimetres et delegation a
        // confirmer avant mise en ligne.
        question: 'Comment sont gérés les rôles et les permissions ?',
        answer:
          'Les droits se donnent par rôle et par périmètre — un site, une ligne, un atelier — et non utilisateur par utilisateur. Un responsable qualité voit les non-conformités de son périmètre, un opérateur ses propres relevés, la direction l’ensemble du site. Les règles d’escalade s’appuient sur ces mêmes rôles, ce qui évite d’avoir à reprendre les circuits à chaque mouvement de personnel.',
      },
      {
        question: 'Combien de temps pour mettre un premier workflow en service ?',
        answer:
          'Quelques semaines pour un premier circuit sur un processus à forte valeur — non-conformité ou réclamation client, le plus souvent. L’essentiel du délai n’est pas le paramétrage mais la mise d’accord sur le processus lui-même : qui qualifie, qui valide, sous quel délai. C’est aussi ce qui rend l’exercice utile, indépendamment de l’outil.',
      },
      {
        question:
          'Notre processus est maison et ne ressemble à aucun standard. Est-ce un problème ?',
        answer:
          'Non, c’est le cas courant. CIPA n’impose pas de circuit type : le vôtre est modélisé tel qu’il est, à partir de votre mode opératoire existant, que l’IA générative traduit en une première version de workflow. Vos équipes la corrigent avant publication. Si l’exercice fait apparaître des zones grises dans le processus, elles étaient déjà là — l’outil les rend simplement visibles.',
      },
    ],
  },

  related,
}
