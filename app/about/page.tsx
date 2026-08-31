'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BrainCircuit,
  ChevronRight,
  Database,
  Facebook,
  Heart,
  HeartHandshake,
  Linkedin,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Smile,
  Target,
} from 'lucide-react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { LINKEDIN_URL } from '@/lib/data/socials'
import { PARTNERS } from '@/lib/data/partnerLogos'
import { logoFrameWidth } from '@/lib/data/logoSizing'
import { viewport } from '@/lib/motion'

/* ============================================================
   DONNÉES
   ============================================================ */

const VALUES = [
  {
    icon: Heart,
    title: 'L’obsession du client',
    desc: 'Chaque décision produit part des besoins réels du terrain.',
    tile: 'bg-rose-50 text-rose-500',
  },
  {
    icon: HeartHandshake,
    title: 'Chaleur humaine',
    desc: 'Des relations sincères avec nos clients et entre nous.',
    tile: 'bg-pink-50 text-pink-500',
  },
  {
    icon: ShieldCheck,
    title: 'Intégrité',
    desc: 'Transparence et honnêteté dans chaque engagement.',
    tile: 'bg-blue-50 text-blue-500',
  },
  {
    icon: Smile,
    title: 'Sérieux & bonne humeur',
    desc: 'Exigence professionnelle, sans jamais perdre le sourire.',
    tile: 'bg-emerald-50 text-emerald-500',
  },
  {
    icon: Target,
    title: 'Le goût du défi',
    desc: 'Nous recherchons les problèmes complexes à résoudre.',
    tile: 'bg-violet-50 text-violet-500',
  },
  {
    icon: RefreshCw,
    title: 'Durabilité',
    desc: 'Construire des solutions qui créent un impact durable.',
    tile: 'bg-amber-50 text-amber-500',
  },
]

const MISSION_PILLARS = [
  { icon: Rocket, label: 'Solutions technologiques sur-mesure' },
  { icon: Database, label: 'Insights & synthèses de données' },
  { icon: Award, label: 'Accompagnement jusqu’à la maîtrise' },
  { icon: BrainCircuit, label: 'Une équipe produit, terrain & IA' },
]

const CERTIFICATIONS = [
  {
    name: 'CEED Tunisia',
    desc: 'Programme d’accompagnement entrepreneurial',
  },
  {
    name: 'Starti4',
    desc: 'Certification Industrie 4.0',
  },
  {
    name: 'Startup Act',
    desc: 'Label startup innovante — Tunisie',
  },
]

/**
 * Bandeau écosystème — les 7 partenaires de components/partnerLogos.ts.
 *
 * Les anciens fichiers, à la racine de /public, étaient sur fond
 * blanc : ils dessinaient un rectangle visible sur le gris de la section. Ceux
 * de /logos-partenaires sont transparents, et `logoFrameWidth` les inscrit
 * tous dans la même boîte au lieu de leur imposer une hauteur commune — un
 * wordmark fin et un logo carré paraissent alors de la même taille.
 */
const ECOSYSTEM_BOX = { w: 108, h: 42 }

