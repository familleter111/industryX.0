import { Link } from '@/i18n/navigation'
import { ArrowRight, Handshake, Rocket, Users } from 'lucide-react'

import PartnersOrbit from '@/components/sections/PartnersOrbit'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/ui/Reveal'
import { useCopy } from '@/lib/i18n'

/* ============================================================
   DONNÉES
   ============================================================ */

// Les partenaires vivent dans components/partnerLogos.ts (orbite PartnersOrbit).

const BENEFIT_ICONS = [Rocket, Users, Handshake]

const COPY = {
  fr: {
    benefits: [
      ['Un produit prêt pour le terrain', 'CIPA est déployée en production dans des usines réelles, avec des utilisateurs terrain quotidiens.'],
      ['Une équipe qui accompagne', 'Cadrage, intégration, formation et suivi : nous restons impliqués jusqu’à la maîtrise complète.'],
      ['Une relation durable', 'Co-construction sur le long terme, avec des engagements clairs et des résultats mesurés.'],
    ],
    eyebrow: 'Devenir partenaire',
    title: 'Construisons ensemble la prochaine génération d’opérations industrielles.',
    cta: 'Échanger avec notre équipe',
  },
  en: {
    benefits: [
      ['A field-ready product', 'CIPA runs in production in real plants, with shop-floor users every day.'],
      ['A team that supports you', 'Scoping, integration, training and follow-up: we stay involved until you fully master it.'],
      ['A lasting relationship', 'Long-term co-creation, with clear commitments and measured results.'],
    ],
    eyebrow: 'Become a partner',
    title: 'Let’s build the next generation of industrial operations together.',
    cta: 'Talk to our team',
  },
}

/* ============================================================
   PAGE
   ============================================================ */

export default function PartnersPage() {
  const t = useCopy(COPY)
  const BENEFITS = BENEFIT_ICONS.map((icon, i) => ({ icon, title: t.benefits[i][0], desc: t.benefits[i][1] }))
  return (
    <main className="min-h-screen overflow-x-hidden pt-[82px] bg-[#F7F7F6] font-body text-dark selection:bg-gold/30">

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
                {t.eyebrow}
              </p>

              <h2 className="mt-5 max-w-2xl font-display text-[26px] font-black leading-[1.12] tracking-[-0.035em] text-white sm:text-[32px] lg:text-[36px]">
                {t.title}
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
                {t.cta}
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
