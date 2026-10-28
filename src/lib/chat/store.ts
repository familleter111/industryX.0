/**
 * Conversation de l'assistant (components/layout/ChatWidget).
 *
 * Un seul état au niveau du module, copié en sessionStorage : la
 * conversation survit à un changement de page ou à un rechargement, reste
 * dans le navigateur, comme l'annoncent le widget et la politique de
 * confidentialité, et disparaît à la fermeture de l'onglet.
 *
 * Pas de message de bienvenue : c'est le visiteur qui écrit le premier.
 *
 * Premier filtre antispam, pour un retour immédiat au visiteur : délai entre
 * deux questions, question répétée, contenu (lib/chat/guard.ts), nombre de
 * questions par onglet. La route /api/chat refait ses propres contrôles :
 * ceux-ci se contournent sans peine.
 */

import { useSyncExternalStore } from 'react'

import { track } from '@/lib/analytics/posthog'
import { askAssistant } from '@/lib/chat/client'
import { CHAT_LIMITS, chatAiEnabled, type ChatLocale } from '@/lib/chat/config'
import { cleanText, spamReason } from '@/lib/chat/guard'
import { instantReply, localReply } from '@/lib/chat/local'

/** `sig` : signature d'une réponse de l'IA, renvoyée avec elle (lib/chat/server.ts). */
export type ChatMessage = { id: string; sender: 'bot' | 'user'; text: string; sig?: string }

export type ChatState = {
  messages: ChatMessage[]
  /** Points « en train d'écrire » : la réponse n'a pas commencé. */
  typing: boolean
  /** Réponse en cours d'écriture. */
  streamingId: string | null
}

/** Issue d'un envoi : la question part, ou le motif du refus à afficher. */
export type SendResult = 'sent' | 'ignored' | 'cooldown' | 'repeat' | 'spam' | 'session-limit'

const STORAGE_KEY = 'ix0-chat'
/** Questions posées dans l'onglet, gardées même après « Nouvelle conversation ». */
const COUNT_KEY = 'ix0-chat-count'
const EMPTY: ChatState = { messages: [], typing: false, streamingId: null }

/** Mode IA (NEXT_PUBLIC_CHAT_AI=on) : figé au build, voir lib/chat/config.ts. */
const AI = chatAiEnabled()

function load(): ChatState {
  if (typeof window === 'undefined') return EMPTY
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? 'null')
    if (!Array.isArray(saved)) return EMPTY
    const messages = saved.filter(
      (m): m is ChatMessage =>
        m &&
        typeof m.id === 'string' &&
        (m.sender === 'bot' || m.sender === 'user') &&
        typeof m.text === 'string' &&
        (m.sig === undefined || typeof m.sig === 'string'),
    )
    return { ...EMPTY, messages }
  } catch {
    return EMPTY
  }
}

let state: ChatState = load()
const listeners = new Set<() => void>()
let timeouts: ReturnType<typeof setTimeout>[] = []
let controller: AbortController | null = null
let lastSentAt = 0

function set(patch: Partial<ChatState>) {
  state = { ...state, ...patch }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages))
  } catch {
    // Stockage bloqué (navigation privée…) : la conversation vit en mémoire.
  }
  listeners.forEach((listener) => listener())
}

function updateMessage(id: string, change: (m: ChatMessage) => Partial<ChatMessage>) {
  set({ messages: state.messages.map((m) => (m.id === id ? { ...m, ...change(m) } : m)) })
}

/** Compteur de questions de l'onglet ; `sessionStorage` bloqué : en mémoire. */
let memoryCount = 0
function questionCount(): number {
  try {
    return Number(window.sessionStorage.getItem(COUNT_KEY)) || 0
  } catch {
    return memoryCount
  }
}
function countQuestion() {
  memoryCount = questionCount() + 1
  try {
    window.sessionStorage.setItem(COUNT_KEY, String(memoryCount))
  } catch {
    // Compté en mémoire seulement.
  }
}

const rid = () => Math.random().toString(36).slice(2, 11)

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** État de la conversation ; vide au rendu serveur, comme au premier rendu client. */
export function useChatState(): ChatState {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY)
}

