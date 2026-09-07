import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import HeadingRule from '@/components/ui/HeadingRule'
import SectionHeading from '@/components/ui/SectionHeading'
import { tokens } from '@/lib/tokens'

/**
 * Grille des secteurs couverts, en liste annotee.
 *
 * Remplace les cartes qui existaient en double sur /customers et /resources :
 * meme balisage, meme palette, deux copies a maintenir. Une carte par secteur
 * facturait un cadre, une ombre et un fond a chaque entree pour ne porter que
 * trois lignes de texte — six cadres alignes se lisent comme une grille de
 * tuiles, pas comme une liste de secteurs. Ici le cadre disparait : l'anneau
 * porte l'icone, le filet vertical tient la colonne de texte, et le regard
 * suit le texte au lieu de compter les boites.
 *
 * Pas de 'use client' : rien ici n'a d'etat. Seules les entrees au scroll
 * traversent la frontiere, via Reveal.
 */

export type Sector = {
  icon: LucideIcon
  title: string
  desc: string
  href: string
}

/** Ligne de synthese posee sous la grille. `accent` termine la phrase. */
export type SectorsFootnote = {
  icon: LucideIcon
  text: string
  accent: string
}

/**
 * Vert de validation, en valeur brute pour le degrade de l'anneau : une
 * classe Tailwind ne s'interpole pas dans une chaine CSS. C'est green-500,
 * celui que le reste du site consomme via ses classes natives — la valeur
 * n'est ecrite ici que parce que le degrade l'exige.
 */
const GREEN_500 = 'rgb(34 197 94)'
const GOLD = tokens.color.gold.DEFAULT

/**
 * Anneau vert -> or de l'icone.
 *
 * Un degrade porte par le padding du conteneur : le disque blanc interieur
 * masque le centre et ne laisse voir que le liseré. Un `border` ne sait pas
 * prendre de degrade, et un second element positionne couterait un noeud de
 * plus par secteur.
 */
const RING = `linear-gradient(145deg, ${GREEN_500} 0%, ${GOLD} 100%)`

export default function SectorsShowcase({
  badge = null,
  title,
  accent,
  subtitle,
  sectors,
  ctaLabel,
  footnote,
}: {
  badge?: string | null
  title: string
  accent?: string
  subtitle?: string
  sectors: readonly Sector[]
  /** Libelle du lien de chaque secteur — « Découvrir », « Lire la fiche »… */
  ctaLabel: string
  footnote?: SectorsFootnote
}) {
  const FootnoteIcon = footnote?.icon

  return (
    <>
      <SectionHeading
        badge={badge}
        title={title}
        accent={accent}
        subtitle={subtitle}
      />

      <HeadingRule className="mt-9" />

      <RevealGroup
        className="mt-12 grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-12"
        stagger={0.06}
      >
        {sectors.map((sector) => {
          const Icon = sector.icon
          return (
            <RevealItem key={sector.href}>
              <Link
                href={sector.href}
                className="group flex h-full items-start gap-4 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep sm:gap-5"
              >
                {/* ANNEAU + ICONE */}
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full p-[1.5px] transition-transform duration-base ease-smooth group-hover:scale-105 group-focus-visible:scale-105 sm:h-16 sm:w-16"
                  style={{ background: RING }}
                >
                  <span className="grid h-full w-full place-items-center rounded-full bg-white">
                    <Icon
                      size={22}
                      strokeWidth={1.7}
                      className="text-dark transition-colors duration-base ease-smooth group-hover:text-gold-deep"
                    />
                  </span>
                </span>

                {/* FILET + TEXTE — le trait tient la colonne a la place du
                    cadre, la pastille marque son depart a hauteur du titre. */}
                <div className="relative flex-1 border-l border-cream-deep pb-1 pl-5">
                  <span
                    aria-hidden
                    className="absolute -left-[3.5px] top-[7px] h-[7px] w-[7px] rounded-full bg-green-500 transition-colors duration-base ease-smooth group-hover:bg-gold"
                  />

                  <h3 className="text-[15.5px] font-bold tracking-[-0.02em] text-dark">
                    {sector.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-[1.65] text-stone-600">
                    {sector.desc}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-gold-ink">
                    {ctaLabel}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </RevealItem>
          )
        })}
      </RevealGroup>

      {footnote && FootnoteIcon && (
        <Reveal className="mt-14 flex items-center justify-center gap-4 sm:mt-16">
          <span
            aria-hidden
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/70 sm:h-14 sm:w-14"
          >
            <FootnoteIcon size={20} strokeWidth={1.7} className="text-green-600" />
          </span>

          <p className="text-[14px] leading-[1.6] text-stone-600 sm:text-[16px]">
            {footnote.text}{' '}
            <span className="font-semibold text-green-600 underline decoration-green-500/40 decoration-2 underline-offset-4">
              {footnote.accent}
            </span>
            .
          </p>
        </Reveal>
      )}
    </>
  )
}
