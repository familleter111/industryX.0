'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Database, Settings, Users } from 'lucide-react'

import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
import styles from './mission.module.css'
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
 * Les trois temps du parcours. `year` n'est pas toujours une annee — c'est
 * le reperage de l'etape, et « aujourd'hui » comme « demain » en sont.
 */
const JOURNEY = [
  {
    year: '2019',
    label: 'Création',
    desc: 'Une idée née d’un constat terrain : beaucoup de potentiel, encore trop de frictions entre l’opérationnel et le digital.',
  },
  {
    year: 'Aujourd’hui',
    label: 'Une plateforme qui fait la différence',
    desc: 'Des solutions déployées dans des environnements industriels exigeants en Tunisie et à l’international.',
  },
  {
    year: 'Demain',
    label: 'Plus d’impact, ensemble',
    desc: 'Continuer à innover pour une industrie plus agile, plus sûre et plus durable.',
  },
]

/**
 * Les quatre secteurs. Chaque photo porte sa legende incrustee — « des
 * solutions pour la sante de demain » et les trois autres — d'ou un `alt`
 * qui la reprend : ce texte n'existe que dans les pixels.
 */
const EXPERTISE_FIELDS = [
  {
    src: '/sol1.png',
    title: 'Life Sciences',
    claim: 'Qualité. Conformité. Traçabilité.',
    alt: 'Une opératrice en salle blanche prélève un flacon sur une ligne de conditionnement pharmaceutique. Légende : des solutions pour la santé de demain.',
  },
  {
    src: '/sol2.png',
    title: 'Agroalimentaire',
    claim: 'Sécurité. Performance. Durabilité.',
    alt: 'Des barquettes de fruits et légumes frais défilent sur un convoyeur, sous la surveillance d’un opérateur en blouse. Légende : une alimentation plus sûre et plus durable.',
  },
  {
    src: '/sol3.png',
    title: 'Automobile',
    claim: 'Fiabilité. Productivité. Excellence.',
    alt: 'Une caisse de voiture en cours d’assemblage sur une ligne robotisée. Légende : l’industrie en mouvement vers un avenir plus durable.',
  },
  {
    src: '/sol4.png',
    title: 'Aéronautique',
    claim: 'Précision. Fiabilité. Hautes exigences.',
    alt: 'Un réacteur d’avion en atelier de montage, un technicien Industry X.0 au second plan. Légende : des horizons plus sûrs grâce à une technologie maîtrisée.',
  },
]

/**
 * Les deux gris-bleus de la maquette « Nos valeurs ». Ils ne viennent pas
 * de la charte du site, qui n'a que des gris chauds : ce sont les couleurs
 * relevées sur les cartes fournies, et la demande est de les respecter.
 */
// check-hex-ignore
const VALUE_INK = '#14204A'
// check-hex-ignore
const VALUE_BODY = '#3A3F55'

/**
 * Biseau du haut de la photo. Deux polygones plutôt qu'un : le cadre porte
 * le premier et un aplat doré, la photo le second, décalé de 3 px. La bande
 * dorée qui apparaît entre les deux est le filet oblique du dessin.
 */
const PHOTO_BEVEL = 'polygon(0 12%, 100% 0, 100% 100%, 0 100%)'
const PHOTO_BEVEL_INNER =
  'polygon(0 calc(12% + 3px), 100% 3px, 100% 100%, 0 100%)'

/**
 * Les quatre valeurs.
 *
 * Tout est écrit ici sauf la photo : numéro, filet, titre et texte sont du
 * HTML. Le fichier jo*.png n'apporte plus que l'image et la légende qui y
 * est incrustée — d'où un `alt` qui reprend cette légende, seul endroit où
 * elle existe autrement qu'en pixels.
 *
 * `bg` est le blanc du fichier lui-même, relevé sur sa bande de légende.
 * Les quatre exports ne partagent pas le même : poser du blanc pur derrière
 * le texte dessinerait un liseré à la jointure.
 */
const VALUE_CARDS = [
  {
    num: '01',
    title: 'Terrain d’abord',
    desc: 'L’écoute, l’observation et la proximité guident nos décisions.',
    src: '/jo1.png',
    // check-hex-ignore — mesuré sur le fichier, ce n'est pas une couleur de charte
    bg: '#F9F9F9',
    alt: 'Deux techniciens casqués, de dos, observent une raffinerie au couchant ; l’un montre l’horizon du doigt. Légende : plus proches, plus loin.',
  },
  {
    num: '02',
    title: 'Simplicité utile',
    desc: 'Des solutions claires, concrètes et faciles à déployer.',
    src: '/jo2.png',
    // check-hex-ignore — mesuré sur le fichier, ce n'est pas une couleur de charte
    bg: '#FDFDFD',
    alt: 'Un bras robotisé articulé au-dessus d’un poste d’assemblage. Légende : des idées en résultats.',
  },
  {
    num: '03',
    title: 'Exigence industrielle',
    desc: 'La qualité, la fiabilité et la sécurité au cœur de tout ce que nous faisons.',
    src: '/jo3.png',
    // check-hex-ignore — mesuré sur le fichier, ce n'est pas une couleur de charte
    bg: '#FAFAFA',
    alt: 'Gros plan sur une couronne dentée usinée, en atelier. Légende : aujourd’hui pour demain.',
  },
  {
    num: '04',
    title: 'Progrès continu',
    desc: 'Avancer chaque jour, avec nos clients et nos équipes.',
    src: '/jo4.png',
    // check-hex-ignore — mesuré sur le fichier, ce n'est pas une couleur de charte
    bg: '#FCFCFC',
    alt: 'Deux collaborateurs marchent le long d’un bâtiment industriel frappé du logo X.0, au couchant. Légende : toujours plus d’impact.',
  },
]

