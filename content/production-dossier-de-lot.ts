/**
 * Production & dossier de lot — /solutions/production-dossier-de-lot.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO — REFERENCES CLIENTS
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le bloc « secteurs » decrit des familles d'industries, et aucun client n'y
 * est nomme. Les logos visibles sur la page d'accueil (lib/data/clientLogos.ts)
 * correspondent bien a ces secteurs, mais un logo affiche dans une frise de
 * references n'autorise pas a ecrire, sur une page produit, qu'une entreprise
 * utilise CIPA pour son dossier de lot. Ce sont deux affirmations differentes,
 * et la seconde demande un accord ecrit.
 *
 * Avant de nommer le moindre client ici : accord de communication signe,
 * perimetre exact de ce qui peut etre dit, et validation de la formulation par
 * l'interesse.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - le controle de completude du dossier de lot : la plateforme signale-t-elle
 *     reellement une piece manquante pendant la production, et sur quelle
 *     regle ? C'est la promesse centrale de la page ;
 *   - le blocage de la liberation tant qu'un ecart est ouvert (FAQ 3) ;
 *   - la duree de conservation et les conditions de relecture d'un lot ancien
 *     (FAQ 4) — a croiser avec le TODO juridique de la page Intelligence
 *     operationnelle sur la conservation des donnees ;
 *   - la valeur reglementaire du dossier de lot electronique, qui conditionne
 *     ce que la FAQ 1 peut affirmer au secteur pharmaceutique.
 */

import {
  BadgeCheck,
  ClipboardCheck,
  FileStack,
  Factory,
  HeartPulse,
  History,
  Link2,
  Package,
  Utensils,
} from 'lucide-react'

import type {
  LifecycleContent,
  MarketingPageContent,
  RelatedContent,
  SolutionContent,
} from './types'

/**
 * La page remplace le visuel produit par la frise du lot, et ajoute deux
 * blocs : les secteurs ou un dossier de lot est un enjeu, et le renvoi vers
 * les modules qui le produisent.
 */
type ProductionContent = Omit<MarketingPageContent, 'shot'> & {
  lifecycle: LifecycleContent
  sectors: SolutionContent
  related: RelatedContent
}

const related: RelatedContent = {
  eyebrow: 'Sur la plateforme',
  title: 'Ce qui produit le dossier,',
  accent: 'en amont.',
  subtitle:
    'Un dossier de lot n’est pas un document que l’on rédige : c’est ce que la saisie terrain et les circuits qualité laissent derrière eux.',
  hrefs: ['/plateforme/capture-terrain', '/plateforme/orchestration'],
}

/* ── La frise du lot ───────────────────────────────────────────────────── */

const lifecycle: LifecycleContent = {
  eyebrow: 'Du démarrage de lot à la libération',
  title: 'Les points de contrôle, et où CIPA',
  accent: 'intervient.',
  subtitle:
    'L’enchaînement ci-dessous est le vôtre : CIPA ne le change pas. Il enregistre ce qui s’y passe, au moment où cela se passe.',
  stages: [
    {
      title: 'Démarrage de lot',
      body: 'Nettoyage, réglages et conformité du poste avant la première pièce.',
      owner: 'Conducteur de ligne',
      cipa: 'Checklist de démarrage sur tablette, rattachée au lot.',
    },
    {
      title: 'En cours de process',
      body: 'Prélèvements et relevés aux fréquences fixées par le plan de contrôle.',
      owner: 'Opérateur',
      cipa: 'Relevés horodatés, écart au seuil signalé à la saisie.',
    },
    {
      title: 'Écart en cours de lot',
      body: 'Un point hors seuil ouvre une non-conformité sans attendre la fin du lot.',
      owner: 'Qualité',
      cipa: 'Escalade immédiate, action corrective liée au lot.',
    },
    {
      title: 'Fin de lot',
      body: 'Contrôles de sortie et rassemblement des enregistrements produits.',
      owner: 'Conducteur de ligne',
      cipa: 'Dossier complété au fil de l’eau, pièces manquantes signalées.',
    },
    {
      title: 'Revue et libération',
      body: 'Vérification de la complétude, puis décision de libérer ou de bloquer.',
      owner: 'Responsable qualité',
      cipa: 'Revue outillée, décision tracée et signée.',
    },
  ],
}

/* ── Secteurs ──────────────────────────────────────────────────────────── */

