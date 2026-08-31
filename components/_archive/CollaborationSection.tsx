'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ShieldCheck,
  Factory,
  Wrench,
  Users,
  GitBranch,
} from 'lucide-react'

const nodes = [
  {
    icon: ShieldCheck,
    title: 'Qualité',
    desc: 'Détection et suivi des non-conformités terrain.',
    color: '#DAA250',
  },
  {
    icon: Factory,
    title: 'Production',
    desc: 'Suivi des opérations et continuité des flux.',
    color: '#3B82F6',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    desc: 'Réactivité sur incidents et interventions.',
    color: '#22C55E',
  },
  {
    icon: Users,
    title: 'Management',
    desc: 'Pilotage global et décisions opérationnelles.',
    color: '#8B5CF6',
  },
]

export default function CollaborationSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F8FAFC] py-24 lg:py-32"
    >
      {/* BACKGROUND DIFFERENT (important demandé) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />

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

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold text-dark sm:text-5xl">
            Mieux coordonner les équipes autour de{' '}
            <span className="text-gradient-gold">données communes</span>
          </h2>

          <p className="mt-6 text-dark/60 text-lg leading-relaxed">
            Sur le terrain, les problèmes qualité ne sont pas isolés.
            Ils impliquent plusieurs fonctions qui doivent travailler ensemble
            autour d’une base d’information unique et fiable.
          </p>
        </motion.div>

        {/* DIAGRAM */}
        <div className="relative flex flex-col items-center justify-center">

          {/* center node */}
          <div className="relative z-10 mb-12 flex h-28 w-28 items-center justify-center rounded-full bg-gold/10 shadow-lg">
            <GitBranch size={30} className="text-gold" />
          </div>

          {/* connectors */}
          <div className="absolute top-[56px] hidden h-[2px] w-[70%] bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {nodes.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >

                {/* node line */}
                <div className="absolute -top-6 left-1/2 h-6 w-[2px] -translate-x-1/2 bg-slate-200 lg:block hidden" />

                {/* icon */}
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-110"
                  style={{ backgroundColor: `${n.color}15` }}
                >
                  <n.icon size={20} style={{ color: n.color }} />
                </div>

                <h3 className="text-sm font-semibold text-dark">
                  {n.title}
                </h3>

                <p className="mt-2 text-sm text-dark/55">
                  {n.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>

        {/* FOOT NOTE */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-dark/60 text-lg">
            Une base commune permet de réduire les délais de décision et
            d’améliorer la coordination entre services.
          </p>
        </div>

      </div>
    </section>
  )
}