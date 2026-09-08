'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { findClientLogo, logoFrameWidth } from '@/lib/data/clientLogos'
import { getTestimonials, type Testimonial } from '@/lib/data/testimonials'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'
import Section from '@/components/ui/Section'

/**
 * Témoignages : source unique dans components/testimonials.ts.
 * Seuls les verbatims validés (`status: 'published'`) sont affichés.
 */
const testimonials = getTestimonials(false)

/* Vignette du client : son entrée CLIENT_LOGOS, à défaut le `fallbackLogo` du
   témoignage (client qui ne figure pas au bandeau clients), et les initiales
   seulement s'il n'existe aucun fichier.
   `logoFrameWidth` inscrit le contenu réel dans une boîte commune pour que
   tous les logos paraissent de la même taille. */
function ClientAvatar({ testimonial }: { testimonial: Testimonial }) {
  const logo = testimonial.logoAlt
    ? findClientLogo(testimonial.logoAlt)
    : testimonial.fallbackLogo

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
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

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
            Ils transforment leur industrie
            <span className="block">avec CIPA</span>
          </h2>
        </motion.div>

        {/* CARDS */}
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          variants={m.stagger()}
        >
          {testimonials.map((t, i) => {
            const isActive = current === i

            return (
              <motion.div
                key={t.company}
                variants={m.fadeUp}
                onClick={() => setCurrent(i)}
                className={`
                  cursor-pointer rounded-[32px] border bg-white/90 p-7 backdrop-blur-xl transition-all
                  ${isActive
                    ? 'border-gold/40 shadow-[0_20px_60px_rgba(218,162,80,0.15)] -translate-y-1'
                    : 'border-black/10 hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl'
                  }
                `}
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
            )
          })}
        </motion.div>
        </motion.div>

        {/* NAVIGATION */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <motion.button
            type="button"
            onClick={prev}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-gold hover:text-white"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${current === i
                  ? 'h-2.5 w-8 bg-gold'
                  : 'h-2.5 w-2.5 bg-black/20'
                  }`}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={next}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-gold hover:text-white"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
    </Section>
  )
}