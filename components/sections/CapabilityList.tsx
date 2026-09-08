import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { SolutionContent } from '@/content/types'

/**
 * Les capacites CIPA qui repondent aux constats de la section precedente.
 *
 * Trois ou quatre entrees, chacune avec son icone, son titre et deux lignes.
 * La grille reste a deux colonnes quel que soit le nombre : a trois, la
 * derniere entree occupe simplement la moitie de la derniere ligne. Une
 * grille qui change de gabarit selon le nombre d'elements fait sauter la
 * largeur des paragraphes d'une page a l'autre.
 *
 * Separateurs en hairline plutot qu'en cartes : les cartes de la home ont ete
 * remplacees par des listes annotees, et une page de rubrique n'a aucune
 * raison de revenir en arriere.
 */
export default function CapabilityList({
  title,
  accent,
  subtitle,
  items,
  eyebrow = 'Ce que fait CIPA',
  background = 'cream',
  nested = false,
  // Surchargeable parce qu'une page peut poser deux blocs de capacites — les
  // categories d'integration puis les interfaces, sur /plateforme/integrations.
  // Deux <h2> partageant le meme id casseraient les deux `aria-labelledby`.
  id = 'solution-title',
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

        <ul className="mt-12 grid gap-x-12 border-t border-cream-border sm:grid-cols-2">
          {items.map((item) => (
            <RevealItem
              key={item.title}
              as="li"
              className="flex gap-4 border-b border-cream-border py-7"
            >
              <IconTile icon={item.icon} />

              <div>
                <h3 className="text-[17px] font-semibold leading-[1.4] text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.7] text-muted">
                  {item.body}
                </p>

                {/* Detail, sur les sous-pages qui en donnent. Puce neutre et
                    non coche verte : ces lignes disent ce que la capacite
                    recouvre, elles ne valident rien. */}
                {item.points && item.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span
                          aria-hidden
                          className="mt-[9px] h-[3px] w-2.5 shrink-0 rounded-full bg-stone-300"
                        />
                        <span className="text-[15px] leading-[1.6] text-subtle">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </RevealItem>
          ))}
        </ul>
      </RevealGroup>
    </Section>
  )
}
