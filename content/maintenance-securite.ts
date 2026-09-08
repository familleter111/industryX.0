/**
 * Maintenance & sécurité — /solutions/maintenance-securite.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LE TON DE CETTE PAGE N'EST PAS CELUI DES AUTRES
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Pas de superlatif, pas de formulation vendeuse, aucune promesse de securite.
 * Un outil qui enregistre des rondes n'empeche pas un accident, et une page qui
 * le laisserait croire serait relue par quelqu'un dont c'est le metier de
 * relever exactement ce genre de phrase.
 *
 * Regle pratique en relecture : si une phrase de cette page pourrait figurer
 * dans une plaquette commerciale, elle est a reecrire. Le bloc « ce que CIPA ne
 * fait pas » est la pour tenir cette ligne, il ne doit pas etre retire.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  AUCUN CHIFFRE INVENTE, ET AUCUN CHIFFRE TOUT COURT
 * ─────────────────────────────────────────────────────────────────────────
 *
 * La page nomme les statistiques que le module produit — nombre de controles,
 * mois de pic, score moyen, meilleur et moins bon score — sans en afficher
 * aucune valeur. Sur un sujet securite, un chiffre non source ne se discute
 * pas : il se retourne.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LA CAPTURE N'EST PAS CELLE DU MODULE MAINTENANCE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le module maintenance est vide sur l'instance de demonstration. Le bloc
 * visuel montre donc le tableau de bord operationnel, et la legende le dit :
 * elle decrit ce que l'ecran montre reellement — taux de conformite, tendance,
 * non-conformites par criticite — et non des controles de maintenance.
 *
 * C'est la seule maniere acceptable d'afficher cette capture ici. Une legende
 * qui annoncerait des controles de maintenance sur un ecran qui n'en montre
 * pas est exactement le genre de detail qu'un auditeur releve, et sur une page
 * securite il ne s'agit pas d'un detail.
 *
 * TODO PRODUIT — deux points sur ce fichier :
 *
 *   - remplacer par une capture du module maintenance des qu'il porte des
 *     donnees, reelles ou realistes et anonymisees, et reecrire la legende en
 *     consequence ;
 *   - le fichier fait 410 px de large pour un affichage jusqu'a 1024 : il est
 *     agrandi deux fois et demie et se voit flou, texte incruste compris.
 *     Fournir un export plus grand du meme ecran. Seuls `width` et `height`
 *     changent ici.
 *
 * A savoir : cet ecran existe deja en HTML dans le site, rendu par le
 * composant `DashboardScreen` sur /plateforme/tableaux-de-bord. Le passer en
 * enfant de `ProductShot` donnerait le meme visuel, net a toute taille et
 * lisible a la synthese vocale. C'est l'alternative si le flou gene.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TODO PRODUIT — A VALIDER AVANT PUBLICATION
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - la liste exacte des statistiques du module : nombre de controles, mois
 *     de pic, score moyen, meilleur et moins bon score. Confirmer ces cinq
 *     libelles, et sur quelle maille elles se calculent — site, zone, equipe ;
 *   - le calcul du score d'un controle de maintenance : d'ou sort-il, et
 *     est-il comparable d'une checklist a l'autre ? La page dit « score moyen »
 *     sans dire de quoi ;
 *   - le suivi des equipements « integre a la gestion de l'organisation » :
 *     preciser ce que couvre ce rattachement — referentiel, hierarchie de
 *     zones, affectation aux equipes ;
 *   - la qualification par criticite d'une situation dangereuse : faible,
 *     moyenne, elevee. Memes trois niveaux que pour une non-conformite, ou
 *     echelle propre a la securite ?
 *
 *  TODO JURIDIQUE
 *
 *   - ce que la plateforme peut ou ne peut pas etre presentee comme apportant
 *     au regard des obligations de l'employeur en matiere de sante et de
 *     securite au travail. La page se garde de toute affirmation sur ce point ;
 *     confirmer que la formulation actuelle convient.
 */

