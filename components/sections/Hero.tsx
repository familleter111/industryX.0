'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react'
import AnimatedMeshBackground from '@/components/ui/AnimatedMeshBackground'
import { CLIENT_LOGOS } from '@/lib/data/clientLogos'
import LogoMarquee from '@/components/ui/LogoMarquee'
import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'

/*
 * Logos clients : source unique dans components/clientLogos.ts.
 * `logoFrameWidth` inscrit le contenu réel de chaque fichier dans une même
 * boîte, ce qui égalise la taille perçue malgré des marges internes qui vont
 * du simple au septuple d'un logo à l'autre.
 */
const PILLS = [
  'Conformité & qualité',
  'Temps réel',
  'Traçabilité complète',
]



export default function Hero() {
  const m = useMotion()
  return (
    <section className="relative overflow-hidden bg-cream pt-[106px] sm:pt-[114px] lg:pt-28 pb-6 lg:pb-8">
      {/* Le Hero n'utilise pas <Section> : son padding haut degage la navbar
          fixe et son padding bas est volontairement asymetrique, deux
          contraintes que l'echelle de rythme ne doit pas connaitre. Le fond,
          lui, suit l'alternance.

          Le padding haut est superieur aux 82 px de la navbar fixe : en
          dessous, le badge passait sous la barre au chargement, sans scroll
          pour l'en sortir. Valeur arbitraire assumee — elle suit la hauteur
          de la navbar, pas l'echelle d'espacement. */}
      {/* BACKGROUND — mesh animé avec parallax léger au scroll */}
      <AnimatedMeshBackground
        gradient={tokens.gradient.section}
        orbs={[
          { color: 'rgba(34,197,94,0.10)', size: 420, position: { left: '0', top: '40px' }, duration: 11, parallax: 30 },
          { color: 'rgba(218,162,80,0.10)', size: 420, position: { right: '0', bottom: '0' }, duration: 13, parallax: 40 },
        ]}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:gap-6 lg:grid-cols-[0.9fr_1.7fr] px-4 sm:px-6 lg:px-10">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 text-center lg:text-left"
        >
          {/* BADGE */}

          <div
            className="
              mb-6 inline-flex max-w-full items-center gap-2
              rounded-full border
              px-3.5 py-2 sm:px-5 sm:py-2.5
            "
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

            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.18em] text-subtle">
              Plateforme d&apos;intelligence opérationnelle
            </span>
          </div>

          {/* TITLE */}

          <h1 className="font-black leading-[1.04] tracking-[-0.06em] text-gray-900">
            {/* LIGNE 1 */}
            <span
              className="block sm:whitespace-nowrap"
              style={{ fontSize: 'clamp(1.5rem,2.7vw,2.5rem)' }}
            >
              Vos opérations
            </span>

            {/* LIGNE 2 */}
            <span
              className="block sm:whitespace-nowrap"
              style={{ fontSize: 'clamp(1.5rem,2.7vw,2.5rem)' }}
            >
              sont complexes.
            </span>

            {/* LIGNE 3 */}
            <span
              className="mt-3 block sm:whitespace-nowrap"
              style={{ fontSize: 'clamp(1.5rem,2.7vw,2.5rem)' }}
            >
              Nous les transformons
            </span>

            {/* LIGNE 4 */}
            <span
              className="block font-black sm:whitespace-nowrap"
              style={{ fontSize: 'clamp(1.5rem,2.7vw,2.5rem)' }}
            >
              en{' '}
              {/* `gold.deep`, pas `gold.DEFAULT` : l'or de marque tombe a
                  2,04:1 sur le creme, quand le seuil du texte large est a 3:1.
                  Meme teinte, meme saturation, luminosite plus basse — voir le
                  contrat de contraste dans lib/tokens.ts. Le halo, lui, garde
                  l'or de marque : c'est une lueur, pas du texte. */}
              <span
                style={{
                  color: tokens.color.gold.deep,
                  textShadow: '0 10px 30px rgba(218,162,80,0.16)',
                }}
              >
                système pilotable.
              </span>
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="mt-6 mx-auto lg:mx-0 max-w-[42ch] leading-[1.9] text-stone-600"
            style={{
              fontSize: 'clamp(.95rem,1.25vw,1.06rem)',
            }}
          >
            CIPA structure la donnée terrain,
            orchestre les processus critiques et
            active l&apos;IA pour améliorer les
            opérations industrielles en continu.
          </p>

          {/* CTA */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            {/* PRIMARY BUTTON */}

            <Link
              href="/contact"
              className="
                group relative inline-flex items-center
                justify-center overflow-hidden
                rounded-full px-8 py-4
                text-[14px] font-bold
                transition-all duration-500
                hover:-translate-y-1
              "
              style={{
                background: tokens.color.dark.DEFAULT,
                color: tokens.color.gold.DEFAULT,
                boxShadow:
                  '0 18px 45px rgba(15,23,42,0.18)',
              }}
            >
              {/* GOLD SUN EFFECT */}

              <span
                className="
                  absolute inset-0 opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(218,162,80,0.45) 0%, transparent 72%)',
                }}
              />

              {/* COLOR SWITCH */}

              <span
                className="
                  absolute inset-0 scale-x-0
                  origin-left rounded-full
                  transition-transform duration-500
                  group-hover:scale-x-100
                "
                style={{
                  background:
                    `linear-gradient(135deg, ${tokens.color.gold.DEFAULT} 0%, ${tokens.color.gold[300]} 100%)`,
                }}
              />

              <span
                className="
                  relative z-10 transition-colors
                  duration-500 group-hover:text-gray-900
                "
              >
                Planifier une démo
              </span>

              <ArrowRight
                size={15}
                className="
                  relative z-10 ml-2
                  transition-all duration-500
                  group-hover:translate-x-1
                  group-hover:text-gray-900
                "
              />
            </Link>

            {/* SECONDARY BUTTON */}

            <Link
              href="/solutions/cipa"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full border
                px-8 py-4
                text-[14px] font-bold
                transition-all duration-300
                hover:-translate-y-0.5
              "
              style={{
                background: 'rgba(255,255,255,0.75)',
                borderColor: 'rgba(15,23,42,0.08)',
                color: tokens.color.dark.DEFAULT,
                backdropFilter: 'blur(12px)',
              }}
            >
              <PlayCircle size={17} />
              Voir la plateforme
            </Link>
          </div>

          {/* DISCREET INFOS */}

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
            {PILLS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2"
              >
                <CheckCircle2
                  size={15}
                  className="text-green-500"
                />

                <span className="text-[13px] font-medium text-stone-600">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          variants={m.scaleIn}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* Conteneur isolé à la couleur de la section : le fond blanc de
              l'image se fond dans la section via mix-blend-multiply.
              Agrandi et décalé un peu vers la droite sur grand écran. */}
          <div
            className="overflow-hidden bg-stone-100 lg:origin-center lg:translate-x-10 lg:scale-110"
            style={{ isolation: 'isolate' }}
          >
            <Image
              src="/hero.png"
              alt="Plateforme CIPA — pilotage des opérations industrielles"
              width={1448}
              height={1086}
              priority
              className="h-auto w-full mix-blend-multiply"
            />
          </div>
        </motion.div>
      </div>

      {/* PARTNER LOGOS MARQUEE — déplacée depuis CIPA (#2) */}
      <motion.div
        variants={m.fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={m.viewport}
        className="relative z-10 mt-8 w-full sm:mt-12"
      >
        <p className="mb-4 text-center text-[13px] text-stone-600">
          Ils nous font confiance
        </p>

        <LogoMarquee logos={CLIENT_LOGOS} />
      </motion.div>

      {/*
        AFFORDANCE DE SCROLL.

        Le Hero n'est pas contraint a 100vh — il n'a ni `min-h-screen` ni
        `100dvh` — et sous 1024 px il depasse deja la fenetre : la coupure du
        contenu suffit alors a dire qu'il y a une suite. C'est au-dessus, sur
        les grands ecrans, que la bande de logos peut tomber pile en bas de
        fenetre et donner une fin nette. D'ou `hidden lg:flex`.

        `aria-hidden` et `pointer-events-none` : purement decoratif, aucune
        cible de plus au clavier, aucun mot de plus a la synthese vocale. En
        `absolute`, il ne prend pas de place dans le flux — la mise en page
        est inchangee.

        `animate-bounce` est une animation Tailwind native : sous
        `prefers-reduced-motion` la regle globale de globals.css la ramene a
        0,01 ms et le chevron reste immobile.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-4 z-10 hidden justify-center lg:flex"
      >
        <ChevronDown
          size={22}
          strokeWidth={2.5}
          className="animate-bounce text-subtle"
        />
      </div>
    </section>
  )
}