'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
} from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { CLIENT_LOGOS, logoFrameWidth, type ClientLogo } from '@/lib/data/clientLogos'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'

/*
 * Logos clients : source unique dans components/clientLogos.ts.
 * `logoFrameWidth` inscrit le contenu réel de chaque fichier dans une même
 * boîte, ce qui égalise la taille perçue malgré des marges internes qui vont
 * du simple au septuple d'un logo à l'autre.
 */
const PARTNER_LOGOS = CLIENT_LOGOS

function LogoCard({ logo }: { logo: ClientLogo }) {
  return (
    <div className="group/logo mx-6 sm:mx-8 md:mx-10 flex h-[110px] w-[150px] shrink-0 items-center justify-center overflow-hidden sm:w-[170px] md:w-[185px]">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={512}
        height={512}
        /* contenu inscrit dans 120×54 — cadre max ≈ 140 px, sous les 150 px de cellule */
        style={{ width: logoFrameWidth(logo, 120, 54) }}
        className="h-auto max-w-full shrink-0 object-contain opacity-80 grayscale contrast-125 transition-all duration-300
                   group-hover/marquee:opacity-40 group-hover/marquee:grayscale
                   group-hover/logo:!opacity-100 group-hover/logo:!grayscale-0 group-hover/logo:!contrast-100"
      />
    </div>
  )
}

const PILLS = [
  'Conformité & qualité',
  'Temps réel',
  'Traçabilité complète',
]



