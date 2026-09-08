import clsx from 'clsx'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { navItemByHref } from '@/content/shared'
import type { RelatedContent } from '@/content/types'
import { cardSurface } from '@/lib/surface'

/**
 * Maillage interne : des liens vers d'autres pages du site.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI DES CHEMINS, ET NON DES ENTREES RECOPIEES
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le bloc ne recoit que des URL. Le titre, la description et l'icone de
 * chaque entree sont lus dans `NAV_GROUPS` au moment du rendu, donc identiques
 * a ce que le mega menu annonce pour la meme page.
 *
 * Avant ce composant, chaque page qui renvoyait vers deux autres embarquait
 * une quinzaine de lignes pour retrouver ses entrees dans la navigation et
 * lever si elles manquaient — le meme code recopie dans six fichiers de
 * contenu. Il vit desormais dans `navItemByHref`, et un chemin errone casse
 * le build avec le nom du fichier fautif.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  DEUX RENDUS
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - `cards` : une grille de cartes. Ces entrees ne sont pas des arguments
 *     mais des destinations, et un sommaire se balaie en cases plutot qu'en
 *     paragraphes. Filet d'un pixel, pas d'ombre, l'or reserve a l'etat
 *     survole — c'est-a-dire a l'action. Forme par defaut.
 *   - `list` : des lignes separees par des filets, sur une page qui ne veut
 *     aucun encadre. Deux ou trois destinations se lisent aussi bien en
 *     lignes, et le bloc cesse alors de peser autant que les sections qui
 *     portent l'argument.
 *
 * La surface entiere est cliquable dans les deux cas : un lien pose sur le
 * seul titre laisserait l'essentiel inerte, ce qui se paie surtout au doigt.
 */
export default function RelatedPages({
  eyebrow = 'À lire aussi',
  title,
  accent,
  subtitle,
  hrefs,
  variant = 'cards',
  background = 'white',
  nested = false,
  id,
  headingId = 'related-title',
}: RelatedContent & {
  /** Voir le docblock. `cards` par defaut. */
  variant?: 'cards' | 'list'
  background?: 'cream' | 'white'
  nested?: boolean
  /** Ancre de section, pour un lien interne qui viserait ce bloc. */
  id?: string
  /** `id` du <h2>. A changer si la page porte deux blocs de ce type. */
  headingId?: string
}) {
  const items = hrefs.map(navItemByHref)
  const list = variant === 'list'

  return (
    <Section background={background} nested={nested} labelledBy={headingId} id={id}>
      <RevealGroup>
        <BlockHeading
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          subtitle={subtitle}
        />

        <ul
          className={clsx(
            'mt-12',
            list
              ? 'border-t border-cream-border'
              : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {items.map((item) => (
            <RevealItem key={item.href} as="li">
              <Link
                href={item.href}
                className={clsx(
                  'group transition-colors duration-base ease-smooth',
                  list
                    ? 'flex items-center gap-4 border-b border-cream-border py-6 hover:text-gold-ink sm:gap-6'
                    : clsx(
                        'flex h-full flex-col rounded-2xl border border-cream-border p-6 hover:border-gold',
                        cardSurface(background),
                      ),
                )}
              >
                <div
                  className={clsx(
                    'flex items-center gap-3',
                    list ? 'shrink-0' : 'justify-between',
                  )}
                >
                  <IconTile icon={item.icon} size={list ? 'sm' : 'md'} />

                  {item.badge && !list && (
                    <span className="rounded-full bg-gold-tint px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-gold-800">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className={list ? 'min-w-0 flex-1' : 'contents'}>
                  <h3
                    className={clsx(
                      'text-[17px] font-semibold leading-[1.35] text-gray-900',
                      !list && 'mt-5',
                    )}
                  >
                    {item.title}
                    {item.badge && list && (
                      <span className="ml-2 rounded-full bg-gold-tint px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-[0.08em] text-gold-800">
                        {item.badge}
                      </span>
                    )}
                  </h3>

                  <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                    {item.description}
                  </p>
                </div>

                {/* En cartes, `mt-auto` cale ce libelle en bas quelle que soit
                    la longueur de la description : sans lui, les cartes d'une
                    meme ligne alignent leur bordure mais pas leur fleche. En
                    liste, la fleche seule suffit — le libelle repeterait sur
                    chaque ligne un mot que le titre porte deja. */}
                <span
                  className={clsx(
                    'flex items-center gap-1.5 text-[13px] font-semibold text-gold-ink',
                    list ? 'shrink-0' : 'mt-auto pt-5',
                  )}
                >
                  {!list && 'Découvrir'}
                  <ArrowRight
                    size={list ? 16 : 14}
                    strokeWidth={2}
                    aria-hidden
                    className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </ul>
      </RevealGroup>
    </Section>
  )
}
