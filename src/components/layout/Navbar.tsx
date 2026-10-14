'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import {
  ArrowRight,
  Bot,
  Building2,
  Car,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Factory,
  FileText,
  Handshake,
  HelpCircle,
  Home,
  Mail,
  Menu,
  MessageCircle,
  ScanSearch,
  ShieldCheck,
  Users,
  Utensils,
  X,
  Zap,
} from 'lucide-react'

import Image from 'next/image'
import { LINKEDIN_URL } from '@/lib/data/socials'
import ChatWidget from '@/components/layout/ChatWidget'
import { platformHref, platformPages } from '@/lib/data/platform'
import { ENTIWIN_PATH } from '@/lib/data/entiwin'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useCurrentLocale, type Locale } from '@/lib/i18n'
import { track } from '@/lib/analytics/posthog'

type NavItem = {
  title: string
  description: string
  href: string
  icon: any
  badge?: string
}

type NavGroup = {
  /** Identifiant stable : c'est lui qui repere le menu ouvert, pas le libelle traduit. */
  id: string
  label: string
  compact?: boolean
  featured?: {
    title: string
    description: string
    href: string
  }
  items: NavItem[]
}

const COPY = {
  fr: {
    home: 'Accueil',
    cta: 'Demander une démo',
    explore: 'Explorer',
    language: 'Langue',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    openChat: 'Ouvrir le chat',
    closeChat: 'Fermer le chat',
    platform: 'Plateforme',
    entiwin: ['Enti Win', 'Évaluation qualité pharmaceutique assistée par IA', 'Nouveau'],
    featured:
      'CIPA capte la donnée terrain, orchestre les processus critiques et active l’IA pour améliorer les opérations industrielles.',
    industries: 'Industries',
    industryItems: [
      ['Pharmaceutique', 'GMP, traçabilité, déviations, CAPA, audits et dossier de lot électronique.'],
      ['Agroalimentaire & boissons', 'Contrôles qualité, sécurité alimentaire, inspections, conformité et traçabilité terrain.'],
      ['Cosmétique & dispositifs médicaux', 'Standardisation qualité, conformité, inspections et maîtrise documentaire opérationnelle.'],
      ['Automobile & composants', 'Performance usine, maîtrise process, audits terrain et plans d’action.'],
      ['Électronique & câblage', 'Contrôles process, standards terrain, traçabilité et réduction des écarts.'],
      ['Packaging & plasturgie', 'Qualité terrain, suivi production, contrôles, incidents et amélioration continue.'],
    ],
    resources: 'Ressources',
    resourceItems: [
      ['Cas clients', 'Voir comment les industriels utilisent CIPA.'],
      ['Guides & insights', 'Analyses et excellence opérationnelle.'],
      ['FAQ', 'Questions fréquentes sur la plateforme.'],
    ],
    company: 'Société',
    companyItems: [
      ['Entreprise', 'Présenter notre vision, notre trajectoire et notre ambition industrielle.'],
      ['Partenaires', 'Valoriser notre écosystème industriel, technologique et institutionnel.'],
      ['Contact', 'Créer un accès direct à notre équipe.'],
    ],
  },
  en: {
    home: 'Home',
    cta: 'Book a demo',
    explore: 'Explore',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    openChat: 'Open chat',
    closeChat: 'Close chat',
    platform: 'Platform',
    entiwin: ['Enti Win', 'AI-assisted pharmaceutical quality assessment', 'New'],
    featured:
      'CIPA captures shop-floor data, orchestrates critical processes and puts AI to work to improve industrial operations.',
    industries: 'Industries',
    industryItems: [
      ['Pharmaceuticals', 'GMP, traceability, deviations, CAPA, audits and electronic batch records.'],
      ['Food & beverage', 'Quality checks, food safety, inspections, compliance and shop-floor traceability.'],
      ['Cosmetics & medical devices', 'Quality standardization, compliance, inspections and operational document control.'],
      ['Automotive & components', 'Plant performance, process control, shop-floor audits and action plans.'],
      ['Electronics & wiring', 'Process checks, shop-floor standards, traceability and fewer deviations.'],
      ['Packaging & plastics', 'Shop-floor quality, production tracking, checks, incidents and continuous improvement.'],
    ],
    resources: 'Resources',
    resourceItems: [
      ['Customer stories', 'See how manufacturers use CIPA.'],
      ['Guides & insights', 'Analysis and operational excellence.'],
      ['FAQ', 'Frequently asked questions about the platform.'],
    ],
    company: 'Company',
    companyItems: [
      ['About us', 'Our vision, our journey and our industrial ambition.'],
      ['Partners', 'Our industrial, technology and institutional ecosystem.'],
      ['Contact', 'A direct line to our team.'],
    ],
  },
}

