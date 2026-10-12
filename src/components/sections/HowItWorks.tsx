'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import {
  Clock,
  AlertTriangle,
  Shield,
  Crosshair,
  Wrench,
  Users,
} from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { tokens } from '@/lib/tokens'
import { EASE } from '@/lib/motion'
import { useMotion } from '@/hooks/useMotion'
import Section from '@/components/ui/Section'
import CountUp from '@/components/ui/CountUp'
import { useCopy } from '@/lib/i18n'

/*
 * Le cout des operations deconnectees, en trois chiffres.
 *
 * Une quatrieme carte « PILOTAGE / AFFAIBLI » figurait ici sans chiffre, ce
 * qui cassait le rythme des trois autres. Elle disait par ailleurs la meme
 * chose que networkItems[2] (« Visibilite & pilotage limites »), affichee
 * plus haut dans cette section : la retirer ne supprime aucune information.
 *
 * Les chiffres sont en `gray-900`, pas en rouge. Le rouge de cette section
 * est reserve au noyau « Risque latent » : c'est sa focale. Trois chiffres
 * rouges de plus en feraient un second accent de marque, ce que la regle des
 * accents de lib/tokens.ts interdit explicitement — le rouge y est un etat
 * (alerte), jamais une mise en valeur.
 */
const STAT_SHAPES = [
  { icon: Clock, count: { to: 30, prefix: '+', suffix: '%' } },
  { icon: Shield, count: { to: 2.5, decimals: 1, suffix: 'x' } },
  { icon: Crosshair, count: { to: 25, prefix: '-', suffix: '%' } },
]

// Schema reseau (remplace le visuel fige gart.webp) — 4 cartes, contenu des 6 problemes fusionne
const NETWORK_ICONS = [Wrench, AlertTriangle, Users, Clock]

const COPY = {
  fr: {
    stats: [
      ['DE TEMPS PERDU', 'Saisie manuelle, recherches d’informations, reporting chronophage.'],
      ['PLUS DE RISQUES QUALITÉ', 'Non-conformités récurrentes, audits plus difficiles, écarts réglementaires.'],
      ['RÉACTIVITÉ RÉDUITE', 'Actions en retard, décisions différées, problèmes résolus trop tard.'],
    ],
    network: [
      ['Outils & données déconnectés', 'Excel, emails, papier... données dispersées et traçabilité fragile.'],
      ['Non-conformités répétitives', 'Causes mal identifiées, risques qui persistent.'],
      ['Visibilité & pilotage limités', 'Décisions à l’aveugle, performance qui s’érode.'],
      ['Actions en retard', 'CAPA, validations, traitement des écarts trop lent.'],
    ],
    risk: ['Risque', 'Latent'],
    title: 'Le coût caché des',
    accent: 'opérations déconnectées.',
    sub: ['Excel, emails, fichiers partagés, outils isolés.', 'Des opérations dispersées qui échappent au contrôle.'],
    body: 'Quand chaque donnée vit dans son propre outil, les écarts deviennent des signaux faibles invisibles\u00a0: non-conformités récurrentes, visibilité limitée, traçabilité fragile, actions en retard… jusqu’à la perte de maîtrise opérationnelle et une performance constamment sous pression.',
    factoryAlt: 'Usine industrielle',
    sources: 'Sources',
    sourcesText: 'chiffres issus des retours d’expérience Industry X.0 sur des déploiements industriels. Références détaillées sur demande.',
  },
  en: {
    stats: [
      ['TIME LOST', 'Manual data entry, hunting for information, time-consuming reporting.'],
      ['MORE QUALITY RISK', 'Recurring non-conformities, harder audits, regulatory gaps.'],
      ['SLOWER RESPONSE', 'Late actions, delayed decisions, problems solved too late.'],
    ],
    network: [
      ['Disconnected tools & data', 'Excel, email, paper... scattered data and fragile traceability.'],
      ['Recurring non-conformities', 'Poorly identified causes, risks that persist.'],
      ['Limited visibility & control', 'Decisions made blind, performance that erodes.'],
      ['Late actions', 'CAPA, approvals and deviation handling that drag on.'],
    ],
    risk: ['Hidden', 'Risk'],
    title: 'The hidden cost of',
    accent: 'disconnected operations.',
    sub: ['Excel, email, shared files, isolated tools.', 'Scattered operations that slip out of control.'],
    body: 'When every piece of data lives in its own tool, deviations turn into invisible weak signals: recurring non-conformities, limited visibility, fragile traceability, late actions… until you lose operational control and performance is under constant pressure.',
    factoryAlt: 'Industrial plant',
    sources: 'Sources',
    sourcesText: 'figures drawn from Industry X.0 field experience on industrial deployments. Detailed references available on request.',
  },
}

