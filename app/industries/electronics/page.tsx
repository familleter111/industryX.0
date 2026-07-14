'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Zap,
  Gauge,
  BadgeCheck,
  CheckCircle2,
  XCircle,
  Leaf,
  Network,
  Cpu,
  Truck,
  Database,
  Eye,
  Play,
  Pause,
  ClipboardCheck,
  FlaskConical,
  Rocket,
  TrendingUp,
  Activity,
  Workflow
} from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Animation réutilisable
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

/* ============================================================
   TYPES & DONNÉES DES CARTES CAROUSEL
   ============================================================ */

type SlideVisual =
  | 'smc-flow'
  | 'tablet'
  | 'predictive-chart'
  | 'supply-chain'
  | 'launch-timeline'
  | 'dashboard'
  | 'energy-chart'

interface CarouselSlide {
  num: string
  tag: string
  title: string
  desc: string
  before: string[]
  after: string[]
  kpis: { value: string; label: string }[]
  visual: SlideVisual
  visualCaption: string
}

const coreSlides: CarouselSlide[] = [
  {
    num: '01',
    tag: 'Conformité & Normes',
    title: 'Renforcer la conformité réglementaire et les standards',
    desc: "Sécurisez votre conformité et assurez la traçabilité complète de vos composants. CIPA fournit un système centralisé pour enregistrer les rapports d'inspection, documenter les contrôles qualité et suivre les indicateurs de conformité aux normes rigoureuses comme l'IPC-A-610.",
    before: [
      'Préparation manuelle des audits lente',
      'Risques élevés d’erreurs de transcription',
      'Données de traçabilité éparpillées sur papier',
      'Difficulté à prouver la conformité des lots'
    ],
    after: [
      'Pistes d’audit et rapports automatisés',
      'Préparation constante aux audits qualité',
      'Conformité stricte aux standards IPC-A-610',
      'Centralisation sécurisée de la documentation'
    ],
    kpis: [
      { value: '90%', label: "de réduction du temps de préparation des audits" },
      { value: '40%', label: 'de baisse des incidents de non-conformité' }
    ],
    visual: 'smc-flow',
    visualCaption: 'Workflow de validation qualité IPC-A-610 : chaque étape de conformité est validée dans CIPA.'
  },
  {
    num: '02',
    tag: 'Digitalisation & Efficacité',
    title: 'Efficacité renforcée par la digitalisation du shop-floor',
    desc: "Remplacez les procédures manuelles lentes et les rapports papier par des flux de travail digitaux automatisés. Suivez en temps réel le statut des machines, pilotez les tâches des opérateurs et collectez les données sur le terrain.",
    before: [
      'Dossiers de fabrication papier volumineux',
      'Saisie manuelle des données lente',
      'Visibilité limitée sur la progression de la ligne',
      'Temps de cycle élevés dus aux contrôles physiques'
    ],
    after: [
      'Instructions de travail digitales et guidées',
      'Suivi en temps réel de la progression CMS',
      'Collecte de données automatique et fiable',
      'Temps de cycle réduits et productivité accrue'
    ],
    kpis: [
      { value: '40%', label: "d'augmentation de la productivité opérationnelle" },
      { value: '70%', label: "de hausse de l'efficacité globale des équipements (TRS)" }
    ],
    visual: 'tablet',
    visualCaption: 'Interface opérateur CIPA : instructions de câblage interactives et validation des étapes CMS.'
  },
  {
    num: '03',
    tag: 'Analyses & IA',
    title: 'Analyses avancées et IA pour l’amélioration continue',
    desc: "Exploitez vos données opérationnelles pour identifier les goulots d'étranglement et anticiper les dérives de qualité. Grâce aux modèles d'IA prédictifs intégrés, optimisez la régularité de vos processus et maximisez le rendement.",
    before: [
      'Dérive des paramètres de brasage CMS non détectée',
      'Analyse des causes racines après incident',
      'Maintenance uniquement corrective',
      'Taux élevé de rebuts en fin de ligne'
    ],
    after: [
      'Détection en temps réel des dérives de process',
      'Maintenance prédictive des buses CMS et fours',
      'IA d’aide à la décision pour le management',
      'Rendement de premier passage maximisé'
    ],
    kpis: [
      { value: '60%', label: 'de réduction du taux de rebut sur vos lignes' },
      { value: '15%', label: "d'augmentation du rendement de production global" }
    ],
    visual: 'predictive-chart',
    visualCaption: 'Analyse prédictive de dérive thermique : alerte IA avant tout défaut de refusion.'
  },
  {
    num: '04',
    tag: 'Traçabilité SMT',
    title: 'Améliorer la transparence de la supply chain et de la traçabilité',
    desc: "Tracez chaque composant depuis la réception des matières premières (lot de pâte à braser, bobines de résistances) jusqu'à l'assemblage final du circuit. Isolez rapidement les pièces défectueuses pour limiter l'impact.",
    before: [
      'Traçabilité généalogique impossible en temps réel',
      'Recherche fastidieuse du lot de composants défectueux',
      'Risque élevé de mélange de bobines sur les chargeurs',
      'Temps de réaction long en cas de rappel fournisseur'
    ],
    after: [
      'Généalogie ascendante/descendante instantanée',
      'Contrôle de bobine détrompeur intégré (feeder setup)',
      'Isolation ciblée des composants défectueux en 3 min',
      'Transparence totale vis-à-vis des clients finaux'
    ],
    kpis: [
      { value: '30%', label: 'de réduction des délais de traitement logistique' },
      { value: '20%', label: 'de baisse des anomalies issues des fournisseurs' }
    ],
    visual: 'supply-chain',
    visualCaption: 'Carte généalogique de la carte électronique : du lot de bobines SMT au produit final.'
  }
]

