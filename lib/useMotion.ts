'use client'

import { useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

import {
  STATIC,
  STATIC_LINE,
  STATIC_CONTAINER,
  fadeIn,
  fadeUp,
  scaleIn,
  scaleX,
  drawLine,
  staggerContainer,
  viewport,
} from './motion'

/**
 * Renvoie les variants partagés, déjà résolus selon la préférence de
 * mouvement de l'utilisateur.
 *
 * Sous `prefers-reduced-motion: reduce`, tout est remplacé par des variants
 * neutres : opacity 1, y 0, duration 0. Les animations sont supprimées, pas
 * raccourcies — une animation deux fois plus rapide reste une animation.
 *
 * La règle CSS globale de globals.css ne suffit pas : Framer Motion pilote
 * ses transitions en JavaScript et n'est pas concerné par
 * `animation-duration` ni `transition-duration`.
 */
export function useMotion() {
  const reduce = useReducedMotion() ?? false

  return {
    reduce,
    viewport,
    fadeUp: reduce ? STATIC : fadeUp,
    fadeIn: reduce ? STATIC : fadeIn,
    scaleIn: reduce ? STATIC : scaleIn,
    scaleX: reduce ? STATIC : scaleX,
    drawLine: reduce ? STATIC_LINE : drawLine,
    stagger: (stagger?: number, delayChildren?: number): Variants =>
      reduce ? STATIC_CONTAINER : staggerContainer(stagger, delayChildren),
  }
}
