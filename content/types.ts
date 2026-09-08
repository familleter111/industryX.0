/**
 * Formes du contenu editorial des pages marketing.
 *
 * Chaque page vit dans `content/<page>.ts` et exporte un objet
 * `MarketingPageContent`. Le JSX ne contient donc aucun texte : reformuler un
 * titre, corriger une FAQ ou changer un chiffre ne demande jamais d'ouvrir un
 * composant.
 *
 * Les comptages imposes par la maquette (trois micro-preuves, quatre
 * questions) sont exprimes en tuples : une page a qui il en manque une ne
 * compile pas, plutot que de partir en production avec un bloc bancal.
 */

import type { LucideIcon } from 'lucide-react'

/** Lien d'action. `href` est un chemin interne, pas une URL absolue. */
export type Cta = {
  label: string
  href: string
}

/**
 * Illustration d'un bloc. Le fichier vit dans `public/`, `src` en part.
 *
 * `width` et `height` sont les dimensions reelles du fichier, pas la taille
 * d'affichage : c'est ce qui permet au navigateur de reserver la place avant
 * le chargement, et evite que la page ne saute sous le doigt du lecteur.
 *
 * `alt` n'est pas optionnel. Ces illustrations ne sont pas decoratives — elles
 * montrent l'outil — et une image sans texte de remplacement est un trou dans
 * la page pour qui ne la voit pas. Une image reellement decorative n'a rien a
 * faire dans ce type : elle se pose en `aria-hidden` dans le composant.
 */
export type BlockImage = {
  src: string
  alt: string
  width: number
  height: number
  /**
   * Mention posee sous l'image. Sert notamment a dire qu'un ecran affiche des
   * donnees d'exemple : une capture qui montre « 98 % de conformite » se lit
   * comme un resultat si rien ne dit le contraire.
   */
  caption?: string
}

export type SeoMeta = {
  /** 60 caracteres maximum — au-dela, Google tronque. Verifie par `lib/seo`. */
  title: string
  /** 155 caracteres maximum. Verifie par `lib/seo`. */
  description: string
  /** Chemin depuis la racine, sans domaine : `/solutions/audits`. */
  path: string
}

/* ── 1. Hero ─────────────────────────────────────────────────────────── */

export type HeroContent = {
  /** Nom de la rubrique, en capitales dans la pastille. */
  eyebrow: string
  /**
   * Pastille posee a cote de l'eyebrow — « IA » sur la page Intelligence
   * operationnelle. Meme forme que celle du mega menu : c'est la meme
   * information, et un lecteur qui vient du menu doit la retrouver.
   */
  badge?: string
  title: string
  /** Fin du titre, rendue en or. Optionnelle : un titre peut se passer d'accent. */
  accent?: string
  /** Deux lignes. Ce qui depasse se lit comme un paragraphe de section. */
  description: string
  /** Trois micro-preuves a coche. Ni deux, ni quatre. */
  proofs: [string, string, string]
  /** Par defaut les CTA partages de `content/shared.ts`. */
  primaryCta?: Cta
  secondaryCta?: Cta
  /**
   * Illustration posee a droite du texte. Sans elle, le hero garde sa colonne
   * unique — c'est la forme par defaut, et celle des pages qui n'ont rien de
   * juste a montrer. Une capture generique mise la pour remplir se remarque.
   */
  image?: BlockImage
}

/* ── 2. Probleme ─────────────────────────────────────────────────────── */

/** Un constat terrain, ecrit du point de vue de qui le subit. */
export type PainPoint = {
  /**
   * Utilisee par `ProblemShowcase`, ignoree par `PainPoints` — qui numerote
   * ses constats au lieu de les illustrer. Optionnelle : un constat se lit
   * sans pictogramme.
   */
  icon?: LucideIcon
  title: string
  body: string
}

export type ProblemContent = {
  title: string
  /**
   * Sur-titre du bloc. Optionnel : la valeur par defaut convient a la plupart
   * des pages, mais une page dont le bloc ne parle pas du meme sujet doit
   * pouvoir le dire — « Categories d'integration » n'est pas « Ce que fait
   * CIPA ».
   */
  eyebrow?: string

  accent?: string
  subtitle?: string
  /**
   * Trois constats, quatre au plus.
   *
   * Le gabarit en demande trois ; une page dont le sujet en porte un
   * quatrieme n'a pas a en sacrifier un pour tenir dans le moule. La borne
   * haute reste : au-dela de quatre, ce n'est plus un constat partage avec le
   * lecteur, c'est un inventaire, et il cesse de le lire.
   */
  items:
    | [PainPoint, PainPoint, PainPoint]
    | [PainPoint, PainPoint, PainPoint, PainPoint]
}

