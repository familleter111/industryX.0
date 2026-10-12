'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react'

import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { platformPage } from '@/lib/data/platform'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

const COPY = {
  fr: { demo: 'Planifier une démo', uses: 'Voir les usages' },
  en: { demo: 'Book a demo', uses: 'See the use cases' },
}
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/hooks/useMotion'

/** Fondu des quatre bords du visuel (deux degrades croises). */
const EDGE_FADE =
  'linear-gradient(to right, transparent, black 7%, black 93%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)'

/**
 * Hero des pages Plateforme, calque sur celui de l'accueil
 * (components/sections/Hero) : fond creme et mesh anime, texte a gauche,
 * visuel a droite, bouton sombre a halo dore et bouton clair.
 *
 * Les visuels (public/cipa-*.png) ont un fond creme : `mix-blend-multiply`
 * les fond dans la section, comme l'image de l'accueil.
 *
 * Seul le slug traverse la frontiere serveur / client (icones Lucide dans la
 * donnee).
 */
export default function PlatformHero({ slug }: { slug: string }) {
  const m = useMotion()
  const t = useCopy(COPY)
  const page = platformPage(slug, useCurrentLocale())
  if (!page) return null

  return (
    <section className="relative overflow-hidden bg-cream pb-12 pt-[106px] sm:pt-[114px] lg:pb-16 lg:pt-28">
      <AnimatedMeshBackground
        gradient={tokens.gradient.section}
        orbs={[
          { color: 'rgba(34,197,94,0.10)', size: 420, position: { left: '0', top: '40px' }, duration: 11, parallax: 30 },
          { color: 'rgba(218,162,80,0.10)', size: 420, position: { right: '0', bottom: '0' }, duration: 13, parallax: 40 },
        ]}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_1.3fr] lg:gap-8 xl:grid-cols-[0.95fr_1.5fr] lg:px-10">
        {/* TEXTE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center lg:text-left"
        >
          <div
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-2 sm:px-5 sm:py-2.5"
            style={{
              background: 'rgba(255,255,255,0.74)',
              borderColor: 'rgba(15,23,42,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-subtle sm:text-[11px] sm:tracking-[0.18em]">
              {page.menuTitle}
            </span>
          </div>

          <h1
            className="font-black leading-[1.04] tracking-[-0.06em] text-gray-900"
            style={{ fontSize: 'clamp(2rem,3.6vw,3.25rem)' }}
          >
            <span className="block">{page.title}</span>
            {/* `gold.deep` : l'or de marque tombe a 2,04:1 sur le creme, sous
                le seuil de 3:1 du texte large (voir lib/tokens.ts). */}
            <span
              className="block"
              style={{
                color: tokens.color.gold.deep,
                textShadow: '0 10px 30px rgba(218,162,80,0.16)',
              }}
            >
              {page.accent}
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-[46ch] leading-[1.9] text-stone-600 lg:mx-0"
            style={{ fontSize: 'clamp(.95rem,1.25vw,1.06rem)' }}
          >
            {page.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-8 py-4 text-[14px] font-bold transition-all duration-500 lg:px-5 xl:px-8 hover:-translate-y-1"
              style={{
                background: tokens.color.dark.DEFAULT,
                color: tokens.color.gold.DEFAULT,
                boxShadow: '0 18px 45px rgba(15,23,42,0.18)',
              }}
            >
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(218,162,80,0.45) 0%, transparent 72%)',
                }}
              />
              <span
                className="absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(135deg, ${tokens.color.gold.DEFAULT} 0%, ${tokens.color.gold[300]} 100%)`,
                }}
              />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-gray-900">
                {t.demo}
              </span>
              <ArrowRight
                size={15}
                className="relative z-10 ml-2 shrink-0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gray-900"
              />
            </Link>

            <a
              href="#usages"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border px-8 py-4 text-[14px] font-bold transition-all duration-300 lg:px-5 xl:px-8 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.75)',
                borderColor: 'rgba(15,23,42,0.08)',
                color: tokens.color.dark.DEFAULT,
                backdropFilter: 'blur(12px)',
              }}
            >
              <PlayCircle size={17} className="shrink-0" />
              {t.uses}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 lg:justify-start">
            {page.highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-green-500" />
                <span className="text-[13px] font-medium text-stone-600">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* VISUEL — le fond creme de l'image se fond dans le degrade de la
            section : `mix-blend-multiply` pour la teinte, et un masque qui
            efface les bords pour qu'aucun rectangle ne se dessine. */}
        <motion.div variants={m.scaleIn} initial="hidden" animate="visible" className="relative z-10">
          <div
            className="lg:origin-center lg:translate-x-6 lg:scale-[1.06]"
            style={{
              maskImage: EDGE_FADE,
              WebkitMaskImage: EDGE_FADE,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <Image
              src={page.image.src}
              alt={page.image.alt}
              width={3200}
              height={2000}
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="h-auto w-full mix-blend-multiply"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
