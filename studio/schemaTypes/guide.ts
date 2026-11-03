/**
 * Guide pratique, publié sur /resources et lu sur /resources/<slug>.
 * Lu par src/lib/cms/guides.ts.
 *
 * Le corps est du texte riche limité à ce que la page sait afficher :
 * intertitres, paragraphes, listes à puces, encadré « idée à retenir » et
 * liens internes. Un guide publié ici apparaît sur le site sans redéploiement
 * (liste, page, sitemap).
 */

import { defineArrayMember, defineField, defineType } from 'sanity'

/** Les catégories du site (src/lib/data/guides.ts, GUIDE_CATEGORIES). */
const CATEGORIES = [
  { title: 'Terrain', value: 'Terrain' },
  { title: 'Qualité', value: 'Qualité' },
  { title: 'Pilotage', value: 'Pilotage' },
  { title: 'Méthode', value: 'Méthode' },
]

const INTERNAL_LINK = /^\/(?!\/)/

/** Texte riche d'une langue. Les styles correspondent aux blocs de la page. */
const body = (name: 'fr' | 'en', title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          { title: 'Paragraphe', value: 'normal' },
          { title: 'Intertitre', value: 'h2' },
          { title: 'Encadré (idée à retenir)', value: 'callout' },
        ],
        lists: [{ title: 'Liste à puces', value: 'bullet' }],
        // Ni gras ni italique : la page ne les affiche pas.
        marks: {
          decorators: [],
          annotations: [
            {
              name: 'link',
              title: 'Lien',
              type: 'object',
              fields: [
                defineField({
                  name: 'href',
                  title: 'Page du site',
                  description: 'Chemin d’une page du site, en français : /plateforme/gestion-ecarts, /industries/pharma…',
                  type: 'string',
                  validation: (rule) =>
                    rule.required().regex(INTERNAL_LINK, { name: 'chemin interne (commence par /)' }),
                }),
              ],
            },
          ],
        },
      }),
    ],
    validation: name === 'fr' ? (rule) => rule.required().min(1) : undefined,
  })

export const localeBody = defineType({
  name: 'localeBody',
  title: 'Corps du guide (FR / EN)',
  type: 'object',
  fields: [
    body('fr', 'Français'),
    body('en', 'English (vide : la version anglaise affiche le français)'),
  ],
})

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenu', default: true },
    { name: 'publication', title: 'Publication' },
    { name: 'seo', title: 'Référencement' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'localeString', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Adresse',
      description: 'Fin de l’URL : /resources/<adresse>. À ne plus changer une fois publié (liens et référencement).',
      type: 'slug',
      group: 'content',
      options: { source: 'title.fr', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      group: 'content',
      options: { list: CATEGORIES, layout: 'radio', direction: 'horizontal' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé',
      description: 'Deux phrases, affichées sur les cartes de /resources.',
      type: 'localeText',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'file', title: 'Image envoyée', type: 'image', options: { hotspot: true } }),
        defineField({
          name: 'path',
          title: 'Ou : fichier du site',
          description: 'Chemin d’une image de public/, ex. /cipa-1-digitalisation-audits-terrain.png. Ignoré si une image est envoyée.',
          type: 'string',
        }),
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'localeString', validation: (rule) => rule.required() }),
      ],
      validation: (rule) =>
        rule.required().custom((value: { file?: { asset?: unknown }; path?: string } | undefined) =>
          value?.file?.asset || value?.path?.trim() ? true : 'Envoyer une image ou donner le chemin d’un fichier du site.',
        ),
    }),
    defineField({ name: 'body', title: 'Corps', type: 'localeBody', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'related',
      title: 'Page liée',
      description: 'Le bouton de fin de lecture, vers une page Solution ou un secteur.',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'label', title: 'Texte du bouton', type: 'localeString' }),
        defineField({
          name: 'href',
          title: 'Page',
          description: 'Chemin d’une page du site : /plateforme/remontee-terrain.',
          type: 'string',
          validation: (rule) => rule.regex(INTERNAL_LINK, { name: 'chemin interne (commence par /)' }),
        }),
      ],
    }),
    defineField({ name: 'author', title: 'Auteur', type: 'localeString', group: 'publication', initialValue: { fr: 'Équipe Industry X.0', en: 'Industry X.0 team' } }),
    defineField({ name: 'date', title: 'Date de publication', type: 'date', group: 'publication', validation: (rule) => rule.required() }),
    defineField({
      name: 'updated',
      title: 'Dernière mise à jour',
      description: 'Seulement si le contenu a changé après publication : la page affiche « Mis à jour le … ».',
      type: 'date',
      group: 'publication',
    }),
    defineField({
      name: 'readingMinutes',
      title: 'Minutes de lecture',
      description: 'Vide : estimé d’après la longueur du texte.',
      type: 'number',
      group: 'publication',
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'À la une',
      description: 'Mis en avant en tête de /resources. Un seul guide à la fois (sinon : le plus récent des guides cochés).',
      type: 'boolean',
      group: 'publication',
      initialValue: false,
    }),
    defineField({
      name: 'metaTitle',
      title: 'Titre pour Google',
      description: 'Sans la marque, ajoutée par le site (« | CIPA »). 40 à 50 caractères. Vide : le titre.',
      type: 'localeString',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description pour Google',
      description: '140 à 160 caractères, finissant par une invitation à lire. Vide : le résumé.',
      type: 'localeText',
      group: 'seo',
    }),
  ],
  orderings: [{ title: 'Date de publication', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title.fr', category: 'category', date: 'date', media: 'image.file' },
    prepare: ({ title, category, date, media }) => ({ title, subtitle: [category, date].filter(Boolean).join(' · '), media }),
  },
})
