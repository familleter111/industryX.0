import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import {
  ArrowRight,
  Car,
  ClipboardCheck,
  Clock,
  Factory,
  ShieldCheck,
  Utensils,
  Zap,
} from 'lucide-react'

import Footer from '@/components/layout/Footer'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import ArchitectureSection from '@/components/sections/ArchitectureSection'
import SectorsShowcase from '@/components/sections/SectorsShowcase'
import GuideCard from '@/features/resources/GuideCard'
import GuidesLibrary from '@/features/resources/GuidesLibrary'
import SubscribeBand from '@/features/resources/SubscribeBand'
import { categoryLabel, formatGuideDate, guidesFor } from '@/lib/data/guides'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

/* ============================================================
   DONNÉES
   ============================================================ */

const SECTOR_LINKS = [
  { icon: ShieldCheck, href: '/industries/pharma' },
  { icon: Utensils, href: '/industries/food' },
  { icon: ClipboardCheck, href: '/industries/cosmetics' },
  { icon: Car, href: '/industries/automotive' },
  { icon: Zap, href: '/industries/electronics' },
  { icon: Factory, href: '/industries/packaging' },
]

const COPY = {
  fr: {
    sectors: [
      ['Pharmaceutique', 'GMP, 21 CFR Part 11, déviations, CAPA et dossier de lot électronique.'],
      ['Agroalimentaire & boissons', 'Sécurité alimentaire, contrôles qualité et traçabilité terrain.'],
      ['Cosmétique & dispositifs médicaux', 'Conformité, inspections et maîtrise documentaire opérationnelle.'],
      ['Automobile & composants', 'Maîtrise process, audits terrain et plans d’action structurés.'],
      ['Électronique & câblage', 'Standards terrain, contrôles process et réduction des écarts.'],
      ['Packaging & plasturgie', 'Suivi production, incidents qualité et amélioration continue.'],
    ],
    badge: 'Ressources',
    lead: 'Des méthodes concrètes pour digitaliser vos audits, structurer le traitement des écarts et piloter la performance industrielle — écrites par nos experts terrain et produit.',
    published: 'guides publiés',
    themes: 'thèmes couverts',
    browse: 'Parcourir les guides',
    featured: 'À la une',
    readingTime: 'min de lecture',
    readGuide: 'Lire le guide',
    allTitle: 'Tous les',
    allAccent: 'guides',
    allSubtitle: 'Des formats courts et opérationnels, à lire en moins de dix minutes.',
    sectorsTitle: 'Analyses',
    sectorsAccent: 'sectorielles',
    sectorsSubtitle: 'Les enjeux, les référentiels et les cas d’usage CIPA, détaillés pour chacun des six secteurs que nous couvrons.',
    sectorsCta: 'Lire la fiche',
  },
  en: {
    sectors: [
      ['Pharmaceuticals', 'GMP, 21 CFR Part 11, deviations, CAPA and electronic batch records.'],
      ['Food & beverage', 'Food safety, quality checks and shop-floor traceability.'],
      ['Cosmetics & medical devices', 'Compliance, inspections and operational document control.'],
      ['Automotive & components', 'Process control, shop-floor audits and structured action plans.'],
      ['Electronics & wiring', 'Shop-floor standards, process checks and fewer deviations.'],
      ['Packaging & plastics', 'Production tracking, quality incidents and continuous improvement.'],
    ],
    badge: 'Resources',
    lead: 'Practical methods to digitize your audits, structure deviation handling and manage industrial performance — written by our field and product experts.',
    published: 'guides published',
    themes: 'topics covered',
    browse: 'Browse the guides',
    featured: 'Featured',
    readingTime: 'min read',
    readGuide: 'Read the guide',
    allTitle: 'All',
    allAccent: 'guides',
    allSubtitle: 'Short, practical formats you can read in under ten minutes.',
    sectorsTitle: 'Industry',
    sectorsAccent: 'analyses',
    sectorsSubtitle: 'The challenges, standards and CIPA use cases, detailed for each of the six industries we cover.',
    sectorsCta: 'Read the overview',
  },
}

/* ============================================================
   HERO — titre à gauche, guide à la une à droite

   Tient dans le premier écran sur desktop : navbar 82 + marge 48, colonne
   de droite ~560, marge basse 64. Le guide à la une remplace les deux
   boutons génériques de l'ancien PageHero : le premier clic utile de la
   page est la lecture.
   ============================================================ */

