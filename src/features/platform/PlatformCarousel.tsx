'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Pause,
  Play,
  XCircle,
} from 'lucide-react'

import { platformPage, type PlatformSection } from '@/lib/data/platform'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

const COPY = {
  fr: {
    preview: 'Aperçu',
    inProgress: 'En cours',
    continue: 'Continuer',
    caption: 'Aperçu schématique de l’interface CIPA.',
    uses: 'Usages',
    of: 'sur',
    before: 'Avant CIPA',
    after: 'Avec CIPA',
    prev: 'Carte précédente',
    next: 'Carte suivante',
    pause: 'Mettre en pause',
    play: 'Lancer le défilement',
    goTo: 'Aller à la carte',
  },
  en: {
    preview: 'Preview',
    inProgress: 'In progress',
    continue: 'Continue',
    caption: 'Schematic preview of the CIPA interface.',
    uses: 'Use cases',
    of: 'of',
    before: 'Before CIPA',
    after: 'With CIPA',
    prev: 'Previous card',
    next: 'Next card',
    pause: 'Pause',
    play: 'Start autoplay',
    goTo: 'Go to card',
  },
}

type Copy = (typeof COPY)['fr']

/**
 * Carrousel des usages d'une page Plateforme. Meme grammaire que le
 * carrousel des pages sectorielles (features/industries/SmartCarousel) :
 * onglets numerotes, carte glissante, fleches, balayage, lecture automatique
 * et pagination.
 *
 * Seul le slug traverse la frontiere serveur / client : la donnee contient
 * des icones Lucide, donc des fonctions, qui ne se serialisent pas.
 *
 * ANCRES. Le menu et les cartes de l'accueil visent un usage precis
 * (/plateforme/terrain#audits). Une seule carte etant affichee a la fois,
 * chaque `id` est porte par un repere invisible en tete du carrousel : le
 * navigateur y defile, puis le carrousel lit l'ancre et ouvre la bonne carte.
 * La lecture automatique s'arrete alors, pour ne pas quitter la carte
 * demandee sous les yeux du lecteur.
 */

const AUTOPLAY_MS = 8000
const NO_SLIDES: PlatformSection[] = []

