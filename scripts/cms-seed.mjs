/**
 * Importe dans Sanity les contenus encore écrits dans le code (voir docs/cms.md).
 *
 *   npm run cms:seed               # affiche ce qui serait envoyé, sans rien écrire
 *   npm run cms:seed -- --write    # crée dans Sanity les documents absents
 *
 * Variables (.env.local, puis l'environnement) : SANITY_PROJECT_ID,
 * SANITY_DATASET (défaut production) et, pour --write, SANITY_WRITE_TOKEN
 * (jeton « Editor » : sanity.io/manage > le projet > API > Tokens).
 *
 * `createIfNotExists` : un document déjà présent n'est jamais écrasé. Relancer
 * le script après des modifications faites dans le Studio ne les perd pas.
 *
 * Node 22.18 ou plus : le script lit directement src/lib/data/testimonials.ts
 * (types TypeScript retirés par Node).
 */

const API_VERSION = '2025-02-19'

const env = process.env
const val = (name) => env[name]?.trim() || ''
const write = process.argv.includes('--write')

/** Identifiant stable, sans point (un id avec un point n'est pas lisible publiquement). */
function slug(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const localeString = (fr, en) => ({ _type: 'localeString', fr, en })
const localeText = (fr, en) => ({ _type: 'localeText', fr, en })

async function testimonials() {
  const { getTestimonials } = await import('../src/lib/data/testimonials.ts')
  const fr = getTestimonials(true, 'fr')
  const en = getTestimonials(true, 'en')
  return fr.map((t, i) => ({
    _id: `testimonial-${slug(t.company)}`,
    _type: 'testimonial',
    company: t.company,
    quote: localeText(t.quote, en[i].quote),
    author: localeString(t.author, en[i].author),
    sector: localeString(t.sector, en[i].sector),
    clientApproved: t.status === 'published',
    logoAlt: t.logoAlt ?? undefined,
    rating: t.rating,
    order: (i + 1) * 10,
  }))
}

async function main() {
  const docs = await testimonials()

  for (const doc of docs) {
    console.log(`${doc._id.padEnd(36)} ${doc.clientApproved ? 'validé   ' : 'à valider'}  ${doc.company}`)
  }

  if (!write) {
    console.log(`\n${docs.length} documents. Rien n'est envoyé : relancer avec --write pour les créer.`)
    return
  }

  const projectId = val('SANITY_PROJECT_ID')
  const token = val('SANITY_WRITE_TOKEN')
  if (!projectId || !token) {
    console.error('SANITY_PROJECT_ID et SANITY_WRITE_TOKEN sont nécessaires avec --write (voir docs/cms.md).')
    process.exit(1)
  }
  const dataset = val('SANITY_DATASET') || 'production'

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${API_VERSION}/data/mutate/${dataset}?returnIds=true`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ mutations: docs.map((doc) => ({ createIfNotExists: doc })) }),
    },
  )
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    console.error(`Sanity a refusé l'import (HTTP ${response.status}) : ${body?.error?.description ?? body?.message ?? ''}`)
    process.exit(1)
  }
  console.log(`\nImport terminé dans ${projectId}/${dataset} (transaction ${body?.transactionId}).`)
  console.log('Les documents qui existaient déjà n’ont pas été modifiés.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
