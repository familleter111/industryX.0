'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'
import Section from '@/components/ui/Section'
import AppScreenPlaceholder from '@/components/ui/AppScreenPlaceholder'
import { FEATURE_TABS } from '@/lib/data/features'

/* ─────────────────────────── PALETTE (aligne sur Hero) ─────────────────────────── */
const colors = {
  bg: 'rgb(245 245 244)', // stone-100
  text: 'rgb(17 24 39)', // gray-900
  muted: 'rgb(87 83 78)', // stone-600
  gold: tokens.color.gold.DEFAULT,
  goldBg: 'rgba(218,162,80,0.08)',
  goldBdr: 'rgba(218,162,80,0.18)',
  surface: 'rgb(255 255 255)',
  border: 'rgba(15,23,42,0.06)',
}

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function CasesSection() {
  const m = useMotion()
  const [activeTab, setActiveTab] = useState(0)
  // Une capture qui echoue bascule sur le placeholder sans casser la page.
  const [failed, setFailed] = useState<Record<string, true>>({})

  const active = FEATURE_TABS[activeTab]
  const Icon = active.icon
  const showPlaceholder = failed[active.id] === true

  return (
    <Section
      className="font-inter"
      variant="default"
      background="white"
      backdrop={
        <AnimatedMeshBackground
          gradient={tokens.gradient.section}
          orbs={[
            { color: 'rgba(34,197,94,0.09)', size: 480, position: { left: '0', top: '-5%' }, duration: 11, parallax: 30 },
            { color: 'rgba(218,162,80,0.09)', size: 480, position: { right: '0', bottom: '-5%' }, duration: 13, parallax: 40 },
          ]}
        />
      }
    >
      {/* ─── BACKGROUND — mesh animé (identique au Hero) ─── */}


        {/* ─── HEADER ─── */}
        <motion.div
          variants={m.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          className="mx-auto max-w-4xl text-center"
        >

          <h2
            className="text-2xl font-extrabold tracking-[-0.04em] md:text-3xl"
            style={{ color: colors.text }}
          >
            Tout ce qu&apos;il faut pour gérer vos{' '}
            opérations industrielles
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
          variants={m.fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          className="mt-4 flex w-full justify-between gap-2 overflow-x-auto pb-1 lg:mt-5"
          style={{ scrollbarWidth: 'none' }}
        >
          {FEATURE_TABS.map((item, index) => {
            const TabIcon = item.icon
            const isActive = activeTab === index
            return (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                title={item.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group flex shrink-0 items-center justify-center gap-2 rounded-xl border px-3 py-2 sm:px-4 text-sm font-semibold transition-colors duration-300"
                style={{
                  background: isActive ? colors.gold : 'rgba(255,255,255,0.80)',
                  borderColor: isActive ? colors.gold : colors.border,
                  color: isActive ? colors.text : colors.muted,
                  boxShadow: isActive
                    ? '0 8px 28px rgba(218,162,80,0.22)'
                    : '0 2px 8px rgba(15,23,42,0.04)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <TabIcon size={16} className="shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </motion.button>
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

                  {/* Badge, optionnel : porte par la donnee de l'onglet */}
                  {active.badge && (
                  <div
                    className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold"
                    style={{
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.18)',
                      color: 'rgb(22 163 74)', // green-600
                    }}
                  >
                    <CheckCircle2 size={16} />
                    {active.badge}
                  </div>
                  )}

                  {/* Benefits grid */}
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {active.bullets.map((benefit, index) => (
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
                  <Link
                    href={active.href}
                    // Les pages /solutions/* n'existent pas encore : sans ce
                    // drapeau Next les precharge et la home emet six 404.
                    prefetch={false}
                    className="mt-4 flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                    style={{ color: colors.gold }}
                  >
                    Découvrir la fonctionnalité
                    <ChevronRight size={18} />
                  </Link>
                </div>

                {/* RIGHT — Mockup iPhone vierge (#9 : à personnaliser avec image/GIF) */}
                <div
                  className="relative flex items-center justify-center overflow-hidden p-4 lg:p-5"
                  style={{
                    borderLeft: `1px solid ${colors.border}`,
                    background:
                      `radial-gradient(circle at 50% 28%, ${colors.goldBg}, transparent 60%), linear-gradient(160deg, ${colors.bg} 0%, ${tokens.color.cream.border} 100%)`,
                  }}
                >
                  {/* Cadre iPhone */}
                  <div className="relative h-[320px] w-[158px] rounded-[2rem] border border-black/10 bg-gray-900 p-1.5 shadow-[0_30px_70px_rgba(15,23,42,0.30)]">
                    {/* Boutons latéraux */}
                    <div className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-l-sm bg-gray-900" />
                    <div className="absolute -left-[3px] top-[104px] h-8 w-[3px] rounded-l-sm bg-gray-900" />
                    <div className="absolute -right-[3px] top-[88px] h-11 w-[3px] rounded-r-sm bg-gray-900" />

                    {/* Écran */}
                    <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-white">
                      {/* Dynamic island */}
                      <div className="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />

                      {/* Capture de l'onglet actif. Tant que le fichier n'existe
                          pas, onError bascule sur l'ecran schematique : la page
                          ne montre jamais d'image cassee. */}
                      {showPlaceholder ? (
                        <AppScreenPlaceholder className="h-full w-full" />
                      ) : (
                        <Image
                          key={active.id}
                          src={active.screenshot.src}
                          alt={active.screenshot.alt}
                          width={active.screenshot.width}
                          height={active.screenshot.height}
                          sizes="144px"
                          className="h-full w-full object-cover"
                          onError={() =>
                            setFailed((prev) => ({ ...prev, [active.id]: true }))
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
    </Section>
  )
}