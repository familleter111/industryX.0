import BlockHeading from '@/components/ui/BlockHeading'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { LifecycleContent } from '@/content/types'

/**
 * Frise du cycle de vie : horizontale sur desktop, verticale sur mobile.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LE RAIL
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le trait qui relie les etapes n'est pas une couche posee par-dessus la
 * liste : chaque etape dessine son propre segment, vers la suivante. Une
 * ligne unique en position absolue au niveau du conteneur devrait connaitre
 * la position du premier et du dernier marqueur — deux valeurs qui changent
 * avec le nombre d'etapes, la longueur des titres et le point de rupture.
 * Elle finit toujours par depasser d'un cote.
 *
 * Ici, le segment part du bord du marqueur et va jusqu'au bord de la
 * cellule. Comme la grille n'a pas de gouttiere horizontale, le bord d'une
 * cellule est le bord de la suivante : les segments se touchent, et la
 * derniere etape n'en dessine aucun. Rien a recalculer.
 *
 * `grid-cols-5` en dur serait faux des qu'une page en demande quatre ou six :
 * le nombre de colonnes est derive de la longueur du tableau.
 *
 * Le marqueur de la derniere etape est vert : une cloture est une validation,
 * c'est le seul emploi de cette couleur. Les autres restent neutres — l'or
 * est reserve aux actions, et une frise ne se clique pas.
 */
export default function LifecycleTimeline({
  eyebrow,
  title,
  accent,
  subtitle,
  stages,
  background = 'white',
  nested = false,
}: LifecycleContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="lifecycle-title">
      <RevealGroup>
        <BlockHeading
          id="lifecycle-title"
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ol
          // Pas de palier intermediaire a deux colonnes : le rail relierait
          // alors l'etape 1 a l'etape 3, qui se trouve sous elle, et non a
          // l'etape 2, qui se trouve a cote. Une frise est soit empilee, soit
          // deroulee — jamais repliee.
          className="mt-12 grid lg:mt-16 lg:[grid-template-columns:repeat(var(--lifecycle-columns),minmax(0,1fr))]"
          style={{
            // Une variable CSS plutot qu'une classe construite : Tailwind
            // lit le source, pas l'execution — `lg:grid-cols-${n}` ne serait
            // jamais genere. La propriete arbitraire, elle, est statique dans
            // le JSX ; seule sa valeur varie.
            ['--lifecycle-columns' as string]: String(stages.length),
          }}
        >
          {stages.map((stage, index) => {
            const isLast = index === stages.length - 1

            return (
              <RevealItem
                key={stage.title}
                as="li"
                // `lg:flex lg:flex-col` : les cellules d'une meme rangee de
                // grille sont deja etirees a la meme hauteur ; en faire des
                // colonnes flex permet de pousser le bloc de bas de cellule
                // vers le bas. Sans cela, les libelles de role se posent juste
                // sous leur paragraphe et se retrouvent a six hauteurs
                // differentes des que les textes ne font pas le meme nombre
                // de lignes — ce qui est la regle, pas l'exception.
                className="relative pb-10 pl-12 last:pb-0 lg:flex lg:flex-col lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-14"
              >
                {/* Segment de rail vers l'etape suivante. Vertical sous le
                    marqueur en pile, horizontal a sa droite en frise. */}
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[19px] top-10 w-px bg-cream-deep lg:bottom-auto lg:left-10 lg:right-0 lg:top-[19px] lg:h-px lg:w-auto"
                  />
                )}

                <span
                  aria-hidden
                  className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border text-[13px] font-semibold tabular-nums ${
                    isLast
                      ? 'border-green-500/40 bg-green-50 text-green-700'
                      : 'border-cream-deep bg-white text-subtle'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="text-[16px] font-semibold leading-[1.35] text-gray-900">
                  {stage.title}
                </h3>

                <p className="mt-2 max-w-xs text-[15px] leading-[1.6] text-muted">
                  {stage.body}
                </p>

                {(stage.owner || stage.cipa) && (
                  <div className="lg:mt-auto">
                    {stage.owner && (
                      <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.1em] text-subtle">
                        {stage.owner}
                      </p>
                    )}

                    {/* L'apport de la plateforme, detache du reste par un
                        filet : le corps du texte decrit l'etape telle qu'elle
                        existe deja chez le lecteur, cette ligne dit ce qui s'y
                        ajoute. Pas d'or ici malgre l'envie — l'or signale une
                        action de l'interface, pas une mise en avant
                        editoriale. */}
                    {stage.cipa && (
                      <p className="mt-3 border-t border-cream-border pt-3 text-[14px] leading-[1.55] text-stone-700">
                        {stage.cipa}
                      </p>
                    )}
                  </div>
                )}
              </RevealItem>
            )
          })}
        </ol>
      </RevealGroup>
    </Section>
  )
}
