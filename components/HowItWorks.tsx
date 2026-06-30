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
  GitFork,
  Workflow,
  Brain,
  CheckCircle2,
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

        {/* ================= BLOC INFÉRIEUR : SOLUTION & TIMELINE CIPA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-16 bg-white border border-slate-200/60 rounded-[2.2rem] p-6 lg:p-8 shadow-[0_15px_45px_rgba(15,23,42,0.015)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Gauche : Présentation Solution */}
            <div className="lg:col-span-5 flex items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-[#0F172A] flex items-center justify-center flex-shrink-0 shadow-[0_6px_20px_rgba(15,23,42,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800" />
                <TrendingUp size={24} className="text-[#DAA250] z-10 animate-pulse" />
              </div>
              <div>
                <p className="text-[14px] leading-relaxed text-[#475569]">
                  <span className="font-extrabold text-[#0F172A] tracking-tight text-[15px]">CIPA</span>{' '}
                  reconnecte vos opérations, vos équipes et vos données pour transformer les
                  signaux faibles en{' '}
                  <span className="font-extrabold text-[#DAA250]">décisions maîtrisées</span> et en{' '}
                  <span className="font-extrabold text-[#16A34A]">amélioration continue</span>.
                </p>
              </div>
            </div>

            {/* Droite : Chronologie de Processus */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {[
                  {
                    title: 'UNIFIER',
                    desc: 'Toutes vos données, terrain et systèmes.',
                    icon: GitFork,
                    color: '#2563EB',
                  },
                  {
                    title: 'STRUCTURER',
                    desc: 'Des processus standardisés et pilotés.',
                    icon: Workflow,
                    color: '#4F46E5',
                  },
                  {
                    title: 'ANALYSER',
                    desc: 'IA intégrée pour comprendre et agir.',
                    icon: Brain,
                    color: '#7C3AED',
                  },
                  {
                    title: 'AGIR',
                    desc: 'Décisions plus rapides, risques maîtrisés.',
                    icon: CheckCircle2,
                    color: '#10B981',
                  },
                ].map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative z-10">
                    {/* Icône d'étape */}
                    <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm text-slate-600 mb-3.5 transition-transform duration-300 hover:scale-110">
                      <step.icon size={18} style={{ color: step.color }} />
                    </div>

                    {/* Textes d'étape */}
                    <h4 className="text-[11px] font-extrabold tracking-wider text-slate-800 mb-1">{step.title}</h4>
                    <p className="text-[10px] leading-relaxed text-slate-500 max-w-[120px]">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Ligne chronologique horizontale (Desktop seulement) */}
              <div className="hidden sm:block absolute bottom-[-24px] left-[12.5%] right-[12.5%] h-[2px] bg-slate-100 pointer-events-none">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 w-full h-full opacity-60" />

                {/* Jalons de points */}
                {[0, 1, 2, 3].map((stepIdx) => (
                  <div
                    key={stepIdx}
                    className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-600 shadow-sm"
                    style={{ left: `${(stepIdx / 3) * 100}%`, transform: 'translate(-50%, -50%)' }}
                  />
                ))}
                {/* Flèche à l'extrémité droite */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 border-t-2 border-r-2 border-emerald-500 transform rotate-45" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}