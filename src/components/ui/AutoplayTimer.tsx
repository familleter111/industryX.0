'use client'

/**
 * Minuterie visible d'un défilement automatique : une barre qui se remplit
 * de gauche à droite, puis appelle `onDone` (passer à l'élément suivant).
 *
 * C'est l'animation CSS elle-même qui compte le temps : la mettre en pause
 * (`paused`, au survol, au focus ou hors écran) arrête aussi le défilement,
 * et le visiteur voit combien de temps il reste. Pour repartir de zéro, le
 * parent change la `key` du composant.
 *
 * Sous `prefers-reduced-motion: reduce`, rien n'est rendu : pas de
 * défilement automatique, les contrôles manuels restent.
 */

import { useReducedMotion } from 'framer-motion'

export default function AutoplayTimer({
  duration,
  paused,
  onDone,
  className = '',
}: {
  /** Durée d'affichage d'un élément, en millisecondes. */
  duration: number
  paused: boolean
  onDone: () => void
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <span
      aria-hidden="true"
      onAnimationEnd={onDone}
      className={`pointer-events-none block origin-left animate-autoplay ${className}`}
      style={{ animationDuration: `${duration}ms`, animationPlayState: paused ? 'paused' : 'running' }}
    />
  )
}
