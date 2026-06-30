import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8ee',
          100: '#f9edcc',
          200: '#f2d995',
          300: '#e9c15e',
          400: '#e0a93a',
          500: '#DAA250',
          DEFAULT: '#DAA250',
          600: '#c47e1a',
          700: '#9e5f18',
          800: '#7e4a1a',
          900: '#673d1a',
        },
        dark: {
          DEFAULT: '#0C0D12',
          50: '#1a1b24',
          100: '#141520',
          200: '#0f1018',
          300: '#0C0D12',
        },
        cream: {
          DEFAULT: '#F4F3EE',
          50: '#FAFAF7',
          100: '#F4F3EE',
          200: '#EDECEA',
        },
        metric: {
          green: '#22C55E',
          blue: '#3B82F6',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        display: ['var(--font-syne)', 'serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'progress': 'progressFill 1.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width)' },
        }
      },
      backgroundImage: {
        'mesh-light': `
          radial-gradient(ellipse at 20% 50%, rgba(218,162,80,0.08) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 20%, rgba(218,162,80,0.05) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 85%, rgba(34,197,94,0.04) 0%, transparent 50%)
        `,
        'mesh-dark': `
          radial-gradient(ellipse at 20% 50%, rgba(218,162,80,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 20%, rgba(218,162,80,0.08) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 85%, rgba(34,197,94,0.06) 0%, transparent 50%)
        `,
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}

export default config
