import clsx from 'clsx'
import type { ReactNode } from 'react'

import Section from '@/components/ui/Section'

/**
 * Section majeure composee de plusieurs blocs.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI REGROUPER
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Une page de rubrique avait sept a onze sections, chacune avec son fond, son
 * padding de 128 px et son repere ARIA. Le lecteur y voyait une succession de
 * bandes de meme poids : rien ne disait laquelle portait l'argument et
 * laquelle le completait. Et le clavier comme le lecteur d'ecran devaient
 * traverser onze regions pour une page qui en raconte quatre.
 *
 * Les blocs sont donc regroupes en quatre sections majeures — ouverture,
 * reponse, chiffres, questions — et c'est ce composant qui ouvre la section :
 * il pose le fond, le rythme et le repere une seule fois. Les blocs qu'il
 * contient sont rendus en `nested`, c'est-a-dire sans <section> ni gouttiere
 * a eux. La troisieme section fait exception : `MetricsShowcase` y ouvre son
 * propre aplat sombre, qu'un hote clair effacerait.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LES TITRES RESTENT EN <h2>
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Les blocs regroupes gardent leur <h2> ; on ne les descend pas en <h3>. Ce
 * serait le reflexe, mais leurs items internes sont deja des <h3> : les
 * decaler tous d'un cran demanderait des <h4>, et la page gagnerait un niveau
 * de profondeur pour ne rien dire de plus.
 *
 * La section est donc nommee par le titre de son premier bloc — d'ou
 * `labelledBy`, qui doit reprendre l'`id` de ce <h2>. Plusieurs <h2> dans une
 * region est valide et se parcourt bien : la liste des titres reste le plan
 * de la page, la liste des reperes en devient le sommaire.
 *
 * Pas de 'use client' : aucun etat, comme `Section`.
 */

/** Respiration entre deux blocs d'une meme section. */
const GAP = {
  /** Deux blocs distincts qui se suivent. */
  default: 'space-y-20 lg:space-y-28',
  /** Un bloc et son complement immediat — un visuel et sa legende chiffree. */
  tight: 'space-y-14 lg:space-y-20',
} as const

export default function SectionStack({
  background = 'cream',
  variant,
  gap = 'default',
  id,
  labelledBy,
  className,
  children,
}: {
  background?: 'cream' | 'white'
  variant?: 'default' | 'dense'
  gap?: keyof typeof GAP
  id?: string
  /**
   * `id` du <h2> (ou du <h1>) qui ouvre la section. Sans nom accessible, une
   * <section> n'est pas annoncee comme un repere et la page se parcourt comme
   * un bloc unique.
   */
  labelledBy: string
  className?: string
  children: ReactNode
}) {
  return (
    <Section
      background={background}
      variant={variant}
      id={id}
      labelledBy={labelledBy}
      className={className}
    >
      <div className={clsx(GAP[gap])}>{children}</div>
    </Section>
  )
}
