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
 * Icones ODD flottantes, en fond de section.
 *
 * Purement decoratives : elles reprennent les six objectifs detailles plus
 * bas, donc elles sont retirees de l'arbre d'accessibilite (aria-hidden,
 * alt vide) pour ne pas faire lire deux fois la meme liste.
 *
 * Elles vivent dans les deux bandes laterales laissees libres par le contenu
 * (max-w-6xl), d'ou le seuil a 1440 px : c'est la largeur a partir de laquelle
 * ces bandes font environ 180 px et accueillent les six sans en pousser une
 * seule sous une carte. Mesure a l'appui, en dessous elles repassent dessous —
 * jusqu'a 59 % de surface masquee a 1280 px. Une icone posee sous une carte au
 * fond opaque n'est pas une decoration discrete, c'est un fichier telecharge
 * pour rien.
 *
 * Deux coordonnees d'origine ont ete corrigees pour la meme raison : `left:
 * 46%` tombait entierement derriere la carte centrale et `right: 12%` mordait
 * de 45 % sur une carte objectif — la mise en page basse a change depuis.
 */
const ODD_FLOATING = [
  { id: 'ODD7', top: '12%', left: '6%', size: 70, delay: 0, duration: 4, rotate: 6 },
  { id: 'ODD8', bottom: '15%', left: '3%', size: 85, delay: 1.2, duration: 5.5, rotate: -4 },
  { id: 'ODD9', top: '8%', right: '8%', size: 65, delay: 0.5, duration: 4.5, rotate: 5 },
  { id: 'ODD12', bottom: '22%', right: '4%', size: 90, delay: 2, duration: 6, rotate: -6 },
  { id: 'ODD13', top: '42%', left: '2%', size: 55, delay: 1.8, duration: 3.8, rotate: 3 },
  { id: 'ODD17', bottom: '38%', right: '2%', size: 75, delay: 0.8, duration: 4.2, rotate: -5 },
] as const

/**
 * Objectifs de Developpement Durable retenus.
 *
 * Les six sur lesquels la contribution de la plateforme est concrete et
 * defendable a l'oral, chacun avec la phrase qui la formule.
 */
const SDG_GOALS = [
  {
    num: 7,
    title: 'Énergie propre et d’un coût abordable',
    contribution:
      'Le suivi de consommation par ligne rend visibles les dérives énergétiques, qui restent invisibles tant qu’elles ne sont pas mesurées poste par poste.',
  },
  {
    num: 8,
    title: 'Travail décent et croissance économique',
    contribution:
      'Instructions digitalisées et validations horodatées : les opérateurs terrain travaillent sur des procédures à jour, tracées et opposables.',
  },
  {
    num: 9,
    title: 'Industrie, innovation et infrastructure',
    contribution:
      'Une base de données industrielle unique remplace les fichiers dispersés et rend le pilotage de la production mesurable.',
  },
  {
    num: 12,
    title: 'Consommation et production responsables',
    contribution:
      'Détection des dérives avant impact qualité : moins de rebuts, moins de retouches, moins de lots bloqués.',
  },
  {
    num: 13,
    title: 'Mesures relatives à la lutte contre les changements climatiques',
    contribution:
      'Effet indirect : chaque rebut évité est de la matière et de l’énergie déjà consommées qui ne sont pas perdues.',
  },
  {
    num: 17,
    title: 'Partenariats pour la réalisation des objectifs',
    contribution:
      'Le déploiement s’appuie sur l’écosystème présenté plus haut — cabinets de conseil, fournisseurs cloud, agences de coopération.',
  },
] as const

/**
 * Le flottement est une boucle autonome : il reste en CSS
 * (`animate-float-soft`), ou il ne coute rien au fil principal et se neutralise
 * sous prefers-reduced-motion via la regle globale de globals.css.
 *
 * L'entree au scroll, elle, depend de l'etat du viewport : elle reste chez
 * Framer. Les deux vivent sur deux elements distincts — sur le meme, la
 * keyframe CSS ecraserait le transform inline pose par Framer et l'entree
 * serait invisible.
 */
function FloatingGoals() {
  const m = useMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden min-[1440px]:block"
    >
      {ODD_FLOATING.map((odd) => (
        <motion.div
          key={odd.id}
          variants={m.scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          style={{
            top: 'top' in odd ? odd.top : undefined,
            bottom: 'bottom' in odd ? odd.bottom : undefined,
            left: 'left' in odd ? odd.left : undefined,
            right: 'right' in odd ? odd.right : undefined,
            width: odd.size,
            height: odd.size,
          }}
          className="absolute"
        >
          <Image
            src={`/ODD/${odd.id}.png`}
            alt=""
            width={odd.size}
            height={odd.size}
            style={{
              animationDuration: `${odd.duration}s`,
              animationDelay: `${odd.delay}s`,
              ['--tilt' as string]: `${odd.rotate}deg`,
            }}
            className="h-full w-full animate-float-soft rounded-xl object-contain drop-shadow-xl"
          />
        </motion.div>
      ))}
    </div>
  )
}

export default function IndustriesSection() {
  const m = useMotion()


  return (
    <Section
      className="font-inter"
      variant="default"
      background="cream"
      backdrop={
        <>
          <AnimatedMeshBackground
            gradient={tokens.gradient.section}
            orbs={[
              { color: 'rgba(34,197,94,0.09)', size: 480, position: { left: '0', top: '-5%' }, duration: 11, parallax: 30 },
              { color: 'rgba(218,162,80,0.09)', size: 480, position: { right: '0', bottom: '-5%' }, duration: 13, parallax: 40 },
            ]}
          />
          <FloatingGoals />
        </>
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

            Les six objectifs, chacun avec la phrase qui dit ce que CIPA y
            apporte concretement. C'est le format qui compte : six pastilles
            muettes ne disaient qu'une chose, qu'on connait la liste. La
            contribution ecrite sous chaque objectif est visible au premier
            regard, lisible au clavier et au tactile, et lue par une synthese
            vocale sans dependre d'un survol.

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
              Six objectifs, et ce que la plateforme y apporte concrètement.
            </p>
          </motion.div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SDG_GOALS.map((goal) => (
              <motion.li
                key={goal.num}
                variants={m.fadeUp}
                className="flex flex-col items-center gap-3 rounded-2xl border border-cream-border bg-white p-5 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                <Image
                  src={`/ODD/ODD${goal.num}.png`}
                  alt=""
                  width={512}
                  height={512}
                  className="h-14 w-14 rounded-lg object-contain"
                />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Objectif {goal.num}
                  </p>
                  <h5 className="mt-0.5 text-[15px] font-bold leading-snug text-dark">
                    {goal.title}
                  </h5>
                </div>
                <p className="text-[13px] leading-relaxed text-stone-600">
                  {goal.contribution}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
    </Section>
  )
}