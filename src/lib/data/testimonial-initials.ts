import type { Testimonial } from '@/lib/data/testimonials'

/**
 * Initiales de repli d'un témoignage sans photo ni logo : celles de la
 * personne si elle est nommée, sinon celles de la société.
 *
 * Module à part : les cartes, composants clients, l'importent sans embarquer
 * la liste des témoignages (lib/data/testimonials.ts).
 */
export function testimonialInitials(testimonial: Pick<Testimonial, 'name' | 'company'>): string {
  return (testimonial.name?.trim() || testimonial.company)
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
