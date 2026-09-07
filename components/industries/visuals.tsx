'use client'

import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, ShieldCheck, Workflow } from 'lucide-react'

import { viewport } from '@/lib/motion'
import type {
  FlowStep,
  IndustryVisuals,
  SlideVisual,
} from '@/lib/data/industries/types'

/**
 * Les sept illustrations des pages sectorielles.
 *
 * Chacune existait en six exemplaires, un par industrie, avec des ecarts de
 * deux a trente-quatre lignes portant uniquement sur du texte, des chiffres
 * et des icones. Elles sont ici en un seul exemplaire, pilotees par la
 * donnee de `IndustryVisuals`.
 */

export function ComplianceFlowVisual({ steps }: { steps: FlowStep[] }) {
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
                s.state === 'todo' ? 'bg-slate-100 text-subtle' : 'bg-gold/10 text-gold'
              }`}
            >
              {s.n}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs font-bold ${s.state === 'todo' ? 'text-subtle' : 'text-dark'}`}>{s.title}</h4>
              <p className="text-[10px] text-subtle truncate">{s.sub}</p>
            </div>
            {s.state === 'done' && <ShieldCheck size={16} className="text-emerald-500 shrink-0" />}
            {s.state === 'active' && (
              <span className="text-[9px] font-bold text-gold-ink px-2 py-0.5 bg-gold/10 rounded-full shrink-0">En cours</span>
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

export function TabletVisual({ data }: { data: IndustryVisuals['tablet'] }) {
  return (
    <div className="w-full bg-[#141520] rounded-2xl p-4 border border-white/5 text-white flex flex-col gap-3">
      <div className="flex justify-between items-center bg-[#1a1b24] p-3 rounded-xl">
        <div>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{data.orderLabel}</div>
          <div className="text-xs font-black text-white">{data.orderId}</div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[9px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Ligne active
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-7 bg-[#1a1b24] p-3 rounded-xl">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">{data.instructionsLabel}</div>
          <ol className="text-[10px] text-slate-300 list-decimal list-inside space-y-1.5 leading-tight">
            {data.instructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="col-span-5 bg-[#1a1b24] p-3 rounded-xl flex flex-col justify-between">
          <div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">{data.progressLabel}</div>
            <div className="text-lg font-black text-gold">{data.progress}%</div>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gold h-full rounded-full" style={{ width: `${data.progress}%` }} />
          </div>
        </div>
      </div>
      <div className="bg-[#DAA250] hover:bg-gold text-dark text-center py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-colors">
        {data.ctaLabel}
      </div>
    </div>
  )
}

export function SupplyChainVisual({ data }: { data: IndustryVisuals['supplyChain'] }) {
  const { steps } = data
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
                <div className="text-[8px] text-subtle bg-slate-100 px-1 py-0.5 rounded font-mono mt-0.5">{step.id}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-5 mx-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
          <Eye size={15} />
        </div>
        <p className="text-[10px] text-subtle leading-snug">
          <span className="font-bold text-dark">{data.noteLabel}</span>{' '}
          {data.noteText}
        </p>
      </div>
    </div>
  )
}

export function LaunchTimelineVisual({ phases }: { phases: IndustryVisuals['launchTimeline'] }) {
  return (
    <div className="w-full py-2 flex flex-col gap-3">
      <div className="flex items-center gap-4 text-[9px] font-bold">
        <span className="flex items-center gap-1.5 text-subtle">
          <span className="w-3 h-2 rounded-sm bg-slate-200 inline-block" /> Avant CIPA
        </span>
        <span className="flex items-center gap-1.5 text-gold-ink">
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
                viewport={viewport}
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

export function DashboardVisual({ data }: { data: IndustryVisuals['dashboard'] }) {
  const { tiles } = data
  return (
    <div className="w-full flex flex-col gap-3 py-1">
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((t, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="text-[9px] text-subtle font-bold uppercase tracking-wide truncate">{t.label}</div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base font-black font-display text-dark">{t.value}</span>
              <span className={`text-[9px] font-bold ${t.good ? 'text-emerald-700' : 'text-red-600'}`}>{t.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[9px] text-subtle">
        <span className="font-bold text-dark block mb-1">{data.auditLabel}</span>
        {data.auditText}
      </div>
    </div>
  )
}

export function PredictiveChartVisual({ data }: { data: IndustryVisuals['predictiveChart'] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  // Un identifiant unique par instance : deux graphiques sur la meme page
  // partageraient sinon le meme degrade, et le second effacerait le premier.
  const glowId = useId()
  const pts = data.points
  return (
    <svg viewBox="0 0 400 160" className="w-full h-44">
      <line x1="20" y1="140" x2="380" y2="140" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="20" y1="10" x2="20" y2="140" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="20" y1="100" x2="380" y2="100" stroke="#F5F5F4" strokeDasharray="3,3" />
      <line x1="20" y1="60" x2="380" y2="60" stroke="#F5F5F4" strokeDasharray="3,3" />

      <line x1="20" y1="85" x2="380" y2="85" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,4" opacity="0.5" />
      <text x="375" y="81" textAnchor="end" className="fill-red-400 font-bold text-[8px]">{data.thresholdLabel}</text>

      <defs>
        <linearGradient id={glowId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DAA250" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#DAA250" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${data.path} L 370 140 L 30 140 Z`}
        fill={`url(#${glowId})`}
      />
      <path
        d={data.path}
        fill="none"
        stroke="#DAA250"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g>
        <line x1={data.annotation.x} y1={data.annotation.y} x2={data.annotation.x} y2="112" stroke="#22C55E" strokeWidth="1" strokeDasharray="3,3" />
        <rect x={data.annotation.boxX} y="112" width={data.annotation.boxWidth} height="15" rx="4" className="fill-emerald-500/10" />
        <text x={data.annotation.x} y="123" textAnchor="middle" className="fill-emerald-600 font-bold text-[8px]">{data.annotation.label}</text>
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


export function EnergyChartVisual({ data }: { data: IndustryVisuals['energyChart'] }) {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-44">
      <line x1="30" y1="10" x2="30" y2="130" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="30" y1="130" x2="370" y2="130" stroke="#ECE7DD" strokeWidth="1" />
      <line x1="30" y1="80" x2="370" y2="80" stroke="#F5F5F4" strokeDasharray="3,3" />
      <line x1="30" y1="40" x2="370" y2="40" stroke="#F5F5F4" strokeDasharray="3,3" />

      <path d={data.baselinePath} fill="none" stroke="#A8A29E" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x="355" y="32" className="fill-slate-400 text-[7px] font-bold">{data.baselineLabel}</text>

      <path d={data.optimisedPath} fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <text x="355" y={data.deltaY} className="fill-emerald-500 text-[7px] font-bold">{data.deltaLabel}</text>

      {data.markers.map((mk) => (
        <circle key={`${mk.x}-${mk.y}`} cx={mk.x} cy={mk.y} r="3" className="fill-white stroke-emerald-500 stroke-2" />
      ))}

      {data.xLabels.map((label, i) => (
        <text
          key={label}
          x={[30, 110, 190, 270, 350][i]}
          y="142"
          textAnchor="middle"
          className="text-[8px] font-bold fill-slate-400"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}


/** Aiguillage : chaque diapositive nomme l'illustration qu'elle veut. */
export function SlideVisualRenderer({
  visual,
  visuals,
}: {
  visual: SlideVisual
  visuals: IndustryVisuals
}) {
  switch (visual) {
    case 'compliance-flow':
      return <ComplianceFlowVisual steps={visuals.complianceFlow} />
    case 'tablet':
      return <TabletVisual data={visuals.tablet} />
    case 'predictive-chart':
      return <PredictiveChartVisual data={visuals.predictiveChart} />
    case 'supply-chain':
      return <SupplyChainVisual data={visuals.supplyChain} />
    case 'launch-timeline':
      return <LaunchTimelineVisual phases={visuals.launchTimeline} />
    case 'dashboard':
      return <DashboardVisual data={visuals.dashboard} />
    case 'energy-chart':
      return <EnergyChartVisual data={visuals.energyChart} />
  }
}
