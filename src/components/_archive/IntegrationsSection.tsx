'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const logos = [
  '/image1.png',
  '/image3.png',
  '/image4.png',
  '/image5.png',
  '/image6.png',
]

function LogoCard({ src }: { src: string }) {
  return (
    <div className="group flex items-center justify-center mx-5">
      <div className="relative w-40 h-24 sm:w-44 sm:h-26 md:w-48 md:h-28
                      bg-white border border-black/[0.06] rounded-2xl 
                      shadow-sm flex items-center justify-center
                      transition-all duration-300
                      hover:shadow-lg hover:border-gold/30
                      hover:scale-[1.06]">

        <Image
          src={src}
          alt="integration logo"
          fill
          className="object-contain p-5 grayscale group-hover:grayscale-0 transition"
        />

      </div>
    </div>
  )
}

export default function IntegrationsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const doubled = [...logos, ...logos]

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-white py-28 sm:py-32 lg:py-36"
    >

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">



        {/* ================= LOGOS MARQUEE (AGRANDIE) ================= */}
        <div className="relative overflow-hidden py-8">

          {/* fade edges plus large */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-marquee w-max items-center py-6">
            {doubled.map((logo, i) => (
              <LogoCard key={i} src={logo} />
            ))}
          </div>

        </div>

        {/* ================= FOOT NOTE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-dark/60 text-sm">
            🔗 Intégration fluide avec votre écosystème industriel existant
          </p>
        </motion.div>

      </div>
    </section>
  )
}