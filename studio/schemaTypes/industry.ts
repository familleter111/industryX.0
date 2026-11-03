/**
 * Textes d'une page sectorielle (/industries/<slug>).
 * Lu par src/lib/cms/industries.ts.
 *
 * La structure de la page reste dans le code : nombre de diapositives,
 * d'étapes et de points, icônes, visuels animés. Ce document n'en porte que
 * les textes, dans le même ordre : les listes ne s'allongent ni ne
 * raccourcissent ici, et un texte vidé laisse celui du code. Les cinq
 * documents sont créés par l'import initial (npm run cms:seed) ; on n'en
 * crée ni n'en supprime dans le Studio (sanity.config.ts).
 */

import { defineField, defineType } from 'sanity'

/** Noms des pages, comme dans le menu du site (src/lib/data/industries/labels.ts). */
const NAMES: Record<string, string> = {
  pharma: 'Pharmaceutique',
  food: 'Agroalimentaire & boissons',
  cosmetics: 'Cosmétique & dispositifs médicaux',
  automotive: 'Automobile & composants',
  electronics: 'Électronique & câblage',
  packaging: 'Packaging & plasturgie',
}

/** Listes à taille fixe : chaque élément correspond à un élément dessiné de la page. */
type ArrayAction = 'add' | 'addBefore' | 'addAfter' | 'remove' | 'duplicate'
const FIXED = { disableActions: ['add', 'addBefore', 'addAfter', 'remove', 'duplicate'] as ArrayAction[] }

const FIXED_NOTE = 'Même nombre d’éléments que la page : pour en ajouter ou en retirer, voir avec un développeur.'

/** Champ propre à certaines pages : masqué quand la page n'en a pas. */
const onlyIfPresent = ({ value }: { value?: unknown }) => value === undefined

const texts = (name: string, title: string, { description = FIXED_NOTE, group }: { description?: string; group?: string } = {}) =>
  defineField({ name, title, description, group, type: 'array', of: [{ type: 'localeString' }], options: FIXED })

export const industrySlide = defineType({
  name: 'industrySlide',
  title: 'Diapositive',
  type: 'object',
  fields: [
    defineField({ name: 'num', title: 'Numéro', type: 'string' }),
    defineField({ name: 'tag', title: 'Étiquette', type: 'localeString' }),
    defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
    defineField({ name: 'desc', title: 'Description', type: 'localeText' }),
    texts('before', 'Constat avant CIPA'),
    texts('after', 'Apport de CIPA'),
    defineField({
      name: 'kpis',
      title: 'Chiffres clés',
      description: `${FIXED_NOTE} Un chiffre publié doit pouvoir être justifié.`,
      type: 'array',
      options: FIXED,
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Valeur', type: 'string' }),
            defineField({ name: 'label', title: 'Libellé', type: 'localeString' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label.fr' } },
        },
      ],
    }),
    defineField({ name: 'visualCaption', title: 'Légende du visuel', type: 'localeString' }),
  ],
  preview: {
    select: { num: 'num', title: 'title.fr', tag: 'tag.fr' },
    prepare: ({ num, title, tag }) => ({ title: [num, title].filter(Boolean).join(' · '), subtitle: tag }),
  },
})

