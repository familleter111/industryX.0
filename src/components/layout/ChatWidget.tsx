'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Send, X } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { useCurrentLocale } from '@/lib/i18n'
import { track } from '@/lib/analytics/posthog'
import { CHAT_LIMITS, CHAT_NAME, chatAiEnabled } from '@/lib/chat/config'
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
  // Conversation gardée le temps de l'onglet (lib/chat/store.ts). Pas de
  // message de bienvenue : l'accueil (logo, nom) attend que le visiteur
  // écrive le premier.
  const chat = useChatState()
  const [input, setInput] = useState('')
  const [notice, setNotice] = useState<keyof typeof NOTICE | null>(null)
  const panel = usePanelSize()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wasOpen = useRef(isOpen)

  const { messages, typing: isTyping, streamingId } = chat

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

  // Fermeture du widget : la réponse en cours n'a plus de lecteur. Seulement
  // au passage ouvert → fermé, pas au premier rendu.
  useEffect(() => {
    if (wasOpen.current && !isOpen) stopReply()
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
                  <span className="rounded-full bg-stone-100 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-stone-600">
                    IA
                  </span>
                </h3>
                {/* « En ligne » et sa pastille verte laissaient croire à une
                    personne disponible : c'est un assistant automatique. */}
                <p className="truncate text-[11px] text-stone-500">
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
                  className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-dark transition duration-200"
                  aria-label={language === 'FR' ? 'Nouvelle conversation' : 'New conversation'}
                  title={language === 'FR' ? 'Nouvelle conversation' : 'New conversation'}
                >
                  <RotateCcw size={15} />
                </button>
              )}

              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100 hover:text-dark transition duration-200"
                aria-label={language === 'FR' ? 'Fermer le chat' : 'Close chat'}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto bg-white px-4 pb-4 space-y-2.5">
            {/* Accueil de chaque conversation : le logo de l'assistant, en
                grand, se présente avant le premier message. */}
            <div className="flex flex-col items-center px-4 pb-3 pt-6 text-center select-none">
              <AssistantLogo size={72} className="drop-shadow-[0_8px_18px_rgba(12,13,18,0.18)]" />
              <p className="mt-3 text-base font-semibold font-display text-dark">{CHAT_NAME}</p>
              <p className="mt-0.5 text-xs text-stone-500">
                {language === 'FR' ? 'L’assistant virtuel d’Industry X.0' : 'Industry X.0’s virtual assistant'}
              </p>
              <span className="mt-3 rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-medium text-stone-600">
                {language === 'FR' ? "Aujourd'hui" : 'Today'}
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' ? (
                  <div className="max-w-[85%] min-w-0 rounded-2xl rounded-bl-md bg-stone-100 px-3.5 py-2.5 text-[13px] text-stone-800 leading-relaxed whitespace-pre-line break-words">
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
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-dark px-3.5 py-2.5 text-[13px] text-white leading-relaxed whitespace-pre-line break-words">
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
            {notice && (
              <p role="status" className="rounded-xl bg-amber-50 px-3 py-2 text-[11px] leading-snug text-amber-900">
                {NOTICE[notice][language]}
              </p>
            )}
            <div className="flex items-center gap-2 rounded-full bg-stone-100 py-1.5 pl-4 pr-1.5 ring-1 ring-transparent focus-within:bg-white focus-within:ring-stone-300 transition duration-200">
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
                <span className="shrink-0 text-[10px] tabular-nums text-stone-500" aria-live="polite">
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

            <p className="px-2 text-[10px] text-center text-stone-500 leading-snug select-none">
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
