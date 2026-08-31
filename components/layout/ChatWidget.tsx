'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X } from 'lucide-react'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: Date
}

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
  language: string
}

// Messages de bienvenue joués séquentiellement (effet de frappe)
const WELCOME: Record<string, string[]> = {
  FR: [
    "Bonjour 👋 Je suis l'assistant virtuel d'Industry X.0.",
    'Prêt à découvrir comment digitaliser et piloter vos opérations industrielles avec CIPA ?',
    'Avez-vous des questions sur notre plateforme, ou souhaitez-vous planifier une démonstration ?',
  ],
  EN: [
    "Hi 👋 I'm the Industry X.0 virtual assistant.",
    'Ready to see how CIPA can digitize and streamline your industrial operations?',
    'Any questions about our platform, or would you like to schedule a live demo?',
  ],
}

const rid = () => Math.random().toString(36).slice(2, 11)

// Réponse contextuelle simple selon le message de l'utilisateur
function getBotResponse(userText: string, language: string): string {
  const t = userText.toLowerCase()
  if (language === 'FR') {
    if (/(demo|démo|rdv|rendez|contact|tester)/.test(t))
      return "C'est une excellente idée ! Pour réserver une démonstration personnalisée de CIPA, cliquez sur « Planifier une démo » dans le menu, ou laissez-moi votre email et notre équipe vous recontacte."
    if (/(prix|tarif|coût|cout|abonnement)/.test(t))
      return "Nos tarifs s'adaptent à la taille de votre usine et aux modules choisis (Qualité, Production, Maintenance). Nous serions ravis de vous préparer une estimation rapide lors d'un court échange !"
    if (/(cipa|produit|logiciel|app|solution|fonctionne)/.test(t))
      return "CIPA est notre suite modulaire conçue pour collecter les données terrain, digitaliser les formulaires et exploiter l'IA afin d'optimiser vos performances. Elle fonctionne sur mobile, tablette et PC."
    if (/(merci|super|ok|parfait)/.test(t))
      return "Je vous en prie ! C'est un plaisir de vous aider. N'hésitez pas si vous avez besoin d'autre chose."
    return "Merci pour votre message ! Un membre de l'équipe Industry X.0 va vous répondre sous peu. Comment puis-je vous aider concernant la digitalisation de vos usines ?"
  }
  if (/(demo|book|schedule|meeting|contact|test)/.test(t))
    return "Excellent choice! To book a personalized CIPA demo, click « Schedule a demo » in the menu, or drop your email here and our team will reach out."
  if (/(price|pricing|cost|license|subscription)/.test(t))
    return "Our pricing adapts to your factory scale and the modules you activate (Quality, Production, Maintenance). Let's set up a short call to estimate your needs!"
  if (/(cipa|product|software|app|solution|works|platform)/.test(t))
    return 'CIPA is our modular industrial platform built to capture shop-floor data, digitize checklists and leverage AI insights. It runs on mobile, tablet and desktop.'
  if (/(thanks|thank you|awesome|ok|perfect)/.test(t))
    return "You're very welcome! It's my pleasure to help. Let me know if you have other questions."
  return 'Thank you for your message! A member of the Industry X.0 team will get back to you shortly. Is there anything else I can help you with?'
}

export default function ChatWidget({ isOpen, onClose, language = 'FR' }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Joue les messages de bienvenue un par un, avec effet de frappe
  useEffect(() => {
    const welcome = WELCOME[language === 'FR' ? 'FR' : 'EN']
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
  }, [language])

  // Nettoyage des timeouts de réponse au démontage
  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping || streamingId) return

    const userText = input.trim()
    const userMsg: Message = { id: rid(), sender: 'user', text: userText, timestamp: new Date() }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Réflexion (points animés) puis réponse écrite lettre par lettre
    const think = setTimeout(() => {
      const full = getBotResponse(userText, language)
      setIsTyping(false)

      const id = rid()
      setMessages((prev) => [...prev, { id, sender: 'bot', text: '', timestamp: new Date() }])
      setStreamingId(id)

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
    }, 1000)
    timeoutsRef.current.push(think)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-[#ECE7DD]"
        >
          {/* HEADER */}
          <div className="bg-[#0C0D12] text-white border-t-[4px] border-[#DAA250] px-5 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Avatar Container with glowing active status */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1B24] border border-[#DAA250]/30 shadow-inner">
                <Bot size={20} className="text-[#DAA250]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold font-display tracking-wide text-white">
                  {language === 'FR' ? 'Assistant CIPA' : 'CIPA Assistant'}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#A8A29E] font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{language === 'FR' ? 'En ligne' : 'Online'}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-[#A8A29E] hover:bg-[#1A1B24] hover:text-white transition duration-200"
              aria-label="Fermer le chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* MESSAGE LIST */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF9F6]">
            {/* Today separator */}
            <div className="text-center my-2 select-none">
              <span className="text-[10px] text-[#8C877D] bg-[#EDE9DE] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
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
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0C0D12] text-[#DAA250] text-[9px] font-bold border border-[#DAA250]/20 mt-0.5 shadow-sm">
                      C
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-white border border-[#ECE7DD] px-4 py-2.5 text-[13px] text-[#292524] leading-relaxed shadow-sm font-normal">
                      {msg.text}
                      {streamingId === msg.id && (
                        <span className="animate-blink ml-0.5 inline-block text-[#DAA250]">▌</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-[#DAA250] px-4 py-2.5 text-[13px] text-white leading-relaxed shadow-md font-medium">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2.5 max-w-[85%]">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0C0D12] text-[#DAA250] text-[9px] font-bold border border-[#DAA250]/20 mt-0.5 shadow-sm animate-pulse">
                  C
                </div>
                <div className="rounded-2xl rounded-tl-none bg-white border border-[#ECE7DD] px-4 py-3 text-[13px] text-[#292524] leading-relaxed shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#A8A29E] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#A8A29E] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#A8A29E] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM & DISCLAIMER */}
          <form onSubmit={handleSendMessage} className="border-t border-[#ECE7DD] bg-white p-3 flex flex-col gap-2 shadow-2xl">
            <div className="flex items-center gap-2 rounded-xl border border-[#ECE7DD] bg-[#FAFAF9] px-3.5 py-2.5 focus-within:border-[#DAA250] focus-within:ring-1 focus-within:ring-[#DAA250] transition duration-200">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'FR' ? "Saisir un message..." : "Enter a message..."}
                className="flex-1 bg-transparent text-sm text-[#292524] outline-none py-0.5"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="text-[#DAA250] hover:text-[#c47e1a] disabled:text-[#D1CBC2] transition duration-200 p-1 rounded-lg hover:bg-amber-50"
              >
                <Send size={16} />
              </button>
            </div>

            <p className="text-[10px] text-center text-[#8C877D] leading-relaxed pt-1 px-2 select-none">
              {language === 'FR'
                ? "Ce chat peut être enregistré pour l'assurance qualité. Vous pouvez consulter notre politique de confidentialité "
                : "This chat may be recorded for quality assurance. You can view our privacy policy "}
              <a href="/privacy" className="underline hover:text-[#DAA250] transition font-semibold">
                {language === 'FR' ? "ici" : "here"}
              </a>.
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
