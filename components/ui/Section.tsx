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

/**
 * Degagement de la navbar, qui est `fixed` et couvre donc le haut du document.
 * A poser sur la premiere section de la page — celle qui contient le hero — et
 * nulle part ailleurs.
 */
export const NAVBAR_CLEARANCE = 'pt-28 sm:pt-32 lg:pt-36'

type SectionProps = {
  /** `default` 128/80/64 px, `dense` 96/64/48 px (desktop/tablette/mobile). */
  variant?: 'default' | 'dense'
  background?: 'cream' | 'white' | 'dark'
  /**
   * Le bloc est pose dans une section deja ouverte par la page. Il ne rend
   * alors ni <section>, ni fond, ni padding vertical, ni conteneur a largeur
   * limitee — tout cela appartient a la section hote. Sans ce mode, fusionner
   * deux blocs empilerait deux reperes ARIA, deux fonds et deux gouttieres
   * horizontales. Voir `SectionStack`.
   *
   * `background` reste renseigne et reste utile : il ne peint plus rien, mais
   * il dit au bloc sur quelle surface il atterrit. Une carte blanche posee sur
   * une section blanche disparait — c'est de `background` que ces blocs-la
   * tirent leur remplissage.
   */
  nested?: boolean
  id?: string
  /**
   * `id` du titre qui nomme la section. Une <section> sans nom accessible
   * n'est pas annoncee comme une region : elle disparait de la liste des
   * reperes, et la page se parcourt alors comme un bloc unique.
   */
  labelledBy?: string
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
  nested = false,
  id,
  labelledBy,
  className,
  innerClassName,
  backdrop,
  bleed,
  children,
}: SectionProps) {
  // Imbrique : la section hote a deja pose le fond, le rythme vertical et la
  // gouttiere. Il ne reste que le contexte de positionnement, pour les
  // couches absolues eventuelles.
  if (nested) {
    return (
      <div id={id} className={clsx('relative', className)}>
        {backdrop}
        {children}
        {bleed}
      </div>
    )
  }

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
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
