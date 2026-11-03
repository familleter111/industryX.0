/**
 * Témoignage client, affiché sur l'accueil et sur /customers.
 * Lu par src/lib/cms/testimonials.ts.
 *
 * « Verbatim validé par le client » remplace le `status` de
 * src/lib/data/testimonials.ts : un texte non validé est une proposition de
 * rédaction, jamais prononcée par la société citée.
 */

import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Témoignage client',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Société', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'quote', title: 'Verbatim', type: 'localeText', validation: (rule) => rule.required() }),
    defineField({
      name: 'author',
      title: 'Fonction de la personne citée',
      description: 'La fonction, pas le nom : « Responsable Qualité ».',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'sector', title: 'Secteur', type: 'localeString', validation: (rule) => rule.required() }),
    defineField({
      name: 'clientApproved',
      title: 'Verbatim validé par le client',
      description:
        'À cocher seulement quand la société citée a relu et approuvé ce texte. Sinon, c’est une proposition de rédaction.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo',
      description: 'Nom du logo dans la bibliothèque du site (ex. « Warda »). Vide ou inconnu : initiales de la société.',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Note (étoiles)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: 'order',
      title: 'Ordre d’affichage',
      description: 'Du plus petit au plus grand. Laisser des écarts (10, 20, 30…) pour intercaler.',
      type: 'number',
    }),
  ],
  orderings: [{ title: 'Ordre d’affichage', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'company', author: 'author.fr', approved: 'clientApproved' },
    prepare: ({ title, author, approved }) => ({
      title,
      subtitle: `${approved ? 'Validé' : 'À valider'}${author ? ` · ${author}` : ''}`,
    }),
  },
})
