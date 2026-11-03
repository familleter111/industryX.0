/**
 * Vérificateur de liens du site (L1-01, L1-14).
 *
 *   npm run check:links                         # http://localhost:3000
 *   npm run check:links -- http://localhost:3123 --report docs/upgrade/liens.json
 *
 * Parcourt le site depuis l'accueil (FR et EN), en suivant les liens
 * internes du HTML rendu par le serveur. Pour chaque lien : page source,
 * cible, statut HTTP (redirections suivies), et présence de l'ancre (#id)
 * dans la page cible. Relève aussi les mailto:, tel: et liens externes.
 *
 * Échoue (code 1) si un lien interne est cassé (4xx/5xx), si une ancre est
 * introuvable, ou si un lien pointe vers « / » ailleurs que sur le logo.
 */
import { writeFileSync } from 'node:fs'

const args = process.argv.slice(2)
const base = (args.find((a) => /^https?:\/\//.test(a)) ?? 'http://localhost:3000').replace(/\/+$/, '')
const reportIndex = args.indexOf('--report')
const reportPath = reportIndex !== -1 ? args[reportIndex + 1] : null
const origin = new URL(base).origin

/** Chemins de départ : l'accueil dans chaque langue, puis tout ce qui en découle. */
const queue = ['/', '/en']
const pages = new Map() // chemin → { status, finalPath, ids:Set, links:[] }
const external = new Map() // url → Set(pages)

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

async function fetchPage(path) {
  const response = await fetch(origin + path, { redirect: 'follow', headers: { 'accept-language': 'fr' } })
  const finalUrl = new URL(response.url)
  const type = response.headers.get('content-type') ?? ''
  const html = type.includes('text/html') ? await response.text() : ''
  return { status: response.status, finalPath: finalUrl.pathname, html }
}

/** Les balises <a> du HTML : href, texte visible approché, et si c'est le logo. */
function anchors(html) {
  const out = []
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi
  let m
  while ((m = re.exec(html))) {
    const attrs = m[1]
    const href = attrs.match(/\shref="([^"]*)"/i)?.[1]
    if (href === undefined) continue
    const label =
      attrs.match(/aria-label="([^"]*)"/i)?.[1] ??
      decode(m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).slice(0, 80)
    const isLogo = /data-logo|aria-label="[^"]*(accueil|home)[^"]*"/i.test(attrs) || /<img[^>]+alt="[^"]*Industry X/i.test(m[2])
    out.push({ href: decode(href), label, isLogo })
  }
  return out
}

const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => decode(m[1])))

while (queue.length) {
  const path = queue.shift()
  if (pages.has(path)) continue
  pages.set(path, null)
  let page
  try {
    page = await fetchPage(path)
  } catch (error) {
    pages.set(path, { status: 'erreur réseau', finalPath: path, ids: new Set(), links: [] })
    continue
  }
  const links = anchors(page.html)
  pages.set(path, { status: page.status, finalPath: page.finalPath, ids: idsOf(page.html), links })
  for (const link of links) {
    if (/^(mailto:|tel:|javascript:)/i.test(link.href)) continue
    let url
    try {
      url = new URL(link.href, origin + path)
    } catch {
      continue
    }
    if (url.origin !== origin) {
      if (!external.has(url.href)) external.set(url.href, new Set())
      external.get(url.href).add(path)
      continue
    }
    if (/\.(png|jpe?g|webp|avif|svg|pdf|ico|xml|txt)$/i.test(url.pathname)) continue
    if (!pages.has(url.pathname) && !queue.includes(url.pathname)) queue.push(url.pathname)
  }
}

// Vérification de chaque lien de chaque page.
const rows = []
const problems = []
const contacts = []
for (const [source, page] of pages) {
  if (!page) continue
  for (const link of page.links) {
    if (/^(mailto:|tel:)/i.test(link.href)) {
      contacts.push({ source, href: link.href, label: link.label })
      continue
    }
    let url
    try {
      url = new URL(link.href, origin + source)
    } catch {
      problems.push({ source, href: link.href, label: link.label, issue: 'URL invalide' })
      continue
    }
    if (url.origin !== origin) continue
    const target = url.pathname === source && link.href.startsWith('#') ? page : pages.get(url.pathname)
    const status = target?.status ?? 'non visité'
    const hash = decodeURIComponent(url.hash.slice(1))
    const anchorOk = !hash || (target?.ids.has(hash) ?? false)
    const row = { source, href: link.href, label: link.label, status, anchorOk }
    rows.push(row)
    if (typeof status !== 'number' || status >= 400) problems.push({ ...row, issue: `statut ${status}` })
    else if (!anchorOk) problems.push({ ...row, issue: `ancre #${hash} introuvable` })
    // Vers l'accueil : seuls le logo et l'entrée de menu « Accueil » y mènent ;
    // un autre libellé trahit un lien provisoire (ancien footer).
    if ((link.href === '/' || link.href === '/en') && !link.isLogo && !/^(Accueil|Home)$/.test(link.label))
      problems.push({ ...row, issue: 'lien vers l’accueil hors logo' })
  }
}

const summary = {
  base,
  pages: [...pages].map(([path, p]) => ({ path, status: p?.status, finalPath: p?.finalPath, links: p?.links.length ?? 0 })),
  problems,
  contacts,
  external: [...external].map(([url, from]) => ({ url, from: [...from] })),
  links: rows,
}
if (reportPath) writeFileSync(reportPath, JSON.stringify(summary, null, 2))

console.log(`${pages.size} pages, ${rows.length} liens internes, ${contacts.length} mailto/tel, ${external.size} liens externes`)
if (problems.length) {
  console.log(`\n${problems.length} problème(s) :`)
  for (const p of problems) console.log(`  ${p.source} → ${p.href} « ${p.label} » : ${p.issue}`)
  process.exit(1)
}
console.log('Aucun lien interne cassé.')
