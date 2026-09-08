import clsx from 'clsx'

import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { SolutionContent } from '@/content/types'
import { cardSurface } from '@/lib/surface'

/**
 * Grille de cartes courtes : une icone, un titre, une ligne.
 *
 * Troisieme facon de rendre un `SolutionContent`, apres la liste annotee de
 * `CapabilityList` et les cartes cliquables de `ModuleGrid`. Elles ne sont pas
 * interchangeables :
 *
 *   `CapabilityList`  des arguments, qui se lisent de haut en bas.
 *   `ModuleGrid`      des destinations, qui se cliquent.
 *   `CardGrid`        un inventaire, que l'oeil balaie pour y trouver son cas.
 *
 * C'est cette derniere lecture que sert ce composant : un lecteur qui cherche
 * « est-ce que mon type d'audit est couvert ? » balaie cinq cases, il ne lit
 * pas cinq paragraphes.
 *
 * Aucun effet de survol, contrairement a `ModuleGrid` : rien n'est cliquable
 * ici, et un fond ou une bordure qui reagit au passage de la souris promet une
 * interaction qui n'existe pas.
 *
 * Le champ `points` d'une `Capability` est ignore : ces cartes sont courtes
 * par definition, et la place manque.
 */
export default function CardGrid({
  eyebrow,
  title,
  accent,
  subtitle,
  items,
  background = 'white',
  nested = false,
  id = 'cards-title',
}: SolutionContent & { background?: 'cream' | 'white'; nested?: boolean; id?: string }) {
  return (
    <Section background={background} nested={nested} labelledBy={id}>
      <RevealGroup>
        <BlockHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