type NetworkItem = { icon: (typeof NETWORK_ICONS)[number]; title: string; desc: string }

/*
 * Placement des quatre cartes AUTOUR du hub, sur desktop uniquement.
 *
 * Une seule liste dans le DOM, pas deux. La version precedente rendait les
 * quatre cartes une fois pour mobile et une fois pour desktop, en masquant
 * l'une des deux : le meme texte existait en double pour les robots
 * d'indexation, et la moindre correction devait etre faite aux deux
 * endroits. Ici la liste est unique et ne change que de mise en page :
 * empilee sous l'image en dessous de `xl`, posee en deux colonnes
 * par-dessus l'image au-dela.
 */
const DESKTOP_CELL = [
  'xl:col-start-1 xl:row-start-1',
  'xl:col-start-3 xl:row-start-1',
  'xl:col-start-1 xl:row-start-2',
  'xl:col-start-3 xl:row-start-2',
] as const

function NetworkCard({
  item,
  className = '',
}: {
  item: NetworkItem
  className?: string
}) {
  const Icon = item.icon
  return (
    <li
      className={`flex items-start gap-3 rounded-xl border border-white/60 bg-white/[0.92] px-3.5 py-3 shadow-[0_12px_28px_rgba(12,13,18,0.22)] backdrop-blur-[12px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(218,162,80,0.28)] ${className}`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-ink ring-1 ring-gold/25">
        <Icon size={16} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-extrabold uppercase leading-snug tracking-wide text-gray-900 xl:text-[11.5px]">
          {item.title}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-snug text-stone-600 xl:text-[10.5px]">
          {item.desc}
        </p>
      </div>
    </li>
  )
}

/*
 * Lignes reliant chaque carte au hub central : les quatre symptomes
 * convergent vers un meme risque, c'est tout l'argument de la section.
 *
 * Desktop large seulement — sous `xl` les cartes passent sous l'image et
 * il n'y a
 * plus rien a relier. Purement decoratif, donc `aria-hidden`.
 */
function ConnectorLines() {
  const paths = ['M 31 27 L 47 50', 'M 31 73 L 47 50', 'M 69 27 L 53 50', 'M 69 73 L 53 50']

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={tokens.color.gold[300]}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeOpacity={0.85}
          strokeDasharray="5 5"
          className="animate-dash-march motion-reduce:animate-none"
          vectorEffect="non-scaling-stroke"
          // Le defilement du pointille est volontairement lent : c'est une
          // derive de fond, pas un chargement en cours.
          style={{
            animationDuration: '2.6s',
            filter: 'drop-shadow(0 0 3px rgba(218,162,80,0.7))',
          }}
        />
      ))}
    </svg>
  )
}

