'use client'

import { motion } from 'framer-motion'

import Section from '@/components/ui/Section'
import {
  ARCHITECTURE_NODES,
  architectureContent,
  type ArchitectureNode,
} from '@/lib/data/architecture'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

const COPY = {
  fr: {
    flow: 'Flux de la donnée : sources terrain, ingestion, traitement et intelligence artificielle, couche applicative, restitution.',
    title: 'Architecture & sécurité',
    lead: 'Comment la donnée circule, de la saisie en atelier jusqu’au rapport d’audit, et ce qui encadre son traitement.',
    stack: 'Stack technique',
    security: 'Sécurité & conformité des données',
  },
  en: {
    flow: 'Data flow: shop-floor sources, ingestion, processing and artificial intelligence, application layer, reporting.',
    title: 'Architecture & security',
    lead: 'How data flows, from shop-floor entry to the audit report, and what governs its processing.',
    stack: 'Technology stack',
    security: 'Data security & compliance',
  },
}
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/hooks/useMotion'

/**
 * Architecture & sécurité.
 *
 * Section délibérément sobre : elle s'adresse à un jury. Le titre ne porte
 * aucun accent coloré, le mouvement se limite à une entrée en cascade et au
 * tracé des liaisons du schéma. C'est le scroll storytelling de HowItWorks
 * qui porte l'effet de la page, pas cette section.
 */

/* Repère du schéma. Coordonnées sans unité : le SVG se met à l'échelle. */
const VIEW_W = 1000
const VIEW_H = 120
const NODE_R = 26
const GAP = VIEW_W / ARCHITECTURE_NODES.length
const nodeX = (i: number) => GAP / 2 + i * GAP
const CY = 46

function FlowDiagram({ nodes, label }: { nodes: ArchitectureNode[]; label: string }) {
  const m = useMotion()

  return (
    <motion.svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="w-full"
      role="img"
      aria-label={label}
      variants={m.stagger()}
      initial="hidden"
      whileInView="visible"
      viewport={m.viewport}
    >
      {/* Liaisons — tracées après l'apparition des nœuds. strokeDashoffset est
          la seule exception à la règle transform / opacity du projet. */}
      {nodes.slice(0, -1).map((node, i) => (
        <motion.line
          key={`${node.id}-lien`}
          x1={nodeX(i) + NODE_R + 6}
          y1={CY}
          x2={nodeX(i + 1) - NODE_R - 6}
          y2={CY}
          stroke={tokens.color.cream.deep}
          strokeWidth={1.5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          variants={m.drawLine}
        />
      ))}

      {nodes.map((node, i) => (
        <motion.g key={node.id} variants={m.scaleIn}>
          <circle
            cx={nodeX(i)}
            cy={CY}
            r={NODE_R}
            className="fill-white"
            stroke={tokens.color.cream.border}
            strokeWidth={1}
          />
          <text
            x={nodeX(i)}
            y={CY + 5}
            textAnchor="middle"
            className="fill-stone-500 text-[15px] font-bold"
          >
            {i + 1}
          </text>
          <text
            x={nodeX(i)}
            y={CY + NODE_R + 22}
            textAnchor="middle"
            className="fill-dark text-[14px] font-semibold"
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  )
}

export default function ArchitectureSection({
  id = 'architecture',
  className,
}: {
  id?: string
  className?: string
} = {}) {
  const m = useMotion()
  const t = useCopy(COPY)
  const { nodes, stack, security } = architectureContent(useCurrentLocale())

  return (
    <Section id={id} variant="default" background="white" className={className}>
      <motion.div
        variants={m.stagger()}
        initial="hidden"
        whileInView="visible"
        viewport={m.viewport}
      >
        <motion.div variants={m.fadeUp} className="max-w-2xl">
          <h2 className="font-display text-3xl font-black leading-tight tracking-[-0.03em] text-dark sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            {t.lead}
          </p>
        </motion.div>

        {/* SCHÉMA */}
        <motion.div
          variants={m.fadeUp}
          className="mt-12 overflow-x-auto rounded-lg border border-cream-border bg-white p-6 sm:p-8"
        >
          <div className="min-w-[720px]">
            <FlowDiagram nodes={nodes} label={t.flow} />
          </div>
        </motion.div>

        <motion.ul
          variants={m.stagger()}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {nodes.map((node, i) => (
            <motion.li key={node.id} variants={m.fadeUp}>
              <p className="text-[12px] font-bold text-subtle">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-1 text-[14px] font-semibold text-dark">
                {node.label}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-stone-600">
                {node.detail}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* STACK */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div variants={m.fadeUp}>
            <h3 className="text-[15px] font-bold text-dark">{t.stack}</h3>
            <dl className="mt-4 divide-y divide-cream-border border-y border-cream-border">
              {stack.map((layer) => (
                <div key={layer.layer} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr] sm:gap-4">
                  <dt className="text-[13px] font-semibold text-dark">
                    {layer.layer}
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-stone-600">
                    {layer.role}
                    {layer.tech && (
                      <span className="mt-1 block text-subtle">{layer.tech}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* SÉCURITÉ & CONFORMITÉ */}
          <motion.div variants={m.fadeUp}>
            <h3 className="text-[15px] font-bold text-dark">
              {t.security}
            </h3>
            <ul className="mt-4 space-y-5">
              {security.map((point) => {
                const Icon = point.icon
                return (
                  <li key={point.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cream-border/60">
                      <Icon size={15} className="text-subtle" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-dark">
                        {point.title}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-stone-600">
                        {point.detail}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
