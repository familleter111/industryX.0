'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import Footer from '@/components/layout/Footer'

/* ============================================================
   DONNÉES
   ============================================================ */

/** Les deux repères sous le discours d’ouverture. */
const IDENTITY_FACTS = [
  { value: '2019', label: 'Création' },
  { value: 'Industrie', label: 'Notre terrain' },
]

/** Colonne de gauche de la bande sombre : ce sur quoi la maison repose. */
const PILLARS = ['Humain', 'Technologie', 'Impact durable']

/* ============================================================
   OUVERTURE — UN SEUL ÉCRAN

   Trois zones, une seule hauteur d’écran : le discours à gauche sur un
   panneau clair, la photo à droite jusqu’au bord de la fenêtre, et la
   profession de foi en bande sombre au pied.

   La hauteur est `min-h`, pas `h`. Les tailles de titre et les
   respirations sont bornées en `vh` autant qu’en `vw` : le bloc se pose
   sur un écran des fenêtres de 700 px de haut aux plus grandes, et
   s’allonge au lieu de se faire couper sur plus court — un texte tronqué
   est un défaut plus grave qu’un demi-tour de molette.

   Sous `lg`, la photo passe au-dessus du texte et la page défile : un
   titre de quatre lignes, un paragraphe, deux repères et trois phrases
   ne tiennent pas sur un écran de téléphone sans devenir illisibles.
   ============================================================ */

