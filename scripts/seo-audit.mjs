/**
 * Audit SEO du site construit : chaque URL du sitemap, dans les deux langues.
 *
 *   npm run build && npm start          # dans un autre terminal
 *   npm run audit:seo                   # contre http://localhost:3000
 *   BASE_URL=http://localhost:3456 OUT=seo-audit.json npm run audit:seo
 *
 * Le sitemap donne des URL de production (NEXT_PUBLIC_SITE_URL) : le script
 * les lit telles quelles pour les comparer aux canonical et aux hreflang, et
 * les va chercher sur BASE_URL.
 *
 * Contrôles par page : statut 200 sans redirection, <title> et meta
 * description (longueur, unicité), un seul H1 sans mots soudés, canonical
 * absolu et auto-référent, hreflang fr / en / x-default vers des pages du
 * sitemap, <html lang>, Open Graph et Twitter, alt des images, JSON-LD
 * valide et du type attendu, absence de noindex. Puis, sur l'ensemble :
 * liens et images internes en erreur ou redirigés, pages orphelines, pages
 * liées absentes du sitemap.
 *
 * Code de sortie 1 si un contrôle bloquant échoue.
 */

import { writeFileSync } from 'node:fs'

import { Window } from 'happy-dom'

const BASE = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/+$/, '')
const OUT = process.env.OUT

const TITLE = { min: 50, max: 60 }
const DESCRIPTION = { min: 140, max: 160 }

const window = new Window({
  settings: {
    disableJavaScriptEvaluation: true,
    disableJavaScriptFileLoading: true,
    disableCSSFileLoading: true,
    disableIframePageLoading: true,
  },
})
const parse = (html) => new window.DOMParser().parseFromString(html, 'text/html')

/** Types JSON-LD attendus selon le gabarit de la page (chemin sans /en). */
function expectedSchemas(path) {
  const types = ['Organization']
  if (path === '/') types.push('WebSite', 'SoftwareApplication', 'FAQPage')
  if (path.startsWith('/plateforme/') || path.startsWith('/platform/'))
    types.push('SoftwareApplication', 'BreadcrumbList')
  if (path.startsWith('/industries/')) types.push('BreadcrumbList')
  if (/^\/resources\/.+/.test(path)) types.push('Article', 'BreadcrumbList')
  return types
}

const ACCENTS = /[éèêàùçôîœ]/i
const FRENCH_WORDS = /\b(les|des|vos|nous|votre|pour|avec|dans|une|sur|est|sont|aux|du|et|qui|que|chaque|notre|nos|vous|cette|leur)\b/i
const ENGLISH_WORDS = /\b(the|and|with|your|for|our|this|from|into|that)\b/i

const results = { base: BASE, pages: [], links: [], summary: {} }
const fail = (page, check, detail) => page.issues.push({ check, detail })

/* ---------- Sitemap ---------- */

const sitemapRes = await fetch(`${BASE}/sitemap.xml`)
if (!sitemapRes.ok) {
  console.error(`sitemap.xml : HTTP ${sitemapRes.status} — le site tourne-t-il sur ${BASE} ?`)
  process.exit(1)
}
const sitemapXml = await sitemapRes.text()
const entries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  loc: block.match(/<loc>(.*?)<\/loc>/)[1],
  lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  alternates: Object.fromEntries(
    [...block.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]),
  ),
}))
const SITE = new URL(entries[0].loc).origin
const sitemapUrls = new Set(entries.map((e) => new URL(e.loc).href))
const local = (url) => BASE + new URL(url, SITE).pathname + new URL(url, SITE).search

const robotsTxt = await (await fetch(`${BASE}/robots.txt`)).text()
results.robots = robotsTxt
results.sitemap = {
  urls: entries.length,
  distinctLastmod: new Set(entries.map((e) => e.lastmod)).size,
  missingXDefault: entries.filter((e) => !e.alternates['x-default']).map((e) => e.loc),
}

/* ---------- Pages ---------- */

