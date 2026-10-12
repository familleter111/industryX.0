'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BarChart3,
  Activity,
  AlertTriangle,
  Layers3,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react'

const insights = [
  {
    icon: AlertTriangle,
    title: 'Non-conformités récurrentes',
    text: 'Détectez rapidement les écarts les plus fréquents.',
  },
  {
    icon: Layers3,
    title: 'Analyse multi-sites',
    text: 'Comparez lignes, équipes et zones opérationnelles.',
  },
  {
    icon: TrendingUp,
    title: 'Tendances terrain',
    text: 'Visualisez les évolutions et points de fragilité.',
  },
  {
    icon: ShieldAlert,
    title: 'Priorisation intelligente',
    text: 'Concentrez les actions sur les impacts critiques.',
  },
]

export default function DataSection() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F7F8FA] py-24 lg:py-32"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        {/* soft gradients */}
        <div className="absolute left-[-10%] top-[-15%] h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#DCE8FF] blur-3xl" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.10) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 xl:px-20">

        {/* ================= GRID ================= */}
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white px-4 py-2 shadow-sm">
              <BarChart3 size={15} className="text-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-dark/55">
                Data & analytics
              </span>
            </div>

            {/* title */}
            <h2 className="max-w-2xl text-4xl font-bold leading-[1.08] text-dark sm:text-5xl">
              Transformer les données terrain en{' '}
              <span className="text-gradient-gold">
                décisions opérationnelles
              </span>
            </h2>

            {/* paragraph */}
            <div className="mt-7 space-y-5 text-[16px] leading-relaxed text-dark/65">
              <p>
                La valeur de CIPA ne réside pas uniquement dans la digitalisation
                des formulaires ou des contrôles. La plateforme permet aussi de
                structurer les données collectées pour les rendre réellement
                exploitables à l’échelle opérationnelle.
              </p>

              <p>
                CIPA aide les équipes à identifier les non-conformités
                récurrentes, détecter des tendances par zone, ligne, équipe ou
                type d’écart, visualiser les points de fragilité opérationnelle,
                mieux comprendre les causes probables de certains problèmes et
                prioriser les actions à plus fort impact.
              </p>

              <p>
                Cette approche permet d’évoluer d’une gestion réactive, centrée
                sur le constat, vers une gestion plus proactive, centrée sur
                l’amélioration continue.
              </p>
            </div>

            {/* mini insights */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {insights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                  }}
                  className="group rounded-2xl border border-black/[0.05] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 transition-transform duration-300 group-hover:scale-105">
                    <item.icon size={18} className="text-gold" />
                  </div>

                  <h3 className="text-sm font-semibold text-dark">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-dark/55">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ================= RIGHT VISUAL ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* glow */}
            <div className="absolute -inset-10 rounded-[3rem] bg-gold/10 blur-3xl" />

            {/* dashboard window */}
            <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)]">

              {/* top bar */}
              <div className="flex items-center justify-between border-b border-black/5 bg-[#FBFBFC] px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="flex items-center gap-2 rounded-full bg-dark/[0.04] px-3 py-1.5">
                  <Activity size={14} className="text-gold" />
                  <span className="text-xs font-medium text-dark/60">
                    Analyse opérationnelle
                  </span>
                </div>
              </div>

              {/* image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F7FA]">
                <Image
                  src="/cipa1.png"
                  alt="Dashboard analytics CIPA"
                  fill
                  priority
                  className="object-cover object-top"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/10 via-transparent to-transparent" />
              </div>

              {/* bottom analytics cards */}
              <div className="grid gap-4 border-t border-black/5 bg-white p-6 sm:grid-cols-3">

                <div className="rounded-2xl bg-[#F7F8FA] p-4">
                  <p className="text-xs uppercase tracking-wide text-dark/40">
                    Non-conformités
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-2xl font-bold text-dark">-38%</span>
                    <span className="pb-1 text-xs font-medium text-green-600">
                      amélioration
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F7F8FA] p-4">
                  <p className="text-xs uppercase tracking-wide text-dark/40">
                    Réactivité terrain
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-2xl font-bold text-dark">+52%</span>
                    <span className="pb-1 text-xs font-medium text-gold">
                      plus rapide
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F7F8FA] p-4">
                  <p className="text-xs uppercase tracking-wide text-dark/40">
                    Visibilité opérationnelle
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-2xl font-bold text-dark">100%</span>
                    <span className="pb-1 text-xs font-medium text-blue-600">
                      centralisée
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}