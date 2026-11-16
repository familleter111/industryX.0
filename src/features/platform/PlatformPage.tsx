import { Link } from '@/i18n/navigation'
import { ArrowRight, ChevronRight } from 'lucide-react'

import Section from '@/components/ui/Section'
import Reveal from '@/components/ui/Reveal'
import Footer from '@/components/layout/Footer'
import PlatformHero from '@/features/platform/PlatformHero'
import {
  HowItWorks,
  IncludedFeatures,
  ProofBand,
  UseCases,
} from '@/features/platform/PlatformSections'
import type { PlatformPageData } from '@/lib/data/platform'
import { useCopy } from '@/lib/i18n'
import { ROUTES } from '@/lib/routes'

const COPY = {
  fr: {
    ctaTitle: 'Voyons ce que CIPA peut',
    ctaTitleEnd: 'chez vous',
    ctaLead: 'Une démonstration de 45 minutes, centrée sur vos processus, vos enjeux et votre secteur.',
    ctaDemo: 'Demander une démo',
    ctaCases: 'Voir les cas clients',
  },
  en: {
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
 * inclus (si renseignes), appel final. Les autres solutions restent
 * accessibles par le menu Plateforme.
 * Les usages portent les ancres visees par le menu et les cartes de
 * l'accueil.
 */

function ClosingCta({ page }: { page: PlatformPageData }) {
  const t = useCopy(COPY)
  return (
    // Fond alterne avec la section precedente : creme apres des sections
    // blanches, blanc apres « Elements inclus » (creme).
    <Section variant="dense" background={page.included ? 'white' : 'cream'}>
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
              href={ROUTES.demo}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-bold text-dark shadow-gold transition-all duration-base hover:-translate-y-[1px] hover:bg-gold-400"
            >
              {t.ctaDemo}
              <ArrowRight
                size={16}
                className="transition-transform duration-base group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={ROUTES.customers}
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

      <ClosingCta page={page} />
      <Footer />
    </main>
  )
}
