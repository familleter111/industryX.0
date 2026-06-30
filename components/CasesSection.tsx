'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ClipboardCheck,
  SearchCheck,
  GitBranch,
  Factory,
  Route,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react'

/* ─────────────────────────── PALETTE (aligne sur Hero) ─────────────────────────── */
const colors = {
  bg: '#F7F7F6',
  text: '#0F172A',
  muted: '#57534E',
  gold: '#DAA250',
  goldBg: 'rgba(218,162,80,0.08)',
  goldBdr: 'rgba(218,162,80,0.18)',
  green: '#22C55E',
  surface: '#FFFFFF',
  border: 'rgba(15,23,42,0.06)',
}

/* ─────────────────────────── DATA ─────────────────────────── */
const useCases = [
  {
    icon: ClipboardCheck,
    title: 'Audits internes',
    description:
      "Préparez, exécutez et suivez vos audits dans un environnement standardisé avec une traçabilité complète.",
    benefits: [
      'Checklists intelligentes',
      'Rapports automatiques',
      'Suivi des écarts',
      'Validation numérique',
    ],
    image: '/audit.png',
  },
  {
    icon: SearchCheck,
    title: 'Inspections qualité',
    description:
      "Digitalisez les inspections terrain pour améliorer la qualité des données et accélérer les prises de décision.",
    benefits: [
      'Collecte mobile',
      'Photos annotées',
      'Contrôles standardisés',
      'Historique complet',
    ],
    image: '/audit.png',
  },
  {
    icon: GitBranch,
    title: 'Déviations & NC',
    description:
      "Centralisez la gestion des non-conformités depuis leur détection jusqu'à leur clôture.",
    benefits: [
      'Workflow automatisé',
      'Actions correctives',
      'Validation multi-niveaux',
      'Suivi temps réel',
    ],
    image: '/audit.png',
  },
  {
    icon: Factory,
    title: 'Contrôles production',
    description:
      'Renforcez le pilotage qualité directement sur les lignes de fabrication.',
    benefits: [
      'Contrôles périodiques',
      'Alertes instantanées',
      'Indicateurs terrain',
      'Traçabilité totale',
    ],
    image: '/audit.png',
  },
  {
    icon: Route,
    title: 'Tournées terrain',
    description:
      'Organisez les rondes et inspections opérationnelles avec une exécution homogène.',
    benefits: [
      'Planification simple',
      'Suivi GPS',
      'Checklists terrain',
      'Historique des visites',
    ],
    image: '/audit.png',
  },
  {
    icon: TrendingUp,
    title: 'Amélioration continue',
    description:
      'Transformez vos données terrain en plans d\u2019actions et en gains de performance.',
    benefits: [
      'Tableaux de bord',
      'KPIs en temps réel',
      'Analyses avancées',
      'Suivi des progrès',
    ],
    image: '/audit.png',
  },
]

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function CasesSection() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const active = useCases[activeTab]
  const Icon = active.icon

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-8 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-8"
      style={{ background: colors.bg, fontFamily: 'var(--font-inter)' }}
    >
      {/* ─── BACKGROUND (identique au Hero) ─── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #F8F8F7 0%, #F3F4F6 40%, #FAFAF9 100%)',
          }}
        />

        {/* Green glow — coin haut gauche */}
        <div
          className="absolute left-0 top-[-5%] h-[480px] w-[480px] rounded-full"
          style={{
            background: 'rgba(34,197,94,0.09)',
            filter: 'blur(130px)',
          }}
        />

        {/* Gold glow — coin bas droite */}
        <div
          className="absolute bottom-[-5%] right-0 h-[480px] w-[480px] rounded-full"
          style={{
            background: 'rgba(218,162,80,0.09)',
            filter: 'blur(130px)',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* ─── HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >

          <h2
            className="text-2xl font-extrabold tracking-[-0.04em] md:text-3xl"
            style={{ color: colors.text }}
          >
            Tout ce qu&apos;il faut pour gérer vos{' '}
            <span style={{ color: colors.gold }}>
              opérations industrielles
            </span>
          </h2>

          {/* Gold divider */}
          <div
            className="mx-auto mt-2 h-[3px] w-16 rounded-full"
            style={{ background: colors.gold }}
          />

          <p
            className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed"
            style={{ color: colors.muted }}
          >
            Une plateforme unique pour piloter vos audits,
            inspections, contrôles et actions d&apos;amélioration.
          </p>
        </motion.div>

        {/* ─── TABS ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-4 flex w-full justify-between gap-2 overflow-x-auto pb-1 lg:mt-5"
          style={{ scrollbarWidth: 'none' }}
        >
          {useCases.map((item, index) => {
            const TabIcon = item.icon
            const isActive = activeTab === index
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                title={item.title}
                className="group flex shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 sm:px-4 text-sm font-semibold transition-all duration-300"
                style={{
                  background: isActive ? colors.gold : 'rgba(255,255,255,0.80)',
                  borderColor: isActive ? colors.gold : colors.border,
                  color: isActive ? '#111827' : colors.muted,
                  boxShadow: isActive
                    ? '0 8px 28px rgba(218,162,80,0.22)'
                    : '0 2px 8px rgba(15,23,42,0.04)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <TabIcon size={16} className="shrink-0" />
                <span className="hidden md:inline">{item.title}</span>
              </button>
            )
          })}
        </motion.div>

        {/* ─── CONTENT CARD ─── */}
        <div className="mt-4 lg:mt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[2rem]"
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                boxShadow: '0 30px 80px rgba(15,23,42,0.08)',
              }}
            >
              <div className="grid lg:grid-cols-2">

                {/* LEFT — Texte */}
                <div className="p-5 lg:p-6">
                  {/* Icon badge */}
                  <div
                    className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: colors.goldBg, border: `1px solid ${colors.goldBdr}` }}
                  >
                    <Icon size={22} style={{ color: colors.gold }} />
                  </div>

                  <h3
                    className="text-xl font-extrabold tracking-[-0.03em]"
                    style={{ color: colors.text }}
                  >
                    {active.title}
                  </h3>

                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: colors.muted }}
                  >
                    {active.description}
                  </p>

                  {/* Traçabilité badge */}
                  <div
                    className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold"
                    style={{
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.18)',
                      color: '#16A34A',
                    }}
                  >
                    <CheckCircle2 size={16} />
                    Processus entièrement traçable
                  </div>

                  {/* Benefits grid */}
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {active.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 rounded-xl p-2"
                        style={{
                          background: 'rgba(15,23,42,0.03)',
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        <CheckCircle2
                          size={18}
                          style={{ color: colors.gold }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: colors.text }}
                        >
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA link */}
                  <button
                    className="mt-4 flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                    style={{ color: colors.gold }}
                  >
                    Découvrir la fonctionnalité
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* RIGHT — Mockup iPhone vierge (#9 : à personnaliser avec image/GIF) */}
                <div
                  className="relative flex items-center justify-center overflow-hidden p-4 lg:p-5"
                  style={{
                    borderLeft: `1px solid ${colors.border}`,
                    background:
                      'radial-gradient(circle at 50% 28%, rgba(218,162,80,0.10), transparent 60%), linear-gradient(160deg, #F8F8F7 0%, #EEEEEA 100%)',
                  }}
                >
                  {/* Cadre iPhone */}
                  <div className="relative h-[320px] w-[158px] rounded-[2rem] border border-black/10 bg-[#0F172A] p-1.5 shadow-[0_30px_70px_rgba(15,23,42,0.30)]">
                    {/* Boutons latéraux */}
                    <div className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-l-sm bg-[#0F172A]" />
                    <div className="absolute -left-[3px] top-[104px] h-8 w-[3px] rounded-l-sm bg-[#0F172A]" />
                    <div className="absolute -right-[3px] top-[88px] h-11 w-[3px] rounded-r-sm bg-[#0F172A]" />

                    {/* Écran */}
                    <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-white">
                      {/* Dynamic island */}
                      <div className="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />

                      {/* ===== Zone à personnaliser : ajoutez ici votre image ou GIF ===== */}
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#FAFAF9] to-[#F1F1EE]">
                        <div className="flex flex-col items-center gap-2 px-5 text-center opacity-60">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-xl"
                            style={{
                              background: colors.goldBg,
                              border: `1px solid ${colors.goldBdr}`,
                            }}
                          >
                            <ImageIcon size={20} style={{ color: colors.gold }} />
                          </div>
                          <p className="text-[11px] font-medium leading-relaxed" style={{ color: colors.muted }}>
                            Votre visuel ici
                            <br />
                            (image ou GIF)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}