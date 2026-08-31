'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Database,
  Eye,
  FlaskConical,
  Gauge,
  Leaf,
  Network,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react'

import SmartCarousel from '@/components/industries/SmartCarousel'
import { viewport } from '@/lib/motion'
import { INDUSTRIES } from '@/lib/data/industries'
import Footer from '@/components/layout/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
}

/**
 * Gabarit unique des pages sectorielles.
 *
 * Il portait auparavant six exemplaires quasi identiques, un par industrie.
 * La comparaison ligne a ligne n'a revele que vingt-neuf points de variation,
 * tous textuels : ils sont devenus les champs de `IndustryPageData`.
 */

export default function IndustryPage({ slug }: { slug: string }) {
  const data = INDUSTRIES[slug]
  const HeroIcon = data.heroIcon
  return (
    <main className="min-h-screen bg-[#F7F7F6] text-dark overflow-x-hidden font-body selection:bg-gold/30 selection:text-gold-900">

      {/* 1. HERO + 3 BÉNÉFICES CLÉS */}
      <section className="relative lg:min-h-screen lg:max-h-[1000px] flex flex-col justify-center pt-24 pb-10 lg:pt-28 lg:pb-8 overflow-hidden bg-mesh-light">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-5 sm:px-7 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-bold uppercase tracking-widest text-[#B6842B] mb-4"
              >
                <Zap size={11} className="text-[#DAA250]" />
                {"Secteur d'activité"}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[26px] sm:text-[32px] lg:text-[38px] xl:text-[42px] font-black font-display text-dark tracking-tight leading-[1.12] mb-4"
              >
                {"Comment CIPA transforme l'industrie"}{' '}
                <span className="text-[#DAA250]">
                  {data.headline}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600 mb-6 max-w-xl"
              >
                {data.intro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
                >
                  Demander une démo
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#core-ops"
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-350 bg-white/60 px-5 py-2.5 text-[13px] font-semibold text-[#44403C] backdrop-blur transition-all duration-300 hover:border-gold hover:bg-white"
                >
                  Découvrir les solutions
                  <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end relative"
            >
              <div className="absolute -inset-3 border border-dashed border-gold/20 rounded-full animate-[spin_100s_linear_infinite]" />
              <div className="absolute -inset-7 border border-gold/10 rounded-full pointer-events-none" />

              <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] xl:w-[400px] xl:h-[400px] rounded-full overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                <Image
                  src={data.hero.src}
                  alt={data.hero.alt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-1 -left-1 sm:left-2 bg-white/90 backdrop-blur border border-gold/30 rounded-xl p-2.5 shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/10 text-[#DAA250] flex items-center justify-center shrink-0">
                  <HeroIcon size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{data.heroBadge.label}</div>
                  <div className="text-[12px] font-extrabold text-dark">{data.heroBadge.value}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 lg:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {data.results
              .map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-xl px-4 py-4 border border-[#ECE7DD] shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center text-center transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)]"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Icon size={19} className="text-[#DAA250]" strokeWidth={1.75} />
                      <span className="text-[24px] font-black font-display text-[#DAA250] leading-none">
                        {stat.value}
                      </span>
                    </div>
                    <div className="text-[10px] font-black text-dark uppercase tracking-wider mb-1.5 leading-tight">
                      {stat.label}
                    </div>
                    <p className="text-[11px] leading-snug text-slate-500">{stat.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANDEAU DOMAINES DE VALEUR */}
      <section className="py-10 border-y border-[#ECE7DD] bg-[#F1EFE9]/40 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="bg-dark rounded-2xl px-6 py-5 md:px-10 flex flex-col md:flex-row items-center gap-5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-mesh-dark opacity-30" />
            <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 text-[#DAA250] flex items-center justify-center shrink-0 relative z-10">
              <HeroIcon size={19} />
            </div>
            <p className="text-[13px] sm:text-sm text-white/85 leading-relaxed relative z-10 text-center md:text-left">
              {"Des composants critiques à l'assemblage final du véhicule, CIPA aide les équipementiers et constructeurs à sécuriser la conformité réglementaire, fiabiliser la production et accélérer la traçabilité des pièces."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. CAROUSEL — 4 FAÇONS */}
      <section id="core-ops" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black font-display text-dark tracking-tight leading-[1.15] mb-4">
              <span className="md:block">{"4 façons dont CIPA renforce les "}</span>
              <span className="text-[#DAA250] md:block">
                {data.useCasesTitle}
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed">
              {"Naviguez entre les cartes pour explorer chaque levier : les données, les visuels et les comparaisons avant/après CIPA."}
            </p>
          </div>

          <SmartCarousel slides={data.coreSlides} accentLabel={data.coreAccentLabel} visuals={data.visuals} />
        </div>
      </section>

      {/* 4. CAROUSEL — 3 FAÇONS */}
      <section className="py-20 md:py-28 relative bg-[#F1EFE9]/40 border-y border-[#ECE7DD]">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black font-display text-dark tracking-tight leading-[1.15] mb-4">
              <span className="md:block">{"3 façons dont CIPA accélère la "}</span>
              <span className="text-[#DAA250] md:block">
                sécurité produit, l’innovation et la performance durable
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed">
              {"Trois leviers de croissance, illustrés par des données concrètes et des résultats mesurés chez nos clients."}
            </p>
          </div>

          <SmartCarousel slides={data.performanceSlides} accentLabel={data.performanceAccentLabel} visuals={data.visuals} />
        </div>
      </section>

      {/* 5. UNE PLATEFORME UNIQUE */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="bg-dark rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-mesh-dark opacity-30" />
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-4">
                  {data.platform.title}
                </h2>
                <p className="text-sm text-white/70 leading-relaxed">
                  {data.platform.desc}
                </p>
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  {data.platform.features
                .map((f, i) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-gold/40 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                        <Icon size={17} />
                      </div>
                      <span className="text-xs font-bold text-white leading-snug">{f.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. COMMENT CIPA FONCTIONNE */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black font-display text-dark tracking-tight mb-3">
              Comment <span className="text-gold">CIPA</span> fonctionne
            </h2>
            <p className="text-sm sm:text-[15px] text-slate-500">
              {"Cinq étapes, un cycle d'amélioration continue mesurable."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            <div className="hidden lg:block absolute top-[26px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-[#ECE7DD] z-0" />
              {data.steps
            .map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-[52px] h-[52px] rounded-2xl bg-white border border-[#ECE7DD] shadow-md text-gold flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-sm font-black text-dark mb-1.5">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-[190px]">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION FINAL */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark opacity-30" />
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-6">
            {data.cta.title}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {data.cta.text}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-dark shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-dark"
            >
              {"Planifier une démo de CIPA"}
              <ArrowRight size={15} className="text-dark transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:contact@industryx0.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-all duration-300"
            >
              Contacter un conseiller
            </a>
          </div>
        </div>
      </section>

      <Footer variant="compact" />
    </main>
  )
}
