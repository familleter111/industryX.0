import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

/**
 * Icone en trait fin dans un carre arrondi gris clair.
 *
 * Le motif venait du mega menu (`h-11 w-11 rounded-2xl bg-stone-100`), ou il
 * etait ecrit deux fois ; il sert desormais a toutes les sections marketing.
 * Une seule declaration, sinon chaque section derive de quelques pixels et la
 * page cesse de se lire comme un ensemble.
 *
 * `strokeWidth={1.5}` : lucide dessine a 2 par defaut, trop appuye a cote
 * d'un texte de 16 px en poids normal.
 *
 * Toujours `aria-hidden` : l'icone repete le titre qu'elle accompagne, elle
 * n'ajoute rien pour un lecteur d'ecran.
 */
export default function IconTile({
  icon: Icon,
  size = 'md',
  className,
}: {
  icon: LucideIcon
  /** `md` 44 px pour une carte, `sm` 36 px pour une ligne de liste. */
  size?: 'sm' | 'md'
  className?: string
}) {
  const box = size === 'sm' ? 'h-9 w-9 rounded-xl' : 'h-11 w-11 rounded-2xl'

  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-flex shrink-0 items-center justify-center bg-stone-100 text-stone-700',
        box,
        className,
      )}
    >
      <Icon size={size === 'sm' ? 16 : 18} strokeWidth={1.5} />
    </span>
  )
}
