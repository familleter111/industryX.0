'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { tokens } from '@/lib/tokens'
import { useMotion } from '@/hooks/useMotion'
import { useCopy } from '@/lib/i18n'

const SDG_COLOR = tokens.color.brand.sdg

/**
 * Un Objectif de Developpement Durable de l'ONU.
 *
 * `color` est la couleur officielle de l'objectif, tiree du bloc des couleurs
 * tierces des tokens. Elle ne sert qu'a teinter l'ombre de la pastille
 * survolee : elle ne se propage pas au reste de l'interface, au meme titre
 * que le jaune des icones elles-memes.
 */
export type SdgGoal = {
  num: number
  /** Intitule officiel, affiche dans l'infobulle et le nom accessible. */
  title: string
  /** Couleur officielle ONU, cf. `tokens.color.brand.sdg`. */
  color: string
}

/**
 * Les six objectifs sur lesquels la plateforme a un effet mesurable.
 *
 * TODO(licence) — verifier avant la soutenance les conditions d'utilisation
 * des logos ODD de l'ONU. Les Guidelines on the Use of the SDG Logo and the
 * 17 SDG Icons distinguent l'usage informatif de l'usage commercial : le
 * second exige une autorisation ecrite, et interdit de laisser entendre que
 * l'ONU soutient le produit. Un site vitrine d'editeur logiciel releve du
 * second cas.
 * Reference : un.org/sustainabledevelopment/news/communications-material/
 */
export const SDG_GOALS: readonly SdgGoal[] = [
  { num: 7, title: 'Énergie propre et d’un coût abordable', color: SDG_COLOR[7] },
  { num: 8, title: 'Travail décent et croissance économique', color: SDG_COLOR[8] },
  { num: 9, title: 'Industrie, innovation et infrastructure', color: SDG_COLOR[9] },
  { num: 12, title: 'Consommation et production responsables', color: SDG_COLOR[12] },
  { num: 13, title: 'Lutte contre les changements climatiques', color: SDG_COLOR[13] },
  { num: 17, title: 'Partenariats pour la réalisation des objectifs', color: SDG_COLOR[17] },
]

/**
 * Intitules officiels anglais de l'ONU, dans l'ordre de SDG_GOALS.
 * Les pastilles (public/ODD) restent les versions francaises : les
 * remplacer par les icones anglaises officielles si la licence le permet.
 */
const COPY = {
  fr: {
    short: 'ODD',
    title: 'Contribution aux Objectifs de Développement Durable',
    lead: 'Six objectifs sur lesquels la plateforme a un effet mesurable.',
    goals: SDG_GOALS.map((goal) => goal.title),
  },
  en: {
    short: 'SDG',
    title: 'Contribution to the Sustainable Development Goals',
    lead: 'Six goals on which the platform has a measurable impact.',
    goals: [
      'Affordable and clean energy',
      'Decent work and economic growth',
      'Industry, innovation and infrastructure',
      'Responsible consumption and production',
      'Climate action',
      'Partnerships for the goals',
    ],
  },
}

/** Marge minimale entre l'infobulle et le bord du viewport, en pixels. */
const VIEWPORT_MARGIN = 16

/**
 * Contribution aux Objectifs de Developpement Durable.
 *
 * Bande compacte : l'intitule a gauche, les six pastilles a droite (sur
 * desktop). L'infobulle s'ouvre AU-DESSUS de la pastille, fleche vers le
 * bas : l'en-tete est desormais a cote de la grille, l'espace du haut est
 * libre, et plus rien n'est reserve sous la grille (l'ancien `lg:pb-28`
 * ajoutait 112 px de vide a la page).
 *
 * L'infobulle n'existe qu'a partir de `lg`, la ou la grille tient sur une
 * seule ligne. En dessous (deux ou trois colonnes, donc deux ou trois
 * rangees) une bulle ouverte vers le bas recouvrirait la rangee suivante, et
 * sur mobile il n'y a de toute facon pas de survol : l'intitule est alors
 * affiche en permanence sous chaque pastille.
 *
 * Le decalage horizontal (`shift`) est mesure a l'ouverture plutot qu'ecrit
 * en dur par colonne : la grille change de nombre de colonnes selon le point
 * de rupture, et le debordement depend aussi de la largeur du texte — un
 * tableau de classes par index ne serait juste qu'a un seul breakpoint. La
 * fleche, elle, reste centree sur la pastille : c'est un frere de la bulle,
 * pas un enfant, donc le decalage ne l'emporte pas.
 */
