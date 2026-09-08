import { Check } from 'lucide-react'

import BlockHeading from '@/components/ui/BlockHeading'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { ProofContent } from '@/content/types'

/**
 * Sixieme bloc de la page : integrations ou conformite, selon le sujet.
 *
 * Un seul composant pour les deux, avec une union discriminee par `kind`.
 * Les deux blocs occupent la meme place dans la page, repondent a la meme
 * objection — « est-ce que ca s'insere chez nous, et est-ce que ca tient
 * devant un auditeur ? » — et n'apparaissent jamais ensemble. Deux composants
 * auraient dedouble le meme en-tete, la meme grille et la meme note de bas de
 * bloc pour une difference de quelques lignes.
 */
export default function ProofBlock(
  props: ProofContent & { background?: 'cream' | 'white'; nested?: boolean },
) {
  const {
    kind,
    title,
    accent,
    subtitle,
    note,
    background = 'white',
    nested = false,
  } = props
  // Le `kind` donne un sur-titre par defaut ; une page qui traite le sujet
  // sous un autre angle — la securite vue par une DSI, par exemple — le
  // remplace depuis son fichier de contenu.
  const eyebrow =
    props.eyebrow ?? (kind === 'integrations' ? 'Écosystème' : 'Conformité')

  return (
    <Section background={background} nested={nested} labelledBy="proof-title">
      <RevealGroup>
        <BlockHeading
          id="proof-title"
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        {props.kind === 'integrations' ? (
          /* Systemes connectes : le nom porte l'information, la categorie la
             situe. Deux lignes suffisent, d'ou la grille compacte. */
          <ul className="mt-12 grid gap-x-8 border-t border-cream-border sm:grid-cols-2 lg:grid-cols-3">
            {props.items.map((item) => (
              <RevealItem
                key={item.name}
                as="li"
                className="flex items-baseline justify-between gap-4 border-b border-cream-border py-4"
              >
                <span className="text-[16px] font-medium text-gray-900">
                  {item.name}
                </span>
                <span className="text-[13px] text-subtle">{item.category}</span>
              </RevealItem>
            ))}
          </ul>
        ) : (
          /* Exigences couvertes : chacune demande une phrase, sinon le bloc
             affirme une conformite sans dire ce qu'elle recouvre. */
          <ul className="mt-12 grid gap-x-12 border-t border-cream-border sm:grid-cols-2">
            {props.items.map((item) => (
              <RevealItem
                key={item.name}
                as="li"
                className="flex gap-3 border-b border-cream-border py-6"
              >
                {/* Vert = validation. Une exigence couverte en est une. */}
                <Check
                  size={16}
                  strokeWidth={2}
                  aria-hidden
                  className="mt-[5px] shrink-0 text-green-600"
                />
                <div>
                  <h3 className="text-[16px] font-semibold leading-[1.4] text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-[1.65] text-muted">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </ul>
        )}

        {note && (
          <RevealItem>
            <p className="mt-8 max-w-2xl text-[13px] leading-[1.65] text-subtle">
              {note}
            </p>
          </RevealItem>
        )}
      </RevealGroup>
    </Section>
  )
}
