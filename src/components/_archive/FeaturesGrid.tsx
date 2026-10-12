'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ClipboardCheck,
  Route,
  AlertTriangle,
  CheckCheck,
  Workflow,
  BarChart3,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: ClipboardCheck,
    title: 'Audits et inspections',
    description:
      'Digitalisez vos contrôles et standardisez la collecte d’information sur le terrain.',
    accent: '#DAA250',
  },
  {
    icon: Route,
    title: 'Tournées terrain',
    description:
      'Structurez les tournées qualité et opérationnelles avec plus de cohérence et de traçabilité.',
    accent: '#22C55E',
  },
  {
    icon: AlertTriangle,
    title: 'Non-conformités',
    description:
      'Déclarez, suivez et analysez les écarts dans un flux structuré.',
    accent: '#EF4444',
  },
  {
    icon: CheckCheck,
    title: 'Actions correctives',
    description:
      'Assignez les actions, suivez les échéances et améliorez la clôture.',
    accent: '#3B82F6',
  },
  {
    icon: Workflow,
    title: 'Workflows opérationnels',
    description:
      'Orchestrez les séquences métier et fiabilisez l’exécution terrain.',
    accent: '#14B8A6',
  },
  {
    icon: BarChart3,
    title: 'Pilotage par la donnée',
    description:
      'Transformez l’historique terrain en visibilité exploitable et en priorités d’action.',
    accent: '#8B5CF6',
  },
]

export default function FeaturesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  return (
    <section
      ref={ref}
      id="features"
      className="relative overflow-hidden bg-cream py-24 lg:py-32"
    >

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute inset-0 bg-[#f7f5f1]" />

        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-15%] left-[-10%] w-[450px] h-[450px] bg-green-500/10 rounded-full blur-3xl" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.35) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 xl:px-20">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Capacités opérationnelles
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-[1.08] mb-6">
            Une plateforme unique pour{' '}
            <span className="text-gradient-gold">
              exécuter, suivre et améliorer
            </span>
          </h2>

          <p className="text-lg text-dark/60 leading-relaxed max-w-3xl mx-auto">
            CIPA connecte les opérations terrain, la qualité et les workflows
            industriels dans une seule plateforme structurée et exploitable.
          </p>

        </motion.div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-3xl border border-black/[0.05] bg-white/90 backdrop-blur-sm p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
            >

              {/* HOVER GLOW */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `
                    radial-gradient(
                      circle at top left,
                      ${feat.accent}14 0%,
                      transparent 72%
                    )
                  `,
                }}
              />

              {/* TOP */}
              <div className="relative z-10 flex items-start justify-between mb-6">

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${feat.accent}15`,
                  }}
                >
                  <feat.icon
                    size={24}
                    style={{ color: feat.accent }}
                  />
                </div>

                <div
                  className="h-2 w-2 rounded-full opacity-40 group-hover:opacity-100 transition"
                  style={{
                    backgroundColor: feat.accent,
                  }}
                />

              </div>

              {/* CONTENT */}
              <div className="relative z-10">

                <h3 className="text-xl font-bold text-dark mb-3 leading-tight">
                  {feat.title}
                </h3>

                <p className="text-dark/60 text-sm leading-relaxed">
                  {feat.description}
                </p>

              </div>

              {/* BOTTOM ACCENT */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feat.accent}, transparent)`,
                }}
              />

            </motion.div>
          ))}

        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16 text-center"
        >

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl bg-dark px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-dark/10 transition-all duration-300 hover:scale-[1.03] hover:bg-dark/95"
          >
            Voir comment lors d’une démo personnalisée

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

        </motion.div>

      </div>
    </section>
  )
}