/** Ce que les deux fondateurs ont en commun, sous le titre de section. */
const TEAM_TRAITS = [
  { icon: Users, lines: ['Une vision', 'commune'] },
  { icon: Settings, lines: ['Une expertise', 'complémentaire'] },
  { icon: BarChart3, lines: ['Un impact', 'durable'] },
]

/**
 * Les deux fondateurs. `focus` est le point du portrait a garder au centre
 * du cadre : les deux fichiers sont carres, la carte les recadre en
 * portrait, et sans consigne `object-cover` couperait de travers. Les
 * valeurs viennent de la position mesuree du visage dans chaque fichier.
 */
const FOUNDERS = [
  {
    photo: '/bilel.png',
    focus: '58% 42%',
    name: 'Bilal Labidi',
    role: 'CEO & Cofondateur',
    claim: 'Des idées concrètes pour une industrie plus durable.',
    desc: 'Une vision orientée terrain, portée par l’amélioration continue et la création de valeur durable pour l’industrie.',
  },
  {
    photo: '/aziz.png',
    focus: '54% 45%',
    name: 'Aziz Battikh',
    role: 'CTO & Cofondateur',
    claim: 'La technologie au service d’un impact concret.',
    desc: 'Une expertise technologique au service de solutions robustes, scalables et adaptées aux réalités industrielles.',
  },
]

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
    icon: ImprovementIcon,
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

/** Three outlined bars, matching the improvement card in the reference. */
function ImprovementIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true">
      <rect x="5" y="35" width="11" height="23" rx="1" />
      <rect x="26" y="20" width="11" height="38" rx="1" />
      <rect x="47" y="5" width="11" height="53" rx="1" />
    </svg>
  )
}

