'use client'

import { Link } from '@/i18n/navigation'
import { useState } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
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
import { useMotion } from '@/hooks/useMotion'
import Section from '@/components/ui/Section'
import { SECTORS, sectorHref, type Sector } from '@/lib/data/sectors'
import { useCopy, useCurrentLocale } from '@/lib/i18n'
import { ROUTES } from '@/lib/routes'

const colors = {
  gold: tokens.color.gold.DEFAULT,
  lime: tokens.color.accent.lime,
  green: tokens.color.accent.green,
  bronze: tokens.color.gold[700],
  text: 'rgb(17 17 17)',
  muted: 'rgba(17,17,17,.65)',
}

const PILLAR_STYLES = [
  { icon: Database, iconColor: colors.gold },
  { icon: Workflow, iconColor: colors.green },
  { icon: Activity, iconColor: colors.bronze },
]

/*
 * Cartes secteurs — déplacées depuis le Hero (#2). Liste, noms, liens et
 * pictogrammes viennent de lib/data/sectors.ts, comme la FAQ et le pied de
 * page : chaque carte mène à la page de son secteur.
 */

const COPY = {
  fr: {
    pillars: [
      ['Structurer', 'Centralisez audits, inspections et données terrain dans un référentiel unique afin de créer une visibilité claire et exploitable.'],
      ['Orchestrer', 'Coordonnez qualité, production et workflows critiques à travers une plateforme fluide pensée pour les opérations modernes.'],
      ['Piloter', 'Transformez les données terrain en décisions rapides grâce à une intelligence opérationnelle en temps réel.'],
    ],
    title: 'La plateforme qui transforme',
    titleEnd: 'vos opérations industrielles.',
    subtitle: 'La réponse à vos opérations déconnectées.',
    bridge: 'CIPA reconnecte vos opérations, vos équipes et vos données.',
    bridgeStrong: 'Trois pouvoirs pour reprendre le contrôle.',
    sectorsTitle: 'Conçu pour vos secteurs industriels',
    sectorsLead: 'CIPA s’adapte aux exigences réglementaires et opérationnelles de chaque secteur.',
    cta: 'Demander une démo',
    close: 'Fermer',
  },
  en: {
    pillars: [
      ['Structure', 'Bring audits, inspections and shop-floor data together in a single repository for clear, usable visibility.'],
      ['Orchestrate', 'Coordinate quality, production and critical workflows on a seamless platform built for modern operations.'],
      ['Drive', 'Turn shop-floor data into fast decisions with real-time operational intelligence.'],
    ],
    title: 'The platform that transforms',
    titleEnd: 'your industrial operations.',
    subtitle: 'The answer to disconnected operations.',
    bridge: 'CIPA reconnects your operations, your teams and your data.',
    bridgeStrong: 'Three capabilities to take back control.',
    sectorsTitle: 'Built for your industry',
    sectorsLead: 'CIPA adapts to the regulatory and operational requirements of each industry.',
    cta: 'Book a demo',
    close: 'Close',
  },
}

