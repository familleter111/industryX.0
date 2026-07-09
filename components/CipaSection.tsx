'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  X,
  Database,
  Workflow,
  Activity,
} from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const colors = {
  gold: '#DAA250',
  goldLight: '#F2D94E',

  lime: '#C7FF3A',
  green: '#3FAE5A',
  deepGreen: '#0F3D2E',

  black: '#F6F7F4',
  metal: '#FFFFFF',

  white: '#111111',
  text: '#111111',
  muted: 'rgba(17,17,17,.65)',

  surface: '#FFFFFF',
  border: 'rgba(0,0,0,.06)',
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
              whitespace-nowrap rounded-xl bg-[#0F172A] px-3 py-2 text-[12px]
              font-semibold text-white shadow-xl
            "
          >
            {label}
            <div className="absolute left-1/2 top-full -mt-1 -translate-x-1/2 border-4 border-transparent border-t-[#0F172A]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CipaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [open, setOpen] = useState(false)

  return (
    <section
      ref={ref}
      id="solutions"
      className="relative overflow-hidden py-12 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-10"
      style={{ background: '#F6F7F4', fontFamily: 'var(--font-inter)' }}
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(218,162,80,.08), transparent 26%),
              radial-gradient(circle at bottom right, rgba(199,255,58,.06), transparent 26%),
              linear-gradient(180deg, #FFFFFF 0%, #F6F7F4 100%)
            `,
          }}
        />

        <div
          className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full"
          style={{
            background: 'rgba(218,162,80,.09)',
            filter: 'blur(150px)',
          }}
        />

        <div
          className="absolute right-0 bottom-0 h-[650px] w-[650px] rounded-full"
          style={{
            background: 'rgba(199,255,58,.05)',
            filter: 'blur(150px)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
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

        {/* ================= FLÈCHE EXPLICATIVE : problèmes → CIPA (#5/#6) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mt-5 lg:mt-6"
        >
          {/* Badge de transition */}
          <div className="flex justify-center">
            <div
              className="inline-flex items-center gap-2.5 rounded-full border bg-white px-5 py-2.5"
              style={{
                borderColor: 'rgba(218,162,80,.3)',
                boxShadow: '0 12px 34px rgba(218,162,80,.14)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="text-[12.5px] font-semibold" style={{ color: colors.muted }}>
                Des opérations déconnectées
              </span>
              <ArrowRight size={15} style={{ color: colors.gold }} />
              <span className="text-[12.5px] font-bold" style={{ color: colors.gold }}>
                à la maîtrise CIPA
              </span>
            </div>
          </div>

          {/* Tige verticale + chevron */}
          <div className="flex flex-col items-center">
            <div
              className="mt-3 h-6 w-[2px] rounded-full"
              style={{ background: 'linear-gradient(to bottom, rgba(218,162,80,0), #DAA250)' }}
            />
            <ChevronDown size={20} className="-mt-1" style={{ color: colors.gold }} />
            <p
              className="mt-2 max-w-2xl text-center text-[13px] font-medium leading-6"
              style={{ color: colors.muted }}
            >
              CIPA reconnecte vos opérations, vos équipes et vos données.{' '}
              <span className="font-bold" style={{ color: colors.text }}>
                Trois pouvoirs pour reprendre le contrôle.
              </span>
            </p>
          </div>

          {/* Branche desktop qui se déploie vers les 3 cartes */}
          <div className="relative mx-auto mt-3 hidden h-8 max-w-5xl lg:block">
            <div
              className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2"
              style={{ background: 'rgba(218,162,80,.7)' }}
            />
            <div
              className="absolute left-[16.66%] right-[16.66%] top-4 h-[2px]"
              style={{
                background:
                  'linear-gradient(to right, rgba(218,162,80,.25), #DAA250, rgba(218,162,80,.25))',
              }}
            />
            {[16.66, 50, 83.34].map((left, i) => (
              <div
                key={i}
                className="absolute top-4 flex flex-col items-center"
                style={{ left: `${left}%`, transform: 'translateX(-50%)' }}
              >
                <div className="h-4 w-[2px]" style={{ background: 'rgba(218,162,80,.7)' }} />
                <div
                  className="-mt-[3px] h-2 w-2 rotate-45 border-b-2 border-r-2"
                  style={{ borderColor: '#DAA250' }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ================= PILLARS / CARDS — les 3 pouvoirs (#6) ================= */}
        <div className="mt-4 grid gap-5 lg:mt-3 lg:grid-cols-3 lg:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className="relative overflow-hidden rounded-[24px] border p-5 text-center lg:p-6"
              style={{
                background: 'rgba(255,255,255,.9)',
                borderColor: 'rgba(0,0,0,.06)',
                boxShadow: '0 25px 70px rgba(0,0,0,.08)',
              }}
            >
              {/* Liseré gold haut de carte (continuité de la flèche) */}
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(218,162,80,.7), transparent)',
                }}
              />

              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,.05)' }}
              >
                <pillar.icon size={22} style={{ color: pillar.iconColor }} />
              </div>

              <span
                className="mt-3 inline-block text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: colors.gold }}
              >
                Pouvoir 0{i + 1}
              </span>

              <h3 className="mt-1.5 text-xl font-black" style={{ color: colors.text }}>
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
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
                background: '#0A0A0A',
                color: '#DAA250',
                border: '1px solid rgba(218,162,80,.5)',
                boxShadow: '0 20px 60px rgba(0,0,0,.18)',
              }}
            >
              <div className="absolute inset-0 bg-[#DAA250] opacity-0 transition duration-500 group-hover:opacity-100" />

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