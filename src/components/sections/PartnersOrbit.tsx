'use client'

import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { STATS } from '@/lib/data/orbit'
import OrbitCanvas from '@/components/sections/orbit/OrbitCanvas'
import Section from '@/components/ui/Section'
import SdgContribution from '@/components/sections/SdgContribution'
import { useCopy } from '@/lib/i18n'

const COPY = {
  fr: {
    stats: ['Partenaires', 'Clients accompagnés', 'Domaines d’expertise'],
    title: ['Des partenaires', 'qui avancent', 'avec nous'],
    lead: 'CIPA s’entoure de partenaires technologiques, de cabinets de conseil et d’institutions pour construire ensemble l’industrie de demain. Une synergie de compétences au service de vos opérations.',
    discover: 'Découvrir nos partenaires',
    join: 'Nous rejoindre',
    eyebrow: 'L’écosystème',
    pageTitle: 'Trois familles de partenaires,',
    pageTitleEnd: 'une seule plateforme',
    pageLead: 'Technologie, conseil, institutions : sept partenaires, trois familles, une seule promesse industrielle.',
  },
  en: {
    stats: ['Partners', 'Customers supported', 'Areas of expertise'],
    title: ['Partners', 'who move forward', 'with us'],
    lead: 'CIPA works with technology partners, consulting firms and institutions to build tomorrow’s industry together. Combined expertise, working for your operations.',
    discover: 'Meet our partners',
    join: 'Join us',
    eyebrow: 'The ecosystem',
    pageTitle: 'Three families of partners,',
    pageTitleEnd: 'one platform',
    pageLead: 'Technology, consulting, institutions: seven partners, three families, one industrial promise.',
  },
}

/* ============================================================
   ORBITE DE L'ÉCOSYSTÈME

   Le principe est celui des pages « partenaires » de Stripe : la marque au
   centre, les partenaires qui gravitent autour sur deux anneaux tournant en
   sens inverse, et rien d'autre — pas de carte, pas de cadre, pas de dégradé.

   Toute la géométrie est décrite dans un repère carré de 620 unités, puis
   convertie en pourcentages du conteneur (qui porte `aspect-square`). Dessin,
   pastilles et logos partagent donc exactement la même échelle, à n'importe
   quelle largeur d'écran.

   La rotation est une animation CSS (et non framer-motion) pour deux raisons :
   elle se met en pause au survol via `animation-play-state`, et elle s'annule
   d'elle-même sous `prefers-reduced-motion`.

   PIÈGE À NE PAS REPRODUIRE. Un élément positionné par `left`/`top` puis
   recentré par `-translate-x-1/2 -translate-y-1/2` ne doit JAMAIS porter
   d'animation framer-motion : le `transform` inline écrit par motion écrase
   les classes de translation et l'élément se retrouve posé par son coin
   supérieur gauche, décalé d'un demi-diamètre. D'où la séparation systématique
   ci-dessous : un div de position (transform réservé au recentrage), puis un
   div de contre-rotation, puis le `motion.div` d'apparition.
   ============================================================ */

