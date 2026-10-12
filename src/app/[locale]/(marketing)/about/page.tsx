import { Link } from '@/i18n/navigation'
import {
  ArrowRight,
  Award,
  BrainCircuit,
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
  Users,
} from 'lucide-react'

import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import { LINKEDIN_URL } from '@/lib/data/socials'
import { PARTNERS } from '@/lib/data/partnerLogos'
import LogoMarquee from '@/components/ui/LogoMarquee'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/ui/Reveal'
import ValuesShowcase, { type Value } from '@/components/sections/ValuesShowcase'
import { useCopy } from '@/lib/i18n'

/* ============================================================
   DONNÉES
   ============================================================ */

const VALUE_STYLES: Pick<Value, 'icon' | 'tone'>[] = [
  { icon: Heart, tone: 'rose' },
  { icon: HeartHandshake, tone: 'pink' },
  { icon: ShieldCheck, tone: 'blue' },
  { icon: Smile, tone: 'emerald' },
  { icon: Target, tone: 'violet' },
  { icon: RefreshCw, tone: 'amber' },
]

const MISSION_ICONS = [Rocket, Database, Award, BrainCircuit]

const CERTIFICATION_NAMES = ['CEED Tunisia', 'Starti4', 'Startup Act']

const COPY = {
  fr: {
    values: [
      ['L’obsession du client', 'Chaque décision produit part des besoins réels du terrain.'],
      ['Chaleur humaine', 'Des relations sincères avec nos clients et entre nous.'],
      ['Intégrité', 'Transparence et honnêteté dans chaque engagement.'],
      ['Sérieux & bonne humeur', 'Exigence professionnelle, sans jamais perdre le sourire.'],
      ['Le goût du défi', 'Nous recherchons les problèmes complexes à résoudre.'],
      ['Durabilité', 'Construire des solutions qui créent un impact durable.'],
    ],
    mission: [
      'Solutions technologiques sur-mesure',
      'Insights & synthèses de données',
      'Accompagnement jusqu’à la maîtrise',
      'Une équipe produit, terrain & IA',
    ],
    certifications: [
      'Programme d’accompagnement entrepreneurial',
      'Certification Industrie 4.0',
      'Label startup innovante — Tunisie',
    ],
    eyebrow: 'À propos',
    title: 'Nous sommes',
    description:
      'Nous accélérons la transformation digitale des usines et des entreprises industrielles en démultipliant le potentiel et l’efficacité de leurs équipes grâce à la technologie.',
    demo: 'Demander une démo',
    discover: 'Découvrir CIPA',
    valuesBadge: 'Nos valeurs',
    valuesTitle: 'Nos',
    valuesAccent: 'valeurs',
    valuesSubtitle: 'Ce qui guide chacune de nos décisions, au quotidien.',
    valuesFootnote: 'Des valeurs partagées, une ambition commune :',
    valuesFootnoteAccent: 'faire mieux, ensemble.',
    missionEyebrow: 'Notre mission',
    missionTitle: 'Une industrie plus efficace, connectée et collaborative.',
    missionText: [
      'Nous donnons aux industriels une visibilité en temps réel sur leur',
      'qualité',
      ', leur',
      'sécurité',
      'et la',
      'satisfaction de leurs clients',
      ', pour transformer la donnée terrain en décisions concrètes et bâtir des opérations plus performantes.',
    ],
    whoTitle: 'Qui',
    whoAccent: 'sommes-nous',
    whoText:
      'Fondée en 2019 à Tunis, Industry X.0 est le nom que nous avons donné à notre startup : nous concevons des solutions technologiques permettant aux entreprises de maîtriser leur chaîne de valeur, leurs coûts, leur qualité et la satisfaction de leurs clients. Nos algorithmes délivrent des insights, des synthèses de données et des recommandations de décision. Nous personnalisons vos applications selon vos besoins : nous avons la technologie, nous construisons vos produits, nous vous accompagnons et vous formons jusqu’à la pleine maîtrise de',
    certifiedTitle: 'Certifiés',
    certifiedAccent: 'par',
    ecosystem: 'Notre écosystème de partenaires',
    follow: 'Suivez-nous sur les réseaux et recevez votre dose quotidienne de conseils.',
    ctaTitle: 'Prêt à transformer vos opérations avec',
    ctaText:
      'Discutons de vos enjeux qualité, production et conformité, et voyons ensemble comment Industry X.0 peut vous accompagner.',
    ctaButton: 'Nous contacter',
  },
  en: {
    values: [
      ['Customer obsession', 'Every product decision starts from real needs on the shop floor.'],
      ['Human warmth', 'Genuine relationships with our customers and with each other.'],
      ['Integrity', 'Transparency and honesty in every commitment.'],
      ['Seriousness & good humor', 'Professional standards, without ever losing our smile.'],
      ['A taste for challenges', 'We go looking for complex problems to solve.'],
      ['Sustainability', 'Building solutions that create lasting impact.'],
    ],
    mission: [
      'Tailor-made technology solutions',
      'Data insights & summaries',
      'Support until you master it',
      'A product, field & AI team',
    ],
    certifications: [
      'Entrepreneurship support program',
      'Industry 4.0 certification',
      'Innovative startup label — Tunisia',
    ],
    eyebrow: 'About us',
    title: 'We are',
    description:
      'We accelerate the digital transformation of factories and industrial companies by multiplying the potential and efficiency of their teams through technology.',
    demo: 'Book a demo',
    discover: 'Discover CIPA',
    valuesBadge: 'Our values',
    valuesTitle: 'Our',
    valuesAccent: 'values',
    valuesSubtitle: 'What guides every decision we make, every day.',
    valuesFootnote: 'Shared values, one common ambition:',
    valuesFootnoteAccent: 'doing better, together.',
    missionEyebrow: 'Our mission',
    missionTitle: 'A more efficient, connected and collaborative industry.',
    missionText: [
      'We give manufacturers real-time visibility on their',
      'quality',
      ', their',
      'safety',
      'and their',
      'customer satisfaction',
      ', to turn shop-floor data into concrete decisions and build higher-performing operations.',
    ],
    whoTitle: 'Who',
    whoAccent: 'we are',
    whoText:
      'Founded in 2019 in Tunis, Industry X.0 is the name we gave our startup: we design technology solutions that help companies master their value chain, their costs, their quality and their customers’ satisfaction. Our algorithms deliver insights, data summaries and decision recommendations. We tailor your applications to your needs: we have the technology, we build your products, and we support and train you until you fully master',
    certifiedTitle: 'Certified',
    certifiedAccent: 'by',
    ecosystem: 'Our partner ecosystem',
    follow: 'Follow us on social media for your daily dose of tips.',
    ctaTitle: 'Ready to transform your operations with',
    ctaText:
      'Let’s talk about your quality, production and compliance challenges, and see together how Industry X.0 can support you.',
    ctaButton: 'Contact us',
  },
}

