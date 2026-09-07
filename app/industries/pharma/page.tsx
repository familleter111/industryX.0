'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
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
import Footer from '@/components/layout/Footer'
import heroStyles from './hero.module.css'

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
  | 'fda-flow'
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
    title: 'Renforcer la conformité réglementaire FDA & BPF',
    desc: "Assurez la conformité aux directives strictes de la FDA (21 CFR Part 11) et BPF (GMP) grâce à des pistes d'audit (audit trail) automatisées et une traçabilité numérique complète de chaque étape.",
    before: [
      'Préparation manuelle des audits lente et risquée',
      'Risque élevé d’erreurs de transcription papier',
      'Données de conformité fragmentées en silos',
      'Piste d’audit difficile à reconstituer à la main'
    ],
    after: [
      'Pistes d’audit (audit trail) 100% automatisées',
      'Conformité stricte à la norme 21 CFR Part 11',
      'Double validation et signatures électroniques',
      'Rapports de conformité et audits instantanés'
    ],
    kpis: [
      { value: '90%', label: "de préparation constante aux audits" },
      { value: '30%', label: 'de réduction du coût global de conformité' }
    ],
    visual: 'fda-flow',
    visualCaption: 'Workflow de conformité FDA & BPF : double validation et signature électronique sur CIPA.'
  },
  {
    num: '02',
    tag: 'Dossier de Lot Électronique',
    title: 'Efficacité renforcée par le dossier de lot électronique (eBR)',
    desc: "Éliminez les dossiers de lot papier lents et sujets aux erreurs. CIPA permet aux opérateurs de suivre des instructions de travail digitales guidées en salle blanche stérile et de valider les étapes en temps réel.",
    before: [
      'Dossiers de lot papier volumineux et lents à relire',
      'Risque d’erreurs de pesée et de dosage d’excipients',
      'Absence de validation en direct des étapes critiques',
      'Revue de dossiers de lots fastidieuse post-production'
    ],
    after: [
      'Dossiers de lot électroniques (eBR) guidés',
      'Contrôle automatique des pesées et mélanges',
      'Validation systématique des étapes en direct',
      'Libération de lot accélérée et simplifiée'
    ],
    kpis: [
      { value: '30%', label: 'de réduction des temps de libération de lot' },
      { value: '40%', label: 'de diminution des erreurs documentaires' }
    ],
    visual: 'tablet',
    visualCaption: 'Interface eBR opérateur CIPA : instructions de formulation guidées sur tablette en salle blanche.'
  },
  {
    num: '03',
    tag: 'IA & Déviations',
    title: 'Analyses avancées et IA pour l’amélioration continue',
    desc: "Exploitez les modèles d'IA prédictifs intégrés pour surveiller en continu les paramètres physiques de vos réacteurs et anticiper les déviations de qualité des lots.",
    before: [
      'Dérive de température ou pH de bioréacteur tardive',
      'Déviations qualité détectées en fin de batch',
      'Maintenance réactive entraînant des arrêts de lignes',
      'Rebuts de lots complets coûteux en fin de cycle'
    ],
    after: [
      'Surveillance prédictive IA des paramètres process',
      'Alerte précoce sur dérive de température ou pH',
      'Maintenance prédictive planifiée hors production',
      'Réduction significative des pertes de lots'
    ],
    kpis: [
      { value: '50%', label: 'de réduction du taux de déviations qualité' },
      { value: '10%', label: "d'augmentation du rendement de production global" }
    ],
    visual: 'predictive-chart',
    visualCaption: 'Suivi prédictif de bioréacteur : détection de dérive thermique avant altération du lot.'
  },
  {
    num: '04',
    tag: 'Traçabilité API',
    title: 'Améliorer la transparence de la supply chain et de la traçabilité',
    desc: "Conservez un historique numérique complet depuis la réception des matières actives (API) et des excipients jusqu'à la distribution finale du médicament. Isolez les lots en quelques minutes.",
    before: [
      'Traçabilité complexe et manuelle des matières actives',
      'Reconstitution de la généalogie de lot lente',
      'Difficulté à localiser les flacons sérialisés',
      'Temps de réaction long en cas de rappel produit'
    ],
    after: [
      'Généalogie de lot ascendante/descendante instantanée',
      'Traçabilité complète des fournisseurs de matières',
      'Sérialisation et code UDI suivis en direct',
      'Exécution de rappel produit ciblée en moins de 3 min'
    ],
    kpis: [
      { value: '20%', label: 'de réduction des délais de livraison' },
      { value: '25%', label: 'de baisse des coûts de stockage' }
    ],
    visual: 'supply-chain',
    visualCaption: 'Chaîne généalogique Lot : traçabilité continue du principe actif (API) au conditionnement.'
  }
]

