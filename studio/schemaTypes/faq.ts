/**
 * Question fréquente, affichée dans la section FAQ de l'accueil et reprise
 * dans ses données structurées (FAQPage, lues par Google).
 * Lu par src/lib/cms/faq.ts.
 *
 * L'assistant de chat garde sa propre liste dans le code : une réponse
 * corrigée ici n'y change pas (voir docs/cms.md).
 */

import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Question fréquente',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'localeString', validation: (rule) => rule.required() }),
    defineField({ name: 'answer', title: 'Réponse', type: 'localeText', validation: (rule) => rule.required() }),
    defineField({
      name: 'order',
      title: 'Ordre d’affichage',
      description: 'Du plus petit au plus grand. La première question est ouverte par défaut.',
      type: 'number',
    }),
  ],
  orderings: [{ title: 'Ordre d’affichage', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question.fr', subtitle: 'answer.fr' } },
})
