'use client'

import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { viewport } from '@/lib/motion'

type CountUpProps = {
  /** Valeur finale, toujours positive : le signe passe par `prefix`. */
  to: number
  /** Nombre de decimales. 1 pour « 2,5 ». */
  decimals?: number
  /** « + », « - »… */
  prefix?: string
  /** « % », « x »… */
  suffix?: string
  /** Duree en millisecondes. */
  duration?: number
  className?: string
}

/**
 * Compteur qui s'incremente a l'entree dans le viewport, une seule fois.
 *
 * Deux spans, et c'est volontaire :
 *
 *  - un span visible, `aria-hidden`, dont le contenu change 60 fois par
 *    seconde. Le faire lire par une synthese vocale produirait un bafouillage
 *    de chiffres.
 *  - un span `sr-only` qui porte la valeur finale, presente des le rendu
 *    serveur. C'est elle que lisent les lecteurs d'ecran et les robots
 *    d'indexation.
 *
 * Le span visible est lui aussi rendu a sa valeur finale cote serveur : sans
 * JavaScript, le chiffre reste juste. Il n'est remis a zero qu'a l'instant ou
 * l'animation demarre.
 *
 * L'incrementation ecrit directement dans le DOM plutot que de passer par un
 * etat React : soixante rendus par seconde et par compteur pour afficher du
 * texte seraient du gaspillage.
 */
export default function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1200,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, viewport)
  const reduce = useReducedMotion()
  const value = useMotionValue(0)

  const format = (n: number) =>
    prefix +
    new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n) +
    suffix

  const final = format(to)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // Mouvement reduit : la valeur finale est deja affichee, on n'y touche pas.
    if (reduce || !inView) return

    node.textContent = format(0)
    const unsubscribe = value.on('change', (v) => {
      node.textContent = format(v)
    })
    const controls = animate(value, to, {
      duration: duration / 1000,
      ease: 'easeOut',
      onComplete: () => {
        node.textContent = final
      },
    })
    return () => {
      controls.stop()
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to, duration])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  )
}
