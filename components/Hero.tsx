'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
} from 'lucide-react'

// Logos partenaires — barre déplacée depuis la section CIPA (#2)
const PARTNER_LOGOS = [
  '/image1.png',
  '/image3.png',
  '/image4.png',
  '/image5.png',
  '/image6.png',
]

function LogoCard({ src }: { src: string }) {
  return (
    <div className="group/logo mx-5 flex items-center justify-center">
      <div
        className="relative flex h-24 w-40 items-center justify-center rounded-2xl
                   border border-black/[0.06] bg-white shadow-sm transition-all duration-300
                   hover:scale-[1.06] hover:border-[#DAA250]/30 hover:shadow-lg
                   sm:h-26 sm:w-44 md:h-28 md:w-48"
      >
        <Image
          src={src}
          alt="logo partenaire"
          fill
          className="object-contain p-5 transition duration-300
                     group-hover/marquee:grayscale group-hover/logo:!grayscale-0"
        />
      </div>
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
    <section className="relative overflow-hidden bg-[#F7F7F6] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
          className="absolute left-0 top-10 h-[420px] w-[420px] rounded-full"
          style={{
            background: 'rgba(34,197,94,0.10)',
            filter: 'blur(120px)',
          }}
        />

        {/* GOLD GLOW */}

        <div
          className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full"
          style={{
            background: 'rgba(218,162,80,0.10)',
            filter: 'blur(120px)',
          }}
        />

        {/* GRID */}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(15,23,42,0.12) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(15,23,42,0.12) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '90px 90px',
          }}
        />

      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:gap-16 lg:grid-cols-[1fr_1.05fr]">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
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

          <h1 className="font-black leading-[0.97] tracking-[-0.06em] text-[#0F172A]">
            {/* LIGNE 1 */}

            <span
              className="block"
              style={{
                fontSize: 'clamp(2.1rem,3.6vw,4.1rem)',
              }}
            >
              Vos opérations sont complexes.
            </span>

            {/* LIGNE 2 */}

            <span
              className="mt-2 block"
              style={{
                fontSize: 'clamp(1.9rem,3.2vw,3.7rem)',
              }}
            >
              Nous les transformons
            </span>

            {/* LIGNE 3 */}

            <span
              className="mt-2 block font-black"
              style={{
                fontSize: 'clamp(1.8rem,3vw,3.7rem)',
              }}
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
            y: 20,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          {/* Conteneur isolé à la couleur de la section : le fond blanc de
              l'image se fond dans la section via mix-blend-multiply.
              Agrandi et décalé un peu vers la droite sur grand écran. */}
          <div
            className="overflow-hidden lg:origin-center lg:translate-x-6 lg:scale-110"
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto mt-12 max-w-6xl sm:mt-20"
      >
        <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#78716C]">
          Ils nous font confiance
        </p>

        <div className="group/marquee relative overflow-hidden py-4">
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#F7F7F6] to-transparent sm:w-32" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#F7F7F6] to-transparent sm:w-32" />

          <div className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <LogoCard key={i} src={logo} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}