import type { LucideIcon } from 'lucide-react'

import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import HeadingRule from '@/components/ui/HeadingRule'
import OpenRing, { type RingTone } from '@/components/ui/OpenRing'
import SectionHeading from '@/components/ui/SectionHeading'

/**
 * Les valeurs de l'entreprise, en liste annotee.
 *
 * Remplace la grille de cartes : six cadres blancs identiques alignes sur
 * deux rangees se lisent comme un tableau de tuiles, et la pastille de
 * couleur — le seul element qui distinguait une valeur d'une autre — y
 * tenait 11 px dans un coin. Ici la couleur devient la structure : elle
 * trace l'anneau, le filet qui tient la colonne et le tiret sous le titre.
 * Chaque valeur garde son identite sans qu'on ait a dessiner six boites.
 *
 * Pas de 'use client' : aucun etat. Seules les entrees au scroll traversent
 * la frontiere, via Reveal.
 */

/**
 * Palette par valeur.
 *
 * Les classes sont ecrites en toutes lettres, jamais assemblees par
 * concatenation : le JIT de Tailwind lit le source et ne genererait pas une
 * classe construite a l'execution.
 */
const TONES = {
  rose: {
    arc: 'stroke-rose-300',
    dot: 'bg-rose-400',
    glow: 'bg-rose-100/70',
    icon: 'text-rose-500',
    rule: 'border-rose-200',
    dash: 'bg-rose-400',
  },
  pink: {
    arc: 'stroke-pink-300',
    dot: 'bg-pink-400',
    glow: 'bg-pink-100/70',
    icon: 'text-pink-500',
    rule: 'border-pink-200',
    dash: 'bg-pink-400',
  },
  blue: {
    arc: 'stroke-blue-300',
    dot: 'bg-blue-400',
    glow: 'bg-blue-100/70',
    icon: 'text-blue-500',
    rule: 'border-blue-200',
    dash: 'bg-blue-400',
  },
  emerald: {
    arc: 'stroke-emerald-300',
    dot: 'bg-emerald-400',
    glow: 'bg-emerald-100/70',
    icon: 'text-emerald-500',
    rule: 'border-emerald-200',
    dash: 'bg-emerald-400',
  },
  violet: {
    arc: 'stroke-violet-300',
    dot: 'bg-violet-400',
    glow: 'bg-violet-100/70',
    icon: 'text-violet-500',
    rule: 'border-violet-200',
    dash: 'bg-violet-400',
  },
  amber: {
    arc: 'stroke-amber-300',
    dot: 'bg-amber-400',
    glow: 'bg-amber-100/70',
    icon: 'text-amber-500',
    rule: 'border-amber-200',
    dash: 'bg-amber-400',
  },
} as const satisfies Record<string, RingTone & { rule: string; dash: string }>

export type ValueTone = keyof typeof TONES

export type Value = {
  icon: LucideIcon
  title: string
  desc: string
  tone: ValueTone
}

/** Bandeau de synthese pose sous la grille. `accent` termine la phrase. */
export type ValuesFootnote = {
  icon: LucideIcon
  text: string
  accent: string
}

export default function ValuesShowcase({
  badge = null,
  title,
  accent,
  subtitle,
  values,
  footnote,
}: {
  badge?: string | null
  title: string
  accent?: string
  subtitle?: string
  values: readonly Value[]
  footnote?: ValuesFootnote
}) {
  const FootnoteIcon = footnote?.icon

  return (
    <>
      <SectionHeading
        badge={badge}
        title={title}
        accent={accent}
        subtitle={subtitle}
      />

      <HeadingRule className="mt-9" />

      <RevealGroup
        className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-12"
        stagger={0.06}
      >
        {values.map((value) => {
          const tone = TONES[value.tone]
          return (
            <RevealItem key={value.title} className="flex items-start gap-4 sm:gap-5">
              <OpenRing icon={value.icon} tone={tone} />

              {/* FILET + TEXTE — le trait colore tient la colonne a la place
                  du cadre, le tiret separe le titre de son explication. */}
              <div className={`flex-1 border-l pb-1 pl-5 ${tone.rule}`}>
                <h3 className="text-[15.5px] font-bold tracking-[-0.02em] text-dark">
                  {value.title}
                </h3>

                <span aria-hidden className={`mt-3 block h-[2px] w-7 rounded-full ${tone.dash}`} />

                <p className="mt-3 text-[13px] leading-[1.7] text-stone-600">
                  {value.desc}
                </p>
              </div>
            </RevealItem>
          )
        })}
      </RevealGroup>

      {footnote && FootnoteIcon && (
        <Reveal className="mt-14 sm:mt-16">
          <div className="mx-auto flex max-w-3xl items-center gap-4 rounded-[20px] bg-stone-100/80 px-5 py-5 sm:gap-6 sm:px-8">
            <span
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-50 sm:h-14 sm:w-14"
            >
              <FootnoteIcon size={22} strokeWidth={1.6} className="text-emerald-700" />
            </span>

            <span aria-hidden className="h-10 w-px shrink-0 bg-emerald-200" />

            <p className="text-[14px] font-semibold leading-[1.6] text-dark sm:text-[15.5px]">
              {footnote.text}{' '}
              <span className="font-medium text-emerald-700">{footnote.accent}</span>
            </p>
          </div>
        </Reveal>
      )}
    </>
  )
}
