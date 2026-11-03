import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ArrowLeft, ArrowRight, CalendarCheck, Clock, Lightbulb } from 'lucide-react'

import TrackOnMount from '@/components/analytics/TrackOnMount'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import GuideCard from '@/features/resources/GuideCard'
import SubscribeBand from '@/features/resources/SubscribeBand'
import { loadGuides } from '@/lib/cms/guides'
import { categoryLabel, formatGuideDate, type GuideBlock, type GuideLink } from '@/lib/data/guides'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo/metadata'
import { HOME_CRUMB, articleSchema, breadcrumbSchema } from '@/lib/seo/schema'

const COPY = {
  fr: {
    breadcrumb: 'Fil d’Ariane',
    readingTime: 'min de lecture',
    published: 'Publié le',
    updated: 'Mis à jour le',
    asideTitle: 'Voir CIPA appliqué à votre contexte',
    asideText: '45 minutes avec un expert, centrées sur vos enjeux et vos processus.',
    demo: 'Planifier une démo',
    next: ['À lire', 'ensuite'],
  },
  en: {
    breadcrumb: 'Breadcrumb',
    readingTime: 'min read',
    published: 'Published',
    updated: 'Updated',
    asideTitle: 'See CIPA applied to your context',
    asideText: '45 minutes with an expert, focused on your challenges and your processes.',
    demo: 'Book a demo',
    next: ['Read', 'next'],
  },
}

type Params = { params: { slug: string; locale: Locale } }

/* ============================================================
   ROUTAGE — guides connus générés au build ; un guide publié
   ensuite dans le CMS est rendu à sa première visite, un slug
   inconnu répond 404 (notFound)
   ============================================================ */

export async function generateStaticParams() {
  return (await loadGuides('fr')).map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const guide = (await loadGuides(params.locale)).find((candidate) => candidate.slug === params.slug)
  if (!guide) return {}

  return pageMetadata({
    locale: params.locale,
    path: `/resources/${guide.slug}`,
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      type: 'article',
      publishedTime: guide.date,
      modifiedTime: guide.updated ?? guide.date,
      authors: [guide.author],
    },
  })
}

/* ============================================================
   CORPS — un rendu par type de bloc (voir lib/data/guides.ts)
   ============================================================ */

/** Texte d'un paragraphe, ses passages `links` rendus en liens. */
function withLinks(text: string, links: GuideLink[] = []) {
  const parts: React.ReactNode[] = []
  let rest = text
  for (const link of links) {
    const at = rest.indexOf(link.text)
    if (at < 0) continue
    parts.push(
      rest.slice(0, at),
      <Link
        key={link.href}
        href={link.href}
        className="font-semibold text-gold-ink underline decoration-gold/40 underline-offset-[3px] transition-colors hover:decoration-gold"
      >
        {link.text}
      </Link>,
    )
    rest = rest.slice(at + link.text.length)
  }
  parts.push(rest)
  return parts
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="mt-12 font-display text-[21px] font-black leading-[1.25] tracking-[-0.03em] text-[#111827] sm:text-[24px]">
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p className="mt-5 text-[15.5px] leading-[1.85] text-stone-700 sm:text-[16.5px]">
          {withLinks(block.text, block.links)}
        </p>
      )
    case 'list':
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[15.5px] leading-[1.75] text-stone-700 sm:text-[16.5px]"
            >
              <span
                aria-hidden="true"
                className="mt-[11px] h-[6px] w-[6px] shrink-0 rounded-full bg-gold"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <aside className="mt-8 flex gap-4 rounded-2xl border-l-[3px] border-gold bg-[#FCF9F2] px-5 py-5 sm:px-6">
          <Lightbulb size={20} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
          <p className="text-[15px] font-semibold leading-[1.7] text-[#111827] sm:text-[16px]">
            {block.text}
          </p>
        </aside>
      )
  }
}

/* ============================================================
   PAGE
   ============================================================ */