import {
  BarChart3,
  ClipboardX,
  FileClock,
  Gauge,
  LayoutGrid,
  MapPin,
  Siren,
  Split,
  TriangleAlert,
  Workflow,
  Wrench,
} from 'lucide-react'

import type {
  LimitsContent,
  MarketingPageContent,
  RelatedContent,
  SolutionContent,
  StatementContent,
} from './types'

/**
 * La page ajoute le bloc des situations dangereuses et le cadrage de ce que
 * l'outil ne fait pas. Elle n'a ni bloc de conformite ni bloc de benefices
 * chiffres — voir l'en-tete de fichier.
 */
type MaintenanceContent = Omit<MarketingPageContent, 'proof' | 'outcomes'> & {
  hazards: SolutionContent
  limits: LimitsContent
  statement: StatementContent
  related: RelatedContent
}

/* ── Les contrôles de maintenance ──────────────────────────────────────── */

const controls: SolutionContent = {
  eyebrow: 'Ce que CIPA change',
  title: 'Les contrôles de maintenance ont leur',
  accent: 'module.',
  subtitle:
    'Pas un type de contrôle qualité auquel on aurait ajouté un champ. Un module distinct, avec ses statistiques propres, et le même moteur que le reste de la plateforme.',
  items: [
    {
      icon: LayoutGrid,
      title: 'Un module à part entière',
      body: 'Les contrôles de maintenance ont leur propre espace, leurs propres checklists et leur propre historique. Ils ne se mélangent pas aux contrôles produit.',
      points: [
        'Checklists de ronde et de contrôle périodique',
        'Historique consultable par équipement et par zone',
      ],
    },
    {
      icon: BarChart3,
      title: 'Ses propres statistiques',
      body: 'Le module calcule ses indicateurs sur ses propres contrôles. Aucune valeur n’est affichée sur cette page : elles se lisent sur vos données, pas sur les nôtres.',
      points: [
        // TODO produit — confirmer ces cinq libelles et leur maille de calcul.
        'Nombre de contrôles réalisés, et mois de pic',
        'Score moyen, meilleur score et moins bon score',
      ],
    },
    {
      icon: Workflow,
      title: 'Le même moteur que la qualité',
      body: 'Checklists, déviations et actions correctives sont les mêmes objets que pour la qualité. Un écart relevé en ronde suit donc le circuit que vos équipes connaissent déjà.',
      points: [
        'Mêmes checklists, mêmes déviations, mêmes actions',
        'Même exigence de validation avant clôture',
      ],
    },
    {
      icon: Wrench,
      title: 'Le suivi des équipements, intégré',
      body: 'Les équipements ne vivent pas dans une liste à part : ils sont rattachés à l’organisation, donc aux zones et aux équipes qui les exploitent.',
      points: [
        // TODO produit — perimetre exact de ce rattachement.
        'Équipements rattachés à l’organisation, pas à un fichier',
        'Contrôles et écarts consultables depuis l’équipement',
      ],
    },
  ],
}

/* ── Les situations dangereuses ────────────────────────────────────────── */

const hazards: SolutionContent = {
  eyebrow: 'Situations dangereuses',
  title: 'Un constat devient un dossier',
  accent: 'suivi.',
  subtitle:
    'Une situation dangereuse constatée n’est pas signalée dans un canal à part. Elle entre dans le circuit des déviations, avec les mêmes champs et la même clôture.',
  items: [
    {
      icon: TriangleAlert,
      title: 'Le constat devient une déviation',
      body: 'Ce qui est vu sur le terrain est déclaré comme une déviation, au même titre qu’un écart qualité. Le dossier existe à partir de ce moment-là.',
    },
    {
      icon: Gauge,
      title: 'Qualifiée par criticité',
      body: 'Faible, moyenne ou élevée. La qualification est posée à la déclaration et reste révisable ensuite, avec son auteur.',
    },
    {
      icon: MapPin,
      title: 'Rattachée à une zone',
      body: 'La zone concernée est portée par le dossier. C’est ce qui permet, plus tard, de dire où les situations dangereuses se concentrent.',
    },
    {
      icon: FileClock,
      title: 'Suivie jusqu’à sa clôture',
      body: 'Le dossier reste ouvert tant que l’action qui en découle n’est pas validée. Une déclaration sans suite reste visible comme telle.',
    },
  ],
}

