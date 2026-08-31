'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  ChevronRight,
  Code2,
  Factory,
  Handshake,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { LINKEDIN_URL } from '@/lib/data/socials'
import { viewport } from '@/lib/motion'

/* ============================================================
   DONNÉES
   ============================================================ */

/**
 * Membres de l'équipe.
 * Volontairement vide : la grille n'est rendue que lorsque de vraies
 * personnes y sont ajoutées (nom, rôle, photo dans /public, LinkedIn).
 */
type TeamMember = {
  name: string
  role: string
  focus: string
  linkedin?: string
}

const TEAM_MEMBERS: TeamMember[] = []

/**
 * Photos de l'équipe (/public/photos-extraites).
 *
 * Les fichiers sont petits — 551×276 pour la plus grande — donc la galerie est
 * bridée à 760 px de large : au-delà, l'agrandissement se voit. Les légendes
 * décrivent uniquement ce que l'image montre, sans nommer d'événement ni de
 * lieu que la photo ne prouve pas.
 */
type TeamPhoto = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

const TEAM_PHOTOS: TeamPhoto[] = [
  {
    src: '/photos-extraites/photo-1_groupe.png',
    alt: 'L’équipe Industry X.0 réunie au complet dans les locaux',
    caption: 'L’équipe au complet',
    width: 551,
    height: 276,
  },
  {
    src: '/photos-extraites/photo-2_selfie-stand.png',
    alt: 'Deux membres de l’équipe sur un stand Industry X.0',
    caption: 'Sur le stand, à la rencontre des industriels',
    width: 269,
    height: 205,
  },
  {
    src: '/photos-extraites/photo-3_reunion.png',
    alt: 'Trois membres de l’équipe en session de travail',
    caption: 'Session de travail',
    width: 274,
    height: 205,
  },
]

const EXPERTISES = [
  {
    icon: Factory,
    title: 'Terrain & opérations',
    desc: 'Des profils issus de la production, de la maintenance et de l’amélioration continue, qui connaissent la réalité de l’atelier avant de parler de logiciel.',
  },
  {
    icon: ShieldCheck,
    title: 'Qualité & conformité',
    desc: 'Une maîtrise des référentiels industriels — GMP, HACCP, IATF, ISO — pour traduire les exigences réglementaires en processus digitaux exploitables.',
  },
  {
    icon: Code2,
    title: 'Produit & ingénierie',
    desc: 'L’équipe qui conçoit, développe et maintient CIPA : architecture, mobile, intégrations ERP/MES et fiabilité de la plateforme au quotidien.',
  },
  {
    icon: BrainCircuit,
    title: 'Données & IA',
    desc: 'Des algorithmes qui délivrent insights, synthèses de données et recommandations de décision à partir des signaux collectés sur le terrain.',
  },
]

const PRINCIPLES = [
  {
    icon: Users,
    title: 'On commence par le terrain',
    desc: 'Chaque fonctionnalité naît d’un besoin observé en atelier, pas d’une hypothèse en salle de réunion.',
  },
  {
    icon: Handshake,
    title: 'On accompagne jusqu’à la maîtrise',
    desc: 'Nous restons présents du cadrage à l’autonomie complète de vos équipes sur la plateforme.',
  },
  {
    icon: Sparkles,
    title: 'On mesure l’impact, pas l’activité',
    desc: 'La réussite se juge sur des indicateurs opérationnels : conformité, arrêts, délais, qualité.',
  },
]

/* ============================================================
   CADRE PHOTO

   `sizes` déclare la largeur réelle d'affichage — 760 px pour la photo large,
   la moitié pour les deux du bas — pour que l'optimiseur ne serve pas une
   variante plus grande que le fichier source, qui ne ferait qu'alourdir la
   page sans rien gagner en netteté.
   ============================================================ */

