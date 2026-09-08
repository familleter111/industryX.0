/**
 * Audits & inspections — /solutions/audits-inspections.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO — LE CHIFFRE DU GAIN DE TEMPS SUR LA REDACTION
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le gain de temps sur la redaction du rapport est l'argument le plus tangible
 * de la page pour un directeur des operations. Il est donc mis en avant a
 * trois endroits — le sous-titre du hero, la capacite « Rapport compose a la
 * cloture » et le premier des trois resultats — mais TOUJOURS sous une forme
 * qualitative, jamais chiffree.
 *
 * C'est volontaire : sur l'argument principal d'une page, une estimation
 * inventee est celle que le prospect retiendra, citera en reunion et opposera
 * a la premiere demonstration. Les autres pages du site portent chacune un
 * chiffre non source, affiche comme « objectif a valider » ; ici la place est
 * laissee vide plutot que remplie d'une approximation.
 *
 * A INSERER quand l'equipe aura mesure : heures gagnees par rapport redige, ou
 * pourcentage de reduction du temps de redaction, avec sa source (mesure
 * client datee, ou moyenne constatee sur un panel). L'emplacement prevu est le
 * premier `Outcome` ci-dessous — remplacer sa `value` qualitative par la
 * valeur mesuree et renseigner `source`.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - la cotation des grilles : bareme libre, pondere, calcul de score global ?
 *     La comparaison entre audits et entre sites en depend entierement ;
 *   - la planification du programme : recurrence, rappels, suivi de l'ecart
 *     entre audits prevus et realises ;
 *   - la reprise des grilles d'audit existantes (FAQ 1) ;
 *   - la comparaison entre sites dont les perimetres different (FAQ 4).
 */

import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  ClipboardX,
  FileCheck,
  GitCompare,
  HardHat,
  LayoutGrid,
  Link2,
  PenLine,
  ShieldCheck,
  Sparkles,
  Table2,
  TrendingUp,
  Truck,
  UserCheck,
  Workflow,
} from 'lucide-react'

import type {
  MarketingPageContent,
  RelatedContent,
  SolutionContent,
} from './types'

/**
 * La page se passe du visuel produit et du bloc « integrations ou
 * conformite » : la grille des types d'audits occupe cette place, parce que
 * la question qui reste apres les capacites est « est-ce que mon type d'audit
 * est couvert », et pas autre chose.
 */
type AuditsContent = Omit<MarketingPageContent, 'shot' | 'proof'> & {
  types: SolutionContent
  related: RelatedContent
}

const related: RelatedContent = {
  eyebrow: 'Sur la plateforme',
  title: 'Ce qui saisit, et ce qui',
  accent: 'rédige.',
  subtitle:
    'La grille se remplit au poste, le rapport se compose de ce qui a été saisi. Les deux modules ci-dessous portent l’un et l’autre.',
  hrefs: [
    '/plateforme/capture-terrain',
    '/plateforme/intelligence-operationnelle',
  ],
}

/* ── Types d'audits ────────────────────────────────────────────────────── */

const types: SolutionContent = {
  eyebrow: 'Types d’audits couverts',
  title: 'La même mécanique, quel que soit',
  accent: 'l’exercice.',
  subtitle:
    'Une grille, une cotation, des constats qui ouvrent des actions. Ce qui change d’un type à l’autre, c’est le référentiel et la fréquence.',
  items: [
    {
      icon: ShieldCheck,
      title: 'Audit interne',
      body: 'Vérification du système qualité sur un périmètre défini, selon votre référentiel et votre programme annuel.',
    },
    {
      icon: Truck,
      title: 'Audit fournisseur',
      body: 'Évaluation d’un fournisseur sur site ou sur pièces, avec sa grille et sa cotation propres.',
    },
    {
      icon: HardHat,
      title: 'Inspection de poste',
      body: 'Contrôle court et fréquent d’un poste de travail, mené par l’encadrement de proximité.',
    },
    {
      icon: LayoutGrid,
      title: 'Audit 5S',
      body: 'Évaluation de l’ordre et de la propreté d’une zone, cotée et comparable d’un passage à l’autre.',
    },
    {
      icon: Workflow,
      title: 'Audit de processus',
      body: 'Examen d’un processus de bout en bout, de ses entrées à ses sorties, écarts au standard compris.',
    },
  ],
}

