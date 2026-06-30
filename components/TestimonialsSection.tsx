'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      "L’intégration de CIPA a considérablement simplifié nos audits et nos opérations quotidiennes. La plateforme a amélioré notre conformité réglementaire tout en nous aidant à résoudre efficacement des problématiques récurrentes de qualité et de suivi.",
    author: 'Quality Manager',
    company: 'Warda Company',
    sector: 'Industrie Agroalimentaire',
    image: '/image2.png',
    color: '#DAA250',
    rating: 5,
  },
  {
    quote:
      "Grâce à CIPA, nous avons simplifié la gestion de nos lots de production et renforcé la fiabilité de nos processus industriels. Les plans d’action automatisés ainsi que le suivi qualité garantissent désormais une production conforme, fluide et performante.",
    author: 'General Manager',
    company: 'Polyroto Group',
    sector: 'Industrie Navale',
    image: '/image3.png',
    color: '#22C55E',
    rating: 5,
  },
  {
    quote:
      "CIPA nous a permis d’obtenir une meilleure visibilité sur nos opérations techniques et nos performances industrielles. Les outils d’analyse et le suivi intelligent des interventions ont réduit les temps d’arrêt et amélioré l’efficacité globale de nos équipes.",
    author: 'Directeur Technique',
    company: 'Bakou Motors',
    sector: 'Industrie Automobile',
    image: '/image8.png',
    color: '#3B82F6',
    rating: 5,
  },
]

/* ✅ Avatar robuste avec fallback réel */
function SafeAvatar({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <div className="h-16 w-16 overflow-hidden rounded-2xl ring-2 ring-white shadow-md">
      <Image
        src={imgSrc}
        alt={alt}
        width={64}
        height={64}
        className="h-full w-full object-cover"
        onError={() => setImgSrc('/fallback-avatar.png')}
      />
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

      {/* glow background */}
      <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-yellow-200/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-yellow-100/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* HEADER */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
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
                  <SafeAvatar src={t.image} alt={t.company} />

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
          <button
            type="button"
            onClick={prev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-[#DAA250] hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

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

          <button
            type="button"
            onClick={next}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-[#DAA250] hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}