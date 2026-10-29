import { Link } from '@/i18n/navigation'
import { ArrowRight, ChevronRight } from 'lucide-react'

import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import Footer from '@/components/layout/Footer'
import PlatformHero from '@/features/platform/PlatformHero'
import {
  HowItWorks,
  IncludedFeatures,
  ProofBand,
  UseCases,
} from '@/features/platform/PlatformSections'
import {
  platformHref,
  platformPages,
  type PlatformPageData,
} from '@/lib/data/platform'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

const COPY = {
  fr: {
    pillarsTitle: 'Les sept solutions',
    pillarsSubtitle:
      'Structurer la donnée terrain, orchestrer les processus qualité, piloter la performance : sept solutions, une seule plateforme.',
    here: 'Vous êtes ici',
    discover: 'Découvrir',
    ctaTitle: 'Voyons ce que CIPA peut',
    ctaTitleEnd: 'chez vous',
    ctaLead: 'Une démonstration de 45 minutes, centrée sur vos processus, vos enjeux et votre secteur.',
    ctaDemo: 'Demander une démo',
    ctaCases: 'Voir les cas clients',
  },
  en: {
    pillarsTitle: 'The seven solutions of',
    pillarsSubtitle:
      'Structure shop-floor data, orchestrate quality processes, drive performance: seven solutions, one platform.',
    here: 'You are here',
    discover: 'Explore',
    ctaTitle: 'Let’s see what CIPA can',
    ctaTitleEnd: 'for you',
    ctaLead: 'A 45-minute demo focused on your processes, your challenges and your industry.',
    ctaDemo: 'Book a demo',
    ctaCases: 'See customer stories',
  },
}

/**
 * Gabarit commun des sept pages Solution (lib/data/platform.ts).
 *
 * Pas de 'use client' : la donnee contient des icones Lucide, qui ne
 * traversent pas la frontiere serveur / client. Les parties interactives
 * (Reveal, PlatformHero) sont des composants clients qui ne recoivent
 * que des donnees serialisables.
 *
 * Ordre : hero, preuves (si renseignees), usages, trois etapes et elements
 * inclus (si renseignes), solutions, appel final.
 * Les usages portent les ancres visees par le menu et les cartes de
 * l'accueil.
 */

/** Les sept solutions, la page courante signalee. */
function PillarLinks({ current }: { current: string }) {
  const t = useCopy(COPY)
  const pages = platformPages(useCurrentLocale())
  return (
    <Section variant="dense" background="white">
      <SectionHeading
        title={t.pillarsTitle}
        accent="CIPA"
        subtitle={t.pillarsSubtitle}
      />

      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {pages.map((page, index) => {
          const Icon = page.icon
          const isCurrent = page.slug === current
          return (
            <RevealItem key={page.slug}>
              <Link
                href={platformHref(page.slug)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`group flex h-full flex-col rounded-[22px] border p-6 transition-all duration-base ${
                  isCurrent
                    ? 'border-dark bg-dark text-white'
                    : 'border-cream-border bg-cream text-dark hover:-translate-y-[2px] hover:border-gold/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      isCurrent ? 'bg-white/10 text-gold' : 'bg-white text-gold-ink'
                    }`}
                  >
                    <Icon size={19} />
                  </span>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
                      isCurrent ? 'text-gold' : 'text-subtle'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')} · {page.name}
                  </span>
                </div>

                <p className="mt-6 text-[18px] font-bold tracking-[-0.02em]">
                  {page.title}
                </p>
                <p
                  className={`mt-1.5 flex-1 text-[13.5px] leading-[1.6] ${
                    isCurrent ? 'text-white/60' : 'text-stone-600'
                  }`}
                >
                  {page.summary}
                </p>

                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold ${
                    isCurrent ? 'text-white/50' : 'text-gold-ink'
                  }`}
                >
                  {isCurrent ? t.here : t.discover}
                  {!isCurrent && (
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-base group-hover:translate-x-1"
                    />
                  )}
                </span>
              </Link>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}

function ClosingCta({ page }: { page: PlatformPageData }) {
  const t = useCopy(COPY)
  return (
    <Section variant="dense" background="cream">
      <Reveal className="relative overflow-hidden rounded-[30px] bg-dark px-6 py-12 text-center sm:px-10 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[100px]"
        />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="font-display text-[26px] font-black leading-[1.1] tracking-[-0.035em] text-white sm:text-[34px]">
            {t.ctaTitle}{' '}
            <span className="text-gold">{page.title.toLowerCase()}</span>{' '}
            {t.ctaTitleEnd}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-white/60">
            {t.ctaLead}
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-bold text-dark shadow-gold transition-all duration-base hover:-translate-y-[1px] hover:bg-gold-400"
            >
              {t.ctaDemo}
              <ArrowRight
                size={16}
                className="transition-transform duration-base group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/customers"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-semibold text-white/85 transition-all duration-base hover:border-gold/40 hover:text-white"
            >
              {t.ctaCases}
              <ChevronRight
                size={16}
                className="transition-transform duration-base group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default function PlatformPage({ page }: { page: PlatformPageData }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream font-body text-dark selection:bg-gold/30">
      <PlatformHero slug={page.slug} />

      {page.proof && <ProofBand proof={page.proof} />}
      <UseCases page={page} />
      {page.steps && <HowItWorks steps={page.steps} />}
      {page.included && <IncludedFeatures items={page.included} />}

      <PillarLinks current={page.slug} />
      <ClosingCta page={page} />
      <Footer />
    </main>
  )
}