function PhotoFrame({
  photo,
  priority = false,
}: {
  photo: TeamPhoto
  priority?: boolean
}) {
  return (
    <figure className="group relative overflow-hidden rounded-[22px] border border-[#EFEDE8] bg-white shadow-[0_14px_38px_rgba(15,23,42,0.06)]">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority={priority}
        sizes={
          priority
            ? '(min-width: 768px) 760px, 100vw'
            : '(min-width: 640px) 372px, 100vw'
        }
        className="h-auto w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.03]"
      />

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0C0D12]/75 to-transparent px-4 pb-3 pt-10 text-[12px] font-semibold text-white/90 sm:text-[12.5px]">
        {photo.caption}
      </figcaption>
    </figure>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function TeamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">
      <Navbar />

      <PageHero
        eyebrow="Équipe"
        title="Une équipe produit,"
        accent="terrain & IA"
        description="Industry X.0 réunit des profils industriels, qualité, produit et data science autour d’une même conviction : la technologie ne vaut que par l’impact qu’elle produit sur le terrain."
        primaryCta={{ label: 'Rencontrer un expert', href: '/contact' }}
        secondaryCta={{ label: 'Notre histoire', href: '/about' }}
      />

      {/* ==================== L'ÉQUIPE EN IMAGES ==================== */}
      <section className="bg-[#F7F7F6] pt-16 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            badge={null}
            title="L’équipe"
            accent="en vrai"
            subtitle="Derrière CIPA, une équipe qui se déplace sur les salons, travaille en petit comité et se retrouve au complet. Le quotidien est raconté au fil de l’eau sur LinkedIn."
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 max-w-[760px] lg:mt-14"
          >
            <PhotoFrame photo={TEAM_PHOTOS[0]} priority />

            <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
              <PhotoFrame photo={TEAM_PHOTOS[1]} />
              <PhotoFrame photo={TEAM_PHOTOS[2]} />
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#57534E] transition-colors duration-300 hover:text-[#111827]"
            >
              <Linkedin size={15} className="text-[#0A66C2]" />
              Voir toutes nos publications sur LinkedIn
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== EXPERTISES ==================== */}
      <section className="bg-[#F7F7F6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            badge={null}
            title="Nos"
            accent="expertises"
            subtitle="Quatre compétences complémentaires, réunies dans une même équipe pour couvrir toute la chaîne — du poste de travail à la décision."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5">
            {EXPERTISES.map((expertise, index) => {
              const Icon = expertise.icon
              return (
                <motion.div
                  key={expertise.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.45,
                    delay: (index % 2) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-[24px] border border-[#EFEDE8] bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-[2px] hover:border-gold/25 sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111827] text-gold">
                    <Icon size={20} strokeWidth={1.9} />
                  </div>

                  <h3 className="mt-5 text-[16.5px] font-bold tracking-[-0.02em] text-[#111827] sm:text-[17.5px]">
                    {expertise.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] leading-[1.7] text-[#78716C]">
                    {expertise.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== MEMBRES (si renseignés) ==================== */}
      {TEAM_MEMBERS.length > 0 && (
        <section className="bg-[#F7F7F6] pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
            <SectionHeading badge={null} title="Les visages de" accent="CIPA" />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="rounded-[24px] border border-[#EFEDE8] bg-white p-6 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#111827] font-display text-[20px] font-black text-gold">
                    {member.name
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <h3 className="mt-4 text-[16px] font-bold text-[#111827]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[12.5px] font-semibold text-[#B6842B]">
                    {member.role}
                  </p>
                  <p className="mt-2.5 text-[13px] leading-[1.65] text-[#78716C]">
                    {member.focus}
                  </p>

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`LinkedIn de ${member.name}`}
                      className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E5E4] text-[#78716C] transition-all duration-300 hover:border-gold/40 hover:text-[#111827]"
                    >
                      <Linkedin size={15} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== NOTRE FAÇON DE TRAVAILLER ==================== */}
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
              className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full"
              style={{
                background: 'rgba(218,162,80,0.14)',
                filter: 'blur(90px)',
              }}
            />

            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
                Notre façon de travailler
              </p>

              <h2 className="mt-5 max-w-2xl font-display text-[26px] font-black leading-[1.12] tracking-[-0.035em] text-white sm:text-[32px] lg:text-[36px]">
                Proches du terrain, exigeants sur le résultat.
              </h2>

              <div className="mt-9 grid gap-5 sm:grid-cols-3 sm:gap-6">
                {PRINCIPLES.map((principle) => {
                  const Icon = principle.icon
                  return (
                    <div key={principle.title}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.08] text-gold">
                        <Icon size={18} />
                      </div>

                      <h3 className="mt-4 text-[14.5px] font-bold text-white">
                        {principle.title}
                      </h3>

                      <p className="mt-2 text-[12.5px] leading-[1.7] text-white/55">
                        {principle.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SUIVRE SUR LINKEDIN ==================== */}
      <section className="bg-[#F7F7F6] pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-6 rounded-[26px] border border-[#EFEDE8] bg-white p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0A66C2] text-white sm:h-14 sm:w-14">
                <Linkedin size={22} />
              </span>

              <div>
                <h3 className="font-display text-[21px] font-black tracking-[-0.03em] text-[#111827] sm:text-[24px]">
                  Suivez Industry X.0 sur LinkedIn
                </h3>

                <p className="mt-2.5 max-w-xl text-[14px] leading-[1.7] text-[#57534E]">
                  Salons, déploiements, nouveautés CIPA, recrutements : c’est là
                  que l’équipe partage son quotidien, au fil de l’eau. Le
                  meilleur endroit pour nous suivre entre deux visites du site.
                </p>
              </div>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_14px_34px_rgba(10,102,194,0.24)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#0959a8]"
            >
              Voir notre page
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== NOUS REJOINDRE / CONTACT ==================== */}
      <section className="bg-[#F7F7F6] pb-20 sm:pb-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[26px] border border-[#EFEDE8] bg-white p-7 sm:p-8">
              <h3 className="font-display text-[21px] font-black tracking-[-0.03em] text-[#111827] sm:text-[24px]">
                Envie de rejoindre l’équipe ?
              </h3>

              <p className="mt-3 text-[14px] leading-[1.7] text-[#57534E]">
                Nous recherchons en continu des profils industriels, produit et
                data qui veulent voir leur travail changer quelque chose dans un
                atelier. Écrivez-nous, même sans offre ouverte.
              </p>

              <a
                href="mailto:contact@industryx0.pro"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
              >
                <Mail size={15} />
                contact@industryx0.pro
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="rounded-[26px] border border-[#EFEDE8] bg-white p-7 sm:p-8">
              <h3 className="font-display text-[21px] font-black tracking-[-0.03em] text-[#111827] sm:text-[24px]">
                Où nous trouver
              </h3>

              <div className="mt-5 flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold">
                  <MapPin size={18} />
                </div>

                <p className="text-[14px] leading-[1.7] text-[#57534E]">
                  THE DOT
                  <br />
                  Cité les pins, Tunis 1053
                </p>
              </div>

              <Link
                href="/contact"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] px-5 py-3 text-[13.5px] font-semibold text-[#44403C] transition-all duration-300 hover:border-gold/40 hover:text-[#111827]"
              >
                Planifier un échange
                <ChevronRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
