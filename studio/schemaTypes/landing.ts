/**
 * Page d'atterrissage d'une campagne : https://www.industryx0.pro/lp/<adresse>.
 * Lue par src/lib/cms/landings.ts.
 *
 * Une page par canal ou par campagne (publication LinkedIn, QR code de
 * salon, spot radio, e-mailing), avec un message et un seul appel à
 * l'action. Elle n'est pas indexée par Google et n'apparaît pas dans le menu :
 * on y arrive par le lien de campagne, dont les UTM rattachent la visite et le
 * lead à leur source. L'aperçu de la liste donne ce lien, prêt à copier.
 */

import { defineField, defineType } from 'sanity'

const SITE = 'https://www.industryx0.pro'

/** Valeur d'UTM : minuscules, chiffres, tirets et soulignés. */
const UTM_VALUE = /^[a-z0-9_-]+$/

const utmField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: 'string',
    validation: (rule) => rule.regex(UTM_VALUE, { name: 'minuscules, chiffres, tirets' }),
  })

export const landing = defineType({
  name: 'landing',
  title: 'Page d’atterrissage',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenu', default: true },
    { name: 'campaign', title: 'Campagne' },
    { name: 'seo', title: 'Partage et référencement' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'localeString', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Adresse',
      description: 'Fin de l’URL : /lp/<adresse>. À ne plus changer une fois le lien diffusé.',
      type: 'slug',
      group: 'content',
      options: { source: 'title.fr', maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'eyebrow', title: 'Sur-titre', description: 'Public visé ou événement.', type: 'localeString', group: 'content' }),
    defineField({ name: 'intro', title: 'Message', type: 'localeText', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'benefits',
      title: 'Bénéfices',
      description: 'Trois de préférence, en cartes sous le message.',
      type: 'array',
      group: 'content',
      validation: (rule) => rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titre', type: 'localeString', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Texte', type: 'localeText' }),
          ],
          preview: { select: { title: 'title.fr', subtitle: 'text.fr' } },
        },
      ],
    }),
    defineField({
      name: 'target',
      title: 'Bouton principal',
      type: 'string',
      group: 'content',
      initialValue: 'demo',
      options: {
        list: [
          { title: 'Demander une démo', value: 'demo' },
          { title: 'Essayer Enti Win', value: 'entiwin' },
          { title: 'Nous contacter', value: 'contact' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton',
      description: 'Vide : le libellé de la destination (« Demander une démo »…).',
      type: 'localeString',
      group: 'content',
    }),

    defineField({
      name: 'channel',
      title: 'Canal',
      type: 'string',
      group: 'campaign',
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Salon / QR code', value: 'salon' },
          { title: 'Radio', value: 'radio' },
          { title: 'E-mailing', value: 'email' },
          { title: 'Partenaire', value: 'partenaire' },
          { title: 'Autre', value: 'autre' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'utm',
      title: 'Lien de campagne (UTM)',
      description: 'Les paramètres du lien à diffuser : ils rattachent chaque visite et chaque demande de démo à cette campagne.',
      type: 'object',
      group: 'campaign',
      fields: [
        utmField('source', 'Source', 'Qui envoie le visiteur : linkedin, salon-pharma, radio-mosaique…'),
        utmField('medium', 'Support', 'Le type de canal : social, qr, audio, email…'),
        utmField('campaign', 'Campagne', 'Le nom de l’opération : demo-cipa, entiwin-lancement…'),
      ],
    }),

    defineField({
      name: 'metaTitle',
      title: 'Titre de partage',
      description: 'Sans la marque, ajoutée par le site (« | CIPA »). Vide : le titre.',
      type: 'localeString',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description de partage',
      description: 'Affichée sous l’aperçu du lien (LinkedIn, e-mail). Vide : le message.',
      type: 'localeText',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      slug: 'slug.current',
      source: 'utm.source',
      medium: 'utm.medium',
      campaign: 'utm.campaign',
    },
    prepare: ({ title, slug, source, medium, campaign }) => {
      const params = [['utm_source', source], ['utm_medium', medium], ['utm_campaign', campaign]]
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
      return { title, subtitle: slug ? `${SITE}/lp/${slug}${params ? `?${params}` : ''}` : 'Adresse à définir' }
    },
  },
})
