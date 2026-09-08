'use client'

/*
 * ─────────────────────────────────────────────────────────────────────────
 *  NAVBAR BETA — version provisoire, coexiste avec components/layout/Navbar
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Navigation reduite a quatre entrees : le logo (retour accueil), la rubrique
 * Industries — le meme menu deroulant que la navbar actuelle, lu dans la meme
 * source NAV_GROUPS —, puis deux liens simples, Cas clients et Contact. Le
 * bloc de droite est conserve tel quel : « Demander une demo », le selecteur
 * de langue et LinkedIn.
 *
 * Ce fichier ne remplace rien : `Navbar` reste intact et reste la navigation
 * du site tant que personne ne monte celle-ci a sa place.
 *
 * Le bouton de chat flottant et son widget vivent dans la navbar actuelle et
 * non dans une couche a part : ils sont repris ici, faute de quoi substituer
 * cette version ferait disparaitre le chat de toutes les pages.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import {
  ArrowRight,
  ChevronDown,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react'

import Image from 'next/image'
import { LINKEDIN_URL } from '@/lib/data/socials'
import ChatWidget from '@/components/layout/ChatWidget'
import { NAV_GROUPS, type NavGroup } from '@/content/shared'

/* La rubrique Industries n'est pas redecrite ici : elle est lue dans la source
   unique de la navigation, pour que les deux navbars ne divergent jamais.
   Le detour par une fonction n'est pas decoratif : il fait echouer bruyamment
   un renommage du groupe dans content/shared.ts, la ou un `?.` laisserait
   simplement un menu vide en ligne. */
function industriesGroup(): NavGroup {
  const group = NAV_GROUPS.find((candidate) => candidate.label === 'Industries')
  if (!group) {
    throw new Error(
      'NavbarBeta : aucun groupe « Industries » dans NAV_GROUPS. ' +
        'Verifiez content/shared.ts.',
    )
  }
  return group
}

const INDUSTRIES = industriesGroup()

/* Les liens sans menu deroulant. Accueil est isole des deux autres parce
   qu'il se place avant le declencheur Industries dans la barre. */
const HOME = { label: 'Accueil', href: '/' }

const LINKS = [
  { label: 'Cas clients', href: '/customers' },
  { label: 'Contact', href: '/contact' },
]

/* Lien de la barre : meme soulignement dore que le declencheur Industries. */
function NavLink({
  link,
  onMouseEnter,
}: {
  link: { label: string; href: string }
  onMouseEnter: () => void
}) {
  return (
    <a
      href={link.href}
      onMouseEnter={onMouseEnter}
      className="group text-[14px] font-medium tracking-[-0.01em] text-stone-700 transition-all duration-200 hover:text-black"
    >
      <span className="relative">
        {link.label}
        <span className="absolute -bottom-[7px] left-0 h-[2px] w-0 bg-gold opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
      </span>
    </a>
  )
}

