/**
 * Sanity Studio d'Industry X.0 : l'interface où l'équipe édite les contenus
 * du site. Projet séparé du site (React 19 ici, React 18 côté site) : le site
 * lit les contenus publiés par l'API HTTP de Sanity (src/lib/cms).
 *
 * Projet et dataset viennent de studio/.env (voir .env.example).
 * Voir docs/cms.md.
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { FIXED_DOCUMENT_TYPES, schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Industry X.0',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  // Vision : console GROQ, pour tester une requête avant de la mettre dans le site.
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
    // Une page secteur dépend de sa structure dans le code : pas de création ici.
    templates: (templates) => templates.filter((template) => !FIXED_DOCUMENT_TYPES.includes(template.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      FIXED_DOCUMENT_TYPES.includes(schemaType)
        ? actions.filter((action) => action.action !== 'delete' && action.action !== 'duplicate')
        : actions,
  },
})
