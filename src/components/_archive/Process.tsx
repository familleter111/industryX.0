'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Search,
  ClipboardList,
  UserCheck,
  RefreshCw,
  BarChart3,
} from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Détection',
    description:
      'Identification d’une non-conformité directement sur le terrain ou en production.',
  },
  {
    icon: ClipboardList,
    title: 'Qualification',
    description:
      'Structuration du problème avec un niveau de détail adapté au contexte opérationnel.',
  },
  {
    icon: UserCheck,
    title: 'Assignation',
    description:
      'Affectation automatique ou manuelle des actions aux bons responsables.',
  },
  {
    icon: RefreshCw,
    title: 'Suivi',
    description:
      'Suivi en temps réel de l’avancement des actions correctives et préventives.',
  },
  {
    icon: BarChart3,
    title: 'Analyse',
    description:
      'Identification des causes récurrentes et amélioration continue des processus.',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-120px',
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#EEF4FF] to-[#EAF1FF] py-28 lg:py-36"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-300/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 xl:px-20">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            Un processus structuré pour
            <span className="block bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
              maîtriser la qualité
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Une approche simple, visuelle et collaborative pour gérer efficacement
            les non-conformités.
          </p>
        </motion.div>

        {/* ================= SCHEMA ================= */}
        <div className="relative mt-24">

          {/* Desktop line */}
          <div className="absolute left-0 top-10 hidden h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-6">

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="relative flex flex-col items-center text-center"
              >

                {/* Mobile connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-[88px] h-16 w-[2px] bg-gradient-to-b from-cyan-300 to-transparent lg:hidden" />
                )}

                {/* Node */}
                <div className="group relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white shadow-[0_15px_40px_rgba(14,165,233,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(79,70,229,0.18)]">

                  {/* icon background */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-indigo-100">
                    <step.icon size={22} className="text-cyan-700" />
                  </div>

                  {/* step number */}
                  <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    0{index + 1}
                  </div>
                </div>

                {/* TEXT */}
                <div className="mt-6 max-w-[240px]">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="mx-auto mt-24 max-w-3xl text-center">
          <p className="text-lg text-slate-600">
            Une meilleure visibilité permet de réduire les erreurs et d’accélérer
            les décisions opérationnelles.
          </p>
        </div>

      </div>
    </section>
  )
}