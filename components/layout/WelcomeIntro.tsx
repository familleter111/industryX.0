'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const HOLD_MS = 1800
const EXIT_S = 0.5

export default function WelcomeIntro() {
  const reduceMotion = useReducedMotion()
  // `visible` déclenche la sortie, `mounted` retire réellement le noeud du DOM.
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    // prefers-reduced-motion : pas d'intro du tout.
    if (reduceMotion) {
      setVisible(false)
      setMounted(false)
      return
    }
    const timer = setTimeout(() => setVisible(false), HOLD_MS)
    return () => clearTimeout(timer)
  }, [reduceMotion])

  if (!mounted) return null

  return (
    <AnimatePresence onExitComplete={() => setMounted(false)}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -60,
            transition: { duration: EXIT_S, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gold-50 via-cream to-gold-100 motion-reduce:hidden"
        >
          {/* ================= PREMIUM GRADIENT MESH BACKGROUND ================= */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Glowing Golden Orb */}
            <motion.div
              animate={reduceMotion ? undefined : {
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 -left-10 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-gold/12 blur-[100px] sm:blur-[140px]"
            />

            {/* Glowing Graphite Orb */}
            <motion.div
              animate={reduceMotion ? undefined : {
                scale: [1.1, 0.9, 1.1],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-10 -right-10 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-stone-600/10 blur-[100px] sm:blur-[140px]"
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
                  className="h-px bg-gradient-to-r from-transparent to-gold/70"
                />
                <p className="font-[family-name:var(--font-inter)] text-[11px] sm:text-sm font-semibold uppercase tracking-[0.4em] bg-gradient-to-r from-stone-600 via-gold to-stone-600 bg-clip-text text-transparent">
                  Bienvenue sur le site
                </p>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
                  className="h-px bg-gradient-to-l from-transparent to-gold/70"
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
                className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mt-6"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
