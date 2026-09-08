import Image from 'next/image'
import type { ReactNode } from 'react'

import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import type { ShotContent } from '@/content/types'

/**
 * Capture produit, dans son cadre, avec sa legende.
 *
 * Tant que `src` n'est pas fourni, on rend une maquette schematique plutot
 * qu'un rectangle gris ou une icone d'image cassee : meme parti pris que
 * `AppScreenPlaceholder`, cote desktop. Le visiteur voit une intention de
 * mise en page, pas un asset manquant.
 *
 * <figure> et <figcaption> et non deux <div> : la legende dit ce que l'ecran
 * montre, elle appartient a l'image. Sans cette liaison, elle flotte comme un
 * paragraphe orphelin dans la lecture lineaire.
 *
 * Le cadre est purement decoratif (`aria-hidden`) : c'est l'attribut `alt` de
 * la capture, ou la legende en son absence, qui porte l'information.
 *
 * Trois contenus possibles, dans cet ordre de priorite : une maquette passee
 * en `children`, une vraie capture si `src` est fourni, la silhouette sinon.
 * Le cadre, la legende et le chrome de fenetre sont les memes dans les trois
 * cas — c'est tout l'interet de ne pas avoir ecrit un second composant pour
 * la maquette du tableau de bord.
 */
export default function ProductShot({
  caption,
  image,
  background = 'white',
  nested = false,
  children,
}: ShotContent & {
  background?: 'cream' | 'white'
  /** Rendu dans une section deja ouverte par la page. Voir `SectionStack`. */
  nested?: boolean
  /** Maquette rendue dans le cadre. Doit etre `aria-hidden` : `caption` la decrit. */
  children?: ReactNode
}) {
  return (
    <Section background={background} nested={nested} variant="dense">
      <Reveal variant="in" className="mx-auto max-w-5xl">
        <figure>
          <div className="overflow-hidden rounded-2xl border border-cream-border bg-white">
            {/* Chrome de fenetre : trois pastilles et une barre d'adresse
                muette. Il situe la capture sans rien affirmer. */}
            <div
              aria-hidden
              className="flex items-center gap-2 border-b border-cream-border bg-stone-50 px-4 py-3"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              <span className="ml-3 h-4 w-40 rounded-full bg-stone-200 sm:w-64" />
            </div>

            {children ?? (image ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            ) : (
              <ShotSkeleton />
            ))}
          </div>

          <figcaption className="mt-4 text-[14px] leading-[1.6] text-subtle">
            {caption}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  )
}

/**
 * Silhouette d'un ecran CIPA : rail de navigation, en-tete, trois tuiles
 * d'indicateurs, une liste. Aucune valeur lisible, aucun libelle : une
 * maquette qui affiche des chiffres inventes finit toujours par etre prise
 * pour une capture reelle.
 */
function ShotSkeleton() {
  return (
    <div aria-hidden className="flex aspect-[16/10] bg-cream">
      {/* rail lateral */}
      <div className="hidden w-14 shrink-0 flex-col items-center gap-3 border-r border-cream-border bg-white py-5 sm:flex">
        <span className="h-7 w-7 rounded-lg bg-gold/25" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-7 w-7 rounded-lg bg-stone-100" />
        ))}
      </div>

      <div className="flex-1 p-4 sm:p-6">
        {/* en-tete */}
        <div className="flex items-center justify-between">
          <span className="block h-3 w-28 rounded-full bg-stone-300 sm:w-40" />
          <span className="block h-7 w-20 rounded-full bg-dark/80" />
        </div>

        {/* tuiles d'indicateurs */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-cream-border bg-white p-3"
            >
              <span className="block h-2 w-10 rounded-full bg-stone-200" />
              <span className="mt-2 block h-5 w-14 rounded bg-stone-300" />
            </div>
          ))}
        </div>

        {/* liste */}
        <div className="mt-4 overflow-hidden rounded-xl border border-cream-border bg-white">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 border-b border-cream-border px-3 py-3 last:border-b-0"
            >
              <span className="h-6 w-6 shrink-0 rounded-md bg-stone-100" />
              <span
                className="block h-2 rounded-full bg-stone-200"
                style={{ width: `${52 - i * 8}%` }}
              />
              <span className="ml-auto h-4 w-12 rounded-full bg-green-500/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