function AboutScreen() {
  const ease = [0.22, 1, 0.36, 1] as const

  /* Entrée au montage plutôt qu’au scroll : le bloc occupe l’écran
     entier, un `whileInView` se déclencherait de toute façon aussitôt,
     au prix d’un observateur. */
  const rise = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section className="flex flex-col bg-white pt-[82px] lg:min-h-[100svh]">
      {/* ==================== HAUT — DISCOURS ET PHOTO ==================== */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)]">

        {/* ---------- Panneau de gauche ---------- */}
        <div className="relative flex flex-col justify-center overflow-hidden px-5 py-12 sm:px-7 lg:px-[clamp(2rem,3.4vw,4rem)] lg:py-[clamp(1.5rem,4vh,3.5rem)]">
          {/* Deux traits dorés en biais, seule ornementation du panneau.
              Décoratifs : hors du flux et hors de l’arbre d’accessibilité. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-10 hidden h-[140%] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-gold/35 to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-10 hidden h-[140%] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-gold/15 to-transparent lg:block"
          />

          <div className="relative z-10 mx-auto w-full max-w-[36rem] lg:mx-0">
            {/* SUR-TITRE */}
            <motion.p
              {...rise}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]"
            >
              À propos de nous
              <span className="h-px w-14 bg-gold/70" />
            </motion.p>

            {/* TITRE */}
            <motion.h1
              {...rise}
              transition={{ duration: 0.55, delay: 0.06, ease }}
              className="mt-[clamp(1rem,2.2vh,1.75rem)] font-display font-black leading-[1.06] tracking-[-0.04em] text-[#111827] text-[clamp(30px,7.4vw,42px)] lg:text-[clamp(30px,min(3.05vw,5.6vh),52px)]"
            >
              L’industrie avance quand le terrain et la technologie parlent{' '}
              <span className="text-gold">le même langage.</span>
            </motion.h1>

            {/* CHAPEAU */}
            <motion.p
              {...rise}
              transition={{ duration: 0.55, delay: 0.12, ease }}
              className="mt-[clamp(1rem,2.4vh,1.75rem)] max-w-[32rem] text-[14.5px] leading-[1.7] text-muted sm:text-[15.5px]"
            >
              Depuis 2019, Industry X.0 transforme l’expertise opérationnelle en
              solutions digitales concrètes, simples à déployer et conçues pour
              durer.
            </motion.p>

            {/* REPÈRES */}
            <motion.dl
              {...rise}
              transition={{ duration: 0.55, delay: 0.18, ease }}
              className="mt-[clamp(1.5rem,3.4vh,2.75rem)] grid max-w-[26rem] grid-cols-2 divide-x divide-gold/25"
            >
              {IDENTITY_FACTS.map((fact, index) => (
                <div key={fact.label} className={index === 0 ? 'pr-7' : 'pl-7'}>
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="block font-display font-black leading-none tracking-[-0.035em] text-[#111827] text-[clamp(24px,min(2vw,3.8vh),32px)]">
                      {fact.value}
                    </span>
                    <span className="mt-3 block h-px w-full bg-cream-deep" />
                    <span className="mt-3 block text-[13px] text-muted sm:text-[13.5px]">
                      {fact.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        {/* ---------- Photo ----------

            Un seul PNG, composition comprise : les deux étiquettes
            « des industries plus humaines » et « l’IA au service d’un réel
            durable », vignettes incluses, sont aplaties dans le fichier.

            `fill` + `object-cover` : la photo prend toute la cellule quelle
            que soit la hauteur d’écran, et va jusqu’au bord de la fenêtre —
            c’est le débord qui donne son ampleur au bloc. La cellule a une
            hauteur définie sous `lg` seulement (la ligne de grille s’étire) ;
            au-dessus il faut la lui donner, sans quoi `fill` mesure zéro. */}
        <div className="relative h-[46vh] min-h-[300px] lg:h-auto lg:min-h-0">
          <Image
            src="/about1.png"
            alt="Un technicien casqué, une ingénieure qualité en blouse et un responsable portant un ordinateur avancent côte à côte dans une allée d’usine, en pleine discussion. Deux étiquettes se détachent : « des industries plus humaines, plus performantes » et « l’IA au service d’un réel durable »."
            fill
            priority
            sizes="(min-width: 1024px) 57vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* ==================== BAS — PROFESSION DE FOI ==================== */}
      <motion.div
        {...rise}
        transition={{ duration: 0.55, delay: 0.24, ease }}
        className="relative overflow-hidden bg-dark py-[clamp(1.75rem,4.2vh,3rem)]"
      >
        {/* Halo et monogramme, décoratifs. Le X est posé en pur CSS plutôt
            qu’en image : deux barres tournées coûtent moins qu’un fichier. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[220px] w-[220px] -translate-y-1/2 lg:block"
        >
          <span className="absolute left-1/2 top-0 h-full w-px rotate-[38deg] bg-white/[0.07]" />
          <span className="absolute left-1/2 top-0 h-full w-px -rotate-[38deg] bg-white/[0.07]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-8 px-5 sm:px-7 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-12 lg:px-10">
          {/* PILIERS */}
          <ul className="flex flex-wrap gap-x-6 gap-y-1 border-l-2 border-gold/70 pl-5 text-[10px] font-bold uppercase leading-[2] tracking-[0.18em] text-white/55 lg:block lg:text-[11px]">
            {PILLARS.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>

          {/* PHRASE */}
          <div className="text-center">
            <p className="font-display font-medium leading-[1.35] tracking-[-0.02em] text-white text-[clamp(18px,4.4vw,24px)] lg:text-[clamp(18px,min(1.85vw,3.4vh),30px)]">
              Nous ne digitalisons pas des processus abstraits.
            </p>
            <p className="mt-1 font-display font-bold leading-[1.35] tracking-[-0.02em] text-gold text-[clamp(18px,4.4vw,24px)] lg:text-[clamp(18px,min(1.85vw,3.4vh),30px)]">
              Nous outillons les femmes et les hommes qui font vivre
              l’industrie.
            </p>
            <span className="mx-auto mt-5 block h-[2px] w-16 rounded-full bg-gold/70" />
          </div>

          {/* SIGNATURE */}
          <p className="border-l-2 border-gold/70 pl-5 text-[10px] font-bold uppercase leading-[2] tracking-[0.18em] text-white/55 lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-5 lg:text-right lg:text-[11px]">
            Le réel
            <br />
            nous inspire
          </p>
        </div>
      </motion.div>
    </section>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function EntreprisePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-body text-dark selection:bg-gold/30">

      <AboutScreen />

      <Footer />

    </main>
  )
}