/* ── 3. Solution ─────────────────────────────────────────────────────── */

export type Capability = {
  icon: LucideIcon
  title: string
  /** Deux lignes : ce que la capacite fait, pas comment elle est construite. */
  body: string
  /**
   * Detail, sur une page qui doit en donner.
   *
   * Une page pilier s'en passe — elle oriente. Une sous-page, elle, est la
   * pour repondre precisement, et deux lignes n'y suffisent pas. Trois points
   * au plus : au-dela, c'est une documentation, pas une page de rubrique.
   */
  points?: string[]
}

export type SolutionContent = {
  title: string
  /**
   * Sur-titre du bloc. Optionnel : la valeur par defaut convient a la plupart
   * des pages, mais une page dont le bloc ne parle pas du meme sujet doit
   * pouvoir le dire — « Categories d'integration » n'est pas « Ce que fait
   * CIPA ».
   */
  eyebrow?: string

  accent?: string
  subtitle?: string
  /** Trois ou quatre capacites. La grille bascule seule de 3 a 2x2 colonnes. */
  items: Capability[]
}

/* ── 4. Visuel produit ───────────────────────────────────────────────── */

export type ShotContent = {
  /** Legende sous la capture. Dit ce que l'ecran montre, pas qu'il est beau. */
  caption: string
  /** Chemin dans `public/`. Absent : le composant rend sa maquette schematique. */
  src?: string
  /** Alternative textuelle. Obligatoire des que `src` est fourni. */
  alt?: string
}

/* ── 5. Benefices ────────────────────────────────────────────────────── */

/**
 * Resultat mesurable.
 *
 * REGLE : aucun chiffre non source ne part en production. Tant que `source`
 * est vide, la valeur porte un `// TODO valider` a l'endroit ou elle est
 * ecrite, et reste formulee comme un objectif, jamais comme un constat.
 */
export type Outcome = {
  /**
   * Utilisee par la variante compacte de `MetricsShowcase`, ignoree par
   * `OutcomeMetrics`. Optionnelle : un chiffre se lit sans pictogramme.
   */
  icon?: LucideIcon
  /** Deja formate pour l'affichage : `-30 %`, `4 h`, `x2`. */
  value: string
  label: string
  detail?: string
  /** Origine verifiable du chiffre : client, audit, mesure interne datee. */
  source?: string
}

export type OutcomesContent = {
  title: string
  accent?: string
  subtitle?: string
  /** Trois resultats. */
  items: [Outcome, Outcome, Outcome]
}

/* ── 6. Integrations ou conformite, selon la page ────────────────────── */

export type IntegrationsContent = {
  kind: 'integrations'
  title: string
  /**
   * Sur-titre du bloc. Optionnel : la valeur par defaut convient a la plupart
   * des pages, mais une page dont le bloc ne parle pas du meme sujet doit
   * pouvoir le dire — « Categories d'integration » n'est pas « Ce que fait
   * CIPA ».
   */
  eyebrow?: string

  accent?: string
  subtitle?: string
  items: { name: string; category: string }[]
  /** Mention de bas de bloc : perimetre, reserve, precision de cadrage. */
  note?: string
}

export type ComplianceContent = {
  kind: 'compliance'
  title: string
  /**
   * Sur-titre du bloc. Optionnel : la valeur par defaut convient a la plupart
   * des pages, mais une page dont le bloc ne parle pas du meme sujet doit
   * pouvoir le dire — « Categories d'integration » n'est pas « Ce que fait
   * CIPA ».
   */
  eyebrow?: string

  accent?: string
  subtitle?: string
  items: { name: string; body: string }[]
  note?: string
}

export type ProofContent = IntegrationsContent | ComplianceContent

/* ── 7. FAQ ──────────────────────────────────────────────────────────── */

export type FaqItem = {
  question: string
  answer: string
}

