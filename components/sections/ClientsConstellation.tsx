'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { CLIENT_LOGOS, type ClientLogo } from '@/lib/data/clientLogos'
import { logoFrameWidth } from '@/lib/data/logoSizing'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'

/* ============================================================
   CONSTELLATION CLIENTS

   Les 21 clients disposés en réseau autour de la marque, reliés par un maillage
   de traits fins. Tout est décrit dans un repère 1200×940 converti en
   pourcentages du conteneur (`aspect-[1200/940]`), donc dessin et logos
   partagent une seule échelle à toutes les largeurs.

   LISIBILITÉ — les deux problèmes à tenir :

   1. Les traits ne doivent pas passer sur les logos. Chaque arête est rognée
      à l’intersection des zones franches de ses deux extrémités : le maillage
      s’arrête proprement au bord de chaque logo.

   2. Les fichiers ont des proportions très différentes (un wordmark fin contre
      un écusson carré). `logoFrameWidth` les inscrit dans une même boîte de
      168×90, ce qui égalise la taille perçue — un carré fait 90 de côté, un
      wordmark 168 de large. C'est le rapport qu'on lit sur la maquette.

   Sous `md`, le schéma est remplacé par une grille : à 400 px de large, un
   wordmark tomberait à 50 px et ne serait plus lisible.
   ============================================================ */

const VIEW_W = 1200
const VIEW_H = 940

const SECTION_BG = 'rgb(245 245 244)' // stone-100
const GOLD = tokens.color.gold.DEFAULT

/** Boîte d'inscription commune, en unités du repère. */
const BOX = { w: 168, h: 90 }

/** Noyau : la marque. */
const HUB = { x: VIEW_W / 2, y: VIEW_H / 2, r: 105 }

type NodeSpec = { alt: string; x: number; y: number }

/**
 * Position de chaque client. L'ordre reprend la maquette : les groupes
 * agroalimentaires en haut, la pharma à gauche, l'industrie et les services
 * en bas à droite.
 */
const NODES: NodeSpec[] = [
  { alt: 'Opella', x: 328, y: 77 },
  { alt: 'Rose Blanche Group', x: 658, y: 66 },
  { alt: 'BEM', x: 994, y: 91 },
  { alt: 'Kilani Groupe', x: 159, y: 214 },
  {
    alt: 'Ministère de la Santé Publique — République Tunisienne',
    x: 443,
    y: 219,
  },
  { alt: 'Warda', x: 649, y: 219 },
  { alt: 'Diari', x: 829, y: 238 },
  { alt: 'Spiga', x: 1047, y: 257 },
  { alt: 'Saiph', x: 274, y: 407 },
  { alt: 'Medpack', x: 810, y: 361 },
  { alt: 'IDEA Consult', x: 1035, y: 407 },
  { alt: 'Médis', x: 272, y: 583 },
  { alt: 'SACI', x: 574, y: 638 },
  { alt: 'Mon Bijou', x: 808, y: 567 },
  { alt: 'Rieker', x: 976, y: 573 },
  { alt: 'Municipalité', x: 600, y: 736 },
  { alt: 'Neapolis Pharma', x: 107, y: 717 },
  { alt: 'Polyroto Group', x: 1008, y: 715 },
  { alt: 'La Soie', x: 312, y: 819 },
  { alt: 'AR Assur', x: 613, y: 854 },
  { alt: 'TCH Industries', x: 976, y: 838 },
]

/** Étiquettes des trois axes, posées sur le maillage comme sur la maquette. */
const AXIS_LABELS = [
  { label: 'Qualité', x: 95, y: 517 },
  { label: 'Production', x: 845, y: 488 },
  { label: 'Performance', x: 800, y: 739 },
]

/** Points dorés du maillage — les carrefours du réseau. */
const GOLD_DOTS = [
  { x: 300, y: 265 },
  { x: 905, y: 315 },
  { x: 30, y: 517 },
  { x: 782, y: 488 },
  { x: 737, y: 739 },
  { x: 480, y: 300 },
]

