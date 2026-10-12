'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ClipboardCheck,
  Route,
  ShieldCheck,
  AlertTriangle,
  CheckCheck,
  Workflow,
  ArrowRight,
} from 'lucide-react'

const modules = [
  {
    icon: ClipboardCheck,
    title: 'Audits et inspections',
    description:
      'Standardisez vos checklists, sécurisez la collecte des observations et améliorez la traçabilité de chaque contrôle réalisé sur le terrain.',
  },
  {
    icon: Route,
    title: 'Tournées qualité et opérationnelles',
    description:
      'Organisez les tournées par zone, par périmètre ou par équipe, avec une exécution plus homogène et un meilleur suivi des constats.',
  },
  {
    icon: ShieldCheck,
    title: 'Contrôles en production',
    description:
      'Digitalisez les contrôles qualité en cours de fabrication, les points de vérification critiques et les enregistrements nécessaires à la maîtrise opérationnelle.',
  },
  {
    icon: AlertTriangle,
    title: 'Gestion des non-conformités',
    description:
      'Déclarez rapidement un écart, documentez les faits, reliez-le à une zone, un produit, un lot ou un processus, puis suivez sa résolution dans le temps.',
  },
  {
    icon: CheckCheck,
    title: 'Actions correctives et préventives',
    description:
      'Assignez les actions, définissez les responsabilités, suivez les échéances et améliorez la clôture des plans d’action.',
  },
  {
    icon: Workflow,
    title: 'Workflows opérationnels',
    description:
      'Structurez des séquences métier plus complexes pour guider l’exécution de processus terrain, renforcer la conformité et fiabiliser les enregistrements.',
  },
]

export default function FeaturesGrid() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F5F7FA] py-28 lg:py-36"
    >

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">

        {/* MAIN */}
        <div className="absolute inset-0 bg-[#F5F7FA]" />

        {/* TOP GLOW */}
        <div className="absolute top-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

        {/* BOTTOM GLOW */}
        <div className="absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#0F172A]/5 blur-3xl" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 xl:px-20">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          {/* LABEL */}
          <div className="mb-6 inline-flex items-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1.5">

            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B88900]">
              Modules opérationnels
            </span>

          </div>

          {/* TITLE */}
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-6xl">

            Digitaliser les processus qui{' '}

            <span className="text-[#B88900]">
              structurent réellement le terrain
            </span>

          </h2>

          {/* TEXT */}
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-[#0F172A]/60">
            CIPA centralise les opérations qualité, les contrôles terrain
            et les workflows industriels dans une plateforme plus claire,
            plus homogène et plus exploitable au quotidien.
          </p>

        </motion.div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[30px] border border-black/[0.04] bg-white/90 p-8 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/10 hover:shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
            >

              {/* HOVER GRADIENT */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.10),transparent_55%)]" />

              </div>

              {/* ICON */}
              <div className="relative z-10 mb-8">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/10 bg-[#D4AF37]/10 transition-all duration-500 group-hover:scale-105 group-hover:bg-[#D4AF37]/15">

                  <module.icon
                    size={28}
                    className="text-[#B88900]"
                  />

                </div>

              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex flex-1 flex-col">

                <h3 className="font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-[#0F172A]">
                  {module.title}
                </h3>

                <p className="mt-4 line-clamp-4 text-[15px] leading-7 text-[#0F172A]/62">
                  {module.description}
                </p>

              </div>

              {/* BOTTOM */}
              <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-medium text-[#0F172A]/35 transition-all duration-300 group-hover:text-[#B88900]">

                <span>Explorer le module</span>

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </div>

              {/* BORDER ACCENT */}
              <div className="absolute bottom-0 left-8 right-8 h-[1px] scale-x-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}