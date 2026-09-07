/**
 * Source unique de vérité du design system.
 *
 * Ne contient que ce qui est PROPRE au projet. Les neutres du site
 * (gris, ardoise, rouges, verts d'état) sont ceux de la palette Tailwind
 * par défaut : on les consomme via leurs classes natives (`text-stone-600`,
 * `bg-gray-900`, `text-green-500`…) plutôt que de les ré-aliaser ici, pour
 * qu'une couleur n'ait jamais deux noms.
 *
 * tailwind.config.ts importe ce fichier : aucune valeur n'est recopiée.
 */

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  REGLE DES ACCENTS — deux couleurs, deux roles, aucune exception
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  gold   Action. Boutons et liens d'action, etat actif d'un onglet ou d'une
 *         pastille, element survole ou focalise. Rien d'autre. Un titre, une
 *         icone decorative ou un intertitre ne sont pas des actions : ils ne
 *         prennent pas d'or.
 *
 *  green  Validation. Confirmation, conformite, succes, seuil respecte. Rien
 *         d'autre. Un chiffre qui monte n'est pas une validation.
 *
 *  Aucun troisieme accent. Le rouge reste possible pour une erreur ou une
 *  alerte reelle — c'est un etat, pas un accent de marque, et il ne doit
 *  jamais servir a mettre un mot en valeur dans un titre.
 *
 *  Pourquoi : trois accents en concurrence ne signalent plus rien. Quand l'or
 *  souligne a la fois un bouton, un mot de titre, une icone et un intertitre,
 *  le lecteur cesse de lui accorder un sens et le percoit comme une
 *  decoration. Le jaune des icones ODD et le vert du logo CIPA sont des
 *  couleurs imposees par des tiers : elles vivent dans leur propre bloc et ne
 *  se propagent pas au reste de l'interface.
 */

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CONTRASTE — le contrat, mesure, pour les fonds clairs du site
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Seuils WCAG 2.1 AA : 4,5:1 pour le texte courant, 3:1 pour le texte large
 *  (>= 24 px, ou >= 18,66 px en gras) et pour les elements d'interface.
 *
 *  Les fonds clairs du site, du plus sombre au plus clair — c'est le plus
 *  SOMBRE qui commande, puisque le texte est sombre :
 *
 *    creme      #F4F3EE   `bg-cream`, fond de section
 *    mesh       #F3F4F6   creux de `gradient.section`
 *    blanc      #FFFFFF   `bg-white`
 *
 *  Ratios mesures sur creme, le cas le plus defavorable :
 *
 *    gray-900   #111827   16,26:1   titres
 *    stone-800  #292524   11,10:1
 *    stone-700  #44403C    9,50:1   navigation
 *    stone-600  #57534E    6,87:1   TEXTE SECONDAIRE PAR DEFAUT
 *    stone-500  #78716C    4,32:1   -- echoue sur creme et sur le mesh.
 *                                      Ne passe (4,80:1) que sur blanc pur.
 *                                      A reserver aux icones decoratives.
 *    stone-400  #A8A29E    2,27:1   -- jamais de texte.
 *
 *  Autrement dit : sur fond clair, le gris de texte le plus pale autorise est
 *  `stone-600`. Les trois gris de texte du site portent donc un nom — voir
 *  `color.text` plus bas : ce sont les seuls gris autorises sur fond clair, et
 *  ils sont les seuls a deroger a la regle « une couleur, un nom » enoncee en
 *  tete de fichier. La derogation est assumee : un gris de texte n'est pas une
 *  nuance de palette, c'est un role, et c'est le role qui doit etre verifiable.
 *
 *  L'or, lui, a bien besoin de noms : la meme couleur de marque ne peut pas
 *  servir a la fois de fond, de texte large et de petit libelle. D'ou
 *  `gold.DEFAULT` / `gold.deep` / `gold.ink`, documentes ci-dessous.
 */

