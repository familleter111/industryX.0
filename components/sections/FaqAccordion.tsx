import { ChevronDown } from 'lucide-react'

import BlockHeading from '@/components/ui/BlockHeading'
import JsonLd from '@/components/ui/JsonLd'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { faqPageLd } from '@/lib/seo'
import type { FaqContent } from '@/content/types'

/**
 * Les quatre questions de la page, en accordeon.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI <details> ET NON UN ETAT REACT
 * ─────────────────────────────────────────────────────────────────────────
 *
 * L'accordeon de /faq est un composant client : `useState`, `AnimatePresence`,
 * et une animation de `height` — la propriete que lib/motion.ts interdit
 * explicitement, parce qu'elle declenche un layout a chaque image.
 *
 * `<details>` / `<summary>` fait le meme travail sans rien de tout cela :
 *
 *   - Entree et Espace ouvrent et ferment nativement. Aucun gestionnaire de
 *     touche a ecrire, donc aucun a oublier.
 *   - L'etat ouvert / ferme est expose aux technologies d'assistance par le
 *     navigateur, sans `aria-expanded` a tenir a jour.
 *   - La recherche dans la page (Ctrl+F) trouve le texte des reponses fermees
 *     et ouvre le bloc correspondant. Un panneau demonte par React est
 *     introuvable.
 *   - La section reste rendue sur le serveur : zero JavaScript, et les
 *     reponses sont lisibles avant meme l'hydratation.
 *
 * On perd l'ouverture animee en hauteur. C'est le prix, et il est faible :
 * seule la fleche tourne, en `transform`, ce qui reste conforme a la regle
 * de mouvement.
 *
 * Le balisage FAQPage est emis ici, a partir des memes donnees que le rendu :
 * Google refuse un balisage qui decrit une FAQ que le visiteur ne voit pas,
 * et la seule facon d'en etre sur est que les deux lisent le meme tableau.
 */
export default function FaqAccordion({
  title,
  accent,
  subtitle,
  items,
  background = 'cream',
  nested = false,
}: FaqContent & { background?: 'cream' | 'white'; nested?: boolean }) {
  return (
    <Section background={background} nested={nested} labelledBy="faq-title">
      <JsonLd data={faqPageLd(items)} />

      <RevealGroup>
        <BlockHeading
          id="faq-title"
          eyebrow="Questions fréquentes"
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <div className="mt-12 max-w-3xl border-t border-cream-border">
          {items.map((item) => (
            <RevealItem key={item.question}>
              <details className="group border-b border-cream-border">
                <summary
                  className="
                    flex cursor-pointer list-none items-start justify-between gap-6 py-5
                    text-[16px] font-semibold leading-[1.5] text-gray-900
                    transition-colors duration-fast ease-smooth
                    hover:text-gold-ink
                    [&::-webkit-details-marker]:hidden
                  "
                >
                  {item.question}

                  {/* Seule chose qui bouge : une rotation. Pas de hauteur
                      animee, pas de repaint. */}
                  <ChevronDown
                    size={18}
                    strokeWidth={1.75}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-subtle transition-transform duration-base ease-smooth group-open:rotate-180"
                  />
                </summary>

                <p className="pb-6 pr-10 text-[16px] leading-[1.75] text-muted">
                  {item.answer}
                </p>
              </details>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </Section>
  )
}
