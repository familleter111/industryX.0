/**
 * Contenu partage par toutes les pages : CTA, navigation, pied de page.
 *
 * Ce fichier est la seule source de verite de ces trois listes. La Navbar et
 * le Footer les importent au lieu de les redeclarer : sans cela, ajouter une
 * page demandait de la declarer a deux endroits, et les deux divergeaient
 * silencieusement — c'est exactement ce que `lib/data/socials.ts` a corrige
 * pour l'URL LinkedIn.
 *
 * Les icones sont des composants `lucide-react`, pas du JSX : un fichier
 * `.ts` peut les porter, et le contenu reste modifiable sans ouvrir un
 * composant.
 */

import {
  Activity,
  BarChart3,
  BrainCircuit,
  Car,
  ClipboardCheck,
  Factory,
  FileText,
  Handshake,
  HelpCircle,
  ListChecks,
  Mail,
  Plug,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Users,
  Utensils,
  Workflow,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { Cta } from './types'

/* ═══════════════════════════════════════════════════════════════════════
   IDENTITE
   ═══════════════════════════════════════════════════════════════════════ */

export const COMPANY = {
  name: 'Industry X.0',
  product: 'CIPA',
  productFull: 'CIPA — Continuous Improvement Process Audit',
  /** Utilise par les URL canoniques et le JSON-LD. */
  siteUrl: 'https://www.industryx0.pro',
  address: {
    /** Deja mis en forme pour l'affichage, sur deux lignes. */
    lines: ['Cité les pins', 'Tunis 1053'],
    locality: 'Tunis',
    postalCode: '1053',
    country: 'TN',
  },
  phone: '+216 90 199 823',
  email: 'contact@industryx0.pro',
} as const

/* ═══════════════════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Les deux appels a l'action du site. Un directeur d'usine ne doit jamais
 * avoir a choisir entre six portes d'entree : il demande une demonstration,
 * ou il regarde la plateforme avant de se decider.
 */
export const PRIMARY_CTA: Cta = {
  label: 'Planifier une démo',
  href: '/contact',
}

export const SECONDARY_CTA: Cta = {
  label: 'Voir la plateforme',
  href: '/plateforme',
}

/* ═══════════════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════════════ */

export type NavItem = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  badge?: string
}

