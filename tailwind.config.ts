import type { Config } from 'tailwindcss'
import { tokens, durationCss, easeCss } from './lib/tokens'

const { color, radius } = tokens

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    // Contenu editorial des pages marketing. Il ne porte aujourd'hui aucune
    // classe — que du texte et des references d'icones —, mais le jour ou une
    // entree en portera une, elle sera generee au lieu de disparaitre
    // silencieusement de la feuille de style.
    './content/**/*.{ts,tsx}',
    // Sections désactivées : conservées pour référence, exclues du CSS généré.
    '!./components/_archive/**',
  ],
  theme: {
    extend: {
      // Aucune valeur n'est écrite ici : tout vient de lib/tokens.ts.
      // Les neutres (stone, gray, slate, red, green, blue…) restent ceux de
      // Tailwind et se consomment via leurs classes natives.
      colors: {
        gold: color.gold,
        dark: color.dark,
        cream: color.cream,
        brand: color.brand,

        // Gris de TEXTE sur fond clair. Exposes a plat, et non sous un
        // prefixe `text`, pour que la classe se lise `text-muted` et non
        // `text-text-muted`. Les valeurs et les ratios mesures sont dans
        // lib/tokens.ts, sous `color.text`.
        muted: color.text.muted,
        subtle: color.text.subtle,
        placeholder: color.text.placeholder,
      },
      fontFamily: {
        display: ['var(--font-syne)', 'serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        full: radius.full,
      },
      spacing: {
        // Respiration verticale d'une section.
        section: '6rem',
        'section-lg': '8rem',
      },
      transitionDuration: {
        fast: durationCss.fast,
        DEFAULT: durationCss.base,
        base: durationCss.base,
        slow: durationCss.slow,
      },
      transitionTimingFunction: {
        smooth: easeCss.out,
        'smooth-in-out': easeCss.inOut,
      },
      boxShadow: {
        card: '0 10px 30px rgba(12, 13, 18, 0.06)',
        lifted: '0 20px 60px rgba(12, 13, 18, 0.10)',
        gold: `0 10px 45px ${color.gold.DEFAULT}40`,
      },
      zIndex: {
        header: '50',
        overlay: '80',
        modal: '90',
        intro: '9999',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        // Derive d'ambiance des orbes de fond : boucle autonome, donc CSS.
        // La duree et le decalage sont surcharges par element via style.
        'orb-drift': 'orbDrift 10s ease-in-out infinite',
        // Boucles autonomes : aucune ne depend d'un etat React ni du scroll.
        shimmer: 'shimmer 3s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'dash-march': 'dashMarch 1s linear infinite',
        'float-soft': 'floatSoft 8s ease-in-out infinite',
        orbit: 'orbit 90s linear infinite',
        'orbit-reverse': 'orbitReverse 90s linear infinite',
        // Sortie de l'ecran d'introduction. Exception assumee a la regle
        // "une boucle autonome par animation" : ce n'est pas une boucle, mais
        // c'est bien une animation qui n'a besoin de savoir rien de rien.
        // La confier a Framer Motion la rendrait dependante de l'hydratation,
        // c'est-a-dire du poids du bundle — exactement ce qu'on veut eviter.
        'welcome-out': 'welcomeOut 460ms cubic-bezier(0.76, 0, 0.24, 1) forwards',
      },
      keyframes: {
        shimmer: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(500%)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        dashMarch: {
          from: { strokeDashoffset: '0' },
          to: { strokeDashoffset: '-20' },
        },
        // Flottement leger de la barre ODD. Pas de variation d'opacite : ces
        // pastilles sont du contenu, pas un decor de fond — les faire pulser
        // entre 0.6 et 0.9 les rendrait delavees en permanence. L'amplitude
        // reste faible (6 px) pour que la barre respire sans se disloquer :
        // le decalage de phase entre pastilles vient de --tilt et du delay.
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(var(--tilt, 0deg))' },
        },
        orbDrift: {
          '0%, 100%': { transform: 'scale(1) translateX(0px)' },
          '50%': { transform: 'scale(1.15) translateX(30px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbitReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        // 0 -> 40 % : le temps de marque, l'ecran est plein.
        // 40 -> 100 % : il s'efface en montant.
        // `visibility` n'est pas interpolable, elle bascule d'un coup a la
        // derniere image ; combinee a `forwards` elle sort definitivement
        // l'element du hit-testing et de l'arbre d'accessibilite, ce que
        // `opacity: 0` seul ne fait pas.
        welcomeOut: {
          '0%, 40%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-40px)', visibility: 'hidden' },
        },
      },
      backgroundImage: {
        'mesh-light': `
          radial-gradient(ellipse at 20% 50%, ${color.gold.DEFAULT}14 0%, transparent 55%),
          radial-gradient(ellipse at 80% 20%, ${color.gold.DEFAULT}0d 0%, transparent 55%),
          radial-gradient(ellipse at 50% 85%, rgba(34,197,94,0.04) 0%, transparent 50%)
        `,
        'mesh-dark': `
          radial-gradient(ellipse at 20% 50%, ${color.gold.DEFAULT}1f 0%, transparent 55%),
          radial-gradient(ellipse at 80% 20%, ${color.gold.DEFAULT}14 0%, transparent 55%),
          radial-gradient(ellipse at 50% 85%, rgba(34,197,94,0.06) 0%, transparent 50%)
        `,
      },
    },
  },
  plugins: [],
}

export default config