const inbound = new Map([...sitemapUrls].map((url) => [url, new Set()]))
const linkTargets = new Map() // URL interne normalisée -> pages qui la citent
const assetTargets = new Map() // image interne -> pages

const addTarget = (map, key, from) => {
  if (!map.has(key)) map.set(key, new Set())
  map.get(key).add(from)
}

/** Texte d'un titre, espacé aux frontières d'éléments (pour l'affichage du rapport). */
function headingTexts(node) {
  let spaced = ''
  const walk = (n) => {
    if (n.nodeType === 3) spaced += n.textContent
    else if (n.nodeType === 1) {
      spaced += ' '
      for (const child of n.childNodes) walk(child)
      spaced += ' '
    }
  }
  walk(node)
  return { spaced: spaced.replace(/\s+/g, ' ').trim() }
}

/**
 * Mots soudés : deux morceaux de texte séparés seulement par une frontière
 * d'élément (<br>, fin de <span>…), sans espace entre eux — « opérations » +
 * « sont » donne « opérationssont » à l'extraction. Une ponctuation qui suit
 * (« next » + « ? ») n'est pas une soudure.
 */
function mergedWords(node) {
  const runs = []
  let boundary = false
  const walk = (n) => {
    if (n.nodeType === 3) {
      if (n.textContent) runs.push({ text: n.textContent, afterBoundary: boundary })
      boundary = false
    } else if (n.nodeType === 1) {
      boundary = true
      for (const child of n.childNodes) walk(child)
      boundary = true
    }
  }
  for (const child of node.childNodes) walk(child)
  const merged = []
  for (let i = 1; i < runs.length; i++) {
    const left = runs[i - 1].text
    const right = runs[i].text
    if (runs[i].afterBoundary && /[\p{L}\p{N}.,;:!?»’)]$/u.test(left) && /^[\p{L}\p{N}«(]/u.test(right))
      merged.push(`${left.split(/\s/).at(-1)}|${right.split(/\s/)[0]}`)
  }
  return merged
}

/** Comparaison d'URL insensible à la barre finale de l'origine (https://x.pro ≡ https://x.pro/). */
const sameUrl = (a, b) => {
  try {
    return new URL(a).href === new URL(b).href
  } catch {
    return false
  }
}

/** Noms propres : leur alt est le même dans les deux langues. */
const PROPER_NAMES = /^(THE DOT|Médis|Ministère de la Santé Publique.*|Municipalité|Cité les pins.*)$/

