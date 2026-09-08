import clsx from 'clsx'

import BlockHeading from '@/components/ui/BlockHeading'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { PipelineContent } from '@/content/types'

/**
 * Le circuit CAPA, en colonnes.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  DES COLONNES, PAS UNE FRISE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * `LifecycleTimeline` deroule une suite d'etapes ou chacune mene a la
 * suivante. Ce circuit-ci bifurque : apres la validation, un dossier part en
 * « Valide » ou en « Refuse », et les deux sont des issues legitimes. Un rail
 * continu affirmerait qu'on passe de l'un a l'autre, ce qui est faux.
 *
 * D'ou des colonnes separees par des filets verticaux, sans fleches : elles
 * disent « voici les etats possibles », pas « voici le chemin unique ».
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  AUCUN COMPTEUR
 * ─────────────────────────────────────────────────────────────────────────
 *
 * La version precedente affichait un nombre de dossiers par colonne, marque
 * « donnees d'exemple ». La mention ne survit pas a une capture d'ecran : le
 * chiffre, lui, se recopie dans une presentation client. Le bloc montre donc
 * la structure du circuit et rien d'autre.
 *
 * Consequence : ce bloc est du texte, pas une maquette. Il n'est pas
 * `aria-hidden` — il se lit a la synthese vocale comme une liste de six etats,
 * ce qui est exactement ce qu'il est.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LES COULEURS
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Un seul accent : le vert de « Valide », qui est le seul emploi autorise de
 * cette couleur sur le site — une validation. « Refuse » n'est pas rendu en
 * rouge : le rouge signale une alerte, et un refus est une decision normale du
 * circuit, pas un incident. Les etats terminaux sont marques par un point
 * evide plutot que par une couleur, et chaque colonne porte son nom en toutes
 * lettres : la couleur ne porte jamais l'information seule.
 */
export default function CapaPipeline({
  eyebrow,
  title,
  accent,
  subtitle,
  stages,
  caption,
  background = 'white',
  nested = false,
}: PipelineContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="pipeline-title">
      <RevealGroup>
        <BlockHeading
          id="pipeline-title"
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ol
          className="mt-12 grid border-t border-cream-border sm:grid-cols-2 lg:[grid-template-columns:repeat(var(--pipeline-columns),minmax(0,1fr))]"
          style={{
            // Une variable CSS plutot qu'une classe construite : Tailwind lit
            // le source, pas l'execution — `lg:grid-cols-${n}` ne serait
            // jamais genere. La propriete arbitraire, elle, est statique dans
            // le JSX ; seule sa valeur varie.
            ['--pipeline-columns' as string]: String(stages.length),
          }}
        >
          {stages.map((stage, index) => (
            <RevealItem
              key={stage.name}
              as="li"
              className={clsx(
                'border-b border-cream-border py-6 lg:border-b-0 lg:py-8',
                // Le filet vertical separe les colonnes entre elles, jamais
                // avant la premiere. En pile il n'a pas lieu d'etre : c'est le
                // filet horizontal qui separe.
                index > 0 && 'lg:border-l lg:border-cream-border lg:pl-6',
                index < stages.length - 1 && 'lg:pr-6',
              )}
            >
              <span
                aria-hidden
                className={clsx(
                  'block h-2.5 w-2.5 rounded-full',
                  stage.terminal
                    ? 'border border-stone-400'
                    : stage.name === 'Validé'
                      ? 'bg-green-600'
                      : 'bg-stone-300',
                )}
              />

              <h3 className="mt-4 text-[16px] font-semibold leading-[1.35] text-gray-900">
                {stage.name}
              </h3>

              {stage.hint && (
                <p className="mt-2 text-[14px] leading-[1.6] text-muted">
                  {stage.hint}
                </p>
              )}
            </RevealItem>
          ))}
        </ol>

        {/* Ce que le circuit veut dire, en une phrase. Ce n'est pas une
            legende d'image : c'est la conclusion que les six colonnes ne
            peuvent pas enoncer elles-memes. */}
        <RevealItem>
          <p className="mt-8 max-w-3xl text-[15px] leading-[1.65] text-muted">
            {caption}
          </p>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