export const isBusy = (s: ChatState) => s.typing || s.streamingId !== null

/** Écrit une réponse locale lettre par lettre (mode local et secours). */
function typeLocally(id: string, full: string) {
  let c = 0
  const typeNext = () => {
    c += 1
    updateMessage(id, () => ({ text: full.slice(0, c) }))
    if (c < full.length) timeouts.push(setTimeout(typeNext, 14))
    else if (state.streamingId === id) set({ streamingId: null })
  }
  typeNext()
}

/** Envoie une question et écrit la réponse : IA, réponse instantanée ou mots-clés. */
export function sendMessage(input: string, locale: ChatLocale, now = Date.now()): SendResult {
  const userText = cleanText(input, CHAT_LIMITS.messageMax)
  if (!userText || isBusy(state)) return 'ignored'

  if (questionCount() >= CHAT_LIMITS.sessionMax) return 'session-limit'
  if (now - lastSentAt < CHAT_LIMITS.cooldownMs) return 'cooldown'
  if (spamReason(userText)) return 'spam'
  const previous = [...state.messages].reverse().find((m) => m.sender === 'user')
  if (previous && previous.text.toLowerCase() === userText.toLowerCase()) return 'repeat'

  lastSentAt = now
  countQuestion()
  // Le rang du message seulement : la question elle-même n'est jamais mesurée.
  track('chat_message_sent', {
    message_index: state.messages.filter((m) => m.sender === 'user').length + 1,
  })

  const userMsg: ChatMessage = { id: rid(), sender: 'user', text: userText }
  // Réponses locales comprises : la route ne garde que les réponses signées.
  const history = [...state.messages, userMsg]
    .filter((m) => m.text)
    .slice(-CHAT_LIMITS.historyMax * 2)
    .map((m) =>
      m.sender === 'user'
        ? { role: 'user' as const, content: m.text }
        : { role: 'assistant' as const, content: m.text, ...(m.sig ? { sig: m.sig } : {}) },
    )
  set({ messages: [...state.messages, userMsg], typing: true })

  const id = rid()
  const startReply = () => {
    set({ typing: false, streamingId: id, messages: [...state.messages, { id, sender: 'bot', text: '' }] })
  }
  const done = () => {
    if (state.streamingId === id) set({ streamingId: null })
  }

  // Questions de la FAQ, réponses prêtes et politesse sont répondues sur
  // place : aucun appel à l'IA, rien de consommé sur le plafond quotidien.
  if (AI && !instantReply(userText, locale)) {
    void askAI(id, history, userText, locale, startReply, done)
    return 'sent'
  }

  // Mode local : courte « réflexion », puis réponse écrite lettre par lettre.
  timeouts.push(
    setTimeout(() => {
      startReply()
      typeLocally(id, localReply(userText, locale))
    }, 1000),
  )
  return 'sent'
}

async function askAI(
  id: string,
  history: Parameters<typeof askAssistant>[0],
  userText: string,
  locale: ChatLocale,
  startReply: () => void,
  done: () => void,
) {
  const current = new AbortController()
  controller = current
  let started = false
  try {
    const sig = await askAssistant(
      history,
      locale,
      (chunk) => {
        if (!started) {
          started = true
          startReply()
        }
        updateMessage(id, (m) => ({ text: m.text + chunk }))
      },
      current.signal,
    )
    if (started) {
      if (sig) updateMessage(id, () => ({ sig }))
      return done()
    }
  } catch {
    if (current.signal.aborted) return
    // Une réponse déjà commencée est gardée telle quelle.
    if (started) return done()
  }
  // IA indisponible ou question refusée : réponse locale, pour ne jamais
  // laisser une question sans suite.
  startReply()
  typeLocally(id, localReply(userText, locale))
}

/** Interrompt la réponse en cours, en gardant ce qui est déjà écrit. */
export function stopReply() {
  controller?.abort()
  controller = null
  timeouts.forEach(clearTimeout)
  timeouts = []
  if (isBusy(state)) set({ typing: false, streamingId: null })
}

/** Nouvelle conversation : réponse en cours interrompue, historique effacé. */
export function resetChat() {
  stopReply()
  set({ messages: [] })
}
