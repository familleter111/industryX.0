/**
 * Recherche par mots-clés dans les passages (lib/chat/passages.ts) : BM25
 * écrit à la main, sans dépendance ni clé d'API. Première étape de la
 * recherche documentaire de l'assistant (docs/chatbot.md) ; une recherche
 * par embeddings pourra la remplacer sans changer la route.
 *
 * Normalisation : minuscules, accents retirés, ponctuation retirée, mots
 * vides français et anglais ignorés, pluriel réduit (« intégrations » trouve
 * « intégration »). Pas de vrai stemmer : le gain serait petit sur une base
 * de cette taille, et les règles, nombreuses.
 *
 * L'index est construit une fois par liste de passages et gardé en mémoire
 * (WeakMap) : la route reconstruit sa liste quand la FAQ publiée change,
 * toutes les 5 minutes au plus.
 */

import type { Passage } from '@/lib/chat/passages'

/* Paramètres classiques de BM25. */
const K1 = 1.2
const B = 0.75

/**
 * En dessous de ce score, le meilleur passage n'est qu'une coïncidence de
 * mots courants : on ne renvoie rien, et le modèle répond avec les faits de
 * base en orientant vers le formulaire. Réglé avec `npm run eval:rag`.
 */
export const MIN_SCORE = 2

/** Poids de la question précédente du visiteur dans la requête (suivi). */
const PREVIOUS_WEIGHT = 0.5

/**
 * Mots vides : articles, pronoms, prépositions, auxiliaires et les mots de la
 * question elle-même (« comment », « est-ce que »…), qui ne distinguent rien.
 */
const STOP_WORDS = new Set(
  (
    'a ai aie aient aies ait alors as au aucun aura aurai auraient aurais aurait auras aurez auriez aurions aurons auront aux avaient avais avait avec avez aviez avions avoir avons ayant ayez ayons ' +
    'bien bon ' +
    'c ca ce ceci cela celle celles celui ces cet cette ceux chaque chez ci comme comment ' +
    'd dans de depuis des dessous dessus deux doit doivent donc dont du ' +
    'elle elles en encore entre es est et etaient etais etait etant ete etes etiez etions etre eu eue eues eus eut eux ' +
    'faire fais fait faites font fur ' +
    'ici il ils ' +
    'j je jusqu juste ' +
    'l la le les leur leurs lui ' +
    'm ma mais me meme memes mes moi mon ' +
    'n ne ni nos notre nous ' +
    'on ont ou ' +
    'par parce pas peu peut peuvent plus plutot pour pourquoi pouvez pouvons puis ' +
    'qu quand que quel quelle quelles quels qui quoi ' +
    's sa sans se sera serai seraient serais serait seras serez seriez serions serons seront ses si sien soi soient sois soit sommes son sont soyez soyons suis sur ' +
    't ta te tes toi ton tous tout toute toutes tres tu ' +
    'un une ' +
    'va vais vas vers veut veux voici voila vont vos votre voudrais voulez voulons vous ' +
    // Formules de la question : « je souhaite savoir », « aujourd'hui ».
    'aimerais aujourd hui savoir souhaite souhaitez souhaitons ' +
    'y ' +
    // Anglais.
    'about above after again all also am an and any are as at be because been before being below between both but by ' +
    'can could did do does doing down during each few for from further had has have having he her here hers him his how ' +
    'i if in into is it its itself just let me more most my myself no nor not now of off on once only or other our ours out over own ' +
    'same she should so some such than that the their theirs them then there these they this those through to too under until up us ' +
    'very was we were what when where which while who whom why will with would you your yours'
  ).split(/\s+/),
)

/** Un mot tel qu'il est indexé : sans accent ni majuscule, pluriel réduit. */
function stem(word: string): string {
  if (word.length > 3 && /(s|x)$/.test(word)) return word.slice(0, -1)
  return word
}

/** Mots d'un texte, normalisés ; les mots vides et d'une lettre tombent. */
export function tokenize(text: string): string[] {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    // Apostrophes et traits d'union séparent : « l'audit », « non-conformité ».
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
    .map(stem)
}

type Index = {
  /** Pour chaque passage, fréquence de chacun de ses mots. */
  docs: { passage: Passage; length: number; freq: Map<string, number> }[]
  /** Nombre de passages qui contiennent le mot. */
  df: Map<string, number>
  averageLength: number
}

function buildIndex(passages: Passage[]): Index {
  const docs = passages.map((passage) => {
    const freq = new Map<string, number>()
    const words = tokenize(`${passage.title}\n${passage.text}`)
    for (const word of words) freq.set(word, (freq.get(word) ?? 0) + 1)
    return { passage, length: words.length, freq }
  })
  const df = new Map<string, number>()
  for (const doc of docs) doc.freq.forEach((_, word) => df.set(word, (df.get(word) ?? 0) + 1))
  const averageLength = docs.reduce((sum, doc) => sum + doc.length, 0) / Math.max(docs.length, 1)
  return { docs, df, averageLength }
}

/* Un index par liste de passages, construit à la première recherche. */
const indexes = new WeakMap<Passage[], Index>()

function indexOf(passages: Passage[]): Index {
  let index = indexes.get(passages)
  if (!index) {
    index = buildIndex(passages)
    indexes.set(passages, index)
  }
  return index
}

export type Scored = { passage: Passage; score: number }

/**
 * Les passages classés par pertinence, sans seuil : sert à l'évaluation
 * (scripts/eval-rag.mjs) et aux tests. `previous` : la question précédente du
 * visiteur, qui complète une question de suivi (« et pour la pharma ? »).
 */
export function rankPassages(question: string, passages: Passage[], previous?: string): Scored[] {
  const index = indexOf(passages)
  const weights = new Map<string, number>()
  for (const word of tokenize(question)) weights.set(word, (weights.get(word) ?? 0) + 1)
  if (previous) {
    for (const word of tokenize(previous)) weights.set(word, (weights.get(word) ?? 0) + PREVIOUS_WEIGHT)
  }
  const n = index.docs.length
  const scored: Scored[] = []
  for (const doc of index.docs) {
    let score = 0
    weights.forEach((weight, word) => {
      const tf = doc.freq.get(word)
      if (!tf) return
      const df = index.df.get(word) ?? 0
      const idf = Math.log(1 + (n - df + 0.5) / (df + 0.5))
      score += weight * idf * ((tf * (K1 + 1)) / (tf + K1 * (1 - B + (B * doc.length) / index.averageLength)))
    })
    if (score > 0) scored.push({ passage: doc.passage, score })
  }
  // À score égal, l'ordre des passages : le classement reste déterministe.
  return scored.sort((a, b) => b.score - a.score)
}

/**
 * Les `k` passages les plus proches de la question, ou une liste vide si
 * aucun n'atteint le score minimal : le modèle répond alors avec les faits de
 * base et oriente vers le formulaire.
 */
export function retrievePassages(question: string, passages: Passage[], k = 8, previous?: string): Passage[] {
  return rankPassages(question, passages, previous)
    .filter(({ score }) => score >= MIN_SCORE)
    .slice(0, k)
    .map(({ passage }) => passage)
}