export const industry = defineType({
  name: 'industry',
  title: 'Page secteur',
  type: 'document',
  groups: [
    { name: 'hero', title: 'En-tête', default: true },
    { name: 'useCases', title: 'Cas d’usage' },
    { name: 'method', title: 'Plateforme et démarche' },
    { name: 'seo', title: 'Référencement' },
  ],
  fields: [
    defineField({ name: 'slug', title: 'Page', description: 'Adresse /industries/<page>, fixée par le code.', type: 'string', readOnly: true }),

    defineField({ name: 'headlinePrefix', title: 'Titre : mots avant le secteur', type: 'localeString', group: 'hero', hidden: onlyIfPresent }),
    defineField({
      name: 'headline',
      title: 'Titre : fin, en couleur',
      description: 'Après « Comment CIPA transforme l’industrie ».',
      type: 'localeString',
      group: 'hero',
      hidden: onlyIfPresent,
    }),
    defineField({
      name: 'heroStatement',
      title: 'Titre « manifeste »',
      type: 'object',
      group: 'hero',
      hidden: onlyIfPresent,
      fields: [
        defineField({ name: 'eyebrow', title: 'Bandeau du secteur', type: 'localeString' }),
        texts('title', 'Titre en quatre morceaux', { description: 'Ligne 1, début de ligne 2, mot en couleur, ligne 3.' }),
      ],
    }),
    defineField({ name: 'intro', title: 'Introduction', type: 'localeText', group: 'hero' }),
    defineField({ name: 'heroAlt', title: 'Texte alternatif de l’image', type: 'localeString', group: 'hero' }),
    texts('indicators', 'Points cochés sous l’en-tête', { group: 'hero' }),
    defineField({ name: 'overview', title: 'Présentation du secteur', type: 'localeText', group: 'useCases' }),
    defineField({
      name: 'useCasesTitle',
      title: 'Titre des cas d’usage',
      description: 'Fin du titre, après « Cas d’usage pour vos ».',
      type: 'localeString',
      group: 'useCases',
    }),
    defineField({ name: 'coreAccentLabel', title: 'Premier carrousel : libellé', type: 'localeString', group: 'useCases' }),
    defineField({ name: 'coreSlides', title: 'Premier carrousel', description: FIXED_NOTE, type: 'array', group: 'useCases', options: FIXED, of: [{ type: 'industrySlide' }] }),
    defineField({ name: 'performanceAccentLabel', title: 'Second carrousel : libellé', type: 'localeString', group: 'useCases' }),
    defineField({ name: 'performanceTitle', title: 'Second carrousel : fin du titre', type: 'localeString', group: 'useCases', hidden: onlyIfPresent }),
    defineField({ name: 'performanceSlides', title: 'Second carrousel', description: FIXED_NOTE, type: 'array', group: 'useCases', options: FIXED, of: [{ type: 'industrySlide' }] }),

    defineField({
      name: 'platform',
      title: 'Plateforme',
      type: 'object',
      group: 'method',
      fields: [
        defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
        defineField({ name: 'desc', title: 'Texte', type: 'localeText' }),
        defineField({
          name: 'features',
          title: 'Fonctions',
          description: FIXED_NOTE,
          type: 'array',
          options: FIXED,
          of: [{ type: 'object', fields: [defineField({ name: 'label', title: 'Libellé', type: 'localeString' })], preview: { select: { title: 'label.fr' } } }],
        }),
      ],
    }),
    defineField({
      name: 'steps',
      title: 'Démarche en cinq étapes',
      description: FIXED_NOTE,
      type: 'array',
      group: 'method',
      options: FIXED,
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
            defineField({ name: 'desc', title: 'Texte', type: 'localeText' }),
          ],
          preview: { select: { title: 'title.fr', subtitle: 'desc.fr' } },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Appel à l’action final',
      type: 'object',
      group: 'method',
      fields: [
        defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
        defineField({ name: 'text', title: 'Texte', type: 'localeText' }),
      ],
    }),

    defineField({
      name: 'metaTitle',
      title: 'Titre pour Google',
      description: 'Sans la marque, ajoutée par le site (« | CIPA »). 40 à 50 caractères.',
      type: 'localeString',
      group: 'seo',
    }),
    defineField({ name: 'metaDescription', title: 'Description pour Google', description: '140 à 160 caractères.', type: 'localeText', group: 'seo' }),
  ],
  preview: {
    select: { slug: 'slug' },
    prepare: ({ slug }) => ({ title: NAMES[slug] ?? slug, subtitle: `/industries/${slug}` }),
  },
})
