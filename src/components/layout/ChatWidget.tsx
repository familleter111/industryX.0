'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { useCurrentLocale } from '@/lib/i18n'
import { track } from '@/lib/analytics/posthog'
import { askAssistant } from '@/lib/chat/client'
import { CHAT_LIMITS, chatAiEnabled } from '@/lib/chat/config'
import { instantReply, localReply, WELCOME } from '@/lib/chat/local'

/** Mode IA (NEXT_PUBLIC_CHAT_AI=on) : figé au build, voir lib/chat/config.ts. */
const AI = chatAiEnabled()

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: Date
}

interface ChatWidgetProps {
  isOpen: boolean
  /** Origine de l'ouverture, pour la mesure d'audience (bouton, faq…). */
  source?: string
  onClose: () => void
}

const rid = () => Math.random().toString(36).slice(2, 11)

/** Liens, e-mails et numéros de téléphone d'une réponse, rendus cliquables. */
const LINKABLE = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+\d{3}(?: \d{2,3}){3})/g

function linkify(text: string) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return part
    // Ponctuation collée au lien (« …contact). ») : elle reste du texte.
    const [, target, tail] = part.match(/^(.*?)([.,;:!?)]*)$/) ?? [part, part, '']
    const href = target.startsWith('http')
      ? target
      : target.includes('@')
        ? `mailto:${target}`
        : `tel:${target.replace(/\s/g, '')}`
    const external = href.startsWith('http')
    return (
      <span key={i}>
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="break-all font-semibold text-gold-deep underline hover:text-gold"
        >
          {target}
        </a>
        {tail}
      </span>
    )
  })
}

/** Les messages de bienvenue sont joués par le widget, pas par le modèle. */
const isWelcome = (message: Message) => message.id.startsWith('welcome-')

