'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import {
  ArrowRight,
  Car,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Factory,
  Menu,
  MessageCircle,
  ShieldCheck,
  Utensils,
  X,
  Zap,
} from 'lucide-react'

import { LINKEDIN_URL } from '@/lib/data/socials'
import ChatWidget from '@/components/layout/ChatWidget'

/* ============================================================
   MODÈLE DE NAVIGATION

   La barre tient en cinq entrées : quatre liens directs et une seule qui
   déroule un panneau, Industries. Les deux formes vivent dans le même
   tableau ordonné, NAV_ENTRIES, pour que l'ordre affiché se lise d'un
   coup d'œil ; le contenu du panneau, lui, est lu dans NAV_GROUPS,
   retrouvé par le libellé de l'entrée.
   ============================================================ */

type NavItem = {
  title: string
  description: string
  href: string
  icon: any
  badge?: string
}

type NavGroup = {
  label: string
  featured?: {
    title: string
    description: string
    href: string
    cta: string
  }
  items: NavItem[]
}

/** Entrée sans `href` : elle ouvre le groupe NAV_GROUPS de même libellé. */
type NavEntry = {
  label: string
  href?: string
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Industries',
    featured: {
      title: 'Six secteurs, une même exigence de terrain',
      description:
        'Contrôles, écarts, plans d’action : CIPA reprend le vocabulaire et les contraintes réglementaires de chaque industrie.',
      href: '/customers',
      cta: 'Voir les cas clients',
    },
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
]

const NAV_ENTRIES: NavEntry[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Industries' },
  { label: 'Cas clients', href: '/customers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Entreprise', href: '/entreprise' },
]

