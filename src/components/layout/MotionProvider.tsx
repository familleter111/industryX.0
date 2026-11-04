'use client'

import { LazyMotion, MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/** Chargées dans un chunk séparé, après le JavaScript initial de la page. */
const loadFeatures = () => import('@/lib/motion-features').then((mod) => mod.default)

/**
 * Deux réglages pour toutes les animations Framer Motion du site.
 *
 * `LazyMotion` : les composants importent `m` (renommé `motion` à l'import,
 * `import { m as motion } from 'framer-motion'`), une version allégée dont
 * les fonctionnalités d'animation arrivent par `loadFeatures`. Le moteur
 * complet quittait le JavaScript initial de chaque page (131 Ko minifiés sur
 * l'accueil). `strict` fait échouer tout `motion` complet importé par erreur.
 *
 * `MotionConfig` : `prefers-reduced-motion` respecté, y compris par les
 * animations qui n'utilisent pas `useMotion` : sous ce réglage, les
 * déplacements et changements d'échelle sont supprimés (l'opacité seule
 * subsiste). Les animations CSS, elles, sont coupées par globals.css.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
