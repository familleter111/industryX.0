import clsx from 'clsx'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { Cta, SolutionContent } from '@/content/types'
import { cardSurface } from '@/lib/surface'

/**
 * Les capacites en deux colonnes : l'intention a gauche, les cartes a droite.
 *
 * Troisieme facon de rendre un `SolutionContent`, apres la liste annotee de
 * `CapabilityList` et la grille pleine largeur de `CardGrid`. Elle sert quand
 * le bloc porte six entrees ou plus : en pleine largeur, six cartes forment un
 * pave que l'oeil traverse sans s'arreter, et le titre qui les annonce a
 * disparu du champ avant la troisieme. Adosse a la colonne de gauche, il reste
 * dans le champ pendant une bonne partie du balayage.
 *
 * Le CTA est optionnel et vit ici, sous le titre, plutot qu'apres les cartes :
 * a la fin d'une grille de six, il se lit comme une septieme carte.
 */
export default function CapabilityShowcase({
  eyebrow,
  title,
  accent,
  subtitle,
  items,
  cta,
  background = 'cream',
  nested = false,
  id = 'solution-title',
}: SolutionContent & {
  /** Bouton pose sous le titre. Omis, la colonne de gauche s'arrete au texte. */
  cta?: Cta
  background?: 'cream' | 'white'
  nested?: boolean
  id?: string
}) {
  return (
    <Section background={background} nested={nested} labelledBy={id}>
      <RevealGroup className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
        {/* Pas de `sticky` sur cette colonne. `Section` est en
            `overflow-hidden` — il lui faut, pour ses couches de fond — et le
            groupe d'animation qui porte la grille est transforme : les deux
            changent le conteneur de reference d'un element colle, qui se
            retrouve simplement pousse de la valeur de son `top` sans jamais
            coller. Mesure faite : 112 px de decalage, en haut de page comme au
            defilement. */}
        <div>
          <BlockHeading
            id={id}
            eyebrow={eyebrow}
            title={title}
            accent={accent}
            subtitle={subtitle}
          />

          {cta && (
            <RevealItem className="mt-8">
              <Link
                href={cta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-dark px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-base ease-smooth hover:bg-black"
              >
                {cta.label}
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden
                  className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
                />
              </Link>
            </RevealItem>
          )}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <RevealItem
              key={item.title}
              as="li"
              className={clsx(
                'flex h-full flex-col rounded-2xl border border-cream-border p-6',
                cardSurface(background),
              )}
            >
              <IconTile icon={item.icon} />

              <h3 className="mt-5 text-[17px] font-semibold leading-[1.35] text-gray-900">
                {item.title}
              </h3>

              <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </ul>
      </RevealGroup>
    </Section>
  )
}
