'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { useMotion } from '@/lib/useMotion'

/**
 * Frontiere client minimale pour les entrees au scroll.
 *
 * Marquer 'use client' sur une section entiere fait basculer tout son
 * sous-arbre cote client : le texte, les listes, les images, tout part dans
 * le bundle JavaScript alors que rien de tout cela n'a besoin d'interagir.
 * Ici seul le conteneur anime est client. Les enfants sont rendus sur le
 * serveur et passes en `children` : ils traversent la frontiere sous forme
 * d'elements React deja resolus, sans emporter leur code.
 *
 * A n'utiliser que pour une entree. Des qu'il y a un etat, un survol ou une
 * valeur derivee du scroll, le composant concerne doit etre client lui-meme.
 */

type RevealVariant = 'up' | 'in' | 'scale'

/**
 * `view` declenche a l'entree dans le viewport, `mount` des le montage. Un
 * bloc situe au-dessus de la ligne de flottaison n'a pas de raison d'attendre
 * un evenement de scroll qui n'arrivera peut-etre jamais.
 */
type RevealTrigger = 'view' | 'mount'

const triggerProps = (trigger: RevealTrigger, vp: { once: boolean }) =>
  trigger === 'mount'
    ? ({ initial: 'hidden', animate: 'visible' } as const)
    : ({ initial: 'hidden', whileInView: 'visible', viewport: vp } as const)

function useVariant(variant: RevealVariant) {
  const m = useMotion()
  if (variant === 'in') return { v: m.fadeIn, m }
  if (variant === 'scale') return { v: m.scaleIn, m }
  return { v: m.fadeUp, m }
}

export default function Reveal({
  variant = 'up',
  trigger = 'view',
  className,
  children,
}: {
  variant?: RevealVariant
  trigger?: RevealTrigger
  className?: string
  children: ReactNode
}) {
  const { v, m } = useVariant(variant)
  return (
    <motion.div
      variants={v}
      {...triggerProps(trigger, m.viewport)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Conteneur qui orchestre l'entree de ses enfants. Un seul declencheur pour
 * tout le groupe : les `RevealItem` qu'il contient ne declarent que leurs
 * variants et heritent de son etat.
 */
export function RevealGroup({
  stagger,
  trigger = 'view',
  className,
  children,
}: {
  stagger?: number
  trigger?: RevealTrigger
  className?: string
  children: ReactNode
}) {
  const m = useMotion()
  return (
    <motion.div
      variants={m.stagger(stagger)}
      {...triggerProps(trigger, m.viewport)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Enfant d'un `RevealGroup`. Ne se declenche pas seul. */
export function RevealItem({
  variant = 'up',
  className,
  children,
}: {
  variant?: RevealVariant
  className?: string
  children: ReactNode
}) {
  const { v } = useVariant(variant)
  return (
    <motion.div variants={v} className={className}>
      {children}
    </motion.div>
  )
}
