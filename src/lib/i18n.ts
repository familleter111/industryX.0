import type { Metadata } from 'next'
import { useLocale } from 'next-intl'

import { routing, type Locale } from '@/i18n/routing'

export type { Locale }

/**
 * Textes bilingues.
 *
 * Chaque composant garde ses deux versions côte à côte, dans un objet
 * `{ fr, en }` typé : TypeScript refuse une version anglaise à laquelle il
 * manquerait une clé. Le balisage, lui, n'existe qu'une fois.
 *
 *   const COPY = { fr: { title: 'Bonjour' }, en: { title: 'Hello' } } satisfies Bilingual<…>
 *   const t = useCopy(COPY)
 */
export type Bilingual<T> = Record<Locale, T>

/** Langue de la page, dans un composant serveur (non asynchrone) ou client. */
export function useCurrentLocale(): Locale {
  return useLocale() as Locale
}

/** Version des textes correspondant à la langue de la page. */
export function useCopy<T>(copy: Bilingual<T>): T {
  return copy[useCurrentLocale()]
}

/**
 * Table de traduction indexée par le texte français, pour les pages dont le
 * texte est écrit directement dans le balisage (pages sectorielles) :
 *
 *   const tr = useTr(EN)
 *   <h2>{tr('Données connectées')}</h2>
 *
 * Le français reste lisible dans le code et sert de clé. Un texte absent de
 * la table s'affiche en français : le contrôle des pages anglaises (voir
 * README, « Traductions ») le signale.
 */
export function useTr(table: Record<string, string>): (fr: string) => string {
  const en = useCurrentLocale() === 'en'
  return (fr) => (en ? (table[fr] ?? fr) : fr)
}

/**
 * Textes d'une donnée structurée : mêmes clés et même ordre que l'original,
 * toutes facultatives. Les nombres, icônes et tracés n'ont pas à être
 * recopiés — seul le texte se traduit.
 */
export type TextOverlay<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? TextOverlay<U>[]
    : T extends (...args: never[]) => unknown
      ? never
      : T extends object
        ? { [K in keyof T]?: TextOverlay<T[K]> }
        : never

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  Object.getPrototypeOf(value) === Object.prototype

/**
 * Pose une traduction sur une donnée : les chaînes du calque remplacent
 * celles de l'original, tableau par tableau et clé par clé. Tout ce que le
 * calque ne mentionne pas (icônes, chiffres, coordonnées) est conservé.
 */
export function overlay<T>(base: T, patch: TextOverlay<T> | undefined): T {
  if (patch === undefined || patch === null) return base
  if (typeof base === 'string') return patch as T
  if (Array.isArray(base)) {
    const items = patch as unknown[]
    return base.map((item, i) => overlay(item, items[i] as never)) as T
  }
  if (isPlainObject(base)) {
    const result: Record<string, unknown> = { ...base }
    for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
      result[key] = overlay(base[key], value as never)
    }
    return result as T
  }
  return base
}

/** Chemin public d'une page : `/contact` en français, `/en/contact` en anglais. */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === routing.defaultLocale) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

const OG_LOCALE: Record<Locale, string> = { fr: 'fr_FR', en: 'en_US' }

/**
 * Métadonnées d'une page, avec les liens `hreflang` vers ses deux versions :
 * les moteurs de recherche indexent chaque langue et proposent la bonne.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  openGraph,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  openGraph?: Metadata['openGraph']
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(path, locale),
      languages: {
        fr: localizedPath(path, 'fr'),
        en: localizedPath(path, 'en'),
        'x-default': localizedPath(path, 'fr'),
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      ...openGraph,
      locale: OG_LOCALE[locale],
    },
  }
}
