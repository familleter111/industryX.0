'use client'

import React, { useState, useEffect, useRef } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, ExternalLink, Mail, RotateCcw, Send, X } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { useCurrentLocale } from '@/lib/i18n'
import { track } from '@/lib/analytics/posthog'
import { CHAT_LIMITS, CHAT_NAME, chatAiEnabled } from '@/lib/chat/config'
import { prefetchChatFaq } from '@/lib/chat/faq'
import { MAILTO } from '@/lib/data/contact'
import { entiwinHref } from '@/lib/data/entiwin'
import { ROUTES } from '@/lib/routes'
import {
  isBusy,
  resetChat,
  sendMessage,
  stopReply,
  useChatState,
  type SendResult,
} from '@/lib/chat/store'
import AssistantLogo from '@/features/chat/AssistantLogo'
import MessageText from '@/features/chat/MessageText'
import { PRESET_ORDER, usePanelSize } from '@/features/chat/usePanelSize'

/** Mode IA (NEXT_PUBLIC_CHAT_AI=on) : figé au build, voir lib/chat/config.ts. */
const AI = chatAiEnabled()

interface ChatWidgetProps {
  isOpen: boolean
  /** Origine de l'ouverture, pour la mesure d'audience (bouton, faq…). */
  source?: string
  onClose: () => void
}

/** Message affiché sous le champ quand une question est retenue (lib/chat/store.ts). */
const NOTICE: Record<Exclude<SendResult, 'sent' | 'ignored'>, { FR: string; EN: string }> = {
  cooldown: {
    FR: 'Un instant : laissez quelques secondes entre deux messages.',
    EN: 'One moment: please wait a few seconds between messages.',
  },
  repeat: {
    FR: 'Vous venez d’envoyer ce message. Pouvez-vous le reformuler ?',
    EN: 'You just sent this message. Could you rephrase it?',
  },
  spam: {
    FR: 'Ce message ressemble à du spam (liens, répétitions). Posez votre question en quelques mots.',
    EN: 'This message looks like spam (links, repetition). Please ask your question in a few words.',
  },
  'session-limit': {
    FR: 'Limite de messages atteinte pour cette visite. Notre équipe vous répond via le formulaire de contact.',
    EN: 'Message limit reached for this visit. Our team can answer you through the contact form.',
  },
}

/**
 * Actions rapides, sous la conversation : les trois conversions du site,
 * à portée de clic quelle que soit la réponse. Suivies sans code dédié par
 * AnalyticsProvider (`data-cta`, zone `data-cta-location="chat"`).
 */
const ACTIONS = {
  group: { FR: 'Actions rapides', EN: 'Quick actions' },
  demo: { FR: 'Demander une démo', EN: 'Book a demo' },
  entiwin: { FR: 'Essayer Enti Win', EN: 'Try Enti Win' },
  newTab: { FR: ' (nouvel onglet)', EN: ' (new tab)' },
  email: { FR: 'Nous écrire', EN: 'Email us' },
}

const ACTION_CLASS =
  'inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition duration-200 hover:border-gold hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep'

/** Boutons des trois tailles standard du panneau. */
const SIZE_LABEL = {
  group: { FR: 'Taille de la fenêtre', EN: 'Window size' },
  small: { FR: 'Petite fenêtre', EN: 'Small window' },
  medium: { FR: 'Fenêtre moyenne', EN: 'Medium window' },
  large: { FR: 'Grande fenêtre', EN: 'Large window' },
}

