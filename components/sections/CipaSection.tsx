'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  X,
  Database,
  Workflow,
  Activity,
} from 'lucide-react'
import Image from 'next/image'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'

const colors = {
  gold: tokens.color.gold.DEFAULT,
  lime: tokens.color.accent.lime,
  green: tokens.color.accent.green,
  text: 'rgb(17 17 17)',
  muted: 'rgba(17,17,17,.65)',
}

const pillars = [
  {
    icon: Database,
    title: 'Structurer',
    description:
      'Centralisez audits, inspections et données terrain dans un référentiel unique afin de créer une visibilité claire et exploitable.',
    iconColor: colors.gold,
  },
  {
    icon: Workflow,
    title: 'Orchestrer',
    description:
      'Coordonnez qualité, production et workflows critiques à travers une plateforme fluide pensée pour les opérations modernes.',
    iconColor: colors.green,
  },
  {
    icon: Activity,
    title: 'Piloter',
    description:
      'Transformez les données terrain en décisions rapides grâce à une intelligence opérationnelle en temps réel.',
    iconColor: colors.lime,
  },
]

// Cartes secteurs — déplacées depuis le Hero (#2)
const SECTORS = [
  { logo: '/Secteur/Pharmaceutique.png', label: 'Pharmaceutiques & biotech' },
  { logo: '/Secteur/Nutraceutical.png', label: 'Nutraceutique & Santé' },
  { logo: '/Secteur/Agroalimentaire.png', label: 'Agroalimentaire & boissons' },
  { logo: '/Secteur/Chimie.png', label: 'Chimie & Matières premières' },
  { logo: '/Secteur/Dispositifs.png', label: 'Dispositifs Médicaux' },
  { logo: '/Secteur/Manufacture.png', label: 'Industrie Manufacturière' },
  { logo: '/Secteur/Distribution.png', label: 'Distribution & logistique' },
  { logo: '/Secteur/Autres.png', label: 'Autres Secteurs' },
]

