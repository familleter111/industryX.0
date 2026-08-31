/**
 * Dimensionnement optique partagé par les logos clients et partenaires.
 *
 * Les fichiers sont des carrés à fond transparent, mais le logo qu'ils
 * contiennent occupe une part très variable du cadre. Les afficher à taille
 * égale donne donc des tailles perçues très inégales. `contentWidth` et
 * `contentHeight` sont les dimensions réelles du logo, en fraction du cadre,
 * relevées sur chaque fichier (boîte englobante des pixels non transparents).
 */

export type LogoAsset = {
  src: string
  alt: string
  /** Largeur du contenu réel, en fraction du cadre. */
  contentWidth: number
  /** Hauteur du contenu réel, en fraction du cadre. */
  contentHeight: number
}

/**
 * Largeur (px) à appliquer au cadre carré pour que le logo qu'il contient
 * s'inscrive exactement dans une boîte `boxW × boxH`, marges du fichier
 * neutralisées. Le cadre déborde donc pour les wordmarks larges : ce débord
 * est transparent, il suffit que la cellule d'accueil soit en `overflow-hidden`.
 */
export function logoFrameWidth(
  logo: LogoAsset,
  boxW: number,
  boxH: number
): number {
  return Math.min(boxW / logo.contentWidth, boxH / logo.contentHeight)
}
