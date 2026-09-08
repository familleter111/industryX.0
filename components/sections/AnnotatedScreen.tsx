import type { ReactNode } from 'react'

import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { AnnotatedScreenContent } from '@/content/types'

/**
 * Un ecran, et la liste de ce qu'il contient.
 *
 * L'ecran arrive en `children` plutot que par un chemin d'image : c'est du
 * JSX, et le JSX ne peut pas vivre dans un `.ts` de contenu. La regle tient
 * quand meme — le texte, lui, reste entierement dans `content/`, y compris la
 * legende qui decrit l'ecran pour qui ne le voit pas.
 *
 * Deux colonnes qui ne sont pas de meme poids : l'ecran occupe la moitie
 * gauche et reste colle en haut au defilement sur grand ecran, pendant que
 * les legendes defilent a cote. C'est la seule facon de lire une annotation
 * en regardant ce qu'elle annote — sinon l'ecran est sorti du champ avant la
 * deuxieme ligne.
 */
export default function AnnotatedScreen({
  eyebrow,
  title,
  accent,
  subtitle,
  items,
  caption,
  background = 'white',
  nested = false,
  children,
}: AnnotatedScreenContent & {
  background?: 'cream' | 'white'
  /** Rendu dans une section deja ouverte par la page. Voir `SectionStack`. */
  nested?: boolean
  /** La maquette. Doit etre `aria-hidden` : `caption` la decrit. */
  children: ReactNode
}) {
  return (
    <Section background={background} nested={nested} labelledBy="screen-title">
      <RevealGroup>
        <BlockHeading
          id="screen-title"
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <RevealItem variant="in" className="lg:sticky lg:top-28 lg:self-start">
            {children}

            {/* La legende porte, en toutes lettres, ce que la maquette montre.
                Elle n'est pas decorative : c'est le seul acces au contenu de
                l'ecran pour qui ne le voit pas. */}
            <p className="mx-auto mt-6 max-w-sm text-center text-[14px] leading-[1.6] text-subtle">
              {caption}
            </p>
          </RevealItem>

          <ul className="border-t border-cream-border">
            {items.map((item) => (
              <RevealItem
                key={item.title}
                as="li"
                className="flex gap-4 border-b border-cream-border py-6"
              >
                <IconTile icon={item.icon} size="sm" />

                <div>
                  <h3 className="text-[16px] font-semibold leading-[1.4] text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-[1.65] text-muted">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </ul>
        </div>
      </RevealGroup>
    </Section>
  )
}
