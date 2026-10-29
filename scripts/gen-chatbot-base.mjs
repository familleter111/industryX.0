#!/usr/bin/env node
/**
 * Génère src/lib/data/chatbotBase.ts depuis le classeur de réponses validées
 * par l'équipe commerciale (par défaut Industry_X0_Base_Chatbot_Prospection.xlsx,
 * à la racine ; un autre chemin peut être passé en argument).
 *
 * Exécuté à la main (`npm run gen:chatbot-base`), jamais au build : le
 * résultat est un fichier statique versionné, relu en revue comme le reste.
 *
 * Classeur attendu : première feuille, colonnes « key » et « detail ».
 *   key    « 01 · Positionnement | Qui est Industry X.0 ? »
 *   detail la réponse validée
 *
 * Les liens « https://industryx0.pro/… » sont réécrits sur l'adresse
 * canonique du site (SITE dans lib/chat/knowledge.ts) : le modèle ne partage
 * que des URL présentes dans sa base, autant qu'elles soient les bonnes.
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import ExcelJS from 'exceljs'

const SOURCE = resolve(process.argv[2] ?? 'Industry_X0_Base_Chatbot_Prospection.xlsx')
const TARGET = resolve('src/lib/data/chatbotBase.ts')
const SITE = 'https://www.industryx0.pro'

const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim()

const workbook = new ExcelJS.Workbook()
await workbook.xlsx.readFile(SOURCE)
const sheet = workbook.worksheets[0]

const header = sheet.getRow(1).values.map((v) => clean(v).toLowerCase())
const keyCol = header.indexOf('key')
const detailCol = header.indexOf('detail')
if (keyCol < 0 || detailCol < 0) {
  console.error(`${SOURCE} : colonnes « key » et « detail » introuvables sur la première feuille.`)
  process.exit(1)
}

const entries = []
sheet.eachRow((row, index) => {
  if (index === 1) return
  const key = clean(row.getCell(keyCol).text)
  const answer = clean(row.getCell(detailCol).text).replace(/https?:\/\/(www\.)?industryx0\.pro/g, SITE)
  if (!key && !answer) return
  const split = key.indexOf('|')
  if (split < 0 || !answer) {
    console.error(`Ligne ${index} ignorée : clé « thème | question » ou réponse manquante.`)
    return
  }
  // « 01 · Positionnement » : le numéro ne sert qu'à trier le classeur.
  const theme = key.slice(0, split).replace(/^\d+\s*[·—–-]\s*/, '').trim()
  const question = key.slice(split + 1).trim()
  entries.push({ theme, question, answer })
})

const body = entries
  .map((e) => `  {\n    theme: ${JSON.stringify(e.theme)},\n    question: ${JSON.stringify(e.question)},\n    answer:\n      ${JSON.stringify(e.answer)},\n  },`)
  .join('\n')

writeFileSync(
  TARGET,
  `/**
 * Réponses de prospection validées par l'équipe, utilisées par l'assistant IA
 * (lib/chat/knowledge.ts) comme réponses de référence.
 *
 * FICHIER GÉNÉRÉ par scripts/gen-chatbot-base.mjs depuis
 * Industry_X0_Base_Chatbot_Prospection.xlsx : corriger le classeur, puis
 * relancer \`npm run gen:chatbot-base\`.
 */

export type ChatbotAnswer = { theme: string; question: string; answer: string }

export const CHATBOT_BASE: ChatbotAnswer[] = [
${body}
]
`,
)
console.log(`${entries.length} réponses écrites dans ${TARGET}`)
