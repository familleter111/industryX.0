/**
 * Intelligence opérationnelle — /plateforme/intelligence-operationnelle.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO JURIDIQUE — A TRANCHER AVANT TOUTE MISE EN LIGNE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le bloc gouvernance et deux questions de la FAQ portent des engagements
 * contractuels, pas des descriptions de fonctionnalites. Publier une phrase
 * fausse sur l'hebergement ou sur la reutilisation des donnees d'un client
 * industriel n'est pas une approximation marketing : c'est une declaration
 * opposable. Les points a faire valider par le juridique :
 *
 *   - la region d'hebergement, la duree de conservation et la liste des
 *     sous-traitants ;
 *   - l'engagement de non-reutilisation des donnees client pour entrainer un
 *     modele partage — le plus sensible de la page ;
 *   - la nature du modele employe et, s'il s'agit d'un fournisseur tiers, ce
 *     qui sort effectivement du perimetre du client. La reponse commande la
 *     formulation des deux premieres questions de la FAQ.
 *
 *  TODO PRODUIT
 *
 *   - la ponderation ajustable des criteres de priorisation ;
 *   - le comportement de l'assistant quand la donnee manque (repondre « je
 *     n'ai pas la donnee » plutot que de produire une reponse plausible) ;
 *   - le volume d'historique a partir duquel la detection de recurrences
 *     donne un resultat exploitable.
 */

import {
  FileText,
  Lightbulb,
  ListOrdered,
  MessagesSquare,
  Radar,
} from 'lucide-react'

import type {
  LimitsContent,
  MarketingPageContent,
  RelatedContent,
} from './types'

/** La page ajoute son bloc de limites a la structure commune. */
type IntelligenceContent = MarketingPageContent & {
  limits: LimitsContent
  related: RelatedContent
}

const limits: LimitsContent = {
  eyebrow: 'Cadrage',
  title: 'Ce que l’IA de CIPA ne fait',
  accent: 'pas.',
  items: [
    {
      title: 'Elle ne remplace pas la validation qualité.',
      body: 'Une sortie IA est une proposition. C’est une personne habilitée qui l’accepte, la corrige ou l’écarte — et ce choix est tracé.',
    },
    {
      title: 'Elle ne décide pas seule d’une libération de lot.',
      body: 'Aucune décision réglementée n’est automatisée. Le circuit de validation reste celui de vos procédures, avec les mêmes signatures.',
    },
    {
      title: 'Elle ne fonctionne pas sans données terrain structurées.',
      body: 'Sans relevés horodatés et rattachés à un équipement, il n’y a rien à rapprocher. La capture terrain vient d’abord, l’analyse ensuite.',
    },
  ],
}

const related: RelatedContent = {
  eyebrow: 'Par métier',
  title: 'Ce à quoi l’analyse',
  accent: 'sert.',
  subtitle:
    'Détecter une récurrence n’a d’intérêt que si quelqu’un s’en saisit. Deux pages où c’est le cas.',
  hrefs: [
    '/solutions/amelioration-continue',
    '/solutions/non-conformites-capa',
  ],
}

