import { CLIENT_LOGOS } from '@/lib/data/clientLogos'
import { PARTNERS, PARTNER_BRANCHES } from '@/lib/data/partnerLogos'
import { tokens } from '@/lib/tokens'

/**
 * Geometrie et contenu de l'orbite des partenaires.
 *
 * Tout est exprime dans un repere carre de `VIEW` unites, sans unite CSS : le
 * rendu convertit en pourcentages, donc le dessin se met a l'echelle sans
 * qu'aucune valeur n'ait a etre recalculee.
 */

/** Côté du repère de travail. */
export const VIEW = 620
/** Centre du repère. */
export const C = VIEW / 2

/** Diamètre du noyau — la marque. */
export const CORE_SIZE = 150
/** Agrandissement d'une pastille au survol (miroir de `hover:scale-[1.06]`). */
export const HOVER_SCALE = 1.06

const GOLD = tokens.color.gold.DEFAULT
const GREEN = 'rgb(34 197 94)' // green-500

/** Cercle de repère à mi-chemin entre les deux anneaux. */
export const GUIDE_RADIUS = 205

export type Ring = {
  radius: number
  /** Diamètre des pastilles, en unités du repère. */
  chip: number
  /** Boîte d'inscription du logo à l'intérieur de la pastille. */
  box: { w: number; h: number }
  /** Rayon de départ des tirets radiaux qui relient l'anneau au reste. */
  spokeFrom: number
  /** Durée d'un tour complet. */
  /**
   * Duree d'un tour. Reglee a 90 s sur les deux anneaux, conformement a la
   * specification. Elles valaient auparavant 74 s et 104 s, ce qui les
   * desynchronisait ; y revenir suffit a retrouver ce comportement.
   */
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
export const RINGS: Ring[] = [
  {
    radius: 147,
    chip: 86,
    box: { w: 57, h: 30 },
    spokeFrom: CORE_SIZE / 2 + 3,
    duration: '90s',
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
    duration: '90s',
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

export const STATS = [
  { value: `${PARTNERS.length}`, label: 'Partenaires' },
  { value: `${CLIENT_LOGOS.length}`, label: 'Clients accompagnés' },
  { value: `${PARTNER_BRANCHES.length}`, label: 'Domaines d’expertise' },
]
