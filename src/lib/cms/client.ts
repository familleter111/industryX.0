/**
 * Lecture des contenus publiés dans Sanity (CMS headless) par son API HTTP :
 * un simple `fetch`, mis en cache par Next, sans SDK (les SDK Sanity actuels
 * exigent Next 16 et React 19, le site est en Next 14).
 *
 * Sans SANITY_PROJECT_ID, rien n'est appelé : chaque contenu garde sa version
 * locale (src/lib/data). Voir docs/cms.md.
 */

import type { Locale } from '@/i18n/routing'

export type CmsEnv = Record<string, string | undefined>

export type CmsConfig = { projectId: string; dataset: string }

/** Version datée de l'API : son comportement ne change pas sans nous. */
export const CMS_API_VERSION = '2025-02-19'

/**
 * Durée de cache d'une réponse, en secondes. Le webhook de publication
 * (api/revalidate) rafraîchit les pages concernées sans attendre.
 */
export const CMS_REVALIDATE_SECONDS = 3600

const TIMEOUT_MS = 5000

/** Étiquette de cache commune à tous les contenus du CMS. */
export const CMS_TAG = 'cms'

/** Étiquette de cache d'un type de document : `cms:testimonial`. */
export function cmsTag(type: string): string {
  return `${CMS_TAG}:${type}`
}

/**
 * Variables du CMS. Accès littéraux à `process.env` : next.config.mjs (`env`)
 * y écrit leur valeur au build, si bien que le serveur en production n'a pas
 * à les redéclarer — et ne peut pas, en les oubliant, revenir aux contenus
 * locaux à la première régénération d'une page.
 */
function buildEnv(): CmsEnv {
  return { SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID, SANITY_DATASET: process.env.SANITY_DATASET }
}

/** Le projet Sanity configuré, ou `null` : le site garde alors ses contenus locaux. */
export function cmsConfig(env: CmsEnv = buildEnv()): CmsConfig | null {
  const projectId = env.SANITY_PROJECT_ID?.trim()
  if (!projectId) return null
  return { projectId, dataset: env.SANITY_DATASET?.trim() || 'production' }
}

/**
 * Résultat d'une requête GROQ sur les documents publiés (jamais les
 * brouillons du Studio), servi par le CDN de Sanity. `type` donne
 * l'étiquette de cache que le webhook invalide. Lève une erreur si Sanity
 * ne répond pas correctement : à l'appelant de choisir son repli.
 */
export async function cmsQuery<T>(config: CmsConfig, type: string, query: string): Promise<T> {
  const url = new URL(
    `https://${config.projectId}.apicdn.sanity.io/v${CMS_API_VERSION}/data/query/${config.dataset}`,
  )
  url.searchParams.set('query', query)
  url.searchParams.set('perspective', 'published')

  const response = await fetch(url.toString(), {
    next: { revalidate: CMS_REVALIDATE_SECONDS, tags: [CMS_TAG, cmsTag(type)] },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`Sanity a répondu ${response.status}`)
  const body = (await response.json()) as { result?: T }
  if (body.result === undefined) throw new Error('réponse de Sanity sans résultat')
  return body.result
}

/** Texte bilingue du CMS (types `localeString` et `localeText` du Studio). */
export type Localized = { fr?: string | null; en?: string | null }

/**
 * Texte dans la langue demandée, sinon en français. Un texte fait seulement
 * d'espaces compte comme vide ; un autre est rendu tel quel, espaces
 * comprises (« de » suivi d'une espace, avant le nom d'un secteur dans un titre).
 */
export function localized(text: Localized | null | undefined, locale: Locale): string {
  const filled = (value: string | null | undefined) => (value?.trim() ? value : '')
  return (locale === 'en' ? filled(text?.en) : '') || filled(text?.fr)
}