const performanceSlides: CarouselSlide[] = [
  {
    num: '01',
    tag: 'Co-Design & NPI',
    title: 'Favoriser l’innovation via l’optimisation R&D et NPI',
    desc: "Accélérez vos cycles de développement de produits et simplifiez l'introduction de nouveaux produits (NPI). Centralisez les retours d'expérience R&D et facilitez une collaboration bidirectionnelle efficace entre l'ingénierie et la production.",
    before: [
      'Transfert de conception CAO vers production manuel',
      'Modifications de design non répercutées en atelier',
      'Lancement de nouveaux produits long et coûteux',
      'Erreurs d’assemblage sur les premiers prototypes'
    ],
    after: [
      'Intégration directe de la CAO électronique',
      'Collaboration fluide entre R&D et méthodes',
      'Mise sur le marché rapide des nouveaux produits',
      'Standardisation des processus dès le premier lot'
    ],
    kpis: [
      { value: '50%', label: 'de réduction du time-to-market sur les lancements' },
      { value: '2x', label: "plus d'introductions de prototypes validées par an" }
    ],
    visual: 'launch-timeline',
    visualCaption: 'Timeline NPI : réduction drastique du cycle entre conception CAO et production de masse.'
  },
  {
    num: '02',
    tag: 'Qualité Produit',
    title: 'Assurer la qualité produit et l’inspection automatique',
    desc: "Garanti la régularité de la qualité grâce à des fiches de contrôle intégrées et des points de validation opérés en ligne. CIPA structure vos audits de poste et vos rapports qualité pour un produit fiable à 100%.",
    before: [
      'Inspections optiques manuelles subjectives',
      'Défauts détectés uniquement lors des tests finals',
      'Coût élevé de la retouche de cartes brasées',
      'Rapports qualité lents et non centralisés'
    ],
    after: [
      'Validation systématique des points de contrôle CMS',
      'Détection des défauts à la source (pâte, brasage, AOI)',
      'Diminution drastique des défauts qualité finaux',
      'Tableaux de bord qualité automatisés et instantanés'
    ],
    kpis: [
      { value: '40%', label: 'de réduction des défauts qualité et rebuts' },
      { value: '30%', label: 'de baisse du coût de la qualité (reprise/retouche)' }
    ],
    visual: 'dashboard',
    visualCaption: 'Dashboard qualité CIPA : suivi des taux de défauts et Pareto des causes CMS en direct.'
  },
  {
    num: '03',
    tag: 'Durabilité',
    title: 'Durabilité et réduction de l’impact environnemental',
    desc: "Suivez votre consommation d'énergie et optimisez l'utilisation des ressources dans vos ateliers de cartes et de câblage. CIPA suit la consommation des fours de refusion et identifie les gisements d'économies d'énergie.",
    before: [
      'Fours de refusion fonctionnant en continu hors production',
      'Manque de visibilité sur les consommations électriques',
      'Empreinte carbone élevée sans leviers d’action',
      'Rebuts de soudure et métaux mal revalorisés'
    ],
    after: [
      'Planification intelligente des veilles de fours',
      'Suivi de la consommation énergétique en temps réel',
      'Réduction significative des émissions et coûts',
      'Pratiques de production vertes et valorisées'
    ],
    kpis: [
      { value: '-30%', label: 'de réduction constatée de la consommation d’énergie' },
      { value: '-20%', label: 'de production de déchets et rebuts de métaux' }
    ],
    visual: 'energy-chart',
    visualCaption: 'Suivi de consommation énergétique des fours de refusion : profil optimisé avec CIPA.'
  }
]

