'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Eye,
  Layers,
  Database,
  AlertCircle,
  TrendingUp,
  Activity,
} from 'lucide-react'

const benefits = [
  {
    icon: Eye,
    title: 'Meilleure visibilité opérationnelle',
    text: 'Accédez à une lecture claire et en temps réel des activités terrain et de leur état global.',
  },
  {
    icon: Layers,
    title: 'Traçabilité plus robuste',
    text: 'Chaque contrôle, action et constat est historisé de manière fiable et exploitable.',
  },
  {
    icon: Database,
    title: 'Réduction des pertes d’information',
    text: 'Centralisation des données terrain pour éviter les silos et les doublons d’information.',
  },
  {
    icon: AlertCircle,
    title: 'Suivi rigoureux des non-conformités',
    text: 'Gestion structurée des écarts avec un suivi précis jusqu’à résolution complète.',
  },
  {
    icon: TrendingUp,
    title: 'Meilleure identification des causes',
    text: 'Analyse des tendances et des récurrences pour comprendre les problèmes en profondeur.',
  },
  {
    icon: Activity,
    title: 'Amélioration continue de la performance',
    text: 'Transformation progressive des données terrain en leviers d’optimisation opérationnelle.',
  },
]

function BenefitCard({ item, index, inView }: any) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* glow hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-br from-[#DAA250]/10 via-transparent to-transparent" />

      {/* icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DAA250]/10 transition-transform group-hover:scale-110">
        <Icon size={20} className="text-[#DAA250]" />
      </div>

      {/* title */}
      <h3 className="text-sm font-semibold text-[#0F172A]">
        {item.title}
      </h3>

      {/* text */}
      <p className="mt-2 text-sm leading-relaxed text-[#0F172A]/60">
        {item.text}
      </p>

      {/* underline accent */}
      <div className="mt-4 h-[2px] w-0 bg-gradient-to-r from-[#DAA250] to-transparent transition-all duration-300 group-hover:w-full" />
    </motion.div>
  )
}

export default function BeneficeSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 lg:py-36 bg-[#F7F8FA]"
    >
      {/* ================= PREMIUM BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">

        {/* soft gradient blobs */}
        <div className="absolute top-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#DAA250]/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-100 blur-3xl" />

        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold text-[#0F172A] sm:text-5xl">
            Ce que les industriels recherchent avec{' '}
            <span className="text-gradient-gold">CIPA</span>
          </h2>

          <p className="mt-5 text-lg text-[#0F172A]/60">
            Une plateforme conçue pour transformer les données terrain en valeur
            opérationnelle mesurable.
          </p>
        </motion.div>

        {/* ================= TEXT BLOCK ================= */}
        <div className="mx-auto mb-16 max-w-4xl text-center text-[#0F172A]/60">
          <p>
            En structurant les données terrain et en digitalisant les processus
            critiques, CIPA permet aux industriels de viser des gains concrets :
            visibilité, traçabilité, réduction des pertes d’information, suivi
            des non-conformités et amélioration continue de la performance.
          </p>

          <p className="mt-4">
            CIPA ne se limite pas à numériser des enregistrements : la plateforme
            construit un système opérationnel plus maîtrisé, plus lisible et plus
            exploitable.
          </p>
        </div>

        {/* ================= GRID 3x2 ================= */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {benefits.map((item, i) => (
            <BenefitCard
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