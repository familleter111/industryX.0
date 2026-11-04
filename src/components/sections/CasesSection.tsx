'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { m as motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import AutoplayTimer from '@/components/ui/AutoplayTimer'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/hooks/useMotion'
import Section from '@/components/ui/Section'
import AppScreenPlaceholder from '@/components/ui/AppScreenPlaceholder'
import { featureTabs, type FeatureTab } from '@/lib/data/features'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

const COPY = {
  fr: {
    title: 'Tout ce qu’il faut pour gérer vos opérations industrielles',
    lead: 'Une plateforme unique pour piloter vos audits, inspections, contrôles et actions d’amélioration.',
    tabs: 'Usages de la plateforme',
    more: 'Découvrir la fonctionnalité',
    illustration: 'Illustration — valeurs d’exemple',
  },
  en: {
    title: 'Everything you need to run your industrial operations',
    lead: 'One platform to manage your audits, inspections, checks and improvement actions.',
    tabs: 'Platform use cases',
    more: 'Explore the feature',
    illustration: 'Illustration — sample values',
  },
}

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

/** Temps d'affichage d'un usage avant le suivant. */
const AUTOPLAY_MS = 7000

const tabId = (id: string) => `usage-tab-${id}`
const panelId = (id: string) => `usage-panel-${id}`

/* ─────────────────────────── COMPONENT ─────────────────────────── */

/**
 * Onglets des usages de CIPA (L1-06).
 *
 * Une seule source par onglet : l'objet `FeatureTab` (lib/data/features.ts)
 * porte titre, texte, puces, capture, alt et lien. L'état se réduit à
 * l'index actif ; tout l'affichage en découle, sans copie de contenu.
 *
 * Motif ARIA tablist / tab / tabpanel : flèches gauche-droite, Début et Fin
 * déplacent le focus et activent l'onglet ; un seul onglet est dans l'ordre
 * de tabulation. Les six panneaux sont rendus côté serveur (règle 5), les
 * inactifs portent `hidden` : leur texte est dans le HTML, leur image ne se
 * charge qu'à l'affichage.
 */
