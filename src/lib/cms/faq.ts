/**
 * Questions fréquentes : Sanity quand il est configuré (document `faq`,
 * studio/schemaTypes/faq.ts), sinon lib/data/faq.ts. Lues par l'accueil
 * (section #faq et données structurées FAQPage) et par l'assistant de chat
 * (base de l'IA, et réponses locales via /api/chat/faq/<langue>).
 *
 * `key`, fixé par l'import, devient l'`id` de la question : c'est par lui que
 * l'assistant reconnaît une question sans IA (lib/chat/local.ts), quel que
 * soit l'ordre choisi dans le Studio.
 */

import type { Locale } from '@/i18n/routing'
import { cmsConfig, cmsQuery, localized, type CmsEnv, type Localized } from '@/lib/cms/client'
import { FAQ_ENTRIES, type FaqEntry } from '@/lib/data/faq'

/** Une question telle que la renvoie FAQ_QUERY. */
export type CmsFaq = { key?: string | null; question?: Localized | null; answer?: Localized | null }

export const FAQ_QUERY = '*[_type == "faq"] | order(order asc, _createdAt asc) {key, question, answer}'

/** Documents du CMS → forme du site. Une question sans réponse française est ignorée. */
export function faqFromCms(docs: CmsFaq[], locale: Locale): FaqEntry[] {
  return docs
    .filter((doc) => doc.question?.fr?.trim() && doc.answer?.fr?.trim())
    .map((doc) => ({
      ...(doc.key?.trim() ? { id: doc.key.trim() } : {}),
      question: localized(doc.question, locale),
      answer: localized(doc.answer, locale),
    }))
}

/** Questions à afficher, dans l'ordre choisi dans le Studio. Repli : le fichier local. */
export async function loadFaq(locale: Locale, env?: CmsEnv): Promise<FaqEntry[]> {
  const config = cmsConfig(env)
  if (!config) return FAQ_ENTRIES[locale]

  try {
    return faqFromCms(await cmsQuery<CmsFaq[]>(config, 'faq', FAQ_QUERY), locale)
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'erreur'
    console.warn(`[cms] FAQ indisponible (${reason}) : repli sur le fichier local`)
    return FAQ_ENTRIES[locale]
  }
}
