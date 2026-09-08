import clsx from 'clsx'
import Image from 'next/image'

import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { ProblemContent } from '@/content/types'
import { cardSurface } from '@/lib/surface'

/**
 * Les constats terrain en deux colonnes : l'intention et une illustration a
 * gauche, les constats a droite.
 *
 * Deuxieme facon de rendre un `ProblemContent`, a cote de `PainPoints`. Celui-
 * ci occupe la pleine largeur ; celui-la adosse les constats a une colonne qui
 * porte le titre et une image.
 *
 * L'image est a gauche avec le titre, pas entre les constats : posee au milieu,
 * elle couperait la lecture en deux au moment ou elle doit se poursuivre.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  DEUX RENDUS POUR LES CONSTATS
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - `cards` : une carte par constat. Ils se lisent comme un inventaire dont
 *     on balaie les entrees, ce qui convient quand ils sont independants les
 *     uns des autres. C'est la forme par defaut.
 *   - `list` : une liste a filets. Elle se lit comme un enchainement de faits
 *     qui s'accumulent, et elle pese beaucoup moins a l'ecran — trois cartes
 *     posees a cote d'une image font deux blocs qui se disputent le regard.
 *
 * Reste une <ol> dans les deux cas. La synthese vocale annonce « liste de 3 » —
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
  variant = 'cards',
  background = 'white',
  nested = false,
}: ProblemContent & {
  /** Voir le docblock. `cards` par defaut. */
  variant?: 'cards' | 'list'
  background?: 'cream' | 'white'
  nested?: boolean
}) {
  const list = variant === 'list'

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

              {image.caption && (
                <p className="mt-3 text-[13px] leading-[1.6] text-subtle">
                  {image.caption}
                </p>
              )}
            </RevealItem>
          )}
        </div>

        <ol
          className={clsx(
            list
              ? 'border-t border-cream-border'
              : // Trois cartes sur deux colonnes laissent un trou a la derniere
                // ligne, et ce trou se lit comme un bloc manquant. Les comptes
                // impairs restent donc en colonne unique.
                clsx('grid gap-4', items.length % 2 === 0 && 'sm:grid-cols-2'),
          )}
        >
          {items.map((item) => (
            <RevealItem
              key={item.title}
              as="li"
              className={clsx(
                list
                  ? 'flex gap-4 border-b border-cream-border py-6'
                  : clsx(
                      'flex h-full flex-col rounded-2xl border border-cream-border p-6',
                      cardSurface(background),
                    ),
              )}
            >
              {item.icon && (
                <IconTile
                  icon={item.icon}
                  size={list ? 'sm' : 'md'}
                  className={list ? undefined : 'mb-5'}
                />
              )}

              <div className={list ? 'max-w-2xl' : undefined}>
                <h3 className="text-[17px] font-semibold leading-[1.35] text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                  {item.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>
    </Section>
  )
}