/* ── Ce que la plateforme ne fait pas ──────────────────────────────────── */

const limits: LimitsContent = {
  eyebrow: 'Cadrage',
  title: 'Ce que CIPA ne fait',
  accent: 'pas.',
  items: [
    {
      title: 'CIPA ne prévient pas un accident.',
      body: 'La plateforme enregistre, transmet et suit. Elle ne détecte rien qu’un opérateur n’ait vu, et n’intervient sur aucun équipement.',
    },
    {
      title: 'CIPA ne remplace pas votre système de management de la sécurité.',
      body: 'Les analyses de risques, les plans de prévention et les responsabilités restent les vôtres. La plateforme en enregistre l’exécution.',
    },
    {
      title: 'CIPA n’améliore rien à lui seul.',
      body: 'Un outil qui rend les écarts visibles ne les traite pas. Ce qui les traite, ce sont les actions décidées ensuite, et les personnes qui les portent.',
    },
  ],
}

/* ── Ce que ça change ──────────────────────────────────────────────────── */

const statement: StatementContent = {
  eyebrow: 'Ce que ça change',
  title: 'La sécurité cesse d’être un',
  accent: 'registre parallèle.',
  body: [
    'Les rondes, les situations dangereuses et les interventions ne vivent plus dans leurs propres classeurs, à côté du reste.',
    'Elles sont pilotées avec les mêmes indicateurs et la même exigence de clôture que la qualité et la production. Un écart de sécurité se ferme selon la même règle qu’un écart produit : après validation, pas après déclaration.',
  ],
}

/* ── Renvois de fin de page ────────────────────────────────────────────── */

const related: RelatedContent = {
  eyebrow: 'Sur la plateforme',
  title: 'Ce sur quoi cela',
  accent: 'repose.',
  subtitle:
    'La saisie sur le terrain et le circuit des écarts sont les deux modules que ce dossier utilise.',
  hrefs: ['/plateforme/capture-terrain', '/plateforme/orchestration'],
}