export default function ChatWidget({ isOpen, source, onClose }: ChatWidgetProps) {
  const locale = useCurrentLocale() === 'en' ? 'en' : 'fr'
  // Les textes du widget sont indexes FR / EN : on les aligne sur la langue de la page.
  const language = locale === 'en' ? 'EN' : 'FR'
  // Conversation gardée le temps de l'onglet (lib/chat/store.ts). L'accueil
  // (logo, nom, « Comment puis-je vous aider ? ») n'est pas un message : il
  // occupe la zone vide et disparaît au premier envoi.
  const chat = useChatState()
  const [input, setInput] = useState('')
  const [notice, setNotice] = useState<keyof typeof NOTICE | null>(null)
  const panel = usePanelSize()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wasOpen = useRef(isOpen)
  /** Élément qui a ouvert le chat (bulle, bouton de la FAQ…) : le focus y revient à la fermeture. */
  const opener = useRef<HTMLElement | null>(null)

  const { messages, typing: isTyping, streamingId } = chat

  useEffect(() => {
    if (!isOpen) return
    // Relevé avant que le focus passe au champ de saisie.
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    track('chat_opened', { page: window.location.pathname, source })
    // Le visiteur peut écrire tout de suite, sans cliquer dans le champ.
    const focus = setTimeout(() => inputRef.current?.focus(), 250)
    return () => clearTimeout(focus)
  }, [isOpen, source])

  // Réponses de la FAQ telles que publiées dans le CMS (lib/chat/faq.ts).
  useEffect(() => {
    if (isOpen) prefetchChatFaq(locale)
  }, [isOpen, locale])

  // Échap ferme le panneau, comme le menu de navigation.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  // Fermeture du widget : la réponse en cours n'a plus de lecteur, et le
  // focus revient à l'élément qui l'avait ouvert (Échap, croix ou bulle).
  // Seulement au passage ouvert → fermé, pas au premier rendu.
  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      stopReply()
      if (opener.current?.isConnected && opener.current !== document.body) opener.current.focus()
      opener.current = null
    }
    wasOpen.current = isOpen
  }, [isOpen])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isBusy(chat)) return
    const result = sendMessage(input, locale)
    if (result === 'sent') {
      setInput('')
      setNotice(null)
    } else if (result !== 'ignored') {
      setNotice(result)
    }
  }

  const label = language === 'FR' ? `Assistant ${CHAT_NAME}` : `${CHAT_NAME} assistant`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-label={label}
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
           *
           * A partir de 640 px, la taille standard choisie par le visiteur
           * (features/chat/usePanelSize) remplace ces valeurs.
           */
          style={panel.size ?? undefined}
          className="fixed bottom-24 right-6 z-50 w-[min(360px,calc(100vw-3rem))] sm:w-[380px] h-[min(500px,calc(100dvh-12rem))] bg-white rounded-3xl shadow-[0_24px_60px_rgba(12,13,18,0.18)] ring-1 ring-stone-200 flex flex-col overflow-hidden transition-[width,height] duration-300 ease-out"
        >
          {/* EN-TÊTE — clair, logo et nom à gauche, réglages à droite */}
          <div className="flex items-center justify-between gap-2 border-b border-stone-100 bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <AssistantLogo size={36} className="shrink-0" />
              <div className="min-w-0">
                <h3 className="flex items-center gap-1.5 text-sm font-semibold font-display text-dark">
                  {CHAT_NAME}
                  <span className="rounded-full bg-stone-100 px-1.5 py-px text-[12px] font-bold uppercase tracking-wider text-stone-600">
                    IA
                  </span>
                </h3>
                {/* « En ligne » et sa pastille verte laissaient croire à une
                    personne disponible : c'est un assistant automatique. */}
                <p className="truncate text-xs text-stone-500">
                  {language === 'FR' ? 'Assistant automatique' : 'Automated assistant'}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
              {/* Trois tailles standard (features/chat/usePanelSize), à
                  partir de 640 px de large : un carré de plus en plus grand. */}
              {panel.size && (
                <div role="group" aria-label={SIZE_LABEL.group[language]} className="mr-1 flex items-center rounded-full bg-stone-100 p-0.5">
                  {PRESET_ORDER.map((preset, i) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => panel.setPreset(preset)}
                      aria-pressed={panel.preset === preset}
                      aria-label={SIZE_LABEL[preset][language]}
                      title={SIZE_LABEL[preset][language]}
                      className={`flex h-6 w-6 items-center justify-center rounded-full transition duration-200 ${
                        panel.preset === preset ? 'bg-white text-dark shadow-sm' : 'text-stone-500 hover:text-dark'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="block rounded-[2px] border-[1.5px] border-current"
                        style={{ width: 6 + i * 3, height: 6 + i * 3 }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {chat.messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    resetChat()
                    setNotice(null)
                  }}
                  className="grid h-11 w-11 place-items-center rounded-full text-stone-500 transition duration-200 hover:bg-stone-100 hover:text-dark sm:h-8 sm:w-8"
                  aria-label={language === 'FR' ? 'Nouvelle conversation' : 'New conversation'}
                  title={language === 'FR' ? 'Nouvelle conversation' : 'New conversation'}
                >
                  <RotateCcw size={15} />
                </button>
              )}

              <button
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full text-stone-500 transition duration-200 hover:bg-stone-100 hover:text-dark sm:h-8 sm:w-8"
                aria-label={language === 'FR' ? 'Fermer le chat' : 'Close chat'}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="relative flex flex-1 flex-col overflow-y-auto bg-white px-4 pb-4 space-y-2.5">
            {/* Accueil, centré dans la zone vide tant que la conversation n'a
                pas commencé ; il s'efface au premier message envoyé. */}
            <AnimatePresence initial={false} mode="popLayout">
              {messages.length === 0 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="m-auto flex flex-col items-center px-4 text-center select-none"
                >
                  <AssistantLogo size={72} className="drop-shadow-[0_8px_18px_rgba(12,13,18,0.18)]" />
                  <p className="mt-3 text-base font-semibold font-display text-dark">{CHAT_NAME}</p>
                  <p className="mt-0.5 text-sm text-stone-500">
                    {language === 'FR' ? 'L’assistant virtuel d’Industry X.0' : 'Industry X.0’s virtual assistant'}
                  </p>
                  <p className="mt-5 text-lg font-semibold font-display text-dark">
                    {language === 'FR' ? 'Comment puis-je vous aider ?' : 'How can I help you?'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {messages.length > 0 && (
              <span className="mx-auto !mt-3 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 select-none">
                {language === 'FR' ? "Aujourd'hui" : 'Today'}
              </span>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' ? (
                  <div className="max-w-[85%] min-w-0 rounded-2xl rounded-bl-md bg-stone-100 px-3.5 py-2.5 text-sm text-stone-800 leading-relaxed whitespace-pre-line break-words">
                    {streamingId === msg.id ? (
                      msg.text
                    ) : (
                      <MessageText text={msg.text} linkClassName="text-gold-deep underline underline-offset-2 hover:text-dark" />
                    )}
                    {streamingId === msg.id && (
                      <span className="animate-blink ml-0.5 inline-block text-stone-400">▌</span>
                    )}
                  </div>
                ) : (
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-dark px-3.5 py-2.5 text-sm text-white leading-relaxed whitespace-pre-line break-words">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {/* « En train d'écrire » */}
            {isTyping && (
              <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-stone-100 px-4 py-3">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* SAISIE ET MENTION */}
          <form onSubmit={handleSendMessage} className="bg-white px-3 pb-2.5 pt-2 flex flex-col gap-1.5">
            <div
              role="group"
              aria-label={ACTIONS.group[language]}
              data-cta-location="chat"
              className="flex flex-wrap justify-center gap-1.5"
            >
              {/* Le panneau se ferme : il cacherait le formulaire sur téléphone. */}
              <Link href={ROUTES.demo} data-cta="chat_demo" onClick={onClose} className={ACTION_CLASS}>
                <CalendarCheck size={13} aria-hidden="true" />
                {ACTIONS.demo[language]}
              </Link>
              <a
                href={entiwinHref('chat')}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="entiwin_chat"
                className={ACTION_CLASS}
              >
                <ExternalLink size={13} aria-hidden="true" />
                {ACTIONS.entiwin[language]}
                <span className="sr-only">{ACTIONS.newTab[language]}</span>
              </a>
              <a href={MAILTO} data-cta="chat_email" className={ACTION_CLASS}>
                <Mail size={13} aria-hidden="true" />
                {ACTIONS.email[language]}
              </a>
            </div>
            {notice && (
              <p role="status" className="rounded-xl bg-amber-50 px-3 py-2 text-[14px] leading-snug text-amber-900">
                {NOTICE[notice][language]}
              </p>
            )}
            <div className="flex items-center gap-2 rounded-full bg-stone-100 py-1.5 pl-4 pr-1.5 ring-1 ring-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-gold-deep transition duration-200">
              <input
                ref={inputRef}
                type="text"
                maxLength={CHAT_LIMITS.messageMax}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  if (notice !== 'session-limit') setNotice(null)
                }}
                placeholder={language === 'FR' ? 'Écrivez votre message…' : 'Write your message…'}
                aria-label={language === 'FR' ? 'Votre message' : 'Your message'}
                className="flex-1 min-w-0 bg-transparent text-sm text-stone-800 placeholder:text-stone-500 outline-none py-1"
                disabled={isTyping}
              />
              {/* Compteur, seulement à l'approche de la limite. */}
              {input.length > CHAT_LIMITS.messageMax * 0.8 && (
                <span className="shrink-0 text-[12px] tabular-nums text-stone-500" aria-live="polite">
                  {input.length}/{CHAT_LIMITS.messageMax}
                </span>
              )}
              <button
                type="submit"
                aria-label={language === 'FR' ? 'Envoyer' : 'Send'}
                disabled={!input.trim() || isTyping}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-dark transition duration-200 hover:bg-gold-deep hover:text-white disabled:bg-stone-200 disabled:text-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
              >
                <Send size={15} />
              </button>
            </div>

            <p className="px-2 text-xs text-center text-stone-500 leading-snug select-none">
              {AI
                ? language === 'FR'
                  ? "Réponses générées par IA, à vérifier. Messages transmis à notre fournisseur d'IA, non conservés par Industry X.0. "
                  : 'AI-generated answers, to be checked. Messages are sent to our AI provider and not stored by Industry X.0. '
                : language === 'FR'
                  ? 'Vos messages restent dans votre navigateur : ils ne sont pas enregistrés. '
                  : 'Your messages stay in your browser: they are not recorded. '}
              <Link href="/privacy" className="underline hover:text-dark transition">
                {language === 'FR' ? 'Confidentialité' : 'Privacy'}
              </Link>
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
