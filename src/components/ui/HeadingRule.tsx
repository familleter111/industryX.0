import Reveal from '@/components/ui/Reveal'

/**
 * Filet — point — filet, pose sous un en-tete de section.
 *
 * Ferme le bloc de titre avant la grille : sans lui, le sous-titre et la
 * premiere ligne de contenu se touchent et l'en-tete cesse de se lire comme
 * un ensemble. Purement decoratif, donc entierement `aria-hidden` : il ne
 * porte aucune information que la structure du document ne donne deja.
 */
export default function HeadingRule({ className = '' }: { className?: string }) {
  return (
    <Reveal
      variant="in"
      className={`flex items-center justify-center gap-2.5 ${className}`}
    >
      <span aria-hidden className="h-px w-14 bg-gradient-to-r from-transparent to-cream-deep sm:w-20" />
      <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-green-500" />
      <span aria-hidden className="h-px w-14 bg-gradient-to-l from-transparent to-cream-deep sm:w-20" />
    </Reveal>
  )
}
