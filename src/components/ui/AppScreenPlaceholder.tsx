import { tokens } from '@/lib/tokens'

/**
 * Ecran d'application schematique, affiche dans le mockup telephone tant que
 * la capture reelle n'est pas fournie.
 *
 * L'intention compte autant que le rendu : ce n'est pas un asset manquant
 * mais une maquette assumee. Pas d'icone d'image cassee, pas de texte
 * « visuel a venir ». On dessine la silhouette d'une interface — barre de
 * statut, titre, carte de synthese, lignes de contenu, barre d'onglets —
 * dans les ors et cremes de la marque, avec un flou leger qui la fait lire
 * comme un ecran hors focus.
 *
 * Purement decoratif : aria-hidden, et le sens est porte par le texte de la
 * section.
 */

const { gold, cream } = tokens.color

export default function AppScreenPlaceholder({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 144 306"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="apScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={cream.DEFAULT} />
        </linearGradient>
        <linearGradient id="apCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gold.DEFAULT} stopOpacity="0.16" />
          <stop offset="100%" stopColor={gold.DEFAULT} stopOpacity="0.05" />
        </linearGradient>
        <filter id="apSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>

      <rect width="144" height="306" fill="url(#apScreen)" />

      <g filter="url(#apSoft)">
        {/* barre de statut */}
        <rect x="14" y="12" width="18" height="3" rx="1.5" fill={gold.deep} opacity="0.35" />
        <rect x="112" y="12" width="18" height="3" rx="1.5" fill={gold.deep} opacity="0.2" />

        {/* titre d'ecran */}
        <rect x="14" y="34" width="62" height="7" rx="3.5" fill={gold.deep} opacity="0.55" />
        <rect x="14" y="46" width="40" height="4" rx="2" fill={gold.deep} opacity="0.25" />

        {/* carte de synthese avec micro-graphe */}
        <rect x="12" y="62" width="120" height="62" rx="10" fill="url(#apCard)" />
        <rect x="12.5" y="62.5" width="119" height="61" rx="9.5" fill="none" stroke={gold.DEFAULT} strokeOpacity="0.28" />
        <rect x="22" y="72" width="34" height="4" rx="2" fill={gold.deep} opacity="0.4" />
        <rect x="22" y="82" width="22" height="9" rx="2" fill={gold.DEFAULT} opacity="0.55" />
        <g fill={gold.DEFAULT} opacity="0.45">
          <rect x="82" y="104" width="6" height="10" rx="2" />
          <rect x="92" y="97" width="6" height="17" rx="2" />
          <rect x="102" y="88" width="6" height="26" rx="2" />
          <rect x="112" y="93" width="6" height="21" rx="2" />
        </g>
        <path d="M22 112 L36 104 L50 108 L64 96" fill="none" stroke={gold.DEFAULT} strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

        {/* lignes de liste */}
        {[140, 164, 188, 212].map((y, i) => (
          <g key={y}>
            <rect x="12" y={y} width="120" height="18" rx="6" fill={gold.DEFAULT} opacity="0.06" />
            <circle cx="24" cy={y + 9} r="4.5" fill={gold.DEFAULT} opacity="0.35" />
            <rect x="35" y={y + 5} width={68 - i * 9} height="3.5" rx="1.75" fill={gold.deep} opacity="0.3" />
            <rect x="35" y={y + 11} width={44 - i * 6} height="2.5" rx="1.25" fill={gold.deep} opacity="0.16" />
          </g>
        ))}

        {/* barre d'onglets */}
        <rect x="0" y="272" width="144" height="34" fill="#FFFFFF" opacity="0.85" />
        <line x1="0" y1="272" x2="144" y2="272" stroke={cream.border} strokeWidth="1" />
        {[30, 58, 86, 114].map((x, i) => (
          <g key={x}>
            <rect x={x - 5} y="282" width="10" height="10" rx="3" fill={gold.DEFAULT} opacity={i === 0 ? 0.6 : 0.22} />
            <rect x={x - 7} y="295" width="14" height="2" rx="1" fill={gold.deep} opacity={i === 0 ? 0.4 : 0.15} />
          </g>
        ))}
      </g>
    </svg>
  )
}
