import { ArrowDown, ArrowUp, ChevronDown } from 'lucide-react'

/**
 * Maquette du tableau de bord, en HTML, CSS et SVG.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LES COULEURS DE CRITICITE SONT UNE PALETTE D'ETAT, PAS UNE PALETTE DE SERIE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * C'est ce qui autorise le vert, l'ambre et le rouge sur une page ou la regle
 * des accents interdit un troisieme accent de marque : ces trois couleurs ne
 * designent pas trois categories interchangeables, elles encodent un niveau
 * de gravite ordonne. Le vert y garde son sens — rien de grave —, et le rouge
 * reste ce qu'il a toujours ete dans ce projet : une alerte reelle.
 *
 * Les trois pas ont ete valides plutot qu'estimes. La rampe a quatre niveaux
 * de la capture d'accueil (rouge, orange, ambre, vert) echoue au plancher de
 * separation en vision normale : ses deux oranges sont a un ecart de 9,6 la
 * ou il en faut 15, et un lecteur les distingue mal meme sans trouble de la
 * vision des couleurs. Trois niveaux passent. C'est pourquoi cette maquette
 * en montre trois et non quatre.
 *
 * L'ecart entre l'ambre et le vert reste dans la bande basse en vision
 * protanope : la regle veut alors un second encodage. Il est present — la
 * legende porte le libelle et le compte de chaque part, et un intervalle de
 * 2 px separe les arcs. La couleur ne porte jamais l'information seule.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  DONNEES
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Toutes inventees, et la maquette le dit elle-meme : une pastille
 * « Données d'exemple » est posee dans son en-tete, visible a l'ecran et pas
 * seulement dans un commentaire. Un tableau de bord credible qui ne se
 * signale pas comme exemple finit dans une capture d'ecran de presentation,
 * ou dans un appel d'offres.
 *
 * Entierement `aria-hidden`, comme `ChecklistScreen` : la legende du bloc, en
 * toutes lettres dans `content/`, est ce qui en tient lieu.
 */

/* ── Le jeu de donnees, en un seul endroit ───────────────────────────────
   Les geometries en decoulent : aucune coordonnee n'est ecrite a la main,
   ce qui evite qu'une valeur modifiee laisse un point au mauvais endroit. */

/** Taux de conformite mensuel, en pourcentage. */
const TREND = [
  { month: 'Jan', value: 58 },
  { month: 'Fév', value: 64 },
  { month: 'Mar', value: 71 },
  { month: 'Avr', value: 68 },
  { month: 'Mai', value: 79 },
  { month: 'Jui', value: 86 },
]

/** Non-conformites ouvertes, de la plus grave a la moins grave. */
const SEVERITY = [
  { label: 'Critiques', count: 4, arc: 'stroke-red-600', dot: 'bg-red-600' },
  { label: 'Majeures', count: 11, arc: 'stroke-amber-500', dot: 'bg-amber-500' },
  { label: 'Mineures', count: 23, arc: 'stroke-green-600', dot: 'bg-green-600' },
]

const KPIS = [
  { label: 'Taux de conformité', value: '84,8 %', delta: '+3,2 pts', lead: true },
  { label: 'Non-conformités ouvertes', value: '38' },
  { label: 'Actions en retard', value: '12', status: 'En retard' },
  {
    label: 'Délai moyen de traitement',
    value: '4,2 j',
    delta: '-1,1 j',
    // Un delai qui baisse est une amelioration : la fleche descend, la
    // couleur reste celle du progres. Une fleche montante sur « -1,1 j »
    // disait litteralement le contraire du chiffre qu'elle accompagnait.
    deltaDir: 'down' as const,
  },
]

export default function DashboardScreen() {
  return (
    <div aria-hidden="true" className="select-none bg-cream p-4 sm:p-6">
      <Header />

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <KpiTile key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <TrendCard />
        <SeverityCard />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-[14px] font-semibold text-gray-900">
        Tableau de bord opérationnel
      </p>

      {/* Le marqueur qui empeche la maquette de passer pour une capture. */}
      <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
        Données d’exemple
      </span>

      <span className="ml-auto flex items-center gap-1 rounded-full border border-cream-border bg-white px-2.5 py-1 text-[11px] font-medium text-subtle">
        6 derniers mois
        <ChevronDown size={12} strokeWidth={2} />
      </span>
    </div>
  )
}

/**
 * Une tuile d'indicateur.
 *
 * Un seul chiffre est colore, celui qui porte l'histoire de l'ecran : mettre
 * les quatre en couleur reviendrait a n'en souligner aucun. Les trois autres
 * restent en encre. Et la ou une couleur signale un etat, elle est doublee
 * d'un libelle — « En retard » est ecrit, pas seulement teinte.
 */
function KpiTile({
  label,
  value,
  delta,
  deltaDir = 'up',
  status,
  lead,
}: {
  label: string
  value: string
  delta?: string
  deltaDir?: 'up' | 'down'
  status?: string
  lead?: boolean
}) {
  const DeltaArrow = deltaDir === 'down' ? ArrowDown : ArrowUp
  return (
    <div className="rounded-xl border border-cream-border bg-white p-3.5">
      <p className="text-[11px] leading-tight text-subtle">{label}</p>

      <p
        className={`mt-2 font-display text-[24px] font-semibold leading-none tracking-[-0.02em] tabular-nums ${
          lead ? 'text-green-600' : 'text-gray-900'
        }`}
      >
        {value}
      </p>

      {delta && (
        <p className="mt-2 flex items-center gap-1 text-[11px] font-medium tabular-nums text-green-700">
          <DeltaArrow size={11} strokeWidth={2.5} />
          {delta}
        </p>
      )}

      {status && (
        <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-stone-700">
          <span className="h-[7px] w-[7px] rounded-full bg-amber-500" />
          {status}
        </p>
      )}
    </div>
  )
}

