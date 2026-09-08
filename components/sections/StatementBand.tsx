import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Section from '@/components/ui/Section'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PRIMARY_CTA } from '@/content/shared'
import type { StatementContent } from '@/content/types'

/**
 * Une affirmation seule sur un aplat sombre.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  POURQUOI PAS UN ENCADRE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Mettre en avant, sur un site, finit presque toujours par vouloir dire
 * « poser un cadre autour ». Un encadre au milieu d'une page se lit pourtant
 * comme un aparte — quelque chose qu'on pourra lire apres, ou pas. C'est
 * exactement l'inverse de ce qu'on cherche pour l'argument central d'une page.
 *
 * L'emphase vient donc de trois choses qu'on ne peut pas sauter : la surface
 * change de couleur sur toute la largeur, le corps du texte passe au-dessus de
 * celui des sections voisines, et il n'y a rien d'autre a regarder dans la
 * section. Le lecteur ne peut pas contourner ce bloc, il peut seulement le
 * lire ou fermer la page.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CE BLOC NE PORTE PAS DE CHIFFRE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Volontairement. Un chiffre pose ici serait le plus visible de la page, donc
 * le premier a etre repris — et le premier a devoir etre defendu. Tant qu'il
 * n'est pas mesure et source, l'argument tient mieux sans lui : « l'ecart est
 * considerable » se discute, « l'ecart est de 62 % » se verifie.
 *
 * Le \`h2\` n'est pas decoratif : la section est nommee par lui, comme toutes les
 * autres. Le corps est en \`white/70\` et non \`/55\` — a cette taille c'est du
 * texte courant, pas une legende, et il doit tenir le seuil de 4,5:1.
 */
export default function StatementBand({
  eyebrow,
  title,
  accent,
  body,
  cta = PRIMARY_CTA,
}: StatementContent) {
  return (
    <Section background="dark" labelledBy="statement-title">
      {/* Liseré doré en tête du bandeau, comme sur les autres surfaces
          sombres du site. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <RevealGroup className="max-w-3xl">
        {eyebrow && (
          <RevealItem>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              {eyebrow}
            </p>
          </RevealItem>
        )}

        <RevealItem>
          <h2
            id="statement-title"
            className="mt-3 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[46px]"
          >
            {title}
            {accent && <span className="text-gold"> {accent}</span>}
          </h2>
        </RevealItem>

        {body.map((paragraph) => (
          <RevealItem key={paragraph}>
            <p className="mt-6 text-[17px] leading-[1.7] text-white/70 sm:text-[18px]">
              {paragraph}
            </p>
          </RevealItem>
        ))}

        {cta && (
          <RevealItem className="mt-10">
            <Link
              href={cta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-[15px] font-semibold text-dark transition-colors duration-base ease-smooth hover:bg-gold-400"
            >
              {cta.label}
              <ArrowRight
                size={17}
                strokeWidth={1.75}
                aria-hidden
                className="transition-transform duration-base ease-smooth group-hover:translate-x-1"
              />
            </Link>
          </RevealItem>
        )}
      </RevealGroup>
    </Section>
  )
}
