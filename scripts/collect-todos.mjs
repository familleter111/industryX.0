#!/usr/bin/env node
/**
 * Régénère TODO.md à partir des commentaires TODO du code.
 *
 * Écrite à la main, cette liste aurait divergé dès le premier TODO levé —
 * c'est le sort de toute checklist tenue en parallèle du code. Ici, un TODO
 * retiré du code disparaît du document à la prochaine exécution.
 *
 *   node scripts/collect-todos.mjs          régénère TODO.md
 *   node scripts/collect-todos.mjs --check  échoue si TODO.md n'est plus à jour
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOTS = ['content', 'components', 'app', 'lib']
const SKIP = new Set(['node_modules', '.next', '.git', '_archive'])
const OUT = 'TODO.md'

/** Catégories reconnues. L'ordre décide de la priorité de classement. */
const KINDS = [
  ['TODO juridique', 'Juridique'],
  ['TODO produit', 'Produit'],
  ['TODO qualite', 'Qualité'],
  ['TODO societe', 'Société'],
  ['TODO valider', 'Chiffre à valider'],
  ['TODO destination', 'Navigation'],
  ['TODO', 'Autre'],
]

const OWNER = {
  Juridique: 'Direction juridique',
  Produit: 'Équipe produit',
  Qualité: 'Équipe qualité',
  Société: 'Direction',
  'Chiffre à valider': 'Équipe produit + direction',
  Navigation: 'Équipe web',
  Autre: '—',
}

/** Titre lisible et URL, par fichier de contenu. */
const PAGES = {
  'content/plateforme.ts': ['Vue d’ensemble CIPA', '/plateforme'],
  'content/capture-terrain.ts': ['Capture terrain', '/plateforme/capture-terrain'],
  'content/orchestration.ts': ['Orchestration des processus', '/plateforme/orchestration'],
  'content/intelligence-operationnelle.ts': [
    'Intelligence opérationnelle',
    '/plateforme/intelligence-operationnelle',
  ],
  'content/tableaux-de-bord.ts': ['Tableaux de bord', '/plateforme/tableaux-de-bord'],
  'content/integrations.ts': ['Intégrations industrielles', '/plateforme/integrations'],
  'content/qualite-conformite.ts': ['Qualité & conformité', '/solutions/qualite-conformite'],
  'content/production-dossier-de-lot.ts': [
    'Production & dossier de lot',
    '/solutions/production-dossier-de-lot',
  ],
  'content/maintenance-securite.ts': ['Maintenance & sécurité', '/solutions/maintenance-securite'],
  'content/non-conformites-capa.ts': ['Non-conformités & CAPA', '/solutions/non-conformites-capa'],
  'content/audits-inspections.ts': ['Audits & inspections', '/solutions/audits-inspections'],
  'content/amelioration-continue.ts': ['Amélioration continue', '/solutions/amelioration-continue'],
  'content/shared.ts': ['Navigation et pied de page', 'commun à toutes les pages'],
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx|mjs)$/.test(p)) out.push(p)
  }
  return out
}

function kindOf(line) {
  for (const [needle, label] of KINDS) if (line.includes(needle)) return label
  return 'Autre'
}

/**
 * Un TODO tient rarement sur une ligne. On rassemble les lignes de commentaire
 * qui suivent, tant qu'elles n'ouvrent pas un nouveau TODO — sinon le document
 * ne garderait que la première moitié des phrases, c'est-à-dire celle qui ne
 * dit pas quoi faire.
 */
function textFrom(lines, i) {
  const clean = (l) =>
    l
      .replace(/^\s*(\/\/|\*+|\/\*+)\s?/, '')
      .replace(/\s*\*\/\s*$/, '')
      .trim()

  // On retire « TODO » ET le mot de categorie qui le suit : sans cela chaque
  // entree commencait par « produit — » ou « valider — », qui ne dit rien de
  // plus que la colonne sous laquelle elle est deja rangee.
  const parts = [
    clean(lines[i]).replace(
      /^TODO\s*(juridique|produit|qualite|societe|valider|destinations?)?(\s+et\s+(juridique|produit|qualite|societe))?\s*/i,
      '',
    ),
  ]
  for (let j = i + 1; j < lines.length; j++) {
    if (!/^\s*(\/\/|\*)/.test(lines[j])) break
    if (/\bTODO\b/.test(lines[j])) break
    const t = clean(lines[j])
    if (!t || /^[─-╿=-]{3,}$/.test(t)) break
    parts.push(t)
  }
  return parts.join(' ').replace(/\s+/g, ' ').replace(/^[—–:-]\s*/, '').trim()
}