/* ── Courbe de tendance ──────────────────────────────────────────────────
   Repere : 0 % en bas, 100 % en haut. Un axe tronque exagererait une
   progression que ces chiffres n'ont pas a exagerer — ils sont inventes. */

const PLOT = { left: 30, right: 300, top: 10, bottom: 94 }
const GRID = [0, 25, 50, 75, 100]

const yOf = (value: number) =>
  PLOT.bottom - (value / 100) * (PLOT.bottom - PLOT.top)

const xOf = (index: number) =>
  PLOT.left + (index * (PLOT.right - PLOT.left)) / (TREND.length - 1)

function TrendCard() {
  const points = TREND.map((d, i) => ({ x: xOf(i), y: yOf(d.value), ...d }))
  const line = points.map((p) => `${p.x},${p.y.toFixed(1)}`).join(' ')

  // Pas d'aplat sous la courbe. Sur un repere qui part de zero, il couvre
  // les trois quarts du cadre : un grand bloc colore la ou la donnee tient
  // dans un trait de deux pixels. La capture d'accueil n'en met pas non plus
  // sur son grand graphe, seulement sur la vignette de synthese.

  return (
    <div className="rounded-xl border border-cream-border bg-white p-3.5">
      <p className="text-[12px] font-semibold text-gray-900">
        Évolution du taux de conformité
      </p>

      <svg viewBox="0 0 310 112" className="mt-2 w-full" role="presentation">
        {/* Grille en trait plein et non pointille : le pointille ajoute du
            bruit et se lit comme une donnee prevue plutot que comme un
            repere. */}
        {GRID.map((g) => (
          <g key={g}>
            <line
              x1={PLOT.left}
              y1={yOf(g)}
              x2={PLOT.right}
              y2={yOf(g)}
              className="stroke-stone-200"
              strokeWidth="1"
            />
            <text
              x={PLOT.left - 6}
              y={yOf(g) + 3}
              textAnchor="end"
              className="fill-stone-600 text-[7px]"
            >
              {g}%
            </text>
          </g>
        ))}

        <polyline
          points={line}
          fill="none"
          className="stroke-green-600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p) => (
          <circle
            key={p.month}
            cx={p.x}
            cy={p.y}
            r="3"
            className="fill-green-600 stroke-white"
            strokeWidth="2"
          />
        ))}

        {points.map((p) => (
          <text
            key={p.month}
            x={p.x}
            y="108"
            textAnchor="middle"
            className="fill-stone-600 text-[7px]"
          >
            {p.month}
          </text>
        ))}
      </svg>
    </div>
  )
}

/* ── Donut de repartition ────────────────────────────────────────────────
   Trois parts de tailles nettement differentes : un donut ne sert qu'a lire
   une part-au-tout d'un coup d'oeil, jamais a comparer des valeurs proches.
   Les longueurs d'arc et les decalages sont derives, pas ecrits a la main. */

const RADIUS = 32
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const GAP = 2

function SeverityCard() {
  const total = SEVERITY.reduce((sum, s) => sum + s.count, 0)

  let cursor = 0
  const arcs = SEVERITY.map((s) => {
    const length = (s.count / total) * CIRCUMFERENCE
    const arc = { ...s, length, offset: cursor }
    cursor += length
    return arc
  })

  return (
    // `h-full` + `justify-center` : les deux cartes de la rangee ont la meme
    // hauteur, imposee par le graphe. Sans cela le donut reste colle en haut
    // et laisse un tiers de carte vide sous lui.
    <div className="flex h-full flex-col rounded-xl border border-cream-border bg-white p-3.5">
      <p className="text-[12px] font-semibold text-gray-900">
        Non-conformités par criticité
      </p>

      <div className="flex flex-1 items-center justify-center gap-4 py-3">
        <div className="relative shrink-0">
          <svg viewBox="0 0 88 88" className="h-[88px] w-[88px]" role="presentation">
            <g transform="rotate(-90 44 44)">
              {arcs.map((a) => (
                <circle
                  key={a.label}
                  cx="44"
                  cy="44"
                  r={RADIUS}
                  fill="none"
                  className={a.arc}
                  strokeWidth="12"
                  // L'intervalle de 2 px est retire de l'arc, pas ajoute :
                  // les parts continuent de totaliser le cercle entier.
                  strokeDasharray={`${Math.max(a.length - GAP, 0)} ${
                    CIRCUMFERENCE - Math.max(a.length - GAP, 0)
                  }`}
                  strokeDashoffset={-a.offset}
                />
              ))}
            </g>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[18px] font-semibold leading-none tabular-nums text-gray-900">
              {total}
            </span>
            <span className="mt-0.5 text-[8px] text-subtle">ouvertes</span>
          </div>
        </div>

        {/* La legende porte le libelle ET le compte de chaque part : c'est
            elle qui fait que la couleur ne porte jamais l'information seule. */}
        <ul className="min-w-0 flex-1 space-y-1.5">
          {SEVERITY.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
              <span className="flex-1 truncate text-[11px] text-stone-700">
                {s.label}
              </span>
              <span className="text-[11px] font-semibold tabular-nums text-gray-900">
                {s.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
