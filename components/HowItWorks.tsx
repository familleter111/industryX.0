'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Clock,
  AlertTriangle,
  Shield,
  Crosshair,
  TrendingUp,
} from 'lucide-react'

// Data for middle stat cards
const stats = [
  {
    icon: Clock,
    value: '+30%',
    label: 'DE TEMPS PERDU',
    desc: "Saisie manuelle, recherches d'informations, reporting chronophage.",
    accent: '#DC2626',
    bg: 'rgba(220,38,38,0.05)',
  },
  {
    icon: Shield,
    value: '2,5x',
    label: 'PLUS DE RISQUES QUALITÉ',
    desc: "Non-conformités récurrentes, audits plus difficiles, écarts réglementaires.",
    accent: '#EA580C',
    bg: 'rgba(234,88,12,0.05)',
  },
  {
    icon: Crosshair,
    value: '-25%',
    label: 'RÉACTIVITÉ RÉDUITE',
    desc: "Actions en retard, décisions différées, problèmes résolus trop tard.",
    accent: '#D97706',
    bg: 'rgba(217,119,6,0.05)',
  },
  {
    icon: TrendingUp,
    value: 'PILOTAGE',
    label: 'AFFAIBLI',
    desc: "Données partielles, indicateurs peu fiables, performance difficile à améliorer.",
    accent: '#9333EA',
    bg: 'rgba(147,51,234,0.05)',
  },
]

export default function ProblemsSection() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 lg:py-24"
      style={{
        background: '#F7F7F6',
      }}
    >
      {/* PREMIUM BACKGROUND GLOWS */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* MAIN GRADIENT */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                135deg,
                #F8F8F7 0%,
                #F3F4F6 40%,
                #FAFAF9 100%
              )
            `,
          }}
        />

        {/* GREEN GLOW */}
        <div
          className="absolute -top-20 left-0 h-[500px] w-[500px] rounded-full"
          style={{
            background: 'rgba(34,197,94,0.08)',
            filter: 'blur(120px)',
          }}
        />

        {/* GOLD GLOW */}
        <div
          className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full"
          style={{
            background: 'rgba(218,162,80,0.06)',
            filter: 'blur(110px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* ================= BLOC SUPÉRIEUR : PROBLÈME & SCHÉMA RÉSEAU ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* GAUCHE : TEXTES DE PRÉSENTATION */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* BADGE */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/15 bg-red-500/5 text-red-600 mb-6">
              <AlertTriangle size={13} className="text-red-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Le coût caché</span>
            </div>

            {/* TITRE PRINCIPAL */}
            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#0F172A] sm:text-4xl lg:text-[2.65rem]">
              Le coût caché des{' '}
              <span className="text-[#DC2626] block mt-2" style={{ textShadow: '0 10px 30px rgba(220,38,38,0.06)' }}>
                opérations déconnectées.
              </span>
            </h2>

            {/* SOUS-TITRE EN GRAS */}
            <h3 className="mt-8 text-base font-extrabold text-[#0F172A] leading-snug">
              Excel, emails, fichiers partagés, outils isolés.<br />
              Des opérations dispersées qui échappent au contrôle.
            </h3>

            {/* PARAGRAPHE DESCRIPTIF */}
            <p className="mt-4 text-[14px] leading-relaxed text-[#475569]">
              Quand chaque donnée vit dans son propre outil, les écarts deviennent des
              signaux faibles invisibles&nbsp;: non-conformités récurrentes, visibilité
              limitée, traçabilité fragile, actions en retard… jusqu&apos;à la perte de
              maîtrise opérationnelle et une performance constamment sous pression.
            </p>
          </motion.div>

          {/* DROITE : SCHÉMA RÉSEAU D'USINE */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            {/* Visuel : image gart.webp */}
            <Image
              src="/gart.webp"
              alt="Le coût caché des opérations déconnectées"
              width={1617}
              height={910}
              className="h-auto w-full rounded-[2.2rem] border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
            />

          </motion.div>

        </div>

        {/* ================= BLOC CENTRAL : CARTES STATISTIQUES ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_10px_35px_rgba(15,23,42,0.015)] flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-300"
            >
              {/* Icône */}
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon size={22} style={{ color: stat.accent }} />
              </div>

              {/* Textes de la statistique */}
              <div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 leading-none">{stat.value}</span>
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-500 mt-1.5 block uppercase">{stat.label}</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-400 mt-3">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}