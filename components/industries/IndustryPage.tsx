'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
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
import heroStyles from '@/components/industries/hero.module.css'

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

      {/* 1. HERO — CIPA & le secteur */}
      <section className={`${heroStyles.hero} relative overflow-hidden bg-white pt-[82px] pb-6`}>
        <div className={`${heroStyles.content} relative lg:min-h-[calc(min(40.5vw,570px,100svh_-_150px)_-_2.5rem)]`}>
          <div className={`${heroStyles.grid} mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-8 px-5 sm:px-7 lg:grid-cols-12 lg:gap-6 lg:px-10`}>
            {/* ---------- Colonne texte ---------- */}
            <div className={`${heroStyles.copy} relative z-10 pt-10 lg:col-span-6 lg:pt-[clamp(2rem,3vw,3rem)] lg:pb-4`}>
              <div className={heroStyles.intro}>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#EFDFC4] bg-[#FDF7EC] py-2 pl-3.5 pr-5"
                >
                  <Zap size={14} aria-hidden="true" className="text-[#DAA250]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B6842B] sm:text-[11px]">
                    {"Secteur d'activité"}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`${heroStyles.title} mt-6 font-display text-[32px] font-black leading-[1.08] tracking-[-0.02em] text-dark sm:text-[40px] lg:text-[clamp(32px,3.5vw_-_4px,46px)]`}
                >
                  {"Comment CIPA transforme l'industrie "}
                  <span className="text-[#DAA250]">{data.headline}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 max-w-[34rem] text-[14px] leading-[1.75] text-[#57534E] sm:text-[15.5px]"
                >
                  {data.intro}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 flex flex-wrap items-center gap-3.5"
                >
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#111827] px-7 py-4 text-[14px] font-semibold text-white shadow-[0_10px_30px_rgba(17,24,39,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
                  >
                    Demander une démo
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#core-ops"
                    className="group inline-flex items-center gap-3 rounded-full border border-[#E4DED2] bg-white px-7 py-4 text-[14px] font-semibold text-[#292524] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_10px_26px_rgba(218,162,80,0.18)]"
                  >
                    Découvrir les solutions
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </div>

              {/* Les trois indicateurs reprennent les libelles des resultats mesures. */}
              <ul className={`${heroStyles.indicators} mt-10 grid grid-cols-3 gap-x-3 sm:gap-x-6`}>
                {data.results.slice(0, 3).map((stat) => (
                  <li key={stat.label} className="flex items-start gap-2 sm:items-center">
                    <CheckCircle2 size={15} aria-hidden="true" className="shrink-0 text-[#22C55E]" />
                    <span className="text-[13px] font-medium text-[#57534E]">{stat.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------- Colonne visuel ---------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={`${heroStyles.visual} relative -mx-5 sm:-mx-7 lg:absolute lg:right-0 lg:top-0 lg:m-0 lg:w-[54%] lg:max-w-[min(760px,calc((100svh_-_150px)*4/3))]`}
            >
              <div className={`${heroStyles.imageFrame} relative w-full`}>
                <Image
                  src={data.hero.src}
                  alt={data.hero.alt}
                  width={1448}
                  height={1086}
                  priority
                  sizes="(max-width: 1023px) 100vw, (max-width: 1439px) 54vw, 57vw"
                  className={`${heroStyles.image} block h-auto w-full select-none object-contain`}
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-white to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-gradient-to-t from-white to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className={`${heroStyles.footer} relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-7 lg:px-10`}>
          {/* ---------- Barre de bas de héros ---------- */}
          <div className="mt-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-9 rounded-full bg-[#DAA250]" />
                <span className="h-1.5 w-5 rounded-full bg-[#EBD3AC]" />
                <span className="h-1.5 w-5 rounded-full bg-[#E7E2D8]" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8A837A]">
                {"De la conformité à l'excellence opérationnelle"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8A837A]">
              {['Qualité', 'Production', 'Maintenance', 'R&D', 'Impact'].map((item, i) => (
                <span key={item} className="flex items-center gap-2.5">
                  {i > 0 && <span className="text-[#DAA250]">•</span>}
                  {item}
                </span>
              ))}
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
            <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 text-gold-deep flex items-center justify-center shrink-0 relative z-10">
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
              <span className="text-gold-deep md:block">
                {data.useCasesTitle}
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-subtle leading-relaxed">
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
              <span className="text-gold-deep md:block">
                sécurité produit, l’innovation et la performance durable
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-subtle leading-relaxed">
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
              Comment <span className="text-gold-deep">CIPA</span> fonctionne
            </h2>
            <p className="text-sm sm:text-[15px] text-subtle">
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
                  <p className="text-[11px] text-subtle leading-relaxed max-w-[190px]">{step.desc}</p>
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