export const auditsInspections: AuditsContent = {
  seo: {
    // 58 caracteres.
    title: 'CIPA — Audits et inspections : grilles, constats, rapports',
    // 148 caracteres.
    description:
      'Programme d’audit planifié, grilles digitales avec cotation, constats rattachés à une action et rapport composé à la clôture. Résultats comparables.',
    path: '/solutions/audits-inspections',
  },

  hero: {
    eyebrow: 'Audits & inspections',
    title: 'Pilotez inspections et évaluations sur un seul',
    accent: 'outil',
    description:
      'L’audit se saisit sur sa grille, chaque constat ouvre une action, et le rapport se compose des constats déjà enregistrés — au lieu d’être rédigé de mémoire, le soir même.',
    proofs: [
      'Programme d’audit planifié et suivi',
      'Grilles digitales avec cotation, sur tablette',
      'Rapport composé des constats, dès la clôture',
    ],
    image: {
      src: '/plateforme/02-inspection-terrain-tablette.png',
      alt: 'Un opérateur en casque et gilet haute visibilité remplit une inspection sur tablette, devant une installation industrielle.',
      width: 449,
      height: 450,
    },
  },

  problem: {
    eyebrow: 'Côté audit',
    title: 'Le travail utile est fait sur place. Le reste,',
    accent: 'après.',
    items: [
      {
        icon: Table2,
        title: 'Le programme d’audit vit dans un tableur',
        body: 'Dates prévues, dates réalisées, reports et responsables tiennent dans un fichier que deux personnes savent lire. L’écart au programme se découvre en fin d’année.',
      },
      {
        icon: PenLine,
        title: 'Les rapports sont rédigés a posteriori',
        body: 'L’audit finit à seize heures, le rapport s’écrit le soir ou la semaine suivante, à partir de notes manuscrites. Ce qui a été dit se reconstitue de mémoire.',
      },
      {
        icon: ClipboardX,
        title: 'Les constats restent sans suite',
        body: 'Ils sont listés dans le rapport, transmis par courriel, puis vivent leur vie. Six mois plus tard, personne ne peut dire lesquels ont été traités.',
      },
      {
        icon: GitCompare,
        title: 'Deux audits ne se comparent pas',
        body: 'Chaque auditeur a sa grille et sa façon de coter. Savoir si une ligne progresse d’un audit à l’autre suppose de relire les deux rapports en entier.',
      },
    ],
  },

  solution: {
    eyebrow: 'Ce que CIPA apporte',
    title: 'De la programmation au rapport,',
    accent: 'sans rupture.',
    subtitle:
      'Cinq mécanismes qui suppriment les trois moments où l’information se perd : entre le terrain et les notes, entre les notes et le rapport, entre le rapport et l’action.',
    items: [
      {
        icon: CalendarCheck,
        title: 'Planification du programme d’audit',
        body: 'Le programme annuel vit dans la plateforme : périmètres, fréquences, auditeurs désignés et dates prévues, avec le suivi de ce qui a réellement été réalisé.',
        points: [
          // TODO produit — recurrence, rappels et suivi de l'ecart prevu/realise.
          'Récurrence et rappels par type d’audit',
          'Écart entre audits prévus et réalisés visible en continu',
          'Auditeur désigné à la planification, pas au dernier moment',
        ],
      },
      {
        icon: ClipboardList,
        title: 'Grilles d’audit digitales avec cotation',
        body: 'La grille se remplit sur tablette pendant l’audit, point par point, avec sa cotation, ses commentaires et ses preuves photo.',
        points: [
          // TODO produit — bareme, ponderation, calcul du score global.
          'Cotation portée par la grille, identique pour tous les auditeurs',
          'Preuve photo attachée au point coté, pas au rapport',
          'Une grille par type d’audit et par référentiel',
        ],
      },
      {
        icon: Link2,
        title: 'Constats rattachés à une action',
        body: 'Un point non conforme n’est pas seulement noté : il ouvre une action nominative avec son échéance, dans le même geste.',
        points: [
          'Action créée depuis le constat, sans ressaisie',
          'Constat sans suite impossible à clôturer avec l’audit',
          'Suivi des actions d’audit dans le même circuit que les autres',
        ],
      },
      {
        icon: Sparkles,
        title: 'Rapport composé à la clôture',
        body: 'L’IA générative rédige le rapport à partir des points cotés, des commentaires et des preuves saisis pendant l’audit. L’auditeur relit et corrige.',
        points: [
          'Composé des constats enregistrés, pas de notes reprises de mémoire',
          'Chaque affirmation renvoie au point de grille qui l’étaye',
          'Produit en brouillon, jamais diffusé sans relecture de l’auditeur',
        ],
      },
      {
        icon: BarChart3,
        title: 'Comparaison dans le temps et entre sites',
        body: 'Même grille et même cotation d’un audit à l’autre : l’évolution d’un périmètre se lit directement, sans relire les rapports.',
        points: [
          'Évolution d’une cotation sur plusieurs passages',
          'Comparaison de deux périmètres sur la même grille',
          'Points systématiquement non conformes mis en évidence',
        ],
      },
    ],
  },

  types,

  outcomes: {
    title: 'Ce que vous',
    accent: 'gagnez.',
    subtitle:
      'Trois propriétés du système, vérifiables en démonstration. Le gain de temps sur la rédaction est réel et c’est l’argument principal de cette page — il sera chiffré ici quand la mesure sera faite, pas avant.',
    items: [
      {
        icon: FileCheck,
        // ─────────────────────────────────────────────────────────────
        //  TODO — EMPLACEMENT DU CHIFFRE VALIDE
        //
        //  C'est ici que va le gain de temps sur la redaction, une fois
        //  mesure : remplacer `value` par la valeur (heures gagnees, ou
        //  pourcentage) et renseigner `source`. Tant que la mesure n'existe
        //  pas, la formulation reste qualitative — voir l'en-tete du fichier.
        // ─────────────────────────────────────────────────────────────
        value: 'À la clôture',
        label: 'Le rapport d’audit est disponible',
        detail:
          'Il se compose des points cotés pendant l’audit, au lieu d’être rédigé le soir à partir de notes.',
        source: 'Fonctionnement de la plateforme',
      },
      {
        icon: UserCheck,
        value: 'Rattaché',
        label: 'Chaque constat à une action et à un responsable',
        detail: 'Un constat sans suite ne peut pas être clôturé avec l’audit.',
        source: 'Modèle de données de la plateforme',
      },
      {
        icon: TrendingUp,
        value: 'Comparable',
        label: 'Un audit par rapport au précédent',
        detail:
          'Même grille et même cotation, donc une évolution lisible dans le temps et entre sites.',
        source: 'Propriété des grilles d’audit',
      },
    ],
  },

  related,

  faq: {
    title: 'Ce que les directions d’opérations nous',
    accent: 'demandent.',
    items: [
      {
        // TODO produit — reprise des grilles existantes.
        question: 'Peut-on utiliser nos propres grilles d’audit ?',
        answer:
          'C’est le point de départ : vos grilles actuelles sont transposées telles quelles, avec leur cotation et leur pondération. L’IA générative en produit une première version digitale à partir de vos documents, que vos auditeurs corrigent avant de la publier. Vous ne redéfinissez pas votre référentiel d’audit en même temps que vous changez d’outil — c’est ce qui fait échouer la plupart des déploiements.',
      },
      {
        question: 'Le rapport généré est-il diffusable en l’état ?',
        answer:
          'Non, et c’est délibéré. Le rapport naît en brouillon : il restitue les points cotés, les commentaires et les preuves saisis pendant l’audit, chaque affirmation renvoyant au point de grille qui l’étaye. C’est l’auditeur qui le relit, le corrige et décide de le diffuser. La plateforme lui fait gagner la rédaction, pas la responsabilité de ce qui est écrit.',
      },
      {
        question: 'Comment s’assure-t-on que les constats sont traités ?',
        answer:
          'Parce qu’un constat non conforme ouvre une action au moment où il est coté, avec un titulaire nommé et une échéance. Ces actions rejoignent le même circuit que les non-conformités courantes : elles sont relancées, suivies et vérifiées de la même façon. Un audit ne peut pas être clôturé en laissant des constats sans suite derrière lui.',
      },
      {
        // TODO produit — comparaison entre perimetres differents.
        question: 'Peut-on comparer deux sites qui n’ont pas les mêmes équipements ?',
        answer:
          'Sur les points que les deux grilles ont en commun, oui. La comparaison porte sur la cotation d’items identiques, pas sur un score global qui additionnerait des périmètres différents — ce serait un chiffre facile à produire et impossible à défendre en revue. Les points propres à un site restent lisibles dans son propre historique.',
      },
    ],
  },
}
