import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { AudiencesContent } from '@/content/types'

/**
 * Les fonctions de l'usine, et ce que chacune vient chercher.
 *
 * Ecrit du point de vue du metier, pas du produit : « voir l'etat du site
 * sans attendre le reporting du lundi » et non « module de reporting
 * consolide ». Un directeur qualite doit se reconnaitre dans sa ligne avant
 * de comprendre quelle fonctionnalite la sert.
 *
 * Liste annotee sur deux colonnes, sans cartes : ces entrees se lisent, elles
 * ne se cliquent pas — contrairement a celles de `ModuleGrid`.
 */
export default function AudienceList({
  title,
  accent,
  subtitle,
  items,
  background = 'cream',
  nested = false,
}: AudiencesContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="audiences-title">
      <RevealGroup>
        <BlockHeading
          id="audiences-title"
          eyebrow="Pour qui"
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ul className="mt-12 grid gap-x-12 border-t border-cream-border sm:grid-cols-2">
          {items.map((item) => (
            <RevealItem
              key={item.role}
              as="li"
              className="flex gap-4 border-b border-cream-border py-6"
            >
              <IconTile icon={item.icon} size="sm" />

              <div>
                <h3 className="text-[16px] font-semibold leading-[1.4] text-gray-900">
                  {item.role}
                </h3>
                <p className="mt-1.5 text-[15px] leading-[1.65] text-muted">
                  {item.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </ul>
      </RevealGroup>
    </Section>
  )
}
