'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * `prefers-reduced-motion` pour toutes les animations Framer Motion du site,
 * y compris celles qui n'utilisent pas `useMotion` : sous ce reglage, les
 * deplacements et changements d'echelle sont supprimes (l'opacite seule
 * subsiste). Les animations CSS, elles, sont coupees par globals.css.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