/* ============================================================
   PAGE
   ============================================================ */

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">
      <Navbar />

      <PageHero
        eyebrow="À propos"
        title="Nous sommes"
        accent="Industry X.0"
        description="Nous accélérons la transformation digitale des usines et des entreprises industrielles en démultipliant le potentiel et l’efficacité de leurs équipes grâce à la technologie."
        primaryCta={{ label: 'Demander une démo', href: '/contact' }}
        secondaryCta={{ label: 'Découvrir CIPA', href: '/platform' }}
      />

      {/* ==================== NOS VALEURS ==================== */}
      <section className="relative overflow-hidden bg-[#F7F7F6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            badge={null}
            title="Nos"
            accent="valeurs"
            subtitle="Ce qui guide chacune de nos décisions, au quotidien."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {VALUES.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.45,
                    delay: (index % 3) * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-[22px] border border-[#EFEDE8] bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-[2px] hover:border-gold/25 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${value.tile}`}
                  >
                    <Icon size={19} strokeWidth={1.9} />
                  </div>

                  <h3 className="mt-5 text-[15.5px] font-bold tracking-[-0.02em] text-[#111827]">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-[1.65] text-[#78716C]">
                    {value.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== NOTRE MISSION ==================== */}
      <section className="bg-[#F7F7F6] pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[30px] bg-[#0C0D12] p-7 sm:p-10 lg:p-12"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full"
              style={{
                background: 'rgba(218,162,80,0.16)',
                filter: 'blur(90px)',
              }}
            />

            <div className="relative z-10 grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
                  Notre mission
                </p>

                <h2 className="mt-5 font-display text-[26px] font-black leading-[1.12] tracking-[-0.035em] text-white sm:text-[32px] lg:text-[36px]">
                  Une industrie plus efficace, connectée et collaborative.
                </h2>

                <p className="mt-5 max-w-xl text-[14px] leading-[1.75] text-white/60 sm:text-[15px]">
                  Nous donnons aux industriels une visibilité en temps réel sur
                  leur <span className="font-semibold text-white">qualité</span>,
                  leur <span className="font-semibold text-white">sécurité</span>{' '}
                  et la{' '}
                  <span className="font-semibold text-white">
                    satisfaction de leurs clients
                  </span>
                  , pour transformer la donnée terrain en décisions concrètes et
                  bâtir des opérations plus performantes.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {MISSION_PILLARS.map((pillar) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={pillar.label}
                      className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                        <Icon size={16} />
                      </div>

                      <span className="text-[12.5px] font-semibold leading-snug text-white/85">
                        {pillar.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== QUI SOMMES-NOUS ==================== */}
      <section className="bg-[#F7F7F6] pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[900px] px-5 sm:px-7 lg:px-8">
          <SectionHeading badge={null} title="Qui" accent="sommes-nous" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-center text-[14.5px] leading-[1.85] text-[#57534E] sm:text-[15.5px]"
          >
            Fondée en 2019 à Tunis, Industry X.0 est le nom que nous avons donné
            à notre startup : nous concevons des solutions technologiques
            permettant aux entreprises de maîtriser leur chaîne de valeur, leurs
            coûts, leur qualité et la satisfaction de leurs clients. Nos
            algorithmes délivrent des insights, des synthèses de données et des
            recommandations de décision. Nous personnalisons vos applications
            selon vos besoins : nous avons la technologie, nous construisons vos
            produits, nous vous accompagnons et vous formons jusqu’à la pleine
            maîtrise de{' '}
            <span className="font-semibold text-[#111827]">CIPA</span>.
          </motion.p>
        </div>
      </section>

      {/* ==================== CERTIFIÉS PAR ==================== */}
      <section className="border-y border-[#EDEBE5] bg-[#F2F1EC] py-14 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading badge={null} title="Certifiés" accent="par" />

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {CERTIFICATIONS.map((certification) => (
              <div
                key={certification.name}
                className="flex items-center gap-4 rounded-[20px] border border-[#E7E5E4] bg-white/70 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                  <Award size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-[#111827]">
                    {certification.name}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-[#78716C]">
                    {certification.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ÉCOSYSTÈME ==================== */}
      <section className="overflow-hidden bg-[#F7F7F6] py-14 sm:py-16">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#78716C] sm:text-[11px]">
          Notre écosystème de partenaires
        </p>

        <div className="group/marquee relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F7F7F6] to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F7F7F6] to-transparent sm:w-32" />

          {/* Quatre copies : la piste défile de -50 %, il faut donc que chaque
              moitié soit plus large que l'écran pour que la boucle soit
              invisible. 14 cellules × 170 px = 2380 px. */}
          <div className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map(
              (partner, index) => (
                <div
                  key={`${partner.alt}-${index}`}
                  className="flex w-[170px] shrink-0 items-center justify-center px-4 sm:w-[200px]"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    title={partner.tagline}
                    width={512}
                    height={512}
                    style={{
                      width: logoFrameWidth(
                        partner,
                        ECOSYSTEM_BOX.w,
                        ECOSYSTEM_BOX.h
                      ),
                    }}
                    className="h-auto max-w-full shrink-0 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ==================== RÉSEAUX SOCIAUX ==================== */}
      <section className="bg-[#F7F7F6] pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <div className="relative overflow-hidden rounded-[26px] bg-[#1C1C1F] px-6 py-9 text-center">
            <p className="text-[13.5px] font-semibold text-gold sm:text-[15px]">
              Suivez-nous sur les réseaux et recevez votre dose quotidienne de
              conseils.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://www.facebook.com/industryx0"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="bg-[#F7F7F6] pb-20 sm:pb-24">
        <div className="mx-auto max-w-[900px] px-5 text-center sm:px-7 lg:px-8">
          <h2 className="font-display text-[24px] font-black leading-tight tracking-[-0.035em] text-[#111827] sm:text-[32px]">
            Prêt à transformer vos opérations avec{' '}
            <span className="text-gold">CIPA</span> ?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-[1.7] text-[#57534E] sm:text-[15px]">
            Discutons de vos enjeux qualité, production et conformité, et voyons
            ensemble comment Industry X.0 peut vous accompagner.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#111827] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_36px_rgba(17,24,39,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
            >
              Nous contacter
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/team"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-6 py-3.5 text-[14px] font-semibold text-[#44403C] transition-all duration-300 hover:border-gold/40 hover:text-[#111827]"
            >
              Rencontrer l’équipe
              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
