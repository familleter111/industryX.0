import clsx from 'clsx'
import Image from 'next/image'

import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { BlockImage, ProblemContent } from '@/content/types'
import { cardSurface } from '@/lib/surface'

/**
 * Les constats terrain en deux colonnes : l'intention et une illustration a
 * gauche, les constats en cartes a droite.
 *
 * Deuxieme facon de rendre un `ProblemContent`, a cote de `PainPoints`. Celui-
 * ci numerote ses constats dans une liste annotee pleine largeur ; celui-la
 * les pose en cartes et leur adjoint une image. Le choix n'est pas cosmetique :
 * la liste numerotee se lit comme un enchainement — un fait, puis un autre, qui
 * s'accumulent — tandis que les cartes se lisent comme un inventaire dont on
 * balaie les entrees. Sur une page dont les constats sont independants les uns
 * des autres, l'inventaire est plus juste.
 *
 * L'image est a gauche avec le titre, pas entre les cartes : posee au milieu de
 * la grille, elle couperait la lecture en deux au moment ou elle doit se
 * poursuivre.
 *
 * Reste une <ol> malgre les cartes. La synthese vocale annonce « liste de 3 » —
 * c'est bien ce que la mise en forme dit, et une grille de <div> ne le dirait
 * pas.
 */
export default function ProblemShowcase({
  title,
  accent,
  subtitle,
  items,
  image,
  eyebrow = 'Sur le terrain',
  background = 'white',
  nested = false,
}: ProblemContent & {
  /** Illustration sous le titre. Sans elle, la colonne s'arrete au texte. */
  image?: BlockImage
  background?: 'cream' | 'white'
  nested?: boolean
}) {
  return (
    <Section background={background} nested={nested} labelledBy="problem-title">
      <RevealGroup className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
        {/* Pas de `sticky` sur cette colonne. `Section` est en
            `overflow-hidden` — il lui faut, pour ses couches de fond — et le
            groupe d'animation qui porte la grille est transforme : les deux
            changent le conteneur de reference d'un element colle, qui se
            retrouve simplement pousse de la valeur de son `top` sans jamais
            coller. Mesure faite : 112 px de decalage, en haut de page comme au
            defilement. */}
        <div>
          <BlockHeading
            id="problem-title"
            eyebrow={eyebrow}
            title={title}
            accent={accent}
            subtitle={subtitle}
          />

          {image && (
            <RevealItem variant="in" className="mt-10">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 460px, 100vw"
                className="h-auto w-full rounded-2xl"
              />
            </RevealItem>
          )}
        </div>

        <ol
          className={clsx(
            'grid gap-4',
            // Trois cartes sur deux colonnes laissent un trou a la derniere
            // ligne, et ce trou se lit comme un bloc manquant. Les comptes
            // impairs restent donc en colonne unique.
            items.length % 2 === 0 && 'sm:grid-cols-2',
          )}
        >
          {items.map((item) => (
            <RevealItem
              key={item.title}
              as="li"
              className={clsx(
                'flex h-full flex-col rounded-2xl border border-cream-border p-6',
                cardSurface(background),
              )}
            >
              {item.icon && <IconTile icon={item.icon} className="mb-5" />}

              <h3 className="text-[17px] font-semibold leading-[1.35] text-gray-900">
                {item.title}
              </h3>

              <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>
    </Section>
  )
}
