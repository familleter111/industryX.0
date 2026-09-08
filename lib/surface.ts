/**
 * Remplissage d'une carte selon la surface qui la porte.
 *
 * Tant qu'un bloc ouvrait sa propre section, il choisissait son fond et
 * pouvait figer ses cartes en blanc. Depuis que plusieurs blocs partagent une
 * meme section (voir `SectionStack`), c'est la section hote qui decide : une
 * carte blanche peut se retrouver posee sur du blanc, et il ne lui reste alors
 * que son filet d'un pixel. Le bloc perd sa lecture en cases sans que rien ne
 * casse — le genre de regression qu'on ne voit qu'en regardant la page.
 *
 * On prend donc l'autre surface neutre : c'est l'alternance creme / blanc du
 * site, ramenee a l'interieur d'une section.
 */
export function cardSurface(background: 'cream' | 'white'): string {
  return background === 'white' ? 'bg-cream' : 'bg-white'
}
