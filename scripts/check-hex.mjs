#!/usr/bin/env node
/**
 * Échoue si un littéral hexadécimal de couleur apparaît dans un .tsx.
 *
 * Toute couleur doit passer par lib/tokens.ts (via une classe Tailwind) ou
 * par la palette Tailwind par défaut. Un hex en dur recrée une source de
 * vérité parallèle : c'est exactement ce qu'on a mis des heures à résorber.
 *
 * Échappatoire ponctuelle : // eslint-disable-next-line no-hex-color
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOTS = ['app', 'components']
const SKIP = new Set(['node_modules', '.next', '.git', '_archive'])
const HEX = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g
const ALLOW = /(?:eslint-disable-next-line\s+no-hex-color|check-hex-ignore)/

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (p.endsWith('.tsx')) out.push(p)
  }
  return out
}

const violations = []
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, 'utf8').split(/\r?\n/)
    lines.forEach((line, i) => {
      if (ALLOW.test(lines[i - 1] ?? '')) return
      for (const m of line.matchAll(HEX)) {
        violations.push({
          file: relative(process.cwd(), file).split(sep).join('/'),
          line: i + 1,
          hex: m[0],
          snippet: line.trim().slice(0, 90),
        })
      }
    })
  }
}

if (violations.length === 0) {
  console.log('✓ Aucun littéral hex dans les .tsx.')
  process.exit(0)
}

const byFile = new Map()
for (const v of violations) byFile.set(v.file, (byFile.get(v.file) ?? 0) + 1)

console.error(`✗ ${violations.length} littéral(aux) hex dans ${byFile.size} fichier(s).`)
console.error('  Utilisez une classe Tailwind adossée à lib/tokens.ts.\n')
for (const [file, n] of [...byFile].sort((a, b) => b[1] - a[1])) {
  console.error(`  ${String(n).padStart(4)}  ${file}`)
}
const sample = violations.slice(0, 5)
console.error('\n  Exemples :')
for (const v of sample) console.error(`    ${v.file}:${v.line}  ${v.hex}  ${v.snippet}`)
process.exit(1)
