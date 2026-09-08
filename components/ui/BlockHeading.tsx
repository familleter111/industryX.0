import clsx from 'clsx'

import { RevealItem } from '@/components/ui/Reveal'

/**
 * En-tete des sections marketing.
 *
 * Distinct de `SectionHeading`, qui sert la page d'accueil : celui-ci est
 * cale a gauche et en poids semi-gras, pas centre et en `font-black`. Une
 * page de rubrique se lit de haut en bas, un paragraphe apres l'autre ; un
 * titre centre de 52 px toutes les deux sections transforme cette lecture en
 * succession d'affiches.
 *
 * Toujours rendu dans un `RevealGroup` parent, d'ou `RevealItem` : le titre
 * entre avec le contenu qu'il annonce, jamais avant lui.
 *
 * Le `id` est obligatoire — c'est lui que la <section> designe en
 * `aria-labelledby` pour exister comme repere.
 */
export default function BlockHeading({
  id,
  eyebrow,
  title,
  accent,
  subtitle,
  tone = 'light',
  as: Heading = 'h2',
  className,
}: {
  id: string
  eyebrow?: string
  title: string
  /** Fin du titre, rendue en or. */
  accent?: string
  subtitle?: string
  tone?: 'light' | 'dark'
  as?: 'h2' | 'h3'
  className?: string
}) {
  const dark = tone === 'dark'

  return (
    <RevealItem className={clsx('max-w-2xl', className)}>
      {eyebrow && (
        <p
          className={clsx(
            'text-[11px] font-semibold uppercase tracking-[0.16em]',
            // L'or de marque tombe a 2,04:1 sur creme : sous 18,66 px, c'est
            // `gold-ink` (4,63:1) et rien d'autre.
            dark ? 'text-gold' : 'text-gold-ink',
          )}
        >
          {eyebrow}
        </p>
      )}

      <Heading
        id={id}
        className={clsx(
          'font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[32px] lg:text-[38px]',
          eyebrow && 'mt-3',
          dark ? 'text-white' : 'text-gray-900',
        )}
      >
        {title}
        {/* Texte large (>= 24 px) : `gold-deep` tient le seuil de 3:1 sur
            creme, la ou `gold` echouerait. */}
        {accent && (
          <span className={dark ? 'text-gold' : 'text-gold-deep'}> {accent}</span>
        )}
      </Heading>

      {subtitle && (
        <p
          className={clsx(
            'mt-4 text-[16px] leading-[1.7]',
            dark ? 'text-white/60' : 'text-muted',
          )}
        >
          {subtitle}
        </p>
      )}
    </RevealItem>
  )
}