export default function NavbarBeta() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [language, setLanguage] = useState('FR')
  const [languageOpen, setLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const activeGroup = NAV_GROUPS.find((group) => group.label === activeMenu)

  /*
   * ─────────────────────────────────────────────────────────────────────
   *  NAVIGATION AU CLAVIER DU MEGA MENU
   * ─────────────────────────────────────────────────────────────────────
   *
   * Motif « disclosure navigation » du WAI-ARIA, repris tel quel de la
   * Navbar historique : le declencheur reste un <button> ordinaire, donc
   * Entree et Espace l'activent nativement — inutile d'ecrire quoi que ce
   * soit pour eux. On n'ajoute que ce que le navigateur ne sait pas
   * deviner :
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
            transition-all duration-500
            ${
              scrolled
                ? 'shadow-[0_18px_60px_rgba(15,23,42,0.10)]'
                : 'shadow-[0_10px_40px_rgba(15,23,42,0.05)]'
            }
          `}
          style={{
            background: '#ffffff',
            borderColor: 'rgba(15,23,42,0.06)',
          }}
        >

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
              <div className="flex items-center gap-8">
                {NAV_ENTRIES.map((entry, index) => {
                  const isOpen = activeMenu === entry.label

                  /* Lien direct : Accueil, Cas clients, Contact. Le survol
                     referme le panneau reste ouvert a cote. */
                  if (entry.href) {
                    return (
                      <a
                        key={entry.label}
                        href={entry.href}
                        onMouseEnter={() => setActiveMenu(null)}
                        className="group text-[14px] font-medium tracking-[-0.01em] text-stone-700 transition-all duration-200 hover:text-black"
                      >
                        <span className="relative">
                          {entry.label}
                          <span className="absolute -bottom-[7px] left-0 h-[2px] w-0 bg-gold opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                        </span>
                      </a>
                    )
                  }

                  /* Entree a panneau : Industries. */
                  return (
                    <button
                      key={entry.label}
                      type="button"
                      id={`nav-beta-trigger-${index}`}
                      ref={(node) => {
                        triggerRefs.current[entry.label] = node
                      }}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      /* Conditionnel : `aria-controls` doit designer un element
                         present dans le document, et le panneau n'existe pas
                         tant qu'il est ferme. */
                      aria-controls={isOpen ? 'nav-beta-mega-menu' : undefined}
                      onMouseEnter={() => setActiveMenu(entry.label)}
                      onKeyDown={(event) => onTriggerKeyDown(event, entry.label)}
                      onClick={() => setActiveMenu(isOpen ? null : entry.label)}
                      className="group flex items-center gap-[5px] text-[14px] font-medium tracking-[-0.01em] text-stone-700 transition-all duration-200 hover:text-black"
                    >
                      <span className="relative">
                        {entry.label}
                        <span
                          className={`absolute -bottom-[7px] left-0 h-[2px] bg-gold transition-all duration-300 ${
                            isOpen
                              ? 'w-full opacity-100'
                              : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                          }`}
                        />
                      </span>

                      <ChevronDown
                        size={14}
                        strokeWidth={2.2}
                        className={`transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden items-center gap-4 lg:flex">
              {/* CTA */}
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(17,24,39,0.12)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-black"
              >
                Demander une démo
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-3 border-l border-stone-200 pl-5">
                {/* LANGUAGE SELECT */}
                <div className="relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={languageOpen}
                    aria-controls={
                      languageOpen ? 'nav-beta-language-menu' : undefined
                    }
                    aria-label={`Langue : ${language}`}
                    onClick={() => setLanguageOpen(!languageOpen)}
                    className="group flex items-center gap-2.5 rounded-full border border-stone-200 bg-white px-3.5 py-2 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-gold/35 hover:bg-white"
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
                    <span className="text-[13px] font-semibold tracking-[-0.01em] text-stone-700">
                      {language}
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
                        id="nav-beta-language-menu"
                        className="absolute right-[-62px] top-[120%] z-50 w-[160px] overflow-hidden rounded-2xl border border-cream-border bg-white shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage('FR')
                            setLanguageOpen(false)
                          }}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-stone-100 ${
                            language === 'FR' ? 'bg-stone-50' : ''
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
                          <span className="text-sm font-medium text-stone-700">
                            FR
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage('EN')
                            setLanguageOpen(false)
                          }}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-stone-100 ${
                            language === 'EN' ? 'bg-stone-50' : ''
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
                          <span className="text-sm font-medium text-stone-700">
                            EN
                          </span>
                        </button>
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
              aria-controls={mobileOpen ? 'nav-beta-mobile-menu' : undefined}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
                id="nav-beta-mega-menu"
                ref={panelRef}
                aria-labelledby={`nav-beta-trigger-${NAV_ENTRIES.findIndex(
                  (entry) => entry.label === activeGroup.label
                )}`}
                onKeyDown={onPanelKeyDown}
                className="relative border-t border-cream-border/80 bg-white"
              >
                <div className="mx-auto max-w-[1380px] px-8 py-7">
                  <div
                    className={`grid gap-6 ${
                      activeGroup.featured
                        ? 'grid-cols-[1fr_340px]'
                        : 'grid-cols-1'
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
                          </a>
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
                            <Factory size={12} />
                            {activeGroup.label}
                          </div>
                          <h3 className="mt-5 text-[1.45rem] font-black leading-tight tracking-[-0.04em]">
                            {activeGroup.featured.title}
                          </h3>
                          <p className="mt-4 text-[13px] leading-relaxed text-white/65">
                            {activeGroup.featured.description}
                          </p>
                          <a
                            href={activeGroup.featured.href}
                            className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-gold-300"
                          >
                            {activeGroup.featured.cta}
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            /* bottom-0 + overflow-y-auto : le menu reste defilable quand les
               six secteurs depassent la hauteur de l'ecran. */
            id="nav-beta-mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[82px] z-40 flex flex-col overflow-y-auto border-t border-white/50 bg-white pb-24 lg:hidden"
          >
            <div className="flex flex-col gap-8 px-6 py-7">

              {/* LIENS DIRECTS */}
              <div className="flex flex-col gap-1">
                {NAV_ENTRIES.filter((entry) => entry.href).map((entry) => (
                  <a
                    key={entry.label}
                    href={entry.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-2 py-3 text-[15px] font-semibold text-gray-900 transition hover:bg-stone-100"
                  >
                    {entry.label}
                  </a>
                ))}
              </div>

              {/* GROUPES DEROULANTS, MIS A PLAT */}
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="flex flex-col gap-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">
                    {group.label}
                  </h4>
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
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
                        </a>
                      )
                    })}
                  </div>
                </div>
              ))}

              {/* LIGNE DE SÉPARATION */}
              <div className="h-px w-full bg-cream-border" />

              {/* CTA MOBILE */}
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-black"
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
                          alt={language === 'FR' ? 'France' : 'United Kingdom'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      aria-label={`Langue : ${language}`}
                      className="w-full appearance-none rounded-xl border border-cream-border bg-stone-50 py-3 pl-12 pr-10 text-sm font-medium text-stone-700 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
                    >
                      <option value="FR">Français</option>
                      <option value="EN">English</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-subtle"
                    />
                  </div>
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
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-dark text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition-all duration-300 hover:scale-105 hover:border-gold/50"
        aria-label="Ouvrir le chat"
      >
        {isChatOpen ? (
          <X size={20} className="text-gold" />
        ) : (
          <MessageCircle size={20} />
        )}
      </button>

      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        language={language}
      />
    </div>
  )
}
