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

export default function ChatWidget({ isOpen, onClose, language = 'FR' }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize welcome messages
  useEffect(() => {
    if (language === 'FR') {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: 'Bonjour ! Je suis Mehdi, votre conseiller digital chez Industry X.0.',
          timestamp: new Date(),
        },
        {
          id: 'welcome-2',
          sender: 'bot',
          text: 'Prêt à découvrir comment digitaliser et piloter vos opérations industrielles avec CIPA ?',
          timestamp: new Date(),
        },
        {
          id: 'welcome-3',
          sender: 'bot',
          text: 'Avez-vous des questions sur notre plateforme ou souhaitez-vous planifier une démonstration ?',
          timestamp: new Date(),
        },
      ])
    } else {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: "Welcome back! I'm Mehdi, your digital advisor here at Industry X.0.",
          timestamp: new Date(),
        },
        {
          id: 'welcome-2',
          sender: 'bot',
          text: 'Are you ready to see what you can build with CIPA?',
          timestamp: new Date(),
        },
        {
          id: 'welcome-3',
          sender: 'bot',
          text: 'Do you have any questions about our platform or would you like to schedule a live demo?',
          timestamp: new Date(),
        },
      ])
    }
  }, [language])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userText = input.trim()
    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'user',
      text: userText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate smart AI response after 1.2s delay
    setTimeout(() => {
      let botResponse = ''
      const lowerText = userText.toLowerCase()

      if (language === 'FR') {
        if (
          lowerText.includes('demo') ||
          lowerText.includes('démo') ||
          lowerText.includes('rdv') ||
          lowerText.includes('rendez') ||
          lowerText.includes('contact') ||
          lowerText.includes('tester')
        ) {
          botResponse =
            "C'est une excellente idée ! Pour réserver une démonstration personnalisée de CIPA avec nos experts, vous pouvez cliquer sur le bouton 'Demander une démo' dans le menu principal, ou me laisser votre adresse email ici pour que notre équipe vous recontacte."
        } else if (
          lowerText.includes('prix') ||
          lowerText.includes('tarif') ||
          lowerText.includes('coût') ||
          lowerText.includes('cout') ||
          lowerText.includes('abonnement')
        ) {
          botResponse =
            "Nos tarifs s'adaptent à la taille de votre usine et aux modules choisis (Qualité, Production, Maintenance). Nous serions ravis de réaliser un devis ou une estimation rapide lors d'un court échange !"
        } else if (
          lowerText.includes('cipa') ||
          lowerText.includes('produit') ||
          lowerText.includes('logiciel') ||
          lowerText.includes('app') ||
          lowerText.includes('solution') ||
          lowerText.includes('fonctionne')
        ) {
          botResponse =
            "CIPA est notre suite logicielle modulaire conçue pour collecter les données terrain, digitaliser les formulaires et exploiter l'IA pour optimiser les performances de production. Elle fonctionne sur mobile, tablette et PC."
        } else if (
          lowerText.includes('merci') ||
          lowerText.includes('super') ||
          lowerText.includes('ok') ||
          lowerText.includes('parfait')
        ) {
          botResponse = "Je vous en prie ! C'est un plaisir de vous aider. N'hésitez pas si vous avez besoin de quoi que ce soit d'autre."
        } else {
          botResponse =
            "Merci pour votre message ! Un membre de l'équipe Industry X.0 va vous répondre sous peu. Comment puis-je vous aider d'autre concernant la digitalisation de vos usines ?"
        }
      } else {
        if (
          lowerText.includes('demo') ||
          lowerText.includes('book') ||
          lowerText.includes('schedule') ||
          lowerText.includes('meeting') ||
          lowerText.includes('contact') ||
          lowerText.includes('test')
        ) {
          botResponse =
            "Excellent choice! To book a live personalized demonstration of CIPA, you can click the 'Request a Demo' button in the navbar, or drop your email here and our team will get in touch with you."
        } else if (
          lowerText.includes('price') ||
          lowerText.includes('pricing') ||
          lowerText.includes('cost') ||
          lowerText.includes('license') ||
          lowerText.includes('subscription')
        ) {
          botResponse =
            "Our pricing plans are tailored to your factory scale and the modules you activate (Quality, Production, Maintenance). Let's schedule a brief call to estimate your needs!"
        } else if (
          lowerText.includes('cipa') ||
          lowerText.includes('product') ||
          lowerText.includes('software') ||
          lowerText.includes('app') ||
          lowerText.includes('solution') ||
          lowerText.includes('works') ||
          lowerText.includes('platform')
        ) {
          botResponse =
            "CIPA is our modular industrial platform built to capture shop-floor data, digitize quality checklists, and leverage AI insights. It is fully responsive and runs on mobile, tablet, and desktop."
        } else if (
          lowerText.includes('thanks') ||
          lowerText.includes('thank you') ||
          lowerText.includes('awesome') ||
          lowerText.includes('ok') ||
          lowerText.includes('perfect')
        ) {
          botResponse = "You're very welcome! It's my pleasure to help. Let me know if you have other questions."
        } else {
          botResponse =
            "Thank you for your message! A member of the Industry X.0 team will get back to you shortly. In the meantime, is there anything else I can help you with?"
        }
      }

      const botMsg: Message = {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1200)
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
                <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5 rounded-full border-2 border-[#0C0D12] bg-emerald-500">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold font-display tracking-wide text-white">
                  Mehdi Tarchella
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#A8A29E] font-medium">
                  <span>{language === 'FR' ? 'Conseiller Digital' : 'Digital Advisor'}</span>
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
