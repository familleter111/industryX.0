'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Database,
  Layers3,
  LineChart,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const ODD_LOGOS = [
  '/ODD/ODD7.png',
  '/ODD/ODD8.png',
  '/ODD/ODD9.png',
  '/ODD/ODD12.png',
  '/ODD/ODD13.png',
  '/ODD/ODD17.png',
]

// CONFIGURATION DES ODD ANIMÉS DANS LES ESPACES VIDES
const ODD_ANIMATIONS = [
  { id: 'ODD7', top: '12%', left: '6%', size: 70, delay: 0, duration: 4, rotate: 6 },
  { id: 'ODD8', bottom: '15%', left: '3%', size: 85, delay: 1.2, duration: 5.5, rotate: -4 },
  { id: 'ODD9', top: '8%', right: '8%', size: 65, delay: 0.5, duration: 4.5, rotate: 5 },
  { id: 'ODD12', bottom: '22%', right: '4%', size: 90, delay: 2, duration: 6, rotate: -6 },
  { id: 'ODD13', top: '38%', left: '46%', size: 55, delay: 1.8, duration: 3.8, rotate: 3 },
  { id: 'ODD17', bottom: '38%', right: '12%', size: 75, delay: 0.8, duration: 4.2, rotate: -5 },
]

interface ODDLogoCardProps {
  logo: string
  num: string
  label: string
}

function ODDLogoCard({ logo, num, label }: ODDLogoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Varier la durée du flottement selon le numéro pour un effet organique
  const floatDuration = 3 + (parseInt(num) % 3) * 0.5;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={isHovered ? {
        y: [0, -10, 0],
      } : {
        y: 0,
      }}
      whileHover={{
        scale: 1.12,
        zIndex: 40,
      }}
      transition={isHovered ? {
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        scale: {
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }
      } : {
        y: {
          duration: 0.3,
          ease: 'easeOut',
        },
        scale: {
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }
      }}
      className="
        group relative flex h-24 w-24 cursor-pointer items-center justify-center
        rounded-2xl border border-black/[0.06] bg-white overflow-visible
        shadow-[0_4px_16px_rgba(0,0,0,0.03)]
        transition-shadow duration-300
        hover:border-black/[0.12] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)]
      "
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={`ODD ${num}`}
          className="h-full w-full object-cover"
        />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
            animate={{
              opacity: 1,
              y: -14,
              scale: 1,
              x: '-50%',
            }}
            exit={{ opacity: 0, y: 8, scale: 0.95, x: '-50%' }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 25,
            }}
            className="
              absolute bottom-full left-1/2 mb-1
              pointer-events-none bg-[#0F172A] text-white text-[12px] font-semibold
              py-2 px-3 rounded-xl whitespace-nowrap shadow-xl z-50
            "
          >
            <span className="text-[#F2D94E]">ODD {num} :</span> {label}
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0F172A]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const steps = [
  {
    icon: Database,
    step: 'Étape 1',
    title: 'Collecter l’information au plus proche du terrain',
    description:
      'Les opérateurs, techniciens et équipes qualité saisissent les données directement depuis mobile ou tablette.',
    accent: '#22C55E',
  },
  {
    icon: Layers3,
    step: 'Étape 2',
    title: 'Structurer les données dans un cadre commun',
    description:
      'CIPA centralise et organise les informations terrain dans des workflows cohérents et standardisés.',
    accent: '#DAA250',
  },
  {
    icon: LineChart,
    step: 'Étape 3',
    title: 'Piloter les actions et améliorer les opérations',
    description:
      'Les équipes gagnent en visibilité, suivent les actions et améliorent les opérations dans le temps.',
    accent: '#3B82F6',
  },
]

export default function IndustriesSection() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: '#F7F7F6', fontFamily: 'var(--font-inter)' }}
    >
      {/* BACKGROUND — identique au Hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #F8F8F7 0%, #F3F4F6 40%, #FAFAF9 100%)',
          }}
        />
        {/* Green glow */}
        <div
          className="absolute left-0 top-[-5%] h-[480px] w-[480px] rounded-full"
          style={{ background: 'rgba(34,197,94,0.09)', filter: 'blur(130px)' }}
        />
        {/* Gold glow */}
        <div
          className="absolute bottom-[-5%] right-0 h-[480px] w-[480px] rounded-full"
          style={{ background: 'rgba(218,162,80,0.09)', filter: 'blur(130px)' }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
          }}
        />

        {/* ANIMATIONS ODD FLOTTANTES — masquées sur mobile */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          {ODD_ANIMATIONS.map((odd) => (
            <motion.img
              key={odd.id}
              src={`/ODD/${odd.id}.png`}
              alt={`Objectif de Développement Durable ${odd.id}`}
              className="absolute drop-shadow-xl"
              style={{
                top: odd.top,
                bottom: odd.bottom,
                left: odd.left,
                right: odd.right,
                width: odd.size,
                height: odd.size,
                borderRadius: '12px',
                opacity: 0.85,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.6, 0.9, 0.6],
                scale: 1,
                y: [0, -15, 0],
                rotate: [0, odd.rotate, 0, -odd.rotate, 0],
              }}
              transition={{
                opacity: { duration: odd.duration * 2, repeat: Infinity, ease: 'easeInOut' },
                y: {
                  duration: odd.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: odd.delay,
                },
                rotate: {
                  duration: odd.duration * 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: odd.delay,
                },
                scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
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
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-dark/35">
                        Processus
                      </p>

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
                  <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-medium text-dark/35 transition-all duration-300 group-hover:text-dark/70">
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



        {/* ODD LOGOS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-20 sm:mt-28 max-w-6xl relative z-10 px-4 sm:px-10"
        >
          <div className="text-center mb-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#DAA250] mb-2">
              Contribution aux Objectifs de Développement Durable
            </h4>
            <p className="text-sm text-[#57534E] max-w-md mx-auto">
              CIPA soutient activement les objectifs mondiaux de durabilité, d&apos;industrialisation responsable et de travail décent.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 items-center justify-items-center gap-4 sm:gap-6 py-4">
            {ODD_LOGOS.map((logo) => {
              const num = logo.replace(/^\D+/g, '').replace(/\D+$/g, '');

              // Descriptions pour les tooltips des ODD
              const oddLabels: Record<string, string> = {
                '7': 'Énergie propre et d\'un coût abordable',
                '8': 'Travail décent et croissance économique',
                '9': 'Industrie, innovation et infrastructure',
                '12': 'Consommation et production responsables',
                '13': 'Mesures relatives à la lutte contre les changements climatiques',
                '17': 'Partenariats pour la réalisation des objectifs',
              };
              const label = oddLabels[num] || `Objectif ${num}`;

              return (
                <ODDLogoCard
                  key={logo}
                  logo={logo}
                  num={num}
                  label={label}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}