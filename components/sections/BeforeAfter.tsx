import BlockHeading from '@/components/ui/BlockHeading'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { ScenarioContent } from '@/content/types'

/**
 * Scenario en trois temps, chaque temps compare a lui-meme.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI AUCUNE COULEUR NE DISTINGUE LES DEUX COLONNES
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le reflexe serait de mettre la colonne « aujourd'hui » en rouge et l'autre
 * en vert. Ce serait un detournement des deux seules couleurs d'etat du
 * site : le rouge signale une alerte reelle, le vert une validation. Ni l'un
 * ni l'autre ne decrit une facon de travailler que le lecteur pratique
 * peut-etre encore le mois prochain — le peindre en rouge lui dit surtout
 * qu'il a tort.
 *
 * La distinction passe donc par la matiere : la colonne actuelle reste a plat
 * sur le fond, en gris de texte secondaire ; celle avec CIPA est posee sur
 * une surface blanche cernee d'un filet. On lit laquelle est le propos sans
 * qu'aucune des deux soit disqualifiee.
 *
 * Les en-tetes de colonne sont repetes a chaque moment plutot qu'affiches une
 * fois en tete de tableau : en pile sur mobile, un en-tete pose tout en haut
 * a disparu depuis longtemps quand on lit le troisieme temps.
 */
export default function BeforeAfter({
  eyebrow,
  title,
  accent,
  subtitle,
  beforeLabel,
  afterLabel,
  moments,
  background = 'white',
  nested = false,
}: ScenarioContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="scenario-title">
      <RevealGroup>
        <BlockHeading
          id="scenario-title"
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ol className="mt-12 border-t border-cream-border">
          {moments.map((moment, index) => (
            <RevealItem
              key={moment.when}
              as="li"
              className="border-b border-cream-border py-8"
            >
              <p className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="font-display text-[13px] font-semibold tabular-nums text-subtle"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[17px] font-semibold leading-[1.4] text-gray-900">
                  {moment.when}
                </span>
              </p>

              <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                    {beforeLabel}
                  </p>
                  <p className="mt-2.5 text-[16px] leading-[1.7] text-muted">
                    {moment.before}
                  </p>
                </div>

                <div className="rounded-2xl border border-cream-deep bg-white p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-ink">
                    {afterLabel}
                  </p>
                  <p className="mt-2.5 text-[16px] leading-[1.7] text-gray-900">
                    {moment.after}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>
    </Section>
  )
}