/* ============================================================
   VISUELS DE CARTES (DATA-VIZ PAR SLIDE)
   ============================================================ */

function VisualPanel({ slide }: { slide: CarouselSlide }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-white rounded-2xl border border-black/[0.06] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {slide.tag}
          </span>
          <span className="ml-auto text-[9px] bg-[#F5F5F4] text-slate-500 font-bold px-2 py-0.5 rounded-full">
            Données live
          </span>
        </div>
        <div className="flex-1 flex items-center">
          <SlideVisualRenderer visual={slide.visual} />
        </div>
        <div className="mt-3 text-[10px] text-slate-400 text-center italic leading-snug">
          {slide.visualCaption}
        </div>
      </div>
    </div>
  )
}

function SlideVisualRenderer({ visual }: { visual: SlideVisual }) {
  switch (visual) {
    case 'smc-flow':
      return <SmcFlowVisual />
    case 'tablet':
      return <TabletVisual />
    case 'predictive-chart':
      return <PredictiveChartVisual />
    case 'supply-chain':
      return <SupplyChainVisual />
    case 'launch-timeline':
      return <LaunchTimelineVisual />
    case 'dashboard':
      return <DashboardVisual />
    case 'energy-chart':
      return <EnergyChartVisual />
  }
}

// 01 — Workflow de conformité
function SmcFlowVisual() {
  const steps = [
    { n: 1, title: 'Audit du Lot Composants', sub: 'Vérification humidité & état PCB', state: 'done' },
    { n: 2, title: 'Saisie Inspection Brasage CMS', sub: 'Contrôle visuel soudure (refusion) en cours', state: 'active' },
    { n: 3, title: 'Déclaration de Conformité', sub: 'Rapport de lot généré & archivé Cloud', state: 'todo' }
  ]
  return (
    <div className="w-full flex flex-col gap-4 py-2">
      {steps.map((s, i) => (
        <div key={s.n} className="relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative z-10 flex items-center gap-3 rounded-xl p-3 shadow-sm border ${
              s.state === 'active'
                ? 'bg-gold/5 border-gold/40'
                : 'bg-slate-50/80 border-slate-200/80'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                s.state === 'todo' ? 'bg-slate-100 text-slate-400' : 'bg-gold/10 text-gold'
              }`}
            >
              {s.n}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs font-bold ${s.state === 'todo' ? 'text-slate-400' : 'text-dark'}`}>{s.title}</h4>
              <p className="text-[10px] text-slate-500 truncate">{s.sub}</p>
            </div>
            {s.state === 'done' && <ShieldCheck size={16} className="text-emerald-500 shrink-0" />}
            {s.state === 'active' && (
              <span className="text-[9px] font-bold text-gold px-2 py-0.5 bg-gold/10 rounded-full shrink-0">En cours</span>
            )}
            {s.state === 'todo' && <Workflow size={16} className="text-slate-300 shrink-0" />}
          </motion.div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-1">
              <div className="h-4 w-0.5 border-l-2 border-dashed border-slate-200" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// 02 — Tablette opérateur
function TabletVisual() {
  return (
    <div className="w-full bg-[#141520] rounded-2xl p-4 border border-white/5 text-white flex flex-col gap-3">
      <div className="flex justify-between items-center bg-[#1a1b24] p-3 rounded-xl">
        <div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Ordre de Fabrication</div>
          <div className="text-xs font-black text-white">OF-2026-ELECTRO-094</div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[9px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Ligne active
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 bg-[#1a1b24] p-3 rounded-xl">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Instructions de Câblage</div>
          <ol className="text-[10px] text-slate-300 list-decimal list-inside space-y-1.5 leading-tight">
            <li>{"Connecter la nappe J2 sur le port principal"}</li>
            <li>{"Fixer le faisceau avec des colliers de serrage"}</li>
            <li>{"Vérifier la résistance sur le point TP-4"}</li>
          </ol>
        </div>
        <div className="col-span-5 bg-[#1a1b24] p-3 rounded-xl flex flex-col justify-between">
          <div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Progression</div>
            <div className="text-lg font-black text-gold">78%</div>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gold h-full w-[78%] rounded-full" />
          </div>
        </div>
      </div>
      <div className="bg-[#DAA250] hover:bg-gold text-dark text-center py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-colors">
        {"Valider l'étape de câblage"}
      </div>
    </div>
  )
}

// 03 — Courbe prédictive refusion SMT
function PredictiveChartVisual() {
  const [hovered, setHovered] = useState<number | null>(null)
  const pts = [
    { x: 30, y: 35, val: '98%' },
    { x: 120, y: 40, val: '96%' },
    { x: 210, y: 75, val: '82%' },
    { x: 300, y: 50, val: '91%' },
    { x: 370, y: 25, val: '99%' }
  ]
  return (
    <svg viewBox="0 0 400 160" className="w-full h-44">
      <line x1="20" y1="140" x2="380" y2="140" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="20" y1="10" x2="20" y2="140" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="20" y1="100" x2="380" y2="100" stroke="#F5F5F4" strokeDasharray="3,3" />
      <line x1="20" y1="60" x2="380" y2="60" stroke="#F5F5F4" strokeDasharray="3,3" />

      <line x1="20" y1="85" x2="380" y2="85" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,4" opacity="0.5" />
      <text x="375" y="81" textAnchor="end" className="fill-red-400 font-bold text-[8px]">{"Seuil d'alerte buse CMS"}</text>

      <defs>
        <linearGradient id="elecPredGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DAA250" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#DAA250" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M30 35 C 70 38, 90 40, 120 40 C 160 48, 180 70, 210 75 C 245 80, 270 58, 300 50 C 330 42, 350 28, 370 25 L 370 140 L 30 140 Z"
        fill="url(#elecPredGlow)"
      />
      <path
        d="M30 35 C 70 38, 90 40, 120 40 C 160 48, 180 70, 210 75 C 245 80, 270 58, 300 50 C 330 42, 350 28, 370 25"
        fill="none"
        stroke="#DAA250"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g>
        <line x1="210" y1="75" x2="210" y2="112" stroke="#22C55E" strokeWidth="1" strokeDasharray="3,3" />
        <rect x="140" y="112" width="140" height="15" rx="4" className="fill-emerald-500/10" />
        <text x="210" y="123" textAnchor="middle" className="fill-emerald-600 font-bold text-[8px]">Nettoyage buse planifié</text>
      </g>

      {pts.map((pt, i) => (
        <g key={i}>
          <circle
            cx={pt.x}
            cy={pt.y}
            r={hovered === i ? 6 : 4}
            className="fill-white stroke-gold stroke-[2px] transition-all cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
          {hovered === i && (
            <g>
              <rect x={pt.x - 20} y={pt.y - 26} width="40" height="16" rx="4" className="fill-[#0F172A]" />
              <text x={pt.x} y={pt.y - 15} textAnchor="middle" className="fill-white font-bold text-[9px]">{pt.val}</text>
            </g>
          )}
        </g>
      ))}
      <text x="30" y="152" className="fill-slate-400 font-bold text-[8px]">Lot 1</text>
      <text x="355" y="152" className="fill-slate-400 font-bold text-[8px]">Lot 20</text>
    </svg>
  )
}

// 04 — Généalogie des composants
function SupplyChainVisual() {
  const steps = [
    { icon: Truck, title: 'Bobine A2', id: 'Fournisseur' },
    { icon: Cpu, title: 'Zone CMS', id: 'Machine SMT' },
    { icon: ShieldCheck, title: 'Rapport', id: 'Test ATE' }
  ]
  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-start relative px-6">
        <div className="absolute left-10 right-10 top-[22px] h-0.5 border-t border-dashed border-slate-200 z-0" />
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={i} className="flex flex-col items-center gap-2 relative z-10 flex-1">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-md cursor-pointer hover:border-gold hover:bg-gold/5"
              >
                <Icon size={17} className="text-gold" />
              </motion.div>
              <div className="text-center">
                <div className="text-[10px] font-bold text-dark">{step.title}</div>
                <div className="text-[8px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded font-mono mt-0.5">{step.id}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-5 mx-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
          <Eye size={15} />
        </div>
        <p className="text-[10px] text-slate-500 leading-snug">
          <span className="font-bold text-dark">Traçabilité complète :</span>{' '}
          {"Chaque carte est généalogiquement reliée au lot de pâte à braser et à la bobine du distributeur CMS."}
        </p>
      </div>
    </div>
  )
}

// 05 — Timeline R&D / NPI
function LaunchTimelineVisual() {
  const phases = [
    { name: 'Import CAO', before: 80, after: 30 },
    { name: 'Prototype SMT', before: 90, after: 45 },
    { name: 'Audits de poste', before: 70, after: 35 },
    { name: 'Série pilote', before: 85, after: 50 }
  ]
  return (
    <div className="w-full py-2 flex flex-col gap-3">
      <div className="flex items-center gap-4 text-[9px] font-bold">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="w-3 h-2 rounded-sm bg-slate-200 inline-block" /> Avant CIPA
        </span>
        <span className="flex items-center gap-1.5 text-gold">
          <span className="w-3 h-2 rounded-sm bg-gold inline-block" /> Avec CIPA
        </span>
      </div>
      {phases.map((p, i) => (
        <div key={i}>
          <div className="text-[10px] font-bold text-dark mb-1">{p.name}</div>
          <div className="flex flex-col gap-1">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-slate-200 h-full rounded-full" style={{ width: `${p.before}%` }} />
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${p.after}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12 }}
                className="bg-gold h-full rounded-full"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 06 — Dashboard qualité
function DashboardVisual() {
  const tiles = [
    { label: 'TRS Global SMT', value: '82.4%', trend: '+8.2%', good: true },
    { label: 'Défauts PPM', value: '45', trend: '-120', good: true },
    { label: 'Dérives buses SMT', value: '1', trend: '-4', good: true },
    { label: 'Temps retouche', value: '12m', trend: '-50%', good: true }
  ]
  const bars = [40, 55, 62, 85, 74, 91, 80]
  return (
    <div className="w-full flex flex-col gap-3 py-1">
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((t, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wide truncate">{t.label}</div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base font-black font-display text-dark">{t.value}</span>
              <span className={`text-[9px] font-bold ${t.good ? 'text-emerald-600' : 'text-red-500'}`}>{t.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Composants posés / heure (x1000)</span>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {bars.map((b, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${b}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex-1 bg-gold/80 hover:bg-gold rounded-t-md transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 07 — Suivi de consommation de refusion SMT
function EnergyChartVisual() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-44">
      <line x1="30" y1="10" x2="30" y2="130" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="30" y1="130" x2="370" y2="130" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="30" y1="80" x2="370" y2="80" stroke="#F5F5F4" strokeDasharray="3,3" />
      <line x1="30" y1="40" x2="370" y2="40" stroke="#F5F5F4" strokeDasharray="3,3" />

      <path d="M30,30 L110,25 L190,35 L270,30 L350,28" fill="none" stroke="#A8A29E" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x="355" y="32" className="fill-slate-400 text-[7px] font-bold">Base</text>

      <path d="M30,30 L110,48 L190,65 L270,80 L350,90" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <text x="355" y="94" className="fill-emerald-500 text-[7px] font-bold">-30%</text>

      <circle cx="110" cy="48" r="3" className="fill-white stroke-emerald-500 stroke-2" />
      <circle cx="190" cy="65" r="3" className="fill-white stroke-emerald-500 stroke-2" />
      <circle cx="270" cy="80" r="3" className="fill-white stroke-emerald-500 stroke-2" />
      <circle cx="350" cy="90" r="3" className="fill-white stroke-emerald-500 stroke-2" />

      <text x="30" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">T0</text>
      <text x="110" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 1</text>
      <text x="190" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 3</text>
      <text x="270" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 6</text>
      <text x="350" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 12</text>
    </svg>
  )
}

/* ============================================================
   CAROUSEL INTELLIGENT
   ============================================================ */

function SmartCarousel({ slides, accentLabel }: { slides: CarouselSlide[]; accentLabel: string }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing, setPlaying] = useState(true)
  const hoverRef = useRef(false)

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1)
      setIndex(((next % slides.length) + slides.length) % slides.length)
    },
    [index, slides.length]
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      if (!hoverRef.current) next()
    }, 8000)
    return () => clearInterval(t)
  }, [playing, next])

  const slide = slides[index]

  return (
    <div
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold border transition-all duration-300 ${
              i === index
                ? 'bg-[#111827] text-white border-[#111827] shadow-lg'
                : 'bg-white/70 text-slate-500 border-slate-200 hover:border-gold hover:text-dark'
            }`}
          >
            <span className={`font-black ${i === index ? 'text-gold' : 'text-gold/70'}`}>{s.num}</span>
            <span className="hidden sm:inline max-w-[180px] truncate">{s.tag}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next()
              else if (info.offset.x > 80) prev()
            }}
            className="bg-[#FAF9F5] rounded-[2rem] border border-[#ECE7DD] shadow-[0_25px_60px_rgba(0,0,0,0.05)] overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10">
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black font-display text-gold/30">{slide.num}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B6842B]">{slide.tag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#111827] tracking-tight mb-4 leading-snug">
                  {slide.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{slide.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-red-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-2.5">Avant CIPA</div>
                    <ul className="space-y-2">
                      {slide.before.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
                          <XCircle size={13} className="text-red-300 shrink-0 mt-[1px]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-emerald-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-2.5">Avec CIPA</div>
                    <ul className="space-y-2">
                      {slide.after.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 leading-snug">
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-[1px]" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  {slide.kpis.map((k, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                      <div className="text-xl sm:text-2xl font-black font-display text-gold">{k.value}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{k.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <VisualPanel slide={slide} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label="Carte précédente"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-dark hover:border-gold hover:text-gold transition-all z-20"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Carte suivante"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-dark hover:border-gold hover:text-gold transition-all z-20"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-7">
        <button
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? 'Mettre en pause' : 'Lancer le défilement'}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-gold hover:text-gold transition-all"
        >
          {playing ? <Pause size={12} /> : <Play size={12} />}
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Aller à la carte ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-slate-300 hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-400 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <span className="sr-only">{accentLabel}</span>
      </div>
    </div>
  )
}

/* ============================================================
   PAGE ÉLECTRONIQUE & CÂBLAGE
   ============================================================ */

export default function ElectronicsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F6] text-dark overflow-x-hidden font-body selection:bg-gold/30 selection:text-gold-900">
      <Navbar />

      {/* 1. HERO + 3 BÉNÉFICES CLÉS */}
      <section className="relative lg:min-h-screen lg:max-h-[1000px] flex flex-col justify-center pt-24 pb-10 lg:pt-28 lg:pb-8 overflow-hidden bg-mesh-light">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
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
                {"Comment CIPA transforme l'industrie de"}{' '}
                <span className="text-[#DAA250]">
                  {"l'électronique & du câblage"}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600 mb-6 max-w-xl"
              >
                {"CIPA offre une plateforme complète spécialement conçue pour l'industrie de l'électronique et du câblage afin de digitaliser, orchestrer et optimiser les processus clés, de renforcer la conformité, de stimuler l'efficacité et de réduire les rebuts."}
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
                  src="/Secteur/electronics_wiring_hero.png"
                  alt="Laboratoire électronique et câblage Industry X.0"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-1 -left-1 sm:left-2 bg-white/90 backdrop-blur border border-gold/30 rounded-xl p-2.5 shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/10 text-[#DAA250] flex items-center justify-center shrink-0">
                  <Cpu size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Processus</div>
                  <div className="text-[12px] font-extrabold text-dark">IPC-A-610 Standardisé</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 lg:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                {
                  icon: Gauge,
                  value: '70%',
                  label: "Efficacité globale des équipements",
                  desc: "TRS optimisé par la digitalisation des procédures et fiches d'instructions."
                },
                {
                  icon: ShieldCheck,
                  value: '90%',
                  label: 'Conformité réglementaire garantie',
                  desc: "Alignement continu sur les standards stricts comme l'IPC-A-610."
                },
                {
                  icon: BadgeCheck,
                  value: '40%',
                  label: 'Réduction des défauts & rebuts',
                  desc: "Validation d'étapes en temps réel par capteurs et IA."
                }
              ].map((stat, i) => {
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
              <Cpu size={19} />
            </div>
            <p className="text-[13px] sm:text-sm text-white/85 leading-relaxed relative z-10 text-center md:text-left">
              {"Des composants électroniques bruts aux assemblages finis de cartes de circuits imprimés, CIPA aide les fabricants à fiabiliser la production, garantir les standards de soudure et assurer une traçabilité totale."}
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
                {"opérations d'électronique et de câblage"}
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed">
              {"Naviguez entre les cartes pour explorer chaque levier : les données, les visuels et les comparaisons avant/après CIPA."}
            </p>
          </div>

          <SmartCarousel slides={coreSlides} accentLabel="Opérations SMT" />
        </div>
      </section>

      {/* 4. CAROUSEL — 3 FAÇONS */}
      <section className="py-20 md:py-28 relative bg-[#F1EFE9]/40 border-y border-[#ECE7DD]">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black font-display text-dark tracking-tight leading-[1.15] mb-4">
              <span className="md:block">{"3 façons dont CIPA accélère la "}</span>
              <span className="text-[#DAA250] md:block">
                qualité produit, l’innovation et la performance durable
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed">
              {"Trois leviers de croissance, illustrés par des données concrètes et des résultats mesurés chez nos clients."}
            </p>
          </div>

          <SmartCarousel slides={performanceSlides} accentLabel="Performance durable SMT" />
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
                  {"Une plateforme unique pour la conformité IPC, la traçabilité et l'excellence opérationnelle."}
                </h2>
                <p className="text-sm text-white/70 leading-relaxed">
                  {"CIPA unifie les personnes, les processus et les données pour fournir des insights connectés sur toute la chaîne de valeur d'assemblage électronique — traçabilité des bobines de composants, visibilité sur le chargement des feeders SMT et audits de conformité automatisés."}
                </p>
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                {[
                  { icon: Database, label: 'Données connectées' },
                  { icon: Eye, label: 'Visibilité atelier' },
                  { icon: Truck, label: 'Visibilité fournisseurs' },
                  { icon: ShieldCheck, label: 'Assurance conformité standards' }
                ].map((f, i) => {
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
            {[
              { icon: Network, title: '1. Connecter', desc: 'Unifiez les données des systèmes, équipements et opérateurs SMT.' },
              { icon: FlaskConical, title: '2. Analyser', desc: "L'IA et les analyses transforment les données en insights de production." },
              { icon: Rocket, title: '3. Agir', desc: 'Automatisez les workflows qualité et signalez les dérives.' },
              { icon: TrendingUp, title: '4. Améliorer', desc: 'Surveillez, mesurez et réduisez les rebuts CMS.' },
              { icon: Leaf, title: '5. Impact', desc: 'Des résultats mesurables en TRS SMT, conformité et économie d’énergie.' }
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
            {"Prêt à digitaliser votre atelier d'électronique ?"}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {"Rejoignez les leaders industriels qui utilisent CIPA pour assurer leur conformité, maximiser la traçabilité et optimiser le TRS. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles."}
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
