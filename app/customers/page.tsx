'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Car,
  ChevronDown,
  ClipboardCheck,
  Factory,
  Globe,
  Quote,
  ShieldCheck,
  Star,
  Users,
  Utensils,
  Zap,
} from 'lucide-react'

import SectionHeading from '@/components/ui/SectionHeading'
import ClientsConstellation from '@/components/sections/ClientsConstellation'
import SectorsShowcase from '@/components/sections/SectorsShowcase'
import {
  findClientLogo,
  logoFrameWidth,
} from '@/lib/data/clientLogos'
import { getTestimonials, type Testimonial } from '@/lib/data/testimonials'
import { viewport } from '@/lib/motion'
import Footer from '@/components/layout/Footer'

/* ============================================================
   DONNÉES
   ============================================================ */

/** Les deux chiffres qui accompagnent le compteur de cas d'usage. */
const REACH_FIGURES = [
  { icon: Globe, value: '5', label: 'pays couverts' },
  { icon: Factory, value: '6', label: 'secteurs industriels' },
]

/** Les trois usages de la bande sombre, sous le hero. */
const PLATFORM_USES = [
  {
    icon: ClipboardCheck,
    title: 'Structurer les contrôles',
    desc: 'Digitaliser les pratiques terrain',
  },
  {
    icon: Users,
    title: 'Suivre les actions',
    desc: 'Centraliser le suivi opérationnel',
  },
  {
    icon: BarChart3,
    title: 'Éclairer les décisions',
    desc: 'Partager une vision consolidée',
  },
]

/**
 * Témoignages affichés : uniquement les verbatims validés.
 * Passer `true` à getTestimonials() une fois les propositions de rédaction
 * relues et approuvées par les entreprises citées (voir components/testimonials.ts).
 */
const VISIBLE_TESTIMONIALS = getTestimonials(false)

/** Nombre de cartes visibles avant le bouton « voir plus ». */
const TESTIMONIALS_PAGE_SIZE = 6

const SECTORS = [
  {
    icon: ShieldCheck,
    title: 'Pharmaceutique',
    desc: 'GMP, traçabilité, déviations, CAPA et dossier de lot électronique.',
    href: '/industries/pharma',
  },
  {
    icon: Utensils,
    title: 'Agroalimentaire & boissons',
    desc: 'Contrôles qualité, sécurité alimentaire, inspections et traçabilité terrain.',
    href: '/industries/food',
  },
  {
    icon: ClipboardCheck,
    title: 'Cosmétique & dispositifs médicaux',
    desc: 'Standardisation qualité, conformité et maîtrise documentaire.',
    href: '/industries/cosmetics',
  },
  {
    icon: Car,
    title: 'Automobile & composants',
    desc: 'Performance usine, maîtrise process, audits terrain et plans d’action.',
    href: '/industries/automotive',
  },
  {
    icon: Zap,
    title: 'Électronique & câblage',
    desc: 'Contrôles process, standards terrain et réduction des écarts.',
    href: '/industries/electronics',
  },
  {
    icon: Factory,
    title: 'Packaging & plasturgie',
    desc: 'Qualité terrain, suivi production, incidents et amélioration continue.',
    href: '/industries/packaging',
  },
]

/* ============================================================
   TÉMOIGNAGES
   ============================================================ */

function TestimonialLogo({ testimonial }: { testimonial: Testimonial }) {
  /* /public/logos d'abord, `fallbackLogo` ensuite pour les clients qui n'y
     figurent pas — les initiales ne restent qu'en dernier recours. */
  const logo =
    (testimonial.logoAlt ? findClientLogo(testimonial.logoAlt) : undefined) ??
    testimonial.fallbackLogo

  if (!logo) {
    return (
      <span className="font-display text-[13px] font-black text-gold-ink">
        {testimonial.company
          .split(' ')
          .map((word) => word[0])
          .slice(0, 2)
          .join('')}
      </span>
    )
  }

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={512}
      height={512}
      /* contenu inscrit dans 26×20 (vignette de 44 px) */
      style={{ width: logoFrameWidth(logo, 26, 20) }}
      className="h-auto max-w-full shrink-0 object-contain"
    />
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex h-full flex-col rounded-[26px] border border-[#EFEDE8] bg-white p-6 shadow-[0_16px_42px_rgba(15,23,42,0.05)] sm:p-7"
    >
      <Quote size={26} className="text-gold/50" />

      <blockquote className="mt-4 flex-1 text-[13.5px] leading-[1.75] text-[#44403C]">
        {testimonial.quote}
      </blockquote>

      <div className="mt-6 flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
          <Star key={starIndex} size={13} className="fill-gold text-gold" />
        ))}
      </div>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-[#EFEDE8] pt-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#EFEDE8] bg-white p-1.5">
          <TestimonialLogo testimonial={testimonial} />
        </div>

        <div className="min-w-0">
          <p className="text-[13.5px] font-bold text-[#111827]">
            {testimonial.company}
          </p>
          <p className="mt-0.5 text-[12px] text-subtle">
            {testimonial.author} — {testimonial.sector}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  )
}