function SectorLogoCard({ sector, label }: { sector: Sector; label: string }) {
  const Icon = sector.icon
  const card = (
    <figure className="flex w-full flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-shadow duration-base ease-smooth hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
        {sector.gridImage ? (
          <>
            {/* `loading="lazy"` : sans lui, React précharge d'office chaque
                <img> du HTML serveur (<link rel="preload"> dans le <head>), et
                ces icônes, loin sous la ligne de flottaison, partaient avec
                l'image du hero. 40 x 40 px affichés : pas de next/image pour
                3 Ko. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sector.gridImage}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </>
        ) : (
          // Pas encore d'illustration (TODO dans lib/data/sectors.ts) : le
          // pictogramme du menu Industries.
          <Icon aria-hidden="true" className="h-8 w-8 text-gold-ink" strokeWidth={1.6} />
        )}
      </div>
      {/* Le nom du secteur est ecrit, pas cache derriere un survol : une
          rangee d'icones muettes se lit comme une barre d'outils. */}
      <figcaption className="w-full hyphens-auto text-center text-sm font-semibold leading-tight text-stone-600">
        {label}
      </figcaption>
    </figure>
  )
  // Le pictogramme reste `alt=""` : la légende nomme déjà le secteur, et
  // c'est elle qui donne son nom au lien.
  return (
    <Link
      href={sectorHref(sector.slug)}
      className="block w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  )
}

export default function CipaSection() {
  const m = useMotion()
  const t = useCopy(COPY)
  const locale = useCurrentLocale()
  const [open, setOpen] = useState(false)
  const pillars = PILLAR_STYLES.map((style, i) => ({
    ...style,
    title: t.pillars[i][0],
    description: t.pillars[i][1],
  }))

  return (
    <Section
      // Cible du bouton « Voir la plateforme » du hero : `scroll-mt`
      // compense la barre de navigation fixe (82 px).
      className="font-inter scroll-mt-[82px]"
      variant="default"
      background="cream"
      id="solutions"
      innerClassName="lg:px-10"
      backdrop={
        <AnimatedMeshBackground
          gradient="linear-gradient(180deg, rgb(255 255 255) 0%, rgb(246 247 244) 100%)"
          gridColor="rgba(0,0,0,.1)"
          orbs={[
            { color: 'rgba(218,162,80,.10)', size: 600, position: { left: '-96px', top: '-96px' }, duration: 10, parallax: 35 },
            { color: 'rgba(199,255,58,.07)', size: 600, position: { right: '-96px', bottom: '-96px' }, duration: 12, parallax: 45 },
            { color: 'rgba(63,174,90,.06)', size: 420, position: { left: 'calc(50% - 210px)', top: '33%' }, duration: 8, parallax: 25 },
          ]}
        />
      }
    >
      {/* ================= BACKGROUND — mesh animé avec parallax léger ================= */}

        
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
                className="h-auto w-[160px] lg:w-[190px]"
              />
            </div>

            <h2
              className="mt-3 text-3xl lg:text-5xl font-extrabold leading-[1.05] tracking-[-0.04em]"
              style={{ color: colors.text }}
            >
              {t.title}{' '}
              <span
                className="block mt-1"
              >
                {t.titleEnd}
              </span>
            </h2>

            <div className="mx-auto mt-3 max-w-3xl">
              <p
                className="text-base lg:text-lg font-semibold leading-7 text-stone-600"
              >
                {t.subtitle}
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
            className="mx-auto max-w-2xl text-center text-sm font-medium leading-6"
            style={{ color: colors.muted }}
          >
            {t.bridge}{' '}
            <span className="font-bold" style={{ color: colors.text }}>
              {t.bridgeStrong}
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
        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-6">
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
                className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-[14px] font-black text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
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
          className="mx-auto mt-8 max-w-6xl"
        >
          <div className="mb-3 text-center">
            <h4
              className="mb-1 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: colors.gold }}
            >
              {t.sectorsTitle}
            </h4>
            <p className="mx-auto max-w-md text-sm" style={{ color: colors.muted }}>
              {t.sectorsLead}
            </p>
          </div>

          {/* Deux colonnes sur mobile : les legendes restent a 14 px sans se
              casser au milieu des mots. */}
          <div className="grid grid-cols-2 items-start justify-items-center gap-x-3 gap-y-5 py-1 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {SECTORS.map((sector) => (
              <SectorLogoCard key={sector.slug} sector={sector} label={sector.name[locale]} />
            ))}
          </div>
        </motion.div>

        {/* ================= CTA — rayonnement gold (#8) ================= */}
        <div className="mt-6 flex justify-center">
          <div className="relative">
            <Link
              href={ROUTES.demo}
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
                {t.cta}
              </span>

              <ArrowRight className="relative z-10 transition group-hover:translate-x-1 group-hover:text-black" />
            </Link>
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
              aria-label={t.close}
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
    </Section>
  )
}