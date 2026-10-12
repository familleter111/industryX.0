'use client'

import { useState, type ReactNode } from 'react'

import { GUIDE_CATEGORIES, categoryLabel, type GuideCategory } from '@/lib/data/guides'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

const COPY = {
  fr: {
    all: 'Tous',
    filter: 'Filtrer les guides par thème',
    shown: (n: number) => `${n} guide${n > 1 ? 's' : ''} affiché${n > 1 ? 's' : ''}`,
  },
  en: {
    all: 'All',
    filter: 'Filter guides by topic',
    shown: (n: number) => `${n} guide${n > 1 ? 's' : ''} shown`,
  },
}

/**
 * Filtre par categorie de la bibliotheque de guides.
 *
 * Les cartes sont rendues sur le serveur (GuideCard) et passees deja
 * resolues, indexees par categorie : seul le filtre est client, les cartes
 * n'emportent pas leur code dans le bundle.
 *
 * Les categories sans guide ne sont pas proposees : un filtre qui mene a une
 * grille vide est un cul-de-sac.
 */
export default function GuidesLibrary({
  cards,
}: {
  cards: { key: string; category: GuideCategory; node: ReactNode }[]
}) {
  const [active, setActive] = useState<GuideCategory | 'Tous'>('Tous')
  const locale = useCurrentLocale()
  const t = useCopy(COPY)

  const available = GUIDE_CATEGORIES.filter((category) =>
    cards.some((card) => card.category === category),
  )
  const filters: (GuideCategory | 'Tous')[] = ['Tous', ...available]
  const visible = cards.filter((card) => active === 'Tous' || card.category === active)

  return (
    <>
      <div
        role="group"
        aria-label={t.filter}
        className="mt-8 flex flex-wrap justify-center gap-2"
      >
        {filters.map((filter) => {
          const selected = filter === active
          const count =
            filter === 'Tous'
              ? cards.length
              : cards.filter((card) => card.category === filter).length
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep ${
                selected
                  ? 'border-dark bg-dark text-white'
                  : 'border-[#E7E5E4] bg-white text-stone-700 hover:border-gold/40 hover:text-dark'
              }`}
            >
              {filter === 'Tous' ? t.all : categoryLabel(filter, locale)}
              <span
                className={`text-[11px] tabular-nums ${selected ? 'text-gold' : 'text-subtle'}`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* `aria-live` : le changement de filtre est annonce sans deplacer le focus. */}
      <p aria-live="polite" className="sr-only">
        {t.shown(visible.length)}
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        {visible.map((card) => (
          <li key={card.key}>{card.node}</li>
        ))}
      </ul>
    </>
  )
}