function ResourcesHero() {
  const locale = useCurrentLocale()
  const t = useCopy(COPY)
  const GUIDES = guidesFor(locale)
  const featured = GUIDES.find((guide) => guide.featured) ?? GUIDES[0]
  const themes = new Set(GUIDES.map((guide) => guide.category)).size

  return (
    <section className="relative overflow-hidden bg-dark pb-14 pt-[calc(82px+2.5rem)] sm:pb-16 lg:pb-16 lg:pt-[calc(82px+3rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% -10%, rgba(218,162,80,0.16) 0%, transparent 55%), radial-gradient(ellipse at 90% 110%, rgba(218,162,80,0.08) 0%, transparent 55%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <RevealGroup
        trigger="mount"
        className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-10 px-5 sm:px-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:px-8"
      >
        {/* DISCOURS */}
        <div>
          <RevealItem className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold sm:text-[11px]">
            <span className="h-[6px] w-[6px] rounded-full bg-gold" />
            {t.badge}
          </RevealItem>

          <RevealItem>
            <h1 className="mt-6 font-display text-[34px] font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-[46px] lg:text-[54px]">
              Guides &<span className="text-gold"> insights</span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-white/60 sm:text-[16px]">
              {t.lead}
            </p>
          </RevealItem>

          <RevealItem className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="font-display text-[28px] font-black leading-none text-white">
                {GUIDES.length}
              </p>
              <p className="mt-1.5 text-[12px] text-white/50">{t.published}</p>
            </div>
            <span className="h-10 w-px bg-white/10" aria-hidden="true" />
            <div>
              <p className="font-display text-[28px] font-black leading-none text-white">
                {themes}
              </p>
              <p className="mt-1.5 text-[12px] text-white/50">{t.themes}</p>
            </div>
            <span className="h-10 w-px bg-white/10" aria-hidden="true" />
            <Link
              href="#guides"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-gold transition hover:text-gold-400"
            >
              {t.browse}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </RevealItem>
        </div>

        {/* GUIDE À LA UNE */}
        <RevealItem>
          <Link
            href={`/resources/${featured.slug}`}
            className="group block overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] outline-none transition-all duration-300 hover:border-gold/35 focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-cream">
              <Image
                src={featured.image.src}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-dark">
                {t.featured}
              </span>
            </div>

            <div className="p-6 sm:p-7">
              <p className="flex flex-wrap items-center gap-3 text-[12px] text-white/50">
                <span className="font-bold uppercase tracking-[0.12em] text-gold">
                  {categoryLabel(featured.category, locale)}
                </span>
                <time dateTime={featured.date}>{formatGuideDate(featured.date, locale)}</time>
                <span className="flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" />
                  {featured.readingMinutes} {t.readingTime}
                </span>
              </p>

              <h2 className="mt-3 text-pretty font-display text-[20px] font-black leading-[1.2] tracking-[-0.03em] text-white sm:text-[23px]">
                {featured.title}
              </h2>

              <p className="mt-3 line-clamp-2 text-[13.5px] leading-[1.7] text-white/55">
                {featured.excerpt}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold text-gold">
                {t.readGuide}
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function ResourcesPage() {
  const t = useCopy(COPY)
  const SECTOR_BRIEFS = SECTOR_LINKS.map((link, i) => ({
    ...link,
    title: t.sectors[i][0],
    desc: t.sectors[i][1],
  }))
  // Cartes rendues ici, sur le serveur : le filtre client ne recoit que des
  // elements deja resolus.
  const cards = guidesFor(useCurrentLocale()).map((guide) => ({
    key: guide.slug,
    category: guide.category,
    node: <GuideCard guide={guide} />,
  }))

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">

      <ResourcesHero />

      {/* ==================== BIBLIOTHÈQUE ==================== */}
      <section id="guides" className="scroll-mt-20 bg-[#F7F7F6] py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            title={t.allTitle}
            accent={t.allAccent}
            subtitle={t.allSubtitle}
          />

          <GuidesLibrary cards={cards} />
        </div>
      </section>

      {/* ==================== INSCRIPTION ==================== */}
      <section className="bg-[#F7F7F6] pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SubscribeBand source="/resources" />
        </div>
      </section>

      {/* ==================== ARCHITECTURE & SÉCURITÉ ==================== */}
      {/* À propos de CIPA : flux de la donnée, stack et sécurité (ancre du pied de page). */}
      <ArchitectureSection id="securite" className="scroll-mt-[82px] border-t border-[#EDEBE5]" />

      {/* ==================== ANALYSES SECTORIELLES ==================== */}
      <section className="border-t border-[#EDEBE5] bg-[#F2F1EC] py-16 sm:py-20">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectorsShowcase
            title={t.sectorsTitle}
            accent={t.sectorsAccent}
            subtitle={t.sectorsSubtitle}
            sectors={SECTOR_BRIEFS}
            ctaLabel={t.sectorsCta}
          />
        </div>
      </section>

      <Footer />

    </main>
  )
}