function VisualPanel({ section, pageName, t }: { section: PlatformSection; pageName: string; t: Copy }) {
  // Toutes les etapes sauf la derniere sont faites : l'apercu montre un
  // traitement en cours, d'ou le bouton « Continuer ».
  const done = section.points.length - 1
  const progress = Math.round((done / section.points.length) * 100)

  return (
    <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
        <span className="truncate text-[10px] font-bold uppercase tracking-wider text-subtle">
          {section.title}
        </span>
        <span className="ml-auto shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[9px] font-bold text-subtle">
          {t.preview}
        </span>
      </div>

      <div className="flex flex-1 items-center">
        <div className="w-full rounded-2xl bg-dark p-4 text-white shadow-[0_20px_45px_rgba(12,13,18,0.25)] sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gold">
                CIPA · {pageName}
              </p>
              <p className="mt-1 text-[14px] font-black leading-snug tracking-[-0.01em]">
                {section.title}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t.inProgress}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[11px] font-bold tabular-nums text-white/70">
              {done} / {section.points.length}
            </span>
          </div>

          <ul className="mt-4 space-y-2">
            {section.points.map((point, i) => (
              <li
                key={point}
                className="flex items-center gap-2.5 rounded-xl bg-white/[0.05] px-3.5 py-2.5 text-[12px]"
              >
                {i < done ? (
                  <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                ) : (
                  <Circle size={14} className="shrink-0 text-white/35" />
                )}
                <span className={i < done ? 'text-white/85' : 'text-white/55'}>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl bg-gold px-4 py-2.5 text-center text-[12.5px] font-bold text-dark">
            {t.continue}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[10px] italic leading-snug text-subtle">
        {t.caption}
      </p>
    </div>
  )
}

export default function PlatformCarousel({ slug }: { slug: string }) {
  const t = useCopy(COPY)
  const page = platformPage(slug, useCurrentLocale())
  const slides = page ? page.sections : NO_SLIDES

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing, setPlaying] = useState(true)
  const hoverRef = useRef(false)

  const goTo = useCallback(
    (target: number) => {
      setDirection(target > index || (index === slides.length - 1 && target === 0) ? 1 : -1)
      setIndex(((target % slides.length) + slides.length) % slides.length)
    },
    [index, slides.length],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Ancre -> carte. Relue apres un tour de boucle : lors d'une navigation
  // cote client, le routeur met l'URL a jour apres les effets de la page.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const target = slides.findIndex((s) => s.id === id)
      if (target >= 0) {
        setIndex(target)
        setPlaying(false)
      }
    }
    openFromHash()
    const t = setTimeout(openFromHash, 0)
    window.addEventListener('hashchange', openFromHash)
    return () => {
      clearTimeout(t)
      window.removeEventListener('hashchange', openFromHash)
    }
  }, [slides])

  // Mouvement reduit demande : pas de defilement automatique.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      if (!hoverRef.current) next()
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [playing, next])

  if (!page || slides.length === 0) return null
  const slide = slides[index]
  const num = (i: number) => String(i + 1).padStart(2, '0')
  const total = num(slides.length - 1)

  return (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onFocusCapture={() => (hoverRef.current = true)}
      onBlurCapture={() => (hoverRef.current = false)}
    >
      {/* Reperes d'ancrage, un par carte (voir l'en-tete du fichier). */}
      {slides.map((s) => (
        <span key={s.id} id={s.id} aria-hidden className="block scroll-mt-[110px]" />
      ))}

      <div
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label={`${t.uses} : ${page.name}`}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls="platform-carousel-panel"
            onClick={() => {
              goTo(i)
              setPlaying(false)
            }}
            className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold transition-all duration-300 ${
              i === index
                ? 'border-dark bg-dark text-white shadow-lg'
                : 'border-slate-200 bg-white/70 text-subtle hover:border-gold hover:text-dark'
            }`}
          >
            <span className={`font-black ${i === index ? 'text-gold' : 'text-gold-ink'}`}>{num(i)}</span>
            <span className="hidden max-w-[220px] truncate sm:inline">{s.title}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            id="platform-carousel-panel"
            role="tabpanel"
            aria-roledescription="carte"
            aria-label={`${num(index)} ${t.of} ${total} : ${slide.title}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next()
              else if (info.offset.x > 80) prev()
            }}
            className="cursor-grab overflow-hidden rounded-[2rem] border border-cream-border bg-cream shadow-[0_25px_60px_rgba(0,0,0,0.05)] active:cursor-grabbing"
          >
            <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:p-10 lg:grid-cols-12">
              <div className="flex flex-col lg:col-span-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-display text-3xl font-black text-gold/30">{num(index)}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-ink">
                    {page.name}
                  </span>
                </div>
                <h3 className="mb-4 font-display text-xl font-black leading-snug tracking-tight text-dark sm:text-2xl">
                  {slide.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">{slide.lead}</p>

                <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-0">
                  <div className="relative rounded-2xl border border-red-100 bg-gradient-to-br from-red-50/70 to-white p-4 sm:rounded-r-none sm:border-r-0 sm:p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <XCircle size={13} className="text-red-600" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">{t.before}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {slide.before.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[11.5px] leading-snug text-subtle">
                          <XCircle size={13} className="mt-[1px] shrink-0 text-red-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="absolute left-1/2 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-200 bg-white shadow-[0_6px_16px_rgba(0,0,0,0.08)] sm:flex">
                    <ArrowRight size={15} className="text-emerald-500" />
                  </div>

                  <div className="relative rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-white p-4 shadow-[0_10px_30px_rgba(16,185,129,0.08)] sm:rounded-l-none sm:p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                        <CheckCircle2 size={13} className="text-emerald-700" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{t.after}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {slide.points.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[11.5px] leading-snug text-slate-600">
                          <CheckCircle2 size={13} className="mt-[1px] shrink-0 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <VisualPanel section={slide} pageName={page.name} t={t} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label={t.prev}
          className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-dark shadow-lg transition-all hover:border-gold hover:text-gold sm:h-11 sm:w-11 sm:-translate-x-5"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={t.next}
          className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full border border-slate-200 bg-white text-dark shadow-lg transition-all hover:border-gold hover:text-gold sm:h-11 sm:w-11 sm:translate-x-5"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? t.pause : t.play}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-subtle transition-all hover:border-gold hover:text-gold"
        >
          {playing ? <Pause size={12} /> : <Play size={12} />}
        </button>
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${t.goTo} ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index ? 'h-2 w-8 bg-gold' : 'h-2 w-2 bg-slate-300 hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold tabular-nums text-subtle">
          {num(index)} / {total}
        </span>
      </div>
    </div>
  )
}
