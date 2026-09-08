import BlockHeading from '@/components/ui/BlockHeading'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { OutcomesContent } from '@/content/types'

/**
 * Les trois resultats mesurables de la page, dans une carte sombre.
 *
 * La carte sombre est le gabarit de mise en avant du site — celui des blocs
 * « CIPA Intelligence ». Elle sert ici parce qu'un chiffre est ce que le
 * lecteur retiendra de la page : c'est le seul bloc qui merite de rompre
 * l'alternance blanc / creme.
 *
 * REGLE DE PUBLICATION : un `Outcome` sans `source` n'est pas un constat.
 * Le composant le signale visuellement — mention « objectif » plutot que
 * source citee — pour qu'un chiffre non valide ne puisse pas passer pour une
 * mesure client. Le controle se voit a l'ecran, pas seulement dans un
 * commentaire de `content/`.
 */
export default function OutcomeMetrics({
  title,
  accent,
  subtitle,
  items,
  background = 'cream',
  nested = false,
}: OutcomesContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="outcomes-title">
      <RevealGroup>
        <BlockHeading
          id="outcomes-title"
          eyebrow="Résultats"
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <RevealItem className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-dark">
            {/* Liseré doré en tête de carte : le seul accent du bloc. */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            />

            <dl className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {items.map((item) => (
                <div key={item.label} className="p-7 sm:p-8">
                  <dt className="text-[14px] font-medium leading-[1.5] text-white/70">
                    {item.label}
                  </dt>

                  <dd className="mt-3">
                    <span className="block font-display text-[36px] font-semibold leading-none tracking-[-0.03em] text-white sm:text-[40px]">
                      {item.value}
                    </span>

                    {item.detail && (
                      <span className="mt-3 block text-[14px] leading-[1.6] text-white/55">
                        {item.detail}
                      </span>
                    )}

                    {/* Un chiffre affirme sans origine verifiable est une
                        allegation. On dit laquelle des deux on montre. */}
                    {/* `white/60` et non `/40` : a 40 % le blanc compose sur
                        le noir de la carte ne donne que 3,81:1, sous le seuil.
                        A 60 % il est a 7,26:1. Cette ligne dit si un chiffre
                        est source ou seulement vise : c'est precisement celle
                        qu'il ne faut pas rendre illisible. */}
                    <span className="mt-4 block text-[11px] uppercase tracking-[0.12em] text-white/60">
                      {item.source ?? 'Objectif de déploiement — à valider'}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
