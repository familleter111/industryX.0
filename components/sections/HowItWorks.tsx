'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import {
  Clock,
  AlertTriangle,
  Shield,
  Crosshair,
  TrendingUp,
  Wrench,
  Users,
} from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { tokens } from '@/lib/tokens'
import { EASE } from '@/lib/motion'
import { useMotion } from '@/lib/useMotion'

// Data for middle stat cards — palette or/graphite du Hero, le rouge n'accentue que le chiffre (gravité)
const stats = [
  {
    icon: Clock,
    value: '+30%',
    label: 'DE TEMPS PERDU',
    desc: "Saisie manuelle, recherches d'informations, reporting chronophage.",
  },
  {
    icon: Shield,
    value: '2,5x',
    label: 'PLUS DE RISQUES QUALITÉ',
    desc: "Non-conformités récurrentes, audits plus difficiles, écarts réglementaires.",
  },
  {
    icon: Crosshair,
    value: '-25%',
    label: 'RÉACTIVITÉ RÉDUITE',
    desc: "Actions en retard, décisions différées, problèmes résolus trop tard.",
  },
  {
    icon: TrendingUp,
    value: 'PILOTAGE',
    label: 'AFFAIBLI',
    desc: "Données partielles, indicateurs peu fiables, performance difficile à améliorer.",
  },
]

// Data for the network diagram (remplace le schéma figé gart.webp) — 4 cartes, contenu des 6 problèmes fusionné
const networkItems = [
  { icon: Wrench, title: 'Outils & données déconnectés', desc: 'Excel, emails, papier... données dispersées et traçabilité fragile.' },
  { icon: AlertTriangle, title: 'Non-conformités répétitives', desc: 'Causes mal identifiées, risques qui persistent.' },
  { icon: Users, title: 'Visibilité & pilotage limités', desc: "Décisions à l'aveugle, performance qui s'érode." },
  { icon: Clock, title: 'Actions en retard', desc: 'CAPA, validations, traitement des écarts trop lent.' },
]

const leftItems = [networkItems[0], networkItems[2]]
const rightItems = [networkItems[1], networkItems[3]]

function NetworkCard({ item }: { item: (typeof networkItems)[number] }) {
  const Icon = item.icon
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-white/95 backdrop-blur-sm px-3.5 py-3 shadow-[0_12px_28px_rgba(0,0,0,0.22)] border border-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(218,162,80,0.28)]">
      <div className="h-9 w-9 shrink-0 rounded-lg bg-gold/15 text-gold ring-1 ring-gold/25 flex items-center justify-center">
        <Icon size={16} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[9.5px] sm:text-[11.5px] font-extrabold normal-case sm:uppercase tracking-tight sm:tracking-wide text-gray-900 leading-snug">{item.title}</p>
        <p className="text-[8.5px] sm:text-[10.5px] leading-snug text-stone-600 mt-0.5">{item.desc}</p>
      </div>
    </div>
  )
}

// Lignes animées reliant chaque carte au hub central (flux "signaux de risque")
function ConnectorLines({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  const paths =
    orientation === 'horizontal'
      ? [
          'M 31 26 L 47 50',
          'M 31 74 L 47 50',
          'M 69 26 L 53 50',
          'M 69 74 L 53 50',
        ]
      : [
          'M 25 48 L 50 15',
          'M 75 48 L 50 15',
          'M 25 84 L 50 15',
          'M 75 84 L 50 15',
        ]

  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={tokens.color.gold[300]}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeOpacity={0.85}
          strokeDasharray="5 5"
          className="animate-dash-march"
          vectorEffect="non-scaling-stroke"
          style={{ filter: 'drop-shadow(0 0 3px rgba(218,162,80,0.7))' }}
        />
      ))}
    </svg>
  )
}

function RiskHub({ compact = false }: { compact?: boolean }) {
  const size = compact ? 'h-14 w-14' : 'h-20 w-20 lg:h-24 lg:w-24'
  return (
    <div className="relative z-10 flex items-center justify-center">
      {!compact && <div className="absolute h-[130%] w-[130%] rounded-full border border-white/10" />}
      {/* Pulsation d'ambiance : boucle autonome, donc CSS. */}
      <div
        className={`animate-pulse-soft relative ${size} rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-[0_0_35px_rgba(220,38,38,0.5)] ring-4 ring-red-500/20 flex flex-col items-center justify-center text-white`}
      >
        <AlertTriangle size={compact ? 14 : 18} strokeWidth={2} />
        <span className={`mt-0.5 font-black uppercase tracking-wider text-center leading-tight ${compact ? 'text-[7px]' : 'text-[8px] lg:text-[9px]'}`}>
          Risque
          <br />
          Latent
        </span>
      </div>
    </div>
  )
}

/* EXCEPTION AU SYSTEME PARTAGE — les deux colonnes convergent l'une vers
   l'autre, geste que fadeUp / fadeIn / scaleIn ne savent pas exprimer. La
   duree, la courbe et le seuil de declenchement restent ceux du systeme :
   seule la direction change. A promouvoir dans lib/motion.ts si le motif
   reapparait ailleurs. */
