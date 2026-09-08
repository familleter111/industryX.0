import { Check, ChevronDown } from 'lucide-react'

/**
 * Maquette du suivi des CAPA par etat, en HTML et CSS.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  CE QUI EST ECRIT, ET CE QUI NE L'EST PAS
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Les noms de colonnes et les compteurs sont du vrai texte : c'est ce que la
 * maquette doit faire comprendre. Le contenu des cartes, lui, est reduit a des
 * silhouettes. Ecrire « Fuite hydraulique presse 3 — ligne L2 » donnerait des
 * intitules de non-conformites credibles et entierement inventes, que rien
 * n'empeche ensuite de recopier dans une presentation.
 *
 * Les compteurs, eux, ne peuvent pas etre remplaces par des barres grises
 * sans vider le bloc de son sens. Ils portent donc la mention « Données
 * d'exemple » dans l'en-tete, comme le tableau de bord.
 *
 * Les pastilles de criticite reprennent la rampe d'etat validee du site —
 * rouge, ambre, vert — et sont doublees d'une legende sous le tableau : la
 * couleur ne porte jamais l'information seule.
 *
 * Le tableau defile horizontalement sous sa largeur utile plutot que de
 * comprimer cinq colonnes a l'illisible. C'est aussi le comportement d'un
 * vrai tableau kanban, donc la maquette reste juste.
 *
 * Entierement `aria-hidden` : la legende du bloc, dans `content/`, decrit ce
 * que l'ecran montre.
 */

type Severity = 'high' | 'mid' | 'low'

const DOT: Record<Severity, string> = {
  high: 'bg-red-600',
  mid: 'bg-amber-500',
  low: 'bg-green-600',
}

const LEGEND: { label: string; severity: Severity }[] = [
  { label: 'Critique', severity: 'high' },
  { label: 'Majeure', severity: 'mid' },
  { label: 'Mineure', severity: 'low' },
]

const COLUMNS: {
  label: string
  count: number
  cards: Severity[]
  done?: boolean
}[] = [
  { label: 'Ouvertes', count: 12, cards: ['high', 'mid', 'low'] },
  { label: 'En analyse', count: 5, cards: ['high', 'mid'] },
  { label: 'En action', count: 9, cards: ['mid', 'low', 'mid'] },
  { label: 'En vérification', count: 3, cards: ['low'] },
  { label: 'Clôturées', count: 47, cards: ['low', 'mid'], done: true },
]

export default function CapaPipeline() {
  return (
    <div aria-hidden="true" className="select-none bg-cream p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-[14px] font-semibold text-gray-900">
          Suivi des non-conformités et CAPA
        </p>

        <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-700">
          Données d’exemple
        </span>

        <span className="ml-auto flex items-center gap-1 rounded-full border border-cream-border bg-white px-2.5 py-1 text-[11px] font-medium text-subtle">
          Tous les sites
          <ChevronDown size={12} strokeWidth={2} />
        </span>
      </div>

      <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1">
        {COLUMNS.map((column) => (
          <div key={column.label} className="w-[150px] shrink-0 sm:w-[172px]">
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="truncate text-[11px] font-semibold text-gray-900">
                {column.label}
              </span>
              <span
                className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                  column.done
                    ? 'bg-green-50 text-green-700'
                    : 'bg-stone-200 text-stone-700'
                }`}
              >
                {column.count}
              </span>
            </div>

            <div className="mt-2 space-y-2 rounded-xl bg-stone-100/70 p-2">
              {column.cards.map((severity, index) => (
                <Card key={index} severity={severity} done={column.done} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Doublage obligatoire de la couleur : sans ces libelles, les pastilles
          ne diraient rien a qui ne distingue pas le rouge de l'ambre. */}
      <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {LEGEND.map((entry) => (
          <li key={entry.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${DOT[entry.severity]}`} />
            <span className="text-[11px] text-stone-700">{entry.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Une carte du tableau. Silhouette et non texte : voir l'en-tete du fichier.
 */
function Card({ severity, done }: { severity: Severity; done?: boolean }) {
  return (
    <div className="rounded-lg border border-cream-border bg-white p-2.5">
      <div className="flex items-center gap-2">
        {done ? (
          <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-green-50">
            <Check size={8} strokeWidth={3} className="text-green-600" />
          </span>
        ) : (
          <span className={`h-2 w-2 shrink-0 rounded-full ${DOT[severity]}`} />
        )}
        <span className="h-1.5 flex-1 rounded-full bg-stone-200" />
      </div>

      <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-stone-200" />

      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="h-4 w-4 shrink-0 rounded-full bg-stone-100" />
        <span className="h-1.5 w-8 rounded-full bg-stone-100" />
      </div>
    </div>
  )
}