const INDUSTRY_LINKS = [
  { href: '/industries/pharma', icon: ShieldCheck },
  { href: '/industries/food', icon: Utensils },
  { href: '/industries/cosmetics', icon: ClipboardCheck },
  { href: '/industries/automotive', icon: Car },
  { href: '/industries/electronics', icon: Zap },
  { href: '/industries/packaging', icon: Factory },
]
const RESOURCE_LINKS = [
  { href: '/customers', icon: Users },
  { href: '/resources', icon: FileText },
  { href: '/faq', icon: HelpCircle },
]
const COMPANY_LINKS = [
  { href: '/entreprise', icon: Building2 },
  { href: '/partners', icon: Handshake },
  { href: '/contact', icon: Mail },
]

const withText = (links: { href: string; icon: any }[], text: string[][]): NavItem[] =>
  links.map((link, i) => ({ ...link, title: text[i][0], description: text[i][1] }))

function buildNavGroups(locale: Locale): NavGroup[] {
  const t = COPY[locale]
  return [
    {
      id: 'platform',
      label: t.platform,
      featured: {
        title: 'CIPA — Industrial Intelligence Platform',
        description: t.featured,
        href: '/#solutions',
      },
      // Une entree par pilier, generee depuis lib/data/platform.ts : le menu
      // et les trois pages ne peuvent pas diverger.
      items: [
        ...platformPages(locale).map((page) => ({
          title: page.menuTitle,
          description: page.menuDescription,
          href: platformHref(page.slug),
          icon: page.icon,
        })),
        // Nouveau produit : page de présentation, badge « Nouveau » / « New ».
        { title: t.entiwin[0], description: t.entiwin[1], badge: t.entiwin[2], href: ENTIWIN_PATH, icon: ScanSearch },
      ],
    },
    { id: 'industries', label: t.industries, compact: true, items: withText(INDUSTRY_LINKS, t.industryItems) },
    { id: 'resources', label: t.resources, compact: true, items: withText(RESOURCE_LINKS, t.resourceItems) },
    { id: 'company', label: t.company, compact: true, items: withText(COMPANY_LINKS, t.companyItems) },
  ]
}