export default function ChatWidget({ isOpen, source, onClose }: ChatWidgetProps) {
  const locale = useCurrentLocale() === 'en' ? 'en' : 'fr'
  // Les textes du widget sont indexes FR / EN : on les aligne sur la langue de la page.
  const language = locale === 'en' ? 'EN' : 'FR'
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Joue les messages de bienvenue un par un, avec effet de frappe
  useEffect(() => {
    const welcome = WELCOME[locale]
    setMessages([])
    setIsTyping(false)
    setStreamingId(null)

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms)
        timeouts.push(t)
      })

    const run = async () => {
      await wait(600)
      for (let i = 0; i < welcome.length; i++) {
        if (cancelled) return
        // "…en train d'écrire" (points animés)
        setIsTyping(true)
        await wait(750 + Math.min(welcome[i].length * 9, 750))
        if (cancelled) return
        setIsTyping(false)

        // Bulle qui s'écrit lettre par lettre
        const id = `welcome-${i}`
        setMessages((prev) => [...prev, { id, sender: 'bot', text: '', timestamp: new Date() }])
        setStreamingId(id)
        const full = welcome[i]
        for (let c = 1; c <= full.length; c++) {
          if (cancelled) return
          setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: full.slice(0, c) } : m)))
          await wait(16)
        }
        setStreamingId((s) => (s === id ? null : s))
        await wait(500)
      }
    }
    run()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [locale])

  // Nettoyage des timeouts de réponse au démontage
  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => timeouts.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    track('chat_opened', { page: window.location.pathname, source })
    // Le visiteur peut écrire tout de suite, sans cliquer dans le champ.
    const focus = setTimeout(() => inputRef.current?.focus(), 250)
    return () => clearTimeout(focus)
  }, [isOpen, source])

  // Échap ferme le panneau, comme le menu de navigation.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  // Fermeture du widget : la réponse en cours n'a plus de lecteur.
  useEffect(() => {
    if (!isOpen) abortRef.current?.abort()
  }, [isOpen])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  /** Écrit une réponse locale lettre par lettre (mode local et secours). */
  const typeLocally = (id: string, full: string) => {
    let c = 0
    const typeNext = () => {
      c += 1
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: full.slice(0, c) } : m)))
      if (c < full.length) {
        const t = setTimeout(typeNext, 14)
        timeoutsRef.current.push(t)
      } else {
        setStreamingId((s) => (s === id ? null : s))
      }
    }
    typeNext()
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping || streamingId) return

    const userText = input.trim().slice(0, CHAT_LIMITS.messageMax)
    const userMsg: Message = { id: rid(), sender: 'user', text: userText, timestamp: new Date() }
    // Le rang du message seulement : la question elle-même n'est jamais mesurée.
    track('chat_message_sent', {
      message_index: messages.filter((m) => m.sender === 'user').length + 1,
    })

    // Historique envoyé à l'IA : la conversation réelle, sans les messages
    // de bienvenue joués par le widget.
    const history = [...messages, userMsg]
      .filter((m) => !isWelcome(m) && m.text)
      .map((m) => ({ role: m.sender === 'user' ? ('user' as const) : ('assistant' as const), content: m.text }))

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const id = rid()
    const startReply = () => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { id, sender: 'bot', text: '', timestamp: new Date() }])
      setStreamingId(id)
    }

    // Questions de la FAQ et conversation courante (bonjour, comment vas-tu…)
    // sont répondues sur place : aucun appel à l'IA, rien de consommé sur le
    // plafond quotidien.
    if (AI && !instantReply(userText, locale)) {
      const controller = new AbortController()
      abortRef.current = controller
      let started = false
      try {
        await askAssistant(
          history,
          locale,
          (chunk) => {
            if (!started) {
              started = true
              startReply()
            }
            setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: m.text + chunk } : m)))
          },
          controller.signal,
        )
        if (started) {
          setStreamingId((s) => (s === id ? null : s))
          return
        }
      } catch {
        if (controller.signal.aborted) return
        // Une réponse déjà commencée est gardée telle quelle.
        if (started) {
          setStreamingId((s) => (s === id ? null : s))
          return
        }
      }
      // IA indisponible : réponse locale, pour ne jamais laisser une question sans suite.
      startReply()
      typeLocally(id, localReply(userText, locale))
      return
    }

    // Mode local : courte « réflexion », puis réponse écrite lettre par lettre.
    const think = setTimeout(() => {
      startReply()
      typeLocally(id, localReply(userText, locale))
    }, 1000)
    timeoutsRef.current.push(think)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-label={language === 'FR' ? 'Assistant CIPA' : 'CIPA Assistant'}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          /*
           * Largeur et hauteur bornees par la fenetre.
           *
           * `w-[360px]` fixe depassait par la gauche des 360 px : avec
           * `right-6`, le bord gauche du panneau tombait a -24 px sur un
           * telephone de 360 px de large, et `overflow-x: hidden` sur le body
           * coupait l'avatar et le debut des messages au lieu d'offrir un
           * defilement. Idem en hauteur : 500 px plus les 96 px de `bottom-24`
           * font 596 px, si bien que sur une fenetre de 640 px l'en-tete du
           * panneau passait sous la navbar fixe de 82 px.
           *
           * `dvh` et non `vh` : sur mobile, la barre d'adresse qui se retracte
           * fait varier la hauteur utile, et `vh` fige la plus grande.
           */
          className="fixed bottom-24 right-6 z-50 w-[min(360px,calc(100vw-3rem))] sm:w-[380px] h-[min(500px,calc(100dvh-12rem))] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-cream-border"
        >
          {/* HEADER */}
          <div className="bg-dark text-white border-t-[4px] border-gold px-5 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Avatar Container with glowing active status */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dark-raised border border-gold/30 shadow-inner">
                <Bot size={20} className="text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-semibold font-display tracking-wide text-white">
                  {language === 'FR' ? 'Assistant CIPA' : 'CIPA Assistant'}
                </h3>
                {/* « En ligne » et sa pastille verte laissaient croire à une
                    personne disponible : c'est un assistant automatique. */}
                <p className="text-[11px] text-stone-400 font-medium">
                  {language === 'FR' ? 'Assistant automatique' : 'Automated assistant'}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-stone-400 hover:bg-dark-raised hover:text-white transition duration-200"
              aria-label={language === 'FR' ? 'Fermer le chat' : 'Close chat'}
            >
              <X size={16} />
            </button>
          </div>

          {/* MESSAGE LIST */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-100">
            {/* Today separator */}
            <div className="text-center my-2 select-none">
              <span className="text-[10px] text-stone-600 bg-cream-border px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                {language === 'FR' ? "Aujourd'hui" : "Today"}
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' ? (
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    {/* Small Bot Badge */}
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dark text-gold text-[9px] font-bold border border-gold/20 mt-0.5 shadow-sm">
                      C
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-white border border-cream-border px-4 py-2.5 text-[13px] text-stone-800 leading-relaxed shadow-sm font-normal whitespace-pre-line">
                      {streamingId === msg.id ? msg.text : linkify(msg.text)}
                      {streamingId === msg.id && (
                        <span className="animate-blink ml-0.5 inline-block text-gold">▌</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-gold px-4 py-2.5 text-[13px] text-white leading-relaxed shadow-md font-medium">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2.5 max-w-[85%]">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dark text-gold text-[9px] font-bold border border-gold/20 mt-0.5 shadow-sm animate-pulse">
                  C
                </div>
                <div className="rounded-2xl rounded-tl-none bg-white border border-cream-border px-4 py-3 text-[13px] text-stone-800 leading-relaxed shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM & DISCLAIMER */}
          <form onSubmit={handleSendMessage} className="border-t border-cream-border bg-white p-3 flex flex-col gap-2 shadow-2xl">
            <div className="flex items-center gap-2 rounded-xl border border-cream-border bg-stone-50 px-3.5 py-2.5 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold transition duration-200">
              <input
                ref={inputRef}
                type="text"
                maxLength={CHAT_LIMITS.messageMax}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'FR' ? "Saisir un message..." : "Enter a message..."}
                className="flex-1 bg-transparent text-sm text-stone-800 outline-none py-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
                disabled={isTyping}
              />
              <button
                type="submit"
                aria-label={language === 'FR' ? 'Envoyer' : 'Send'}
                disabled={!input.trim() || isTyping}
                className="text-gold hover:text-gold-600 disabled:text-cream-deep transition duration-200 p-1 rounded-lg hover:bg-amber-50"
              >
                <Send size={16} />
              </button>
            </div>

            <p className="text-[10px] text-center text-stone-500 leading-relaxed pt-1 px-2 select-none">
              {AI
                ? language === 'FR'
                  ? "Réponses générées par IA, à vérifier. Vos messages sont transmis à notre fournisseur d'IA pour y répondre, sans être conservés par Industry X.0. Politique de confidentialité "
                  : 'AI-generated answers, to be checked. Your messages are sent to our AI provider to answer them and are not stored by Industry X.0. Privacy policy '
                : language === 'FR'
                  ? 'Vos messages restent dans votre navigateur : ils ne sont pas enregistrés. Consultez notre politique de confidentialité '
                  : 'Your messages stay in your browser: they are not recorded. Read our privacy policy '}
              <Link href="/privacy" className="underline hover:text-gold transition font-semibold">
                {language === 'FR' ? "ici" : "here"}
              </Link>.
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
