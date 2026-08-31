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
  return (
    <section className="relative overflow-hidden bg-[#F7F7F6] pt-16 sm:pt-20 lg:pt-28 pb-6 lg:pb-8">
      {/* BACKGROUND — mesh animé avec parallax léger au scroll */}
      <AnimatedMeshBackground
        gradient="linear-gradient(135deg, #F8F8F7 0%, #F3F4F6 40%, #FAFAF9 100%)"
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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>

            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#78716C]">
              Plateforme d&apos;intelligence opérationnelle
            </span>
          </div>

          {/* TITLE */}

          <h1 className="font-black leading-[1.04] tracking-[-0.06em] text-[#0F172A]">
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
                  color: '#DAA250',
                  textShadow: '0 10px 30px rgba(218,162,80,0.16)',
                }}
              >
                système pilotable.
              </span>
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="mt-6 mx-auto lg:mx-0 max-w-[42ch] leading-[1.9] text-[#57534E]"
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
                background: '#111827',
                color: '#DAA250',
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
                    'linear-gradient(135deg,#DAA250 0%,#F2C46D 100%)',
                }}
              />

              <span
                className="
                  relative z-10 transition-colors
                  duration-500 group-hover:text-[#111827]
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
                  group-hover:text-[#111827]
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
                color: '#111827',
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
                  className="text-[#22C55E]"
                />

                <span className="text-[13px] font-medium text-[#57534E]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 14,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.55,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          {/* Conteneur isolé à la couleur de la section : le fond blanc de
              l'image se fond dans la section via mix-blend-multiply.
              Agrandi et décalé un peu vers la droite sur grand écran. */}
          <div
            className="overflow-hidden lg:origin-center lg:translate-x-10 lg:scale-110"
            style={{ background: '#F7F7F6', isolation: 'isolate' }}
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
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mt-8 w-full sm:mt-12"
      >
        <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#78716C]">
          Ils nous font confiance
        </p>

        <div className="group/marquee relative overflow-hidden py-4 sm:py-6 w-full">
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#F7F7F6] to-transparent sm:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#F7F7F6] to-transparent sm:w-32" />

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