export type NavGroup = {
  label: string
  /** Panneau reduit : pas de bloc en vedette, une seule colonne de liens. */
  compact?: boolean
  featured?: {
    title: string
    description: string
    href: string
  }
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Plateforme',
    featured: {
      title: 'CIPA — Industrial Intelligence Platform',
      description:
        'CIPA capte la donnée terrain, orchestre les processus critiques et active l’IA pour améliorer les opérations industrielles.',
      href: '/plateforme',
    },
    items: [
      {
        title: 'Vue d’ensemble CIPA',
        description:
          'Comprendre comment CIPA structure les opérations industrielles.',
        href: '/plateforme',
        icon: Factory,
      },
      {
        title: 'Capture terrain',
        description: 'Digitaliser formulaires, audits et données terrain.',
        href: '/plateforme/capture-terrain',
        icon: ScanSearch,
      },
      {
        title: 'Orchestration des processus',
        description: 'Piloter workflows qualité et production.',
        href: '/plateforme/orchestration',
        icon: Workflow,
      },
      {
        title: 'Intelligence opérationnelle',
        description: 'Détecter écarts et signaux faibles grâce à l’IA.',
        href: '/plateforme/intelligence-operationnelle',
        icon: BrainCircuit,
        badge: 'IA',
      },
      {
        title: 'Tableaux de bord',
        description: 'Suivre les indicateurs qualité et performance.',
        href: '/plateforme/tableaux-de-bord',
        icon: BarChart3,
      },
      {
        title: 'Intégrations industrielles',
        description: 'Connecter CIPA aux ERP, BI et MES.',
        href: '/plateforme/integrations',
        icon: Plug,
      },
    ],
  },

  {
    label: 'Solutions',
    /*
     * ─────────────────────────────────────────────────────────────────
     *  PAS DE PAGE PILIER /solutions
     * ─────────────────────────────────────────────────────────────────
     *
     * La rubrique Plateforme a la sienne, pas celle-ci. Le bloc en vedette
     * pointait donc sur une URL inexistante, servie en 404 depuis les douze
     * pages du site — le menu est identique partout.
     *
     * En attendant que la page pilier existe, il renvoie vers Amelioration
     * continue, et son texte a ete reecrit pour dire honnetement ou il mene :
     * un bloc en vedette qui promet une vue d'ensemble et livre une page de
     * detail est une deception, pas une navigation.
     *
     * A refaire le jour ou /solutions existe : retablir le titre general et
     * l'URL de la rubrique.
     */
    featured: {
      title: 'De l’écart constaté au progrès mesurable',
      description:
        'CIPA — Continuous Improvement Process Audit : la boucle qui relie les six solutions entre elles.',
      href: '/solutions/amelioration-continue',
    },
    items: [
      {
        title: 'Qualité & conformité',
        description: 'Contrôles, audits et traçabilité.',
        href: '/solutions/qualite-conformite',
        icon: ShieldCheck,
      },
      {
        title: 'Production & dossier de lot',
        description: 'Structurer les opérations critiques.',
        href: '/solutions/production-dossier-de-lot',
        icon: Factory,
      },
      {
        title: 'Maintenance & sécurité',
        description: 'Digitaliser les interventions terrain.',
        href: '/solutions/maintenance-securite',
        icon: Activity,
      },
      {
        title: 'Non-conformités & CAPA',
        description: 'Déclarer et traiter les écarts.',
        href: '/solutions/non-conformites-capa',
        icon: ClipboardCheck,
      },
      {
        title: 'Audits & inspections',
        description: 'Piloter inspections et évaluations.',
        href: '/solutions/audits-inspections',
        icon: ListChecks,
      },
      {
        title: 'Amélioration continue',
        description: 'Transformer les problèmes en progrès.',
        href: '/solutions/amelioration-continue',
        icon: RefreshCw,
      },
    ],
  },

  {
    label: 'Industries',
    compact: true,
    items: [
      {
        title: 'Pharmaceutique',
        description:
          'GMP, traçabilité, déviations, CAPA, audits et dossier de lot électronique.',
        href: '/industries/pharma',
        icon: ShieldCheck,
      },
      {
        title: 'Agroalimentaire & boissons',
        description:
          'Contrôles qualité, sécurité alimentaire, inspections, conformité et traçabilité terrain.',
        href: '/industries/food',
        icon: Utensils,
      },
      {
        title: 'Cosmétique & dispositifs médicaux',
        description:
          'Standardisation qualité, conformité, inspections et maîtrise documentaire opérationnelle.',
        href: '/industries/cosmetics',
        icon: ClipboardCheck,
      },
      {
        title: 'Automobile & composants',
        description:
          'Performance usine, maîtrise process, audits terrain et plans d’action.',
        href: '/industries/automotive',
        icon: Car,
      },
      {
        title: 'Électronique & câblage',
        description:
          'Contrôles process, standards terrain, traçabilité et réduction des écarts.',
        href: '/industries/electronics',
        icon: Zap,
      },
      {
        title: 'Packaging & plasturgie',
        description:
          'Qualité terrain, suivi production, contrôles, incidents et amélioration continue.',
        href: '/industries/packaging',
        icon: Factory,
      },
    ],
  },

  {
    label: 'Ressources',
    compact: true,
    items: [
      {
        title: 'Cas clients',
        description: 'Voir comment les industriels utilisent CIPA.',
        href: '/customers',
        icon: Users,
      },
      {
        title: 'Guides & insights',
        description: 'Analyses et excellence opérationnelle.',
        href: '/resources',
        icon: FileText,
      },
      {
        title: 'FAQ',
        description: 'Questions fréquentes sur la plateforme.',
        href: '/faq',
        icon: HelpCircle,
      },
    ],
  },

  {
    label: 'Société',
    compact: true,
    items: [
      {
        title: 'Industry X.0',
        description:
          'Présenter notre vision, notre trajectoire et notre ambition industrielle.',
        href: '/about',
        icon: Factory,
      },
      {
        title: 'Équipe',
        description:
          'Mettre en avant les fondateurs et l’expertise opérationnelle, industrielle et technologique.',
        href: '/team',
        icon: Users,
      },
      {
        title: 'Partenaires',
        description:
          'Valoriser notre écosystème industriel, technologique et institutionnel.',
        href: '/partners',
        icon: Handshake,
      },
      {
        title: 'Contact',
        description: 'Créer un accès direct à notre équipe.',
        href: '/contact',
        icon: Mail,
      },
    ],
  },
]

