import { ArrowUpRight, Camera, Check, ChevronLeft, ImageIcon } from 'lucide-react'

/**
 * Maquette d'un ecran de checklist, en HTML et CSS.
 *
 * Ni image, ni SVG, ni capture : le contenu est du texte dans des elements
 * ordinaires. Trois consequences qui justifient le choix — il reste net a
 * n'importe quelle densite d'ecran, il pese ce que pesent quelques <div>, et
 * corriger un libelle se fait ici plutot que dans un fichier binaire qu'il
 * faut reexporter.
 *
 * Entierement `aria-hidden`. Ce n'est pas un oubli : lu element par element,
 * il donnerait « 09:42, Démarrage de ligne L3, 6 sur 12, Pression circuit
 * air, Conforme, 6,2 bar… » — une suite de fragments sans syntaxe, plus
 * penible qu'utile. La phrase qui en tient lieu est la legende du bloc, dans
 * `content/`, et elle dit ce que l'ecran montre.
 *
 * Le rouge est autorise ici : c'est un etat d'alerte reel — une
 * non-conformite —, pas un accent de marque pose pour attirer l'oeil. Le vert
 * marque les items valides, son seul emploi. L'or n'apparait nulle part :
 * aucune action n'est declenchable sur une maquette.
 */
export default function ChecklistScreen({
  className = '',
}: {
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto w-full max-w-[310px] select-none ${className}`}
    >
      {/* Chassis. Le liseré crème evite que le noir du telephone ne se
          decoupe trop durement sur le fond de section. */}
      <div className="rounded-[2.5rem] border border-cream-deep bg-dark p-2.5">
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <StatusBar />
          <Header />
          <ol className="divide-y divide-cream-border">
            <Item label="Pression circuit air" value="6,2 bar" state="ok" />
            <Item label="Propreté du poste" value="Conforme" state="ok" />
            <NonConformingItem />
            <Item label="Serrage buse 4" value="À contrôler" state="todo" />
          </ol>
          <BottomBar />
        </div>
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between bg-stone-50 px-5 pb-2 pt-3">
      <span className="text-[10px] font-semibold tabular-nums text-subtle">
        09:42
      </span>
      <div className="flex items-center gap-1">
        <span className="h-[7px] w-[3px] rounded-sm bg-stone-300" />
        <span className="h-[9px] w-[3px] rounded-sm bg-stone-400" />
        <span className="h-[11px] w-[3px] rounded-sm bg-stone-400" />
        <span className="ml-1.5 h-[9px] w-4 rounded-[3px] border border-stone-400" />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="border-b border-cream-border bg-stone-50 px-5 pb-4">
      <div className="flex items-center gap-2">
        <ChevronLeft size={14} strokeWidth={2} className="text-subtle" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-subtle">
          Contrôles du poste
        </span>
      </div>

      <p className="mt-2 text-[15px] font-semibold leading-tight text-gray-900">
        Démarrage de ligne — L3
      </p>

      <div className="mt-3 flex items-center gap-3">
        {/* Barre de progression : deux <div>, pas un <progress>, que les
            navigateurs stylent chacun a leur facon. */}
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-stone-200">
          <div className="h-full w-1/2 rounded-full bg-dark" />
        </div>
        <span className="text-[11px] font-semibold tabular-nums text-subtle">
          6/12
        </span>
      </div>
    </div>
  )
}

function Item({
  label,
  value,
  state,
}: {
  label: string
  value: string
  state: 'ok' | 'todo'
}) {
  return (
    <li className="flex items-center gap-3 px-5 py-3.5">
      {state === 'ok' ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
          <Check size={12} strokeWidth={2.5} className="text-green-600" />
        </span>
      ) : (
        <span className="h-5 w-5 shrink-0 rounded-full border border-dashed border-stone-300" />
      )}

      <span className="flex-1 text-[13px] leading-tight text-gray-900">
        {label}
      </span>

      <span className="text-[12px] tabular-nums text-subtle">{value}</span>
    </li>
  )
}

/**
 * L'item qui porte tout le propos du bloc : un constat non conforme, la
 * preuve qui lui est attachee, et la notification deja partie.
 */
function NonConformingItem() {
  return (
    <li className="bg-red-50/60 px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
          <span className="h-[7px] w-[7px] rounded-full bg-red-600" />
        </span>

        <span className="flex-1 text-[13px] font-semibold leading-tight text-gray-900">
          Température de consigne
        </span>

        <span className="rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">
          Non conforme
        </span>
      </div>

      <div className="mt-3 space-y-2.5 pl-8">
        <div className="flex items-baseline gap-2 text-[12px] tabular-nums">
          <span className="font-semibold text-red-700">78 °C</span>
          <span className="text-subtle">attendu 60 – 65 °C</span>
        </div>

        {/* Piece jointe. La vignette est une tuile grise portant l'icone
            « image » : suggerer une photo qui n'existe pas serait la seule
            chose malhonnete de cette maquette. */}
        <div className="flex items-center gap-2 rounded-lg border border-cream-border bg-white p-1.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-stone-200">
            <ImageIcon size={13} strokeWidth={1.75} className="text-stone-600" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-gray-900">
              IMG_2043.jpg
            </p>
            <p className="flex items-center gap-1 text-[10px] text-subtle">
              <Camera size={9} strokeWidth={2} />
              Photo jointe · 09:41
            </p>
          </div>
        </div>

        <p className="flex items-center gap-1.5 text-[10px] font-medium text-subtle">
          <ArrowUpRight size={11} strokeWidth={2.25} className="text-red-600" />
          Responsable de ligne notifié à 09:41
        </p>
      </div>
    </li>
  )
}

function BottomBar() {
  return (
    <div className="border-t border-cream-border bg-stone-50 px-5 py-3.5">
      <div className="rounded-full bg-dark py-2.5 text-center text-[12px] font-semibold text-white">
        Terminer le contrôle
      </div>
    </div>
  )
}
