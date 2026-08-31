'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { logoFrameWidth, type LogoAsset } from '@/lib/data/logoSizing'
import { PARTNERS } from '@/lib/data/partnerLogos'
import { C, CORE_SIZE, GUIDE_RADIUS, RINGS, VIEW, type Ring } from '@/lib/data/orbit'
import { nodePosition, pct, resolveLogo, ringAngles } from '@/lib/orbit-geometry'
import { EASE } from '@/lib/motion'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'

const GOLD = tokens.color.gold.DEFAULT
const GREEN = 'rgb(34 197 94)' // green-500

function OrbitChip({ logo, ring }: { logo: LogoAsset; ring: Ring }) {
  const frame = logoFrameWidth(logo, ring.box.w, ring.box.h)

  return (
    <div
      // Focusable pour que l'infobulle apparaisse aussi au clavier. Le nom du
      // partenaire reste par ailleurs porte par l'alt de l'image, donc lu par
      // les lecteurs d'ecran sans dependre du survol.
      tabIndex={0}
      className="group/chip relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] ring-1 ring-dark/[0.05] transition-[transform,box-shadow] duration-slow ease-smooth hover:scale-[1.06] hover:shadow-[0_16px_38px_rgba(15,23,42,0.15)] hover:ring-gold/40 focus-visible:scale-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-dark px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-fast group-hover/chip:opacity-100 group-focus-visible/chip:opacity-100"
      >
        {logo.alt}
      </span>
      <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={512}
        height={512}
        style={{ width: `${(frame / ring.chip) * 100}%` }}
        className="h-auto shrink-0 object-contain"
      />
      </span>
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

function OrbitRing({ ring }: { ring: Ring }) {
  const m = useMotion()
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
              <motion.div variants={m.scaleIn} className="h-full w-full">
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
  const m = useMotion()
  return (
    <div
      style={{ width: pct(CORE_SIZE), height: pct(CORE_SIZE) }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        variants={m.scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={m.viewport}
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


/* ============================================================
   REPLI MOBILE

   Sous 768 px l'orbite n'a plus la place d'exister : les pastilles se
   chevaucheraient et la rotation ferait sortir des logos du cadre. On sert
   alors une grille statique, sans rotation ni contre-rotation.
   ============================================================ */

function PartnersGrid() {
  const m = useMotion()
  return (
    <motion.ul
      variants={m.stagger(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={m.viewport}
      className="mx-auto grid max-w-[340px] grid-cols-2 gap-4 md:hidden"
    >
      {PARTNERS.map((partner) => (
        <motion.li
          key={partner.alt}
          variants={m.scaleIn}
          className="flex aspect-[3/2] items-center justify-center rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.07)] ring-1 ring-dark/[0.05]"
        >
          <Image
            src={partner.src}
            alt={partner.alt}
            width={512}
            height={512}
            style={{ width: logoFrameWidth(partner, 92, 42) }}
            className="h-auto max-w-full object-contain"
          />
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default function OrbitCanvas() {
  const m = useMotion()
  const [inner, outer] = RINGS

  return (
    <>
      <PartnersGrid />

      {/* Un seul declencheur pour tout le dessin, et un stagger de 60 ms qui
          part du noyau vers l'exterieur : l'ordre de RINGS va du plus petit
          rayon au plus grand. */}
      <motion.div
        variants={m.stagger(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={m.viewport}
        className="group/orbit relative mx-auto hidden aspect-square w-full max-w-[440px] sm:max-w-[560px] md:block lg:max-w-[680px]"
      >
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbitPath" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.55" />
            <stop offset="50%" stopColor={tokens.color.dark.DEFAULT} stopOpacity="0.12" />
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
          variants={m.fadeIn}
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
          viewport={m.viewport}
          // EXCEPTION — pathLength n'est pas une transformation, mais c'est la
          // seule facon de tracer un chemin SVG. Aucun layout n'est declenche.
          transition={{ duration: tokens.duration.slow, ease: EASE }}
        />

        {/* repère à mi-distance */}
        <motion.circle
          cx={C}
          cy={C}
          r={GUIDE_RADIUS}
          fill="none"
          stroke={tokens.color.dark.DEFAULT}
          strokeOpacity="0.09"
          strokeWidth="1"
          strokeDasharray="2 9"
          variants={m.fadeIn}
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
          variants={m.fadeIn}
        />
      </svg>

      {RINGS.map((ring) => (
        <OrbitRing key={ring.radius} ring={ring} />
      ))}

      <OrbitCore />
      </motion.div>
    </>
  )
}
