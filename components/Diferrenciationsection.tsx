'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Workflow, BarChart3 } from 'lucide-react'

const pillars = [
  {
    icon: Layers,
    title: 'Structurer',
    subtitle: 'Des données terrain fiables et exploitables',
    text: 'CIPA centralise les informations terrain pour éliminer les silos, réduire les pertes de données et garantir une base cohérente pour toutes les opérations.',
    color: '#3B82F6',
  },
  {
    icon: Workflow,
    title: 'Orchestrer',
    subtitle: 'Des processus qualité et production cohérents',
    text: 'Les flux opérationnels sont alignés entre équipes, avec une exécution plus fluide, standardisée et maîtrisée sur l’ensemble des sites.',
    color: '#DAA250',
  },
  {
    icon: BarChart3,
    title: 'Exploiter',
    subtitle: 'Transformer la donnée en décision',
    text: 'Les données collectées deviennent un levier d’analyse pour comprendre les causes, prioriser les actions et améliorer la performance globale.',
    color: '#22C55E',
  },
]

function PillarCard({ item, index, inView }: any) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group relative rounded-3xl border border-white/10 bg-white/70 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* glow background */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at top, ${item.color}20, transparent 70%)`,
        }}
      />

      {/* icon */}
      <div
        className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${item.color}15` }}
      >
        <Icon size={24} style={{ color: item.color }} />
      </div>

      {/* title */}
      <h3 className="text-xl font-bold text-[#0F172A]">
        {item.title}
      </h3>

      {/* subtitle */}
      <p className="mt-1 text-sm font-medium text-[#0F172A]/70">
        {item.subtitle}
      </p>

      {/* text */}
      <p className="mt-4 text-sm leading-relaxed text-[#0F172A]/60">
        {item.text}
      </p>

      {/* bottom accent */}
      <div
        className="mt-6 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
        style={{
          background: `linear-gradient(90deg, ${item.color}, transparent)`,
        }}
      />
    </motion.div>
  )
}

export default function DifferenciationSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 lg:py-28 bg-[#0B1220]"
    >

      {/* ================= PREMIUM DARK BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">

        {/* gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#0B1220]" />

        {/* glow blobs */}
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-3xl" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Plus qu’un outil de formulaire, une plateforme d’{' '}
            <span className="text-gradient-gold">orchestration terrain</span>
          </h2>

          <p className="mt-6 text-lg text-white/60">
            CIPA structure, orchestre et exploite les opérations industrielles pour
            transformer la donnée terrain en avantage opérationnel réel.
          </p>
        </motion.div>

        {/* ================= 3 PILLARS ================= */}
        <div className="grid gap-8 lg:grid-cols-3">

          {pillars.map((item, i) => (
            <PillarCard
              key={i}
              item={item}
              index={i}
              inView={inView}
            />
          ))}

        </div>

      </div>
    </section>
  )
}