/** Points gris — les nœuds secondaires, plus discrets. */
const GREY_DOTS = [
  { x: 500, y: 140 },
  { x: 900, y: 160 },
  { x: 205, y: 320 },
  { x: 760, y: 470 },
  { x: 410, y: 640 },
  { x: 880, y: 640 },
  { x: 460, y: 760 },
  { x: 1080, y: 560 },
]

/** Maillage : chaque paire relie deux nœuds (`hub` désigne la marque). */
const EDGES: [string, string][] = [
  ['Opella', 'Rose Blanche Group'],
  ['Rose Blanche Group', 'BEM'],
  ['Opella', 'Kilani Groupe'],
  ['Kilani Groupe', 'Saiph'],
  ['Kilani Groupe', 'Ministère de la Santé Publique — République Tunisienne'],
  ['Rose Blanche Group', 'Ministère de la Santé Publique — République Tunisienne'],
  ['Rose Blanche Group', 'Warda'],
  ['Warda', 'Diari'],
  ['Diari', 'Spiga'],
  ['BEM', 'Spiga'],
  ['BEM', 'IDEA Consult'],
  ['Spiga', 'IDEA Consult'],
  ['Diari', 'Medpack'],
  ['Medpack', 'IDEA Consult'],
  ['IDEA Consult', 'Rieker'],
  ['Medpack', 'hub'],
  ['Warda', 'hub'],
  ['Ministère de la Santé Publique — République Tunisienne', 'hub'],
  ['Saiph', 'hub'],
  ['Saiph', 'Médis'],
  ['Médis', 'Neapolis Pharma'],
  ['Médis', 'hub'],
  ['hub', 'SACI'],
  ['hub', 'Mon Bijou'],
  ['SACI', 'Municipalité'],
  ['Municipalité', 'AR Assur'],
  ['AR Assur', 'La Soie'],
  ['La Soie', 'Médis'],
  ['Neapolis Pharma', 'La Soie'],
  ['SACI', 'Mon Bijou'],
  ['Mon Bijou', 'Rieker'],
  ['Rieker', 'Polyroto Group'],
  ['Polyroto Group', 'TCH Industries'],
  ['TCH Industries', 'AR Assur'],
  ['Mon Bijou', 'Polyroto Group'],
]

/* ---------- résolution des positions ---------- */

const pctX = (value: number) => `${(value / VIEW_W) * 100}%`
const pctY = (value: number) => `${(value / VIEW_H) * 100}%`

const POINTS: Record<string, { x: number; y: number }> = {
  hub: { x: HUB.x, y: HUB.y },
  ...Object.fromEntries(NODES.map((node) => [node.alt, { x: node.x, y: node.y }])),
}

const findLogo = (alt: string): ClientLogo | undefined =>
  CLIENT_LOGOS.find((logo) => logo.alt === alt)

/**
 * Dimensions du contenu visible d'un logo, en unités du repère. Sert à la fois
 * à poser l'image et à calculer la zone franche autour d'elle.
 */
function contentSize(logo: ClientLogo) {
  const frame = logoFrameWidth(logo, BOX.w, BOX.h)
  return {
    frame,
    width: frame * logo.contentWidth,
    height: frame * logo.contentHeight,
  }
}

/** Marge laissée entre un logo et le trait qui le rejoint. */
const CLEARANCE = { x: 13, y: 10 }

/**
 * Zone franche autour d'un nœud : une ellipse pour un logo, un cercle pour le
 * noyau. Les traits s'arrêtent à sa frontière.
 */
function clearZone(key: string): { rx: number; ry: number } | null {
  if (key === 'hub') return { rx: HUB.r + 10, ry: HUB.r + 10 }

  const logo = findLogo(key)
  if (!logo) return null

  const { width, height } = contentSize(logo)
  return { rx: width / 2 + CLEARANCE.x, ry: height / 2 + CLEARANCE.y }
}

