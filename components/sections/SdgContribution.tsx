'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { tokens } from '@/lib/tokens'
import { useMotion } from '@/lib/useMotion'

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

/** Marge minimale entre l'infobulle et le bord du viewport, en pixels. */
const VIEWPORT_MARGIN = 16

/**
 * Contribution aux Objectifs de Developpement Durable.
 *
 * L'infobulle s'ouvre SOUS la pastille, fleche vers le haut. Ouverte vers le
 * haut, elle recouvrait le titre et le sous-titre de la section : le seul
 * espace libre au-dessus d'une grille posee sous un en-tete, c'est l'en-tete
 * lui-meme. Sous la grille, l'espace est reserve par un padding
 * (`lg:pb-28`, 112 px pour une bulle qui en descend 104) plutot que dispute
 * a un voisin.
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
  const baseId = useId()

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
      className={`relative z-10 mx-auto max-w-6xl ${className}`}
    >
      {/* EN-TETE — recentre, 640 px, 48 px de respiration avant la grille. */}
      <motion.div variants={m.fadeUp} className="mx-auto mb-12 max-w-[640px] text-center">
        <h4 className="mb-2 text-[15px] font-bold text-dark">
          Contribution aux Objectifs de Développement Durable
        </h4>
        <p className="text-sm leading-relaxed text-stone-600">
          Six objectifs sur lesquels la plateforme a un effet mesurable.
        </p>
      </motion.div>

      <ul className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-6 lg:gap-x-6 lg:pb-28">
        {SDG_GOALS.map((goal, index) => {
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
                  aria-label={`ODD ${goal.num} — ${goal.title}`}
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
                  <Image
                    src={`/ODD/ODD${goal.num}.png`}
                    alt=""
                    width={512}
                    height={512}
                    className="h-20 w-20 object-contain sm:h-[88px] sm:w-[88px] lg:h-24 lg:w-24"
                  />
                </button>

                {/* INTITULE PERMANENT — sous `lg`, la ou l'infobulle n'existe
                    pas. `aria-hidden` : le bouton annonce deja ce texte. */}
                <span
                  aria-hidden
                  className="mt-3 line-clamp-2 max-w-[15ch] text-center text-[12px] leading-snug text-stone-600 lg:hidden"
                >
                  {goal.title}
                </span>

                {/* INFOBULLE — conteneur de hauteur nulle pose sous la
                    pastille. Il ne porte que l'apparition ; la bulle et la
                    fleche portent la geometrie. */}
                <div
                  className={`pointer-events-none absolute left-0 right-0 top-full z-30 hidden h-0 transition-[opacity,transform] duration-150 ease-out lg:block ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[6px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-dark-raised"
                  />
                  <div
                    ref={(node) => {
                      tipRefs.current[index] = node
                    }}
                    id={tooltipId}
                    role="tooltip"
                    className="absolute left-1/2 top-[11px] w-max max-w-[260px] rounded-md bg-dark-raised px-[18px] py-[14px] text-left shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                    style={{ transform: `translateX(calc(-50% + ${isActive ? shift : 0}px))` }}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300">
                      ODD {goal.num}
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