function MissionSection() {
  return (
    <section id="mission" aria-labelledby="mission-title" className={`${styles.mission} font-inter bg-white text-dark`}>
      <div className={styles.visual}>
        <Image
          src="/about4.png"
          alt="Trois collaborateurs Industry X.0 étudient une tablette dans l’usine. Des solutions concrètes pour un impact durable. Des industries plus humaines, plus performantes. People, data, real impact."
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          className={styles.photo}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          <p className={`${styles.eyebrow} text-gold`}>
            Notre mission
            <span aria-hidden="true" className="bg-gold" />
          </p>
          <h2 id="mission-title" className={styles.title}>
            <span>Rendre l’excellence</span>{' '}
            <span>opérationnelle accessible,</span>{' '}
            <span className="text-gold">mesurable et continue.</span>
          </h2>
        </div>

        <ol className={styles.cards}>
          {MISSION_STEPS.map((step) => {
            const Icon = step.icon
            return (
              <li key={step.num} className={styles.card}>
                <div className={styles.cardTop}>
                  <Icon className={`${styles.icon} text-gold`} aria-hidden="true" strokeWidth={1.5} />
                  <span className={`${styles.number} text-gold`}>{step.num}</span>
                </div>
                <h3 className={styles.cardTitle}>
                  <span>{step.titleLines[0]}</span>{' '}
                  <span>{step.titleLines[1]}</span>
                </h3>
                <span aria-hidden="true" className={`${styles.rule} bg-gold`} />
                <p className={`${styles.description} text-slate-500`}>{step.desc}</p>
              </li>
            )
          })}
        </ol>

        <div className={styles.signature}>
          <Image
            src="/about5.png"
            alt="L’humain, la technologie, un meilleur demain — le réel nous inspire."
            width={2172}
            height={724}
            sizes="(max-width: 900px) 90vw, 42vw"
          />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   NOTRE ÉQUIPE — UN SEUL ÉCRAN, PETIT ET GRAND

   La section fait exactement `100svh`. Ce qui la fait tenir n’est pas un
   jeu de tailles bien devinées mais un choix de structure : dans chaque
   carte, la photo est en `flex-1 min-h-0`. Elle prend ce qui reste une
   fois le nom, la fonction et le paragraphe posés, et elle le rend quand
   l’écran raccourcit. Le texte, lui, ne bouge pas.

   Sur téléphone, les deux cartes ne s’empilent pas — deux portraits l’un
   sous l’autre demanderaient deux écrans. Elles forment une bande qui se
   fait glisser du doigt, avec accrochage : le défilement est horizontal,
   la page reste immobile. C’est la seule façon honnête de tenir la
   promesse « un seul écran » sur 375 px de large.

   En dessous de 540 px de haut — un téléphone couché — la section garde
   sa hauteur minimale et la page se met à défiler. Mieux vaut ça qu’un
   paragraphe coupé au milieu.
   ============================================================ */

/* ============================================================
   NOTRE PARCOURS

   Trois colonnes : la photo, le discours, la frise. La photo va jusqu’au
   bord gauche de la fenêtre — son biseau blanc et ses diagonales dorées
   sont dans le fichier, il n’y a rien à dessiner par-dessus.

   Le fichier n’est pas retourné : le miroir mettrait bien le biseau du
   côté du texte, mais il rendrait illisibles le panonceau « ligne 3 » et
   le panneau « des solutions concrètes », qui y sont aplatis.

   Un seul or ici, `gold` (#DAA250) : ni `gold-deep`, ni `gold-ink`.

   Sous `lg` les trois colonnes s’empilent et la section défile : une
   frise de trois étapes et deux paragraphes ne tiennent pas sur un écran
   de téléphone sans devenir illisibles.
   ============================================================ */

function JourneySection() {
  return (
    <section className="relative overflow-hidden bg-white lg:min-h-[100svh]">
      <div className="grid grid-cols-1 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.68fr)]">

        {/* ==================== PHOTO ====================

            Un seul PNG, composition comprise : le biseau blanc, les
            diagonales dorées, le panonceau « ligne 3 » et le panneau
            « des solutions concrètes » y sont aplatis.

            La cellule a une hauteur définie sous `lg` seulement (la ligne
            de grille s’étire) ; au-dessus il faut la lui donner, sans quoi
            `fill` mesure zéro. */}
        <div className="relative h-[46vh] min-h-[300px] lg:h-auto lg:min-h-0">
          <Image
            src="/about7.png"
            alt="Un technicien, une ingénieure qualité en blouse et un responsable avancent côte à côte dans une allée d’assemblage, tablettes en main, sous un panonceau « ligne 3 — assemblage, solutions durables ». Un panneau annonce « des solutions concrètes pour un impact durable »."
            fill
            sizes="(min-width: 1024px) 47vw, 100vw"
            className="object-cover object-center"
          />

          {/* Voile de lisibilité, coin bas gauche seulement : le cadrage
              de la photo change avec la hauteur d’écran, et rien ne garantit
              que la mention tombe toujours sur une zone claire. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/75 via-transparent to-transparent"
          />

          <p className="absolute bottom-8 left-8 flex items-start gap-4 text-[10px] font-bold uppercase leading-[1.9] tracking-[0.16em] text-[#111827] lg:bottom-10 lg:left-10">
            <span>
              Le réel
              <br />
              nous inspire
            </span>
            <span aria-hidden="true" className="mt-2 h-px w-8 shrink-0 bg-gold" />
          </p>
        </div>
        {/* ==================== DISCOURS ==================== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col justify-center px-5 pb-10 pt-14 sm:px-7 lg:py-16 lg:pl-10 lg:pr-8"
        >
          <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
            Notre parcours
            <span className="h-px w-16 bg-gold/70" />
          </p>

          {/* `max-w` en `em` : la mesure suit la taille du titre, donc la
              coupure en quatre lignes tient à toutes les largeurs. */}
          <h2 className="mt-[clamp(1rem,2.6vh,1.75rem)] max-w-[11em] font-display font-black leading-[1.08] tracking-[-0.04em] text-[#111827] text-[clamp(28px,6.6vw,36px)] lg:text-[clamp(28px,min(2.9vw,5.4vh),48px)]">
            De l’expérience industrielle à une plateforme pensée{' '}
            <span className="text-gold">pour le réel</span>
          </h2>

          <p className="mt-[clamp(1rem,2.6vh,1.75rem)] max-w-[26em] text-[14px] leading-[1.7] text-muted lg:text-[clamp(14px,min(1.1vw,2vh),17px)]">
            Née sur le terrain, Industry X.0 s’appuie sur une double
            expertise — industrielle et technologique — pour répondre aux
            défis concrets des sites de production.
          </p>

          <p className="mt-[clamp(0.9rem,2.2vh,1.5rem)] max-w-[26em] text-[14px] leading-[1.7] text-muted lg:text-[clamp(14px,min(1.1vw,2vh),17px)]">
            Notre parcours est guidé par la même conviction : une industrie
            plus performante et plus humaine.
          </p>

          {/* Devise manuscrite. Un fichier plutôt qu’une fonte : le site ne
              charge que Syne, Outfit et Inter, aucune n’a de cursive, et
              embarquer une quatrième famille pour quatre mots coûterait
              plus cher que ce PNG. */}
          <Image
            src="/about9.png"
            alt="Le réel nous inspire."
            width={700}
            height={232}
            sizes="(min-width: 1024px) 300px, 60vw"
            className="mt-[clamp(1.25rem,3vh,2.25rem)] h-auto w-[clamp(200px,45vw,300px)]"
          />

          <p className="mt-[clamp(1.5rem,4vh,3rem)] border-l-2 border-gold pl-5 text-[9.5px] font-bold uppercase leading-[2] tracking-[0.18em] text-subtle sm:text-[10.5px]">
            Humain
            <br />
            Technologie
            <br />
            Impact durable
          </p>
        </motion.div>

        {/* ==================== FRISE ====================

            Le filet et les pastilles sont posés en absolu plutôt qu’en
            `border-left` : la ligne s’arrête ainsi au premier et au
            dernier point, au lieu de courir jusqu’aux bords de la liste. */}
        <motion.ol
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative flex flex-col justify-center gap-[clamp(1.75rem,5vh,3.25rem)] py-0 pb-14 pl-10 pr-5 sm:pr-7 lg:py-16 lg:pr-10"
        >
          {/* Rail : centre a 6 px, comme les pastilles. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-[5px] top-6 w-[2px] bg-gold/30"
          />

          {JOURNEY.map((step) => (
            <motion.li key={step.year} variants={fadeUp} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-10 top-[0.55em] h-3 w-3 rounded-full bg-gold"
              />

              <h3 className="font-display font-black leading-none tracking-[-0.035em] text-[#111827] text-[clamp(21px,5vw,26px)] lg:text-[clamp(21px,min(1.8vw,3.4vh),30px)]">
                {step.year}
              </h3>

              <p className="mt-2 font-display font-bold leading-[1.3] tracking-[-0.02em] text-gold text-[clamp(14px,3.6vw,17px)] lg:text-[clamp(14px,min(1.25vw,2.3vh),19px)]">
                {step.label}
              </p>

              <p className="mt-3 max-w-[20em] text-[13px] leading-[1.6] text-muted lg:text-[clamp(13px,min(0.95vw,1.75vh),15px)]">
                {step.desc}
              </p>
            </motion.li>
          ))}
        </motion.ol>

      </div>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="relative flex h-[100svh] min-h-[540px] flex-col overflow-hidden bg-white px-5 py-6 sm:px-7 lg:px-10 lg:py-8">
      {/* Fond de section. `alt` vide : l’image est décorative, elle ne
          porte aucun texte et rien qui ne soit dit ailleurs.

          Le fichier est en 16/9 ; sur un écran plus haut, `cover` doit
          rogner les côtés. `object-right` fait tomber la coupe à gauche,
          où il n’y a qu’un dégradé : la raffinerie, les diagonales dorées
          et la pointe du chevron restent entières. */}
      <Image
        src="/bg332.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
      />

      <div className="relative z-10 grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.55fr)_auto] lg:gap-10">

        {/* ==================== DISCOURS ==================== */}
        <div className="flex min-h-0 flex-col justify-center">
          <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
            Notre équipe
            <span className="h-px w-14 bg-gold/70" />
          </p>

          {/* `max-w` en `em` : la mesure suit la taille du titre, donc la
              coupure en trois lignes tient à toutes les largeurs. */}
          <h2 className="mt-[clamp(0.9rem,2.4vh,1.75rem)] max-w-[10em] font-display font-black leading-[1.07] tracking-[-0.04em] text-[#111827] text-[clamp(26px,6.6vw,34px)] lg:text-[clamp(28px,min(3.25vw,6vh),56px)]">
            Une alliance entre industrie et{' '}
            <span className="text-gold">technologie</span>
          </h2>

          <p className="mt-[clamp(0.75rem,2.2vh,1.5rem)] max-w-[24em] text-[13.5px] leading-[1.6] text-muted lg:text-[clamp(14px,min(1.2vw,2.2vh),19px)]">
            Une complémentarité construite sur plus de 30 ans de confiance.
          </p>

          <span className="mt-[clamp(1rem,3vh,2.25rem)] block h-[2px] w-11 rounded-full bg-gold" />

          {/* Les trois traits communs. */}
          <ul className="mt-[clamp(1rem,3vh,2.25rem)] grid max-w-[30rem] grid-cols-3 divide-x divide-cream-deep">
            {TEAM_TRAITS.map((trait, index) => {
              const Icon = trait.icon
              return (
                <li
                  key={trait.lines.join(' ')}
                  className={index === 0 ? 'pr-5' : 'px-5'}
                >
                  <Icon
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="h-7 w-7 text-gold lg:h-[clamp(1.75rem,2.4vw,2.4rem)] lg:w-[clamp(1.75rem,2.4vw,2.4rem)]"
                  />
                  <p className="mt-3 text-[12px] leading-[1.4] text-muted lg:text-[clamp(12px,min(0.95vw,1.75vh),15px)]">
                    {trait.lines[0]}
                    <br />
                    {trait.lines[1]}
                  </p>
                </li>
              )
            })}
          </ul>

          {/* Les trois piliers, en pied de colonne. */}
          <ul className="mt-[clamp(1.25rem,4vh,3rem)] flex flex-wrap items-center gap-x-3 text-[9px] font-bold uppercase tracking-[0.16em] text-subtle sm:text-[10.5px]">
            {PILLARS.map((pillar, index) => (
              <li key={pillar} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="h-3 w-px bg-gold/60" />
                )}
                {pillar}
              </li>
            ))}
          </ul>
        </div>

        {/* ==================== LES DEUX FONDATEURS ====================

            Les cartes ne s’étirent pas sur toute la hauteur : elles font
            76 % de l’écran, plafonnées à 720 px, et se posent au milieu de
            leur colonne. Une carte qui touche les deux bords perd sa
            silhouette de portrait — c’est le blanc autour qui la dessine.

            À l’intérieur, le portrait est en `flex-1 min-h-0` : il prend ce
            qui reste une fois le nom, la fonction et le paragraphe posés,
            et il le rend quand l’écran raccourcit. Le texte ne bouge pas.

            Sous `lg`, les deux cartes ne s’empilent pas — deux portraits
            l’un sous l’autre demanderaient deux écrans. Elles forment une
            bande qui se fait glisser du doigt, avec accrochage : le
            défilement est horizontal, la page reste immobile. `-mx-5` puis
            `px-5` font filer la bande d’un bord à l’autre tout en gardant
            la première carte alignée sur la marge du texte. */}
        <ul className="-mx-5 flex min-h-0 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 sm:-mx-7 sm:px-7 lg:mx-0 lg:grid lg:grid-cols-2 lg:items-center lg:justify-items-center lg:gap-[clamp(1.5rem,3vw,3.5rem)] lg:overflow-visible lg:px-0">
          {FOUNDERS.map((founder) => (
            <li
              key={founder.name}
              className="flex h-full min-h-0 w-[78vw] shrink-0 snap-center flex-col overflow-hidden rounded-[22px] border border-cream-border bg-white shadow-[0_18px_44px_rgba(12,13,18,0.10)] sm:w-[58vw] lg:h-[min(76svh,720px)] lg:w-full lg:max-w-[360px]"
            >
              {/* ---------- Portrait ---------- */}
              <div className="relative min-h-0 flex-1">
                <Image
                  src={founder.photo}
                  alt={`Portrait de ${founder.name}, ${founder.role} d’Industry X.0`}
                  fill
                  sizes="(min-width: 1024px) 360px, 78vw"
                  className="object-cover"
                  style={{ objectPosition: founder.focus }}
                />

                {/* Voile de lisibilité pour la devise, à gauche. Assez
                    dense pour tenir le seuil de contraste du texte blanc,
                    assez court pour laisser le visage intact. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent"
                />

                <p className="absolute left-5 top-5 max-w-[7.5rem] text-[9.5px] font-bold uppercase leading-[1.8] tracking-[0.11em] text-white sm:text-[10px]">
                  {founder.claim}
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-[2px] w-8 rounded-full bg-gold"
                  />
                </p>
              </div>

              {/* ---------- Identité ----------
                  Remontée de 16 px sur la photo, coins arrondis : c’est ce
                  chevauchement qui fait la carte, et non deux blocs
                  aboutés. */}
              <div className="relative z-10 -mt-4 rounded-t-[22px] bg-white px-5 pb-6 pt-5 sm:px-7">
                <h3 className="font-display text-[17px] font-black tracking-[-0.03em] text-[#111827] lg:text-[clamp(17px,1.35vw,22px)]">
                  {founder.name}
                </h3>
                <p className="mt-1 text-[13px] text-muted lg:text-[clamp(13px,1vw,15.5px)]">
                  {founder.role}
                </p>

                <p className="mt-5 text-[12.5px] leading-[1.6] text-muted lg:text-[clamp(12.5px,min(0.95vw,1.7vh),15px)]">
                  {founder.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* ==================== MENTION D’ANGLE ====================

            Une colonne étroite, au bas de la troisième piste. Elle est
            rentrée de 12 vh : le bouton de discussion est ancré dans ce
            coin, et deux éléments superposés n’y seraient lisibles ni
            l’un ni l’autre.

            Absente sous `lg` : trois lignes de commentaire ne valent pas
            la hauteur qu’elles prendraient sur un téléphone. */}
        <div className="hidden w-[8rem] flex-col justify-end pb-[12vh] lg:flex">
          <span aria-hidden="true" className="mb-4 block h-px w-8 bg-gold" />

          <p className="text-right text-[10px] font-bold uppercase leading-[1.9] tracking-[0.16em] text-subtle">
            Plus loin ensemble pour l’industrie de demain.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   NOS VALEURS

   Le fond est un fichier — texture, losanges, filets dorés et raffinerie
   en haut à droite y sont peints. Rien à redessiner par-dessus : la
   section ne pose que le texte et les quatre cartes.

   Les cartes, elles aussi, sont des fichiers complets : numéro, titre,
   texte, photo biseautée et légende y sont aplatis. Ce que ce composant
   ajoute, c’est le cadre — coins arrondis, filet et ombre portée — que
   les fichiers n’ont pas, et un rapport de forme commun, les quatre
   exports différant de quelques pixels.

   Le texte des cartes n’étant pas du texte mais des pixels, chaque `alt`
   le reprend en entier : c’est la seule façon qu’une synthèse vocale, un
   moteur de recherche ou un lecteur qui coupe les images y accède.

   Sous `lg`, les quatre cartes forment une bande qui se fait glisser du
   doigt, avec accrochage — quatre cartes empilées feraient quatre écrans.
   ============================================================ */

function ValuesSection() {
  return (
    <section className="relative flex h-[100svh] min-h-[540px] flex-col overflow-hidden bg-white">
      {/* Fond. `alt` vide : l’image est décorative, tout ce qu’elle porte
          de signifiant est repris en texte au-dessus. */}
      <Image
        src="/bgbgb.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 py-6 sm:px-7 lg:px-10 lg:py-8">

        {/* ==================== TITRE ET MENTIONS ==================== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12"
        >
          <div>
            <h2 className="font-display font-black leading-[0.98] tracking-[-0.045em] text-[#111827] text-[clamp(40px,10vw,60px)] lg:text-[clamp(44px,min(4.6vw,9vh),88px)]">
              Nos <span className="text-gold">valeurs</span>
            </h2>

            <span
              aria-hidden="true"
              className="mt-[clamp(0.75rem,2vh,1.25rem)] block h-[3px] w-16 rounded-full bg-gold"
            />

            <p className="mt-[clamp(0.9rem,2.4vh,1.5rem)] text-[10.5px] font-medium uppercase leading-[1.9] tracking-[0.2em] text-muted sm:text-[12px] lg:text-[clamp(11px,min(0.92vw,1.7vh),15px)]">
              Des convictions concrètes
              <br />
              pour une industrie durablement meilleure.
            </p>
          </div>

          {/* Les deux mentions d’angle. Absentes sous `lg` : six lignes de
              commentaire ne valent pas la hauteur qu’elles prendraient sur
              un téléphone. */}
          <div className="hidden shrink-0 flex-col items-end gap-7 pt-2 lg:flex">
            <p className="border-l-2 border-gold pl-4 text-[10px] font-bold uppercase leading-[1.9] tracking-[0.18em] text-[#111827]">
              Humain
              <br />
              Technologie
              <br />
              Impact durable
            </p>

            <p className="text-right text-[10px] font-bold uppercase leading-[1.9] tracking-[0.18em] text-muted">
              Des hommes
              <br />
              Des solutions
              <br />
              Un avenir meilleur
            </p>
          </div>
        </motion.div>

        {/* ==================== LES QUATRE VALEURS ====================

            `-mx-5` puis `px-5` : la bande file d’un bord à l’autre de
            l’écran, mais la première carte reste alignée sur la marge du
            texte. `lg:mt-auto` pousse la rangée vers le bas de la section,
            comme dans le dessin. */}
        <motion.ul
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="-mx-5 mt-[clamp(1.25rem,3vh,2.5rem)] flex min-h-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-7 sm:px-7 lg:mx-0 lg:my-auto lg:grid lg:grid-cols-4 lg:flex-none lg:justify-items-center lg:gap-[clamp(1rem,1.8vw,2rem)] lg:overflow-visible lg:px-0"
        >
          {VALUE_CARDS.map((card) => (
            <motion.li
              key={card.src}
              variants={fadeUp}
              /* `container-type: inline-size` fait de la carte son propre
                 referentiel : numero, titre, texte et marges sont exprimes
                 en `cqw`, donc en pourcentage de sa largeur. Ils gardent
                 leurs proportions d'une colonne de bureau a une carte
                 glissante de telephone, sans un seul point de rupture. */
              /* Sous `lg`, la carte tire sa largeur de la hauteur
                 disponible : `h-full`, puis un rapport de forme. C'est ce
                 qui la fait tenir sur un ecran de telephone, quelle que
                 soit sa hauteur. A partir de `lg`, c'est la grille qui
                 commande la largeur et le contenu qui deroule sa hauteur.

                 Le `max-w` est le garde-fou de ce second cas : la hauteur
                 de la carte valant 1,56 fois sa largeur, une fenetre large
                 mais courte donnerait des cartes plus hautes que l'ecran.
                 320 px est le cout fixe du reste de la section — marges,
                 en-tete et pied. */
              className="flex aspect-[100/156] h-full w-auto shrink-0 snap-center flex-col overflow-hidden rounded-[22px] shadow-[0_18px_44px_rgba(12,13,18,0.12)] [container-type:inline-size] lg:aspect-auto lg:h-auto lg:w-full lg:max-w-[calc((100svh_-_320px)/1.56)]"
              style={{ backgroundColor: card.bg }}
            >
              <div className="px-[9cqw] pt-[6cqw]">
                <p className="font-display font-black leading-[0.78] tracking-[-0.04em] text-gold text-[25cqw]">
                  {card.num}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-[5cqw] block h-[3px] w-[14cqw] rounded-full bg-gold"
                />

                <h3
                  className="mt-[7cqw] font-display font-black leading-[1.14] tracking-[-0.03em] text-[8cqw]"
                  style={{ color: VALUE_INK }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-[3.5cqw] text-[5.2cqw] leading-[1.5]"
                  style={{ color: VALUE_BODY }}
                >
                  {card.desc}
                </p>
              </div>

              {/* `mt-auto` colle la photo au bas de la carte : les quatre
                  s'alignent donc, quelle que soit la longueur des textes. */}
              <div
                className="relative mt-auto aspect-[1448/1086] w-full bg-gold"
                style={{ clipPath: PHOTO_BEVEL }}
              >
                <div
                  className="absolute inset-0"
                  style={{ clipPath: PHOTO_BEVEL_INNER }}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, 74vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* ==================== PIED ==================== */}
        <div className="mt-[clamp(1rem,2.5vh,2rem)] flex items-center justify-between gap-6">
          <span aria-hidden="true" className="h-px w-16 shrink-0 bg-gold" />

          <p className="flex items-center gap-4 text-right text-[9px] font-bold uppercase tracking-[0.2em] text-muted sm:text-[10.5px]">
            <span aria-hidden="true" className="hidden h-px w-10 shrink-0 bg-gold sm:block" />
            L’industrie d’un monde meilleur
            <span aria-hidden="true" className="hidden h-px w-10 shrink-0 bg-gold sm:block" />
          </p>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   NOTRE EXPERTISE

   Quatre secteurs, quatre cartes : la photo en haut, l’intitulé en bas.

   Les photos portent leur légende incrustée — « des solutions pour la
   santé de demain » et les trois autres. Elle occupe la bande 63 %-87 %
   de la hauteur du fichier, filet doré compris. Le cadre `10/9` avec un
   `object-position` à 60 % garde cette bande entière, avec une marge sous
   le filet, plutôt que de recadrer au centre — ce qui la couperait.

   Sous `lg`, les quatre cartes forment une bande qui se fait glisser du
   doigt : empilées, elles feraient quatre écrans.
   ============================================================ */

function ExpertiseSection() {
  return (
    <section className="relative overflow-hidden bg-white lg:min-h-[100svh]">
      {/* Deux traits dorés en biais, sur le bord droit. Décoratifs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-32 hidden h-[160%] w-px rotate-[24deg] bg-gradient-to-b from-transparent via-gold/40 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 hidden h-[160%] w-px rotate-[24deg] bg-gradient-to-b from-transparent via-gold/15 to-transparent lg:block"
      />

      <div className="relative z-10 flex flex-col px-5 py-14 sm:px-7 lg:min-h-[100svh] lg:px-10 lg:py-12">

        {/* ==================== EN-TÊTE ==================== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12"
        >
          <div className="min-w-0">
            <p className="flex items-center gap-4 border-l-2 border-gold pl-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
              Notre expertise
              <span aria-hidden="true" className="h-px w-16 bg-gold/70" />
            </p>

            <div className="mt-[clamp(1rem,2.6vh,1.75rem)] flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
              <h2 className="font-display font-black leading-[1.08] tracking-[-0.04em] text-[#111827] text-[clamp(28px,6.6vw,38px)] lg:text-[clamp(30px,min(3.1vw,5.8vh),52px)]">
                Une expertise au service
                <br />
                <span className="text-gold">des environnements exigeants</span>
              </h2>

              <span
                aria-hidden="true"
                className="hidden w-px self-stretch bg-gold/40 lg:block"
              />

              <p className="max-w-[20em] text-[14px] leading-[1.6] text-muted lg:text-[clamp(14px,min(1.15vw,2.1vh),18px)]">
                Des secteurs, des défis communs, un même engagement.
              </p>
            </div>
          </div>

          {/* Mention d’angle. Absente sous `lg` : quatre lignes de
              commentaire ne valent pas la hauteur qu’elles prendraient sur
              un téléphone. */}
          <p className="hidden shrink-0 border-l-2 border-gold pl-4 text-[10px] font-bold uppercase leading-[1.9] tracking-[0.18em] text-muted lg:block">
            Solutions
            <br />
            concrètes
            <br />
            pour un impact
            <br />
            durable
            <span aria-hidden="true" className="mt-3 block h-px w-10 bg-gold" />
          </p>
        </motion.div>

        {/* ==================== LES QUATRE SECTEURS ====================

            `-mx-5` puis `px-5` : la bande file d’un bord à l’autre de
            l’écran, mais la première carte reste alignée sur la marge du
            texte. `lg:my-auto` centre la rangée dans ce qui reste. */}
        <motion.ul
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-7 sm:px-7 lg:mx-0 lg:my-auto lg:grid lg:grid-cols-4 lg:gap-[clamp(1rem,1.8vw,2rem)] lg:overflow-visible lg:px-0 lg:py-[clamp(1.5rem,4vh,3rem)]"
        >
          {EXPERTISE_FIELDS.map((field) => (
            <motion.li
              key={field.title}
              variants={fadeUp}
              className="w-[74vw] shrink-0 snap-center overflow-hidden rounded-[14px] bg-white shadow-[0_14px_38px_rgba(12,13,18,0.10)] sm:w-[44vw] lg:w-auto"
            >
              <div className="relative aspect-[10/9] w-full">
                <Image
                  src={field.src}
                  alt={field.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, 74vw"
                  className="object-cover object-[50%_60%]"
                />
              </div>

              <div className="px-5 pb-5 pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-[17px] font-black tracking-[-0.03em] text-[#111827] lg:text-[clamp(17px,1.35vw,22px)]">
                      {field.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.5] text-muted lg:text-[clamp(12.5px,min(0.95vw,1.7vh),15px)]">
                      {field.claim}
                    </p>
                  </div>

                  {/* La flèche est décorative : elle donne son rythme à la
                      série, elle ne mène nulle part. `aria-hidden` pour que
                      la synthèse vocale ne l’annonce pas comme un lien. */}
                  <ArrowRight
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="mt-2 shrink-0 text-gold"
                  />
                </div>

                <span
                  aria-hidden="true"
                  className="mt-4 block h-[2px] w-10 rounded-full bg-gold"
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* ==================== PIED ==================== */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <p className="shrink-0 border-l-2 border-gold pl-4 text-[9.5px] font-bold uppercase leading-[1.9] tracking-[0.18em] text-muted sm:text-[10.5px]">
            Des industries
            <br />
            plus performantes
            <br />
            pour un monde
            <br />
            plus durable
          </p>

          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-gold/70 sm:mb-3 sm:block"
          />

          {/* Devise manuscrite. Un fichier plutôt qu’une fonte : le site ne
              charge que Syne, Outfit et Inter, aucune n’a de cursive. */}
          <Image
            src="/about9.png"
            alt="Le réel nous inspire."
            width={700}
            height={232}
            sizes="(min-width: 1024px) 260px, 50vw"
            className="h-auto w-[clamp(170px,24vw,260px)] shrink-0"
          />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   VERS DEMAIN

   La bande de clôture, juste avant le pied de page.

   Sous `lg` la photo passe sous le texte : à cette largeur, un fondu
   latéral n’aurait plus de place pour s’étendre et le titre tomberait
   sur la façade. Au-dessus, elle occupe la moitié droite en absolu et
   se fond dans le blanc par la gauche — le dégradé est posé en
   `linear-gradient` plutôt qu’en classes `from`/`via`/`to` parce que
   la coupure doit tomber à 42 % de la photo, pas à 100 %.
   ============================================================ */

function HorizonSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* ==================== DISCOURS ====================

          `z-10` : la photo qui suit est en absolu sous `lg` et serait
          peinte par-dessus, l’ordre du DOM la plaçant en dernier. */}
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative z-10 px-5 pb-12 pt-14 sm:px-7 lg:max-w-[70%] lg:px-10 lg:py-[clamp(3.5rem,9vh,7rem)]"
      >
        {/* SUR-TITRE. Le filet précède le mot, comme dans le dessin. */}
        <motion.p
          variants={fadeUp}
          className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.24em] text-gold sm:text-[11px]"
        >
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          Vers demain
        </motion.p>

        <div className="mt-[clamp(1.25rem,3vh,2.25rem)] flex flex-col gap-[clamp(2rem,5vh,3.5rem)] lg:flex-row lg:items-start lg:gap-[clamp(2rem,4vw,4.5rem)]">
          <div className="min-w-0 lg:flex-1">
            {/* TITRE. `max-w` en `em` : la mesure suit la taille du
                titre, donc la coupure en trois lignes — « une
                industrie », « plus sûre et », « plus intelligente. » —
                tient à toutes les largeurs. */}
            <motion.h2
              variants={fadeUp}
              className="max-w-[13.8em] font-display font-black leading-[1.06] tracking-[-0.04em] text-[#111827] text-[clamp(30px,7.6vw,42px)] lg:text-[clamp(34px,min(3.6vw,6.6vh),58px)]"
            >
              Construisons une industrie plus agile, plus sûre et{' '}
              <span className="text-gold">plus intelligente.</span>
            </motion.h2>

            {/* LES DEUX APPELS */}
            <motion.div
              variants={fadeUp}
              className="mt-[clamp(1.75rem,4vh,3rem)] flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link
                href="/#solutions"
                className="group inline-flex items-center justify-center gap-3 rounded-[6px] bg-gold px-7 py-4 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:text-[15px]"
              >
                Découvrir CIPA
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-[6px] border border-cream-deep bg-white px-7 py-4 text-[14px] font-semibold text-[#111827] transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:text-[15px]"
              >
                Parler à notre équipe
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* MENTION. Le filet vertical est un `border-left` : il ne
              court ainsi que sur la hauteur du texte, comme au dessin. */}
          <motion.p
            variants={fadeUp}
            className="shrink-0 border-l border-gold pl-6 text-[11px] font-medium uppercase leading-[1.9] tracking-[0.16em] text-[#111827] sm:text-[12.5px] lg:pt-[0.6em] lg:text-[clamp(11px,min(0.95vw,1.75vh),14px)]"
          >
            Mêmes racines,
            <br />
            plus d’impact,
            <br />
            demain.
            <span
              aria-hidden="true"
              className="mt-[clamp(1rem,2.6vh,1.75rem)] block h-[3px] w-16 bg-gold"
            />
          </motion.p>
        </div>
      </motion.div>

      {/* ==================== PHOTO ====================

          Le fichier est en 4/3 ; le cadre ne l’est jamais, ni en bande
          latérale ni en bandeau. `object-[62%_46%]` garde la façade et
          son enseigne dans le cadre, la coupe tombant sur le ciel et
          sur les massifs du premier plan. */}
      <div className="relative h-[42vh] min-h-[260px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:min-h-0 lg:w-[58%]">
        <Image
          src="/indus2050.png"
          alt="Le siège d’Industry X.0 au soleil couchant : un bâtiment blanc et anthracite portant l’enseigne « Industry X.0 », les mots « humain, technologie, impact durable » sur sa façade et, sur le bardage sombre, « l’industrie au service d’un meilleur demain »."
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[62%_46%]"
        />

        {/* Fondu vers le blanc de la section. Décoratif. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_38%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.9)_9%,rgba(255,255,255,0)_44%)]"
        />
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

      <JourneySection />

      <TeamSection />

      <ValuesSection />

      <ExpertiseSection />

      <HorizonSection />

      <Footer />

    </main>
  )
}