export const intelligenceOperationnelle: IntelligenceContent = {
  seo: {
    // 53 caracteres.
    title: 'CIPA — L’IA qui détecte vos écarts et signaux faibles',
    // 146 caracteres.
    description:
      'L’IA de CIPA détecte les récurrences, priorise les risques et rédige vos rapports d’audit. Elle propose et priorise ; la décision reste humaine.',
    path: '/plateforme/intelligence-operationnelle',
  },

  hero: {
    eyebrow: 'Intelligence opérationnelle',
    badge: 'IA',
    title: 'Détectez les écarts et signaux faibles grâce à',
    accent: 'l’IA',
    description:
      'L’IA lit vos relevés terrain, repère ce qui se répète et classe ce qui mérite d’être traité en premier. Elle propose et priorise ; la décision, elle, reste la vôtre.',
    proofs: [
      'Rapports d’audit rédigés à partir des relevés',
      'Récurrences et dérives signalées, avec leurs preuves',
      'Chaque sortie revue par une personne avant diffusion',
    ],
  },

  problem: {
    title: 'La donnée ne manque pas.',
    accent: 'Le temps de la lire, si.',
    items: [
      {
        title: 'Personne n’a le temps de tout relire',
        body: 'Plusieurs milliers de relevés par mois. Il faudrait un analyste à plein temps pour en tirer autre chose qu’un décompte d’écarts.',
      },
      {
        title: 'Le même problème revient sans qu’on le voie',
        body: 'Trois non-conformités séparées par six semaines, sur deux lignes différentes, c’est une cause commune. Dans un tableur, ce sont trois lignes parmi quatre cents.',
      },
      {
        title: 'La priorisation se fait à l’intuition',
        body: 'Ce qu’on traite en premier se décide en réunion, sur la mémoire des présents. Le choix est souvent juste ; rien ne permet de le vérifier.',
      },
    ],
  },

  solution: {
    title: 'Ce que l’IA fait de vos',
    accent: 'relevés.',
    subtitle:
      'Cinq usages, tous adossés à des données que vos équipes ont saisies — et tous consultables jusqu’au relevé d’origine.',
    items: [
      {
        icon: FileText,
        title: 'Rapports et synthèses générés',
        body: 'Le rapport d’audit est rédigé à partir des relevés, des écarts constatés et des preuves jointes. Vous relisez et corrigez au lieu de rédiger.',
        points: [
          'Rapport d’audit, synthèse de période, compte rendu d’inspection',
          'Chaque affirmation renvoie aux relevés qui l’étayent',
          'Produit en brouillon, jamais diffusé sans relecture',
        ],
      },
      {
        icon: Radar,
        title: 'Détection de récurrences et de dérives',
        body: 'Les non-conformités sont rapprochées par équipement, produit, équipe et période. Ce qui se répète remonte, même à faible fréquence.',
        points: [
          'Rapprochement sur l’équipement, le produit, l’équipe, la période',
          'Dérive lente signalée avant le franchissement du seuil',
          'Tout regroupement proposé s’ouvre relevé par relevé',
        ],
      },
      {
        icon: ListOrdered,
        title: 'Priorisation des risques',
        body: 'Les actions ouvertes sont classées selon la gravité, la récurrence et l’exposition. Le classement s’affiche avec la raison qui l’a produit.',
        points: [
          'Critères de classement explicites, pas un score opaque',
          '« Pourquoi celle-ci en premier » affiché avec chaque priorité',
          // TODO produit — ponderation ajustable des criteres : a confirmer.
          'Pondération des critères ajustable selon vos enjeux',
        ],
      },
      {
        icon: Lightbulb,
        title: 'Recommandations contextualisées',
        body: 'Dans le tableau de bord, à côté de l’indicateur concerné : ce qui semble en cause, et ce que des situations comparables ont demandé.',
        points: [
          'Affichées là où la décision se prend, pas dans un rapport séparé',
          'Toujours accompagnées des relevés qui les motivent',
          'Acceptée, écartée ou modifiée — le choix est enregistré',
        ],
      },
      {
        icon: MessagesSquare,
        title: 'Assistant conversationnel',
        body: 'Une question posée en français sur vos données qualité — « quels équipements ont concentré le plus de non-conformités ce trimestre ? » — et la réponse, avec les relevés derrière.',
        points: [
          'Réponse limitée au périmètre de droits de celui qui interroge',
          'Chaque réponse renvoie aux données qui la fondent',
          // TODO produit — comportement quand la donnee manque : a confirmer.
          'Pas de réponse plutôt qu’une réponse plausible quand la donnée manque',
        ],
      },
    ],
  },

  limits,

  shot: {
    caption:
      'Le tableau de bord : à côté de chaque indicateur, la recommandation proposée et les relevés qui la motivent. Capture à remplacer par l’écran réel.',
  },

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    items: [
      {
        value: 'Brouillon',
        label: 'État par défaut d’un rapport généré',
        detail: 'Rien ne sort de la plateforme sans qu’une personne l’ait relu.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        value: '100 %',
        label: 'Des sorties IA rattachées à leurs relevés d’origine',
        detail:
          'Une conclusion dont la preuve n’est pas consultable ne s’affiche pas.',
        source: 'Propriété du modèle de données',
      },
      {
        // TODO valider — chiffre non source. Affiche comme objectif de
        // deploiement tant qu'aucune mesure client ne l'etaye.
        value: '-70 %',
        label: 'Temps de rédaction d’un rapport d’audit',
        detail: 'Entre la rédaction depuis les notes et la relecture d’un brouillon.',
      },
    ],
  },

  proof: {
    kind: 'compliance',
    title: 'Gouvernance de',
    accent: 'l’IA.',
    subtitle:
      'Ce qu’un directeur d’usine doit pouvoir vérifier avant de laisser un modèle approcher ses données de production.',
    items: [
      {
        // TODO juridique — region d'hebergement, duree de conservation et
        // sous-traitants a confirmer avant mise en ligne.
        name: 'Où vivent vos données',
        body: 'La région d’hébergement, la durée de conservation et la liste des sous-traitants sont fixées au contrat, avant tout déploiement.',
      },
      {
        // TODO juridique — engagement de non-reutilisation. Point le plus
        // sensible de la page : ne rien publier ici sans validation ecrite.
        name: 'À quoi elles ne servent pas',
        body: 'Vos relevés ne servent pas à entraîner un modèle partagé avec d’autres clients.',
      },
      {
        name: 'Qui a demandé quoi',
        body: 'Chaque génération est journalisée : l’auteur de la demande, le périmètre interrogé et l’horodatage.',
      },
      {
        name: 'D’où sort une conclusion',
        body: 'Un rapport ou une recommandation conserve le lien vers les relevés qui l’ont produit, consultables un par un.',
      },
      {
        name: 'Qui l’a revue',
        body: 'Une sortie IA porte son statut — proposée, revue, validée — et le compte de la personne qui l’a traitée.',
      },
    ],
    note: 'Les engagements d’hébergement, de conservation et de non-réutilisation figurent au contrat de service et sont revus avec vos équipes juridiques pendant le cadrage.',
  },

  faq: {
    title: 'Ce que les directions qualité nous',
    accent: 'demandent.',
    items: [
      {
        // TODO juridique et produit — nature du modele employe. Si un
        // fournisseur tiers intervient, cette reponse doit le dire : elle
        // conditionne la credibilite de tout le bloc gouvernance.
        question: 'Sur quoi le modèle s’appuie-t-il ?',
        answer:
          'Sur vos données : les relevés saisis par vos équipes, vos référentiels d’équipements et de produits, et l’historique de vos non-conformités. L’IA ne raisonne pas sur un corpus générique d’autres industriels, et elle ne comble pas les trous — une conclusion qu’aucun relevé n’étaye n’est pas affichée. Les modalités techniques et contractuelles sont détaillées pendant le cadrage.',
      },
      {
        // TODO juridique — a aligner mot pour mot sur le contrat de service.
        question: 'Nos données de production sont confidentielles. Où vont-elles ?',
        answer:
          'Elles restent les vôtres. La région d’hébergement, la durée de conservation et la liste des sous-traitants sont fixées au contrat, et vos relevés ne servent pas à entraîner un modèle partagé avec d’autres clients. Ces engagements sont revus avec vos équipes juridiques avant le déploiement, pas après.',
      },
      {
        // TODO produit — volume d'historique necessaire a confirmer.
        question: 'À partir de quel volume de données l’IA devient-elle utile ?',
        answer:
          'Cela dépend de l’usage, et la distinction est importante. La génération de rapports fonctionne dès le premier audit : elle ne fait que restituer ce qui vient d’être saisi. La détection de récurrences, elle, demande un historique — quelques mois d’activité sur un périmètre donné avant que les rapprochements aient un sens. Nous vous le disons franchement lors du cadrage plutôt que de laisser l’outil produire du bruit.',
      },
      {
        question: 'Quel contrôle garde-t-on sur ce que l’IA produit ?',
        answer:
          'Le contrôle entier. Toute sortie est une proposition : un rapport naît en brouillon, une recommandation s’accepte, se modifie ou s’écarte, une priorisation se réordonne. Chacun de ces choix est enregistré avec son auteur. Aucune décision réglementée — libération de lot, clôture d’une non-conformité critique — n’est prise par le modèle.',
      },
    ],
  },

  related,
}
