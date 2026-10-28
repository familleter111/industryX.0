/**
 * Garde-fous du texte de l'assistant, partagés par le widget (retour
 * immédiat au visiteur) et la route /api/chat (qui seule fait foi).
 *
 * - cleanText : retire ce qui sert à cacher des instructions dans un message
 *   (caractères invisibles, de contrôle ou d'inversion d'écriture, balises
 *   imitant les rôles du modèle) et borne la longueur.
 * - spamReason : repère les messages manifestement automatiques.
 */

/** Caractères de contrôle, sauf tabulation et retour à la ligne. */
const CONTROL = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g
/** Espaces de largeur nulle, marques et inversions de sens d'écriture, BOM. */
const INVISIBLE = /[­​-‏‪-‮⁠-⁤⁦-⁯﻿￹-￻]/g
/** Balises qui imitent un rôle ou un bloc de consignes (<system>, [INST], <|im_start|>…). */
const ROLE_MARKUP =
  /<\/?\s*(system|assistant|user|human|instructions?|prompt|knowledge)\b[^>]*>|\[\/?\s*(INST|SYS|SYSTEM)\s*\]|<\|[^|>]{0,40}\|>/gi

export function cleanText(value: string, max: number): string {
  return value
    .normalize('NFKC')
    .replace(CONTROL, '')
    .replace(INVISIBLE, '')
    .replace(ROLE_MARKUP, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
    .slice(0, max)
}

export type SpamReason = 'links' | 'repeat' | 'gibberish'

/**
 * Lettres de toute écriture (latine, arabe…). Construite à l'exécution : la
 * cible ES5 de tsconfig refuse le drapeau `u` dans un littéral.
 */
const LETTER = new RegExp('\\p{L}', 'gu')

/** Motif du rejet si le message ressemble à du spam, sinon `null`. */
export function spamReason(text: string): SpamReason | null {
  // Plus de deux liens : publicité, pas une question sur CIPA.
  if ((text.match(/https?:\/\/|www\./gi) ?? []).length > 2) return 'links'
  // Un même caractère, ou un même mot, martelé.
  if (/(.)\1{14,}/.test(text) || /\b(\w{2,})\b(?:\W+\1\b){7,}/i.test(text)) return 'repeat'
  // Long texte presque sans lettres : symboles, code, données en vrac.
  if (text.length >= 80) {
    const letters = (text.match(LETTER) ?? []).length
    if (letters / text.length < 0.4) return 'gibberish'
  }
  return null
}
