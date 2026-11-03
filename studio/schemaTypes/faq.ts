/**
 * Question fréquente, affichée dans la section FAQ de l'accueil et reprise
 * dans ses données structurées (FAQPage, lues par Google).
 * Lu par src/lib/cms/faq.ts.
 *
 * L'assistant de chat utilise aussi ces réponses, avec l'IA comme sans
 * (src/lib/chat/faq.ts) : une réponse corrigée ici l'est partout.
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
      name: 'key',
      title: 'Identifiant pour l’assistant',
      description:
        'Relie la question aux mots-clés que l’assistant reconnaît sans IA. Fixé par l’import ; une nouvelle question n’en a pas, seule l’IA y répond.',
      type: 'string',
      readOnly: true,
      hidden: ({ value }) => !value,
    }),
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
