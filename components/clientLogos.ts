/**
 * Source unique des logos clients (dossier /public/logos).
 *
 * Les 21 fichiers sont des carrés 512×512 à fond transparent, mais le logo
 * qu'ils contiennent occupe une part très variable du cadre : de 12 % de
 * hauteur (TCH Industries, un wordmark fin) à 86 % (le blason). Les afficher
 * tels quels donne des tailles perçues très inégales.
 *
 * `contentWidth` / `contentHeight` sont les dimensions réelles du logo, en
 * fraction du cadre, mesurées sur chaque fichier (boîte englobante des pixels
 * non transparents). `logoFrameWidth()` s'en sert pour inscrire ce contenu
 * dans une boîte commune — c'est ce qui uniformise la taille perçue.
 */

import type { LogoAsset } from './logoSizing'

export type ClientLogo = LogoAsset

// Règle de dimensionnement commune aux clients et aux partenaires.
export { logoFrameWidth } from './logoSizing'

const W = 0.86 // largeur commune à laquelle les fichiers ont été normalisés

export const CLIENT_LOGOS: ClientLogo[] = [
  { src: '/logos/01_opella.png', alt: 'Opella', contentWidth: W, contentHeight: 0.25 },
  {
    src: '/logos/02_rose-blanche-group.png',
    alt: 'Rose Blanche Group',
    contentWidth: W,
    contentHeight: 0.23,
  },
  { src: '/logos/03_bem.png', alt: 'BEM', contentWidth: W, contentHeight: 0.29 },
  {
    src: '/logos/04_kilani-groupe.png',
    alt: 'Kilani Groupe',
    contentWidth: W,
    contentHeight: 0.83,
  },
  {
    src: '/logos/05_ministere-sante-publique.png',
    alt: 'Ministère de la Santé Publique — République Tunisienne',
    contentWidth: W,
    contentHeight: 0.67,
  },
  { src: '/logos/06_warda.png', alt: 'Warda', contentWidth: W, contentHeight: 0.82 },
  { src: '/logos/07_diari.png', alt: 'Diari', contentWidth: W, contentHeight: 0.74 },
  { src: '/logos/08_spiga.png', alt: 'Spiga', contentWidth: W, contentHeight: 0.51 },
  { src: '/logos/09_saiph.png', alt: 'Saiph', contentWidth: W, contentHeight: 0.49 },
  { src: '/logos/10_medpack.png', alt: 'Medpack', contentWidth: W, contentHeight: 0.16 },
  {
    src: '/logos/11_idea-consult.png',
    alt: 'IDEA Consult',
    contentWidth: W,
    contentHeight: 0.52,
  },
  { src: '/logos/12_saci.png', alt: 'SACI', contentWidth: W, contentHeight: 0.3 },
  { src: '/logos/13_medis.png', alt: 'Médis', contentWidth: W, contentHeight: 0.45 },
  // TODO — identifier la commune exacte (texte en arabe sur le blason).
  // Seul logo plus étroit que les autres : 68 % de largeur.
  {
    src: '/logos/14_blason-municipalite.png',
    alt: 'Municipalité',
    contentWidth: 0.68,
    contentHeight: 0.86,
  },
  { src: '/logos/15_mon-bijou.png', alt: 'Mon Bijou', contentWidth: W, contentHeight: 0.83 },
  // Rieker est le seul export sans marge : le disque remplit tout le cadre.
  {
    src: '/logos/16_rieker.webp',
    alt: 'Rieker',
    contentWidth: 1,
    contentHeight: 1,
  },
  {
    src: '/logos/17_neapolis-pharma.png',
    alt: 'Neapolis Pharma',
    contentWidth: W,
    contentHeight: 0.33,
  },
  {
    src: '/logos/18_polyroto-group.png',
    alt: 'Polyroto Group',
    contentWidth: W,
    contentHeight: 0.19,
  },
  { src: '/logos/19_la-soie.png', alt: 'La Soie', contentWidth: W, contentHeight: 0.25 },
  {
    src: '/logos/20_tch-industries.png',
    alt: 'TCH Industries',
    contentWidth: W,
    contentHeight: 0.12,
  },
  { src: '/logos/21_ar-assur.png', alt: 'AR Assur', contentWidth: W, contentHeight: 0.84 },
]

/** Retrouve un logo par son `alt` — pour les vignettes de témoignages. */
export function findClientLogo(alt: string): ClientLogo | undefined {
  return CLIENT_LOGOS.find((logo) => logo.alt === alt)
}
