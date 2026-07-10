'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'

interface CtaLogo {
  src: string
  alt: string
  hClass: string
}

const ctaLogos: CtaLogo[] = [
  { src: '/Microsoft.png', alt: 'Microsoft', hClass: 'h-[40px] sm:h-[48px] md:h-[56px]' },
  { src: '/DOT.tn.png', alt: 'DOT.tn', hClass: 'h-[46px] sm:h-[56px] md:h-[64px]' },
  { src: '/AWS.png', alt: 'AWS', hClass: 'h-[38px] sm:h-[46px] md:h-[54px]' },
  { src: '/Deloitte.png', alt: 'Deloitte', hClass: 'h-[26px] sm:h-[32px] md:h-[38px]' },
  { src: '/Ey.png', alt: 'EY', hClass: 'h-[48px] sm:h-[58px] md:h-[68px]' },
  { src: '/GIZ.png', alt: 'GIZ', hClass: 'h-[38px] sm:h-[46px] md:h-[54px]' },
]

function LogoCard({ logo }: { logo: CtaLogo }) {
  return (
    <div className="group/logo mx-8 sm:mx-12 md:mx-16 flex items-center justify-center shrink-0">
      <img
        src={logo.src}
        alt={logo.alt}
        className={`${logo.hClass} w-auto object-contain opacity-80 grayscale contrast-125 transition-all duration-300
                   group-hover/marquee:opacity-40 group-hover/marquee:grayscale
                   group-hover/logo:!opacity-100 group-hover/logo:!grayscale-0 group-hover/logo:!contrast-100
                   group-hover/logo:scale-108`}
      />
    </div>
  )
}

export default function CTASection() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-[#F9F8F6] py-16 lg:py-24"
    >

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '70px 70px',
          }}
        />

        {/* LIGHTS */}
        <div className="absolute -top-32 left-0 w-[420px] h-[420px] bg-gold/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-green-500/5 blur-[140px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">

        {/* ================= MAIN CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0B1110] shadow-[0_30px_120px_rgba(0,0,0,0.25)]"
        >

          {/* TOP BORDER LIGHT */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

            {/* ================= LEFT ================= */}
            <div className="relative p-8 sm:p-12 lg:p-16">

              {/* SMALL BADGE */}
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 mb-8">

                <Sparkles size={14} className="text-gold" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Plateforme CIPA
                </span>

              </div>

              {/* TITLE */}
              <h2 className="max-w-3xl text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.02] text-white mb-7">

                Donnez à vos opérations
                <span className="block mt-2 text-gradient-gold">
                  une base plus intelligente
                </span>

              </h2>

              {/* TEXT */}
              <p className="max-w-2xl text-lg leading-relaxed text-white/60">

                Découvrez comment CIPA peut vous aider à structurer la donnée
                terrain, mieux coordonner vos équipes et renforcer le pilotage
                qualité et production.

              </p>

              {/* BOTTOM LINE */}
              <div className="mt-10 flex flex-wrap gap-3">

                {[
                  'Qualité',
                  'Production',
                  'Traçabilité',
                  'Workflows terrain',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/55"
                  >
                    {item}
                  </div>
                ))}

              </div>

            </div>

            {/* ================= RIGHT CTA PANEL ================= */}
            <div className="relative border-t border-white/10 lg:border-l lg:border-t-0">

              {/* PANEL BG */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(218,162,80,0.06),transparent)]" />

              <div className="relative flex h-full flex-col justify-center p-8 sm:p-12">

                {/* TITLE */}
                <div className="mb-10">

                  <p className="text-sm uppercase tracking-[0.18em] text-gold font-semibold mb-4">
                    Démo personnalisée
                  </p>

                  <h3 className="text-3xl font-bold leading-tight text-white mb-4">
                    Voyez comment CIPA s’adapte à vos opérations terrain.
                  </h3>

                  <p className="text-white/55 leading-relaxed">
                    Une démonstration claire, orientée qualité,
                    production et pilotage terrain.
                  </p>

                </div>

                {/* CTA BUTTONS */}
                <div className="flex flex-col gap-4">

                  {/* PRIMARY */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#demo"
                    className="group flex items-center justify-between rounded-2xl bg-gradient-to-r from-gold to-yellow-500 px-7 py-5 shadow-2xl shadow-gold/20 transition-all duration-300 hover:shadow-gold/40"
                  >

                    <div>
                      <p className="text-lg font-semibold text-dark">
                        Demander une démo
                      </p>

                      <p className="text-sm text-dark/70 mt-1">
                        Démo guidée avec nos experts
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dark text-white">

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />

                    </div>

                  </motion.a>

                  {/* SECONDARY */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#expert"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-5 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.06]"
                  >

                    <div>
                      <p className="text-lg font-semibold text-white">
                        Parler à un expert
                      </p>

                      <p className="text-sm text-white/50 mt-1">
                        Échange rapide sur vos besoins
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white">

                      <MessageCircle size={18} />

                    </div>

                  </motion.a>

                </div>

                {/* TRUST */}
                <div className="mt-8 pt-8 border-t border-white/10">

                  <div className="flex items-center gap-6 text-sm text-white/45">

                    <span>✓ Déploiement rapide</span>

                    <span>✓ Pensé pour les PME</span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ================= PARTNERS MARQUEE ================= */}
      <div className="group/marquee relative overflow-hidden py-8 mt-16 w-full z-10">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F9F8F6] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F9F8F6] to-transparent z-10" />

        <div className="flex animate-marquee w-max items-center py-8 sm:py-12 group-hover/marquee:[animation-play-state:paused]">
          {[...ctaLogos, ...ctaLogos, ...ctaLogos, ...ctaLogos].map((logo, i) => (
            <LogoCard key={i} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  )
}