const found = new Map()
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = relative(process.cwd(), file).split(sep).join('/')
    const lines = readFileSync(file, 'utf8').split(/\r?\n/)
    lines.forEach((line, i) => {
      if (!/\bTODO\b/.test(line)) return
      const text = textFrom(lines, i)
      // Les en-tetes de section des docblocks — « TODO PRODUIT », « TODO
      // JURIDIQUE — A TRANCHER… » — sont ecrits en capitales. Ce sont des
      // intertitres, pas des taches : les compter reviendrait a inventer une
      // douzaine de points qui n'existent pas, et a les cocher deux fois.
      // Banniere : un intertitre de docblock. Soit tout en capitales
      // (« TODO PRODUIT »), soit vide une fois le mot-cle retire.
      const letters = text.replace(/[^\p{L}\s]/gu, '').trim()
      const isBanner = letters === '' || /^[^a-z]+$/.test(letters)
      if (!found.has(rel)) found.set(rel, [])
      found.get(rel).push({ kind: kindOf(line), line: i + 1, text, isBanner })
    })
  }
}

// Les bannieres ne comptent pas : seules les taches reelles sont totalisees.
for (const [file, list] of found) {
  const items = list.filter((e) => !e.isBanner)
  if (items.length) found.set(file, items)
  else found.delete(file)
}

const total = [...found.values()].reduce((n, v) => n + v.length, 0)
const byKind = {}
for (const list of found.values()) {
  for (const e of list) byKind[e.kind] = (byKind[e.kind] ?? 0) + 1
}

const out = []
out.push('# À valider avant mise en ligne')
out.push('')
out.push('<!-- Fichier généré par `node scripts/collect-todos.mjs`. -->')
out.push('<!-- Ne pas éditer à la main : pour retirer une entrée, retirez le TODO du code. -->')
out.push('')
out.push(
  'Les douze pages CIPA décrivent des comportements produit, des engagements ' +
    'contractuels et des chiffres. Tout ce qui n’a pas pu être vérifié au moment de ' +
    'l’écriture porte un commentaire `TODO` à l’endroit exact où il est affirmé. ' +
    'Ce document les rassemble, page par page.',
)
out.push('')
out.push(`**${total} points ouverts.**`)
out.push('')
out.push('| Catégorie | Points | Qui tranche |')
out.push('|---|---:|---|')
for (const label of [...new Set(KINDS.map((k) => k[1]))]) {
  if (byKind[label]) out.push(`| ${label} | ${byKind[label]} | ${OWNER[label] ?? '—'} |`)
}
out.push('')
out.push(
  '> Une page dont il reste un `TODO juridique`, `TODO produit` ou `TODO qualite` ' +
    'non tranché ne doit pas être publiée. Les chiffres marqués « à valider » ' +
    's’affichent en ligne comme des objectifs de déploiement, jamais comme des ' +
    'résultats constatés.',
)
out.push('')

const order = [
  ...Object.keys(PAGES).filter((f) => found.has(f)),
  ...[...found.keys()].filter((f) => !PAGES[f]).sort(),
]

for (const file of order) {
  const list = found.get(file)
  if (!list?.length) continue
  const [title, path] = PAGES[file] ?? [file, '']
  out.push('---')
  out.push('')
  out.push(`## ${title}`)
  out.push('')
  out.push(`\`${file}\`${path ? ` — ${path}` : ''} · ${list.length} point${list.length > 1 ? 's' : ''}`)
  out.push('')
  for (const kind of [...new Set(list.map((e) => e.kind))]) {
    out.push(`**${kind}**`)
    out.push('')
    for (const r of list.filter((e) => e.kind === kind)) {
      out.push(`- [ ] \`L${r.line}\` — ${r.text || '(voir le code)'}`)
    }
    out.push('')
  }
}

const body = out.join('\n').trimEnd() + '\n'

if (process.argv.includes('--check')) {
  let current = ''
  try {
    current = readFileSync(OUT, 'utf8')
  } catch {}
  if (current !== body) {
    console.error('✗ TODO.md n’est plus à jour. Lancez : node scripts/collect-todos.mjs')
    process.exit(1)
  }
  console.log('✓ TODO.md est à jour.')
} else {
  writeFileSync(OUT, body, 'utf8')
  console.log(`✓ TODO.md régénéré — ${total} points dans ${found.size} fichiers.`)
}