export type FaqContent = {
  title: string
  accent?: string
  subtitle?: string
  /** Quatre questions. */
  items: [FaqItem, FaqItem, FaqItem, FaqItem]
}

/* ═══════════════════════════════════════════════════════════════════════
   BLOCS OPTIONNELS

   Ils ne font pas partie de la structure commune : une page les ajoute quand
   son sujet les demande. `MarketingPage` ne les rend pas — une page qui en
   utilise compose ses sections a la main.
   ═══════════════════════════════════════════════════════════════════════ */

/** Etape d'un enchainement. `href` la rend cliquable vers sa page dediee. */
export type FlowStep = {
  icon: LucideIcon
  /** Le verbe de l'etape : « Capter », « Orchestrer »… */
  title: string
  body: string
  href?: string
  /** Libelle du lien, si `href` est fourni. Nomme la page d'arrivee. */
  linkLabel?: string
}

export type FlowContent = {
  title: string
  accent?: string
  subtitle?: string
  steps: FlowStep[]
}


/**
 * Maillage interne : un bloc de renvois vers d'autres pages du site.
 *
 * Ne porte que des chemins. `RelatedPages` lit le titre, la description et
 * l'icone de chaque destination dans `NAV_GROUPS` — ce que le mega menu
 * annonce pour cette page est ce que la carte affiche. Recopier ces textes
 * page par page aurait cree autant d'endroits a corriger que de liens.
 */
export type RelatedContent = {
  eyebrow?: string
  title: string
  accent?: string
  subtitle?: string
  /** Chemins internes. Doivent exister dans NAV_GROUPS, sinon le build echoue. */
  hrefs: string[]
}

/** Une des deux faces du produit : le poste de pilotage, ou le terrain. */
export type Surface = {
  icon: LucideIcon
  /** Ou l'on est : « Sur le web », « Sur le terrain ». */
  eyebrow: string
  title: string
  body: string
  points: string[]
}

export type SurfacesContent = {
  title: string
  accent?: string
  subtitle?: string
  /** Deux faces, jamais trois : c'est un partage, pas une liste. */
  items: [Surface, Surface]
}

/**
 * Ce qu'une capacite ne fait pas.
 *
 * Bloc de credibilite, pas de mise en garde : il s'adresse a un directeur
 * d'usine qui a deja entendu trois fournisseurs promettre l'automatisation
 * complete. Enoncer soi-meme ses limites vaut mieux que de les laisser
 * decouvrir en demonstration.
 *
 * Sobre par construction : trois enonces, un par ligne, sans icone d'alerte
 * ni couleur d'etat. Ce n'est ni une erreur ni un danger — c'est un cadrage.
 */
export type Limit = {
  /** L'enonce, formule a la negative et sans detour. */
  title: string
  /** Une phrase, au plus. Ce qui deborde affaiblit l'enonce. */
  body: string
}

export type LimitsContent = {
  eyebrow?: string
  title: string
  accent?: string
  /** Trois. C'est la contrainte qui garde le bloc credible. */
  items: [Limit, Limit, Limit]
}

/**
 * Un moment d'un scenario, et ce qui y change.
 *
 * Le format impose la comparaison : chaque moment porte l'etat actuel et
 * l'etat avec la plateforme. C'est ce qui empeche le bloc de devenir une
 * liste de promesses — on ne peut pas ecrire `after` sans avoir formule
 * `before`, donc sans avoir nomme le probleme qu'il resout.
 */
export type ScenarioMoment = {
  /** Le repere temporel : « La semaine d'avant », « Pendant la seance ». */
  when: string
  before: string
  after: string
}

export type ScenarioContent = {
  eyebrow?: string
  title: string
  accent?: string
  subtitle?: string
  /** En-tetes des deux colonnes. Explicites, jamais sous-entendus. */
  beforeLabel: string
  afterLabel: string
  /** Trois temps. Avant, pendant, apres — c'est la forme du recit. */
  moments: [ScenarioMoment, ScenarioMoment, ScenarioMoment]
}

/**
 * Un quadrant de la boucle PDCA.
 *
 * `letter` et `name` sont separes parce que la lettre est un reperage visuel
 * — elle vit dans une pastille — la ou le nom appartient a la phrase. Les
 * confondre obligerait a ecrire « P » dans un titre, ou « Plan » dans une
 * pastille de vingt pixels.
 */