function TestimonialsGrid() {
  const [expanded, setExpanded] = useState(false)

  const hasMore = VISIBLE_TESTIMONIALS.length > TESTIMONIALS_PAGE_SIZE
  const shown =
    hasMore && !expanded
      ? VISIBLE_TESTIMONIALS.slice(0, TESTIMONIALS_PAGE_SIZE)
      : VISIBLE_TESTIMONIALS

  return (
    <>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
        {shown.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.company}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>

      {hasMore && !expanded && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="group inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#44403C] transition-all duration-300 hover:-translate-y-[1px] hover:border-gold/40 hover:text-[#111827]"
          >
            Voir les {VISIBLE_TESTIMONIALS.length - TESTIMONIALS_PAGE_SIZE} autres
            témoignages
            <ChevronDown
              size={15}
              className="transition-transform duration-300 group-hover:translate-y-[2px]"
            />
          </button>
        </div>
      )}
    </>
  )
}

/* ============================================================
   HERO — CAS D’USAGE INDUSTRIELS
   ============================================================ */

/**
 * Compteur de cas d’usage et portée, dans la carte sombre du hero.
 *
 * La carte est le seul aplat sombre de la moitié haute : c’est ce qui fait
 * que l’œil s’y arrête avant les deux boutons, et non l’inverse.
 */
