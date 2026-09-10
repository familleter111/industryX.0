'use client'

import { motion } from 'framer-motion'
import {
  Database,
  Layers3,
  LineChart,
  ArrowRight,
} from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'
import Section from '@/components/ui/Section'

const steps = [
  {
    icon: Database,
    step: 'Étape 1',
    title: 'Collecter l’information au plus proche du terrain',
    description:
      'Les opérateurs, techniciens et équipes qualité saisissent les données directement depuis mobile ou tablette.',
    accent: 'rgb(34 197 94)', // green-500
  },
  {
    icon: Layers3,
    step: 'Étape 2',
    title: 'Structurer les données dans un cadre commun',
    description:
      'CIPA centralise et organise les informations terrain dans des workflows cohérents et standardisés.',
    accent: tokens.color.gold.DEFAULT,
  },
  {
    icon: LineChart,
    step: 'Étape 3',
    title: 'Piloter les actions et améliorer les opérations',
    description:
      'Les équipes gagnent en visibilité, suivent les actions et améliorent les opérations dans le temps.',
    accent: 'rgb(59 130 246)', // blue-500
  },
]

export default function IndustriesSection() {
  const m = useMotion()


  return (
    <Section
      className="font-inter"
      variant="default"
      background="cream"
      backdrop={
        <AnimatedMeshBackground
          gradient={tokens.gradient.section}
          orbs={[
            { color: 'rgba(34,197,94,0.09)', size: 480, position: { left: '0', top: '-5%' }, duration: 11, parallax: 30 },
            { color: 'rgba(218,162,80,0.09)', size: 480, position: { right: '0', bottom: '-5%' }, duration: 13, parallax: 40 },
          ]}
        />
      }
    >
        {/* HEADER */}
        <motion.div
          variants={m.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          className="mb-20 text-center"
        >


          <h2 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-[1.1] text-dark sm:text-5xl">
            Comment{' '}
            <span className="text-gradient-gold">
              CIPA transforme
            </span>{' '}
            les opérations terrain
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-dark/60">
            Une logique simple : collecter, structurer et piloter les opérations
            industrielles dans un cadre commun plus lisible et exploitable.
          </p>
        </motion.div>

        {/* PROCESS FLOW */}
        <div className="relative">
          {/* LINE DESKTOP */}
          <div className="absolute left-[18%] right-[18%] top-[70px] hidden h-[2px] bg-gradient-to-r from-green-500/20 via-gold/40 to-blue-500/20 lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={m.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={m.viewport}
                className="group relative"
              >
                <div className="relative h-full rounded-3xl border border-black/[0.06] bg-white/90 p-7 shadow-[0_10px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl lg:p-8">
                  {/* GLOW */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at top left, ${step.accent}12, transparent 70%)`,
                    }}
                  />

                  {/* STEP HEADER */}
                  <div className="relative z-10 mb-8 flex items-center justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${step.accent}15`,
                      }}
                    >
                      <step.icon
                        size={26}
                        style={{ color: step.accent }}
                      />
                    </div>

                    <div className="text-right">

                      <span
                        className="text-sm font-bold"
                        style={{ color: step.accent }}
                      >
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10">
                    <h3 className="mb-4 text-xl font-bold leading-snug text-dark">
                      {step.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-dark/60 sm:text-[15px]">
                      {step.description}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-medium text-subtle transition-all duration-300 group-hover:text-dark/70">
                    <span>Flux opérationnel</span>

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </Section>
  )
}