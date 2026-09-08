import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'

import Section, { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PRIMARY_CTA, SECONDARY_CTA } from '@/content/shared'
import type { HeroContent } from '@/content/types'

/**
 * Ouverture des pages de rubrique : eyebrow, H1, deux lignes, deux CTA, trois
 * micro-preuves.
 *
 * Fond clair, contrairement au `PageHero` sombre des pages Societe et
 * Ressources. Ces pages-la racontent une entreprise ; celles-ci vendent un
 * produit a un directeur d'usine qui va lire six sections a la suite. Ouvrir
 * en noir puis enchainer en creme cree une rupture au premier defilement,
 * juste la ou l'on veut qu'il continue.
 *
 * Le bouton primaire est noir et non dore : sur fond clair, l'or de marque
 * plafonne a 2,04:1 et ne peut porter ni texte ni surface d'action. Il
 * reprend la main sur les fonds sombres — cartes sombres, pied de page.
 *
 * Deux formes selon qu'une illustration est fournie : colonne unique par
 * defaut, deux colonnes avec l'image a droite. Le texte reste premier dans le
 * document dans les deux cas — l'ordre de lecture et l'ordre du clavier
 * suivent le DOM, pas la grille, et le titre doit venir avant sa vignette.
 *
 * Un seul <h1> par page, il est ici.
 */
export default function MarketingHero({
  eyebrow,
  badge,
  title,
  accent,
  description,
  proofs,
  primaryCta = PRIMARY_CTA,
  secondaryCta = SECONDARY_CTA,
  image,
  nested = false,
}: HeroContent & { nested?: boolean }) {
  return (
    <Section
      background="cream"
      nested={nested}
      labelledBy="hero-title"
      // Degagement de la navbar, qui est `fixed`. Imbrique, le hero est le
      // premier bloc d'une section hote : c'est elle qui porte ce padding,
      // sinon il s'ajouterait au sien.
      className={nested ? undefined : NAVBAR_CLEARANCE}
    >
      <div
        className={
          image
            ? 'grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16'
            : undefined
        }
      >
        <RevealGroup
          trigger="mount"
          className={image ? 'max-w-2xl' : 'max-w-3xl'}
        >
          <RevealItem className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.08] px-3.5 py-1.5">
              <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-gold" />
              {/* `gold-800` et non `gold-ink` : le contrat de contraste de
                  `gold-ink` est mesure sur creme et sur blanc, pas sur une
                  surface deja teintee d'or. Les 8 % de `bg-gold/[0.08]`
                  assombrissent le fond juste assez pour faire tomber le rapport
                  a 4,40:1, sous le seuil de 4,5:1 exige a 11 px. `gold-800` y
                  est a 6,24:1, et c'est deja la couleur de la pastille voisine.
                  Voir la note sous `gold.ink` dans lib/tokens.ts. */}
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-800">
                {eyebrow}
              </span>
            </span>

            {/* Meme pastille que dans le mega menu, aux memes couleurs : le
                lecteur qui arrive depuis le menu doit reconnaitre le marqueur
                qu'il vient de cliquer. */}
            {badge && (
              <span className="rounded-full bg-gold-tint px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-gold-800">
                {badge}
              </span>
            )}
          </RevealItem>

          <RevealItem>
            <h1
              id="hero-title"
              className="mt-6 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[46px] lg:text-[56px]"
            >
              {title}
              {accent && <span className="text-gold-deep"> {accent}</span>}
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.75] text-muted sm:text-[17px]">
              {description}
            </p>
          </RevealItem>

          <RevealItem className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-dark px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-base ease-smooth hover:bg-black"
            >
              {primaryCta.label}
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                aria-hidden
                className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
              />
            </Link>

            <Link
              href={secondaryCta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-cream-deep bg-white px-6 py-3.5 text-[14px] font-semibold text-stone-700 transition-colors duration-base ease-smooth hover:border-gold hover:text-gold-ink"
            >
              {secondaryCta.label}
              <ChevronRight
                size={16}
                strokeWidth={1.75}
                aria-hidden
                className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
              />
            </Link>
          </RevealItem>

          {/* Trois faits, pas trois slogans. Une liste et non trois <div> :
              la synthese vocale annonce « liste de 3 elements », ce qui est
              exactement l'information portee par la mise en forme. */}
          <RevealItem>
            <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {proofs.map((proof) => (
                <li key={proof} className="flex items-start gap-2.5">
                  {/* Le vert ne signale qu'une validation — ici, un point
                      acquis. C'est son seul emploi autorise. */}
                  <Check
                    size={16}
                    strokeWidth={2}
                    aria-hidden
                    className="mt-[3px] shrink-0 text-green-600"
                  />
                  <span className="text-[14px] leading-[1.6] text-muted">
                    {proof}
                  </span>
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>

        {image && (
          <Reveal variant="in" trigger="mount">
            <figure>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full rounded-2xl"
              />

              {/* La mention n'est pas decorative : sans elle, les chiffres
                  visibles sur la capture se lisent comme des resultats
                  constates. */}
              {image.caption && (
                <figcaption className="mt-3 text-[13px] leading-[1.6] text-subtle">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
