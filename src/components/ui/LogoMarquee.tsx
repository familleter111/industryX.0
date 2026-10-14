import clsx from 'clsx'
import Image from 'next/image'

import { logoFrameWidth, type LogoAsset } from '@/lib/data/logoSizing'

type LogoMarqueeProps = {
  logos: LogoAsset[]
  /** Boite optique dans laquelle chaque logo est inscrit, en pixels. */
  box?: { w: number; h: number }
  /** Largeur d'une cellule. */
  cellClassName?: string
  /**
   * Nombre de copies de la liste dans le DOM. La piste translate de -50 % :
   * il faut donc un nombre pair, et chaque moitie doit depasser la largeur de
   * l'ecran pour que la boucle soit invisible.
   */
  copies?: number
  className?: string
}

/**
 * Bande de logos defilante.
 *
 * Le defilement est une boucle autonome : il appartient au CSS, comme le veut
 * la regle de frontiere de lib/motion.ts. Aucun JavaScript, aucun
 * framer-motion.
 *
 * Les bords s'effacent par `mask-image` et non par deux voiles en degrade
 * poses par-dessus. Un voile doit connaitre la couleur du fond ; quand la
 * section change de fond, il devient une bande d'une autre couleur — c'est
 * exactement ce qui est arrive ici. Le masque, lui, rend les pixels
 * transparents : il ignore ce qu'il y a derriere.
 *
 * Sous `prefers-reduced-motion`, la piste ne defile plus et se replie en
 * grille : les copies sont masquees, la liste s'affiche une seule fois.
 */
export default function LogoMarquee({
  logos,
  box = { w: 120, h: 54 },
  cellClassName = 'mx-6 h-[110px] w-[150px] sm:mx-8 sm:w-[170px] md:mx-10 md:w-[185px]',
  copies = 2,
  className,
}: LogoMarqueeProps) {
  const fade = 'linear-gradient(to right, transparent, #000 6rem, #000 calc(100% - 6rem), transparent)'

  return (
    <div
      className={clsx(
        'group/marquee relative w-full overflow-hidden py-4 sm:py-6',
        // Le masque passe par une variable CSS pour rester surchargeable : en
        // mouvement reduit la bande devient une grille, et un degradé
        // horizontal y effacerait les colonnes de bord.
        '[mask-image:var(--fade)] [-webkit-mask-image:var(--fade)]',
        'motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]',
        className,
      )}
      style={{ ['--fade' as string]: fade }}
    >
      <div
        className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]
                   motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        {Array.from({ length: copies }).map((_, copy) => (
          <div
            key={copy}
            // Les copies ne servent qu'a la boucle visuelle : une synthese
            // vocale ne doit pas enumerer les clients deux fois. Elles
            // disparaissent aussi quand le defilement est desactive.
            {...(copy > 0 ? { 'aria-hidden': true as const } : {})}
            className={clsx(
              'flex items-center',
              // Les cellules sont ici, pas sur la piste : c'est ce conteneur
              // qui doit se replier en grille.
              'motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center',
              copy > 0 && 'motion-reduce:hidden',
            )}
          >
            {logos.map((logo) => (
              <div
                key={`${copy}-${logo.src}`}
                className={clsx(
                  'group/logo flex shrink-0 items-center justify-center overflow-hidden',
                  cellClassName,
                )}
              >
                <Image
                  src={logo.src}
                  alt={copy === 0 ? logo.alt : ''}
                  width={512}
                  height={512}
                  style={{ width: logoFrameWidth(logo, box.w, box.h) }}
                  // `opacity-60 grayscale` effacait les logos au point de les
                  // rendre indechiffrables : un logo qu'on ne reconnait pas ne
                  // fait pas la preuve qu'on cherchait a faire. On garde le
                  // retrait — la bande ne doit pas concurrencer le titre — mais
                  // du bon cote de la lisibilite : desaturation partielle
                  // plutot que totale, et deux crans d'opacite en plus.
                  className="h-auto max-w-full shrink-0 object-contain opacity-80 grayscale-[0.55]
                             transition-[opacity,filter] duration-200 ease-smooth
                             group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