function ReachCard() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-[22px] bg-dark px-6 py-7 sm:px-7">
      {/* Halo décoratif, hors du flux et hors de l’arbre d’accessibilité. */}
      <div className="pointer-events-none absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-gold/20 blur-[70px]" />

      <div className="relative z-10 grid gap-6 sm:grid-cols-[auto_1px_1fr] sm:items-center sm:gap-7">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
            L’expertise en action
          </p>
          <span className="mt-2.5 block h-[2px] w-8 rounded-full bg-gold" />

          <p className="mt-5 flex items-end gap-3">
            <span className="font-display text-[42px] font-black leading-[0.82] tracking-[-0.04em] text-gold sm:text-[50px]">
              +80
            </span>
            <span className="text-[13px] font-semibold leading-[1.3] text-white sm:text-[14px]">
              cas d’usage
              <br />
              industriels
            </span>
          </p>
        </div>

        {/* Filet de séparation : sa largeur vient de la colonne de grille. */}
        <span className="hidden self-stretch bg-white/10 sm:block" />

        <ul className="grid gap-4">
          {REACH_FIGURES.map((figure) => {
            const Icon = figure.icon
            return (
              <li key={figure.label} className="flex items-center gap-3.5">
                <Icon
                  size={20}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="shrink-0 text-gold"
                />
                <span className="font-display text-[26px] font-black leading-none tracking-[-0.04em] text-gold">
                  {figure.value}
                </span>
                <span className="text-[13px] text-white/70">{figure.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/**
 * Ouverture de la page. Deux colonnes : le discours à gauche, le visuel à
 * droite.
 *
 * Le visuel est un seul PNG, composition comprise — la photo, l’étiquette et
 * les deux cartes qui la recouvrent sont aplaties dans le fichier. Son fond
 * est blanc pur, d’où le `bg-white` de la section : sur le gris de page, le
 * carré de l’image se verrait.
 *
 * Entrée au montage (`animate`) et non au scroll : le bloc est au-dessus de
 * la ligne de flottaison, un `whileInView` s’y déclencherait de toute façon
 * immédiatement, au prix d’un observateur.
 */
function UseCasesHero() {
  const rise = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-[calc(82px+2.5rem)] sm:pb-14 sm:pt-[calc(82px+3rem)] lg:pb-16 lg:pt-[calc(82px+3.5rem)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.94fr] lg:gap-12">
          {/* ---------- Colonne discours ---------- */}
          <div>
            <motion.span
              {...rise}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-ink sm:text-[11px]"
            >
              <span className="h-[7px] w-[7px] rounded-full bg-gold" />
              Cas d’usage industriels
            </motion.span>

            <motion.h1
              {...rise}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-[30px] font-black leading-[1.08] tracking-[-0.04em] text-[#111827] sm:text-[40px] lg:text-[46px]"
            >
              Du terrain à la décision,
              <br />
              vos <span className="text-gold-deep">opérations connectées.</span>
            </motion.h1>

            <motion.p
              {...rise}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[34rem] text-[14.5px] leading-[1.75] text-muted sm:text-[15.5px]"
            >
              Avec CIPA, les équipes de l’agroalimentaire, de l’automobile, de
              la plasturgie et de la pharmaceutique pilotent leurs opérations au
              quotidien.
            </motion.p>

            <motion.div
              {...rise}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <ReachCard />
            </motion.div>

            <motion.div
              {...rise}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center gap-3.5"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#111827] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_36px_rgba(17,24,39,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
              >
                Demander une démo
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/faq"
                className="group inline-flex items-center gap-2.5 rounded-full border border-cream-border bg-white px-6 py-3.5 text-[14px] font-semibold text-stone-800 transition-all duration-300 hover:-translate-y-[1px] hover:border-gold/45"
              >
                Questions fréquentes
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* ---------- Colonne visuel ---------- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/cas-usage.png"
              alt="Une responsable qualité renseigne un contrôle sur tablette au pied d’une ligne d’embouteillage. Deux cartes détaillent les usages : qualité terrain — audits, contrôles et déviations ; pilotage opérationnel — actions, suivi et indicateurs."
              width={1254}
              height={1254}
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   BANDE SOMBRE — UNE PLATEFORME, DES USAGES CONCRETS
   ============================================================ */

/**
 * Ce que la plateforme fait, en trois verbes. La bande est sombre pour
 * refermer le hero : c’est la même carte que dans le hero, élargie, et le
 * regard comprend qu’un même bloc parle.
 */
function PlatformBand() {
  return (
    <section className="bg-white pb-14 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-dark px-6 py-10 sm:px-9 sm:py-12 lg:px-12"
        >
          {/* Halo décoratif, coin bas droit. */}
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-gold/15 blur-[90px]" />

          {/* Étiquette d’angle. Absente sous `lg` : elle recouvrirait le
              titre, et son propos est un commentaire, pas une information. */}
          <p className="absolute right-10 top-11 hidden text-right text-[10px] font-bold uppercase leading-[1.9] tracking-[0.18em] text-white/35 lg:block">
            Des
            <br />
            opérations
            <br />
            plus durables
            <br />
            demain
            <span className="mt-2.5 ml-auto block h-[2px] w-7 rounded-full bg-gold/70" />
          </p>

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_1px_minmax(0,1.5fr)] lg:items-center lg:gap-12 lg:pr-44">
            <div>
              <h2 className="font-display text-[26px] font-black leading-[1.12] tracking-[-0.035em] text-white sm:text-[32px]">
                Une plateforme,
                <br />
                <span className="text-gold">des usages concrets.</span>
              </h2>

              <p className="mt-5 max-w-[24rem] text-[13.5px] leading-[1.75] text-white/60 sm:text-[14px]">
                CIPA transforme les données terrain en actions pour des
                opérations plus fiables, plus simples et plus performantes.
              </p>
            </div>

            {/* Filet de séparation : sa largeur vient de la colonne de grille. */}
            <span className="hidden self-stretch bg-white/10 lg:block" />

            <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              {PLATFORM_USES.map((use) => {
                const Icon = use.icon
                return (
                  <li key={use.title} className="text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40">
                      <Icon
                        size={22}
                        strokeWidth={1.7}
                        aria-hidden="true"
                        className="text-gold"
                      />
                    </span>
                    <p className="mt-4 text-[14px] font-bold text-white sm:text-[15px]">
                      {use.title}
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-[1.55] text-white/55">
                      {use.desc}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function CustomersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">

      <UseCasesHero />

      <PlatformBand />

      {/* ==================== CONSTELLATION CLIENTS ==================== */}
      <ClientsConstellation />

      {/* ==================== TÉMOIGNAGES ==================== */}
      <section className="bg-[#F7F7F6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            badge={null}
            title="La parole aux"
            accent="industriels"
            subtitle="Ce que disent les responsables qualité, production et technique qui utilisent CIPA sur le terrain."
          />

          <TestimonialsGrid />
        </div>
      </section>

      {/* ==================== PAR SECTEUR ==================== */}
      <section className="bg-[#F2F1EC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectorsShowcase
            badge="Industries"
            title="Explorer par"
            accent="secteur"
            subtitle="Chaque industrie a ses référentiels, ses contrôles et ses contraintes. Voyez comment CIPA s’y adapte."
            sectors={SECTORS}
            ctaLabel="Découvrir"
            footnote={{
              icon: ShieldCheck,
              text: 'Une plateforme unique. Des exigences multiples. Un',
              accent: 'pilotage unifié',
            }}
          />
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="bg-[#F7F7F6] py-20 sm:py-24">
        <div className="mx-auto max-w-[900px] px-5 text-center sm:px-7 lg:px-8">
          <h2 className="font-display text-[24px] font-black leading-tight tracking-[-0.035em] text-[#111827] sm:text-[32px]">
            Et si votre usine était la <span className="text-gold">suivante</span>{' '}
            ?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-[1.7] text-[#57534E] sm:text-[15px]">
            Un expert analyse votre contexte et vous montre concrètement ce que
            CIPA changerait dans vos opérations.
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_36px_rgba(17,24,39,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
          >
            Planifier une démonstration
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <Footer />

    </main>
  )
}
