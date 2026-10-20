/**
 * Guides publies sur /resources et lus sur /resources/[slug].
 *
 * BROUILLONS. Ces textes ont ete rediges a partir de ce que le site affirme
 * deja de CIPA (lib/data/platform.ts, FAQ) : aucun chiffre, aucun client,
 * aucune promesse nouvelle. Ils doivent etre relus et valides par l'equipe
 * avant la mise en ligne — en particulier `author` et `date`.
 *
 * Le corps d'un guide est une liste de blocs types plutot que du HTML ou du
 * Markdown : pas de dependance a un parseur, pas de risque d'injection, et
 * une structure prete a etre reprise telle quelle par un CMS headless.
 */

import type { Locale } from '@/i18n/routing'
import { overlay } from '@/lib/i18n'
import { GUIDES_EN } from '@/lib/data/guides.en'

/** Identifiant de categorie (francais), traduit a l'affichage par `categoryLabel`. */
export type GuideCategory = 'Terrain' | 'Qualité' | 'Pilotage' | 'Méthode'

export type GuideBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  /** Encadre dore : l'idee a retenir de la section. */
  | { type: 'callout'; text: string }

export type Guide = {
  slug: string
  title: string
  /** Resume des cartes et de la meta description. */
  excerpt: string
  category: GuideCategory
  /** Minutes de lecture, arrondies. */
  readingMinutes: number
  /** Date de publication, ISO (AAAA-MM-JJ). */
  date: string
  author: string
  image: { src: string; alt: string }
  /** Mis en avant en tete de /resources. Un seul a la fois. */
  featured?: boolean
  /** Page Plateforme a laquelle le guide renvoie en fin de lecture. */
  related: { label: string; href: string }
  body: GuideBlock[]
}

export const GUIDE_CATEGORIES: readonly GuideCategory[] = [
  'Terrain',
  'Qualité',
  'Pilotage',
  'Méthode',
]

