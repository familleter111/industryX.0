import type { Config } from 'tailwindcss'
import { tokens, durationCss, easeCss } from './lib/tokens'

const { color, radius } = tokens

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
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
        marquee: 'marquee 25s linear infinite',
        orbit: 'orbit 90s linear infinite',
        'orbit-reverse': 'orbitReverse 90s linear infinite',
      },
      keyframes: {
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
