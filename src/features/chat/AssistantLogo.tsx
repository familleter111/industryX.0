/**
 * Logo de l'assistant Industriooo, dérivé du logo Industry X.0 : la roue
 * dentée de la marque, et dedans un visage de robot dont l'antenne et les
 * joues reprennent les pastilles de circuit du « X ».
 *
 * Vectoriel, sans fichier : net à toutes les tailles, de l'en-tête (32 px)
 * à l'accueil de la conversation (72 px).
 */

/** Huit dents régulières autour du centre (32, 32). */
const TEETH = Array.from({ length: 8 }, (_, i) => i * 45)

export default function AssistantLogo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      className={className}
    >
      {/* Roue dentée */}
      <g className="fill-dark">
        {TEETH.map((angle) => (
          <rect key={angle} x="27" y="1" width="10" height="10" rx="2.5" transform={`rotate(${angle} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="26" />
      </g>
      <circle cx="32" cy="32" r="20.5" className="fill-dark-raised stroke-gold" strokeWidth="1.5" />

      {/* Antenne : une pastille de circuit */}
      <path d="M32 17.5v-4" className="stroke-gold" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="12.5" r="2.4" className="fill-gold" />

      {/* Visage */}
      <rect x="20" y="22" width="24" height="18" rx="7" className="fill-gold" />
      <ellipse cx="27" cy="30" rx="2.3" ry="3" className="fill-dark" />
      <ellipse cx="37" cy="30" rx="2.3" ry="3" className="fill-dark" />
      <path d="M28.5 35.2q3.5 2.6 7 0" fill="none" className="stroke-dark" strokeWidth="1.8" strokeLinecap="round" />

      {/* Oreilles, reliées comme les pistes du « X » */}
      <path d="M20 31h-3.5M44 31h3.5" className="stroke-gold" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="31" r="1.8" className="fill-gold" />
      <circle cx="48" cy="31" r="1.8" className="fill-gold" />
    </svg>
  )
}
