'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function WelcomeIntro() {
  const [show, setShow] = useState(true)
  const [step, setStep] = useState(1) // 1: Welcome message, 2: Exit (étape « Hello » supprimée)

  useEffect(() => {
    // L'intro « Bienvenue » se joue à chaque chargement/refresh, ~2s, puis se cache
    document.body.style.overflow = 'hidden'

    // Welcome -> Exit (sortie déclenchée après un temps de lecture court)
    const timer2 = setTimeout(() => {
      setStep(2)
    }, 1800)

    // Démontage complet une fois l'animation de sortie terminée
    const timer3 = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = ''
    }, 2300)

    return () => {
      clearTimeout(timer2)
      clearTimeout(timer3)
      document.body.style.overflow = ''
    }
  }, [])

  if (!show) return null

  return (
    <AnimatePresence>
      {step < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -60,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#fdf8ee] via-[#F4F3EE] to-[#f9edcc] overflow-hidden"
        >
          {/* ================= PREMIUM GRADIENT MESH BACKGROUND ================= */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Glowing Golden Orb */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 -left-10 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#F5A623]/12 blur-[100px] sm:blur-[140px]"
            />

            {/* Glowing Graphite Orb */}
            <motion.div
              animate={{
                scale: [1.1, 0.9, 1.1],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-10 -right-10 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#58595B]/10 blur-[100px] sm:blur-[140px]"
            />

            {/* Elegant grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(245,166,35,0.14) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(245,166,35,0.14) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
              }}
            />
          </div>

          {/* ================= CONTENT CONTAINER ================= */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center font-[family-name:var(--font-inter)]">
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="flex items-center gap-4 mb-6"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
                  className="h-px bg-gradient-to-r from-transparent to-[#F5A623]/70"
                />
                <p className="font-[family-name:var(--font-inter)] text-[11px] sm:text-sm font-semibold uppercase tracking-[0.4em] bg-gradient-to-r from-[#58595B] via-[#F5A623] to-[#58595B] bg-clip-text text-transparent">
                  Bienvenue sur le site
                </p>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
                  className="h-px bg-gradient-to-l from-transparent to-[#F5A623]/70"
                />
              </motion.div>

              {/* Logo with premium gold glow */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="drop-shadow-[0_10px_45px_rgba(245,166,35,0.25)]"
              >
                <Image
                  src="/logo.png"
                  alt="Industry X.0"
                  width={640}
                  height={237}
                  priority
                  className="w-[280px] sm:w-[420px] lg:w-[520px] h-auto"
                />
              </motion.div>

              {/* Decorative thin accent line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                className="h-[2px] bg-gradient-to-r from-transparent via-[#F5A623] to-transparent mt-6"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
