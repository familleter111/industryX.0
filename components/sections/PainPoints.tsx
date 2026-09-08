import BlockHeading from '@/components/ui/BlockHeading'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { ProblemContent } from '@/content/types'

/**
 * Les trois constats terrain que vit la cible, avant qu'on parle de produit.
 *
 * Liste annotee et non grille de cartes : trois encadres cote a cote se
 * lisent comme trois arguments de vente equivalents et interchangeables. Une
 * liste numerotee se lit comme un enchainement de faits — ce qu'elle est. Le
 * numero est decoratif, la structure <ol> porte deja l'ordre.
 *
 * Aucun accent ici. Ni or ni vert : ce bloc decrit un probleme, il n'y a rien
 * a valider ni aucune action a declencher.
 */
export default function PainPoints({
  title,
  accent,
  subtitle,
  items,
  eyebrow = 'Sur le terrain',
  background = 'white',
  nested = false,
}: ProblemContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="problem-title">
      <RevealGroup>
        <BlockHeading
          id="problem-title"
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ol className="mt-12 border-t border-cream-border">
          {items.map((item, index) => (
            <RevealItem
              key={item.title}
              as="li"
              className="grid gap-x-6 gap-y-2 border-b border-cream-border py-7 sm:grid-cols-[auto_1fr] sm:py-8"
            >
              <span
                aria-hidden
                className="font-display text-[13px] font-semibold tabular-nums text-subtle sm:pt-1"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="max-w-2xl">
                <h3 className="text-[17px] font-semibold leading-[1.4] text-gray-900 sm:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.7] text-muted">
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