const convergeFrom = (x: number): Variants => ({
  hidden: { opacity: 0, x },
  visible: { opacity: 1, x: 0, transition: { duration: tokens.duration.base, ease: EASE } },
})

export default function ProblemsSection() {
  const m = useMotion()
  const ref = useRef(null)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-stone-100 pt-8 lg:pt-10 pb-16 lg:pb-24"
    >
      {/* PREMIUM BACKGROUND GLOWS — mesh animé avec parallax léger */}
      <AnimatedMeshBackground
        gradient={tokens.gradient.section}
        orbs={[
          { color: 'rgba(34,197,94,0.08)', size: 500, position: { left: '0', top: '-80px' }, duration: 12, parallax: 35 },
          { color: 'rgba(218,162,80,0.06)', size: 380, position: { right: '0', bottom: '0' }, duration: 10, parallax: 25 },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* ================= BLOC SUPÉRIEUR : PROBLÈME & SCHÉMA RÉSEAU ================= */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          variants={m.stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={m.viewport}
        >

          {/* GAUCHE : TEXTES DE PRÉSENTATION */}
          <motion.div
            variants={m.reduce ? undefined : convergeFrom(-20)}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* BADGE */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/15 bg-red-500/5 text-red-600 mb-6">
              <AlertTriangle size={13} className="text-red-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Le coût caché</span>
            </div>

            {/* TITRE PRINCIPAL */}
            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-gray-900 sm:text-4xl lg:text-[2.65rem]">
              Le coût caché des{' '}
              <span className="text-red-600 block mt-2" style={{ textShadow: '0 10px 30px rgba(220,38,38,0.06)' }}>
                opérations déconnectées.
              </span>
            </h2>

            {/* SOUS-TITRE EN GRAS */}
            <h3 className="mt-8 text-base font-extrabold text-gray-900 leading-snug">
              Excel, emails, fichiers partagés, outils isolés.<br />
              Des opérations dispersées qui échappent au contrôle.
            </h3>

            {/* PARAGRAPHE DESCRIPTIF */}
            <p className="mt-4 text-[14px] leading-relaxed text-stone-600">
              Quand chaque donnée vit dans son propre outil, les écarts deviennent des
              signaux faibles invisibles&nbsp;: non-conformités récurrentes, visibilité
              limitée, traçabilité fragile, actions en retard… jusqu&apos;à la perte de
              maîtrise opérationnelle et une performance constamment sous pression.
            </p>
          </motion.div>

          {/* DROITE : SCHÉMA RÉSEAU D'USINE (reconstruit en HTML, photo usine en fond) */}
          <motion.div
            variants={m.reduce ? undefined : convergeFrom(20)}
            className="lg:col-span-7"
          >
            <div className="relative w-full overflow-hidden rounded-2xl border border-black/5 shadow-[0_20px_50px_rgba(15,23,42,0.1)] aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/9]">
              {/* Photo d'usine en fond */}
              <Image
                src="/factory.png"
                alt="Usine industrielle"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                priority={false}
              />

              {/* Voile léger — la photo reste bien visible, pas de rouge en fond */}
              <div className="absolute inset-0 bg-gradient-to-b from-dark/55 via-dark/35 to-dark/60" />
              <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-gold/20 blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gold/12 blur-[110px] pointer-events-none" />

              {/* Schéma réseau */}
              <div className="absolute inset-0 z-10 p-4 sm:p-6 lg:p-8">
                {/* Mobile / tablette : hub en haut, 4 cartes reliées par des lignes animées */}
                <div className="relative flex lg:hidden flex-col h-full">
                  <ConnectorLines orientation="vertical" />
                  <div className="flex justify-center pb-3">
                    <RiskHub compact />
                  </div>
                  <div className="relative z-10 flex-1 grid grid-cols-2 gap-2.5 content-center">
                    {networkItems.map((item) => (
                      <NetworkCard key={item.title} item={item} />
                    ))}
                  </div>
                </div>

                {/* Desktop : 2 cartes de chaque côté, reliées au hub par des lignes animées */}
                <div className="relative hidden lg:grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <ConnectorLines orientation="horizontal" />
                  <div className="relative z-10 flex flex-col justify-center gap-3 h-full">
                    {leftItems.map((item) => (
                      <NetworkCard key={item.title} item={item} />
                    ))}
                  </div>

                  <RiskHub />

                  <div className="relative z-10 flex flex-col justify-center gap-3 h-full">
                    {rightItems.map((item) => (
                      <NetworkCard key={item.title} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* ================= BLOC CENTRAL : CARTES STATISTIQUES ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={m.fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={m.viewport}
              className="bg-white border border-black/[0.05] rounded-3xl p-6 shadow-[0_10px_35px_rgba(15,23,42,0.02)] flex items-start gap-4 transition-all duration-300 hover:shadow-md hover:border-gold/30"
            >
              {/* Icône */}
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gold/10">
                <stat.icon size={22} className="text-gold" />
              </div>

              {/* Textes de la statistique */}
              <div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-red-600 leading-none">{stat.value}</span>
                  <span className="text-[10px] font-extrabold tracking-wider text-stone-500 mt-1.5 block uppercase">{stat.label}</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-stone-600 mt-3">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}