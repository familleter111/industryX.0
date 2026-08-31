import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Car,
  ChevronRight,
  ClipboardCheck,
  Factory,
  FileText,
  HelpCircle,
  Mail,
  ShieldCheck,
  Users,
  Utensils,
  Zap,
} from 'lucide-react'

import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import Footer from '@/components/layout/Footer'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'

/* ============================================================
   DONNÉES
   ============================================================ */

/**
 * Guides et analyses publiés.
 * Volontairement vide : la grille remplace l'état « bientôt disponible »
 * dès qu'un article réel y est ajouté.
 */
type Article = {
  title: string
  excerpt: string
  category: string
  readingTime: string
  href: string
}

const ARTICLES: Article[] = []

const SECTOR_BRIEFS = [
  {
    icon: ShieldCheck,
    title: 'Pharmaceutique',
    desc: 'GMP, 21 CFR Part 11, déviations, CAPA et dossier de lot électronique.',
    href: '/industries/pharma',
  },
  {
    icon: Utensils,
    title: 'Agroalimentaire & boissons',
    desc: 'Sécurité alimentaire, contrôles qualité et traçabilité terrain.',
    href: '/industries/food',
  },
  {
    icon: ClipboardCheck,
    title: 'Cosmétique & dispositifs médicaux',
    desc: 'Conformité, inspections et maîtrise documentaire opérationnelle.',
    href: '/industries/cosmetics',
  },
  {
    icon: Car,
    title: 'Automobile & composants',
    desc: 'Maîtrise process, audits terrain et plans d’action structurés.',
    href: '/industries/automotive',
  },
  {
    icon: Zap,
    title: 'Électronique & câblage',
    desc: 'Standards terrain, contrôles process et réduction des écarts.',
    href: '/industries/electronics',
  },
  {
    icon: Factory,
    title: 'Packaging & plasturgie',
    desc: 'Suivi production, incidents qualité et amélioration continue.',
    href: '/industries/packaging',
  },
]

const NEXT_STEPS = [
  {
    icon: HelpCircle,
    title: 'Questions fréquentes',
    desc: 'Durée d’une démo, intégrations, accompagnement, délais de déploiement.',
    href: '/faq',
    cta: 'Lire les réponses',
  },
  {
    icon: Users,
    title: 'Cas clients',
    desc: 'Comment des industriels utilisent CIPA au quotidien, secteur par secteur.',
    href: '/customers',
    cta: 'Voir les retours',
  },
  {
    icon: FileText,
    title: 'Démonstration guidée',
    desc: '45 minutes avec un expert, centrées sur vos enjeux et votre contexte.',
    href: '/contact',
    cta: 'Planifier une démo',
  },
]

/* ============================================================
   PAGE
   ============================================================ */

export default function ResourcesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">

      <PageHero
        eyebrow="Ressources"
        title="Guides &"
        accent="insights"
        description="Analyses sectorielles, repères sur l’excellence opérationnelle et réponses concrètes pour digitaliser vos processus qualité, production et maintenance."
        primaryCta={{ label: 'Parler à un expert', href: '/contact' }}
        secondaryCta={{ label: 'Consulter la FAQ', href: '/faq' }}
      />

      {/* ==================== ANALYSES SECTORIELLES ==================== */}
      <section className="bg-[#F7F7F6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            badge={null}
            title="Analyses"
            accent="sectorielles"
            subtitle="Les enjeux, les référentiels et les cas d’usage CIPA, détaillés pour chacun des six secteurs que nous couvrons."
          />

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {SECTOR_BRIEFS.map((brief, index) => {
              const Icon = brief.icon
              return (
                <RevealItem key={brief.href}>
                  <Link
                    href={brief.href}
                    className="group flex h-full flex-col rounded-[22px] border border-[#EFEDE8] bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-[2px] hover:border-gold/30 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F5F4] text-[#44403C] transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-[#B6842B]">
                      <Icon size={19} strokeWidth={1.9} />
                    </div>

                    <h3 className="mt-5 text-[15.5px] font-bold tracking-[-0.02em] text-[#111827]">
                      {brief.title}
                    </h3>

                    <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-[#78716C]">
                      {brief.desc}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#B6842B]">
                      Lire la fiche
                      <ChevronRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ==================== GUIDES & INSIGHTS ==================== */}
      <section className="border-y border-[#EDEBE5] bg-[#F2F1EC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading
            badge={null}
            title="Guides &"
            accent="publications"
            subtitle="Des formats courts et opérationnels, écrits par nos experts terrain et produit."
          />

          {ARTICLES.length > 0 ? (
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
              {ARTICLES.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group flex h-full flex-col rounded-[22px] border border-[#E7E5E4] bg-white p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-gold/30"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-gold/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#B6842B]">
                    {article.category}
                  </span>

                  <h3 className="mt-4 text-[16px] font-bold leading-snug tracking-[-0.02em] text-[#111827]">
                    {article.title}
                  </h3>

                  <p className="mt-2.5 flex-1 text-[13px] leading-[1.65] text-[#78716C]">
                    {article.excerpt}
                  </p>

                  <span className="mt-5 text-[12px] text-[#A8A29E]">
                    {article.readingTime}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <Reveal className="mx-auto mt-12 flex max-w-2xl flex-col items-center rounded-[26px] border border-dashed border-[#DDD9CF] bg-white/70 px-6 py-12 text-center lg:mt-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827] text-gold">
                <BookOpen size={22} />
              </div>

              <h3 className="mt-6 font-display text-[19px] font-black tracking-[-0.03em] text-[#111827] sm:text-[21px]">
                Nos premiers guides arrivent
              </h3>

              <p className="mt-3 max-w-md text-[13.5px] leading-[1.7] text-[#57534E] sm:text-[14.5px]">
                Nous préparons une série de guides pratiques sur la
                digitalisation des audits, la gestion des non-conformités et le
                pilotage de la performance industrielle. Dites-nous quel sujet
                vous intéresse en priorité.
              </p>

              <a
                href="mailto:contact@industryx0.pro?subject=Guides%20%26%20insights%20Industry%20X.0"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
              >
                <Mail size={15} />
                Proposer un sujet
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          )}
        </div>
      </section>

      {/* ==================== ALLER PLUS LOIN ==================== */}
      <section className="bg-[#F7F7F6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading badge={null} title="Aller plus" accent="loin" />

          <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {NEXT_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <Link
                  key={step.href}
                  href={step.href}
                  className="group flex h-full flex-col rounded-[26px] border border-[#EFEDE8] bg-white p-7 shadow-[0_14px_38px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-[2px] hover:border-gold/30 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111827] text-gold">
                    <Icon size={20} strokeWidth={1.9} />
                  </div>

                  <h3 className="mt-5 text-[17px] font-bold tracking-[-0.02em] text-[#111827]">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.7] text-[#78716C]">
                    {step.desc}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#B6842B]">
                    {step.cta}
                    <ChevronRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />

    </main>
  )
}
