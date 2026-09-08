import { RotateCw } from 'lucide-react'

import BlockHeading from '@/components/ui/BlockHeading'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { PdcaContent } from '@/content/types'

/**
 * La boucle PDCA, en quatre quadrants.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  DES FILETS, PAS DES CARTES
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Les quatre phases etaient rendues en cartes encadrees. Sur une page qui en
 * porte deja trois blocs a la suite, quatre encadres de plus transforment la
 * lecture en balayage de vignettes : l'oeil compte les boites au lieu de lire
 * ce qu'elles contiennent. Les quadrants sont donc separes par des filets d'un
 * pixel, comme les listes annotees du reste du site.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI PAS DE FLECHES ENTRE LES QUADRANTS
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Dessiner le cycle demanderait de placer les quadrants dans le sens horaire :
 * Plan en haut a gauche, Do en haut a droite, Check en bas a DROITE, Act en
 * bas a gauche. Une grille remplit ses cellules dans l'ordre du document — on
 * obtiendrait Check en bas a gauche —, il faudrait donc forcer le placement
 * des deux dernieres cellules pour obtenir la disposition voulue.
 *
 * L'ordre visuel cesserait alors de suivre l'ordre du document : sur la
 * deuxieme ligne, l'oeil lirait Act puis Check quand le document dit Check
 * puis Act. C'est exactement ce que WCAG 1.3.2 interdit, et cela desservirait
 * la lecture au clavier comme a la synthese vocale — pour une decoration.
 *
 * Les quadrants restent donc dans l'ordre de lecture, et c'est la ligne du bas
 * qui referme la boucle, en toutes lettres. Quatre cases cote a cote sont un
 * tableau ; cette phrase est ce qui en fait un cycle.
 */
export default function PdcaLoop({
  eyebrow,
  title,
  accent,
  subtitle,
  phases,
  loopNote,
  background = 'white',
  nested = false,
}: PdcaContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="pdca-title">
      <RevealGroup>
        <BlockHeading
          id="pdca-title"
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ol className="mt-12 grid gap-x-12 border-t border-cream-border lg:grid-cols-2">
          {phases.map((phase) => (
            <RevealItem
              key={phase.letter}
              as="li"
              className="border-b border-cream-border py-8"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-deep font-display text-[15px] font-semibold text-gray-900"
                >
                  {phase.letter}
                </span>
                <h3 className="text-[18px] font-semibold leading-[1.3] text-gray-900">
                  {phase.name}
                </h3>
              </div>

              <p className="mt-4 max-w-xl text-[16px] leading-[1.7] text-muted">
                {phase.body}
              </p>

              <ul className="mt-5 space-y-2">
                {phase.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    {/* Puce neutre : ces lignes disent ce que la plateforme
                        outille a cette phase, elles ne valident rien. */}
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
            </RevealItem>
          ))}
        </ol>

        {/* Cette ligne n'est pas un ornement : c'est elle qui dit que la
            quatrieme phase ramene a la premiere. Sans elle, le bloc decrit
            quatre etapes et non un cycle. */}
        <RevealItem>
          <p className="mt-8 flex items-start gap-3 text-[15px] leading-[1.65] text-muted">
            <RotateCw
              size={18}
              strokeWidth={1.75}
              aria-hidden
              className="mt-[3px] shrink-0 text-subtle"
            />
            {loopNote}
          </p>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
