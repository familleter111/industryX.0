'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface Orb {
  color: string
  size: number
  position: { top?: string; bottom?: string; left?: string; right?: string }
  duration?: number
  /** amplitude, in px, of the scroll-linked parallax drift */
  parallax?: number
}

interface AnimatedMeshBackgroundProps {
  orbs: Orb[]
  /** CSS background for the base layer, e.g. a linear-gradient */
  gradient?: string
  grid?: boolean
  gridColor?: string
  className?: string
}

function ParallaxOrb({
  orb,
  scrollYProgress,
  delay,
}: {
  orb: Orb
  scrollYProgress: MotionValue<number>
  delay: number
}) {
  const amplitude = orb.parallax ?? 40
  const y = useTransform(scrollYProgress, [0, 1], [-amplitude, amplitude])

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...orb.position,
        width: orb.size,
        height: orb.size,
        borderRadius: '9999px',
        background: orb.color,
        filter: 'blur(140px)',
        y,
      }}
      animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
      transition={{ duration: orb.duration ?? 10, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/** Fond animé partagé — orbes en dérive lente + parallax léger au scroll, inspiré des meshs animés de stripe.com. */
export default function AnimatedMeshBackground({
  orbs,
  gradient,
  grid = true,
  gridColor = 'rgba(15,23,42,0.12)',
  className = '',
}: AnimatedMeshBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {gradient && <div className="absolute inset-0" style={{ background: gradient }} />}

      {orbs.map((orb, i) => (
        <ParallaxOrb key={i} orb={orb} scrollYProgress={scrollYProgress} delay={i * 0.6} />
      ))}

      {grid && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
          }}
        />
      )}
    </div>
  )
}
