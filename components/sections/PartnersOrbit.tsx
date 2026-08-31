'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { logoFrameWidth, type LogoAsset } from '@/lib/data/logoSizing'
import { CLIENT_LOGOS } from '@/lib/data/clientLogos'
import { PARTNERS, PARTNER_BRANCHES } from '@/lib/data/partnerLogos'

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

const SECTION_BG = '#FAFAF9'

/** Côté du repère de travail. */
const VIEW = 620
/** Centre du repère. */
const C = VIEW / 2

/** Diamètre du noyau — la marque. */
const CORE_SIZE = 150
/** Agrandissement d'une pastille au survol (miroir de `hover:scale-[1.09]`). */
const HOVER_SCALE = 1.09

const GOLD = '#DAA250'
const GREEN = '#22C55E'

/** Cercle de repère à mi-chemin entre les deux anneaux. */
const GUIDE_RADIUS = 205

type Ring = {
  radius: number
  /** Diamètre des pastilles, en unités du repère. */
  chip: number
  /** Boîte d'inscription du logo à l'intérieur de la pastille. */
  box: { w: number; h: number }
  /** Rayon de départ des tirets radiaux qui relient l'anneau au reste. */
  spokeFrom: number
  /** Durée d'un tour complet. */
  duration: string
  /** Sens horaire ou anti-horaire. */
  clockwise: boolean
  /** Angle du premier logo, en degrés depuis midi. */
  offset: number
  alts: string[]
  dots: { angle: number; color: string; size: number }[]
}

/**
 * Sept partenaires, rien d'autre : l'anneau intérieur porte le socle
 * technologique et les cabinets de conseil, l'anneau extérieur les
 * institutions et structures d'accompagnement.
 *
 * RÈGLE DE NON-CHEVAUCHEMENT. Les deux anneaux tournent à des vitesses
 * différentes : n'importe quelle pastille intérieure finit donc par passer
 * sous n'importe quelle pastille extérieure. Il faut que les couronnes
 * qu'elles balaient ne se touchent jamais, survol compris.
 *
 *   CORE_SIZE/2                        <  r(int) - chip(int)/2 * HOVER_SCALE
 *   r(int) + chip(int)/2 * HOVER_SCALE <  r(ext) - chip(ext)/2 * HOVER_SCALE
 *   r(ext) + chip(ext)/2 * HOVER_SCALE <  VIEW/2
 *
 * Les rayons ci-dessous poussent les trois marges à leur maximum tout en les
 * gardant égales : 25,1 | 23,4 | 3,3 unités. Toute modification de rayon ou de
 * diamètre doit repasser ces trois inégalités.
 */
const RINGS: Ring[] = [
  {
    radius: 147,
    chip: 86,
    box: { w: 57, h: 30 },
    spokeFrom: CORE_SIZE / 2 + 3,
    duration: '74s',
    clockwise: false,
    offset: 45,
    alts: ['Microsoft', 'Amazon Web Services', 'EY', 'Deloitte'],
    dots: [
      { angle: 0, color: GOLD, size: 8 },
      { angle: 90, color: GREEN, size: 6 },
      { angle: 180, color: GOLD, size: 6 },
      { angle: 270, color: GOLD, size: 8 },
    ],
  },
  {
    radius: 262,
    chip: 82,
    box: { w: 55, h: 28 },
    spokeFrom: GUIDE_RADIUS,
    duration: '104s',
    clockwise: true,
    offset: 30,
    alts: ['GIZ', 'THE DOT', 'Novation City'],
    // Six points répartis entre les trois logos : l'anneau extérieur est peu
    // peuplé, ils lui rendent sa continuité.
    dots: [
      { angle: 60, color: GOLD, size: 5 },
      { angle: 90, color: GREEN, size: 7 },
      { angle: 180, color: GOLD, size: 5 },
      { angle: 210, color: GOLD, size: 7 },
      { angle: 300, color: GREEN, size: 5 },
      { angle: 330, color: GOLD, size: 7 },
    ],
  },
]

/* ---------- utilitaires de repère ---------- */

const pct = (value: number) => `${(value / VIEW) * 100}%`

const nodePosition = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180
  return { x: C + radius * Math.sin(rad), y: C - radius * Math.cos(rad) }
}

/** Angles occupés par les logos d'un anneau. */
const ringAngles = (ring: Ring) =>
  ring.alts.map((_, index) => ring.offset + (index * 360) / ring.alts.length)

/** Seuls les partenaires gravitent — les clients ont leur propre page. */
function resolveLogo(alt: string): LogoAsset | undefined {
  return PARTNERS.find((partner) => partner.alt === alt)
}

/* ============================================================
   PASTILLE PARTENAIRE

   Volontairement discrète : filet gris très clair, ombre légère. C'est ce qui
   permet au noyau — cerclé d'or et bien plus massif — de se lire d'emblée
   comme la marque, et non comme un partenaire parmi les autres.

   Le logo est inscrit dans `box` par `logoFrameWidth`, ce qui neutralise les
   marges propres à chaque fichier et égalise les tailles perçues.
   ============================================================ */