export const GUIDES: Guide[] = [
  {
    slug: 'digitaliser-audits-terrain',
    title: 'Digitaliser ses audits terrain : le guide pour passer du papier au mobile',
    excerpt:
      'Grilles hétérogènes, ressaisies, rapports envoyés tard : comment structurer des audits sur mobile qui produisent une donnée exploitable dès la fin de la visite.',
    category: 'Terrain',
    readingMinutes: 7,
    date: '2026-09-15',
    author: 'Équipe Industry X.0',
    featured: true,
    image: {
      src: '/cipa-1-digitalisation-audits-terrain.png',
      alt: 'Écrans CIPA d’audit interne sur mobile, de tournée de sécurité et de traçabilité horodatée',
    },
    related: { label: 'Découvrir la remontée terrain', href: '/plateforme/remontee-terrain' },
    body: [
      {
        type: 'p',
        text: 'Dans beaucoup d’usines, l’audit terrain reste un exercice en deux temps : on constate sur papier ou dans un tableur, puis on ressaisit, on met en forme et on diffuse. Entre les deux, l’information perd en précision, en fraîcheur et parfois en exhaustivité. Digitaliser l’audit, ce n’est pas remplacer le papier par une tablette : c’est faire en sorte que la donnée soit juste et exploitable au moment même où elle est collectée.',
      },
      { type: 'h2', text: 'Les symptômes d’un audit qui ne sert pas assez' },
      {
        type: 'list',
        items: [
          'Chaque auditeur utilise sa propre version de la grille, avec ses propres critères.',
          'Les constats sont ressaisis après l’audit, avec des erreurs de recopie.',
          'Le rapport part plusieurs jours après la visite, quand les écarts ont déjà évolué.',
          'Un constat relevé lors d’un audit est oublié lors du suivant.',
        ],
      },
      {
        type: 'p',
        text: 'Pris isolément, aucun de ces points n’est dramatique. Cumulés, ils rendent impossible toute comparaison fiable d’un audit à l’autre, d’une zone à l’autre ou d’un site à l’autre.',
      },
      { type: 'h2', text: '1. Standardiser la grille avant de choisir l’outil' },
      {
        type: 'p',
        text: 'Le premier chantier est méthodologique. Rassemblez les grilles existantes, identifiez les critères communs et fixez pour chacun une définition claire, un mode de réponse (conforme / non conforme, valeur mesurée, choix dans une liste) et, lorsque c’est pertinent, un seuil de tolérance. Une grille partagée et versionnée est la condition pour que deux auditeurs obtiennent le même résultat face à la même situation.',
      },
      {
        type: 'callout',
        text: 'Une bonne grille se reconnaît à ceci : deux auditeurs différents, sur la même zone, le même jour, rendent le même verdict.',
      },
      { type: 'h2', text: '2. Capter la preuve au moment du constat' },
      {
        type: 'p',
        text: 'Sur mobile, chaque point de contrôle peut porter sa preuve : une photo, une mesure, un commentaire. Rattachée au point contrôlé, horodatée et localisée, cette preuve évite les photos dispersées sur des téléphones personnels et les discussions a posteriori sur ce qui a réellement été observé.',
      },
      {
        type: 'p',
        text: 'Pensez aussi aux zones mal couvertes par le réseau : un mode hors ligne, avec synchronisation automatique au retour de la connexion, est indispensable dans la plupart des ateliers.',
      },
      { type: 'h2', text: '3. Faire de chaque constat une action' },
      {
        type: 'p',
        text: 'Un audit n’a de valeur que par ce qu’il déclenche. Chaque non-conformité relevée doit pouvoir devenir une action, avec un responsable et une échéance, suivie jusqu’à sa clôture. C’est ce lien direct entre le terrain et le traitement qualité qui évite que les mêmes constats reviennent d’un audit à l’autre.',
      },
      { type: 'h2', text: '4. Générer le rapport sans le rédiger' },
      {
        type: 'p',
        text: 'Quand la saisie est structurée, le rapport n’est plus un document à écrire : il se génère dès la fin de l’audit, avec les constats, les preuves et les actions ouvertes. Il peut être diffusé immédiatement aux responsables concernés, puis archivé pour les audits suivants.',
      },
      { type: 'h2', text: 'Par où commencer' },
      {
        type: 'list',
        items: [
          'Choisir un type d’audit fréquent et bien maîtrisé (5S, sécurité, hygiène).',
          'Harmoniser sa grille avec les auditeurs qui la pratiquent.',
          'Déployer sur une zone ou une ligne pendant quelques semaines.',
          'Mesurer le temps gagné sur la rédaction et la réactivité sur les écarts, puis étendre.',
        ],
      },
    ],
  },
  {
    slug: 'non-conformites-capa',
    title: 'Non-conformités et CAPA : structurer le traitement des écarts jusqu’à la clôture',
    excerpt:
      'Signalement, criticité, escalade, analyse des causes et vérification de l’efficacité : les étapes d’un circuit d’écarts qui transforme les incidents en progrès durables.',
    category: 'Qualité',
    readingMinutes: 8,
    date: '2026-09-08',
    author: 'Équipe Industry X.0',
    image: {
      src: '/cipa-2-gestion-ecarts-qualite.png',
      alt: 'Écrans CIPA d’un workflow de non-conformité, du signalement au plan CAPA',
    },
    related: { label: 'Découvrir la gestion des écarts', href: '/plateforme/gestion-ecarts' },
    body: [
      {
        type: 'p',
        text: 'Une non-conformité mal traitée coûte deux fois : une première fois quand elle survient, une seconde quand elle se reproduit. Le traitement des écarts est pourtant souvent éclaté entre des e-mails, un tableur partagé et des échanges oraux. Voici comment structurer un circuit unique, de la détection à la vérification de l’efficacité.',
      },
      { type: 'h2', text: '1. Rendre le signalement immédiat' },
      {
        type: 'p',
        text: 'Plus un écart est signalé tard, plus son analyse est difficile. L’opérateur qui le constate doit pouvoir le déclarer depuis son poste, en quelques secondes, avec une photo et une description. Un signalement simple est un signalement qui a lieu.',
      },
      { type: 'h2', text: '2. Qualifier la criticité selon des règles partagées' },
      {
        type: 'p',
        text: 'Évaluer la gravité au cas par cas crée des traitements inégaux. Définissez quelques niveaux de criticité, avec des critères explicites (impact produit, sécurité, client, réglementaire), et associez à chacun un circuit : qui est prévenu, dans quel délai, qui décide.',
      },
      {
        type: 'callout',
        text: 'L’escalade ne doit pas dépendre de la bonne volonté des personnes : elle doit découler automatiquement de la criticité.',
      },
      { type: 'h2', text: '3. Chercher la cause, pas le coupable' },
      {
        type: 'p',
        text: 'Une action corrective sans analyse des causes traite le symptôme. Documentez systématiquement l’analyse — 5 pourquoi, diagramme d’Ishikawa ou toute méthode adaptée à votre contexte — et conservez-la avec l’écart : c’est elle qui permettra de reconnaître un problème récurrent.',
      },
      { type: 'h2', text: '4. Distinguer correctif et préventif' },
      {
        type: 'list',
        items: [
          'Action curative : traiter l’écart constaté (isoler, retoucher, rebuter).',
          'Action corrective : supprimer la cause pour que l’écart ne se reproduise pas.',
          'Action préventive : étendre la correction aux situations similaires, avant qu’elles ne dérivent.',
        ],
      },
      {
        type: 'p',
        text: 'Chaque action porte un responsable et une échéance. Une échéance dépassée doit déclencher une alerte, pas être découverte lors de la revue suivante.',
      },
      { type: 'h2', text: '5. Vérifier l’efficacité avant de clôturer' },
      {
        type: 'p',
        text: 'C’est l’étape la plus souvent oubliée. Une CAPA n’est close que lorsqu’on a vérifié, après un délai défini, que l’écart ne s’est pas reproduit. Sans cette vérification, le taux de clôture flatte les indicateurs sans garantir aucun progrès.',
      },
      { type: 'h2', text: '6. Exploiter l’historique' },
      {
        type: 'p',
        text: 'Quand tous les écarts suivent le même circuit, ils deviennent comparables. Les écarts récurrents ressortent, les plans d’actions peuvent être priorisés et le retour d’expérience circule entre les équipes et les sites. C’est là que le traitement des non-conformités devient un levier d’amélioration continue.',
      },
    ],
  },
  {
    slug: 'indicateurs-qualite-temps-reel',
    title: 'Piloter la qualité en temps réel : quels indicateurs, et comment les fiabiliser',
    excerpt:
      'Des KPI consolidés à la main dans Excel aux tableaux de bord alimentés par le terrain : choisir les bons indicateurs et garantir qu’ils disent vrai.',
    category: 'Pilotage',
    readingMinutes: 6,
    date: '2026-09-01',
    author: 'Équipe Industry X.0',
    image: {
      src: '/cipa-3-pilotage-performance-ia.png',
      alt: 'Tableau de bord qualité CIPA avec indicateurs, signal faible détecté et intégrations',
    },
    related: { label: 'Découvrir le pilotage de la performance', href: '/plateforme/pilotage-performance' },
    body: [
      {
        type: 'p',
        text: 'Un indicateur disponible avec plusieurs jours de retard décrit le passé, pas la situation. Et deux services qui présentent des chiffres différents pour le même indicateur perdent la réunion à débattre de la source. Piloter en temps réel suppose d’abord de résoudre ces deux problèmes : la fraîcheur et la fiabilité de la donnée.',
      },
      { type: 'h2', text: 'Peu d’indicateurs, mais reliés à des décisions' },
      {
        type: 'p',
        text: 'Un tableau de bord utile tient sur un écran. Pour chaque indicateur retenu, posez-vous une question simple : quelle décision prend-on lorsqu’il dérive, et qui la prend ? S’il n’y a pas de réponse, l’indicateur est décoratif.',
      },
      {
        type: 'list',
        items: [
          'Taux de conformité des audits et inspections, par zone et par ligne.',
          'Nombre d’écarts ouverts, par criticité et par ancienneté.',
          'Délai moyen de traitement des non-conformités.',
          'Actions correctives en retard par rapport à leur échéance.',
          'Écarts récurrents : mêmes causes, mêmes zones, mêmes produits.',
        ],
      },
      { type: 'h2', text: 'Saisir une fois, à la source' },
      {
        type: 'p',
        text: 'La consolidation manuelle est la première cause d’indicateurs faux ou en retard. Quand les contrôles, audits et écarts sont saisis directement sur le terrain dans un référentiel unique, les indicateurs se calculent sans ressaisie ni copier-coller, et chacun consulte la même version des chiffres.',
      },
      {
        type: 'callout',
        text: 'Un indicateur fiable n’est pas un indicateur recalculé plus souvent : c’est un indicateur qui ne dépend plus d’aucune ressaisie.',
      },
      { type: 'h2', text: 'Regarder les tendances, pas seulement les valeurs' },
      {
        type: 'p',
        text: 'Une valeur isolée rassure ou inquiète à tort. Suivez les tendances par site, ligne et équipe : une dérive lente est souvent plus instructive qu’un pic ponctuel. C’est aussi le terrain de l’IA opérationnelle, qui peut repérer des signaux faibles et des incohérences avant qu’ils ne deviennent des incidents.',
      },
      { type: 'h2', text: 'Connecter plutôt que dupliquer' },
      {
        type: 'p',
        text: 'Les données qualité prennent tout leur sens lorsqu’elles rejoignent le reste du système d’information : ERP, MES, GMAO ou outil de BI. Définir ces échanges dès le cadrage évite les exports manuels et garantit une source de vérité unique.',
      },
    ],
  },
  {
    slug: 'reussir-pilote-digitalisation',
    title: 'Réussir un pilote de digitalisation industrielle en quelques semaines',
    excerpt:
      'Démarrer petit, prouver la valeur, puis étendre : comment choisir le bon périmètre pilote, embarquer les équipes terrain et décider de la suite sur des faits.',
    category: 'Méthode',
    readingMinutes: 6,
    date: '2026-08-25',
    author: 'Équipe Industry X.0',
    image: {
      src: '/c1%20(4).png',
      alt: 'Équipes terrain utilisant CIPA sur tablette',
    },
    related: { label: 'Planifier une démonstration', href: '/contact' },
    body: [
      {
        type: 'p',
        text: 'Les projets de digitalisation qui échouent ont souvent un point commun : ils ont voulu tout couvrir d’emblée. Une approche par pilote permet au contraire de démontrer la valeur rapidement, sur un périmètre maîtrisé, avant d’industrialiser en confiance.',
      },
      { type: 'h2', text: '1. Choisir un processus à forte valeur et bien délimité' },
      {
        type: 'p',
        text: 'Le bon candidat est un processus fréquent, aujourd’hui pénible, et dont le résultat se mesure : audits, inspections, gestion des non-conformités ou contrôles de production. Évitez les processus rares ou trop dépendants d’autres chantiers en cours.',
      },
      { type: 'h2', text: '2. Fixer les critères de succès avant de démarrer' },
      {
        type: 'list',
        items: [
          'Temps passé par audit ou par contrôle, avant et après.',
          'Délai entre la détection d’un écart et sa prise en charge.',
          'Part des constats transformés en actions suivies.',
          'Adhésion des utilisateurs terrain, mesurée par l’usage réel.',
        ],
      },
      {
        type: 'callout',
        text: 'Des critères posés après coup finissent toujours par confirmer ce que l’on voulait démontrer. Fixez-les avant.',
      },
      { type: 'h2', text: '3. Embarquer le terrain dès le paramétrage' },
      {
        type: 'p',
        text: 'Les opérateurs et les auditeurs qui utiliseront l’outil au quotidien doivent participer à la construction des checklists. C’est la meilleure garantie que l’outil colle à la réalité de l’atelier, et le meilleur moyen d’en faire leur outil plutôt qu’un outil imposé.',
      },
      { type: 'h2', text: '4. Accompagner, former, ajuster' },
      {
        type: 'p',
        text: 'Un pilote n’est pas un test passif. Prévoyez une formation courte au démarrage, un point régulier avec les utilisateurs et la possibilité d’ajuster rapidement les grilles et les circuits. Les premiers retours sont les plus précieux.',
      },
      { type: 'h2', text: '5. Décider de la suite sur des faits' },
      {
        type: 'p',
        text: 'À la fin du pilote, comparez les résultats aux critères fixés au départ. S’ils sont atteints, l’extension se planifie processus par processus, site par site, en réutilisant ce qui a été construit. S’ils ne le sont pas, vous savez précisément pourquoi — et cela aussi est un résultat.',
      },
    ],
  },
]

const CATEGORY_EN: Record<GuideCategory, string> = {
  Terrain: 'Shop floor',
  Qualité: 'Quality',
  Pilotage: 'Performance',
  Méthode: 'Method',
}

/** Libelle affiche d'une categorie. */
export function categoryLabel(category: GuideCategory, locale: Locale = 'fr') {
  return locale === 'en' ? CATEGORY_EN[category] : category
}

const GUIDES_BY_LOCALE: Record<Locale, Guide[]> = {
  fr: GUIDES,
  en: GUIDES.map((guide) => overlay(guide, GUIDES_EN[guide.slug])),
}

/** Les guides dans la langue demandee. */
export function guidesFor(locale: Locale = 'fr'): Guide[] {
  return GUIDES_BY_LOCALE[locale]
}

export function guideBySlug(slug: string, locale: Locale = 'fr') {
  return guidesFor(locale).find((guide) => guide.slug === slug)
}

export function formatGuideDate(iso: string, locale: Locale = 'fr') {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