export type PdcaPhase = {
  letter: string
  name: string
  /** Ce que la phase demande, formule du point de vue de qui la conduit. */
  body: string
  /** Ce que la plateforme outille a cette phase. Trois points au plus. */
  points: string[]
}

export type PdcaContent = {
  eyebrow?: string
  title: string
  accent?: string
  subtitle?: string
  phases: [PdcaPhase, PdcaPhase, PdcaPhase, PdcaPhase]
  /**
   * La phrase qui referme la boucle, sous la grille.
   *
   * Obligatoire : quatre quadrants poses cote a cote forment un tableau, pas
   * un cycle. Sans cette ligne, rien ne dit que la quatrieme phase ramene a la
   * premiere — et c'est pourtant tout ce qui distingue le PDCA d'une liste de
   * quatre etapes.
   */
  loopNote: string
}

/**
 * Encart de relance : la question qu'une grille laisse forcement ouverte, et
 * a qui la poser.
 *
 * Il s'intercale au milieu d'une page, repond a une objection precise, et
 * envoie vers un interlocuteur different d'un commercial — une equipe
 * technique, ou la direction.
 */
export type CalloutContent = {
  icon?: LucideIcon
  title: string
  body: string
  cta: Cta
}

/**
 * Une legende posee a cote d'un ecran : ce que ce point de l'interface
 * contient, et pourquoi il y est.
 */
export type Annotation = {
  icon: LucideIcon
  title: string
  body: string
}

export type AnnotatedScreenContent = {
  eyebrow?: string
  title: string
  accent?: string
  subtitle?: string
  items: Annotation[]
  /**
   * Description de l'ecran, en toutes lettres.
   *
   * La maquette est `aria-hidden` : c'est un decor HTML, pas une image, et la
   * faire lire element par element donnerait une suite de fragments sans
   * syntaxe. Cette phrase est ce qui en tient lieu — elle doit donc dire ce
   * que l'ecran montre, pas le commenter.
   */
  caption: string
}

/**
 * Etape d'un cycle de vie — une frise, pas une liste.
 *
 * Distinct de `FlowStep` : celui-ci decrit les quatre temps du produit et
 * envoie vers une page par etape. Celui-la decrit ce que traverse UN objet,
 * du constat a sa cloture, et ne mene nulle part. Les fusionner aurait donne
 * un type dont la moitie des champs serait toujours vide.
 */
export type LifecycleStage = {
  title: string
  body: string
  /**
   * Qui intervient a cette etape. Illustratif : l'attribution reelle se
   * parametre par processus, et le sous-titre du bloc doit le dire.
   */
  owner?: string
  /**
   * Ce que la plateforme fait a cette etape precise.
   *
   * Une frise de processus metier decrit un enchainement qui existait avant
   * CIPA : sans cette ligne, le lecteur voit son propre process et se demande
   * ou l'outil se branche. Court — quelques mots —, sinon la frise
   * horizontale ne tient plus sur une ligne d'ecran.
   */
  cipa?: string
}

export type LifecycleContent = {
  eyebrow?: string
  title: string
  accent?: string
  subtitle?: string
  stages: LifecycleStage[]
}

/** Une fonction de l'usine, et ce qu'elle vient chercher dans CIPA. */
export type Audience = {
  icon: LucideIcon
  role: string
  body: string
}

export type AudiencesContent = {
  title: string
  accent?: string
  subtitle?: string
  items: Audience[]
}

/* ── La page entiere ─────────────────────────────────────────────────── */

export type MarketingPageContent = {
  seo: SeoMeta
  hero: HeroContent
  problem: ProblemContent
  solution: SolutionContent
  shot: ShotContent
  outcomes: OutcomesContent
  proof: ProofContent
  faq: FaqContent
}

/*
 * Une page qui compose ses sections a la main ecrit son propre type a partir
 * de celui-ci — `Omit<MarketingPageContent, 'shot'> & { ... }` — plutot que de
 * piocher dans un alias tout fait. Les deux premieres pages n'omettent deja
 * pas le meme bloc : un `CustomMarketingPageContent` unique aurait fini par
 * ne plus rien decrire. Rendre les champs optionnels serait pire encore, une
 * page ordinaire pourrait en oublier un sans que rien ne le signale.
 */