function OrbitChip({ logo, ring }: { logo: LogoAsset; ring: Ring }) {
  const frame = logoFrameWidth(logo, ring.box.w, ring.box.h)

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#0C0D12]/[0.05] shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-[transform,box-shadow] duration-500 hover:scale-[1.09] hover:shadow-[0_16px_38px_rgba(15,23,42,0.15)] hover:ring-gold/40">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={512}
        height={512}
        style={{ width: `${(frame / ring.chip) * 100}%` }}
        className="h-auto shrink-0 object-contain"
      />
    </div>
  )
}

/* ============================================================
   ANNEAU

   Deux couches imbriquées : le groupe tourne, chaque pastille contre-tourne à
   la même vitesse. Les logos restent donc à l'endroit pendant que l'anneau
   défile. Les deux animations portent la même durée en style inline — c'est
   ce qui garantit qu'elles se compensent exactement.

   Les tirets radiaux et les points font partie du groupe tournant : ils
   accompagnent les logos, ce qui donne au dessin sa lecture de schéma.
   ============================================================ */

function RingSpokes({ ring }: { ring: Ring }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {ringAngles(ring).map((angle) => {
        const from = nodePosition(angle, ring.spokeFrom)
        const to = nodePosition(angle, ring.radius - ring.chip / 2 - 4)

        return (
          <line
            key={angle}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={GOLD}
            strokeOpacity="0.4"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

function OrbitRing({ ring, delay }: { ring: Ring; delay: number }) {
  const spin = ring.clockwise ? 'animate-orbit' : 'animate-orbit-reverse'
  const counterSpin = ring.clockwise ? 'animate-orbit-reverse' : 'animate-orbit'
  const spinClasses = `motion-reduce:animate-none group-hover/orbit:[animation-play-state:paused]`

  return (
    <div
      style={{ animationDuration: ring.duration }}
      className={`absolute inset-0 ${spin} ${spinClasses}`}
    >
      <RingSpokes ring={ring} />

      {/* points de liaison — ils gravitent avec l'anneau */}
      {ring.dots.map((dot) => {
        const { x, y } = nodePosition(dot.angle, ring.radius)
        return (
          <span
            key={`${ring.radius}-${dot.angle}`}
            style={{
              left: pct(x),
              top: pct(y),
              width: pct(dot.size),
              height: pct(dot.size),
              background: dot.color,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
        )
      })}

      {ringAngles(ring).map((angle, index) => {
        const logo = resolveLogo(ring.alts[index])
        if (!logo) return null

        const { x, y } = nodePosition(angle, ring.radius)

        return (
          /* 1. position : le transform est réservé au recentrage */
          <div
            key={logo.alt}
            style={{
              left: pct(x),
              top: pct(y),
              width: pct(ring.chip),
              height: pct(ring.chip),
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            {/* 2. contre-rotation : le logo reste à l'endroit */}
            <div
              style={{ animationDuration: ring.duration }}
              className={`h-full w-full ${counterSpin} ${spinClasses}`}
            >
              {/* 3. apparition au scroll */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.5,
                  delay: delay + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full w-full"
              >
                <OrbitChip logo={logo} ring={ring} />
              </motion.div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================
   NOYAU — la marque, distincte des partenaires

   Trois écarts la séparent des pastilles : un diamètre presque double, un
   cerclage doré (les partenaires n'ont qu'un filet gris), et un double liseré
   intérieur. Elle ne tourne pas et ne se survole pas : c'est le point fixe
   autour duquel tout le reste gravite.
   ============================================================ */

function OrbitCore() {
  return (
    <div
      style={{ width: pct(CORE_SIZE), height: pct(CORE_SIZE) }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.86 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_26px_70px_rgba(15,23,42,0.16)] ring-[1.5px] ring-gold/45"
      >
        <span className="pointer-events-none absolute inset-[7%] rounded-full ring-1 ring-gold/15" />

        <Image
          src="/logo.png"
          alt="Industry X.0"
          width={8625}
          height={3202}
          className="h-auto w-[74%] object-contain"
        />
      </motion.div>
    </div>
  )
}

/* ============================================================
   SCÈNE COMPLÈTE

   La couche fixe porte quatre cercles : l'auréole du noyau, les deux
   trajectoires, et un repère à mi-distance qui empêche le grand vide entre
   les anneaux. C'est ce qui donne au tout sa lecture de schéma plutôt que de
   simple guirlande de logos.
   ============================================================ */

function OrbitCanvas() {
  const [inner, outer] = RINGS

  return (
    <div className="group/orbit relative mx-auto aspect-square w-full max-w-[440px] sm:max-w-[560px] lg:max-w-[680px]">
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbitPath" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.55" />
            <stop offset="50%" stopColor="#0C0D12" stopOpacity="0.12" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* auréole du noyau */}
        <motion.circle
          cx={C}
          cy={C}
          r={CORE_SIZE / 2 + 13}
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.18"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
        />

        {/* trajectoire intérieure */}
        <motion.circle
          cx={C}
          cy={C}
          r={inner.radius}
          fill="none"
          stroke="url(#orbitPath)"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.15 }}
        />

        {/* repère à mi-distance */}
        <motion.circle
          cx={C}
          cy={C}
          r={GUIDE_RADIUS}
          fill="none"
          stroke="#0C0D12"
          strokeOpacity="0.09"
          strokeWidth="1"
          strokeDasharray="2 9"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.55 }}
        />

        {/* trajectoire extérieure */}
        <motion.circle
          cx={C}
          cy={C}
          r={outer.radius}
          fill="none"
          stroke="url(#orbitPath)"
          strokeWidth="1.2"
          strokeDasharray="3 8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.45 }}
        />
      </svg>

      {RINGS.map((ring, index) => (
        <OrbitRing key={ring.radius} ring={ring} delay={0.45 + index * 0.25} />
      ))}

      <OrbitCore />
    </div>
  )
}

/* ============================================================
   CHIFFRES

   Tous dérivés des tableaux de logos : impossible qu'ils divergent de ce que
   la page affiche réellement.
   ============================================================ */

const STATS = [
  { value: `${PARTNERS.length}`, label: 'Partenaires' },
  { value: `${CLIENT_LOGOS.length}`, label: 'Clients accompagnés' },
  { value: `${PARTNER_BRANCHES.length}`, label: 'Domaines d’expertise' },
]

function Stats() {
  return (
    <div className="mt-10 flex flex-wrap items-start gap-x-10 gap-y-6 sm:mt-12 sm:gap-x-14">
      {STATS.map((stat) => (
        <div key={stat.label}>
          <p className="font-display text-[26px] font-black leading-none tracking-[-0.03em] text-[#111827] sm:text-[30px]">
            {stat.value}
          </p>
          <p className="mt-2 text-[12px] font-medium text-[#78716C] sm:text-[12.5px]">
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
    <div className="mt-14 grid gap-9 border-t border-[#0C0D12]/[0.07] pt-10 sm:mt-16 sm:grid-cols-3 sm:gap-10">
      {PARTNER_BRANCHES.map((branch) => (
        <div key={branch.key}>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#C08A2E]">
            {branch.label}
          </p>

          <p className="mt-2.5 text-[13px] leading-[1.65] text-[#78716C]">
            {branch.desc}
          </p>

          <ul className="mt-4 space-y-2.5">
            {branch.partners.map((partner) => (
              <li key={partner.src} className="flex items-baseline gap-2.5">
                <span className="mt-[1px] h-[5px] w-[5px] shrink-0 rounded-full bg-gold" />
                <span>
                  <span className="text-[13.5px] font-semibold text-[#292524]">
                    {partner.alt}
                  </span>
                  <span className="ml-2 text-[12.5px] text-[#A8A29E]">
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
  const isHome = variant === 'home'

  const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      style={{ background: SECTION_BG }}
    >
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
        {isHome ? (
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-12">
            {/* DISCOURS */}
            <motion.div {...reveal}>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/[0.09] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#B6842B] ring-1 ring-gold/20 sm:text-[10.5px]">
                <span className="h-[5px] w-[5px] rounded-full bg-gold" />
                Nos partenaires
              </span>

              <h2 className="mt-6 font-display text-[30px] font-black leading-[1.08] tracking-[-0.035em] text-[#111827] sm:text-[40px] lg:text-[46px]">
                Des partenaires
                <br />
                qui <span className="text-gold">avancent</span>
                <br />
                avec nous
              </h2>

              <p className="mt-6 max-w-[30rem] text-pretty text-[14.5px] leading-[1.75] text-[#57534E] sm:text-[15.5px]">
                CIPA s’entoure de partenaires technologiques, de cabinets de
                conseil et d’institutions pour construire ensemble l’industrie
                de demain. Une synergie de compétences au service de vos
                opérations.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/partners"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-bold text-[#0C0D12] shadow-[0_14px_34px_rgba(218,162,80,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-gold-400"
                >
                  Découvrir nos partenaires
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#0C0D12]/15 px-6 py-3.5 text-[14px] font-bold text-[#1C1917] transition-all duration-300 hover:border-[#0C0D12]/35 hover:bg-white"
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
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C08A2E] sm:text-[11.5px]">
                  L’écosystème
                </span>
                <span className="h-px w-10 bg-gold/55 sm:w-16" />
              </div>

              <h2 className="mt-6 font-display text-[30px] font-black leading-[1.1] tracking-[-0.035em] text-[#111827] sm:text-[42px] lg:text-[48px]">
                Trois familles de partenaires,
                <br />
                <span className="text-gold">une seule plateforme</span>
              </h2>

              <p className="mt-6 max-w-2xl text-pretty text-[14.5px] leading-[1.75] text-[#57534E] sm:text-[16px]">
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
      </div>
    </section>
  )
}
