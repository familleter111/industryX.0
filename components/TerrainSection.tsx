'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Smartphone,
  ClipboardCheck,
  RefreshCw,
  ShieldCheck,
  MonitorSmartphone,
  Workflow,
} from 'lucide-react'

const terrainFeatures = [
  {
    icon: Smartphone,
    title: 'Saisie mobile fluide',
    text: 'Des formulaires simples et rapides à utiliser directement sur le terrain.',
  },
  {
    icon: ClipboardCheck,
    title: 'Contrôles standardisés',
    text: 'Uniformisez les inspections et réduisez les écarts d’exécution.',
  },
  {
    icon: RefreshCw,
    title: 'Information synchronisée',
    text: 'Les données remontent instantanément entre terrain et management.',
  },
  {
    icon: ShieldCheck,
    title: 'Traçabilité renforcée',
    text: 'Historique clair des opérations, statuts et actions réalisées.',
  },
]

export default function TerrainSection() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FCFCFD] py-24 lg:py-32"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-15%] h-[450px] w-[450px] rounded-full bg-[#E9F0FF] blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-gold/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '74px 74px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 xl:px-20">

        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">

          {/* LEFT VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 scale-90 rounded-[3rem] bg-gold/10 blur-3xl" />

            <div className="relative w-full max-w-[680px]">

              {/* MAIN WINDOW */}
              <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.10)]">

                {/* TOP BAR */}
                <div className="flex items-center justify-between border-b border-black/5 bg-[#FAFAFB] px-5 py-4">

                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-dark/[0.04] px-3 py-1.5">
                    <Workflow size={14} className="text-gold" />

                    <span className="text-xs font-medium text-dark/55">
                      Opérations terrain
                    </span>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F6F9]">
                  <Image
                    src="/cipa1.png"
                    alt="CIPA terrain operations"
                    fill
                    priority
                    className="object-cover object-top"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-dark/10 via-transparent to-transparent" />
                </div>
              </div>

              {/* FLOATING MOBILE CARD */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-8 -right-4 w-[220px] rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
              >

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10">
                    <MonitorSmartphone size={20} className="text-gold" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-dark">
                      Inspection terrain
                    </p>

                    <p className="text-xs text-dark/45">
                      Synchronisation live
                    </p>
                  </div>
                </div>

                <div className="space-y-3">

                  <div className="rounded-xl bg-[#F7F8FA] p-3">

                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-dark/55">
                        Contrôle qualité
                      </span>

                      <span className="text-xs font-semibold text-green-600">
                        Conforme
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-dark/5">
                      <div className="h-full w-[82%] rounded-full bg-gold" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-dark/5 bg-white p-3">
                    <p className="text-xs leading-relaxed text-dark/60">
                      Observation transmise automatiquement au superviseur.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white px-4 py-2 shadow-sm">

              <Smartphone size={15} className="text-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-dark/55">
                Terrain-first platform
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-[1.08] text-dark sm:text-5xl">
              Pensé pour les réalités des{' '}
              <span className="text-gradient-gold">
                équipes industrielles
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-[16px] leading-relaxed text-dark/65">

              <p>
                CIPA a été conçu pour un usage concret sur le terrain, dans des
                environnements où la simplicité d’exécution, la rapidité de
                saisie et la fiabilité des informations sont essentielles.
              </p>

              <p>
                La plateforme facilite la saisie sur mobile et tablette,
                l’exécution standardisée des contrôles, la collecte structurée
                des observations, la traçabilité des opérations et des statuts,
                ainsi que la circulation plus fluide de l’information entre
                terrain et management.
              </p>

              <p>
                L’objectif est de donner aux équipes un outil utilisable dans
                l’action, et non un système supplémentaire qui ajoute de la
                complexité.
              </p>
            </div>

            {/* FEATURES */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              {terrainFeatures.map((item, i) => (
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

        </div>
      </div>
    </section>
  )
}