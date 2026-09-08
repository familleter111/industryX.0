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
 * Maillage interne : une grille de cartes vers d'autres pages du site.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI DES CHEMINS, ET NON DES ENTREES RECOPIEES
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Le bloc ne recoit que des URL. Le titre, la description et l'icone de
 * chaque carte sont lus dans `NAV_GROUPS` au moment du rendu, donc identiques
 * a ce que le mega menu annonce pour la meme page.
 *
 * Avant ce composant, chaque page qui renvoyait vers deux autres embarquait
 * une quinzaine de lignes pour retrouver ses entrees dans la navigation et
 * lever si elles manquaient — le meme code recopie dans six fichiers de
 * contenu. Il vit desormais dans `navItemByHref`, et un chemin errone casse
 * le build avec le nom du fichier fautif.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI DES CARTES ICI
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Meme raison que pour la grille des modules de la page pilier, qu'il
 * remplace : ces entrees ne sont pas des arguments mais des destinations, et
 * un sommaire se balaie en cases plutot qu'en paragraphes. Filet d'un pixel,
 * pas d'ombre, l'or reserve a l'etat survole — c'est-a-dire a l'action.
 *
 * La carte entiere est cliquable : un lien pose sur le seul titre laisserait
 * l'essentiel de la surface inerte, ce qui se paie surtout au doigt.
 */
export default function RelatedPages({
  eyebrow = 'À lire aussi',
  title,
  accent,
  subtitle,
  hrefs,
  background = 'white',
  nested = false,
  id,
  headingId = 'related-title',
}: RelatedContent & {
  background?: 'cream' | 'white'
  /** Rendu dans une section deja ouverte par la page. Voir `SectionStack`. */
  nested?: boolean
  /** Ancre de section, pour un lien interne qui viserait ce bloc. */
  id?: string
  /** `id` du <h2>. A changer si la page porte deux blocs de ce type. */
  headingId?: string
}) {
  const items = hrefs.map(navItemByHref)

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

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <RevealItem key={item.href} as="li">
              <Link
                href={item.href}
                className={clsx(
                  'group flex h-full flex-col rounded-2xl border border-cream-border p-6 transition-colors duration-base ease-smooth hover:border-gold',
                  cardSurface(background),
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <IconTile icon={item.icon} />

                  {item.badge && (
                    <span className="rounded-full bg-gold-tint px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-gold-800">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-[17px] font-semibold leading-[1.35] text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-[15px] leading-[1.65] text-muted">
                  {item.description}
                </p>

                {/* `mt-auto` cale ce libelle en bas quelle que soit la longueur
                    de la description : sans lui, les cartes d'une meme ligne
                    alignent leur bordure mais pas leur fleche. */}
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-gold-ink">
                  Découvrir
                  <ArrowRight
                    size={14}
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