for (const entry of entries) {
  const url = entry.loc
  const { pathname } = new URL(url)
  const locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
  const basePath = locale === 'en' ? pathname.replace(/^\/en/, '') || '/' : pathname
  const page = { url, locale, issues: [], info: {} }
  results.pages.push(page)

  const res = await fetch(local(url), { redirect: 'manual' })
  page.info.status = res.status
  if (res.status !== 200) {
    fail(page, 'status', `HTTP ${res.status}${res.headers.get('location') ? ` → ${res.headers.get('location')}` : ''}`)
    continue
  }
  const html = await res.text()
  const doc = parse(html)
  const head = doc.head

  // <title>
  const titles = head.querySelectorAll('title')
  const title = titles[0]?.textContent.trim() ?? ''
  page.info.title = title
  if (titles.length !== 1) fail(page, 'title', `${titles.length} balises <title>`)
  if (title.length < TITLE.min || title.length > TITLE.max)
    fail(page, 'title-length', `${title.length} car. : « ${title} »`)

  // meta description
  const description = head.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
  page.info.description = description
  if (!description) fail(page, 'description', 'absente')
  else if (description.length < DESCRIPTION.min || description.length > DESCRIPTION.max)
    fail(page, 'description-length', `${description.length} car.`)
  if (head.querySelector('meta[name="keywords"]')) fail(page, 'keywords', 'meta keywords présente')

  // H1 et hiérarchie
  const h1s = doc.querySelectorAll('h1')
  page.info.h1 = [...h1s].map((h) => headingTexts(h).spaced)
  if (h1s.length !== 1) fail(page, 'h1-count', `${h1s.length} H1`)
  for (const heading of doc.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
    const merged = mergedWords(heading)
    if (merged.length)
      fail(page, heading.tagName === 'H1' ? 'h1-merged' : 'heading-merged', `${heading.tagName} « ${headingTexts(heading).spaced} » : ${merged.join(', ')}`)
  }
  let previous = 1
  for (const heading of doc.querySelectorAll('h2, h3, h4, h5, h6')) {
    const level = Number(heading.tagName[1])
    if (level > previous + 1)
      fail(page, 'heading-order', `${heading.tagName} après H${previous} : « ${headingTexts(heading).spaced.slice(0, 60)} »`)
    previous = level
  }

  // canonical
  const canonicals = head.querySelectorAll('link[rel="canonical"]')
  const canonical = canonicals[0]?.getAttribute('href') ?? ''
  if (canonicals.length !== 1) fail(page, 'canonical', `${canonicals.length} canonical`)
  else if (!/^https?:\/\//.test(canonical)) fail(page, 'canonical', `relatif : ${canonical}`)
  else if (!sameUrl(canonical, url)) fail(page, 'canonical', `${canonical} ≠ ${url}`)

  // hreflang
  const alternates = Object.fromEntries(
    [...head.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [
      link.getAttribute('hreflang'),
      link.getAttribute('href'),
    ]),
  )
  for (const lang of ['fr', 'en', 'x-default']) {
    if (!alternates[lang]) fail(page, 'hreflang', `${lang} absent`)
    else if (!sitemapUrls.has(new URL(alternates[lang]).href)) fail(page, 'hreflang', `${lang} → ${alternates[lang]} hors sitemap`)
  }
  if (alternates[locale] && !sameUrl(alternates[locale], url)) fail(page, 'hreflang', `${locale} ne pointe pas sur la page elle-même`)

  // <html lang>
  const lang = doc.documentElement.getAttribute('lang')
  if (lang !== locale) fail(page, 'html-lang', `lang="${lang}"`)

  // Open Graph et Twitter
  const meta = (attr, name) => head.querySelector(`meta[${attr}="${name}"]`)?.getAttribute('content')
  for (const name of ['og:title', 'og:description', 'og:image', 'og:url'])
    if (!meta('property', name)) fail(page, 'og', `${name} absent`)
  if (meta('property', 'og:url') && !sameUrl(meta('property', 'og:url'), url))
    fail(page, 'og', `og:url ${meta('property', 'og:url')} ≠ ${url}`)
  const expectedOgLocale = locale === 'en' ? 'en_US' : 'fr_FR'
  if (meta('property', 'og:locale') !== expectedOgLocale) fail(page, 'og', `og:locale ${meta('property', 'og:locale')}`)
  if (!meta('property', 'og:locale:alternate')) fail(page, 'og', 'og:locale:alternate absent')
  if (meta('property', 'og:image') && !meta('property', 'og:image:alt')) fail(page, 'og', 'og:image:alt absent')
  if (meta('name', 'twitter:card') !== 'summary_large_image')
    fail(page, 'twitter', `twitter:card ${meta('name', 'twitter:card') ?? 'absent'}`)
  page.info.ogImage = meta('property', 'og:image')
  if (page.info.ogImage) addTarget(assetTargets, page.info.ogImage, url)

  // robots
  const robotsMeta = head.querySelector('meta[name="robots"]')?.getAttribute('content') ?? ''
  if (/noindex/i.test(robotsMeta)) fail(page, 'noindex', robotsMeta)

  // Images
  for (const img of doc.querySelectorAll('img')) {
    const src = img.getAttribute('src') ?? ''
    const hidden = img.closest('[aria-hidden="true"]')
    if (!img.hasAttribute('alt')) fail(page, 'img-alt', `alt absent : ${src.slice(0, 90)}`)
    const alt = img.getAttribute('alt') ?? ''
    if (alt && hidden) fail(page, 'img-alt', `alt non vide dans un bloc aria-hidden : ${alt}`)
    if (alt && locale === 'en' && (ACCENTS.test(alt) || FRENCH_WORDS.test(alt)) && !PROPER_NAMES.test(alt))
      fail(page, 'img-alt-lang', `alt français sur page anglaise : « ${alt} »`)
    if (alt && locale === 'fr' && ENGLISH_WORDS.test(alt) && !ACCENTS.test(alt) && !PROPER_NAMES.test(alt))
      fail(page, 'img-alt-lang', `alt anglais sur page française : « ${alt} »`)
    if (!img.getAttribute('width') && !img.getAttribute('height') && !/position:absolute/.test(img.getAttribute('style') ?? ''))
      page.info.unsizedImages = (page.info.unsizedImages ?? 0) + 1
    if (src.startsWith('/')) addTarget(assetTargets, src, url)
  }

  // JSON-LD
  const types = new Set()
  for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(script.textContent)
      const nodes = [data, ...(data['@graph'] ?? [])].flat()
      for (const node of nodes) [node['@type']].flat().filter(Boolean).forEach((t) => types.add(t))
    } catch (error) {
      fail(page, 'jsonld', `JSON invalide : ${error.message}`)
    }
  }
  page.info.schemas = [...types]
  for (const type of expectedSchemas(basePath))
    if (!types.has(type)) fail(page, 'jsonld', `${type} absent`)

  // Liens internes
  for (const a of doc.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href')
    if (!href || /^(mailto:|tel:|javascript:|#)/.test(href)) continue
    const target = new URL(href, url)
    if (target.origin !== SITE && target.origin !== BASE) continue
    target.hash = ''
    const normalized = SITE + target.pathname + target.search
    addTarget(linkTargets, normalized, url)
    const key = new URL(normalized).href
    if (!sameUrl(key, url) && inbound.has(key)) inbound.get(key).add(url)
  }
}

/* ---------- Liens, images, orphelines ---------- */

const checkUrl = async (target) => {
  const hops = []
  let current = local(target)
  for (let i = 0; i < 5; i++) {
    const res = await fetch(current, { redirect: 'manual' })
    if (res.status >= 300 && res.status < 400) {
      const location = new URL(res.headers.get('location'), current)
      hops.push(`${res.status} → ${location.pathname}${location.search}`)
      current = BASE + location.pathname + location.search
      continue
    }
    return { status: res.status, hops, type: res.headers.get('content-type') ?? '' }
  }
  return { status: 'loop', hops, type: '' }
}

const linkIssues = []
for (const [target, from] of linkTargets) {
  const check = await checkUrl(target)
  const record = { target, from: [...from].slice(0, 3), ...check }
  results.links.push(record)
  if (check.status !== 200) linkIssues.push({ kind: 'link-error', ...record })
  else if (check.hops.length) linkIssues.push({ kind: check.hops.length > 1 ? 'link-chain' : 'link-redirect', ...record })
  else if (check.type.includes('text/html') && !sitemapUrls.has(new URL(target).href) && !new URL(target).pathname.startsWith('/api'))
    linkIssues.push({ kind: 'missing-from-sitemap', ...record })
}
for (const [src, from] of assetTargets) {
  const check = await checkUrl(new URL(src, SITE).href)
  if (check.status !== 200 || check.hops.length)
    linkIssues.push({ kind: 'asset-error', target: src, from: [...from].slice(0, 3), ...check })
}
results.linkIssues = linkIssues
results.orphans = [...inbound].filter(([, from]) => from.size === 0).map(([url]) => url)

/* ---------- Rapport ---------- */

const checks = [
  ['status', 'HTTP 200 sans redirection'],
  ['title', 'Un seul <title>'],
  ['title-length', `<title> de ${TITLE.min} à ${TITLE.max} car.`],
  ['title-unique', '<title> unique'],
  ['description', 'Meta description présente'],
  ['description-length', `Meta description de ${DESCRIPTION.min} à ${DESCRIPTION.max} car.`],
  ['description-unique', 'Meta description unique'],
  ['keywords', 'Pas de meta keywords'],
  ['h1-count', 'Un seul H1'],
  ['h1-merged', 'H1 sans mots soudés'],
  ['heading-merged', 'Autres titres sans mots soudés'],
  ['heading-order', 'Hiérarchie H2 → H3 sans saut'],
  ['canonical', 'Canonical absolu et auto-référent'],
  ['hreflang', 'hreflang fr / en / x-default valides'],
  ['html-lang', '<html lang> correct'],
  ['og', 'Open Graph complet'],
  ['twitter', 'twitter:card summary_large_image'],
  ['img-alt', 'Images avec attribut alt'],
  ['img-alt-lang', 'alt dans la langue de la page'],
  ['jsonld', 'JSON-LD valide et attendu'],
  ['noindex', 'Pas de noindex'],
]

const byValue = (key) => {
  const seen = new Map()
  for (const page of results.pages) {
    const value = page.info[key]
    if (!value) continue
    if (!seen.has(value)) seen.set(value, [])
    seen.get(value).push(page)
  }
  for (const [value, pages] of seen)
    if (pages.length > 1)
      for (const page of pages) fail(page, `${key}-unique`, `partagé avec ${pages.length - 1} autre(s) : « ${value.slice(0, 70)} »`)
}
byValue('title')
byValue('description')

let blocking = 0
console.log(`\nAudit SEO — ${results.pages.length} URL du sitemap (${BASE})\n`)
const summary = {}
for (const [key, label] of checks) {
  const failing = results.pages.filter((page) => page.issues.some((issue) => issue.check === key))
  summary[key] = { label, pass: failing.length === 0, failing: failing.length }
  blocking += failing.length ? 1 : 0
  console.log(`${failing.length ? '✗' : '✓'} ${label}${failing.length ? ` — ${failing.length} page(s)` : ''}`)
  for (const page of failing.slice(0, 40))
    for (const issue of page.issues.filter((i) => i.check === key))
      console.log(`    ${new URL(page.url).pathname}  ${issue.detail}`)
}

const groups = {
  'link-error': 'Liens internes en erreur',
  'link-chain': 'Liens internes vers une chaîne de redirections',
  'link-redirect': 'Liens internes vers une redirection',
  'asset-error': 'Images / og:image en erreur',
  'missing-from-sitemap': 'Pages liées absentes du sitemap',
}
for (const [kind, label] of Object.entries(groups)) {
  const items = linkIssues.filter((issue) => issue.kind === kind)
  summary[kind] = { label, pass: items.length === 0, failing: items.length }
  if (kind !== 'link-redirect' && items.length) blocking += 1
  console.log(`${items.length ? (kind === 'link-redirect' ? '!' : '✗') : '✓'} ${label}${items.length ? ` — ${items.length}` : ''}`)
  for (const item of items.slice(0, 40))
    console.log(`    ${item.target}  ${item.status} ${item.hops.join(' ')}  (depuis ${item.from.map((f) => new URL(f).pathname).join(', ')})`)
}
summary.orphans = { label: 'Pages du sitemap liées depuis une autre page', pass: results.orphans.length === 0, failing: results.orphans.length }
console.log(`${results.orphans.length ? '✗' : '✓'} ${summary.orphans.label}${results.orphans.length ? ` — ${results.orphans.length} orpheline(s)` : ''}`)
for (const url of results.orphans) console.log(`    ${url}`)
blocking += results.orphans.length ? 1 : 0

console.log(`\nSitemap : ${results.sitemap.urls} URL, ${results.sitemap.distinctLastmod} lastmod distinct(s), x-default manquant sur ${results.sitemap.missingXDefault.length}`)
console.log(`robots.txt :\n${robotsTxt.trim().replace(/^/gm, '    ')}`)

results.summary = summary
if (OUT) writeFileSync(OUT, JSON.stringify(results, null, 2))
await window.happyDOM.close()
process.exit(blocking ? 1 : 0)