const performanceSlides: CarouselSlide[] = [
  {
    num: '01',
    tag: 'Innovation & NPI',
    title: 'Accélérer l’innovation et l’optimisation du transfert R&D',
    desc: "Facilitez le transfert technologique entre les laboratoires R&D et l'usine de production. Centralisez les formules et standardisez les recettes pour accélérer l'industrialisation des médicaments.",
    before: [
      'Transfert de formulation R&D vers usine sur papier',
      'Mise à l’échelle (scale-up) complexe et non documentée',
      'Lancement de nouveaux médicaments long et coûteux',
      'Erreurs d’adaptation des formules en production'
    ],
    after: [
      'Référentiel unique de formules digitales standardisées',
      'Collaboration fluide entre laboratoires et usines',
      'Mise à l’échelle documentée et automatisée',
      'Time-to-market drastiquement raccourci'
    ],
    kpis: [
      { value: '70%', label: 'd’augmentation de la vitesse de documentation' },
      { value: '-40%', label: 'de réduction du time-to-market pour les lancements' }
    ],
    visual: 'launch-timeline',
    visualCaption: 'Timeline NPI : réduction du temps de transfert technologique de la R&D à la fabrication.'
  },
  {
    num: '02',
    tag: 'Assurance Qualité',
    title: 'Assurer la qualité produit et la sécurité des patients',
    desc: "Intégrez des contrôles qualité en ligne et automatisez le mirage visuel pour garantir le respect strict des spécifications des produits et préserver la sécurité des patients.",
    before: [
      'Mirage et inspection manuels subjectifs',
      'Incidents qualité détectés tardivement',
      'Temps de contrôle qualité lents hors ligne',
      'Coûts de quarantaine et de rebuts élevés'
    ],
    after: [
      'Mirage automatique et contrôles en ligne fiables',
      'Détection immédiate des défauts et corps étrangers',
      'Rapports d’assurance qualité automatisés en direct',
      'Sécurité des patients garantie à chaque ampoule'
    ],
    kpis: [
      { value: '50%', label: 'de diminution des défauts produits finis' },
      { value: '20%', label: 'de réduction du temps passé sur les contrôles' }
    ],
    visual: 'dashboard',
    visualCaption: 'Dashboard de libération de lot CIPA : indicateurs qualité, déviations et validation en direct.'
  },
  {
    num: '03',
    tag: 'CVC Salle Blanche',
    title: 'Optimiser la durabilité et réduire la consommation d’énergie',
    desc: "Pilotez la consommation d'énergie de vos salles blanches, notamment des systèmes de CVC (chauffage, ventilation et climatisation), pour une production durable et écoresponsable.",
    before: [
      'Salles blanches climatisées en continu à pleine puissance',
      'Manque de visibilité sur les consommations d’énergie',
      'Pertes de fluides et rejets sans mesures fiables',
      'Empreinte carbone industrielle élevée'
    ],
    after: [
      'Régulation intelligente de la CVC hors production',
      'Suivi de la consommation énergétique salle par salle',
      'Diminution significative des coûts de fluides',
      'Opérations vertes en phase avec les objectifs RSE'
    ],
    kpis: [
      { value: '-30%', label: 'de consommation d’énergie constatée sur la CVC' },
      { value: '-20%', label: 'de production de déchets et rebuts de matières' }
    ],
    visual: 'energy-chart',
    visualCaption: 'Profil énergétique CVC de salle blanche : courbe de consommation optimisée par CIPA.'
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
    case 'fda-flow':
      return <FdaFlowVisual />
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

// 01 — Workflow FDA (schéma étapes)
function FdaFlowVisual() {
  const steps = [
    { n: 1, title: 'Validation Dossier Formule', sub: 'Spécifications BPF validées', state: 'done' },
    { n: 2, title: 'Double Signature Opérateur & Pharmacien', sub: 'Enregistrement de signature électronique active', state: 'active' },
    { n: 3, title: 'Archivage Piste d’Audit FDA', sub: 'Rapport généré & signé 21 CFR Part 11', state: 'todo' }
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
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Dossier de Lot Électronique</div>
          <div className="text-xs font-black text-white">OF-2026-PHARMA-L3-042</div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[9px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Ligne active
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 bg-[#1a1b24] p-3 rounded-xl">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Instructions de Formulation</div>
          <ol className="text-[10px] text-slate-300 list-decimal list-inside space-y-1.5 leading-tight">
            <li>{"Vérifier la stérilisation du réacteur R-101 (SIP)"}</li>
            <li>{"Ajouter 150 kg d'excipient sous agitation à 60 RPM"}</li>
            <li>{"Valider la température de consigne à 37.5°C"}</li>
          </ol>
        </div>
        <div className="col-span-5 bg-[#1a1b24] p-3 rounded-xl flex flex-col justify-between">
          <div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Mélange</div>
            <div className="text-lg font-black text-gold">78%</div>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gold h-full w-[78%] rounded-full" />
          </div>
        </div>
      </div>
      <div className="bg-[#DAA250] hover:bg-gold text-dark text-center py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-colors">
        {"Valider l'étape de pesée/mélange"}
      </div>
    </div>
  )
}

// 03 — Courbe prédictive bioréacteur
function PredictiveChartVisual() {
  const [hovered, setHovered] = useState<number | null>(null)
  const pts = [
    { x: 30, y: 35, val: '97%' },
    { x: 120, y: 45, val: '94%' },
    { x: 210, y: 70, val: '86%' },
    { x: 300, y: 55, val: '90%' },
    { x: 370, y: 28, val: '98%' }
  ]
  return (
    <svg viewBox="0 0 400 160" className="w-full h-44">
      <line x1="20" y1="140" x2="380" y2="140" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="20" y1="10" x2="20" y2="140" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="20" y1="100" x2="380" y2="100" stroke="#F5F5F4" strokeDasharray="3,3" />
      <line x1="20" y1="60" x2="380" y2="60" stroke="#F5F5F4" strokeDasharray="3,3" />

      <line x1="20" y1="85" x2="380" y2="85" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,4" opacity="0.5" />
      <text x="375" y="81" textAnchor="end" className="fill-red-400 font-bold text-[8px]">Seuil alerte pH/Temp</text>

      <defs>
        <linearGradient id="pharmaPredGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DAA250" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#DAA250" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M30 35 C 70 38, 90 40, 120 45 C 160 50, 180 65, 210 70 C 245 75, 270 60, 300 55 C 330 48, 350 32, 370 28 L 370 140 L 30 140 Z"
        fill="url(#pharmaPredGlow)"
      />
      <path
        d="M30 35 C 70 38, 90 40, 120 45 C 160 50, 180 65, 210 70 C 245 75, 270 60, 300 55 C 330 48, 350 32, 370 28"
        fill="none"
        stroke="#DAA250"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g>
        <line x1="210" y1="70" x2="210" y2="112" stroke="#22C55E" strokeWidth="1" strokeDasharray="3,3" />
        <rect x="145" y="112" width="130" height="15" rx="4" className="fill-emerald-500/10" />
        <text x="210" y="123" textAnchor="middle" className="fill-emerald-600 font-bold text-[8px]">Régulation pH bioréacteur</text>
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
    </svg>
  )
}

// 04 — Généalogie matières actives
function SupplyChainVisual() {
  const steps = [
    { icon: Network, title: 'Fournisseur API', id: 'Lot-API-992' },
    { icon: Cpu, title: 'Mélange / Granul.', id: 'Lot-MEL-04' },
    { icon: ShieldCheck, title: 'Conditionn. Sérial.', id: 'Lot-PACK-88' }
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
          {"Généalogie lot à lot ascendante et descendante instantanée pour répondre aux exigences réglementaires de rappel."}
        </p>
      </div>
    </div>
  )
}

// 05 — Timeline de transfert technologique
function LaunchTimelineVisual() {
  const phases = [
    { name: 'Transfert Recette R&D', before: 85, after: 40 },
    { name: 'Validation Pilote', before: 75, after: 45 },
    { name: 'Essais Industriels', before: 90, after: 50 },
    { name: 'Dossier Enregistrement', before: 70, after: 30 }
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

// 06 — Mini dashboard de conformité
function DashboardVisual() {
  const tiles = [
    { label: 'Taux Libération Directe', value: '98.5%', trend: '+4.2%', good: true },
    { label: 'Déviations Ouvertes', value: '1', trend: '-8', good: true },
    { label: 'Alertes Température', value: '0', trend: '0', good: true },
    { label: 'Revue de Dossier Lot', value: '4h', trend: '-80%', good: true }
  ]
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
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[9px] text-slate-500">
        <span className="font-bold text-dark block mb-1">Rapport de Piste d’Audit (Audit Trail) :</span>
        {"Système verrouillé, double signature électronique validée et horodatée sur la blockchain industrielle."}
      </div>
    </div>
  )
}

// 07 — Suivi de consommation CVC de salle blanche
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
   PAGE PHARMACEUTIQUE
   ============================================================ */

export default function PharmaPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F6] text-dark overflow-x-hidden font-body selection:bg-gold/30 selection:text-gold-900">

      {/* 1. HERO — CIPA transforme la donnée terrain en performance durable */}
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
                  className="inline-flex items-center gap-3 rounded-full border border-[#EDE3D2] bg-white/80 py-1.5 pl-1.5 pr-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur"
                >
                  <span className="h-5 w-1.5 rounded-full bg-[#DAA250]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#57534E] sm:text-[11px]">
                    Pharma / Biotech / Life Sciences
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`${heroStyles.title} mt-6 font-display text-[34px] font-black leading-[1.06] tracking-[-0.02em] text-dark sm:text-[44px] lg:text-[clamp(34px,3.85vw_-_4px,50px)]`}
                >
                  CIPA transforme
                  <br />
                  la <span className="text-[#DAA250]">donnée terrain</span>
                  <br />
                  en performance durable
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 max-w-[34rem] text-[14px] leading-[1.75] text-[#57534E] sm:text-[15.5px]"
                >
                  {"Une plateforme intégrée pour orchestrer la qualité, la production, la maintenance et la R&D dans les environnements réglementés, et accélérer l'amélioration continue grâce à l'IA."}
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
                    Demander une démonstration
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#core-ops"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-[#E4DED2] bg-white px-7 py-4 text-[14px] font-semibold text-[#292524] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_10px_26px_rgba(218,162,80,0.18)]"
                  >
                    {"Voir les cas d'usage"}
                    <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </motion.div>
              </div>

              <ul className={`${heroStyles.indicators} mt-10 grid grid-cols-3 gap-x-3 sm:gap-x-6`}>
                {[
                  'Données unifiées',
                  'Processus maîtrisés',
                  'Conformité renforcée'
                ].map((title) => (
                  <li key={title} className="flex items-start gap-2 sm:items-center">
                    <CheckCircle2 size={15} aria-hidden="true" className="shrink-0 text-[#22C55E]" />
                    <span className="text-[13px] font-medium text-[#57534E]">{title}</span>
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
                  src="/Secteur/pharma22.png"
                  alt="Plateforme CIPA en salle blanche pharmaceutique : tableau de bord qualité, conformité et assistance IA"
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
            <div className="w-11 h-11 rounded-full border border-gold/40 bg-gold/10 text-[#DAA250] flex items-center justify-center shrink-0 relative z-10">
              <ShieldCheck size={19} />
            </div>
            <p className="text-[13px] sm:text-sm text-white/85 leading-relaxed relative z-10 text-center md:text-left">
              {"Des matières actives en vrac au conditionnement final sous blister, CIPA aide les laboratoires pharmaceutiques à sécuriser la conformité réglementaire, optimiser l'eBR et accélérer la libération des lots."}
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
                opérations pharmaceutiques essentielles
              </span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed">
              {"Naviguez entre les cartes pour explorer chaque levier : les données, les visuels et les comparaisons avant/après CIPA."}
            </p>
          </div>

          <SmartCarousel slides={coreSlides} accentLabel="Opérations Pharma" />
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

          <SmartCarousel slides={performanceSlides} accentLabel="Performance durable Pharma" />
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
                  {"Une plateforme unique pour l'excellence, la traçabilité et la conformité 21 CFR Part 11."}
                </h2>
                <p className="text-sm text-white/70 leading-relaxed">
                  {"CIPA unifie les personnes, les processus et les données pour fournir des insights connectés sur toute la chaîne de valeur pharmaceutique — sécurité des patients, intégrité des données ALCOA+, audits de conformité automatisés et eBR en temps réel."}
                </p>
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                {[
                  { icon: Database, label: 'Données connectées' },
                  { icon: Eye, label: 'Visibilité atelier' },
                  { icon: Truck, label: 'Visibilité fournisseurs' },
                  { icon: ShieldCheck, label: 'Assurance conformité FDA' }
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
              { icon: Network, title: '1. Connecter', desc: 'Unifiez les données des équipements et opérateurs en salle blanche.' },
              { icon: FlaskConical, title: '2. Analyser', desc: "L'IA et les analyses prédisent les dérives et identifient les écarts." },
              { icon: Rocket, title: '3. Agir', desc: 'Automatisez les workflows qualité et signalez les déviations.' },
              { icon: TrendingUp, title: '4. Améliorer', desc: 'Surveillez, mesurez et réduisez les temps de libération.' },
              { icon: Leaf, title: '5. Impact', desc: 'Des résultats mesurables en libération eBR, conformité et énergie CVC.' }
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
            {"Prêt à digitaliser vos opérations pharmaceutiques ?"}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {"Rejoignez les leaders des sciences de la vie qui utilisent CIPA pour assurer leur conformité, maximiser la traçabilité et optimiser le rendement. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles."}
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
