import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

type Cta = {
  label: string
  href: string
}

/**
 * Bandeau d'ouverture des pages secondaires (Société / Ressources).
 * Fond sombre dégradé, pastille d'éyebrow, titre à accent doré, 2 CTA.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string
  title: string
  /** Fin du titre, rendue en doré. */
  accent?: string
  description: string
  primaryCta?: Cta
  secondaryCta?: Cta
}) {
  return (
    <section className="relative overflow-hidden bg-dark pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      {/* dégradé + halos */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% -10%, rgba(218,162,80,0.18) 0%, transparent 60%), radial-gradient(ellipse at 15% 110%, rgba(218,162,80,0.08) 0%, transparent 55%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <RevealGroup
        trigger="mount"
        className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-5 text-center sm:px-7 lg:px-8"
      >
        <RevealItem
          className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold sm:text-[11px]"
        >
          <span className="h-[6px] w-[6px] rounded-full bg-gold" />
          {eyebrow}
        </RevealItem>

        <RevealItem
          className="mt-6 font-display text-[32px] font-black leading-[1.06] tracking-[-0.04em] text-white sm:text-[44px] lg:text-[56px]"
        >
          {title}
          {accent && <span className="text-gold"> {accent}</span>}
        </RevealItem>

        <RevealItem
          className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-white/60 sm:text-[16px]"
        >
          {description}
        </RevealItem>

        {(primaryCta || secondaryCta) && (
          <RevealItem
            className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-bold text-dark shadow-[0_14px_36px_rgba(218,162,80,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-gold-400"
              >
                {primaryCta.label}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-semibold text-white/85 transition-all duration-300 hover:border-gold/40 hover:text-white"
              >
                {secondaryCta.label}
                <ChevronRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
          </RevealItem>
        )}
      </RevealGroup>
    </section>
  )
}