/**
 * Trait rogné à ses deux extrémités.
 *
 * La version précédente traçait le segment en entier puis posait par-dessus une
 * ellipse remplie de la couleur du fond, ce qui masquait le trait sous chaque
 * logo. Le rognage est plus robuste : il ne dépend pas de la couleur du fond,
 * donc il survivrait à un fond texturé ou dégradé. On calcule l’intersection
 * du segment avec chaque zone franche et on ne trace que ce qui reste entre.
 *
 * Pour une ellipse centrée sur A, le point du segment à distance paramétrique t
 * vérifie (t·dx/rx)² + (t·dy/ry)² = 1, d'où t = 1/√((dx/rx)² + (dy/ry)²).
 *
 * Si les deux zones se recouvrent (logos très proches), il ne reste rien à
 * tracer et le trait est simplement omis.
 */
function trimmedEdge(from: string, to: string) {
  const a = POINTS[from]
  const b = POINTS[to]
  const zoneA = clearZone(from)
  const zoneB = clearZone(to)
  if (!a || !b || !zoneA || !zoneB) return null

  const dx = b.x - a.x
  const dy = b.y - a.y

  const scale = (zone: { rx: number; ry: number }) =>
    Math.hypot(dx / zone.rx, dy / zone.ry)

  const startScale = scale(zoneA)
  const endScale = scale(zoneB)
  if (startScale === 0 || endScale === 0) return null

  const tStart = 1 / startScale
  const tEnd = 1 - 1 / endScale
  if (tEnd - tStart < 0.02) return null

  return {
    x1: a.x + dx * tStart,
    y1: a.y + dy * tStart,
    x2: a.x + dx * tEnd,
    y2: a.y + dy * tEnd,
  }
}

/* ============================================================
   SCHÉMA
   ============================================================ */