export default function Hero() {
  const m = useMotion()
  return (
    <section className="relative overflow-hidden bg-cream pt-16 sm:pt-20 lg:pt-28 pb-6 lg:pb-8">
      {/* Le Hero n'utilise pas <Section> : son padding haut degage la navbar
          fixe et son padding bas est volontairement asymetrique, deux
          contraintes que l'echelle de rythme ne doit pas connaitre. Le fond,
          lui, suit l'alternance. */}
      {/* BACKGROUND — mesh animé avec parallax léger au scroll */}
      <AnimatedMeshBackground
        gradient={tokens.gradient.section}
        orbs={[
          { color: 'rgba(34,197,94,0.10)', size: 420, position: { left: '0', top: '40px' }, duration: 11, parallax: 30 },
          { color: 'rgba(218,162,80,0.10)', size: 420, position: { right: '0', bottom: '0' }, duration: 13, parallax: 40 },
        ]}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:gap-6 lg:grid-cols-[0.9fr_1.7fr] px-4 sm:px-6 lg:px-10">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 text-center lg:text-left"
        >
          {/* BADGE */}

          <div
            className="
              mb-6 inline-flex items-center gap-2
              rounded-full border
              px-4 py-2 sm:px-5 sm:py-2.5
            "
            style={{
              background: 'rgba(255,255,255,0.74)',
              borderColor: 'rgba(15,23,42,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>

            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
              Plateforme d&apos;intelligence opérationnelle
            </span>
          </div>

          {/* TITLE */}

          <h1 className="font-black leading-[1.04] tracking-[-0.06em] text-gray-900">
            {/* LIGNE 1 */}
            <span
              className="block whitespace-nowrap"
              style={{ fontSize: 'clamp(1.5rem,2.7vw,2.5rem)' }}
            >
              Vos opérations
            </span>

            {/* LIGNE 2 */}
            <span
              className="block whitespace-nowrap"
              style={{ fontSize: 'clamp(1.5rem,2.7vw,2.5rem)' }}
            >
              sont complexes.
            </span>

            {/* LIGNE 3 */}
            <span
              className="mt-3 block whitespace-nowrap"
              style={{ fontSize: 'clamp(1.5rem,2.7vw,2.5rem)' }}
            >
              Nous les transformons
            </span>

            {/* LIGNE 4 */}
            <span
              className="block whitespace-nowrap font-black"
              style={{ fontSize: 'clamp(1.5rem,2.7vw,2.5rem)' }}
            >
              en{' '}
              <span
                style={{
                  color: tokens.color.gold.DEFAULT,
                  textShadow: '0 10px 30px rgba(218,162,80,0.16)',
                }}
              >
                système pilotable.
              </span>
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="mt-6 mx-auto lg:mx-0 max-w-[42ch] leading-[1.9] text-stone-600"
            style={{
              fontSize: 'clamp(.95rem,1.25vw,1.06rem)',
            }}
          >
            CIPA structure la donnée terrain,
            orchestre les processus critiques et
            active l&apos;IA pour améliorer les
            opérations industrielles en continu.
          </p>

          {/* CTA */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            {/* PRIMARY BUTTON */}

            <Link
              href="/contact"
              className="
                group relative inline-flex items-center
                justify-center overflow-hidden
                rounded-full px-8 py-4
                text-[14px] font-bold
                transition-all duration-500
                hover:-translate-y-1
              "
              style={{
                background: tokens.color.dark.DEFAULT,
                color: tokens.color.gold.DEFAULT,
                boxShadow:
                  '0 18px 45px rgba(15,23,42,0.18)',
              }}
            >
              {/* GOLD SUN EFFECT */}

              <span
                className="
                  absolute inset-0 opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(218,162,80,0.45) 0%, transparent 72%)',
                }}
              />

              {/* COLOR SWITCH */}

              <span
                className="
                  absolute inset-0 scale-x-0
                  origin-left rounded-full
                  transition-transform duration-500
                  group-hover:scale-x-100
                "
                style={{
                  background:
                    `linear-gradient(135deg, ${tokens.color.gold.DEFAULT} 0%, ${tokens.color.gold[300]} 100%)`,
                }}
              />

              <span
                className="
                  relative z-10 transition-colors
                  duration-500 group-hover:text-gray-900
                "
              >
                Planifier une démo
              </span>

              <ArrowRight
                size={15}
                className="
                  relative z-10 ml-2
                  transition-all duration-500
                  group-hover:translate-x-1
                  group-hover:text-gray-900
                "
              />
            </Link>

            {/* SECONDARY BUTTON */}

            <Link
              href="/solutions/cipa"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full border
                px-8 py-4
                text-[14px] font-bold
                transition-all duration-300
                hover:-translate-y-0.5
              "
              style={{
                background: 'rgba(255,255,255,0.75)',
                borderColor: 'rgba(15,23,42,0.08)',
                color: tokens.color.dark.DEFAULT,
                backdropFilter: 'blur(12px)',
              }}
            >
              <PlayCircle size={17} />
              Voir la plateforme
            </Link>
          </div>

          {/* DISCREET INFOS */}

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
            {PILLS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2"
              >
                <CheckCircle2
                  size={15}
                  className="text-green-500"
                />

                <span className="text-[13px] font-medium text-stone-600">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          variants={m.scaleIn}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* Conteneur isolé à la couleur de la section : le fond blanc de
              l'image se fond dans la section via mix-blend-multiply.
              Agrandi et décalé un peu vers la droite sur grand écran. */}
          <div
            className="overflow-hidden bg-stone-100 lg:origin-center lg:translate-x-10 lg:scale-110"
            style={{ isolation: 'isolate' }}
          >
            <Image
              src="/hero.png"
              alt="Plateforme CIPA — pilotage des opérations industrielles"
              width={1448}
              height={1086}
              priority
              className="h-auto w-full mix-blend-multiply"
            />
          </div>
        </motion.div>
      </div>

      {/* PARTNER LOGOS MARQUEE — déplacée depuis CIPA (#2) */}
      <motion.div
        variants={m.fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={m.viewport}
        className="relative z-10 mt-8 w-full sm:mt-12"
      >
        <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
          Ils nous font confiance
        </p>

        <div className="group/marquee relative overflow-hidden py-4 sm:py-6 w-full">
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-stone-100 to-transparent sm:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-stone-100 to-transparent sm:w-32" />

          <div className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]">
            {/* 2 copies suffisent : l'animation translate de -50%, soit exactement une copie */}
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <LogoCard key={i} logo={logo} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}