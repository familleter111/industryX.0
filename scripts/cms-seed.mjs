/**
 * Importe dans Sanity les contenus encore écrits dans le code (voir docs/cms.md) :
 * témoignages, FAQ, guides, textes des pages sectorielles et pages d'atterrissage.
 *
 *   npm run cms:seed               # affiche ce qui serait envoyé, sans rien écrire
 *   npm run cms:seed -- --write    # crée dans Sanity les documents absents
 *
 * Variables (.env.local, puis l'environnement) : SANITY_PROJECT_ID,
 * SANITY_DATASET (défaut production) et, pour --write, SANITY_WRITE_TOKEN
 * (jeton « Editor » : sanity.io/manage > le projet > API > Tokens).
 *
 * `createIfNotExists` : un document déjà présent n'est jamais écrasé. Relancer
 * le script après des modifications faites dans le Studio ne les perd pas. Seul
 * complément : l'identifiant pour l'assistant d'une question qui n'en a pas.
 *
 * Node 22.18 ou plus : le script lit directement les fichiers TypeScript du
 * site (types retirés par Node, alias `@/` résolu par cms-alias.mjs). Les
 * guides et les secteurs sont convertis par les fonctions du site
 * (src/lib/cms) : tests/cms.test.ts vérifie que le site les relit à l'identique.
 */

import './cms-alias.mjs'

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
  const { getTestimonials } = await import('@/lib/data/testimonials')
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

async function faqs() {
  // Texte source : la réponse sur les secteurs garde le marqueur {secteurs}.
  const { FAQ_SOURCE: FAQ_ENTRIES } = await import('@/lib/data/faq')
  return FAQ_ENTRIES.fr.map((entry, i) => ({
    _id: `faq-${slug(entry.question).slice(0, 60).replace(/-$/, '')}`,
    _type: 'faq',
    key: entry.id,
    question: localeString(entry.question, FAQ_ENTRIES.en[i].question),
    answer: localeText(entry.answer, FAQ_ENTRIES.en[i].answer),
    order: (i + 1) * 10,
  }))
}

async function guides() {
  const { guidesFor } = await import('@/lib/data/guides')
  const { guideDocument } = await import('@/lib/cms/guides')
  const en = guidesFor('en')
  return guidesFor('fr').map((guide, i) => guideDocument(guide, en[i]))
}

async function industries() {
  const { industryData, industrySlugs } = await import('@/lib/data/industries')
  const { industryDocument } = await import('@/lib/cms/industries')
  return industrySlugs().map((page) => industryDocument(industryData(page, 'fr'), industryData(page, 'en')))
}

async function landings() {
  const { landingsFor } = await import('@/lib/data/landings')
  const { landingDocument } = await import('@/lib/cms/landings')
  const en = landingsFor('en')
  return landingsFor('fr').map((page, i) => landingDocument(page, en[i]))
}

/** Une ligne par document, pour relire avant d'écrire. */
function describe(doc) {
  if (doc._type === 'testimonial') return `${doc.clientApproved ? 'validé   ' : 'à valider'}  ${doc.company}`
  if (doc._type === 'faq') return doc.question.fr
  if (doc._type === 'guide') return `${doc.date}  ${doc.title.fr}`
  if (doc._type === 'landing') return `/lp/${doc.slug.current}  (${doc.channel} → ${doc.target})`
  return `/industries/${doc.slug}`
}

async function main() {
  const docs = [...(await testimonials()), ...(await faqs()), ...(await guides()), ...(await industries()), ...(await landings())]

  for (const doc of docs) console.log(`${doc._id.padEnd(66)} ${describe(doc)}`)

  if (!write) {
    console.log(`\n${docs.length} documents. Rien n'est envoyé : relancer avec --write pour créer ceux qui manquent.`)
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
      body: JSON.stringify({
        mutations: [
          ...docs.map((doc) => ({ createIfNotExists: doc })),
          // Questions importées avant l'identifiant pour l'assistant : on le
          // complète, sans toucher au reste.
          ...docs
            .filter((doc) => doc._type === 'faq' && doc.key)
            .map((doc) => ({ patch: { id: doc._id, setIfMissing: { key: doc.key } } })),
        ],
      }),
    },
  )
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    console.error(`Sanity a refusé l'import (HTTP ${response.status}) : ${body?.error?.description ?? body?.message ?? ''}`)
    process.exit(1)
  }
  const created = (body?.results ?? []).filter((result) => result.operation === 'create').length
  console.log(`\nImport terminé dans ${projectId}/${dataset} (transaction ${body?.transactionId}) : ${created} document(s) créé(s).`)
  console.log('Les documents qui existaient déjà n’ont pas été écrasés (seul un identifiant pour l’assistant manquant est complété).')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
