'use client'

/**
 * Centre d'aide /faq : recherche instantanée, filtre par thème, accordéon et
 * liens directs vers chaque question (/faq#id).
 *
 * Style repris de la FAQ de l'accueil (components/sections/FaqSection.tsx) :
 * carte blanche à filets, numéro doré et liseré à gauche sur la question
 * ouverte, panneau noir et or.
 *
 * Toutes les réponses sont dans le HTML serveur, ouvertes ou non : la
 * recherche et le filtre ne font que masquer, côté navigateur.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ExternalLink,
  LayoutDashboard,
  Link2,
  MessageCircle,
  ScanSearch,
  Search,
  X,
  type LucideIcon,
} from 'lucide-react'

import { SectionBadge } from '@/components/ui/SectionHeading'
import { Link, homeAnchorHref } from '@/i18n/navigation'
import { openChat } from '@/lib/chat/open'
import type { FaqItem, FaqLink, FaqTopic, FaqTopicId } from '@/lib/data/faq-center'
import { useCopy } from '@/lib/i18n'
import { ROUTES } from '@/lib/routes'

const TOPIC_ICONS: Record<FaqTopicId, LucideIcon> = {
  cipa: LayoutDashboard,
  entiwin: ScanSearch,
  industryx0: Building2,
}

const COPY = {
  fr: {
    badge: 'Centre d’aide',
    title: 'Toutes vos questions,',
    accent: 'une réponse claire.',
    lead: 'CIPA, Enti Win et Industry X.0 : cherchez un mot, filtrez par thème, partagez le lien d’une réponse.',
    searchLabel: 'Rechercher une question',
    placeholder: 'Rechercher : audit trail, hors ligne, BPF…',
    clear: 'Effacer la recherche',
    suggestions: 'Suggestions :',
    suggested: ['Démo', 'Hors ligne', 'Audit trail', 'BPF', 'Intégrations', 'Données'],
    topicsLabel: 'Thèmes',
    all: 'Toutes les questions',
    questions: (n: number) => `${n} question${n > 1 ? 's' : ''}`,
    results: (n: number, q: string) =>
      n === 0 ? `Aucun résultat pour « ${q} »` : `${n} résultat${n > 1 ? 's' : ''} pour « ${q} »`,
    copy: 'Copier le lien',
    copied: 'Lien copié',
    newTab: '(nouvel onglet)',
    emptyTitle: 'Aucune question ne correspond.',
    emptyText: 'Essayez un autre mot, ou posez directement votre question à notre assistant.',
    helpEyebrow: 'Besoin d’aide ?',
    helpTitle: 'Votre question n’est pas dans la liste ?',
    helpText: 'L’assistant répond tout de suite. Pour aller plus loin, un expert vous présente CIPA lors d’une démo.',
    ask: 'Poser ma question',
    demo: 'Demander une démo',
    shortcut: 'Appuyez sur / pour rechercher',
  },
  en: {
    badge: 'Help center',
    title: 'All your questions,',
    accent: 'clear answers.',
    lead: 'CIPA, Enti Win and Industry X.0: search for a word, filter by topic, share the link to an answer.',
    searchLabel: 'Search the questions',
    placeholder: 'Search: audit trail, offline, GMP…',
    clear: 'Clear the search',
    suggestions: 'Suggestions:',
    suggested: ['Demo', 'Offline', 'Audit trail', 'GMP', 'Integrations', 'Data'],
    topicsLabel: 'Topics',
    all: 'All questions',
    questions: (n: number) => `${n} question${n > 1 ? 's' : ''}`,
    results: (n: number, q: string) =>
      n === 0 ? `No results for “${q}”` : `${n} result${n > 1 ? 's' : ''} for “${q}”`,
    copy: 'Copy link',
    copied: 'Link copied',
    newTab: '(opens in a new tab)',
    emptyTitle: 'No question matches.',
    emptyText: 'Try another word, or ask our assistant directly.',
    helpEyebrow: 'Need help?',
    helpTitle: 'Is your question not on the list?',
    helpText: 'The assistant answers right away. To go further, an expert walks you through CIPA in a demo.',
    ask: 'Ask my question',
    demo: 'Book a demo',
    shortcut: 'Press / to search',
  },
}

/* ============================================================
   RECHERCHE — insensible à la casse et aux accents
   ============================================================ */

const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const termsOf = (query: string) =>
  fold(query)
    .split(/\s+/)
    .filter((term) => term.length >= 2)

function haystack(topic: FaqTopic, item: FaqItem) {
  return fold([topic.title, item.question, ...item.answer, ...(item.links ?? []).map((link) => link.label)].join(' '))
}

