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
      /** Or assombri, lisible sur fond clair — réservé au texte. */
      deep: '#B6842B',
      /** Teinte claire pour les fonds et halos dorés. */
      tint: '#F4E7BC',
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

    /** Fonds de section quasi blancs. */
    surface: {
      DEFAULT: '#F7F7F6',
      /** Variante chaude, légèrement ivoire. */
      warm: '#FAF9F5',
    },

    /** Couleurs imposées par des marques tierces. */
    brand: {
      linkedin: '#0A66C2',
    },
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
