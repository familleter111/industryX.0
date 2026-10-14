import type { LucideIcon } from 'lucide-react'

/**
 * Anneau ouvert portant une icone.
 *
 * `pathLength={100}` normalise la longueur du trace : le pointille s'exprime
 * alors en pourcentage du cercle, independamment du rayon. 78 / 22 laisse une
 * ouverture d'un peu moins d'un quart de tour, et la rotation la place en
 * haut a droite. Un point ferme l'extremite visible du trait.
 *
 * Entierement decoratif : l'icone qu'il contient ne porte jamais seule une
 * information, elle accompagne toujours un titre en clair.
 */
export type RingTone = {
  /** Couleur du trace de l'anneau, ex. `stroke-rose-300`. */
  arc: string
  /** Couleur du point terminal, ex. `bg-rose-400`. */
  dot: string
  /** Halo diffuse sous l'icone, ex. `bg-rose-100/70`. */
  glow: string
  /** Couleur de l'icone, ex. `text-rose-500`. */
  icon: string
  /**
   * Disque plein derriere l'icone, ex. `bg-dark`. Absent, l'icone se pose
   * directement sur le fond de section et seul le halo la porte.
   */
  disc?: string
}

export default function OpenRing({
  icon: Icon,
  tone,
  className = 'h-[68px] w-[68px] sm:h-[76px] sm:w-[76px]',
}: {
  icon: LucideIcon
  tone: RingTone
  className?: string
}) {
  return (
    <span className={`relative block shrink-0 ${className}`}>
      {/* HALO — la couleur diffusee sous l'icone, pas un aplat. */}
      <span aria-hidden className={`absolute inset-[7px] rounded-full blur-[7px] ${tone.glow}`} />

      {tone.disc && (
        <span aria-hidden className={`absolute inset-[15px] rounded-full ${tone.disc}`} />
      )}

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full -rotate-[135deg]"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          strokeWidth="1.6"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="78 22"
          className={tone.arc}
        />
      </svg>

      {/* POINT TERMINAL — pose sur le trace, a l'extremite de l'arc. */}
      <span aria-hidden className="absolute inset-0 rotate-[145deg]">
        <span
          className={`absolute left-1/2 top-[3%] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full ${tone.dot}`}
        />
      </span>

      <span className="absolute inset-0 grid place-items-center">
        <Icon size={24} strokeWidth={1.6} className={tone.icon} />
      </span>
    </span>
  )
}
