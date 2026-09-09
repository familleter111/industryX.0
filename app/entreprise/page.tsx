'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BarChart3, Database, Users } from 'lucide-react'

import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
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

/**
 * Les trois temps de la mission. Le titre est stocke en deux lignes plutot
 * qu'en une chaine : la coupure fait partie du dessin des cartes, et la
 * laisser au moteur de rendu donnerait trois cartes de hauteurs differentes.
 */
const MISSION_STEPS = [
  {
    num: '01',
    icon: Users,
    titleLines: ['Comprendre', 'le terrain'],
    desc: 'Écouter, observer, co-construire avec les équipes.',
  },
  {
    num: '02',
    icon: Database,
    titleLines: ['Connecter', 'les données'],
    desc: 'Transformer les données en informations utiles.',
  },
  {
    num: '03',
    icon: BarChart3,
    titleLines: ['Accélérer', 'l’amélioration'],
    desc: 'Des solutions concrètes pour des impacts durables.',
  },
]

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
   NOTRE MISSION

   Même partition que l’ouverture — le discours à gauche, la photo à
   droite jusqu’au bord de la fenêtre — mais la section respire sur sa
   propre hauteur : trois cartes, un titre et une signature n’ont aucune
   raison d’être comprimés dans un écran.

   Le biseau blanc sur le bord gauche de la photo est un simple triangle
   en `clip-path`, posé par-dessus : la photo reste rectangulaire, donc
   `object-cover` continue de la recadrer proprement à toute hauteur.
   ============================================================ */

function MissionSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">

        {/* ---------- Panneau de gauche ---------- */}
        <div className="relative px-5 py-16 sm:px-7 sm:py-20 lg:px-[clamp(2rem,3.4vw,4rem)] lg:py-24">
          {/* Deux traits dorés en biais, seule ornementation du panneau.
              Décoratifs : hors du flux et hors de l’arbre d’accessibilité. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 hidden h-[150%] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-gold/30 to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-20 hidden h-[150%] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-gold/12 to-transparent lg:block"
          />

          <div className="relative z-10">
            {/* ---------- Titre et devise ---------- */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12"
            >
              <div>
                <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
                  Notre mission
                  <span className="h-px w-14 bg-gold/70" />
                </p>

                <h2 className="mt-6 max-w-[19ch] font-display text-[30px] font-black leading-[1.06] tracking-[-0.04em] text-[#111827] sm:text-[38px] lg:text-[clamp(34px,3vw,48px)]">
                  Rendre l’excellence opérationnelle accessible,{' '}
                  <span className="text-gold">mesurable et continue.</span>
                </h2>
              </div>

              {/* Devise en colonne étroite, à hauteur du titre. Absente sous
                  `lg` : empilée, elle ne serait plus qu’une ligne de plus. */}
              <p className="hidden max-w-[9rem] text-[10px] font-bold uppercase leading-[2] tracking-[0.18em] text-muted lg:block">
                Des solutions concrètes pour un impact durable
                <span className="mt-4 block h-px w-10 bg-gold" />
              </p>
            </motion.div>

            {/* ---------- Les trois temps ---------- */}
            <motion.ol
              variants={staggerContainer()}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-14"
            >
              {MISSION_STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <motion.li
                    key={step.num}
                    variants={fadeUp}
                    className="rounded-[20px] border border-cream-border bg-cream/40 p-6 shadow-[0_10px_30px_rgba(12,13,18,0.04)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Icon
                        size={34}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-gold"
                      />
                      <span className="font-display text-[13px] font-bold tracking-[0.02em] text-gold">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-[19px] font-black leading-[1.2] tracking-[-0.03em] text-[#111827] sm:text-[20px]">
                      {step.titleLines[0]}
                      <br />
                      {step.titleLines[1]}
                    </h3>

                    <span className="mt-5 block h-[2px] w-9 rounded-full bg-gold" />

                    <p className="mt-4 text-[13.5px] leading-[1.65] text-muted">
                      {step.desc}
                    </p>
                  </motion.li>
                )
              })}
            </motion.ol>

            {/* ---------- Signature ----------

                Un seul PNG : le filet doré, les trois piliers et la devise
                manuscrite. Le manuscrit est ce qui justifie l’image — le
                site ne charge que Syne, Outfit et Inter, aucune n’a de
                cursive, et embarquer une quatrième fonte pour cinq mots
                coûterait plus cher que ce fichier. */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-12 lg:mt-14"
            >
              <Image
                src="/about3.png"
                alt="L’humain, la technologie, un meilleur demain — le réel nous inspire."
                width={2172}
                height={724}
                sizes="(min-width: 1024px) 620px, 100vw"
                className="h-auto w-full max-w-[620px]"
              />
            </motion.div>
          </div>
        </div>

        {/* ---------- Photo ----------

            Un seul PNG, composition comprise : la carte « des industries
            plus humaines » et la signature « people / data / real impact »
            sont aplaties dans le fichier.

            La cellule a une hauteur définie sous `lg` seulement (la ligne
            de grille s’étire) ; au-dessus il faut la lui donner, sans quoi
            `fill` mesure zéro. */}
        <div className="relative h-[52vh] min-h-[340px] lg:h-auto lg:min-h-0">
          <Image
            src="/about2.png"
            alt="Trois collaborateurs Industry X.0 — une technicienne, un ingénieur en blouse et un opérateur — penchés sur une tablette au bord d’une ligne d’assemblage, devant un écran de performance. Une étiquette annonce « des industries plus humaines, plus performantes »."
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover object-center"
          />

          {/* Biseau blanc : c’est lui qui donne son oblique à la lisière
              entre le panneau et la photo. Décoratif. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-px hidden w-[110px] bg-white lg:block"
            style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          />
        </div>
      </div>
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

      <MissionSection />

      <Footer />

    </main>
  )
}
