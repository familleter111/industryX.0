import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Adresse du Studio en ligne : https://industryx0.sanity.studio (npm run deploy).
  studioHost: 'industryx0',
})