export const maintenanceSecurite: MaintenanceContent = {
  seo: {
    // 49 caracteres.
    title: 'CIPA — Maintenance et sécurité : rondes et écarts',
    // 145 caracteres.
    description:
      'Les contrôles de maintenance ont leur module et leurs statistiques, avec le même moteur de checklists, de déviations et d’actions que la qualité.',
    path: '/solutions/maintenance-securite',
  },

  hero: {
    eyebrow: 'Maintenance & sécurité',
    title: 'Les rondes et les interventions rentrent dans le même système de',
    accent: 'preuve',
    description:
      'Ce qui est contrôlé, ce qui a été constaté et ce qui a été fait ensuite sont enregistrés au même endroit que les écarts qualité, et suivis selon la même règle de clôture.',
    proofs: [
      'Module de contrôles de maintenance, avec ses statistiques',
      'Situation dangereuse déclarée comme une déviation',
      'Équipements rattachés aux zones et aux équipes',
    ],
    image: {
      src: '/plateforme/02-inspection-terrain-tablette.png',
      alt: 'Un opérateur en casque et gilet haute visibilité remplit un contrôle sur tablette, devant une installation industrielle.',
      width: 449,
      height: 450,
    },
  },

  problem: {
    eyebrow: 'La situation aujourd’hui',
    title: 'Les contrôles de maintenance vivent',
    accent: 'à part.',
    subtitle:
      'Ils ont leur classeur, leur tableur et leurs habitudes. Ce qui s’y passe ne rejoint jamais le reste, et une partie ne s’écrit nulle part.',
    image: {
      src: '/plateforme/09-abstrait-site-industriel.png',
      alt: 'Une unité de production recomposée en aplats géométriques, traversée par des fragments de photographie.',
      width: 380,
      height: 302,
    },
    items: [
      {
        icon: Split,
        title: 'Les contrôles de maintenance vivent à part',
        body: 'Ils ont leur propre support et leur propre circuit. Rapprocher un écart de maintenance d’un écart qualité sur le même équipement demande de rouvrir deux dossiers séparés.',
      },
      {
        icon: ClipboardX,
        title: 'Une ronde déclarée oralement ne laisse aucune trace',
        body: 'La ronde a été faite, l’équipe le dit, et c’est vrai. Mais rien ne l’atteste : ni l’heure, ni le parcours, ni ce qui a été regardé.',
      },
      {
        icon: Siren,
        title: 'Un presque-accident remonté un vendredi soir se perd',
        body: 'Il est signalé à l’oral en fin de poste. Le lundi, l’équipe a changé, et l’information n’est plus portée par personne.',
      },
    ],
  },

  solution: controls,
  hazards,
  limits,

  shot: {
    // TODO produit — capture du module maintenance a fournir, et fichier plus
    // grand. Voir l'en-tete de fichier pour les deux points.
    image: {
      src: '/CIPA_images_page/section_dashboard_complete.png',
      alt: 'Le tableau de bord opérationnel : quatre indicateurs, une courbe d’évolution du taux de conformité et un anneau de répartition des non-conformités par criticité.',
      width: 410,
      height: 225,
    },
    // La legende dit ce que l'ecran montre, pas ce que la page aimerait qu'il
    // montre. Voir l'en-tete : c'est le tableau de bord, pas le module
    // maintenance.
    caption:
      'Le tableau de bord opérationnel, où les écarts de maintenance remontent avec les autres : taux de conformité et sa tendance, non-conformités ouvertes par criticité. Les valeurs affichées sont des données d’exemple.',
  },

  statement,
  related,

  faq: {
    title: 'Ce que les responsables HSE et maintenance nous',
    accent: 'demandent.',
    items: [
      {
        question: 'Comment atteste-t-on qu’une ronde a bien été faite ?',
        answer:
          'Par les relevés eux-mêmes. Chaque point de la checklist est enregistré avec son horodatage et l’identifiant de la personne qui l’a saisi, sur place. Ce n’est pas une preuve au sens juridique du terme, et la page ne le prétend pas : c’est un enregistrement daté et attribué, qui vaut mieux qu’une déclaration a posteriori et qui se relit sans dépendre de la mémoire de quelqu’un.',
      },
      {
        // TODO produit — echelle de criticite propre a la securite, ou la meme
        // que pour une non-conformite ?
        question: 'Une situation dangereuse suit-elle le même circuit qu’un écart qualité ?',
        answer:
          'Oui. Elle est déclarée comme une déviation, qualifiée par criticité, rattachée à une zone, et elle ouvre une action corrective qui ne se clôt qu’après validation. C’est précisément l’intérêt : le circuit est celui que vos équipes utilisent déjà, il n’y a pas de procédure séparée à faire vivre pour la sécurité.',
      },
      {
        question: 'Que se passe-t-il si un écart de maintenance n’est pas traité ?',
        answer:
          'Le dossier reste ouvert, et il reste visible. La plateforme ne relance personne à votre place et ne décide pas de la priorité : elle rend l’état visible, avec le nom du pilote et l’échéance. Ce qui se passe ensuite dépend de votre organisation, pas de l’outil.',
      },
      {
        question: 'Retrouve-t-on l’historique d’un équipement ?',
        answer:
          'Depuis l’équipement lui-même. Les contrôles qui l’ont couvert, les écarts qui le concernent et les actions ouvertes s’affichent sur la même fiche, dans l’ordre chronologique. C’est ce qui évite de refaire un diagnostic déjà posé six mois plus tôt par quelqu’un d’autre.',
      },
    ],
  },
}
