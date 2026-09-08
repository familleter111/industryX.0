import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { CalloutContent } from '@/content/types'

/**
 * Encart de relance : une objection, une reponse courte, un interlocuteur.
 *
 * Clair et non sombre : le seul aplat noir d'une page de rubrique est le
 * bandeau des chiffres, et une relance n'a pas a lui disputer l'attention.
 * D'ou aussi le bouton noir des sections claires plutot que l'or, et
 * `variant="dense"` : c'est une relance, pas une conclusion.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  DES FILETS, PAS UN ENCADRE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le bloc etait une carte encadree posee au milieu de la colonne. Sur une page
 * qui enchaine plusieurs blocs, un encadre de plus se lit comme une publicite
 * inseree dans le texte — l'oeil le saute. Deux filets d'un pixel suffisent a
 * l'isoler tout en le gardant dans le fil de la lecture.
 */
export default function ContactCallout({
  icon,
  title,
  body,
  cta,
  background = 'cream',
  nested = false,
}: CalloutContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section
      background={background}
      nested={nested}
      variant="dense"
      labelledBy="callout-title"
    >
      <RevealGroup className="mx-auto max-w-3xl">
        <RevealItem>
          <div className="flex flex-col gap-6 border-y border-cream-border py-9 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex-1">
              {icon && <IconTile icon={icon} size="sm" className="mb-5" />}

              <h2
                id="callout-title"
                className="font-display text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-gray-900 sm:text-[24px]"
              >
                {title}
              </h2>

              <p className="mt-3 text-[16px] leading-[1.7] text-muted">{body}</p>
            </div>

            <Link
              href={cta.href}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-dark px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-base ease-smooth hover:bg-black"
            >
              {cta.label}
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                aria-hidden
                className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
              />
            </Link>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
