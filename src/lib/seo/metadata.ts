import type { Metadata } from 'next'

import { localizedPath, type Locale } from '@/lib/i18n'
import { pageSeo } from '@/lib/seo/pages'
import { BRAND } from '@/lib/site'

const OG_LOCALE: Record<Locale, string> = { fr: 'fr_FR', en: 'en_US' }

/**
 * Métadonnées d'une page, avec les liens `hreflang` vers ses deux versions :
 * les moteurs de recherche indexent chaque langue et proposent la bonne.
 *
 * `title` est le sujet de la page ; la marque est ajoutée ici (« | CIPA »),
 * pour que toutes les pages la portent de la même façon.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  brand = BRAND.product,
  openGraph,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  brand?: string
  openGraph?: Metadata['openGraph']
}): Metadata {
  const fullTitle = `${title} | ${brand}`
  return {
    title: fullTitle,
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
      title: fullTitle,
      description,
      type: 'website',
      ...openGraph,
      locale: OG_LOCALE[locale],
    },
  }
}

/**
 * Métadonnées d'une page déclarée dans lib/seo/pages.ts. Une page inconnue
 * n'en reçoit aucune plutôt que celles d'une autre : le test du registre
 * empêche d'en arriver là.
 */
export function seoMetadata(
  path: string,
  locale: Locale,
  extra?: { openGraph?: Metadata['openGraph'] },
): Metadata {
  const seo = pageSeo(path, locale)
  return seo ? pageMetadata({ locale, path, ...seo, ...extra }) : {}
}
