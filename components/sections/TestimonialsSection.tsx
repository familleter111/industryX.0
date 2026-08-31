'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { findClientLogo, logoFrameWidth } from '@/lib/data/clientLogos'
import { getTestimonials, type Testimonial } from '@/lib/data/testimonials'

/**
 * Témoignages : source unique dans components/testimonials.ts.
 * Seuls les verbatims validés (`status: 'published'`) sont affichés.
 */
const testimonials = getTestimonials(false)

/* Vignette du client : logo si /public/logos en contient un, initiales sinon.
   `logoFrameWidth` inscrit le contenu réel dans une boîte commune pour que
   tous les logos paraissent de la même taille. */
function ClientAvatar({ testimonial }: { testimonial: Testimonial }) {
  const logo = testimonial.logoAlt ? findClientLogo(testimonial.logoAlt) : undefined

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
        <span className="font-display text-[17px] font-black text-[#B6842B]">
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
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#F9F8F6] py-14 sm:py-16 lg:py-20">

      {/* glow background — mesh animé avec parallax léger */}
      <AnimatedMeshBackground
        grid={false}
        orbs={[
          { color: 'rgba(254,240,138,0.4)', size: 300, position: { left: '0', top: '0' }, duration: 9, parallax: 25 },
          { color: 'rgba(254,249,195,0.5)', size: 300, position: { right: '0', bottom: '0' }, duration: 11, parallax: 30 },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* HEADER */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-[#111] sm:text-5xl">
            Ils transforment leur industrie
            <span className="block text-[#DAA250]">avec CIPA</span>
          </h2>
        </motion.div>

        {/* CARDS */}
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const isActive = current === i

            return (
              <motion.div
                key={t.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setCurrent(i)}
                className={`
                  cursor-pointer rounded-[32px] border bg-white/90 p-7 backdrop-blur-xl transition-all
                  ${isActive
                    ? 'border-[#DAA250]/40 shadow-[0_20px_60px_rgba(218,162,80,0.15)] -translate-y-1'
                    : 'border-black/10 hover:-translate-y-1 hover:border-[#DAA250]/20 hover:shadow-xl'
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
                      <Star key={idx} size={14} fill="#DAA250" stroke="none" />
                    ))}
                  </div>
                </div>

                {/* TEXT */}
                <p className="mb-8 text-[15px] leading-8 text-[#555]">
                  “{t.quote}”
                </p>

                {/* PROFILE */}
                <div className="flex items-center gap-4">
                  <ClientAvatar testimonial={t} />

                  <div>
                    <h3 className="text-base font-bold text-[#111]">
                      {t.author}
                    </h3>
                    <p className="text-sm text-[#666]">{t.company}</p>
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
        </div>

        {/* NAVIGATION */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <motion.button
            type="button"
            onClick={prev}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-[#DAA250] hover:text-white"
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
                  ? 'h-2.5 w-8 bg-[#DAA250]'
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-[#DAA250] hover:text-white"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}