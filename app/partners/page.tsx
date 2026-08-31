import Link from 'next/link'
import { ArrowRight, Handshake, Rocket, Users } from 'lucide-react'

import PageHero from '@/components/ui/PageHero'
import PartnersOrbit from '@/components/sections/PartnersOrbit'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/ui/Reveal'

/* ============================================================
   DONNÉES
   ============================================================ */

// Les partenaires vivent dans components/partnerLogos.ts (orbite PartnersOrbit).

const BENEFITS = [
  {
    icon: Rocket,
    title: 'Un produit prêt pour le terrain',
    desc: 'CIPA est déployée en production dans des usines réelles, avec des utilisateurs terrain quotidiens.',
  },
  {
    icon: Users,
    title: 'Une équipe qui accompagne',
    desc: 'Cadrage, intégration, formation et suivi : nous restons impliqués jusqu’à la maîtrise complète.',
  },
  {
    icon: Handshake,
    title: 'Une relation durable',
    desc: 'Co-construction sur le long terme, avec des engagements clairs et des résultats mesurés.',
  },
]

/* ============================================================
   PAGE
   ============================================================ */

export default function PartnersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">

      <PageHero
        eyebrow="Partenaires"
        title="Un écosystème"
        accent="industriel & technologique"
        description="Industry X.0 avance entouré : partenaires cloud, cabinets de conseil, institutions et structures d’accompagnement qui rendent possible le déploiement de CIPA à l’échelle."
        primaryCta={{ label: 'Devenir partenaire', href: '/contact' }}
        secondaryCta={{ label: 'Voir nos clients', href: '/customers' }}
      />

      <PartnersOrbit variant="page" />

      {/* ==================== DEVENIR PARTENAIRE ==================== */}
      <section className="bg-[#F7F7F6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-7 lg:px-8">
          <Reveal className="relative overflow-hidden rounded-[30px] bg-[#0C0D12] p-7 sm:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full"
              style={{
                background: 'rgba(218,162,80,0.15)',
                filter: 'blur(90px)',
              }}
            />

            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
                Devenir partenaire
              </p>

              <h2 className="mt-5 max-w-2xl font-display text-[26px] font-black leading-[1.12] tracking-[-0.035em] text-white sm:text-[32px] lg:text-[36px]">
                Construisons ensemble la prochaine génération d’opérations
                industrielles.
              </h2>

              <div className="mt-9 grid gap-5 sm:grid-cols-3 sm:gap-6">
                {BENEFITS.map((benefit) => {
                  const Icon = benefit.icon
                  return (
                    <div key={benefit.title}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.08] text-gold">
                        <Icon size={18} />
                      </div>

                      <h3 className="mt-4 text-[14.5px] font-bold text-white">
                        {benefit.title}
                      </h3>

                      <p className="mt-2 text-[12.5px] leading-[1.7] text-white/55">
                        {benefit.desc}
                      </p>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-bold text-[#0C0D12] shadow-[0_14px_36px_rgba(218,162,80,0.25)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-gold-400"
              >
                Échanger avec notre équipe
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />

    </main>
  )
}
