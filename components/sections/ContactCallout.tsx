import clsx from 'clsx'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { CalloutContent } from '@/content/types'
import { cardSurface } from '@/lib/surface'

/**
 * Encart de relance, au milieu de la page.
 *
 * Il repond a l'objection qu'une grille de categories laisse forcement
 * ouverte — « et si mon systeme n'y est pas ? » — au moment ou elle se pose,
 * plutot que de la laisser courir jusqu'au pied de page.
 *
 * Clair et non sombre : le seul aplat noir d'une page de rubrique est son
 * pied de page, et une relance en milieu de parcours n'a pas a lui disputer
 * l'attention. D'ou aussi le bouton noir des sections claires plutot que l'or,
 * et `variant="dense"` : c'est une relance, pas une conclusion.
 *
 * La destination est volontairement une equipe technique et non le formulaire
 * commercial : quelqu'un qui cherche son ERP dans une liste ne veut pas qu'on
 * le rappelle pour lui presenter la plateforme.
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
    <Section background={background} nested={nested} variant="dense" labelledBy="callout-title">
      <RevealGroup className="mx-auto max-w-3xl">
        <RevealItem>
          <div className={clsx(
            'flex flex-col gap-6 rounded-2xl border border-cream-deep px-6 py-7 sm:px-9 sm:py-9 lg:flex-row lg:items-center lg:gap-10',
            cardSurface(background),
          )}>
            <div className="flex-1">
              {icon && <IconTile icon={icon} className="mb-5" />}

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