const LANGUAGES: { code: Locale; short: string; name: string; flag: string; flagAlt: string }[] = [
  { code: 'fr', short: 'FR', name: 'Français', flag: '/flags/france.png', flagAlt: 'France' },
  { code: 'en', short: 'EN', name: 'English', flag: '/flags/uk.png', flagAlt: 'United Kingdom' },
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const locale = useCurrentLocale()
  const t = COPY[locale]
  const navGroups = buildNavGroups(locale)
  const language = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]
  const activeGroup = navGroups.find((group) => group.id === activeMenu)

  /*
   * Changement de langue : meme page, autre langue. `usePathname` rend le
   * chemin sans prefixe (`/contact`), le routeur ajoute ou retire `/en`.
   * La requete et l'ancre suivent, pour ne pas perdre la section ouverte.
   */
  const router = useRouter()
  const pathname = usePathname()
  const switchLanguage = (target: Locale) => {
    setLanguageOpen(false)
    setMobileOpen(false)
    if (target === locale) return
    track('language_switched', { from: locale, to: target })
    const { search, hash } = window.location
    router.replace(`${pathname}${search}${hash}`, { locale: target })
  }

  /*
   * ─────────────────────────────────────────────────────────────────────
   *  NAVIGATION AU CLAVIER DU MEGA MENU
   * ─────────────────────────────────────────────────────────────────────
   *
   * Le menu n'existait qu'a la souris : `onMouseEnter` l'ouvrait,
   * `onMouseLeave` sur l'en-tete le fermait. Au clavier, la tabulation
   * traversait cinq boutons qui, une fois actionnes, deroulaient un panneau
   * dont le contenu n'etait joignable qu'en continuant a tabuler dans le
   * vide — et rien ne le refermait.
   *
   * On suit le motif « disclosure navigation » du WAI-ARIA, le plus sobre
   * des trois : le declencheur reste un <button> ordinaire, donc Entree et
   * Espace l'activent nativement — inutile d'ecrire quoi que ce soit pour
   * eux. On n'ajoute que ce que le navigateur ne sait pas deviner :
   *
   *   `aria-expanded`  l'etat ouvert / ferme, seul moyen pour la synthese
   *                    vocale de dire qu'il se passe quelque chose.
   *   Fleche bas       ouvre et entre dans le panneau.
   *   Fleches          parcourent les liens en boucle ; Origine / Fin vont
   *                    aux extremites.
   *   Echap            referme et rend le focus au declencheur, sans quoi
   *                    on repart de la premiere tabulation de la page.
   *   Focus sortant    referme, pour ne pas laisser un panneau ouvert
   *                    derriere soi.
   *
   * L'anneau de focus, lui, est deja global (:focus-visible, globals.css).
   */
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const panelRef = useRef<HTMLDivElement | null>(null)
  const enterPanelOnOpen = useRef(false)

  const panelLinks = useCallback(
    () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? []
      ),
    []
  )

  const focusPanelLink = useCallback(
    (index: number) => {
      const links = panelLinks()
      if (links.length === 0) return
      links[(index + links.length) % links.length].focus()
    },
    [panelLinks]
  )

  const closeMenu = useCallback((restoreFocusTo?: string | null) => {
    if (restoreFocusTo) triggerRefs.current[restoreFocusTo]?.focus()
    setActiveMenu(null)
  }, [])

  // Le panneau n'est monte qu'au rendu suivant : on ne peut pas lui donner le
  // focus dans le gestionnaire de touche, seulement une fois `activeMenu` pose.
  useEffect(() => {
    if (activeMenu && enterPanelOnOpen.current) {
      enterPanelOnOpen.current = false
      focusPanelLink(0)
    }
  }, [activeMenu, focusPanelLink])

  // Echap ferme, d'ou qu'on vienne — y compris depuis un lien du panneau, que
  // le gestionnaire pose sur le declencheur ne verrait jamais.
  useEffect(() => {
    if (!activeMenu && !languageOpen && !mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (languageOpen) setLanguageOpen(false)
      if (mobileOpen) setMobileOpen(false)
      if (activeMenu) closeMenu(activeMenu)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeMenu, languageOpen, mobileOpen, closeMenu])

  const onTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    label: string
  ) => {
    if (event.key !== 'ArrowDown') return
    event.preventDefault()
    if (activeMenu === label) {
      focusPanelLink(0)
      return
    }
    enterPanelOnOpen.current = true
    setActiveMenu(label)
  }

  const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const links = panelLinks()
    if (links.length === 0) return
    const current = links.indexOf(document.activeElement as HTMLAnchorElement)

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        focusPanelLink(current + 1)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        focusPanelLink(current - 1)
        break
      case 'Home':
        event.preventDefault()
        focusPanelLink(0)
        break
      case 'End':
        event.preventDefault()
        focusPanelLink(links.length - 1)
        break
      default:
        break
    }
  }

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
    <div className="font-inter">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseLeave={() => setActiveMenu(null)}
        /* Pendant du onMouseLeave, pour le clavier : on referme des que le
           focus sort de l'en-tete, sans quoi un panneau reste deroule
           derriere l'element qu'on vient d'atteindre. */
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setActiveMenu(null)
            setLanguageOpen(false)
          }
        }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* FULL WIDTH NAVBAR */}
        <div
          className={`
            relative
            w-full
            border-b
            bg-white
            transition-all duration-500
            ${
              scrolled
                ? 'shadow-[0_18px_60px_rgba(15,23,42,0.10)]'
                : 'shadow-[0_10px_40px_rgba(15,23,42,0.05)]'
            }
          `}
          style={{ borderColor: 'rgba(15,23,42,0.06)' }}
        >

          {/* NAVBAR */}
          <nav className="relative z-10 mx-auto flex h-[82px] max-w-[1380px] items-center px-5 sm:px-7 lg:px-8">
            {/* LOGO */}
            <Link href="/" className="mr-4 flex shrink-0 items-center xl:mr-0">
              <Image
                src="/logo.png"
                alt="Industry X.0"
                width={250}
                height={60}
                priority
                className="h-[48px] w-auto object-contain xl:h-[56px]"
              />
            </Link>

            {/* CENTER MENU */}
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <div className="flex items-center gap-4 xl:gap-7">
                <Link
                  href="/"
                  className="group text-[14px] font-medium tracking-[-0.01em] text-stone-700 transition-all duration-200 hover:text-black"
                >
                  <span className="relative">
                    {t.home}
                    <span className="absolute -bottom-[7px] left-0 h-[2px] w-0 bg-gold opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                  </span>
                </Link>

                {navGroups.map((group, index) => (
                  <button
                    key={group.id}
                    type="button"
                    id={`nav-trigger-${index}`}
                    ref={(node) => {
                      triggerRefs.current[group.id] = node
                    }}
                    aria-haspopup="true"
                    aria-expanded={activeMenu === group.id}
                    /* Conditionnel : `aria-controls` doit designer un element
                       present dans le document, et le panneau n'existe pas
                       tant qu'il est ferme. */
                    aria-controls={
                      activeMenu === group.id ? 'nav-mega-menu' : undefined
                    }
                    onMouseEnter={() => setActiveMenu(group.id)}
                    onKeyDown={(event) => onTriggerKeyDown(event, group.id)}
                    onClick={() =>
                      setActiveMenu(activeMenu === group.id ? null : group.id)
                    }
                    className="group flex items-center gap-[5px] text-[14px] font-medium tracking-[-0.01em] text-stone-700 transition-all duration-200 hover:text-black"
                  >
                    <span className="relative">
                      {group.label}
                      <span
                        className={`absolute -bottom-[7px] left-0 h-[2px] bg-gold transition-all duration-300 ${
                          activeMenu === group.id
                            ? 'w-full opacity-100'
                            : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                        }`}
                      />
                    </span>

                    <ChevronDown
                      size={14}
                      strokeWidth={2.2}
                      className={`transition-transform duration-300 ${
                        activeMenu === group.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden items-center gap-3 lg:flex xl:gap-4">
              {/* CTA */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gray-900 px-4 py-2.5 text-[13px] xl:px-5 font-semibold text-white shadow-[0_10px_30px_rgba(17,24,39,0.12)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
              >
                {t.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-2 border-l border-stone-200 pl-3 xl:gap-3 xl:pl-5">
                {/* LANGUAGE SELECT */}
                <div className="relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={languageOpen}
                    aria-controls={languageOpen ? 'nav-language-menu' : undefined}
                    aria-label={`${t.language} : ${language.name}`}
                    onClick={() => setLanguageOpen(!languageOpen)}
                    className="group flex items-center gap-2.5 rounded-full border border-stone-200 bg-white px-3.5 py-2 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-gold/35 hover:bg-white"
                  >
                    <div className="relative h-4 w-4 overflow-hidden rounded-full">
                      <Image src={language.flag} alt="" fill className="object-cover" />
                    </div>
                    <span className="text-[13px] font-semibold tracking-[-0.01em] text-stone-700">
                      {language.short}
                    </span>
                    <ChevronDown
                      size={14}
                      strokeWidth={2.3}
                      className={`text-subtle transition-all duration-300 ${
                        languageOpen ? 'rotate-180 text-gold' : ''
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
                        id="nav-language-menu"
                        className="absolute right-[-62px] top-[120%] z-50 w-[160px] overflow-hidden rounded-2xl border border-cream-border bg-white shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
                      >
                        {LANGUAGES.map((option) => (
                          <button
                            key={option.code}
                            type="button"
                            lang={option.code}
                            aria-current={option.code === locale ? 'true' : undefined}
                            onClick={() => switchLanguage(option.code)}
                            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-stone-100 ${
                              option.code === locale ? 'bg-stone-50' : ''
                            }`}
                          >
                            <div className="relative h-5 w-5 overflow-hidden rounded-full">
                              <Image src={option.flag} alt="" fill className="object-cover" />
                            </div>
                            <span className="text-sm font-medium text-stone-700">
                              {option.name}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* LINKEDIN */}
                <a
                  href={LINKEDIN_URL}
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
              aria-expanded={mobileOpen}
              aria-controls={mobileOpen ? 'nav-mobile-menu' : undefined}
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
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
                id="nav-mega-menu"
                ref={panelRef}
                aria-labelledby={`nav-trigger-${navGroups.indexOf(activeGroup)}`}
                onKeyDown={onPanelKeyDown}
                className="relative border-t border-cream-border/80 bg-white"
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
                    <div className="grid grid-cols-2 content-start gap-2">
                      {activeGroup.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="group flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-stone-100"
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-black/70 transition-all duration-300 group-hover:bg-amber-100 group-hover:text-gold-deep">
                              <Icon size={18} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-[14px] font-semibold text-gray-900">
                                  {item.title}
                                </p>
                                {item.badge && (
                                  <span className="rounded-full bg-gold-tint px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-gold-800">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-[12.5px] leading-relaxed text-stone-600">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>

                    {/* FEATURED CARD */}
                    {activeGroup.featured && (
                      <div className="relative overflow-hidden rounded-[28px] bg-gray-900 p-6 text-white">
                        <div
                          className="absolute right-0 top-0 h-44 w-44 rounded-full"
                          style={{
                            background: 'rgba(212,160,23,.15)',
                            filter: 'blur(60px)',
                            transform: 'translate(30%,-30%)',
                          }}
                        />
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300">
                            <Bot size={12} />
                            CIPA Intelligence
                          </div>
                          <h3 className="mt-5 text-[1.45rem] font-black leading-tight tracking-[-0.04em]">
                            {activeGroup.featured.title}
                          </h3>
                          <p className="mt-4 text-[13px] leading-relaxed text-white/65">
                            {activeGroup.featured.description}
                          </p>
                          <Link
                            href={activeGroup.featured.href}
                            onClick={() => setActiveMenu(null)}
                            className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-gold-300"
                          >
                            {t.explore}
                            <ChevronRight size={15} />
                          </Link>
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
            id="nav-mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[82px] z-40 flex flex-col overflow-y-auto border-t border-white/50 bg-white pb-24 lg:hidden"
          >
            <div className="flex flex-col gap-8 px-6 py-7">
              
              {/* LIENS DE NAVIGATION MOBILES (AJOUTÉS) */}
              <div className="flex flex-col gap-8">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-stone-100"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-black/70">
                    <Home size={18} />
                  </div>
                  <span className="text-[14px] font-semibold text-gray-900">
                    {t.home}
                  </span>
                </Link>

                {navGroups.map((group) => (
                  <div key={group.id} className="flex flex-col gap-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">
                      {group.label}
                    </h4>
                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)} // Ferme le menu au clic
                            className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-stone-100"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-black/70">
                              <Icon size={18} />
                            </div>
                            <span className="text-[14px] font-semibold text-gray-900">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="ml-auto rounded-full bg-gold-tint px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-gold-800">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* LIGNE DE SÉPARATION */}
              <div className="h-px w-full bg-cream-border" />

              {/* BOUTON D'APPEL À L'ACTION MOBILE (AJOUTÉ) */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-black"
              >
                {t.cta}
                <ArrowRight size={16} />
              </Link>

              {/* SECTION LANGUE & LINKEDIN */}
              <div className="grid grid-cols-[1fr_auto] gap-4">
                {/* MOBILE LANGUAGE — deux boutons plutot qu'une liste
                    deroulante : un seul geste, et la langue active se voit. */}
                <div role="group" aria-label={t.language} className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      lang={option.code}
                      aria-pressed={option.code === locale}
                      onClick={() => switchLanguage(option.code)}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${
                        option.code === locale
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-cream-border bg-stone-50 text-stone-700 hover:border-gold/40'
                      }`}
                    >
                      <span className="relative h-5 w-5 overflow-hidden rounded-full border border-black/5">
                        <Image src={option.flag} alt="" fill className="object-cover" />
                      </span>
                      {option.name}
                    </button>
                  ))}
                </div>

                {/* MOBILE LINKEDIN */}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full w-[52px] items-center justify-center rounded-xl border border-cream-border bg-stone-50"
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

      {/* CHAT BUTTON & WIDGET */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-dark border border-gold/20 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition-all duration-300 hover:scale-105 hover:border-gold/50"
        aria-label={isChatOpen ? t.closeChat : t.openChat}
      >
        {isChatOpen ? <X size={20} className="text-gold" /> : <MessageCircle size={20} />}
      </button>

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}