const sectors: SolutionContent = {
  eyebrow: 'Secteurs',
  title: 'Là où un dossier de lot',
  accent: 'engage vraiment.',
  subtitle:
    'Le besoin est le même partout : prouver ce qui a été fait sur ce lot-là. C’est le niveau d’exigence, et ce qu’on risque à ne pas y répondre, qui change.',
  items: [
    {
      icon: Utensils,
      title: 'Agroalimentaire et boissons',
      body: 'Sécurité alimentaire, traçabilité amont-aval, contrôles de lot et maîtrise des dates limites.',
    },
    {
      icon: HeartPulse,
      title: 'Pharmaceutique et santé',
      body: 'Dossier de lot électronique, déviations, revue et libération sous exigence réglementaire forte.',
    },
    {
      icon: Factory,
      title: 'Industrie manufacturière',
      body: 'Maîtrise des paramètres process, contrôles en ligne et traçabilité des composants montés.',
    },
    {
      icon: Package,
      title: 'Emballage et conditionnement',
      body: 'Conformité des matières et des impressions, contrôles de conditionnement, traçabilité des bobines.',
    },
  ],
}

export const productionDossierDeLot: ProductionContent = {
  seo: {
    // 48 caracteres.
    title: 'CIPA — Production et dossier de lot électronique',
    // 140 caracteres.
    description:
      'Contrôles en ligne enregistrés, dossier de lot constitué au fil de l’eau, écarts rattachés au lot. Revue et libération outillées et tracées.',
    path: '/solutions/production-dossier-de-lot',
  },

  hero: {
    eyebrow: 'Production & dossier de lot',
    title: 'Structurez vos opérations critiques de',
    accent: 'production',
    description:
      'Le dossier de lot se construit pendant la production, pas après. À la revue, il ne reste plus à chercher ce qui manque — la plateforme l’a déjà signalé.',
    proofs: [
      'Contrôles de ligne enregistrés au poste',
      'Écarts rattachés au lot qui les a produits',
      'Revue de libération outillée et tracée',
    ],
  },

  problem: {
    eyebrow: 'En production',
    title: 'Le lot est bon. Le dossier,',
    accent: 'lui, est incomplet.',
    items: [
      {
        title: 'Le dossier de lot papier arrive incomplet',
        body: 'Une case non remplie, une signature manquante, un relevé illisible. On s’en aperçoit à la revue, quand le lot attend et que l’opérateur a fini son poste depuis trois jours.',
      },
      {
        title: 'Les contrôles en cours de process ne se consolident pas',
        body: 'Chaque prélèvement existe sur sa feuille. Suivre la dérive d’un paramètre sur la durée du lot demande de les aligner à la main — ce que personne ne fait en routine.',
      },
      {
        title: 'La libération attend qu’on retrouve les documents',
        body: 'Le lot est fabriqué, contrôlé, conforme. Il reste bloqué parce que trois enregistrements sont dans trois classeurs et qu’il faut d’abord les réunir.',
      },
    ],
  },

  solution: {
    eyebrow: 'Ce que CIPA apporte',
    title: 'Un dossier qui se remplit pendant que la ligne',
    accent: 'tourne.',
    subtitle:
      'Cinq mécanismes qui déplacent le travail de constitution du dossier : de la revue, où il coûte du temps et bloque un lot, vers la production, où il ne coûte rien.',
    items: [
      {
        icon: ClipboardCheck,
        title: 'Contrôles enregistrés en ligne de production',
        body: 'Les contrôles de démarrage, en cours de process et de fin de lot se saisissent au poste, sur tablette, dans l’ordre du plan de contrôle.',
        points: [
          'Fréquences et seuils portés par le plan de contrôle',
          'Valeur hors seuil signalée à la saisie, pas à la revue',
          'Chaque relevé rattaché au lot en cours sans saisie du numéro',
        ],
      },
      {
        icon: FileStack,
        title: 'Dossier de lot constitué au fil de l’eau',
        body: 'Le dossier n’est pas assemblé après coup : il est l’ensemble des enregistrements produits pendant le lot, consultable à tout moment.',
        points: [
          'Complété à chaque contrôle, du démarrage à la fin de lot',
          // TODO produit — controle de completude : promesse centrale de la
          // page, a confirmer avant publication.
          'Pièce manquante signalée pendant la production',
          'Consultable en cours de lot, pas seulement à la clôture',
        ],
      },
      {
        icon: Link2,
        title: 'Écarts rattachés au lot concerné',
        body: 'Une non-conformité ouverte en cours de fabrication reste liée au lot, à la ligne et au point de contrôle qui l’a révélée.',
        points: [
          'Lien conservé du constat jusqu’à la clôture de l’action',
          'Lots impactés identifiables depuis l’écart, et l’inverse',
          'Écarts visibles dans le dossier au moment de la revue',
        ],
      },
      {
        icon: BadgeCheck,
        title: 'Revue et libération outillées',
        body: 'Le réviseur voit l’état de complétude, les écarts ouverts et les contrôles hors seuil sur un même écran, puis décide.',
        points: [
          'État de complétude affiché avant la décision',
          'Décision de libération ou de blocage tracée et signée',
          'La décision reste humaine : rien ne libère un lot automatiquement',
        ],
      },
      {
        icon: History,
        title: 'Historique par lot, ligne ou période',
        body: 'Un lot se rouvre des mois plus tard avec ses relevés, ses écarts, ses preuves et ses décisions, dans l’état où ils ont été enregistrés.',
        points: [
          'Recherche par lot, par ligne, par produit ou par période',
          'Comparaison de plusieurs lots d’une même référence',
          'Export du dossier complet pour un client ou un auditeur',
        ],
      },
    ],
  },

  lifecycle,
  sectors,

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    items: [
      {
        value: 'Au fil de l’eau',
        label: 'Constitution du dossier de lot',
        detail: 'Il est complet quand le lot est fini, pas trois jours après.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        value: '0',
        label: 'Numéro de lot ressaisi à la main',
        detail: 'Chaque relevé se rattache au lot en cours tout seul.',
        source: 'Propriété du modèle de données',
      },
      {
        // TODO valider — chiffre non source. Affiche comme objectif de
        // deploiement tant qu'aucune mesure client ne l'etaye.
        value: '-2 j',
        label: 'Délai entre fin de fabrication et libération',
        detail: 'Entre la recherche des documents et leur consultation directe.',
      },
    ],
  },

  proof: {
    kind: 'compliance',
    eyebrow: 'Contenu du dossier',
    title: 'Ce qu’un dossier de lot CIPA',
    accent: 'contient.',
    subtitle:
      'Tout ce qu’un réviseur, un client ou un auditeur peut demander sur un lot précis, réuni sous une seule référence.',
    items: [
      {
        name: 'Les contrôles de démarrage',
        body: 'Nettoyage, réglages et conformité du poste, avec leur horodatage et leur auteur.',
      },
      {
        name: 'Les relevés en cours de process',
        body: 'Chaque prélèvement à sa fréquence, la valeur relevée et son écart au seuil attendu.',
      },
      {
        name: 'Les écarts et leur traitement',
        body: 'Non-conformités ouvertes sur le lot, actions correctives, décisions et clôtures.',
      },
      {
        name: 'Les preuves attachées',
        body: 'Photos, relevés d’appareil et commentaires, rattachés au point de contrôle concerné.',
      },
      {
        name: 'Les intervenants',
        body: 'Qui a produit, qui a contrôlé, qui a revu, qui a libéré — et à quel titre.',
      },
      {
        name: 'La décision de libération',
        body: 'Sa date, son auteur, son motif, et l’état du dossier au moment où elle a été prise.',
      },
    ],
    note: 'Le contenu exact du dossier et les règles de complétude sont définis avec vos équipes qualité pendant le cadrage, à partir de vos procédures existantes.',
  },

  related,

  faq: {
    title: 'Ce que les responsables de production nous',
    accent: 'demandent.',
    items: [
      {
        // TODO produit — valeur reglementaire du dossier electronique. Cette
        // reponse est lue en premier par le secteur pharmaceutique.
        question: 'Un dossier de lot électronique remplace-t-il notre dossier papier ?',
        answer:
          'C’est l’objectif, et c’est aussi une décision qui vous appartient : elle dépend de vos procédures et de ce que vos autorités et vos clients acceptent. Techniquement, le dossier CIPA porte les mêmes éléments que le dossier papier, avec en plus l’horodatage, l’identification de l’auteur et l’historique des modifications. La bascule se prépare pendant le cadrage, et beaucoup de sites fonctionnent en double pendant une période de recouvrement.',
      },
      {
        question: 'Que se passe-t-il si un enregistrement manque au moment de la revue ?',
        answer:
          'En principe, cela ne devrait plus arriver à ce moment-là : l’absence est signalée pendant la production, quand l’équipe concernée est encore au poste et peut la combler. Si un manque subsiste malgré tout, il est visible à l’écran de revue avec sa nature et son emplacement dans le lot — au lieu d’être découvert en feuilletant un classeur.',
      },
      {
        // TODO produit — blocage de la liberation sur ecart ouvert.
        question: 'Peut-on bloquer la libération tant qu’un écart est ouvert ?',
        answer:
          'Oui, et c’est une règle qui se paramètre par produit ou par ligne plutôt que d’être imposée partout. Certains sites bloquent sur toute non-conformité ouverte, d’autres seulement au-delà d’un niveau de gravité. Dans tous les cas, la décision finale reste celle d’une personne habilitée : la plateforme empêche un oubli, elle ne libère jamais un lot à votre place.',
      },
      {
        // TODO produit — duree de conservation et relecture d'un lot ancien.
        question: 'Comment retrouve-t-on un lot fabriqué il y a deux ans ?',
        answer:
          'Par son numéro, ou par une recherche sur la ligne, le produit et la période. Le dossier se rouvre avec ses relevés, ses écarts, ses preuves photo et ses décisions, dans l’état où ils ont été enregistrés — y compris les corrections, avec leur auteur. La durée de conservation est fixée au contrat, en fonction de ce que vos référentiels exigent.',
      },
    ],
  },
}