function ConstellationCanvas() {
  const m = useMotion()
  return (
    <div className="relative mx-auto aspect-[1200/940] w-full">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* 1. maillage — chaque trait est rogné aux abords de ses deux logos */}
        <g>
          {EDGES.map(([from, to]) => {
            const segment = trimmedEdge(from, to)
            if (!segment) return null

            return (
              <motion.line
                key={`${from}->${to}`}
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke={tokens.color.dark.DEFAULT}
                strokeOpacity="0.16"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={m.viewport}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
            )
          })}
        </g>

        {/* 2. carrefours du réseau */}
        <g>
          {GREY_DOTS.map((dot) => (
            <circle
              key={`grey-${dot.x}-${dot.y}`}
              cx={dot.x}
              cy={dot.y}
              r="4"
              fill={tokens.color.dark.DEFAULT}
              fillOpacity="0.16"
            />
          ))}

          {GOLD_DOTS.map((dot) => (
            <g key={`gold-${dot.x}-${dot.y}`}>
              <circle cx={dot.x} cy={dot.y} r="9" fill="none" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1.4" />
              <circle cx={dot.x} cy={dot.y} r="3.5" fill={GOLD} />
            </g>
          ))}
        </g>
      </svg>

      {/* 4. logos clients */}
      {NODES.map((node, index) => {
        const logo = findLogo(node.alt)
        if (!logo) return null

        const { frame } = contentSize(logo)

        return (
          <div
            key={node.alt}
            style={{
              left: pctX(node.x),
              top: pctY(node.y),
              width: pctX(frame),
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              variants={m.scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={m.viewport}
              className="transition-transform duration-500 hover:scale-[1.08]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={512}
                height={512}
                sizes="(min-width: 1280px) 180px, 15vw"
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </div>
        )
      })}

      {/* 5. étiquettes d'axes */}
      {AXIS_LABELS.map((axis) => (
        <span
          key={axis.label}
          style={{ left: pctX(axis.x), top: pctY(axis.y) }}
          className="absolute -translate-y-1/2 whitespace-nowrap text-[clamp(9px,1.05vw,13px)] font-semibold text-gold-ink"
        >
          {axis.label}
        </span>
      ))}

      {/* 6. noyau

          Le recentrage et l'animation sont sur deux éléments distincts : un
          `motion.div` écrit un `transform` inline qui écraserait le
          `-translate-x-1/2 -translate-y-1/2` des classes, et le noyau se
          retrouverait ancré par son coin supérieur gauche — décalé d'un
          demi-diamètre, à cheval sur SACI et Mon Bijou. */}
      <div
        style={{
          left: pctX(HUB.x),
          top: pctY(HUB.y),
          width: pctX(HUB.r * 2),
        }}
        className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          variants={m.scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_26px_70px_rgba(15,23,42,0.16)] ring-[1.5px] ring-gold/45"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[7%] rounded-full ring-1 ring-gold/15"
          />

          <Image
            src="/logo.png"
            alt="Industry X.0"
            width={8625}
            height={3202}
            className="h-auto w-[74%] object-contain"
          />
        </motion.div>
      </div>
    </div>
  )
}

/* ============================================================
   REPLI MOBILE

   Sous md, le schéma serait illisible : à 400 px de large, un wordmark tombe
   à 50 px. La grille reprend les mêmes logos, inscrits dans la même boîte
   relative, et n'en omet aucun.
   ============================================================ */

function LogoGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={logo.src}
          className="flex h-[104px] items-center justify-center overflow-hidden rounded-[20px] border border-cream-border bg-white px-2 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={512}
            height={512}
            sizes="200px"
            style={{ width: logoFrameWidth(logo, 96, 48) }}
            className="h-auto max-w-full shrink-0 object-contain"
          />
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   SECTION
   ============================================================ */

export default function ClientsConstellation() {
  const m = useMotion()
  return (
    <section
      className="overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ background: SECTION_BG }}
    >
      {/* Conteneur élargi à 1800 px : les deux compartiments étant à parts
          égales, c'est la largeur du conteneur qui commande la taille du
          schéma. */}
      <div className="mx-auto max-w-[1800px] px-5 sm:px-7 lg:px-8">
        {/* Deux compartiments de même taille à partir de xl. En dessous, le
            schéma prend toute la largeur — c'est ce qui garde les logos
            lisibles sur les écrans intermédiaires. */}
        <div className="grid gap-10 xl:grid-cols-2 xl:items-center xl:gap-12">
          <motion.div
            variants={m.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={m.viewport}
            className="xl:max-w-[780px]"
          >
            <span className="block h-[4px] w-24 rounded-full bg-gold" />

            <p className="mt-6 text-[11.5px] font-bold uppercase tracking-[0.22em] text-gold-ink sm:text-[14px]">
              Ils nous font confiance
            </p>

            <h2 className="mt-5 font-display text-[38px] font-black leading-[1.04] tracking-[-0.04em] text-gray-900 sm:text-[56px] xl:text-[68px] 2xl:text-[76px]">
              Des industriels qui transforment leurs opérations avec{' '}
              Industry X.0
            </h2>

            <p className="mt-6 max-w-2xl text-pretty text-[16px] leading-[1.7] text-stone-600 sm:text-[18px] xl:text-[19px]">
              De la pharma à l’agroalimentaire,{' '}
              <span className="font-semibold text-stone-800">CIPA</span> connecte
              les équipes, structure les données terrain et accélère
              l’amélioration continue.
            </p>
          </motion.div>

          {/* Le schéma est inchangé, simplement décalé vers la droite dans son
              compartiment. Le décalage est sans risque : les logos les plus
              extérieurs laissent déjà 7 % de marge à droite du repère. */}
          <div className="hidden md:block xl:translate-x-8">
            <ConstellationCanvas />
          </div>

          <div className="md:hidden">
            <LogoGrid />
          </div>
        </div>
      </div>
    </section>
  )
}
