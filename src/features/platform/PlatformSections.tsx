import { Link } from '@/i18n/navigation'
import { ArrowRight, Quote } from 'lucide-react'

import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import PlatformCarousel from '@/features/platform/PlatformCarousel'
import type {
  PlatformItem,
  PlatformPageData,
  PlatformProof,
} from '@/lib/data/platform'
import { useCopy } from '@/lib/i18n'

const COPY = {
  fr: {
    howEyebrow: 'Comment ça marche',
    howTitle: 'Opérationnel en trois étapes',
    included: 'Inclus dans chaque usage',
    includedCta: 'Voir CIPA sur vos propres checklists',
  },
  en: {
    howEyebrow: 'How it works',
    howTitle: 'Up and running in three steps',
    included: 'Included in every use case',
    includedCta: 'See CIPA on your own checklists',
  },
}

/**
 * Sections des pages Plateforme, sous le hero.
 *
 * Les quatre usages sont reunis dans une seule section, en carrousel a
 * onglets (PlatformCarousel), comme sur les pages sectorielles. Le
 * carrousel porte les ancres (#audits, #capa…) visees par le menu et les
 * cartes de l'accueil, et ouvre la carte demandee.
 *
 * Pas de 'use client' : les parties interactives (Reveal, PlatformCarousel)
 * sont des composants clients qui ne recoivent que des donnees serialisables.
 * Espacement vertical commun : py-16 md:py-20.
 */

const SECTION_Y = 'py-16 md:py-20'

/* ---------- Bande de preuves ---------- */

/** Rendue seulement si la page fournit des preuves reelles (`page.proof`). */
export function ProofBand({ proof }: { proof: PlatformProof }) {
  return (
    <section className="bg-white py-14 md:py-16">
      <div
        className={`mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:items-center ${
          proof.quote ? 'md:grid-cols-[1.4fr_1fr]' : ''
        }`}
      >
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {proof.stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-gold pl-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-black text-dark">{stat.value}</dd>
              <dd className="mt-1 text-sm text-stone-600">{stat.label}</dd>
            </div>
          ))}
        </dl>

        {proof.quote && (
          <figure className="rounded-2xl bg-cream p-6">
            <Quote className="h-5 w-5 text-gold-ink" />
            <blockquote className="mt-3 text-[15px] leading-relaxed text-dark">
              « {proof.quote.text} »
            </blockquote>
            <figcaption className="mt-3 text-sm text-subtle">{proof.quote.author}</figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}

/* ---------- Usages empiles ---------- */

export function UseCases({ page }: { page: PlatformPageData }) {
  return (
    <section id="usages" className={`scroll-mt-[82px] bg-white ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-ink">
            {page.usesIntro.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.03em] text-dark md:text-4xl">
            {page.usesIntro.title}
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600">{page.usesIntro.lead}</p>
        </Reveal>

        {/* Les quatre usages dans la meme section, en carrousel a onglets :
            meme presentation que les pages sectorielles. */}
        <div className="mt-10">
          <PlatformCarousel slug={page.slug} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Operationnel en trois etapes ---------- */

export function HowItWorks({ steps }: { steps: PlatformItem[] }) {
  const t = useCopy(COPY)
  return (
    <section className={`bg-white ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-ink">{t.howEyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.03em] text-dark">
          {t.howTitle}
        </h2>
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.08}>
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <RevealItem
                key={step.title}
                className="relative rounded-2xl border border-cream-border p-6"
              >
                <span className="absolute right-5 top-5 text-sm font-bold text-stone-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-ink">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-bold text-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.text}</p>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ---------- Inclus dans chaque usage ---------- */

export function IncludedFeatures({ items }: { items: PlatformItem[] }) {
  const t = useCopy(COPY)
  return (
    <section className={`bg-cream ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-black tracking-[-0.03em] text-dark md:text-3xl">
          {t.included}
        </h2>
        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {items.map((item) => {
            const Icon = item.icon
            return (
              <RevealItem key={item.title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-card">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-dark text-gold">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-bold text-dark">{item.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">{item.text}</p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
        <Link
          href="/contact"
          className="group mt-10 inline-flex items-center gap-2 font-semibold text-gold-ink hover:underline"
        >
          {t.includedCta}
          <ArrowRight size={16} className="transition-transform duration-base group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
