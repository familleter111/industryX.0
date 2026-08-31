'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { PARTNER_BRANCHES } from '@/lib/data/partnerLogos'
import { STATS } from '@/lib/data/orbit'
import { useMotion } from '@/lib/useMotion'
import OrbitCanvas from '@/components/sections/orbit/OrbitCanvas'
import Section from '@/components/ui/Section'

/* ============================================================
   ORBITE DE L'ÉCOSYSTÈME

   Le principe est celui des pages « partenaires » de Stripe : la marque au
   centre, les partenaires qui gravitent autour sur deux anneaux tournant en
   sens inverse, et rien d'autre — pas de carte, pas de cadre, pas de dégradé.

   Toute la géométrie est décrite dans un repère carré de 620 unités, puis
   convertie en pourcentages du conteneur (qui porte `aspect-square`). Dessin,
   pastilles et logos partagent donc exactement la même échelle, à n'importe
   quelle largeur d'écran.

   La rotation est une animation CSS (et non framer-motion) pour deux raisons :
   elle se met en pause au survol via `animation-play-state`, et elle s'annule
   d'elle-même sous `prefers-reduced-motion`.

   PIÈGE À NE PAS REPRODUIRE. Un élément positionné par `left`/`top` puis
   recentré par `-translate-x-1/2 -translate-y-1/2` ne doit JAMAIS porter
   d'animation framer-motion : le `transform` inline écrit par motion écrase
   les classes de translation et l'élément se retrouve posé par son coin
   supérieur gauche, décalé d'un demi-diamètre. D'où la séparation systématique
   ci-dessous : un div de position (transform réservé au recentrage), puis un
   div de contre-rotation, puis le `motion.div` d'apparition.
   ============================================================ */

function Stats() {
  return (
    <div className="mt-10 flex flex-wrap items-start gap-x-10 gap-y-6 sm:mt-12 sm:gap-x-14">
      {STATS.map((stat) => (
        <div key={stat.label}>
          <p className="font-display text-[26px] font-black leading-none tracking-[-0.03em] text-gray-900 sm:text-[30px]">
            {stat.value}
          </p>
          <p className="mt-2 text-[12px] font-medium text-stone-500 sm:text-[12.5px]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   LÉGENDE — page Partenaires uniquement

   Nommer chaque partenaire, sans carte : trois colonnes séparées par un filet.
   ============================================================ */

function BranchLegend() {
  return (
    <div className="mt-14 grid gap-9 border-t border-dark/[0.07] pt-10 sm:mt-16 sm:grid-cols-3 sm:gap-10">
      {PARTNER_BRANCHES.map((branch) => (
        <div key={branch.key}>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold-deep">
            {branch.label}
          </p>

          <p className="mt-2.5 text-[13px] leading-[1.65] text-stone-500">
            {branch.desc}
          </p>

          <ul className="mt-4 space-y-2.5">
            {branch.partners.map((partner) => (
              <li key={partner.src} className="flex items-baseline gap-2.5">
                <span className="mt-[1px] h-[5px] w-[5px] shrink-0 rounded-full bg-gold" />
                <span>
                  <span className="text-[13.5px] font-semibold text-stone-800">
                    {partner.alt}
                  </span>
                  <span className="ml-2 text-[12.5px] text-stone-400">
                    {partner.tagline}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   SECTION

   `home` : le bloc en deux colonnes de la page d'accueil (discours + orbite).
   `page` : version centrée pour /partners, sans CTA — le PageHero les porte
   déjà — mais avec la légende nominative des trois familles.
   ============================================================ */

export default function PartnersOrbit({
  variant = 'home',
}: {
  variant?: 'home' | 'page'
}) {
  const m = useMotion()
  const isHome = variant === 'home'

  const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <Section
      variant="default"
      background="cream"
      innerClassName="max-w-[1180px]"
    >
        {isHome ? (
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-12">
            {/* DISCOURS */}
            <motion.div {...reveal}>

              <h2 className="mt-6 font-display text-[30px] font-black leading-[1.08] tracking-[-0.035em] text-gray-900 sm:text-[40px] lg:text-[46px]">
                Des partenaires
                <br />
                qui avancent
                <br />
                avec nous
              </h2>

              <p className="mt-6 max-w-[30rem] text-pretty text-[14.5px] leading-[1.75] text-stone-600 sm:text-[15.5px]">
                CIPA s’entoure de partenaires technologiques, de cabinets de
                conseil et d’institutions pour construire ensemble l’industrie
                de demain. Une synergie de compétences au service de vos
                opérations.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/partners"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-bold text-dark shadow-[0_14px_34px_rgba(218,162,80,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-gold-400"
                >
                  Découvrir nos partenaires
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-dark/15 px-6 py-3.5 text-[14px] font-bold text-stone-900 transition-all duration-300 hover:border-dark/35 hover:bg-white"
                >
                  Nous rejoindre
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <Stats />
            </motion.div>

            {/* ORBITE */}
            <OrbitCanvas />
          </div>
        ) : (
          <>
            <motion.div
              {...reveal}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-gold/55 sm:w-16" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep sm:text-[11.5px]">
                  L’écosystème
                </span>
                <span className="h-px w-10 bg-gold/55 sm:w-16" />
              </div>

              <h2 className="mt-6 font-display text-[30px] font-black leading-[1.1] tracking-[-0.035em] text-gray-900 sm:text-[42px] lg:text-[48px]">
                Trois familles de partenaires,
                <br />
                une seule plateforme
              </h2>

              <p className="mt-6 max-w-2xl text-pretty text-[14.5px] leading-[1.75] text-stone-600 sm:text-[16px]">
                Technologie, conseil, institutions : sept partenaires, trois
                familles, une seule promesse industrielle.
              </p>
            </motion.div>

            <div className="mt-12 lg:mt-14">
              <OrbitCanvas />
            </div>

            <BranchLegend />
          </>
        )}
    </Section>
  )
}
