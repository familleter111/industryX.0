/**
 * Source unique de vérité du mouvement.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  RÈGLE DE FRONTIÈRE — quel système pour quelle animation
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  CSS / keyframes Tailwind
 *    Boucles autonomes qui tournent sans jamais consulter React : marquee,
 *    orbites, flottements d'ambiance, halos qui respirent, curseurs qui
 *    clignotent. Elles n'ont ni état, ni dépendance au scroll, ni
 *    interaction. Le compositeur les exécute hors du fil principal ; les
 *    confier à Framer Motion revient à payer une boucle requestAnimationFrame
 *    permanente pour un résultat identique.
 *
 *  Framer Motion
 *    Tout ce qui dépend de quelque chose : entrée au scroll (`whileInView`),
 *    état React, survol, montage et démontage (`AnimatePresence`), valeurs
 *    dérivées du scroll (`useScroll` / `useTransform`).
 *
 *  Le test : « cette animation a-t-elle besoin de savoir quoi que ce soit ? »
 *  Si la réponse est non, elle appartient au CSS.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  RÈGLES DE MOUVEMENT
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  - `opacity` et `transform` uniquement. Jamais height, width, top, left,
 *    margin, filter ni box-shadow : ces propriétés déclenchent un layout ou
 *    un repaint à chaque image.
 *  - Translation d'entrée plafonnée à `tokens.shift` (24 px).
 *  - Aucun rebond, aucune rotation à l'entrée, aucun flou animé.
 *  - `once: true` partout : rien ne se rejoue au scroll inverse.
 *  - `delay` global à 0. Le décalage entre éléments passe par le stagger,
 *    jamais par un delay posé à la main.
 *
 *  Toute exception doit être argumentée en commentaire à l'endroit précis
 *  où elle est faite.
 */

import type { Variants } from 'framer-motion'
import { tokens } from './tokens'

/** Courbe d'entrée unique du site. */
export const EASE = tokens.ease.out as unknown as [number, number, number, number]

/** Réglage unique du déclenchement au scroll. À utiliser PARTOUT. */
export const viewport = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -15% 0px',
} as const

const enter = { duration: tokens.duration.base, ease: EASE }

/** Entrée par défaut : monte de 24 px en apparaissant. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: tokens.shift },
  visible: { opacity: 1, y: 0, transition: enter },
}

/** Entrée sans déplacement, pour ce qui ne doit pas bouger. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enter },
}

/** Entrée par l'échelle. Jamais de rebond : 0.96 → 1, et on s'arrête. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: enter },
}

/**
 * Trait qui se deploie. Remplace les animations de `width`, qui declenchent
 * un layout a chaque image : scaleX est composite et gratuit. L'element doit
 * porter sa largeur finale en classe et une `origin-*` explicite.
 */
export const scaleX: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: enter },
}

/** Conteneur qui décale l'entrée de ses enfants. */
export const staggerContainer = (
  stagger: number = tokens.stagger,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

/* ── Variants neutres, servis quand l'utilisateur préfère moins de mouvement.
      Les animations sont désactivées, pas accélérées : l'état final est posé
      d'emblée, sans transition. ─────────────────────────────────────────── */

export const STATIC: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
}

export const STATIC_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
}
