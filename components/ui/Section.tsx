import clsx from 'clsx'
import type { ReactNode } from 'react'

/**
 * Rythme vertical de la page. Un seul endroit decide de la respiration entre
 * deux sections, de la largeur du contenu et du fond.
 *
 * Deux regles tenues ici :
 *
 *  - Padding uniquement, jamais de margin verticale. Deux marges adjacentes
 *    fusionnent (margin collapsing) et la valeur qui survit n'est pas celle
 *    qu'on croit : l'espacement devient impossible a raisonner.
 *  - Aucune hauteur minimale. Une section epouse son contenu. `min-h-screen`
 *    sur une section de rythme la fige a la hauteur du viewport et distribue
 *    le surplus en vide autour du contenu : le meme code produit alors
 *    250 px de blanc sur un ecran de 900 px et 600 px sur un ecran de 1300.
 *
 * Pas de 'use client' : ce composant n'a aucun etat.
 */

type SectionProps = {
  /** `default` 128/80/64 px, `dense` 96/64/48 px (desktop/tablette/mobile). */
  variant?: 'default' | 'dense'
  background?: 'cream' | 'white' | 'dark'
  id?: string
  /** Classes ajoutees a l'element <section>, jamais un padding vertical. */
  className?: string
  /** Classes ajoutees au conteneur interne (largeur, alignement). */
  innerClassName?: string
  /**
   * Couche de fond absolue (mesh anime, degrade), rendue derriere le contenu
   * et hors du conteneur a largeur limitee.
   */
  backdrop?: ReactNode
  /**
   * Contenu qui doit occuper toute la largeur, hors du conteneur limite :
   * bandeaux defilants, frises, separateurs. Rendu apres les enfants.
   */
  bleed?: ReactNode
  children: ReactNode
}

const PADDING = {
  // spacing.section = 6rem, spacing.section-lg = 8rem, definis dans les tokens.
  default: 'py-16 md:py-20 lg:py-section-lg',
  dense: 'py-12 md:py-16 lg:py-section',
} as const

const BACKGROUND = {
  cream: 'bg-cream text-dark',
  white: 'bg-white text-dark',
  dark: 'bg-dark text-white',
} as const

export default function Section({
  variant = 'default',
  background = 'cream',
  id,
  className,
  innerClassName,
  backdrop,
  bleed,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        'relative overflow-hidden',
        PADDING[variant],
        BACKGROUND[background],
        className,
      )}
    >
      {backdrop}
      <div
        className={clsx(
          'relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12',
          innerClassName,
        )}
      >
        {children}
      </div>
      {bleed}
    </section>
  )
}
