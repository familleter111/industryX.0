/**
 * Fonctionnalités d'animation de Framer Motion, chargées à part par
 * LazyMotion (components/layout/MotionProvider) une fois la page affichée.
 *
 * `domAnimation` couvre tout ce que le site utilise : animations, variantes,
 * sorties (AnimatePresence), survol, appui, focus et entrée dans le viewport
 * (`whileInView`). Il n'inclut pas les animations de mise en page (`layout`,
 * `layoutId`) ni le glisser (`drag`) : les ajouter demanderait `domMax`.
 */
import { domAnimation } from 'framer-motion'

export default domAnimation
