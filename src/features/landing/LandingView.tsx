/**
 * Page d'atterrissage d'une campagne (/lp/<slug>) : un message, trois
 * bénéfices, les verbatims validés, et un seul appel à l'action, répété en
 * fin de page. Composant serveur ; la langue vient de la page.
 *
 * Les clics sont suivis par AnalyticsProvider : `data-cta` donne
 * l'identifiant (`landing_<slug>`, ou `entiwin_lp_<slug>` vers Enti Win, qui
 * emporte alors la source de la visite), `data-cta-location` la zone.
 */

import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react'

import Footer from '@/components/layout/Footer'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { Link, homeAnchorHref } from '@/i18n/navigation'
import { ENTIWIN_PATH, entiwinHref } from '@/lib/data/entiwin'
import type { LandingPage } from '@/lib/data/landings'
import type { Testimonial } from '@/lib/data/testimonials'
import type { Locale } from '@/lib/i18n'
import { ROUTES } from '@/lib/routes'

const COPY = {
  fr: {
    discoverCipa: 'Découvrir CIPA',
    discoverEntiwin: 'En savoir plus sur Enti Win',
    newTab: ' (nouvel onglet)',
    closing: 'Prêt à voir ce que cela change chez vous ?',
    closingText: 'Un échange suffit pour partir de vos processus et de vos contraintes réelles.',
  },
  en: {
    discoverCipa: 'Discover CIPA',
    discoverEntiwin: 'Learn more about Enti Win',
    newTab: ' (new tab)',
    closing: 'Ready to see what it changes for you?',
    closingText: 'One conversation is enough to start from your real processes and constraints.',
  },
}

function PrimaryCta({ page, locale, className }: { page: LandingPage; locale: Locale; className: string }) {
  const content = (
    <>
      {page.ctaLabel}
      {page.target === 'entiwin' ? (
        <>
          <ExternalLink size={16} aria-hidden="true" />
          <span className="sr-only">{COPY[locale].newTab}</span>
        </>
      ) : (
        <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )
  if (page.target === 'entiwin')
    return (
      <a
        href={entiwinHref(`lp_${page.slug}`)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={`entiwin_lp_${page.slug}`}
        className={className}
      >
        {content}
      </a>
    )
  return (
    <Link href={page.target === 'contact' ? ROUTES.contact : ROUTES.demo} data-cta={`landing_${page.slug}`} className={className}>
      {content}
    </Link>
  )
}

const PRIMARY =
  'group inline-flex items-center justify-center gap-3 rounded-full bg-dark px-7 py-4 text-[14px] font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-black'

export default function LandingView({
  page,
  locale,
  testimonials,
}: {
  page: LandingPage
  locale: Locale
  testimonials: Testimonial[]
}) {
  const t = COPY[locale]
  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-body text-dark selection:bg-gold/30">
      {/* 1. MESSAGE DE LA CAMPAGNE */}
      <section data-cta-location="landing_hero" className="relative overflow-hidden bg-white pb-16 pt-[calc(82px+3.5rem)] sm:pb-20">
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-7">
          {page.eyebrow && (
            <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
              {page.eyebrow}
            </p>
          )}
          <h1 className="mt-6 font-display text-[34px] font-black leading-[1.08] tracking-[-0.02em] text-dark sm:text-[46px] lg:text-[54px]">
            {page.title}
          </h1>
          {page.intro && (
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.75] text-subtle sm:text-[17px]">{page.intro}</p>
          )}
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <PrimaryCta page={page} locale={locale} className={PRIMARY} />
            <Link
              href={page.target === 'entiwin' ? ENTIWIN_PATH : homeAnchorHref(ROUTES.cipa)}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-7 py-4 text-[14px] font-semibold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-gold"
            >
              {page.target === 'entiwin' ? t.discoverEntiwin : t.discoverCipa}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BÉNÉFICES */}
      {page.benefits.length > 0 && (
        <section className="border-y border-stone-200 bg-stone-50 py-14 sm:py-16">
          <ul className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-7 md:grid-cols-3 lg:px-8">
            {page.benefits.map((benefit) => (
              <li key={benefit.title} className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
                <CheckCircle2 size={22} aria-hidden="true" className="text-gold-deep" />
                <h2 className="mt-4 font-display text-[19px] font-bold leading-snug text-dark">{benefit.title}</h2>
                {benefit.text && <p className="mt-2 text-[14px] leading-relaxed text-subtle">{benefit.text}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 3. PREUVE : les verbatims validés seulement (lib/cms/testimonials.ts) */}
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}

      {/* 4. RAPPEL DE L'APPEL À L'ACTION */}
      <section data-cta-location="landing_closing" className="relative overflow-hidden bg-dark py-20 text-white">
        <div className="absolute inset-0 bg-mesh-dark opacity-30" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">{t.closing}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">{t.closingText}</p>
          <div className="mt-9 flex justify-center">
            <PrimaryCta
              page={page}
              locale={locale}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-dark shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
