/**
 * La base de connaissances de l'assistant, découpée en passages pour la
 * recherche documentaire (lib/chat/retrieve.ts) : un passage par section de
 * page Solution, par question de FAQ et par réponse de prospection validée.
 * Mêmes sources que lib/chat/knowledge.ts, qui reste la version « tout dans
 * le prompt » (CHAT_RETRIEVAL=off).
 *
 * Les faits de base (FACTS de knowledge.ts) ne sont pas découpés : ils
 * restent toujours dans le prompt, la recherche ne peut pas les manquer.
 *
 * Identifiants stables et déterministes : ils viennent du contenu (slug de
 * page, identifiant de section ou de question, slug d'une question sans
 * identifiant), jamais d'un rang. Réordonner le classeur de prospection ou le
 * Studio ne change pas un id, et deux appels donnent la même liste.
 */

import { CHATBOT_BASE } from '@/lib/data/chatbotBase'
import { FAQ_ENTRIES, type FaqEntry } from '@/lib/data/faq'
import { platformHref, platformPages } from '@/lib/data/platform'
import type { ChatLocale } from '@/lib/chat/config'
import { SITE } from '@/lib/chat/knowledge'

export type PassageSource = 'solution' | 'faq' | 'base'

export type Passage = {
  /** Stable : `solution:<page>:<section>`, `faq:<id>`, `base:<slug>`. */
  id: string
  source: PassageSource
  /** Titre montré au modèle (page et section, thème de prospection…). */
  title: string
  /** Page du site à citer, quand il y en a une. */
  url?: string
  text: string
}

/** « Combien coûte CIPA ? » → « combien-coute-cipa ». */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function solutionPassages(locale: ChatLocale): Passage[] {
  const prefix = locale === 'en' ? `${SITE}/en` : SITE
  return platformPages(locale).flatMap((page) => {
    const url = `${prefix}${platformHref(page.slug)}`
    return page.sections.map((section) => ({
      id: `solution:${page.slug}:${section.id}`,
      source: 'solution' as const,
      title: `${page.menuTitle} · ${section.title}`,
      url: `${url}#${section.id}`,
      // La description de la page est répétée dans chaque section : une
      // question générale (« c'est quoi la remontée terrain ? ») retrouve
      // ainsi la page, pas seulement un usage.
      text: [`${page.description}`, `${section.title} : ${section.lead}`, ...section.points.map((p) => `- ${p}`)].join('\n'),
    }))
  })
}

function faqPassages(entries: FaqEntry[]): Passage[] {
  return entries.map((entry) => ({
    id: `faq:${entry.id ?? slugify(entry.question)}`,
    source: 'faq' as const,
    title: entry.question,
    text: `Q : ${entry.question}\nR : ${entry.answer}`,
  }))
}

/**
 * Réponses de prospection (lib/data/chatbotBase.ts), rédigées en français :
 * le modèle traduit. Sur la version anglaise, les liens pointent vers /en,
 * comme dans knowledge.ts.
 */
function basePassages(locale: ChatLocale): Passage[] {
  const seen = new Set<string>()
  return CHATBOT_BASE.map((entry) => {
    let id = `base:${slugify(entry.question)}`
    // Deux questions au même slug (ponctuation ou accent près) : la seconde
    // reçoit un suffixe, toujours le même d'un appel à l'autre.
    for (let n = 2; seen.has(id); n++) id = `base:${slugify(entry.question)}-${n}`
    seen.add(id)
    const answer = locale === 'en' ? entry.answer.replaceAll(`${SITE}/`, `${SITE}/en/`) : entry.answer
    return { id, source: 'base' as const, title: entry.theme, text: `Q : ${entry.question}\nR : ${answer}` }
  })
}

/**
 * Tous les passages, dans la langue demandée. `faq` : la FAQ publiée
 * (lib/cms/faq.ts), le fichier local par défaut.
 */
export function chatPassages(locale: ChatLocale, faq: FaqEntry[] = FAQ_ENTRIES[locale]): Passage[] {
  return [...solutionPassages(locale), ...faqPassages(faq), ...basePassages(locale)]
}

/** Un passage tel que le modèle le lit : titre, page, texte. */
export function formatPassage(passage: Passage): string {
  const head = passage.url ? `### ${passage.title} (${passage.url})` : `### ${passage.title}`
  return `${head}\n${passage.text}`
}