function SectorLogoCard({
  logo,
  label,
  index,
}: {
  logo: string
  label: string
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const floatDuration = 3 + (index % 3) * 0.5

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={isHovered ? { y: [0, -10, 0] } : { y: 0 }}
      whileHover={{ scale: 1.12, zIndex: 40 }}
      transition={
        isHovered
          ? {
              y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' },
              scale: { type: 'spring', stiffness: 400, damping: 20 },
            }
          : {
              y: { duration: 0.3, ease: 'easeOut' },
              scale: { type: 'spring', stiffness: 400, damping: 20 },
            }
      }
      className="
        group relative flex h-16 w-16 cursor-pointer items-center justify-center
        overflow-visible rounded-2xl border border-black/[0.06] bg-white
        shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-shadow duration-300
        hover:border-black/[0.12] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)]
      "
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl p-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={label} className="h-full w-full object-contain" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: -14, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 8, scale: 0.95, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="
              pointer-events-none absolute bottom-full left-1/2 z-50 mb-1
              whitespace-nowrap rounded-xl bg-gray-900 px-3 py-2 text-[12px]
              font-semibold text-white shadow-xl
            "
          >
            {label}
            <div className="absolute left-1/2 top-full -mt-1 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CipaSection() {
  const m = useMotion()
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <section
      ref={ref}
      id="solutions"
      className="relative overflow-hidden bg-stone-100 py-12 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-10"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      {/* ================= BACKGROUND — mesh animé avec parallax léger ================= */}
      <AnimatedMeshBackground
        gradient="linear-gradient(180deg, rgb(255 255 255) 0%, rgb(246 247 244) 100%)"
        gridColor="rgba(0,0,0,.1)"
        orbs={[
          { color: 'rgba(218,162,80,.10)', size: 600, position: { left: '-96px', top: '-96px' }, duration: 10, parallax: 35 },
          { color: 'rgba(199,255,58,.07)', size: 600, position: { right: '-96px', bottom: '-96px' }, duration: 12, parallax: 45 },
          { color: 'rgba(63,174,90,.06)', size: 420, position: { left: 'calc(50% - 210px)', top: '33%' }, duration: 8, parallax: 25 },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            variants={m.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={m.viewport}
          >
            <div className="flex justify-center">
              <Image
                src="/logoCIPA.png"
                alt="CIPA"
                width={320}
                height={120}
                className="h-auto w-[220px] lg:w-[280px]"
              />
            </div>

            <h2
              className="mt-3 text-3xl lg:text-5xl font-extrabold leading-[1.05] tracking-[-0.04em]"
              style={{ color: colors.text }}
            >
              La plateforme qui transforme
              <span
                className="block mt-1"
                style={{ color: colors.gold }}
              >
                vos opérations industrielles.
              </span>
            </h2>

            <div className="mx-auto mt-3 max-w-3xl">
              <p
                className="text-base lg:text-lg font-semibold leading-7"
                style={{ color: colors.gold }}
              >
                La réponse à vos opérations déconnectées.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ================= TRANSITION : problèmes → CIPA ================= */}
        <motion.div
          variants={m.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          className="relative mt-6 lg:mt-8"
        >
          <p
            className="mx-auto max-w-2xl text-center text-[13px] font-medium leading-6"
            style={{ color: colors.muted }}
          >
            CIPA reconnecte vos opérations, vos équipes et vos données.{' '}
            <span className="font-bold" style={{ color: colors.text }}>
              Trois pouvoirs pour reprendre le contrôle.
            </span>
          </p>

          {/* Ligne d'énergie animée — remplace les flèches/branches */}
          <div className="relative mx-auto mt-6 h-px w-full max-w-md overflow-hidden rounded-full lg:max-w-lg">
            <div className="absolute inset-0" style={{ background: 'rgba(218,162,80,.15)' }} />
            <div
              className="absolute inset-y-0 w-1/4 animate-shimmer"
              style={{
                background:
                  `linear-gradient(90deg, transparent, ${colors.gold}, ${colors.lime}, transparent)`,
              }}
            />
          </div>
        </motion.div>

        {/* ================= PILLARS / CARDS — les 3 pouvoirs ================= */}
        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              variants={m.fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={m.viewport}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative overflow-visible rounded-[24px] border p-6 pt-8 text-center transition-shadow duration-300 hover:shadow-[0_35px_80px_rgba(0,0,0,0.12)] lg:p-7 lg:pt-9 ${
                i === 1 ? 'lg:-translate-y-4' : ''
              }`}
              style={{
                background: 'rgba(255,255,255,.9)',
                borderColor: 'rgba(0,0,0,.06)',
                boxShadow: '0 25px 70px rgba(0,0,0,.08)',
              }}
            >
              {/* Numéro flottant */}
              <div
                className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-[13px] font-black text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ background: pillar.iconColor }}
              >
                0{i + 1}
              </div>

              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                style={{ background: 'rgb(255 255 255)', border: '1px solid rgba(0,0,0,.05)' }}
              >
                <pillar.icon size={22} style={{ color: pillar.iconColor }} />
              </div>

              <h3 className="mt-3 text-xl font-black" style={{ color: colors.text }}>
                {pillar.title}
              </h3>

              <p className="mt-2 text-sm leading-6" style={{ color: colors.muted }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= BARRE DES SECTEURS — sous la flèche (#2/#7) ================= */}
        <motion.div
          variants={m.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          className="mx-auto mt-10 max-w-6xl lg:mt-12"
        >
          <div className="mb-3 text-center">
            <h4
              className="mb-1 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: colors.gold }}
            >
              Conçu pour vos secteurs industriels
            </h4>
            <p className="mx-auto max-w-md text-[13px]" style={{ color: colors.muted }}>
              CIPA s&apos;adapte aux exigences réglementaires et opérationnelles de chaque secteur.
            </p>
          </div>

          <div className="grid grid-cols-4 items-center justify-items-center gap-3 py-1 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
            {SECTORS.map((sector, index) => (
              <SectorLogoCard
                key={sector.logo}
                logo={sector.logo}
                label={sector.label}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* ================= CTA — rayonnement gold (#8) ================= */}
        <div className="mt-6 flex justify-center lg:mt-7">
          <div className="relative">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-8 py-3.5 font-bold transition-all duration-500 hover:-translate-y-0.5"
              style={{
                background: tokens.color.dark.DEFAULT,
                color: colors.gold,
                border: '1px solid rgba(218,162,80,.5)',
                boxShadow: '0 20px 60px rgba(0,0,0,.18)',
              }}
            >
              <div className="absolute inset-0 bg-gold opacity-0 transition duration-500 group-hover:opacity-100" />

              <span className="relative z-10 group-hover:text-black">
                Planifier une démo
              </span>

              <ArrowRight className="relative z-10 transition group-hover:translate-x-1 group-hover:text-black" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 text-white"
            >
              <X size={28} />
            </button>

            <motion.div
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden bg-white"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <Image
                src="/cipa5.png"
                alt="full"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}