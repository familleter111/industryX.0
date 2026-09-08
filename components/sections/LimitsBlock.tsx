import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import type { LimitsContent } from '@/content/types'

/**
 * Ce que la capacite presentee ne fait pas.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI CE BLOC EST LE PLUS SOBRE DE LA PAGE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Sa force tient a ce qu'on ne lui ajoute pas. Une icone d'alerte le ferait
 * lire comme un avertissement, une bordure rouge comme un danger, une carte
 * sombre comme un argument de vente de plus. Ce n'est aucun des trois : c'est
 * un cadrage, et un cadrage se pose a plat.
 *
 * D'ou le traitement : un encadre a filet fin, pas d'accent de couleur, pas
 * de puce, trois enonces separes par des hairlines. Le seul contraste vient
 * du poids du texte — l'enonce en semi-gras, sa precision en gris.
 *
 * `variant="dense"` : ce bloc respire moins que les autres. Une section
 * pleine hauteur autour de trois phrases lui donnerait une solennite qui
 * dessert le propos.
 *
 * Pas de sous-titre dans le type : la place manque pour un paragraphe
 * d'introduction sans que le bloc cesse d'etre bref.
 */
export default function LimitsBlock({
  eyebrow,
  title,
  accent,
  items,
  background = 'white',
  nested = false,
}: LimitsContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section
      background={background} nested={nested}
      variant="dense"
      labelledBy="limits-title"
    >
      <RevealGroup className="mx-auto max-w-3xl">
        <RevealItem>
          <div className="rounded-2xl border border-cream-deep px-6 py-7 sm:px-9 sm:py-9">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                {eyebrow}
              </p>
            )}

            <h2
              id="limits-title"
              className={`font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-gray-900 sm:text-[26px] ${
                eyebrow ? 'mt-3' : ''
              }`}
            >
              {title}
              {/* Meme sur ce bloc, l'or de titre reste `gold-deep` : le texte
                  fait moins de 24 px une fois sous le point de rupture. */}
              {accent && <span className="text-gold-deep"> {accent}</span>}
            </h2>

            <ul className="mt-7 border-t border-cream-border">
              {items.map((item) => (
                <li
                  key={item.title}
                  className="border-b border-cream-border py-4 last:border-b-0 last:pb-0"
                >
                  <p className="text-[16px] font-semibold leading-[1.45] text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-[1.65] text-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