/**
 * Retrouve une entree de navigation par son URL.
 *
 * C'est ce qui permet aux blocs de maillage interne de ne porter que des
 * chemins : le titre, la description et l'icone affiches sont ceux du menu, et
 * le restent apres un renommage. Recopier ces textes page par page aurait cree
 * autant d'endroits a corriger que de liens.
 *
 * Leve plutot que de renvoyer `undefined` : l'appel se fait au chargement du
 * module, donc pendant le build. Une URL renommee dans le menu casse la
 * construction avec un message clair, au lieu de vider un bloc en silence.
 */
export function navItemByHref(href: string): NavItem {
  for (const group of NAV_GROUPS) {
    const item = group.items.find((candidate) => candidate.href === href)
    if (item) return item
  }
  throw new Error(
    `navItemByHref : aucune entree de navigation pour « ${href} ». ` +
      'Verifiez NAV_GROUPS dans content/shared.ts.',
  )
}

/**
 * Toutes les URL internes declarees dans la navigation, dedoublonnees.
 * Consommee par le sitemap, qui n'a ainsi pas sa propre liste a tenir.
 */
export function navHrefs(): string[] {
  const seen = new Set<string>()
  for (const group of NAV_GROUPS) {
    if (group.featured) seen.add(group.featured.href)
    for (const item of group.items) seen.add(item.href)
  }
  return Array.from(seen).filter((href) => href.startsWith('/'))
}

/* ═══════════════════════════════════════════════════════════════════════
   PIED DE PAGE
   ═══════════════════════════════════════════════════════════════════════ */

export type FooterLink = {
  label: string
  /**
   * `'/'` tant que la page n'existe pas. Ces entrees portent un TODO : un lien
   * de pied de page qui renvoie sur l'accueil est un lien mort deguise.
   */
  href: string
}

export type FooterColumn = {
  title: string
  items: FooterLink[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Produit',
    items: [
      { label: 'Fonctionnalités', href: '/plateforme' },
      // Meme sortie de secours que le bloc en vedette du menu Solutions :
      // /solutions n'existe pas encore. Voir NAV_GROUPS plus haut.
      { label: 'Qualité & conformité', href: '/solutions/qualite-conformite' },
      // TODO destinations a creer — renvoient sur l'accueil en attendant.
      { label: 'Sécurité', href: '/' },
      { label: 'Mises à jour', href: '/' },
    ],
  },
  {
    title: 'Entreprise',
    items: [
      { label: 'À propos', href: '/about' },
      { label: 'Notre équipe', href: '/team' },
      // TODO destination a creer — renvoie sur l'accueil en attendant.
      { label: 'Blog', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Légal',
    items: [
      // TODO destinations a creer — renvoient sur l'accueil en attendant.
      { label: 'Confidentialité', href: '/' },
      { label: 'Conditions', href: '/' },
      { label: 'Cookies', href: '/' },
    ],
  },
]

export const FOOTER_TAGLINE =
  'Plateforme de transformation digitale dédiée à l’industrie africaine et méditerranéenne, conçue pour accélérer l’adoption des technologies Industrie 4.0 et optimiser les performances industrielles.'

export const FOOTER_LEGAL = {
  copyright: '© 2026 Industry X.0 — Tous droits réservés',
  mentions: ['Startup Act 🇹🇳', 'Designed in Tunis'],
} as const