function RiskHub({ label }: { label: string[] }) {
  return (
    <div className="relative z-10 flex items-center justify-center">
      <div className="absolute h-[130%] w-[130%] rounded-full border border-white/10" />
      {/* Pulsation d'ambiance : boucle autonome, donc CSS. */}
      <div className="animate-pulse-soft motion-reduce:animate-none relative flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white shadow-[0_0_35px_rgba(220,38,38,0.5)] ring-4 ring-red-500/20 xl:h-24 xl:w-24">
        <AlertTriangle size={16} strokeWidth={2} className="xl:h-[18px] xl:w-[18px]" />
        <span className="mt-0.5 text-center text-[7.5px] font-black uppercase leading-tight tracking-wider xl:text-[9px]">
          {label[0]}
          <br />
          {label[1]}
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
  const t = useCopy(COPY)
  const stats = STAT_SHAPES.map((shape, i) => ({ ...shape, label: t.stats[i][0], desc: t.stats[i][1] }))
  const networkItems: NetworkItem[] = NETWORK_ICONS.map((icon, i) => ({
    icon,
    title: t.network[i][0],
    desc: t.network[i][1],
  }))

  return (
    <Section
      variant="default"
      background="white"
      innerClassName="lg:px-10"
      backdrop={
        <AnimatedMeshBackground
          gradient={tokens.gradient.section}
          orbs={[
            { color: 'rgba(34,197,94,0.08)', size: 500, position: { left: '0', top: '-80px' }, duration: 12, parallax: 35 },
            { color: 'rgba(218,162,80,0.06)', size: 380, position: { right: '0', bottom: '0' }, duration: 10, parallax: 25 },
          ]}
        />
      }
    >
      {/* ================= BLOC SUPÉRIEUR : PROBLÈME & SCHÉMA RÉSEAU ================= */}
      <motion.div
        className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12"
        variants={m.stagger()}
        initial="hidden"
        whileInView="visible"
        viewport={m.viewport}
      >
        {/* GAUCHE : TEXTES DE PRÉSENTATION */}
        <motion.div
          variants={m.reduce ? undefined : convergeFrom(-20)}
          className="flex flex-col items-start lg:col-span-5"
        >
          {/* TITRE PRINCIPAL — traitement bicolore du hero : la fin du titre
              passe en `gold.deep`, l'or de TEXTE LARGE sur fond clair
              (3,46:1 sur blanc, seuil AA a 3:1). `gold.DEFAULT` y tomberait
              a 2,04:1 — voir le contrat de contraste dans lib/tokens.ts. */}
          <h2 className="text-[26px] font-black leading-tight tracking-[-0.04em] text-gray-900 sm:text-4xl lg:text-[2.65rem]">
            {t.title}{' '}
            <span className="mt-2 block text-gold-deep">{t.accent}</span>
          </h2>

          {/* SOUS-TITRE — poids 600 et gris secondaire : il accompagne le
              titre, il ne le concurrence pas. En `font-extrabold
              text-gray-900` il avait le meme poids optique que le H2 pose
              juste au-dessus, et les deux se disputaient l'oeil.
              Deux `block` plutot qu'un `<br>` : la coupure suit la phrase a
              toutes les largeurs, la ou un `<br>` s'ajoutait aux retours
              naturels et hachait le bloc sur les petits ecrans. */}
          <p className="mt-6 text-[17px] font-semibold leading-snug text-stone-600 sm:mt-7 sm:text-[20px]">
            <span className="block">{t.sub[0]}</span>
            <span className="block">{t.sub[1]}</span>
          </p>

          {/* PARAGRAPHE DESCRIPTIF */}
          <p className="mt-4 text-[14px] leading-relaxed text-stone-600">
            {t.body}
          </p>
        </motion.div>

        {/* DROITE : SCHÉMA RÉSEAU D'USINE (reconstruit en HTML, photo usine en fond) */}
        <motion.div
          variants={m.reduce ? undefined : convergeFrom(20)}
          className="lg:col-span-7 xl:relative"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/5 shadow-[0_20px_50px_rgba(15,23,42,0.1)] xl:aspect-[16/9]">
            {/* Photo d'usine en fond */}
            <Image
              src="/factory.png"
              alt={t.factoryAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              priority={false}
            />

            {/* Voile sombre qui monte du bas : la photo redevient un decor,
                pas un concurrent des cartes posees dessus. */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/55 to-dark/35" />
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gold/12 blur-[110px]" />

            <ConnectorLines />

            {/* Noyau : centre sur l'image a toutes les tailles. A partir de
                `xl` il occupe la colonne centrale que la grille des cartes,
                posee par-dessus, laisse volontairement vide. */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <RiskHub label={t.risk} />
            </div>
          </div>

          {/* Les quatre symptomes. Empiles sous l'image jusqu'a `xl` : en
              dessous, la colonne de droite est trop etroite pour loger deux
              pistes de cartes autour du noyau sans que les titres passent
              sur quatre lignes et debordent de leur rangee. Au-dela, deux
              colonnes de part et d'autre du noyau, reliees par les
              pointilles. */}
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:absolute xl:inset-0 xl:z-20 xl:mt-0 xl:grid-cols-[minmax(0,1fr)_9.5rem_minmax(0,1fr)] xl:grid-rows-2 xl:items-center xl:gap-x-4 xl:gap-y-3 xl:p-8">
            {networkItems.map((item, i) => (
              <NetworkCard key={item.title} item={item} className={DESKTOP_CELL[i]} />
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* ================= BLOC CENTRAL : CARTES STATISTIQUES ================= */}
      {/* Un declencheur pour les trois cartes, pas trois. Ce bloc reste
          distinct de celui du haut : 56 px les separent sur mobile, 80 au
          dela. Les fusionner ferait apparaitre ces cartes en meme temps
          qu'un contenu situe bien plus haut. */}
      <motion.div
        className="mt-14 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        variants={m.stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={m.viewport}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={m.fadeUp}
            // Sur deux colonnes, une derniere carte impaire prend toute la
            // largeur plutot que de rester seule a gauche.
            className={`flex items-start gap-3.5 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lifted sm:gap-4 sm:p-6 ${
              index === stats.length - 1 && stats.length % 2 === 1 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            {/* Icône */}
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/10 sm:h-14 sm:w-14">
              <stat.icon size={22} className="text-gold-ink" />
            </div>

            {/* Textes de la statistique */}
            <div className="min-w-0">
              <CountUp
                {...stat.count}
                className="block text-[28px] font-black leading-none text-gray-900 sm:text-3xl"
              />

              {/* Filet dore trace a l'entree. Longueur identique sur les
                  trois cartes : c'est un accent, pas une jauge — une
                  longueur variable laisserait croire a une mesure que ces
                  trois chiffres, qui n'ont pas la meme unite, ne portent
                  pas. */}
              <motion.span
                aria-hidden
                variants={m.scaleX}
                className="mt-2.5 block h-[3px] w-10 origin-left rounded-full bg-gold"
              />

              <span className="mt-2.5 block text-[13px] font-extrabold uppercase tracking-[0.08em] text-subtle">
                {stat.label}
              </span>
              <p className="mt-3 text-[12.5px] leading-relaxed text-stone-600">{stat.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/*
        TODO(sources) — remplacer par les references reelles avant la
        soutenance. Ces trois chiffres seront questionnes : chacun doit
        pouvoir etre rattache a une source datee et verifiable, qu'il
        s'agisse d'une etude sectorielle publiee ou d'une mesure faite chez
        un client, auquel cas il faut son accord pour la citer.
        Format attendu : « Source — Etude, organisme, annee. »
      */}
      {/* Note de bas de page, pas conclusion : alignee a gauche sous les
          cartes et dans le gris des libelles. Centree et en gris de texte
          courant, elle avait le poids d'une chute. */}
      <p className="mt-6 max-w-3xl text-left text-[11px] leading-relaxed text-subtle">
        <span className="font-semibold">{t.sources}</span> — {t.sourcesText}
      </p>
    </Section>
  )
}