export const tokens = {
  color: {
    /** Or de marque. `DEFAULT` est l'unique or d'accent du site. */
    gold: {
      50: '#FDF8EE',
      100: '#F9EDCC',
      200: '#F2D995',
      300: '#E9C15E',
      400: '#E0A93A',
      500: '#DAA250',
      600: '#C47E1A',
      700: '#9E5F18',
      800: '#7E4A1A',
      900: '#673D1A',
      DEFAULT: '#DAA250',

      /**
       * Or de TEXTE LARGE sur fond clair — titres, mots d'accroche, tout ce
       * qui fait 24 px, ou 18,66 px en gras.
       *
       * 3,11:1 sur creme, 3,14:1 sur le creux du mesh, 3,46:1 sur blanc.
       * Seuil WCAG AA du texte large : 3:1.
       *
       * Corrige depuis #B6842B, qui se donnait deja ce role mais plafonnait
       * a 2,99:1 sur creme — sous le seuil, d'un cheveu. Meme teinte (36 deg)
       * et meme saturation (65 %) que `DEFAULT` : seule la luminosite baisse,
       * de 58 % a 44 %. L'or reste l'or.
       *
       * `DEFAULT` ne descend a 2,04:1 sur creme : il ne doit jamais porter du
       * texte sur fond clair. Sur fond sombre il est a 8,56:1 et reste le bon
       * choix.
       */
      deep: '#B97E27',

      /**
       * Or de TEXTE COURANT sur fond clair — libelles, sur-titres, tout ce
       * qui passe sous 18,66 px.
       *
       * 4,63:1 sur creme, 5,14:1 sur blanc. Seuil WCAG AA : 4,5:1.
       *
       * Meme teinte et meme saturation que les deux autres. On ne descend a
       * cette luminosite que quand la taille l'impose : sur un grand titre,
       * `deep` suffit et conserve plus d'eclat.
       */
      ink: '#93641F',

      /** Teinte claire pour les fonds et halos dorés. */
      tint: '#F4E7BC',
    },

    /**
     * ─────────────────────────────────────────────────────────────────
     *  GRIS DE TEXTE SUR FOND CLAIR — trois roles, trois valeurs
     * ─────────────────────────────────────────────────────────────────
     *
     * Avant, ces gris etaient disperses : `text-stone-500`, `text-slate-400`,
     * `text-[#78716C]`, `text-[#A8A29E]`, `text-dark/35`… La meme intention
     * — « ce texte est secondaire » — s'ecrivait de cinq facons, dont trois
     * echouaient au seuil AA. Un role, une valeur, un endroit.
     *
     * Chaque valeur est verifiee sur le fond CLAIR LE PLUS SOMBRE du site,
     * la creme #F4F3EE ; elle passe donc a fortiori sur le mesh (#F3F4F6),
     * sur le gris de page de Contact (#F7F7F6) et sur le blanc.
     *
     * Exposees en classes Tailwind (`text-muted`, `text-subtle`,
     * `text-placeholder`, `placeholder:text-placeholder`) par
     * tailwind.config.ts, et en variables CSS (`--text-muted`…) par
     * app/globals.css pour le peu de CSS ecrit a la main.
     */
    text: {
      /**
       * Texte secondaire courant : paragraphes d'accompagnement, descriptions,
       * legendes. C'est `stone-600` inchange — il tenait deja largement le
       * seuil, le renommer suffisait.
       *
       * 6,87:1 sur creme · 6,93:1 sur mesh · 7,63:1 sur blanc.
       */
      muted: '#57534E',

      /**
       * Libelles, sur-titres en capitales, mentions legales, micro-labels des
       * maquettes sectorielles. Remplace `stone-500` (#78716C, 4,32:1 sur
       * creme) et `slate-400` (#94A3B8, 2,85:1 sur blanc), tous deux sous le
       * seuil. Meme famille chaude que `muted`, une marche plus claire.
       *
       * 5,17:1 sur creme · 5,22:1 sur mesh · 5,74:1 sur blanc.
       */
      subtle: '#6B6560',

      /**
       * Texte d'invite des champs de saisie, et lui seul. Remplace `stone-400`
       * (#A8A29E), qui tombait a 2,52:1 sur le blanc des champs — de loin la
       * violation la plus severe du site.
       *
       * Le placeholder reste la valeur la plus claire des trois : il doit se
       * distinguer au premier coup d'oeil du texte saisi (#1C1917), sans quoi
       * on ne sait plus si un champ est rempli.
       *
       * 4,75:1 sur creme · 5,28:1 sur blanc.
       */
      placeholder: '#6F6B68',
    },

    /** Noirs de marque. Distincts de gray-900, volontairement plus profonds. */
    dark: {
      DEFAULT: '#0C0D12',
      /** Surface sombre surélevée (cartes sur fond noir). */
      raised: '#1A1B24',
    },

    /** Crèmes : fond de page et bordures chaudes. */
    cream: {
      DEFAULT: '#F4F3EE',
      /** Bordure crème — le trait qui délimite les cartes sur fond clair. */
      border: '#ECE7DD',
      /** Crème assombri, pour les séparateurs appuyés. */
      deep: '#DDD9CF',
    },

    // Pas de token pour les fonds quasi blancs : ils sont à dE 0,7 et 1,6 de
    // stone-100 et stone-50, donc indiscernables. On utilise les classes
    // Tailwind natives plutôt qu'un second nom pour la même couleur.

    /**
     * Accents ponctuels de CipaSection. Conservés tels quels pour ne rien
     * changer visuellement ; candidats à la suppression si la section évolue.
     */
    accent: {
      lime: '#C7FF3A',
      green: '#3FAE5A',
    },

    /** Couleurs imposées par des marques tierces. */
    brand: {
      linkedin: '#0A66C2',

      /**
       * Couleurs officielles des Objectifs de Développement Durable de l'ONU,
       * indexées par numéro d'objectif. Imposées par la charte onusienne :
       * elles ne teintent que l'ombre de la pastille survolée et ne se
       * propagent pas au reste de l'interface, comme le vert du logo CIPA.
       */
      sdg: {
        7: '#FCC30B',
        8: '#A21942',
        9: '#FD6925',
        12: '#BF8B2E',
        13: '#3F7E44',
        17: '#19486A',
      },
    },
  },

  /** Degrades reutilises tels quels par plusieurs sections. */
  gradient: {
    /** Fond de section clair : stone-100 -> gray-100 -> stone-50. */
    section: 'linear-gradient(135deg, #F5F5F4 0%, #F3F4F6 40%, #FAFAF9 100%)',
  },

  radius: {
    sm: '8px',
    md: '12px',
    lg: '20px',
    full: '9999px',
  },

  /** Durées en secondes — consommées telles quelles par Framer Motion. */
  duration: {
    fast: 0.2,
    base: 0.45,
    slow: 0.8,
  },

  /** Courbes de Bézier au format Framer Motion. */
  ease: {
    out: [0.16, 1, 0.3, 1],
    inOut: [0.65, 0, 0.35, 1],
  },

  /** Décalage vertical par défaut des entrées animées, en pixels. */
  shift: 24,

  /** Décalage entre deux éléments d'une même séquence, en secondes. */
  stagger: 0.08,
} as const

/** Durées au format CSS, dérivées de `tokens.duration`. */
export const durationCss = {
  fast: `${tokens.duration.fast * 1000}ms`,
  base: `${tokens.duration.base * 1000}ms`,
  slow: `${tokens.duration.slow * 1000}ms`,
} as const

/** Courbes au format CSS, dérivées de `tokens.ease`. */
export const easeCss = {
  out: `cubic-bezier(${tokens.ease.out.join(', ')})`,
  inOut: `cubic-bezier(${tokens.ease.inOut.join(', ')})`,
} as const

export type Tokens = typeof tokens
