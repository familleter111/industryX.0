import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import BlockHeading from '@/components/ui/BlockHeading'
import IconTile from '@/components/ui/IconTile'
import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PRIMARY_CTA } from '@/content/shared'
import type { BlockImage, Cta, Outcome, OutcomesContent } from '@/content/types'

/**
 * Bandeau sombre des resultats.
 *
 * Seconde facon de rendre un `OutcomesContent`, a cote de `OutcomeMetrics`.
 * Celui-la pose une carte sombre sur une section claire ; celui-ci retourne le
 * rapport — toute la section passe au noir. C'est le seul aplat sombre d'une
 * page de rubrique.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  DEUX FORMES
 * ─────────────────────────────────────────────────────────────────────────
 *
 *   - sans image : titre a gauche, les trois chiffres en colonnes a droite.
 *     Forme par defaut, et la plus courte — un bandeau, pas une section.
 *   - avec image : l'illustration a droite et les chiffres dans une carte
 *     claire qui en chevauche le bas. Deux fois plus haut, a reserver aux
 *     pages qui n'ont rien d'autre a montrer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  IL OUVRE SA PROPRE SECTION
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Pas de prop `nested`, contrairement aux autres blocs : imbrique dans un
 * `SectionStack` clair, il perdrait son fond et tout son texte blanc
 * deviendrait illisible. Il compte donc pour une des quatre sections de la
 * page a lui seul.
 *
 * L'or reprend la main sur le bouton : sur fond sombre il est a 8,56:1 et
 * c'est bien une action. Le noir profond du bouton primaire des sections
 * claires disparaitrait ici.
 */
export default function MetricsShowcase({
  title,
  accent,
  subtitle,
  items,
  image,
  cta = PRIMARY_CTA,
  eyebrow = 'Résultats',
}: OutcomesContent & {
  /**
   * Illustration posee a droite. Sans elle, le bandeau prend sa forme
   * compacte : titre a gauche, les trois chiffres en colonnes a droite.
   */
  image?: BlockImage
  /** Bouton du bandeau. Par defaut la demonstration, comme dans le hero. */
  cta?: Cta
  eyebrow?: string
}) {
  return (
    <Section background="dark" labelledBy="outcomes-title">
      {/* Liseré doré en tête du bandeau, comme sur les cartes sombres. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <RevealGroup
        className={
          image
            ? // Pas de `items-center` : la colonne de droite fait deux fois la
              // hauteur de la gauche, et centrer celle-ci la ferait flotter au
              // milieu d'un metre de noir. Elle occupe donc toute la hauteur,
              // titre en haut et bouton en bas.
              'grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16'
            : 'grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center lg:gap-14'
        }
      >
        <div className={image ? 'lg:flex lg:flex-col' : undefined}>
          <BlockHeading
            id="outcomes-title"
            eyebrow={eyebrow}
            title={title}
            accent={accent}
            subtitle={subtitle}
            tone="dark"
          />

          {cta && (
            <RevealItem className={image ? 'mt-9 lg:mt-auto lg:pt-12' : 'mt-9'}>
              <Link
                href={cta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-semibold text-dark transition-colors duration-base ease-smooth hover:bg-gold-400"
              >
                {cta.label}
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden
                  className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
                />
              </Link>
            </RevealItem>
          )}
        </div>

        {image ? (
          <div>
            <RevealItem variant="in">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 460px, 100vw"
                className="h-auto w-full rounded-2xl"
              />
            </RevealItem>

            {/* La carte chevauche le bas de l'image plutot que de se poser a
                cote : deux colonnes de plus dans une section deja en deux
                colonnes reduiraient les chiffres a une largeur ou ils ne se
                lisent plus. La marge negative est bornee au grand ecran, sinon
                elle mange l'image sur un telephone. */}
            <RevealItem className="relative z-10 -mt-10 sm:ml-8 lg:-mt-16 lg:ml-12">
              <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-ink">
                  {eyebrow}
                </p>

                {/* Une <ul> et non une <dl>, contrairement a
                    `OutcomeMetrics`. Un chiffre porte ici quatre champs —
                    valeur, libelle, detail, provenance — la ou une liste de
                    definitions n'admet que des paires terme / description.
                    Forcer les quatre dans une <dl> produit un groupe invalide,
                    et un lecteur d'ecran annonce alors des appariements qui
                    n'existent pas. */}
                <ul className="mt-5 divide-y divide-cream-border">
                  {items.map((item) => (
                    <li key={item.label} className="py-4 first:pt-0 last:pb-0">
                      <MetricBody item={item} tone="light" />
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          </div>
        ) : (
          <ul className="grid gap-10 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-white/10">
            {items.map((item, index) => (
              <RevealItem
                key={item.label}
                as="li"
                className={index > 0 ? 'sm:pl-8' : undefined}
              >
                {item.icon && (
                  <IconTile icon={item.icon} tone="dark" className="mb-5" />
                )}
                <MetricBody item={item} tone="dark" />
              </RevealItem>
            ))}
          </ul>
        )}
      </RevealGroup>
    </Section>
  )
}

/**
 * Le contenu d'un chiffre, identique dans les deux formes du bandeau.
 *
 * Ecrit une fois : les deux variantes ne different que par leurs couleurs, et
 * dupliquer les quatre champs aurait garanti qu'une correction sur l'un des
 * deux rendus finisse par manquer a l'autre.
 */
function MetricBody({ item, tone }: { item: Outcome; tone: 'light' | 'dark' }) {
  const dark = tone === 'dark'

  return (
    <>
      <p
        className={
          dark
            ? 'font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-white [hyphens:none] sm:text-[30px]'
            : 'font-display text-[28px] font-semibold leading-none tracking-[-0.03em] text-gray-900'
        }
      >
        {item.value}
      </p>

      <p
        className={
          dark
            ? 'mt-3 text-[14px] font-medium leading-[1.5] text-white/80'
            : 'mt-2 text-[14px] font-medium leading-[1.5] text-gray-900'
        }
      >
        {item.label}
      </p>

      {item.detail && (
        <p
          className={
            dark
              ? 'mt-2 text-[13px] leading-[1.6] text-white/55'
              : 'mt-1.5 text-[13px] leading-[1.6] text-muted'
          }
        >
          {item.detail}
        </p>
      )}

      {/* Un chiffre affirme sans origine verifiable est une allegation. On dit
          laquelle des deux on montre. Sur fond sombre, `white/60` et non
          `/40` : a 40 % le blanc ne donne que 3,81:1, sous le seuil. */}
      <p
        className={
          dark
            ? 'mt-3 text-[10px] uppercase tracking-[0.12em] text-white/60'
            : 'mt-2.5 text-[10px] uppercase tracking-[0.12em] text-subtle'
        }
      >
        {item.source ?? 'Objectif de déploiement — à valider'}
      </p>
    </>
  )
}
