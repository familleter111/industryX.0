/**
 * Textes bilingues. Le français est obligatoire ; sans anglais, le site
 * anglais affiche le français (src/lib/cms/client.ts, `localized`), et le
 * Studio le signale par un avertissement.
 */

import { defineField, defineType } from 'sanity'

const MISSING_EN = 'Sans traduction, la version anglaise du site affiche le français.'

export const localeString = defineType({
  name: 'localeString',
  title: 'Texte court (FR / EN)',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().warning(MISSING_EN) }),
  ],
  // Éléments de liste (points, constats…) : le texte plutôt que « Sans titre ».
  preview: { select: { title: 'fr', subtitle: 'en' } },
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Texte long (FR / EN)',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().warning(MISSING_EN),
    }),
  ],
  preview: { select: { title: 'fr', subtitle: 'en' } },
})
