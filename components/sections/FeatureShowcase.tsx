import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import HeadingRule from '@/components/ui/HeadingRule'
import OpenRing, { type RingTone } from '@/components/ui/OpenRing'
import SectionHeading from '@/components/ui/SectionHeading'

/**
 * Liste annotee dans le registre or et sombre.
 *
 * Meme traitement que les secteurs et les valeurs : le cadre blanc disparait
 * au profit d'un anneau et d'un filet. Des cartes qui ne different que par
 * leur icone facturent une bordure et une ombre pour porter un paragraphe —
 * le lecteur compte des boites au lieu de lire.
 *
 * Ici toutes les entrees partagent le meme ton : ce sont les facettes d'une
 * seule chose — une equipe, un parcours — et non des categories a
 * distinguer. C'est ce qui separe ce composant de ValuesShowcase, ou chaque
 * entree porte sa propre couleur parce qu'elle se tient seule.
 *
 * `href` est optionnel, entree par entree : une competence ne mene nulle
 * part, une etape suivante si. Le libelle du lien vit sur l'entree et non sur
 * la section, parce que deux entrees voisines n'invitent pas au meme geste
 * (« Lire les reponses », « Planifier une demo »).
 *
 * Pas de 'use client' : aucun etat.
 */

const TONE: RingTone = {
  arc: 'stroke-gold/50',
  dot: 'bg-gold',
  glow: 'bg-gold-100/60',
  icon: 'text-gold',
  disc: 'bg-dark',
}

/** Taille de l'anneau, plus le grossissement au survol des entrees liees. */
const RING = 'h-[68px] w-[68px] transition-transform duration-base ease-smooth group-hover:scale-105 group-focus-visible:scale-105 sm:h-[76px] sm:w-[76px]'

/**
 * Classes de colonnes, ecrites en toutes lettres : le JIT de Tailwind lit le
 * source et ne generait pas une classe assemblee a l'execution.
 */
const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
} as const

export type Feature = {
  icon: LucideIcon
  title: string
  desc: string
  /** Absent, l'entree n'est pas cliquable. */
  href?: string
  /** Libelle du lien. Ignore sans `href`. */
  cta?: string
}

export default function FeatureShowcase({
  badge = null,
  title,
  accent,
  subtitle,
  features,
  columns = 3,
}: {
  badge?: string | null
  title: string
  accent?: string
  subtitle?: string
  features: readonly Feature[]
  columns?: keyof typeof COLUMNS
}) {
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
        className={`mt-12 grid gap-x-10 gap-y-12 lg:mt-16 lg:gap-x-14 ${COLUMNS[columns]}`}
        stagger={0.06}
      >
        {features.map((feature) => {
          const body = (
            <>
              <OpenRing icon={feature.icon} tone={TONE} className={RING} />

              {/* FILET + TEXTE — le trait tient la colonne a la place du
                  cadre, le tiret separe le titre de son explication. */}
              <div className="flex-1 border-l border-gold/25 pb-1 pl-5">
                <h3 className="text-[16.5px] font-bold tracking-[-0.02em] text-dark sm:text-[17.5px]">
                  {feature.title}
                </h3>

                <span aria-hidden className="mt-3 block h-[2px] w-7 rounded-full bg-gold" />

                <p className="mt-3 text-[13.5px] leading-[1.7] text-stone-600">
                  {feature.desc}
                </p>

                {feature.href && feature.cta && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-ink">
                    {feature.cta}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
                    />
                  </span>
                )}
              </div>
            </>
          )

          return (
            <RevealItem key={feature.title}>
              {feature.href ? (
                <Link
                  href={feature.href}
                  className="group flex h-full items-start gap-4 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep sm:gap-5"
                >
                  {body}
                </Link>
              ) : (
                <div className="flex h-full items-start gap-4 sm:gap-5">{body}</div>
              )}
            </RevealItem>
          )
        })}
      </RevealGroup>
    </>
  )
}
