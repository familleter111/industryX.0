'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
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
import type { LucideIcon } from 'lucide-react'

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
import { useCopy, useCurrentLocale } from '@/lib/i18n'

/* ============================================================
   DONNÉES
   ============================================================ */

/**
 * Les trois chiffres de la ligne « L'expertise en action ».
 * Le compteur de cas d'usage ouvre la serie sans icone : c'est le chiffre
 * qui porte le propos, une icone de plus le diluerait.
 */
const REACH_FIGURES: { icon?: LucideIcon; value: string }[] = [
  { value: '+80' },
  { icon: Globe, value: '5' },
  { icon: Factory, value: '6' },
]

/** Les trois usages de la bande sombre, sous le hero. */
const PLATFORM_USE_ICONS = [ClipboardCheck, Users, BarChart3]

/** Nombre de cartes visibles avant le bouton « voir plus ». */
const TESTIMONIALS_PAGE_SIZE = 6

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
    reach: ['cas d’usage industriels', 'pays couverts', 'secteurs industriels'],
    uses: [
      ['Structurer les contrôles', 'Digitaliser les pratiques terrain'],
      ['Suivre les actions', 'Centraliser le suivi opérationnel'],
      ['Éclairer les décisions', 'Partager une vision consolidée'],
    ],
    sectors: [
      ['Pharmaceutique', 'GMP, traçabilité, déviations, CAPA et dossier de lot électronique.'],
      ['Agroalimentaire & boissons', 'Contrôles qualité, sécurité alimentaire, inspections et traçabilité terrain.'],
      ['Cosmétique & dispositifs médicaux', 'Standardisation qualité, conformité et maîtrise documentaire.'],
      ['Automobile & composants', 'Performance usine, maîtrise process, audits terrain et plans d’action.'],
      ['Électronique & câblage', 'Contrôles process, standards terrain et réduction des écarts.'],
      ['Packaging & plasturgie', 'Qualité terrain, suivi production, incidents et amélioration continue.'],
    ],
    more: (n: number) => `Voir les ${n} autres témoignages`,
    badge: 'Cas d’usage industriels',
    title: ['Du terrain à la décision,', 'vos', 'opérations', 'connectées.'],
    lead: 'Avec CIPA, les équipes de l’agroalimentaire, de l’automobile, de la plasturgie et de la pharmaceutique pilotent leurs opérations au quotidien.',
    demo: 'Demander une démo',
    faq: 'Questions fréquentes',
    expertise: 'L’expertise en action',
    heroAlt:
      'Une responsable qualité renseigne un contrôle sur tablette au pied d’une ligne d’embouteillage. Deux cartes détaillent les usages : qualité terrain — audits, contrôles et déviations ; pilotage opérationnel — actions, suivi et indicateurs.',
    platformTitle: 'Une plateforme,',
    platformAccent: 'des usages concrets.',
    platformLead: 'CIPA transforme les données terrain en actions pour des opérations plus fiables, plus simples et plus performantes.',
    closing: ['Des opérations', 'plus durables', 'demain'],
    voicesTitle: 'La parole aux',
    voicesAccent: 'industriels',
    voicesSubtitle: 'Ce que disent les responsables qualité, production et technique qui utilisent CIPA sur le terrain.',
    sectorsTitle: 'Explorer par',
    sectorsAccent: 'secteur',
    sectorsSubtitle: 'Chaque industrie a ses référentiels, ses contrôles et ses contraintes. Voyez comment CIPA s’y adapte.',
    sectorsCta: 'Découvrir',
    sectorsFootnote: 'Une plateforme unique. Des exigences multiples. Un',
    sectorsFootnoteAccent: 'pilotage unifié',
    ctaTitle: 'Et si votre usine était la',
    ctaAccent: 'suivante',
    ctaEnd: ' ?',
    ctaText: 'Un expert analyse votre contexte et vous montre concrètement ce que CIPA changerait dans vos opérations.',
    ctaButton: 'Planifier une démonstration',
  },
  en: {
    reach: ['industrial use cases', 'countries covered', 'industries'],
    uses: [
      ['Structure your checks', 'Digitize shop-floor practices'],
      ['Track actions', 'Centralize operational follow-up'],
      ['Inform decisions', 'Share a consolidated view'],
    ],
    sectors: [
      ['Pharmaceuticals', 'GMP, traceability, deviations, CAPA and electronic batch records.'],
      ['Food & beverage', 'Quality checks, food safety, inspections and shop-floor traceability.'],
      ['Cosmetics & medical devices', 'Quality standardization, compliance and document control.'],
      ['Automotive & components', 'Plant performance, process control, shop-floor audits and action plans.'],
      ['Electronics & wiring', 'Process checks, shop-floor standards and fewer deviations.'],
      ['Packaging & plastics', 'Shop-floor quality, production tracking, incidents and continuous improvement.'],
    ],
    more: (n: number) => `See ${n} more testimonials`,
    badge: 'Industrial use cases',
    title: ['From shop floor to decision,', 'your', 'operations,', 'connected.'],
    lead: 'With CIPA, teams in food, automotive, plastics and pharmaceuticals run their operations every day.',
    demo: 'Book a demo',
    faq: 'FAQ',
    expertise: 'Expertise in action',
    heroAlt:
      'A quality manager records a check on a tablet next to a bottling line. Two cards describe the use cases: shop-floor quality — audits, checks and deviations; operational management — actions, follow-up and indicators.',
    platformTitle: 'One platform,',
    platformAccent: 'concrete use cases.',
    platformLead: 'CIPA turns shop-floor data into actions for more reliable, simpler and higher-performing operations.',
    closing: ['More sustainable', 'operations', 'tomorrow'],
    voicesTitle: 'In the words of',
    voicesAccent: 'manufacturers',
    voicesSubtitle: 'What the quality, production and technical managers using CIPA on the shop floor have to say.',
    sectorsTitle: 'Explore by',
    sectorsAccent: 'industry',
    sectorsSubtitle: 'Every industry has its own standards, checks and constraints. See how CIPA adapts.',
    sectorsCta: 'Explore',
    sectorsFootnote: 'One platform. Many requirements.',
    sectorsFootnoteAccent: 'Unified management',
    ctaTitle: 'What if your plant were',
    ctaAccent: 'next',
    ctaEnd: '?',
    ctaText: 'An expert analyzes your context and shows you concretely what CIPA would change in your operations.',
    ctaButton: 'Book a demo',
  },
}

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
  const t = useCopy(COPY)
  /**
   * Témoignages affichés : verbatims validés + propositions de rédaction.
   * Ces dernières (`status: 'draft'`) restent à faire approuver par les
   * entreprises citées — voir l'en-tête de lib/data/testimonials.ts.
   */
  const VISIBLE_TESTIMONIALS = getTestimonials(true, useCurrentLocale())

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
            {t.more(VISIBLE_TESTIMONIALS.length - TESTIMONIALS_PAGE_SIZE)}
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
   OUVERTURE — UN SEUL ÉCRAN

   Tout ce qui ouvrait la page tenait en deux sections que l’on faisait
   défiler l’une après l’autre. C’est désormais un seul écran : le
   discours et le visuel en haut, la plateforme en trois verbes en bas,
   séparés d’un filet.

   La hauteur est `min-h`, pas `h`. Les tailles de titre et les
   respirations sont bornées en `vh` autant qu’en `vw`, si bien que le
   bloc se pose exactement sur un écran des fenêtres de 700 px de haut
   aux plus grandes. Sur une fenêtre plus courte encore, il s’allonge au
   lieu de se faire couper : un texte tronqué est un defaut plus grave
   qu’un demi-tour de molette.

   Sous `lg`, les deux colonnes s’empilent et la page defile : trois
   blocs de texte, un visuel et six chiffres ne tiennent pas sur un
   ecran de telephone, et pretendre le contraire donnerait un corps de
   texte illisible.
   ============================================================ */

