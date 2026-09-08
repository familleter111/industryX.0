import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { Surface, SurfacesContent } from '@/content/types'

/**
 * Les deux faces du produit : le poste de pilotage et le terrain.
 *
 * Deux colonnes de meme poids, separees par un filet vertical. C'est la seule
 * mise en page qui dise ce que le bloc affirme — que ce sont deux moities
 * d'un meme systeme, et non un produit principal accompagne d'une option.
 * Trois cartes cote a cote, ou une grande et une petite, raconteraient
 * l'inverse.
 *
 * Le filet passe en horizontal sous `lg`, la ou les colonnes s'empilent :
 * une bordure gauche sur un bloc pleine largeur ne separe plus rien.
 */
export default function SurfaceSplit({
  title,
  accent,
  subtitle,
  items,
  background = 'white',
  nested = false,
}: SurfacesContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="surfaces-title">
      <RevealGroup>
        <BlockHeading
          id="surfaces-title"
          eyebrow="Web et mobile"
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {items.map((item, index) => (
            <RevealItem
              key={item.title}
              className={
                index === 1
                  ? 'border-t border-cream-border pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0'
                  : undefined
              }
            >
              <SurfaceColumn {...item} />
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </Section>
  )
}

function SurfaceColumn({ icon, eyebrow, title, body, points }: Surface) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <IconTile icon={icon} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
          {eyebrow}
        </span>
      </div>

      <h3 className="mt-5 text-[20px] font-semibold leading-[1.3] text-gray-900">
        {title}
      </h3>

      <p className="mt-3 text-[16px] leading-[1.7] text-muted">{body}</p>

      <ul className="mt-6 space-y-3 border-t border-cream-border pt-6">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            {/* Une puce neutre, pas une coche verte : ces lignes decrivent
                ce que fait la surface, elles ne valident rien. */}
            <span
              aria-hidden
              className="mt-[9px] h-[3px] w-3 shrink-0 rounded-full bg-stone-300"
            />
            <span className="text-[15px] leading-[1.65] text-muted">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