export default async function GuidePage({ params }: Params) {
  setRequestLocale(params.locale)
  const { locale } = params
  // Composant asynchrone : pas de hook (useCopy), la langue vient des paramètres.
  const t = COPY[locale]
  const guides = await loadGuides(locale)
  const guide = guides.find((candidate) => candidate.slug === params.slug)
  if (!guide) notFound()

  // Guides de la meme categorie d'abord, puis les plus recents.
  const others = guides.filter((other) => other.slug !== guide.slug)
    .sort(
      (a, b) =>
        Number(b.category === guide.category) - Number(a.category === guide.category) ||
        b.date.localeCompare(a.date),
    )
    .slice(0, 3)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">
      <JsonLd
        data={[
          articleSchema(guide, locale),
          breadcrumbSchema(locale, [
            HOME_CRUMB[locale],
            { name: 'Guides & insights', path: '/resources' },
            { name: guide.title, path: `/resources/${guide.slug}` },
          ]),
        ]}
      />
      <TrackOnMount event="guide_viewed" properties={{ slug: guide.slug, category: guide.category }} />
      <article>
        {/* ==================== EN-TÊTE ==================== */}
        <header className="mx-auto max-w-[1080px] px-5 pt-[calc(82px+2.5rem)] sm:px-7 lg:px-8 lg:pt-[calc(82px+3.5rem)]">
          <nav aria-label={t.breadcrumb} className="text-[13px] text-subtle">
            <Link
              href="/resources"
              className="group inline-flex items-center gap-1.5 font-semibold text-gold-ink hover:underline"
            >
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Guides & insights
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span>{categoryLabel(guide.category, locale)}</span>
          </nav>

          <h1 className="mt-6 max-w-[860px] text-pretty font-display text-[30px] font-black leading-[1.1] tracking-[-0.04em] text-[#111827] sm:text-[40px] lg:text-[46px]">
            {guide.title}
          </h1>

          <p className="mt-5 max-w-[720px] text-[16px] leading-[1.75] text-stone-600 sm:text-[17px]">
            {guide.excerpt}
          </p>

          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-subtle">
            <span className="font-semibold text-stone-800">{guide.author}</span>
            <span>
              {t.published} <time dateTime={guide.date}>{formatGuideDate(guide.date, locale)}</time>
            </span>
            {guide.updated && guide.updated !== guide.date && (
              <span>
                {t.updated}{' '}
                <time dateTime={guide.updated}>{formatGuideDate(guide.updated, locale)}</time>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={13} aria-hidden="true" />
              {guide.readingMinutes} {t.readingTime}
            </span>
          </p>

          <div className="relative mt-9 aspect-[16/9] overflow-hidden rounded-[26px] bg-cream shadow-[0_28px_70px_rgba(15,23,42,0.10)]">
            <Image
              src={guide.image.src}
              alt={guide.image.alt}
              fill
              priority
              sizes="(min-width: 1080px) 1016px, 100vw"
              className="object-cover"
            />
          </div>
        </header>

        {/* ==================== CORPS + ENCART ==================== */}
        <div className="mx-auto grid max-w-[1080px] gap-12 px-5 pb-16 pt-6 sm:px-7 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14 lg:px-8">
          <div className="max-w-[700px]">
            {guide.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          {/* Encart collant : l'action reste a portee pendant la lecture. */}
          <aside className="lg:pt-12">
            <div className="rounded-[24px] bg-[#0C0D12] p-6 lg:sticky lg:top-[110px]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.08] text-gold">
                <CalendarCheck size={18} aria-hidden="true" />
              </span>

              <p className="mt-5 font-display text-[18px] font-black leading-[1.25] tracking-[-0.02em] text-white">
                {t.asideTitle}
              </p>

              <p className="mt-2.5 text-[13px] leading-[1.65] text-white/55">
                {t.asideText}
              </p>

              <Link
                href="/contact"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-[13.5px] font-bold text-[#0C0D12] transition-all duration-300 hover:-translate-y-[1px] hover:bg-gold-400"
              >
                {t.demo}
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {guide.related.href !== '/contact' && (
                <Link
                  href={guide.related.href}
                  className="group mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[13px] font-semibold text-white/85 transition hover:border-gold/40 hover:text-white"
                >
                  {guide.related.label}
                </Link>
              )}
            </div>
          </aside>
        </div>
      </article>

      {/* ==================== À LIRE ENSUITE ==================== */}
      {others.length > 0 && (
        <section className="border-t border-[#EDEBE5] bg-[#F2F1EC] py-16 sm:py-20">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
            <h2 className="font-display text-[24px] font-black tracking-[-0.03em] text-[#111827] sm:text-[30px]">
              {t.next[0]} <span className="text-gold-deep">{t.next[1]}</span>
            </h2>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <GuideCard guide={other} />
                </li>
              ))}
            </ul>

            <div className="mt-14">
              <SubscribeBand source={`/resources/${guide.slug}`} />
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
