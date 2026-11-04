import { Bell, BrainCircuit, CalendarDays, ClipboardCheck, LayoutDashboard, Plug, ShieldCheck, type LucideIcon } from 'lucide-react'

import type { Locale } from '@/i18n/routing'

/**
 * Entrées du méga-menu Solution : source unique du titre, du sous-titre et
 * de l'icône de chaque page (platform.ts les reprend).
 *
 * Module séparé et sans dépendance lourde : la Navbar, composant client
 * présent sur toutes les pages, l'importe seul. Importer platform.ts
 * envoyait au navigateur tout le contenu des sept pages, dans les deux
 * langues (37 Ko minifiés), pour afficher sept liens.
 */
export type PlatformMenuEntry = {
  slug: string
  icon: LucideIcon
  title: Record<Locale, string>
  description: Record<Locale, string>
}

export const PLATFORM_MENU: PlatformMenuEntry[] = [
  {
    slug: 'remontee-terrain',
    icon: ClipboardCheck,
    title: { fr: 'Remontée terrain', en: 'Shop-floor data capture' },
    description: {
      fr: 'Audits, inspections, checklists et contrôles de production',
      en: 'Audits, inspections, checklists and production checks',
    },
  },
  {
    slug: 'planification-maintenance',
    icon: CalendarDays,
    title: { fr: 'Planification & maintenance', en: 'Planning & maintenance' },
    description: {
      fr: 'Programme d’audit, contrôles de maintenance et équipements',
      en: 'Audit programme, maintenance checks and equipment',
    },
  },
  {
    slug: 'gestion-ecarts',
    icon: Bell,
    title: { fr: 'Gestion des écarts', en: 'Deviation management' },
    description: {
      fr: 'Déviations, non-conformités, CAPA et réclamations',
      en: 'Deviations, non-conformities, CAPA and complaints',
    },
  },
  {
    slug: 'conformite-tracabilite',
    icon: ShieldCheck,
    title: { fr: 'Conformité & traçabilité', en: 'Compliance & traceability' },
    description: {
      fr: 'Workflows de validation, change control et audit trail',
      en: 'Approval workflows, change control and audit trail',
    },
  },
  {
    slug: 'pilotage-performance',
    icon: LayoutDashboard,
    title: { fr: 'Pilotage de la performance', en: 'Performance management' },
    description: {
      fr: 'Tableaux de bord, rapports automatiques et Pareto',
      en: 'Dashboards, automatic reports and Pareto',
    },
  },
  {
    slug: 'intelligence-operationnelle',
    icon: BrainCircuit,
    title: { fr: 'Intelligence opérationnelle', en: 'Operational intelligence' },
    description: {
      fr: 'Détection des écarts, signaux faibles et checklists générées',
      en: 'Deviation detection, weak signals and generated checklists',
    },
  },
  {
    slug: 'integrations',
    icon: Plug,
    title: { fr: 'Intégrations & organisation', en: 'Integrations & organization' },
    description: {
      fr: 'ERP, MES, GMAO, BI, utilisateurs et sécurité',
      en: 'ERP, MES, CMMS, BI, users and security',
    },
  },
]

/** Entrée de menu d'une page Solution (erreur si le slug est inconnu). */
export function platformMenuEntry(slug: string): PlatformMenuEntry {
  const entry = PLATFORM_MENU.find((item) => item.slug === slug)
  if (!entry) throw new Error(`Entrée de menu manquante pour la page Solution « ${slug} »`)
  return entry
}

/** Lien vers une page Solution, et vers l'une de ses sections si `anchor`. */
export function platformHref(slug: string, anchor?: string) {
  return `/plateforme/${slug}${anchor ? `#${anchor}` : ''}`
}