export default function CasesSection({
  availableScreenshots = [],
}: {
  /**
   * Onglets dont la capture existe dans public/, relevés par la page côté
   * serveur. Les autres affichent directement l'écran schématique : on ne
   * demande pas au navigateur un fichier dont on sait qu'il manque.
   */
  availableScreenshots?: string[]
}) {
  const m = useMotion()
  const t = useCopy(COPY)
  const FEATURE_TABS = featureTabs(useCurrentLocale())
  const [activeTab, setActiveTab] = useState(0)
  // Filet de sécurité : une capture qui échoue malgré tout bascule elle aussi
  // sur le placeholder.
  const [failed, setFailed] = useState<Record<string, true>>({})
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  /* Défilement automatique des usages, en boucle. En pause quand le
     visiteur survole ou parcourt au clavier les onglets ou la carte, et
     quand la section n'est pas à l'écran. La minuterie est une barre au bas
     de l'onglet actif (components/ui/AutoplayTimer) ; un clic sur un onglet
     la fait repartir de zéro. */
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { amount: 0.4 })
  const [holding, setHolding] = useState(false)
  const hold = {
    onPointerEnter: () => setHolding(true),
    onPointerLeave: () => setHolding(false),
    onFocus: () => setHolding(true),
    onBlur: () => setHolding(false),
  }
  const advance = () => setActiveTab((current) => (current + 1) % FEATURE_TABS.length)

  const select = (index: number, focus = false) => {
    setActiveTab(index)
    if (focus) tabRefs.current[index]?.focus()
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = FEATURE_TABS.length - 1
    const target = {
      ArrowRight: activeTab === last ? 0 : activeTab + 1,
      ArrowLeft: activeTab === 0 ? last : activeTab - 1,
      Home: 0,
      End: last,
    }[event.key]
    if (target === undefined) return
    event.preventDefault()
    select(target, true)
  }

  return (
    <Section
      deferRender
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
            {t.title}
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
            {t.lead}
          </p>
        </motion.div>

        {/* ─── TABS ─── */}
        <motion.div
          variants={m.fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
          className="mt-4 flex w-full justify-between gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center lg:mt-5 lg:flex-nowrap lg:justify-between"
          style={{ scrollbarWidth: 'none' }}
          role="tablist"
          aria-label={t.tabs}
          {...hold}
        >
          {FEATURE_TABS.map((item, index) => {
            const TabIcon = item.icon
            const isActive = activeTab === index
            return (
              <motion.button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                type="button"
                role="tab"
                id={tabId(item.id)}
                aria-controls={panelId(item.id)}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={onTabKeyDown}
                /*
                 * Sous 768 px le libellé passe en `hidden` : il ne reste que
                 * l'icône. `aria-label` porte le nom à toutes les tailles,
                 * `title` le montre au survol.
                 */
                aria-label={item.label}
                title={item.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl border px-3 py-2 sm:px-4 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
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
                <TabIcon size={16} className="shrink-0" aria-hidden="true" />
                <span className="hidden md:inline">{item.label}</span>
                {isActive && (
                  <AutoplayTimer
                    key={activeTab}
                    duration={AUTOPLAY_MS}
                    paused={holding || !inView}
                    onDone={advance}
                    className="absolute inset-x-0 bottom-0 h-[3px] bg-dark/35"
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* ─── PANNEAUX — tous dans le HTML, un seul visible ─── */}
        <div ref={cardRef} className="mt-4 lg:mt-5" {...hold}>
          {FEATURE_TABS.map((tab, index) => (
            <UsagePanel
              key={tab.id}
              tab={tab}
              active={index === activeTab}
              reduce={m.reduce}
              more={t.more}
              illustration={t.illustration}
              showPlaceholder={!availableScreenshots.includes(tab.id) || failed[tab.id] === true}
              onImageError={() => setFailed((prev) => ({ ...prev, [tab.id]: true }))}
            />
          ))}
        </div>
    </Section>
  )
}

function UsagePanel({
  tab,
  active,
  reduce,
  more,
  illustration,
  showPlaceholder,
  onImageError,
}: {
  tab: FeatureTab
  active: boolean
  reduce: boolean
  more: string
  illustration: string
  showPlaceholder: boolean
  onImageError: () => void
}) {
  const Icon = tab.icon
  const image = tab.tablet ?? tab.screenshot
  return (
    <motion.div
      role="tabpanel"
      id={panelId(tab.id)}
      aria-labelledby={tabId(tab.id)}
      hidden={!active}
      // Apparition à l'activation ; un panneau caché n'a rien à animer.
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 30 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[2rem]"
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
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
            <Icon size={22} style={{ color: colors.gold }} aria-hidden="true" />
          </div>

          <h3
            className="text-xl font-extrabold tracking-[-0.03em]"
            style={{ color: colors.text }}
          >
            {tab.title}
          </h3>

          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: colors.muted }}
          >
            {tab.description}
          </p>

          {/* Badge, optionnel : porté par la donnée de l'onglet */}
          {tab.badge && (
          <div
            className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
            style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.18)',
              // green-700, 4,7:1 sur ce fond (le green-600 tombait a 3,1:1).
              color: 'rgb(21 128 61)',
            }}
          >
            <CheckCircle2 size={16} aria-hidden="true" />
            {tab.badge}
          </div>
          )}

          {/* Benefits grid */}
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {tab.bullets.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2.5 rounded-xl p-2"
                style={{
                  background: 'rgba(15,23,42,0.03)',
                  border: `1px solid ${colors.border}`,
                }}
              >
                <CheckCircle2
                  size={18}
                  style={{ color: colors.gold }}
                  aria-hidden="true"
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.text }}
                >
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA link */}
          <Link
            href={tab.href}
            className="mt-4 flex min-h-11 items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
            // Or d'encre, 5,1:1 sur blanc (l'or de marque y tombait a 2,3:1).
            style={{ color: tokens.color.gold.ink }}
          >
            {more}
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {/* RIGHT — Mockup tablette (paysage, ratio iPad 4:3) */}
        <figure
          className="relative m-0 flex flex-col items-center justify-center overflow-hidden px-4 py-6 lg:p-6"
          style={{
            borderLeft: `1px solid ${colors.border}`,
            background:
              `radial-gradient(circle at 50% 28%, ${colors.goldBg}, transparent 60%), linear-gradient(160deg, ${colors.bg} 0%, ${tokens.color.cream.border} 100%)`,
          }}
        >
          {/* Cadre tablette : bordure fine et régulière, comme un iPad récent */}
          <div className="relative aspect-[4/3] w-full max-w-[440px] rounded-[1.75rem] border border-black/10 bg-gray-900 p-2.5 shadow-[0_30px_80px_rgba(15,23,42,0.30)]">
            {/* Boutons : veille et volume sur la tranche du haut */}
            <div className="absolute -top-[3px] left-10 h-[3px] w-10 rounded-t-sm bg-gray-900" />
            <div className="absolute -top-[3px] right-12 h-[3px] w-8 rounded-t-sm bg-gray-900" />
            <div className="absolute -top-[3px] right-[92px] h-[3px] w-8 rounded-t-sm bg-gray-900" />

            {/* Caméra frontale, dans la bordure */}
            <div className="absolute left-1/2 top-[3px] z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gray-700" />

            {/* Écran : dimensions réservées par le ratio 4:3 du cadre, donc
                pas de saut de mise en page pendant le chargement (L1-07). */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-white">
              {showPlaceholder ? (
                <AppScreenPlaceholder className="h-full w-full" />
              ) : (
                <Image
                  src={image.src}
                  alt={tab.screenshot.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 640px) 420px, 90vw"
                  // Chargement différé (défaut de next/image) : la section est
                  // loin sous la ligne de flottaison. Préchargée, cette capture
                  // disputait la bande passante à l'image du hero.
                  className="h-full w-full object-cover object-top"
                  onError={onImageError}
                />
              )}
            </div>
          </div>
          {/* Règle 3 : maquette aux valeurs inventées, signalée comme telle. */}
          <figcaption className="mt-3 text-center text-sm text-subtle">{illustration}</figcaption>
        </figure>
      </div>
    </motion.div>
  )
}
