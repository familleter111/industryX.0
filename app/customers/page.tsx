'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Car,
  ChevronDown,
  ClipboardCheck,
  Factory,
  Quote,
  ShieldCheck,
  Star,
  Utensils,
  Zap,
} from 'lucide-react'

import PageHero from '@/components/ui/PageHero'
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

const KEY_FIGURES = [
  { value: '15+', label: 'clients industriels' },
  { value: '5', label: 'pays couverts' },
  { value: '6', label: 'secteurs industriels' },
  { value: '2019', label: 'année de création' },
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
  const logo = testimonial.logoAlt ? findClientLogo(testimonial.logoAlt) : undefined

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
   PAGE
   ============================================================ */

export default function CustomersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">

      <PageHero
        eyebrow="Cas clients"
        title="Ils pilotent leurs opérations"
        accent="avec CIPA"
        description="Des industriels de l’agroalimentaire, de l’automobile, de la plasturgie et de la pharmaceutique utilisent CIPA au quotidien pour connecter le terrain à la décision."
        primaryCta={{ label: 'Demander une démo', href: '/contact' }}
        secondaryCta={{ label: 'Questions fréquentes', href: '/faq' }}
      />

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <section className="border-b border-[#EDEBE5] bg-[#F7F7F6] py-12 sm:py-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0">
            {KEY_FIGURES.map((figure, index) => (
              <div
                key={figure.label}
                className={`text-center ${
                  index > 0 ? 'sm:border-l sm:border-[#E7E5E4]' : ''
                }`}
              >
                <p className="font-display text-[30px] font-black leading-none tracking-[-0.04em] text-gold sm:text-[38px]">
                  {figure.value}
                </p>
                <p className="mt-2.5 text-[12.5px] text-subtle sm:text-[13px]">
                  {figure.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
