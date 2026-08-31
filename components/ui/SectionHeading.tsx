'use client'

import { motion } from 'framer-motion'

type Tone = 'light' | 'dark'

/** Pastille « ● INDUSTRY X.0 » utilisée en tête de section. */
export function SectionBadge({
  label = 'Industry X.0',
  tone = 'light',
}: {
  label?: string
  tone?: Tone
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur-sm ${
        tone === 'dark'
          ? 'border-white/12 bg-white/[0.04]'
          : 'border-stone-200 bg-white/70'
      }`}
    >
      <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-gold" />
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[11px] ${
          tone === 'dark' ? 'text-white/75' : 'text-stone-600'
        }`}
      >
        {label}
      </span>
    </span>
  )
}

/**
 * En-tête de section centré : pastille + titre (dont la fin est en doré)
 * + sous-titre. Partagé par les pages Société et Ressources.
 */
export default function SectionHeading({
  badge = 'Industry X.0',
  title,
  accent,
  subtitle,
  tone = 'light',
  className = '',
}: {
  badge?: string | null
  title: string
  /** Fin du titre, rendue en doré. */
  accent?: string
  subtitle?: string
  tone?: Tone
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center text-center ${className}`}
    >
      {badge && <SectionBadge label={badge} tone={tone} />}

      <h2
        className={`mt-6 max-w-3xl font-display text-[30px] font-black leading-[1.08] tracking-[-0.04em] sm:text-[40px] lg:text-[52px] ${
          tone === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
        {accent && <span className="text-gold"> {accent}</span>}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-[1.7] sm:text-[16px] ${
            tone === 'dark' ? 'text-white/60' : 'text-stone-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
