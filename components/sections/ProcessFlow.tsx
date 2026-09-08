import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'

import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { FlowContent, FlowStep } from '@/content/types'

/**
 * Enchainement en quatre temps — capter, orchestrer, analyser, decider.
 *
 * C'est le schema qui porte la promesse de la page pilier : chaque etape
 * envoie vers la sous-page qui la detaille. La page pilier oriente, les
 * sous-pages expliquent.
 *
 * Une <ol> et non quatre <div> : l'ordre est l'argument. Un lecteur d'ecran
 * qui entend « liste ordonnee de 4 elements » recoit la meme information que
 * celui qui voit les chevrons.
 *
 * Les chevrons entre les cellules, eux, sont purement decoratifs : ils ne
 * paraissent qu'a partir de `lg`, la ou les quatre etapes tiennent sur une
 * ligne et ou le sens de lecture n'est plus donne par l'empilement.
 */
export default function ProcessFlow({
  title,
  accent,
  subtitle,
  steps,
  background = 'cream',
  nested = false,
  id,
}: FlowContent & { background?: 'cream' | 'white'; nested?: boolean; id?: string }) {
  return (
    <Section background={background} nested={nested} labelledBy="flow-title" id={id}>
      <RevealGroup>
        <BlockHeading
          id="flow-title"
          eyebrow="De la donnée à la décision"
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <RevealItem key={step.title} as="li" className="relative">
              {index > 0 && (
                <ChevronRight
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden
                  className="absolute -left-6 -top-[8px] hidden text-cream-deep lg:block"
                />
              )}
              <Step {...step} index={index} />
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>
    </Section>
  )
}

/**
 * Une etape. Cliquable en entier quand elle a une destination : sur mobile,
 * une zone tactile qui se limite au libelle du lien oblige a viser huit
 * pixels de haut.
 *
 * Le filet superieur passe a l'or au survol et au focus — l'or signale une
 * action, et c'en est une. Il reste creme quand l'etape n'est pas un lien.
 */
function Step({
  icon,
  title,
  body,
  href,
  linkLabel,
  index,
}: FlowStep & { index: number }) {
  const inner = (
    <>
      <div className="flex items-center gap-3">
        <IconTile icon={icon} size="sm" />
        <span className="font-display text-[12px] font-semibold tabular-nums tracking-[0.12em] text-subtle">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-4 text-[18px] font-semibold leading-[1.3] text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-[15px] leading-[1.65] text-muted">{body}</p>

      {href && linkLabel && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-ink">
          {linkLabel}
          <ArrowRight
            size={14}
            strokeWidth={2}
            aria-hidden
            className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
          />
        </span>
      )}
    </>
  )

  const shell =
    'block border-t-2 border-cream-deep pt-5 transition-colors duration-base ease-smooth'

  return href ? (
    <Link href={href} className={`group ${shell} hover:border-gold`}>
      {inner}
    </Link>
  ) : (
    <div className={shell}>{inner}</div>
  )
}