export default function SdgContribution({ className = '' }: { className?: string }) {
  const m = useMotion()
  const t = useCopy(COPY)
  const baseId = useId()
  const goals = SDG_GOALS.map((goal, i) => ({ ...goal, title: t.goals[i] }))

  /** Pastille survolee ou focalisee. `null` quand la barre est au repos. */
  const [active, setActive] = useState<number | null>(null)
  /** Correction horizontale appliquee a la bulle active, en pixels. */
  const [shift, setShift] = useState(0)

  const tipRefs = useRef<(HTMLDivElement | null)[]>([])

  const open = (index: number) => {
    // Le decalage repart de zero dans le meme rendu : l'effet ci-dessous
    // mesure donc toujours une bulle centree, jamais une bulle deja corrigee.
    setActive(index)
    setShift(0)
  }

  const close = (index: number) =>
    setActive((current) => (current === index ? null : current))

  useLayoutEffect(() => {
    if (active === null) return

    const bubble = tipRefs.current[active]
    if (!bubble) return

    const rect = bubble.getBoundingClientRect()
    // Bulle masquee (sous `lg`) : rectangle nul, rien a corriger.
    if (rect.width === 0) return

    let delta = 0
    if (rect.left < VIEWPORT_MARGIN) {
      delta = VIEWPORT_MARGIN - rect.left
    } else if (rect.right > window.innerWidth - VIEWPORT_MARGIN) {
      delta = window.innerWidth - VIEWPORT_MARGIN - rect.right
    }

    if (delta !== 0) setShift(delta)
  }, [active])

  return (
    <motion.div
      variants={m.stagger(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={m.viewport}
      className={`relative z-10 mx-auto max-w-6xl rounded-3xl border border-black/[0.06] bg-white/70 px-6 py-6 sm:px-8 lg:flex lg:items-center lg:gap-10 lg:py-5 ${className}`}
    >
      {/* EN-TETE — au-dessus des pastilles sur mobile, a gauche sur desktop. */}
      <motion.div variants={m.fadeUp} className="mb-6 text-center lg:mb-0 lg:w-[300px] lg:shrink-0 lg:text-left">
        <h3 className="mb-1 text-[15px] font-bold text-dark">
          {t.title}
        </h3>
        <p className="text-sm leading-relaxed text-stone-600">
          {t.lead}
        </p>
      </motion.div>

      <ul className="grid flex-1 grid-cols-2 justify-items-center gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-4">
        {goals.map((goal, index) => {
          const isActive = active === index
          const isDimmed = active !== null && !isActive
          const tooltipId = `${baseId}-sdg-${goal.num}`

          return (
            <motion.li key={goal.num} variants={m.fadeUp} className="flex justify-center">
              {/* La mise en retrait des autres pastilles vit sur ce conteneur
                  et non sur le <li> : Framer pose l'opacite de l'entree au
                  scroll en style inline sur le <li>, et un style inline
                  l'emporte sur une classe. La classe serait ecrite mais
                  jamais appliquee. */}
              <div
                className={`relative flex flex-col items-center transition-opacity duration-200 ease-smooth ${
                  isDimmed ? 'opacity-55' : 'opacity-100'
                }`}
              >
                {/* PASTILLE — focalisable au clavier : elle porte seule
                    l'information, donc elle a un nom accessible et decrit son
                    infobulle. Pas de curseur `pointer` : rien au clic. */}
                <button
                  type="button"
                  aria-label={`${t.short} ${goal.num} — ${goal.title}`}
                  aria-describedby={tooltipId}
                  onMouseEnter={() => open(index)}
                  onMouseLeave={() => close(index)}
                  onFocus={() => open(index)}
                  onBlur={() => close(index)}
                  className={`block cursor-default overflow-hidden rounded-sm outline-none ring-offset-cream transition duration-200 ease-smooth focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 ${
                    isActive ? 'opacity-100 saturate-100' : 'opacity-90 saturate-[.85]'
                  } ${!m.reduce && isActive ? 'scale-[1.06]' : 'scale-100'}`}
                  style={isActive ? { boxShadow: `0 10px 26px ${goal.color}59` } : undefined}
                >
                  {/* Le bouton porte déjà ce nom (aria-label, prioritaire) :
                      l'alt ne sera pas lu deux fois, il sert à l'indexation
                      de l'image. */}
                  <Image
                    src={`/ODD/ODD${goal.num}.png`}
                    alt={`${t.short} ${goal.num} — ${goal.title}`}
                    width={512}
                    height={512}
                    sizes="72px"
                    className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px] lg:h-16 lg:w-16"
                  />
                </button>

                {/* INTITULE PERMANENT — sous `lg`, la ou l'infobulle n'existe
                    pas. `aria-hidden` : le bouton annonce deja ce texte. */}
                <span
                  aria-hidden
                  className="mt-2 line-clamp-2 max-w-[16ch] text-center text-sm leading-snug text-stone-600 lg:hidden"
                >
                  {goal.title}
                </span>

                {/* INFOBULLE — conteneur de hauteur nulle pose au-dessus de
                    la pastille. Il ne porte que l'apparition ; la bulle et la
                    fleche portent la geometrie. */}
                <div
                  className={`pointer-events-none absolute bottom-full left-0 right-0 z-30 hidden h-0 transition-[opacity,transform] duration-150 ease-out lg:block ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute bottom-[6px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-dark-raised"
                  />
                  <div
                    ref={(node) => {
                      tipRefs.current[index] = node
                    }}
                    id={tooltipId}
                    role="tooltip"
                    className="absolute bottom-[11px] left-1/2 w-max max-w-[260px] rounded-md bg-dark-raised px-[18px] py-[14px] text-left shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                    style={{ transform: `translateX(calc(-50% + ${isActive ? shift : 0}px))` }}
                  >
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
                      {t.short} {goal.num}
                    </span>
                    <span className="mt-1 block text-[15px] font-medium leading-[1.4] text-white">
                      {goal.title}
                    </span>
                  </div>
                </div>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}
