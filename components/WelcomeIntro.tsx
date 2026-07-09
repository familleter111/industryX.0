'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cog } from 'lucide-react'

export default function WelcomeIntro() {
  const [show, setShow] = useState(true)
  const [step, setStep] = useState(0) // 0: Hello, 1: Welcome message, 2: Exit

  useEffect(() => {
    // Disable body scroll while intro is playing
    document.body.style.overflow = 'hidden'

    // Step 0 -> Step 1 (Hello -> Welcome message) after 1.2s
    const timer1 = setTimeout(() => {
      setStep(1)
    }, 1200)

    // Step 1 -> Step 2 (Exit) after 3.2s
    const timer2 = setTimeout(() => {
      setStep(2)
    }, 3200)

    // Unmount completely after 4.0s
    const timer3 = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = ''
    }, 4000)

    return () => {
      clearTimeout(timer1)
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
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
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
              className="absolute -top-10 -left-10 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#DAA250]/10 blur-[100px] sm:blur-[140px]"
            />

            {/* Glowing Green Orb */}
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
              className="absolute -bottom-10 -right-10 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#22C55E]/8 blur-[100px] sm:blur-[140px]"
            />

            {/* Elegant grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(218,162,80,0.12) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(218,162,80,0.12) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
              }}
            />
          </div>

          {/* ================= CONTENT CONTAINER ================= */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center font-[family-name:var(--font-inter)]">
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div
                  key="hello"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  {/* Glowing Gear Outline */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="mb-6 text-[#DAA250]/60"
                  >
                    <Cog size={44} strokeWidth={1.5} />
                  </motion.div>

                  <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-[#0C0D12]">
                    Hello
                    <span className="text-[#DAA250]">.</span>
                  </h1>
                </motion.div>
              ) : (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  {/* Rotating Cog with premium gold glow */}
                  <motion.div
                    initial={{ scale: 0.6, rotate: -45 }}
                    animate={{ scale: 1, rotate: 180 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 p-4 rounded-3xl border border-[#DAA250]/30 bg-white/65 backdrop-blur-md shadow-[0_10px_35px_rgba(218,162,80,0.12)] text-[#DAA250]"
                  >
                    <Cog size={48} strokeWidth={1.8} className="animate-[spin_20s_linear_infinite]" />
                  </motion.div>

                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#78716C] mb-3">
                    Bienvenue sur le site
                  </p>

                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-[#0C0D12]">
                    Industry <span className="text-[#DAA250]">X.0</span>
                  </h2>

                  {/* Decorative thin accent line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-[#DAA250] to-transparent mt-6"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
