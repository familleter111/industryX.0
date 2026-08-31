'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database,
  Layers3,
  LineChart,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'
import Section from '@/components/ui/Section'
import Image from 'next/image'

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

/**
 * Objectifs de Developpement Durable, en barre.
 *
 * Les six pastilles officielles alignees, avec un flottement leger. Chacune
 * porte son intitule en texte alternatif : ici l'icone n'est plus decorative,
 * elle est la seule porteuse de l'information, donc elle a besoin d'un nom
 * accessible. Un `alt` vide rendrait la barre muette pour un lecteur d'ecran.
 *
 * `delay` et `tilt` ne servent qu'a desynchroniser les six : sans decalage de
 * phase elles montent et descendent ensemble, ce qui se voit comme un defaut.
 * Ce sont des offsets, pas des durees — la duree reste celle de
 * `animate-float-soft` (8 s, definie une fois dans tailwind.config).
 */
const SDG_GOALS = [
  { num: 7, title: 'Énergie propre et d’un coût abordable', delay: 0, tilt: 3 },
  { num: 8, title: 'Travail décent et croissance économique', delay: 1.1, tilt: -2 },
  { num: 9, title: 'Industrie, innovation et infrastructure', delay: 2.2, tilt: 2 },
  { num: 12, title: 'Consommation et production responsables', delay: 0.6, tilt: -3 },
  { num: 13, title: 'Mesures relatives à la lutte contre les changements climatiques', delay: 1.7, tilt: 2 },
  { num: 17, title: 'Partenariats pour la réalisation des objectifs', delay: 2.8, tilt: -2 },
] as const

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



        {/* ================= OBJECTIFS DE DEVELOPPEMENT DURABLE =================

            Une barre des six pastilles officielles, en flottement leger.

            Le flottement est une boucle autonome : il reste en CSS
            (animate-float-soft), ou il ne coute rien au fil principal et se
            neutralise sous prefers-reduced-motion via la regle globale de
            globals.css. L'entree au scroll, elle, depend de l'etat du
            viewport : elle reste chez Framer. Les deux vivent sur deux
            elements distincts — poses sur le meme, la keyframe CSS ecraserait
            le transform inline de Framer et l'entree serait invisible.

            TODO(licence) — verifier avant la soutenance les conditions
            d'utilisation des logos ODD de l'ONU. Les Guidelines on the Use of
            the SDG Logo and the 17 SDG Icons distinguent l'usage informatif
            de l'usage commercial : le second exige une autorisation ecrite,
            et interdit de laisser entendre que l'ONU soutient le produit. Un
            site vitrine d'editeur logiciel releve du second cas.
            Reference : un.org/sustainabledevelopment/news/communications-material/
            ================================================================= */}
        <motion.div
          variants={m.stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          className="relative z-10 mx-auto mt-20 max-w-6xl px-4 sm:mt-28 sm:px-10"
        >
          <motion.div variants={m.fadeUp} className="mb-8 text-center">
            <h4 className="mb-2 text-[15px] font-bold text-dark">
              Contribution aux Objectifs de Développement Durable
            </h4>
            <p className="mx-auto max-w-xl text-sm text-stone-600">
              Six objectifs sur lesquels la plateforme a un effet mesurable.
            </p>
          </motion.div>

          <ul className="grid grid-cols-3 items-center justify-items-center gap-6 py-4 sm:grid-cols-6 sm:gap-8">
            {SDG_GOALS.map((goal) => (
              <motion.li key={goal.num} variants={m.fadeUp}>
                <Image
                  src={`/ODD/ODD${goal.num}.png`}
                  alt={`Objectif ${goal.num} — ${goal.title}`}
                  width={512}
                  height={512}
                  style={{
                    animationDelay: `${goal.delay}s`,
                    ['--tilt' as string]: `${goal.tilt}deg`,
                  }}
                  className="h-16 w-16 animate-float-soft rounded-lg object-contain sm:h-[72px] sm:w-[72px]"
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
    </Section>
  )
}