/* ============================================================
   PAGE
   ============================================================ */

export default function AboutPage() {
  const t = useCopy(COPY)
  const VALUES: Value[] = VALUE_STYLES.map((style, i) => ({
    ...style,
    title: t.values[i][0],
    desc: t.values[i][1],
  }))
  const MISSION_PILLARS = MISSION_ICONS.map((icon, i) => ({ icon, label: t.mission[i] }))
  const CERTIFICATIONS = CERTIFICATION_NAMES.map((name, i) => ({ name, desc: t.certifications[i] }))
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">

      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        accent="Industry X.0"
        description={t.description}
        primaryCta={{ label: t.demo, href: '/contact' }}
        secondaryCta={{ label: t.discover, href: '/#solutions' }}
      />

      {/* ==================== NOS VALEURS ==================== */}
      <section className="relative overflow-hidden bg-[#F7F7F6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <ValuesShowcase
            badge={t.valuesBadge}
            title={t.valuesTitle}
            accent={t.valuesAccent}
            subtitle={t.valuesSubtitle}
            values={VALUES}
            footnote={{
              icon: Users,
              text: t.valuesFootnote,
              accent: t.valuesFootnoteAccent,
            }}
          />
        </div>
      </section>

      {/* ==================== NOTRE MISSION ==================== */}
      <section className="bg-[#F7F7F6] pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <Reveal className="relative overflow-hidden rounded-[30px] bg-[#0C0D12] p-7 sm:p-10 lg:p-12">
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
                  {t.missionEyebrow}
                </p>

                <h2 className="mt-5 font-display text-[26px] font-black leading-[1.12] tracking-[-0.035em] text-white sm:text-[32px] lg:text-[36px]">
                  {t.missionTitle}
                </h2>

                <p className="mt-5 max-w-xl text-[14px] leading-[1.75] text-white/60 sm:text-[15px]">
                  {t.missionText[0]}{' '}
                  <span className="font-semibold text-white">{t.missionText[1]}</span>
                  {t.missionText[2]}{' '}
                  <span className="font-semibold text-white">{t.missionText[3]}</span>{' '}
                  {t.missionText[4]}{' '}
                  <span className="font-semibold text-white">{t.missionText[5]}</span>
                  {t.missionText[6]}
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
          </Reveal>
        </div>
      </section>

      {/* ==================== QUI SOMMES-NOUS ==================== */}
      <section className="bg-[#F7F7F6] pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[900px] px-5 sm:px-7 lg:px-8">
          <SectionHeading badge={null} title={t.whoTitle} accent={t.whoAccent} />

          <Reveal className="mt-8 text-center text-[14.5px] leading-[1.85] text-[#57534E] sm:text-[15.5px]">
            {t.whoText}{' '}
            <span className="font-semibold text-[#111827]">CIPA</span>.
          </Reveal>
        </div>
      </section>

      {/* ==================== CERTIFIÉS PAR ==================== */}
      <section className="border-y border-[#EDEBE5] bg-[#F2F1EC] py-14 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <SectionHeading badge={null} title={t.certifiedTitle} accent={t.certifiedAccent} />

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
                  <p className="mt-0.5 text-[12px] leading-snug text-subtle">
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
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-subtle sm:text-[11px]">
          {t.ecosystem}
        </p>

        <LogoMarquee
          logos={PARTNERS}
          className="mt-8"
          copies={4}
          cellClassName="w-[170px] px-4 sm:w-[200px]"
        />
      </section>

      {/* ==================== RÉSEAUX SOCIAUX ==================== */}
      <section className="bg-[#F7F7F6] pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <div className="relative overflow-hidden rounded-[26px] bg-[#1C1C1F] px-6 py-9 text-center">
            <p className="text-[13.5px] font-semibold text-gold sm:text-[15px]">
              {t.follow}
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
            {t.ctaTitle}{' '}
            <span className="text-gold-deep">CIPA</span> ?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-[1.7] text-[#57534E] sm:text-[15px]">
            {t.ctaText}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#111827] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_36px_rgba(17,24,39,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
            >
              {t.ctaButton}
              <ArrowRight
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
