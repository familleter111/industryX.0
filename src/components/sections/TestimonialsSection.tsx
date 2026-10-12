'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { findClientLogo, logoFrameWidth } from '@/lib/data/clientLogos'
import { getTestimonials, type Testimonial } from '@/lib/data/testimonials'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/hooks/useMotion'
import Section from '@/components/ui/Section'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

const COPY = {
  fr: {
    title: 'Ils transforment leur industrie',
    titleEnd: 'avec CIPA',
    prev: 'Témoignages précédents',
    next: 'Témoignages suivants',
    page: 'Page de témoignages',
  },
  en: {
    title: 'They are transforming their industry',
    titleEnd: 'with CIPA',
    prev: 'Previous testimonials',
    next: 'Next testimonials',
    page: 'Testimonials page',
  },
}

/**
 * Témoignages : source unique dans lib/data/testimonials.ts.
 * `true` inclut les propositions de rédaction (`status: 'draft'`), qui doivent
 * être validées par les entreprises citées — voir l'en-tête de ce fichier.
 */

/* Vignette du client : logo de /public/logos, sinon le `fallbackLogo` du
   témoignage, initiales en dernier recours.
   `logoFrameWidth` inscrit le contenu réel dans une boîte commune pour que
   tous les logos paraissent de la même taille. */
function ClientAvatar({ testimonial }: { testimonial: Testimonial }) {
  const logo =
    (testimonial.logoAlt ? findClientLogo(testimonial.logoAlt) : undefined) ??
    testimonial.fallbackLogo

  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white ring-2 ring-white shadow-md">
      {logo ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={512}
          height={512}
          /* contenu inscrit dans 44×34 */
          style={{ width: logoFrameWidth(logo, 44, 34) }}
          className="h-auto max-w-full shrink-0 object-contain"
        />
      ) : (
        <span className="font-display text-[17px] font-black text-gold-deep">
          {testimonial.company
            .split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('')}
        </span>
      )}
    </div>
  )
}

export default function TestimonialsSection() {
  const m = useMotion()
  const copy = useCopy(COPY)
  const testimonials = getTestimonials(true, useCurrentLocale())
  const ref = useRef(null)

  /* Carrousel : les cartes défilent horizontalement (1 / 2 / 3 par écran
     selon la largeur). On ne pilote pas un index de carte mais une page de
     défilement — c'est le navigateur qui scrolle, avec scroll-snap, donc la
     molette, le trackpad et le geste tactile restent fonctionnels. */
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el || el.clientWidth === 0) return
    setPageCount(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)))
    setPage(Math.round(el.scrollLeft / el.clientWidth))
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  const goTo = useCallback(
    (target: number) => {
      const el = scrollerRef.current
      if (!el) return
      const clamped = Math.max(0, Math.min(target, pageCount - 1))
      el.scrollTo({
        left: clamped * el.clientWidth,
        behavior: m.reduce ? 'auto' : 'smooth',
      })
    },
    [m.reduce, pageCount]
  )

  const prev = useCallback(() => goTo(page - 1), [goTo, page])
  const next = useCallback(() => goTo(page + 1), [goTo, page])

  return (
    <Section
      variant="default"
      background="white"
      backdrop={
        <AnimatedMeshBackground
          grid={false}
          orbs={[
            { color: 'rgba(254,240,138,0.4)', size: 300, position: { left: '0', top: '0' }, duration: 9, parallax: 25 },
            { color: 'rgba(254,249,195,0.5)', size: 300, position: { right: '0', bottom: '0' }, duration: 11, parallax: 30 },
          ]}
        />
      }
    >

      {/* glow background — mesh animé avec parallax léger */}


        {/* Un seul declencheur pour le titre ET les cartes : le conteneur
            orchestre, les enfants ne declarent que leurs variants. Deux
            declencheurs separes laissaient le titre seul a l'ecran, le temps
            que les cartes atteignent a leur tour le seuil. */}
        <motion.div
          ref={ref}
          variants={m.stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
        >
        {/* HEADER */}
        <motion.div
          variants={m.fadeUp}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-dark sm:text-5xl">
            {copy.title}
            <span className="block">{copy.titleEnd}</span>
          </h2>
        </motion.div>

        {/* CARDS — piste défilante, 1 / 2 / 3 cartes visibles selon l'écran */}
        <motion.div
          ref={scrollerRef}
          onScroll={sync}
          variants={m.stagger()}
          /* `pb-4 -mb-4` : laisse respirer l'ombre et le hover des cartes sans
             ajouter de barre de défilement verticale. */
          className="-mb-4 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.company}
              variants={m.fadeUp}
              className="
                w-[85%] shrink-0 snap-start rounded-[32px] border border-black/10 bg-white/90 p-7
                backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-gold/30
                hover:shadow-[0_20px_60px_rgba(218,162,80,0.15)]
                sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]
              "
            >
              {/* ICON + STARS */}
              <div className="mb-6 flex items-center justify-between">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `${t.color}12` }}
                >
                  <Quote size={22} style={{ color: t.color }} />
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={14} fill={tokens.color.gold.DEFAULT} stroke="none" />
                  ))}
                </div>
              </div>

              {/* TEXT */}
              <p className="mb-8 text-[15px] leading-8 text-stone-600">
                “{t.quote}”
              </p>

              {/* PROFILE */}
              <div className="flex items-center gap-4">
                <ClientAvatar testimonial={t} />

                <div>
                  <h3 className="text-base font-bold text-dark">
                    {t.author}
                  </h3>
                  <p className="text-sm text-subtle">{t.company}</p>
                </div>
              </div>

              {/* SECTOR */}
              <div className="mt-6">
                <span
                  className="rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{
                    background: `${t.color}12`,
                    color: t.color,
                  }}
                >
                  {t.sector}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        </motion.div>

        {/* NAVIGATION — une pastille par page de défilement */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <motion.button
            type="button"
            onClick={prev}
            disabled={page === 0}
            aria-label={copy.prev}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-gold hover:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div className="flex gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${copy.page} ${i + 1}`}
                className={`rounded-full transition-all ${page === i
                  ? 'h-2.5 w-8 bg-gold'
                  : 'h-2.5 w-2.5 bg-black/20'
                  }`}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={next}
            disabled={page >= pageCount - 1}
            aria-label={copy.next}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-gold hover:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
    </Section>
  )
}
