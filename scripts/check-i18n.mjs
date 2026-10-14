/**
 * Repère le français resté sur les pages anglaises.
 *
 *   npm run check:i18n                 # contre http://localhost:3000
 *   BASE_URL=http://localhost:3456 npm run check:i18n
 *
 * Le site doit tourner (`npm run dev` ou `npm start`). Pour chaque page
 * /en/..., le script lit le texte visible et les attributs alt, aria-label,
 * placeholder et title, et signale ce qui ressemble à du français : lettres
 * accentuées, ou au moins deux mots-outils français. Code de sortie 1 si une
 * page en contient.
 */

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'

const PAGES = [
  '/en',
  '/en/plateforme/terrain',
  '/en/plateforme/qualite',
  '/en/plateforme/pilotage',
  '/en/plateforme/entiwin',
  '/en/industries/pharma',
  '/en/industries/food',
  '/en/industries/cosmetics',
  '/en/industries/automotive',
  '/en/industries/electronics',
  '/en/industries/packaging',
  '/en/entreprise',
  '/en/customers',
  '/en/partners',
  '/en/resources',
  '/en/resources/digitaliser-audits-terrain',
  '/en/resources/non-conformites-capa',
  '/en/resources/indicateurs-qualite-temps-reel',
  '/en/resources/reussir-pilote-digitalisation',
  '/en/faq',
  '/en/contact',
  '/en/privacy',
]

const ACCENTS = /[éèêàùçôîœ]/i
const FUNCTION_WORDS =
  /\b(les|des|vos|nous|votre|pour|avec|dans|une|sur|est|sont|aux|du|au|et|ou|qui|que|pas|plus|chaque|notre|nos|vous|cette|ces|leur|leurs)\b/gi
// Noms propres et adresses : français par nature, pas des oublis de traduction.
const ALLOWED =
  /^(Médis|Ministère de la Santé Publique.*|Municipalité|Neapolis Pharma|Rose Blanche Group|Kilani Groupe|Cité les pins,?|Tunis 1053|Français|Startup Act.*|© 2026.*|Industry X\.0, Cité les pins.*)$/

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')

function fragments(html) {
  const page = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  const out = []
  for (const m of page.matchAll(/(?:alt|aria-label|placeholder|title)="([^"]+)"/g)) out.push(decode(m[1]))
  for (const line of page.replace(/<[^>]+>/g, '\n').split('\n')) {
    const text = decode(line).trim()
    if (text) out.push(text)
  }
  return out
}

let failed = 0
for (const path of PAGES) {
  let html
  try {
    const res = await fetch(BASE + path)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    html = await res.text()
  } catch (error) {
    console.log(`✗ ${path} : ${error.message}`)
    failed++
    continue
  }
  const hits = [...new Set(fragments(html))].filter(
    (t) =>
      t.length >= 3 &&
      !ALLOWED.test(t) &&
      (ACCENTS.test(t) || (t.match(FUNCTION_WORDS) ?? []).length >= 2),
  )
  if (hits.length) {
    failed++
    console.log(`✗ ${path} : ${hits.length} texte(s) en français`)
    for (const h of hits.slice(0, 20)) console.log(`    ${h.slice(0, 140)}`)
  } else {
    console.log(`✓ ${path}`)
  }
}

process.exit(failed ? 1 : 0)
