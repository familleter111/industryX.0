#!/usr/bin/env node
/**
 * Audit d'accessibilité des douze pages CIPA, avec axe-core.
 *
 * Sert de filet, pas de preuve : axe attrape environ un tiers des problèmes
 * réels — contrastes, noms accessibles manquants, structure. Le reste (ordre
 * de lecture, pertinence d'un libellé, piège au clavier) demande de tester à
 * la main. Ce script n'a donc pas vocation à passer au vert pour clore le
 * sujet.
 *
 * Le serveur doit tourner :
 *   npx next build && npx next start -p 3200
 *   node scripts/a11y-audit.mjs
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer'

const BASE = process.env.A11Y_BASE ?? 'http://localhost:3200'
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const AXE = join(process.env.TEMP ?? '/tmp', 'axe.min.js')

const PAGES = [
  '/plateforme',
  '/plateforme/capture-terrain',
  '/plateforme/orchestration',
  '/plateforme/intelligence-operationnelle',
  '/plateforme/tableaux-de-bord',
  '/plateforme/integrations',
  '/solutions/qualite-conformite',
  '/solutions/production-dossier-de-lot',
  '/solutions/maintenance-securite',
  '/solutions/non-conformites-capa',
  '/solutions/audits-inspections',
  '/solutions/amelioration-continue',
]

const axeSource = readFileSync(AXE, 'utf8')

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
  protocolTimeout: 180000,
})

const byRule = new Map()
let totalViolations = 0

for (const path of PAGES) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  // Les entrées au scroll rendues en opacity:0 seraient signalées comme du
  // texte invisible. Sous reduced-motion elles sont posées à leur état final,
  // ce qui est aussi l'état que voit un lecteur ayant cette préférence.
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ])
  await page.goto(BASE + path, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 600))

  await page.evaluate(axeSource)
  const result = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    return await axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      resultTypes: ['violations'],
    })
  })

  const lines = []
  for (const v of result.violations) {
    totalViolations += v.nodes.length
    if (!byRule.has(v.id)) byRule.set(v.id, { help: v.help, impact: v.impact, hits: [] })
    for (const n of v.nodes) {
      byRule.get(v.id).hits.push({ path, target: n.target.join(' '), summary: n.failureSummary })
    }
    lines.push(`   ${v.impact.padEnd(8)} ${v.id} — ${v.nodes.length}`)
  }

  console.log(
    `${path.padEnd(44)} ${result.violations.length === 0 ? 'aucune violation' : result.violations.length + ' règle(s)'}`,
  )
  lines.forEach((l) => console.log(l))
  await page.close()
}

await browser.close()

console.log('\n' + '='.repeat(72))
console.log(`TOTAL : ${totalViolations} occurrence(s) sur ${byRule.size} règle(s)\n`)

for (const [id, info] of [...byRule].sort((a, b) => b[1].hits.length - a[1].hits.length)) {
  console.log(`— ${id} (${info.impact}) · ${info.hits.length} occurrence(s)`)
  console.log(`  ${info.help}`)
  const seen = new Set()
  for (const h of info.hits) {
    const key = h.target
    if (seen.has(key)) continue
    seen.add(key)
    console.log(`    ${h.target}`)
    if (seen.size >= 4) break
  }
  const first = info.hits[0]
  if (first?.summary) {
    console.log('    ' + first.summary.split('\n').slice(0, 3).join(' / '))
  }
  console.log()
}

process.exit(totalViolations > 0 ? 1 : 0)
