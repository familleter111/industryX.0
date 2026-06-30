'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Inter } from 'next/font/google'

import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Bot,
  Car,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Factory,
  FileText,
  Handshake,
  HelpCircle,
  ListChecks,
  Mail,
  Menu,
  MessageCircle,
  Plug,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Users,
  Utensils,
  Workflow,
  X,
  Zap,
} from 'lucide-react'

import Image from 'next/image'

const inter = Inter({
  subsets: ['latin'],
})

type NavItem = {
  title: string
  description: string
  href: string
  icon: any
  badge?: string
}

type NavGroup = {
  label: string
  compact?: boolean
  featured?: {
    title: string
    description: string
    href: string
  }
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'Plateforme',
    featured: {
      title: 'CIPA — Industrial Intelligence Platform',
      description:
        'CIPA capte la donnée terrain, orchestre les processus critiques et active l’IA pour améliorer les opérations industrielles.',
      href: '/platform',
    },
    items: [
      {
        title: 'Vue d’ensemble CIPA',
        description:
          'Comprendre comment CIPA structure les opérations industrielles.',
        href: '/platform',
        icon: Factory,
      },
      {
        title: 'Capture terrain',
        description: 'Digitaliser formulaires, audits et données terrain.',
        href: '/platform/capture',
        icon: ScanSearch,
      },
      {
        title: 'Orchestration des processus',
        description: 'Piloter workflows qualité et production.',
        href: '/platform/workflows',
        icon: Workflow,
      },
      {
        title: 'Intelligence opérationnelle',
        description: 'Détecter écarts et signaux faibles grâce à l’IA.',
        href: '/platform/intelligence',
        icon: BrainCircuit,
        badge: 'IA',
      },
      {
        title: 'Tableaux de bord',
        description: 'Suivre les indicateurs qualité et performance.',
        href: '/platform/analytics',
        icon: BarChart3,
      },
      {
        title: 'Intégrations industrielles',
        description: 'Connecter CIPA aux ERP, BI et MES.',
        href: '/platform/integrations',
        icon: Plug,
      },
    ],
  },

  {
    label: 'Solutions',
    featured: {
      title: 'Maîtriser la complexité opérationnelle',
      description:
        'Réduire les écarts et transformer les signaux terrain en décisions.',
      href: '/solutions',
    },
    items: [
      {
        title: 'Qualité & conformité',
        description: 'Contrôles, audits et traçabilité.',
        href: '/solutions/quality',
        icon: ShieldCheck,
      },
      {
        title: 'Production & dossier de lot',
        description: 'Structurer les opérations critiques.',
        href: '/solutions/production',
        icon: Factory,
      },
      {
        title: 'Maintenance & sécurité',
        description: 'Digitaliser les interventions terrain.',
        href: '/solutions/maintenance',
        icon: Activity,
      },
      {
        title: 'Non-conformités & CAPA',
        description: 'Déclarer et traiter les écarts.',
        href: '/solutions/capa',
        icon: ClipboardCheck,
      },
      {
        title: 'Audits & inspections',
        description: 'Piloter inspections et évaluations.',
        href: '/solutions/audits',
        icon: ListChecks,
      },
      {
        title: 'Amélioration continue',
        description: 'Transformer les problèmes en progrès.',
        href: '/solutions/improvement',
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

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [language, setLanguage] = useState('FR')
  const [languageOpen, setLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const activeGroup = navGroups.find((group) => group.label === activeMenu)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Désactiver le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  return (
    <div className={inter.className}>
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseLeave={() => setActiveMenu(null)}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* FULL WIDTH NAVBAR */}
        <div
          className={`
            relative
            w-full
            border-b
            transition-all duration-500
            ${
              scrolled
                ? 'shadow-[0_18px_60px_rgba(15,23,42,0.10)]'
                : 'shadow-[0_10px_40px_rgba(15,23,42,0.05)]'
            }
          `}
          style={{
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            borderColor: 'rgba(255,255,255,0.55)',
          }}
        >
          {/* LIGHT OVERLAY */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  rgba(255,255,255,0.68),
                  rgba(255,255,255,0.32)
                )
              `,
            }}
          />

          {/* NAVBAR */}
          <nav className="relative z-10 mx-auto flex h-[82px] max-w-[1380px] items-center px-5 sm:px-7 lg:px-8">
            {/* LOGO */}
            <a href="/" className="flex shrink-0 items-center">
              <Image
                src="/logo.png"
                alt="Industry X.0"
                width={250}
                height={60}
                priority
                className="h-[56px] w-auto object-contain"
              />
            </a>

            {/* CENTER MENU */}
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <div className="flex items-center gap-7">
                {navGroups.map((group) => (
                  <button
                    key={group.label}
                    type="button"
                    onMouseEnter={() => setActiveMenu(group.label)}
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === group.label ? null : group.label
                      )
                    }
                    className="group flex items-center gap-[5px] text-[14px] font-medium tracking-[-0.01em] text-[#44403C] transition-all duration-200 hover:text-black"
                  >
                    <span className="relative">
                      {group.label}
                      <span
                        className={`absolute -bottom-[7px] left-0 h-[2px] bg-[#D4A017] transition-all duration-300 ${
                          activeMenu === group.label
                            ? 'w-full opacity-100'
                            : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                        }`}
                      />
                    </span>

                    <ChevronDown
                      size={14}
                      strokeWidth={2.2}
                      className={`transition-transform duration-300 ${
                        activeMenu === group.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden items-center gap-4 lg:flex">
              {/* CTA */}
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(17,24,39,0.12)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
              >
                Demander une démo
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-3 border-l border-[#E7E5E4] pl-5">
                {/* LANGUAGE SELECT */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setLanguageOpen(!languageOpen)}
                    className="group flex items-center gap-2.5 rounded-full border border-[#E7E5E4] bg-white/80 px-3.5 py-2 shadow-[0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-[#D4A017]/35 hover:bg-white"
                  >
                    <div className="relative h-4 w-4 overflow-hidden rounded-full">
                      <Image
                        src={
                          language === 'FR'
                            ? '/flags/france.png'
                            : '/flags/uk.png'
                        }
                        alt={language === 'FR' ? 'France' : 'United Kingdom'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[13px] font-semibold tracking-[-0.01em] text-[#44403C]">
                      {language}
                    </span>
                    <ChevronDown
                      size={14}
                      strokeWidth={2.3}
                      className={`text-[#A8A29E] transition-all duration-300 ${
                        languageOpen ? 'rotate-180 text-[#D4A017]' : ''
                      }`}
                    />
                  </button>

                  {/* DROPDOWN */}
                  <AnimatePresence>
                    {languageOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-[-62px] top-[120%] z-50 w-[160px] overflow-hidden rounded-2xl border border-[#ECE7DD] bg-white/95 shadow-[0_20px_45px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage('FR')
                            setLanguageOpen(false)
                          }}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-[#F8F8F7] ${
                            language === 'FR' ? 'bg-[#FAF7EF]' : ''
                          }`}
                        >
                          <div className="relative h-5 w-5 overflow-hidden rounded-full">
                            <Image
                              src="/flags/france.png"
                              alt="France"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-[#44403C]">
                            FR
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage('EN')
                            setLanguageOpen(false)
                          }}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-[#F8F8F7] ${
                            language === 'EN' ? 'bg-[#FAF7EF]' : ''
                          }`}
                        >
                          <div className="relative h-5 w-5 overflow-hidden rounded-full">
                            <Image
                              src="/flags/uk.png"
                              alt="United Kingdom"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-[#44403C]">
                            EN
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* LINKEDIN */}
                <a
                  href="https://tn.linkedin.com/company/industryx0"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/[0.04]"
                >
                  <Image
                    src="/linkedin.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="opacity-70 transition-all duration-300 group-hover:opacity-100"
                  />
                </a>
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] text-black transition hover:bg-black/[0.07] lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>

          {/* MEGA MENU */}
          <AnimatePresence>
            {activeGroup && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="relative border-t border-[#ECE7DD]/80 bg-white/92 backdrop-blur-2xl"
              >
                <div className="mx-auto max-w-[1380px] px-8 py-7">
                  <div
                    className={`grid gap-6 ${
                      activeGroup.compact
                        ? 'grid-cols-1'
                        : 'grid-cols-[1fr_340px]'
                    }`}
                  >
                    {/* MENU ITEMS */}
                    <div className="grid grid-cols-2 gap-2">
                      {activeGroup.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <a
                            key={item.title}
                            href={item.href}
                            className="group flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-[#F8F8F7]"
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F4] text-black/70 transition-all duration-300 group-hover:bg-[#FEF3C7] group-hover:text-[#B6842B]">
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-[14px] font-semibold text-[#111827]">
                                  {item.title}
                                </p>
                                {item.badge && (
                                  <span className="rounded-full bg-[#F4E7BC] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#946200]">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-[12.5px] leading-relaxed text-[#57534E]">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        )
                      })}
                    </div>

                    {/* FEATURED CARD */}
                    {activeGroup.featured && (
                      <div className="relative overflow-hidden rounded-[28px] bg-[#111827] p-6 text-white">
                        <div
                          className="absolute right-0 top-0 h-44 w-44 rounded-full"
                          style={{
                            background: 'rgba(212,160,23,.15)',
                            filter: 'blur(60px)',
                            transform: 'translate(30%,-30%)',
                          }}
                        />
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#E7C87E]">
                            <Bot size={12} />
                            CIPA Intelligence
                          </div>
                          <h3 className="mt-5 text-[1.45rem] font-black leading-tight tracking-[-0.04em]">
                            {activeGroup.featured.title}
                          </h3>
                          <p className="mt-4 text-[13px] leading-relaxed text-white/65">
                            {activeGroup.featured.description}
                          </p>
                          <a
                            href={activeGroup.featured.href}
                            className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#E7C87E]"
                          >
                            Explorer
                            <ChevronRight size={15} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* MOBILE MENU CORRIGÉ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            /* Ajout de bottom-0 et overflow-y-auto pour rendre le menu scrollable */
            className="fixed inset-x-0 bottom-0 top-[82px] z-40 flex flex-col overflow-y-auto border-t border-white/50 bg-white/95 pb-24 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-8 px-6 py-7">
              
              {/* LIENS DE NAVIGATION MOBILES (AJOUTÉS) */}
              <div className="flex flex-col gap-8">
                {navGroups.map((group) => (
                  <div key={group.label} className="flex flex-col gap-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#78716C]">
                      {group.label}
                    </h4>
                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileOpen(false)} // Ferme le menu au clic
                            className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-[#F5F5F4]"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F4] text-black/70">
                              <Icon size={18} />
                            </div>
                            <span className="text-[14px] font-semibold text-[#111827]">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="ml-auto rounded-full bg-[#F4E7BC] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#946200]">
                                {item.badge}
                              </span>
                            )}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* LIGNE DE SÉPARATION */}
              <div className="h-px w-full bg-[#ECE7DD]" />

              {/* BOUTON D'APPEL À L'ACTION MOBILE (AJOUTÉ) */}
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 py-3.5 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-black"
              >
                Demander une démo
                <ArrowRight size={16} />
              </a>

              {/* SECTION LANGUE & LINKEDIN */}
              <div className="grid grid-cols-[1fr_auto] gap-4">
                {/* MOBILE LANGUAGE */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
                      <div className="relative h-5 w-5 overflow-hidden rounded-full border border-black/5">
                        <Image
                          src={
                            language === 'FR'
                              ? '/flags/france.png'
                              : '/flags/uk.png'
                          }
                          alt={language === 'FR' ? 'France' : 'England'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[#ECE7DD] bg-[#FAFAF9] py-3 pl-12 pr-10 text-sm font-medium text-[#44403C] outline-none"
                    >
                      <option value="FR">Français</option>
                      <option value="EN">English</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E]"
                    />
                  </div>
                </div>

                {/* MOBILE LINKEDIN */}
                <a
                  href="https://tn.linkedin.com/company/industryx0"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full w-[52px] items-center justify-center rounded-xl border border-[#ECE7DD] bg-[#FAFAF9]"
                >
                  <Image
                    src="/linkedin.png"
                    alt="LinkedIn"
                    width={18}
                    height={18}
                    className="opacity-80"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT BUTTON */}
      <a
        href="#chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#111827] text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition-all duration-300 hover:scale-105"
      >
        <MessageCircle size={20} />
      </a>
    </div>
  )
}