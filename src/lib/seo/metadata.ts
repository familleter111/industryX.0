import type { Metadata } from 'next'

import { localizedPath, type Locale } from '@/lib/i18n'
import { OG_SIZE, ogImagePath } from '@/lib/seo/og'
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
  const url = localizedPath(path, locale)
  // Image de partage générée pour cette page (app/og) ; son texte alternatif
  // est le titre qu'elle affiche.
  const image = { url: ogImagePath(path, locale), ...OG_SIZE, alt: fullTitle }
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: localizedPath(path, 'fr'),
        en: localizedPath(path, 'en'),
        'x-default': localizedPath(path, 'fr'),
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: BRAND.siteName,
      type: 'website',
      images: [image],
      ...openGraph,
      locale: OG_LOCALE[locale],
      alternateLocale: Object.entries(OG_LOCALE)
        .filter(([other]) => other !== locale)
        .map(([, value]) => value),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
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
