#!/usr/bin/env node
/**
 * Mesure la recherche documentaire de l'assistant (lib/chat/retrieve.ts) :
 * pour chaque question du classeur de prospection (lib/data/chatbotBase.ts),
 * son propre passage est-il parmi les k premiers résultats ?
 *
 *   npm run eval:rag            # rappel à k = 3, 5 et 8, questions manquées
 *   npm run eval:rag -- --en    # même mesure sur les passages anglais
 *
 * Outil de mesure, pas un contrôle bloquant : le code de sortie reste 0.
 * À relancer après tout réglage de la normalisation, des mots vides ou de
 * MIN_SCORE, et avant de changer le découpage des passages.
 *
 * Node 22.18 ou plus : lit directement les fichiers TypeScript du site
 * (alias `@/` résolu par cms-alias.mjs). Aucun appel réseau.
 */

import './cms-alias.mjs'

const { CHATBOT_BASE } = await import('@/lib/data/chatbotBase')
const { chatPassages } = await import('@/lib/chat/passages')
const { MIN_SCORE, rankPassages } = await import('@/lib/chat/retrieve')

const locale = process.argv.includes('--en') ? 'en' : 'fr'
const KS = [3, 5, 8]

const passages = chatPassages(locale)
const base = passages.filter((passage) => passage.source === 'base')
if (base.length !== CHATBOT_BASE.length) {
  console.error(`✗ ${base.length} passages de prospection pour ${CHATBOT_BASE.length} réponses.`)
}

/* Les passages de prospection sont dans l'ordre du classeur : le i-ème répond à la i-ème question. */
const missed = []
const hits = Object.fromEntries(KS.map((k) => [k, 0]))
let belowThreshold = 0
for (const [i, entry] of CHATBOT_BASE.entries()) {
  const ranked = rankPassages(entry.question, passages)
  const rank = ranked.findIndex(({ passage }) => passage.id === base[i].id) + 1
  const top = ranked[0]
  if (!top || top.score < MIN_SCORE) belowThreshold++
  for (const k of KS) if (rank > 0 && rank <= k) hits[k]++
  if (rank === 0 || rank > KS[KS.length - 1]) {
    missed.push({ question: entry.question, rank, instead: top ? `${top.passage.id} (${top.score.toFixed(1)})` : '—' })
  }
}

const total = CHATBOT_BASE.length
console.log(`Recherche par mots-clés, ${passages.length} passages (${locale}), ${total} questions de prospection.\n`)
for (const k of KS) console.log(`  rappel@${k} : ${((100 * hits[k]) / total).toFixed(1)} %  (${hits[k]}/${total})`)
console.log(`  sous le seuil MIN_SCORE = ${MIN_SCORE} : ${belowThreshold} question(s)\n`)

if (missed.length) {
  console.log(`Questions dont le passage n'est pas dans les ${KS[KS.length - 1]} premiers (rang obtenu, passage en tête) :`)
  for (const { question, rank, instead } of missed) {
    console.log(`  - « ${question} » : rang ${rank || 'absent'} ; en tête : ${instead}`)
  }
} else {
  console.log('Aucune question manquée.')
}