function Stats({ labels }: { labels: string[] }) {
  return (
    <div className="mt-10 grid grid-cols-3 items-start gap-x-4 sm:mt-12 sm:flex sm:flex-wrap sm:gap-x-14 sm:gap-y-6">
      {STATS.map((stat, i) => (
        <div key={stat.label}>
          <p className="font-display text-[26px] font-black leading-none tracking-[-0.03em] text-gray-900 sm:text-[30px]">
            {stat.value}
          </p>
          <p className="mt-2 text-[12px] font-medium text-stone-600 sm:text-[12.5px]">
            {labels[i]}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   SECTION

   `home` : le bloc en deux colonnes de la page d'accueil (discours + orbite).
   `page` : version pour /partners, orbite à gauche et titre à droite, sans
   CTA ni statistiques.
   ============================================================ */

export default function PartnersOrbit({
  variant = 'home',
}: {
  variant?: 'home' | 'page'
}) {
  const isHome = variant === 'home'
  const t = useCopy(COPY)

  const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <Section
      // Sur /partners la section ouvre la page : le padding `default` (128 px)
      // s'ajoutait a la navbar et poussait l'orbite sous la ligne de flottaison.
      variant={isHome ? 'default' : 'dense'}
      background="cream"
      // Plus large sur /partners : l'orbite partage la ligne avec le titre.
      innerClassName={isHome ? 'max-w-[1180px]' : 'max-w-[1320px]'}
    >
        {isHome ? (
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-12">
            {/* DISCOURS */}
            <motion.div {...reveal}>

              <h2 className="mt-6 font-display text-[30px] font-black leading-[1.08] tracking-[-0.035em] text-gray-900 sm:text-[40px] lg:text-[46px]">
                {t.title[0]}
                <br />
                {t.title[1]}
                <br />
                {t.title[2]}
              </h2>

              <p className="mt-6 max-w-[30rem] text-pretty text-[14.5px] leading-[1.75] text-stone-600 sm:text-[15.5px]">
                {t.lead}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/partners"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-bold text-dark shadow-[0_14px_34px_rgba(218,162,80,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-gold-400"
                >
                  {t.discover}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-dark/15 px-6 py-3.5 text-[14px] font-bold text-stone-900 transition-all duration-300 hover:border-dark/35 hover:bg-white"
                >
                  {t.join}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <Stats labels={t.stats} />
            </motion.div>

            {/* ORBITE */}
            <OrbitCanvas />
          </div>
        ) : (
          <>
            {/* Orbite a gauche, discours a droite — le miroir du bloc de
                l'accueil. Sous lg, le titre passe au-dessus de l'orbite. */}
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
              <motion.div
                {...reveal}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gold/55 sm:w-16 lg:hidden" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink sm:text-[11.5px]">
                    {t.eyebrow}
                  </span>
                  <span className="h-px w-10 bg-gold/55 sm:w-16" />
                </div>

                <h1 className="mt-4 font-display text-[26px] font-black leading-[1.1] tracking-[-0.035em] text-gray-900 sm:text-[34px] lg:text-[38px]">
                  {t.pageTitle}
                  {/* En colonne etroite (lg), le retour force couperait mal. */}
                  <br className="lg:hidden" /> {t.pageTitleEnd}
                </h1>

                <p className="mt-4 max-w-xl text-pretty text-[14px] leading-[1.7] text-stone-600 sm:text-[15px]">
                  {t.pageLead}
                </p>
              </motion.div>

              {/* L'orbite doit tenir dans le premier ecran. Au-dessus : navbar
                  82 + padding 96, plus ~40 px d'air en bas. Elle prend donc la
                  hauteur restante, bornee a 760 px et a 440 px (en dessous,
                  les pastilles se serrent trop : on accepte alors de
                  defiler). Sur lg, la colonne la borne aussi en largeur. */}
              <div className="lg:order-first">
                <OrbitCanvas sizeClassName="max-w-[440px] sm:max-w-[560px] md:max-w-[min(620px,max(440px,calc(100svh_-_220px)))] lg:max-w-[min(760px,max(440px,calc(100svh_-_220px)))]" />
              </div>
            </div>
          </>
        )}

        {/* ================= OBJECTIFS DE DEVELOPPEMENT DURABLE =================

            Bloc isole dans son propre composant : il a son etat (pastille
            survolee, decalage de l'infobulle) et ses donnees, qui n'ont rien
            a voir avec l'orbite ci-dessus.

            Sur l'accueil seulement : /partners rend la meme section en
            variante `page`, ou la barre ferait doublon avec le reste de la
            page. Pas de padding horizontal, le conteneur de Section en pose
            deja un.
            ================================================================= */}
        {isHome && <SdgContribution className="mt-20 sm:mt-24" />}
    </Section>
  )
}