function UseCasesScreen() {
  const t = useCopy(COPY)
  const PLATFORM_USES = PLATFORM_USE_ICONS.map((icon, i) => ({ icon, title: t.uses[i][0], desc: t.uses[i][1] }))
  const rise = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  }

  /* Entrée au montage plutôt qu’au scroll : le bloc occupe l’écran
     entier, un `whileInView` se déclencherait de toute façon aussitôt,
     au prix d’un observateur. */
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section className="relative overflow-hidden bg-white pt-[82px] lg:min-h-[100svh]">
      <div className="mx-auto flex max-w-[1500px] flex-col px-5 sm:px-7 lg:min-h-[calc(100svh-82px)] lg:px-10">

        {/* ==================== HAUT — DISCOURS ET VISUEL ==================== */}
        <div className="grid flex-1 grid-cols-1 gap-9 py-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)] lg:items-stretch lg:gap-12 lg:py-[clamp(0.85rem,2.4vh,2.25rem)]">

          {/* ---------- Colonne discours ---------- */}
          <div className="flex flex-col justify-center">
            <motion.span
              {...rise}
              transition={{ duration: 0.5, ease }}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[0.05] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-ink sm:text-[11px]"
            >
              <span className="h-[7px] w-[7px] rounded-full bg-gold" />
              {t.badge}
            </motion.span>

            <motion.h1
              {...rise}
              transition={{ duration: 0.55, delay: 0.06, ease }}
              className="mt-[clamp(1rem,2vh,1.6rem)] font-display font-black leading-[1.05] tracking-[-0.04em] text-[#111827] text-[clamp(30px,7vw,40px)] lg:text-[clamp(30px,min(3vw,5.4vh),50px)]"
            >
              {t.title[0]}
              <br />
              {t.title[1]}{' '}
              <span className="text-gold-deep">
                {t.title[2]}
                <br className="hidden lg:inline" /> {t.title[3]}
              </span>
            </motion.h1>

            <motion.p
              {...rise}
              transition={{ duration: 0.55, delay: 0.12, ease }}
              className="mt-[clamp(0.9rem,1.9vh,1.4rem)] max-w-[36rem] text-[14.5px] leading-[1.7] text-muted sm:text-[15.5px]"
            >
              {t.lead}
            </motion.p>

            <motion.div
              {...rise}
              transition={{ duration: 0.55, delay: 0.18, ease }}
              className="mt-[clamp(1.1rem,2.4vh,1.9rem)] flex flex-wrap items-center gap-3.5"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#111827] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_36px_rgba(17,24,39,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
              >
                {t.demo}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/#faq"
                className="group inline-flex items-center gap-2.5 rounded-full border border-cream-border bg-white px-6 py-3.5 text-[14px] font-semibold text-stone-800 transition-all duration-300 hover:-translate-y-[1px] hover:border-gold/45"
              >
                {t.faq}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* ---------- Chiffres ---------- */}
            <motion.div
              {...rise}
              transition={{ duration: 0.55, delay: 0.24, ease }}
              className="mt-[clamp(1.25rem,2.7vh,2.25rem)] border-t border-cream-border pt-[clamp(1rem,2.2vh,1.6rem)]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-subtle sm:text-[11px]">
                {t.expertise}
              </p>

              <ul className="mt-[clamp(0.65rem,1.5vh,1.15rem)] grid grid-cols-3 divide-x divide-cream-border">
                {REACH_FIGURES.map((figure, index) => {
                  const Icon = figure.icon
                  return (
                    <li
                      key={figure.value}
                      className={index === 0 ? 'pr-5' : 'px-5'}
                    >
                      <p className="flex items-center gap-2.5">
                        {Icon && (
                          <Icon
                            size={26}
                            strokeWidth={1.6}
                            aria-hidden="true"
                            className="shrink-0 text-gold"
                          />
                        )}
                        <span className="font-display font-black leading-none tracking-[-0.04em] text-gold-deep text-[clamp(28px,min(2.35vw,4.4vh),40px)]">
                          {figure.value}
                        </span>
                      </p>
                      <p className="mt-2 text-[13px] leading-[1.4] text-muted sm:text-[13.5px]">
                        {t.reach[index]}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </div>

          {/* ---------- Colonne visuel ----------

              Un seul PNG, composition comprise : la photo, l’étiquette
              « des équipes plus efficaces » et les deux cartes qui la
              recouvrent sont aplaties dans le fichier. Son fond est blanc
              pur, d’où le `bg-white` de la section — sur le gris de page,
              le carré de l’image se verrait.

              La contrainte est la HAUTEUR, pas la largeur : c’est elle qui
              decide si le bloc tient sur un ecran. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="flex min-h-0 items-center justify-center"
          >
            <Image
              src="/cas-usage.png"
              alt={t.heroAlt}
              width={1254}
              height={1254}
              priority
              sizes="(min-width: 1024px) 620px, 100vw"
              className="h-auto max-h-full w-full max-w-[520px] object-contain lg:w-auto lg:max-w-full"
            />
          </motion.div>
        </div>

        {/* ==================== BAS — UNE PLATEFORME, DES USAGES CONCRETS ==================== */}
        <motion.div
          {...rise}
          transition={{ duration: 0.55, delay: 0.3, ease }}
          className="grid gap-8 border-t border-cream-border py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)_auto] lg:items-center lg:gap-10 lg:py-[clamp(0.9rem,2.4vh,1.8rem)]"
        >
          <div>
            <h2 className="font-display font-black leading-[1.14] tracking-[-0.035em] text-[#111827] text-[clamp(22px,4.6vw,26px)] lg:text-[clamp(21px,min(1.8vw,3.1vh),29px)]">
              {t.platformTitle}
              <br />
              <span className="text-gold-deep">{t.platformAccent}</span>
            </h2>

            <p className="mt-3.5 max-w-[26rem] text-[13px] leading-[1.65] text-muted sm:text-[13.5px]">
              {t.platformLead}
            </p>
          </div>

          <ul className="grid gap-7 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-cream-border">
            {PLATFORM_USES.map((use, index) => {
              const Icon = use.icon
              return (
                <li
                  key={use.title}
                  className={index === 0 ? 'sm:pr-6' : 'sm:px-6'}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10">
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="text-gold-deep"
                    />
                  </span>

                  {/* La flèche est décorative : elle donne son rythme à la
                      série, elle ne mène nulle part. `aria-hidden` pour que
                      la synthèse vocale ne l’annonce pas comme un lien. */}
                  <p className="mt-3.5 flex items-center gap-2.5 text-[14px] font-bold text-[#111827] sm:text-[14.5px]">
                    {use.title}
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 text-subtle"
                    />
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] text-subtle">
                    {use.desc}
                  </p>
                </li>
              )
            })}
          </ul>

          {/* Étiquette de clôture. Absente sous `lg` : c’est un commentaire,
              pas une information, et elle prendrait la place d’un contenu. */}
          <p className="hidden text-[11px] font-bold uppercase leading-[1.9] tracking-[0.16em] text-subtle lg:block">
            {t.closing[0]}
            <br />
            {t.closing[1]}
            <br />
            {t.closing[2]}
            <span className="mt-3 block h-[2px] w-8 rounded-full bg-gold" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function CustomersPage() {
  const t = useCopy(COPY)
  const SECTORS = SECTOR_LINKS.map((link, i) => ({ ...link, title: t.sectors[i][0], desc: t.sectors[i][1] }))
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">

      <UseCasesScreen />

      {/* ==================== CONSTELLATION CLIENTS ==================== */}
      <ClientsConstellation />

      {/* ==================== TÉMOIGNAGES ==================== */}
      <section className="bg-[#F7F7F6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            badge={null}
            title={t.voicesTitle}
            accent={t.voicesAccent}
            subtitle={t.voicesSubtitle}
          />

          <TestimonialsGrid />
        </div>
      </section>

      {/* ==================== PAR SECTEUR ==================== */}
      <section className="bg-[#F2F1EC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectorsShowcase
            badge="Industries"
            title={t.sectorsTitle}
            accent={t.sectorsAccent}
            subtitle={t.sectorsSubtitle}
            sectors={SECTORS}
            ctaLabel={t.sectorsCta}
            footnote={{
              icon: ShieldCheck,
              text: t.sectorsFootnote,
              accent: t.sectorsFootnoteAccent,
            }}
          />
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="bg-[#F7F7F6] py-20 sm:py-24">
        <div className="mx-auto max-w-[900px] px-5 text-center sm:px-7 lg:px-8">
          <h2 className="font-display text-[24px] font-black leading-tight tracking-[-0.035em] text-[#111827] sm:text-[32px]">
            {t.ctaTitle} <span className="text-gold">{t.ctaAccent}</span>
            {t.ctaEnd}
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-[1.7] text-[#57534E] sm:text-[15px]">
            {t.ctaText}
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_36px_rgba(17,24,39,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
          >
            {t.ctaButton}
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
