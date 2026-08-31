import { C, RINGS, VIEW, type Ring } from '@/lib/data/orbit'
import { PARTNERS } from '@/lib/data/partnerLogos'
import type { LogoAsset } from '@/lib/data/logoSizing'

/**
 * Calculs de position de l'orbite. Fonctions pures : elles ne dependent que
 * de leurs arguments et de la geometrie declaree dans lib/data/orbit.
 */


export const pct = (value: number) => `${(value / VIEW) * 100}%`

export const nodePosition = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180
  return { x: C + radius * Math.sin(rad), y: C - radius * Math.cos(rad) }
}

/** Angles occupés par les logos d'un anneau. */
export const ringAngles = (ring: Ring) =>
  ring.alts.map((_, index) => ring.offset + (index * 360) / ring.alts.length)

/** Seuls les partenaires gravitent — les clients ont leur propre page. */
export function resolveLogo(alt: string): LogoAsset | undefined {
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
