import { RotateCw } from 'lucide-react'

import BlockHeading from '@/components/ui/BlockHeading'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { PdcaContent } from '@/content/types'

/**
 * La boucle PDCA, en quatre quadrants.
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
 * Les quadrants restent donc dans l'ordre de lecture, et c'est le bandeau du
 * bas qui referme la boucle, en toutes lettres. Quatre cases cote a cote sont
 * un tableau ; cette phrase est ce qui en fait un cycle.
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

        <ol className="mt-12 grid gap-4 lg:grid-cols-2">
          {phases.map((phase) => (
            <RevealItem
              key={phase.letter}
              as="li"
              className="rounded-2xl border border-cream-border bg-white p-6 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-deep font-display text-[16px] font-semibold text-gray-900"
                >
                  {phase.letter}
                </span>
                <h3 className="text-[18px] font-semibold leading-[1.3] text-gray-900">
                  {phase.name}
                </h3>
              </div>

              <p className="mt-4 text-[16px] leading-[1.7] text-muted">
                {phase.body}
              </p>

              <ul className="mt-5 space-y-2 border-t border-cream-border pt-5">
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

        {/* Ce bandeau n'est pas un ornement : c'est lui qui dit que la
            quatrieme phase ramene a la premiere. Sans lui, le bloc decrit
            quatre etapes et non un cycle. */}
        <RevealItem>
          <p className="mt-4 flex items-start gap-3 rounded-2xl border border-cream-deep px-6 py-5 text-[15px] leading-[1.65] text-muted sm:items-center">
            <RotateCw
              size={18}
              strokeWidth={1.75}
              aria-hidden
              className="mt-0.5 shrink-0 text-subtle sm:mt-0"
            />
            {loopNote}
          </p>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