/** Surligne les termes trouvés, accents compris (« integrations » trouve « Intégrations »). */
function highlight(text: string, terms: string[]): ReactNode {
  if (!terms.length) return text
  const chars = Array.from(text)
  let folded = ''
  const origin: number[] = []
  chars.forEach((char, index) => {
    for (const part of fold(char)) {
      folded += part
      origin.push(index)
    }
  })
  const ranges: [number, number][] = []
  for (const term of terms) {
    for (let at = folded.indexOf(term); at !== -1; at = folded.indexOf(term, at + term.length)) {
      ranges.push([origin[at], origin[at + term.length - 1] + 1])
    }
  }
  if (!ranges.length) return text
  ranges.sort((a, b) => a[0] - b[0])
  const merged: [number, number][] = []
  for (const range of ranges) {
    const last = merged.at(-1)
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1])
    else merged.push([...range])
  }
  const nodes: ReactNode[] = []
  let cursor = 0
  merged.forEach(([start, end], i) => {
    if (start > cursor) nodes.push(chars.slice(cursor, start).join(''))
    nodes.push(
      <mark key={i} className="rounded-sm bg-gold/25 px-0.5 text-inherit">
        {chars.slice(start, end).join('')}
      </mark>,
    )
    cursor = end
  })
  if (cursor < chars.length) nodes.push(chars.slice(cursor).join(''))
  return nodes
}

/* ============================================================
   LIENS D'UNE RÉPONSE
   ============================================================ */

const CHIP =
  'inline-flex min-h-11 items-center gap-1.5 rounded-full border border-cream-border bg-white px-3.5 py-1.5 text-sm font-semibold text-gold-ink transition-colors hover:border-gold/40 hover:bg-gold-50 sm:min-h-9'