export default function NavbarBeta() {
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [language, setLanguage] = useState('FR')
  const [languageOpen, setLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  /*
   * Meme motif « disclosure navigation » que la navbar actuelle, reduit a un
   * seul declencheur : `aria-expanded` annonce l'etat, Fleche bas ouvre et
   * entre dans le panneau, les fleches parcourent les liens en boucle, Echap
   * referme et rend le focus au declencheur, et le focus sortant de l'en-tete
   * referme aussi — sans quoi un panneau reste deroule derriere soi.
   */
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const enterPanelOnOpen = useRef(false)

  const panelLinks = useCallback(
    () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [],
      ),
    [],
  )

  const focusPanelLink = useCallback(
    (index: number) => {
      const links = panelLinks()
      if (links.length === 0) return
      links[(index + links.length) % links.length].focus()
    },
    [panelLinks],
  )

  // Le panneau n'est monte qu'au rendu suivant : on ne peut pas lui donner le
  // focus dans le gestionnaire de touche, seulement une fois l'etat pose.
  useEffect(() => {
    if (industriesOpen && enterPanelOnOpen.current) {
      enterPanelOnOpen.current = false
      focusPanelLink(0)
    }
  }, [industriesOpen, focusPanelLink])

  // Echap ferme, d'ou qu'on vienne — y compris depuis un lien du panneau, que
  // le gestionnaire pose sur le declencheur ne verrait jamais.
  useEffect(() => {
    if (!industriesOpen && !languageOpen && !mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (languageOpen) setLanguageOpen(false)
      if (mobileOpen) setMobileOpen(false)
      if (industriesOpen) {
        triggerRef.current?.focus()
        setIndustriesOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [industriesOpen, languageOpen, mobileOpen])

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown') return
    event.preventDefault()
    if (industriesOpen) {
      focusPanelLink(0)
      return
    }
    enterPanelOnOpen.current = true
    setIndustriesOpen(true)
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

    window.addEventListener('scroll', onScroll, { passive: true })
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
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onMouseLeave={() => setIndustriesOpen(false)}
        /* Pendant du onMouseLeave, pour le clavier : on referme des que le
           focus sort de l'en-tete. */
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIndustriesOpen(false)
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
            {/* LOGO — retour accueil */}
            <a
              href="/"
              aria-label="Industry X.0 — retour à l’accueil"
              className="flex shrink-0 items-center"
            >
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
                {/* ACCUEIL */}
                <NavLink
                  link={HOME}
                  onMouseEnter={() => setIndustriesOpen(false)}
                />

                {/* INDUSTRIES — menu deroulant */}
                <button
                  type="button"
                  id="nav-beta-trigger-industries"
                  ref={triggerRef}
                  aria-haspopup="true"
                  aria-expanded={industriesOpen}
                  /* Conditionnel : `aria-controls` doit designer un element
                     present dans le document, et le panneau n'existe pas
                     tant qu'il est ferme. */
                  aria-controls={industriesOpen ? 'nav-beta-menu' : undefined}
                  onMouseEnter={() => setIndustriesOpen(true)}
                  onKeyDown={onTriggerKeyDown}
                  onClick={() => setIndustriesOpen((open) => !open)}
                  className="group flex items-center gap-[5px] text-[14px] font-medium tracking-[-0.01em] text-stone-700 transition-all duration-200 hover:text-black"
                >
                  <span className="relative">
                    {INDUSTRIES.label}
                    <span
                      className={`absolute -bottom-[7px] left-0 h-[2px] bg-gold transition-all duration-300 ${
                        industriesOpen
                          ? 'w-full opacity-100'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`}
                    />
                  </span>

                  <ChevronDown
                    size={14}
                    strokeWidth={2.2}
                    className={`transition-transform duration-300 ${
                      industriesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* LIENS SIMPLES */}
                {LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    link={link}
                    onMouseEnter={() => setIndustriesOpen(false)}
                  />
                ))}
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

          {/* MENU INDUSTRIES */}
          <AnimatePresence>
            {industriesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                id="nav-beta-menu"
                ref={panelRef}
                aria-labelledby="nav-beta-trigger-industries"
                onKeyDown={onPanelKeyDown}
                className="relative border-t border-cream-border/80 bg-white"
              >
                <div className="mx-auto max-w-[1380px] px-8 py-7">
                  <div className="grid grid-cols-2 gap-2">
                    {INDUSTRIES.items.map((item) => {
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
            id="nav-beta-mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[82px] z-40 flex flex-col overflow-y-auto border-t border-white/50 bg-white pb-24 lg:hidden"
          >
            <div className="flex flex-col gap-8 px-6 py-7">
              {/* ACCUEIL */}
              <a
                href={HOME.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl p-2 text-[14px] font-semibold text-gray-900 transition hover:bg-stone-100"
              >
                {HOME.label}
              </a>

              {/* INDUSTRIES */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">
                  {INDUSTRIES.label}
                </h4>
                <div className="flex flex-col gap-1">
                  {INDUSTRIES.items.map((item) => {
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

              {/* LIENS SIMPLES */}
              <div className="flex flex-col gap-1">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl p-2 text-[14px] font-semibold text-gray-900 transition hover:bg-stone-100"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* LIGNE DE SÉPARATION */}
              <div className="h-px w-full bg-cream-border" />

              {/* CTA */}
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
                          alt={language === 'FR' ? 'France' : 'England'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
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