function AnswerLink({ link, newTab, tabIndex }: { link: FaqLink; newTab: string; tabIndex?: number }) {
  if (link.external) {
    const web = link.href.startsWith('http')
    return (
      <a
        href={link.href}
        {...(web ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(link.cta ? { 'data-cta': link.cta } : {})}
        tabIndex={tabIndex}
        className={CHIP}
      >
        {link.label}
        {web && (
          <>
            <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">{newTab}</span>
          </>
        )}
      </a>
    )
  }
  return (
    <Link href={homeAnchorHref(link.href)} tabIndex={tabIndex} className={CHIP}>
      {link.label}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  )
}

/* ============================================================
   QUESTION
   ============================================================ */

function Question({
  item,
  index,
  open,
  terms,
  onToggle,
}: {
  item: FaqItem
  index: number
  open: boolean
  terms: string[]
  onToggle: () => void
}) {
  const t = useCopy(COPY)
  const [copied, setCopied] = useState(false)
  const buttonId = `${item.id}-question`
  const panelId = `${item.id}-answer`

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${item.id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.hash = item.id
    }
  }

  return (
    <div
      id={item.id}
      className={`relative transition-colors duration-300 ${open ? 'bg-gold-50' : 'bg-white hover:bg-stone-50'}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-[3px] bg-gold transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <h3>
        <button
          type="button"
          id={buttonId}
          aria-controls={panelId}
          aria-expanded={open}
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/50 sm:gap-5 sm:px-7"
        >
          {/* Numéro décoratif : en pseudo-élément, hors du texte de la page
              (comme dans les carrousels), donc sans exigence de contraste. */}
          <span
            aria-hidden="true"
            data-num={String(index + 1).padStart(2, '0')}
            className={`shrink-0 font-display text-[14px] font-black tabular-nums tracking-[0.02em] transition-colors duration-300 before:content-[attr(data-num)] ${
              open ? 'text-gold' : 'text-stone-300'
            }`}
          />
          <span className="min-w-0 flex-1 text-pretty text-[15px] font-bold leading-snug tracking-[-0.015em] text-gray-900 sm:text-[16px]">
            {highlight(item.question, terms)}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              open ? 'rotate-180 bg-gold/15 text-gold-ink' : 'bg-stone-100 text-subtle'
            }`}
          >
            <ChevronDown size={16} aria-hidden="true" />
          </span>
        </button>
      </h3>

      {/* Repliée en CSS (grille 0fr → 1fr), comme sur l'accueil : la réponse
          reste dans le HTML et sort de l'arbre d'accessibilité. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pl-[50px] sm:px-7 sm:pl-[68px]">
            {item.answer.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-[1.75] text-muted">
                {highlight(paragraph, terms)}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {item.links?.map((link) => (
                <AnswerLink key={link.href} link={link} newTab={t.newTab} tabIndex={open ? undefined : -1} />
              ))}
              {/* `tabIndex` (ici et sur les liens) : hors du parcours clavier
                  tant que la réponse est repliée et masquée (aria-hidden). */}
              <button
                type="button"
                onClick={copyLink}
                tabIndex={open ? undefined : -1}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-subtle transition-colors hover:bg-white hover:text-gray-900 sm:min-h-9"
              >
                {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
                <span aria-live="polite">{copied ? t.copied : t.copy}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function FaqCenter({ topics }: { topics: FaqTopic[] }) {
  const t = useCopy(COPY)
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState<FaqTopicId | 'all'>('all')
  const first = topics[0]?.items[0]?.id
  const [open, setOpen] = useState(() => new Set<string>(first ? [first] : []))
  const searchRef = useRef<HTMLInputElement>(null)

  const terms = useMemo(() => termsOf(query), [query])
  const searching = terms.length > 0

  /* Questions retenues par la recherche, thème par thème. */
  const matches = useMemo(
    () =>
      topics.map((group) => ({
        ...group,
        items: terms.length
          ? group.items.filter((item) => {
              const text = haystack(group, item)
              return terms.every((term) => text.includes(term))
            })
          : group.items,
      })),
    [topics, terms],
  )
  const visible = matches.filter((group) => (topic === 'all' || group.id === topic) && group.items.length > 0)
  const total = matches.reduce((sum, group) => sum + group.items.length, 0)
  const shown = visible.reduce((sum, group) => sum + group.items.length, 0)

  /* Lien direct (/faq#id), à l'arrivée comme depuis la page : efface la
     recherche et le filtre, ouvre la question et l'amène à l'écran. */
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id || !topics.some((group) => group.items.some((item) => item.id === id))) return
      setQuery('')
      setTopic('all')
      setOpen(new Set([id]))
      // Deux images : le temps que la question réapparaisse et s'ouvre.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' })),
      )
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [topics])

  /* « / » place le curseur dans la recherche, sauf pendant une saisie. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.key !== '/' || target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggle = (id: string) => {
    const opening = !open.has(id)
    // Adresse partageable de la question ouverte, sans saut de page.
    if (opening) window.history.replaceState(null, '', `#${id}`)
    setOpen((current) => {
      const next = new Set(current)
      if (opening) next.add(id)
      else next.delete(id)
      return next
    })
  }

  return (
    <>
      {/* EN-TÊTE ET RECHERCHE */}
      <section className="relative overflow-hidden bg-gold-50/50 pb-12 pt-[calc(82px+3rem)] lg:pb-16 lg:pt-[calc(82px+4.5rem)]">
        <div className="pointer-events-none absolute -right-56 -top-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(218,162,80,0.10),transparent)]" />
        <div className="pointer-events-none absolute -left-64 top-1/3 h-[33rem] w-[33rem] rounded-full bg-[radial-gradient(closest-side,rgba(218,162,80,0.06),transparent)]" />

        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center px-5 text-center sm:px-7 lg:px-8">
          <SectionBadge label={t.badge} />
          <h1 className="mt-6 max-w-3xl font-display text-[32px] font-black leading-[1.08] tracking-[-0.04em] text-gray-900 sm:text-[44px] lg:text-[56px]">
            {t.title} <span className="text-gold-deep">{t.accent}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-stone-600 sm:text-[16px]">{t.lead}</p>

          <div role="search" className="mt-8 w-full max-w-2xl">
            <label htmlFor="faq-search" className="sr-only">
              {t.searchLabel}
            </label>
            <div className="relative">
              <Search size={20} aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-subtle" />
              <input
                ref={searchRef}
                id="faq-search"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  // Les résultats peuvent être dans un autre thème : on les
                  // montre tous, les compteurs du menu disent où ils sont.
                  setTopic('all')
                }}
                placeholder={t.placeholder}
                autoComplete="off"
                className="h-14 w-full rounded-full border border-cream-border bg-white pl-14 pr-14 text-[16px] text-gray-900 shadow-[0_18px_45px_rgba(15,23,42,0.07)] outline-none transition placeholder:text-placeholder focus:border-gold/50 focus:ring-4 focus:ring-gold/15 [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    searchRef.current?.focus()
                  }}
                  aria-label={t.clear}
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-subtle transition hover:bg-stone-100 hover:text-gray-900"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              ) : (
                <kbd
                  aria-hidden="true"
                  title={t.shortcut}
                  className="absolute right-5 top-1/2 hidden -translate-y-1/2 rounded-md border border-cream-border bg-stone-50 px-2 py-0.5 font-sans text-xs font-semibold text-subtle lg:block"
                >
                  /
                </kbd>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[13px] font-semibold text-subtle">{t.suggestions}</span>
              {t.suggested.map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => {
                    setQuery(word)
                    setTopic('all')
                  }}
                  aria-pressed={fold(query) === fold(word)}
                  className="min-h-11 rounded-full border border-cream-border bg-white/80 px-3.5 py-1 text-[13px] font-semibold text-stone-700 transition-colors hover:border-gold/40 hover:bg-white aria-pressed:border-gold/50 aria-pressed:bg-gold-50 aria-pressed:text-gold-ink sm:min-h-8"
                >
                  {word}
                </button>
              ))}
            </div>

            <p aria-live="polite" className="mt-5 text-sm font-medium text-stone-600">
              {searching ? t.results(shown, query.trim()) : t.questions(total)}
            </p>
          </div>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="bg-white py-12 lg:py-16">
        {/* `grid-cols-1` (minmax(0, 1fr)) : sans colonne explicite, la rangée
            de thèmes défilante élargissait la grille au-delà de l'écran. */}
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-5 sm:px-7 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:px-8">
          <aside className="min-w-0 lg:sticky lg:top-[106px] lg:self-start">
            <nav aria-label={t.topicsLabel}>
              <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:flex-col lg:overflow-visible">
                {[{ id: 'all' as const, title: t.all, count: total }, ...matches.map((group) => ({ id: group.id, title: group.title, count: group.items.length }))].map(
                  (entry) => {
                    const Icon = entry.id === 'all' ? Search : TOPIC_ICONS[entry.id]
                    const active = topic === entry.id
                    return (
                      <li key={entry.id} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setTopic(entry.id)}
                          aria-pressed={active}
                          className={`flex min-h-11 w-full items-center gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                            active
                              ? 'border-dark bg-dark text-white'
                              : 'border-cream-border bg-white text-stone-700 hover:border-gold/40 hover:bg-gold-50'
                          }`}
                        >
                          <Icon size={17} aria-hidden="true" className={active ? 'text-gold' : 'text-gold-ink'} />
                          <span className="flex-1 whitespace-nowrap">{entry.title}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${
                              active ? 'bg-white/15 text-white' : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {entry.count}
                          </span>
                        </button>
                      </li>
                    )
                  },
                )}
              </ul>
            </nav>

            <HelpCard className="mt-6 hidden lg:block" />
          </aside>

          <div className="min-w-0 space-y-12">
            {visible.length === 0 && (
              <div className="rounded-[28px] border border-cream-border bg-gold-50/60 px-6 py-12 text-center">
                <p className="font-display text-2xl font-black tracking-[-0.03em] text-gray-900">{t.emptyTitle}</p>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.7] text-stone-600">{t.emptyText}</p>
                <button
                  type="button"
                  onClick={() => openChat({ source: 'faq_page' })}
                  aria-haspopup="dialog"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-dark px-5 py-3 text-sm font-bold text-white transition hover:bg-black"
                >
                  {t.ask}
                  <MessageCircle size={15} aria-hidden="true" />
                </button>
              </div>
            )}

            {visible.map((group) => {
              const Icon = TOPIC_ICONS[group.id]
              return (
                <section key={group.id} aria-labelledby={`topic-${group.id}`}>
                  <div className="mb-5 flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-dark text-gold">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h2 id={`topic-${group.id}`} className="font-display text-[26px] font-black leading-tight tracking-[-0.03em] text-gray-900">
                        {group.title}
                      </h2>
                      <p className="mt-1 text-[15px] text-stone-600">{group.description}</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[28px] border border-cream-border bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
                    <div className="divide-y divide-cream-border">
                      {group.items.map((item, index) => (
                        <Question
                          key={item.id}
                          item={item}
                          index={index}
                          // Pendant une recherche, les résultats s'ouvrent : la
                          // liste est courte et la réponse est ce qu'on cherche.
                          open={searching || open.has(item.id)}
                          terms={terms}
                          onToggle={() => toggle(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              )
            })}

            <HelpCard className="lg:hidden" />
          </div>
        </div>
      </section>
    </>
  )
}

/** Panneau noir et or : l'assistant, puis la démo. */
function HelpCard({ className = '' }: { className?: string }) {
  const t = useCopy(COPY)
  return (
    <div className={`overflow-hidden rounded-[28px] bg-dark p-6 shadow-[0_28px_70px_rgba(15,23,42,0.20)] ${className}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t.helpEyebrow}</p>
      <p className="mt-3 font-display text-[20px] font-black leading-[1.15] tracking-[-0.03em] text-white">{t.helpTitle}</p>
      <p className="mt-3 text-sm leading-[1.65] text-white/70">{t.helpText}</p>
      <div className="mt-5 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => openChat({ source: 'faq_page' })}
          aria-haspopup="dialog"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-dark transition hover:bg-gold-300"
        >
          {t.ask}
          <MessageCircle size={15} aria-hidden="true" />
        </button>
        <Link
          href={ROUTES.demo}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          {t.demo}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
