import { CONTACT } from '@/lib/data/contact'
import type { FaqEntry } from '@/lib/data/faq'
import { categoryLabel, type Guide } from '@/lib/data/guides'
import { SOCIAL_PROFILES } from '@/lib/data/socials'
import { localizedPath, type Locale } from '@/lib/i18n'
import { BRAND, SITE_URL } from '@/lib/site'

/**
 * Données structurées schema.org (JSON-LD), rendues par
 * components/seo/JsonLd.tsx.
 *
 * Uniquement des faits que le site affiche déjà : pas de note, d'avis ni de
 * prix. Un `@id` stable relie les blocs entre eux — l'article et le logiciel
 * renvoient à l'organisation déclarée une fois, dans le layout.
 */

type Schema = Record<string, unknown>

const CONTEXT = 'https://schema.org'

/**
 * Description de CIPA, reprise de l'ancienne meta description de l'accueil :
 * la même entité, quelle que soit la page qui la déclare.
 */
export const CIPA_DESCRIPTION: Record<Locale, string> = {
  fr: 'CIPA est l’application Industry X.0 pour piloter la production, la qualité et la maintenance industrielle sur mobile, tablette et desktop.',
  en: 'CIPA is the Industry X.0 application for running industrial production, quality and maintenance on mobile, tablet and desktop.',
}

/** Premier maillon de chaque fil d'Ariane. */
export const HOME_CRUMB: Record<Locale, { name: string; path: string }> = {
  fr: { name: 'Accueil', path: '/' },
  en: { name: 'Home', path: '/' },
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const CIPA_ID = `${SITE_URL}/#cipa`

/** URL absolue d'une page, dans sa langue. */
export const pageUrl = (path: string, locale: Locale) => SITE_URL + localizedPath(path, locale)

const assetUrl = (src: string) => SITE_URL + src

/** Référence à l'organisation, avec ce qu'un éditeur doit porter. */
const publisher = () => ({
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: BRAND.organization,
  logo: { '@type': 'ImageObject', url: assetUrl(BRAND.logo) },
})

/** Industry X.0, sur toutes les pages. */
export function organizationSchema(): Schema {
  const { address } = CONTACT
  return {
    '@context': CONTEXT,
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: BRAND.organization,
    alternateName: [...BRAND.alternateNames],
    url: SITE_URL,
    logo: assetUrl(BRAND.logo),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.locality,
      addressCountry: address.countryCode,
    },
    sameAs: SOCIAL_PROFILES,
  }
}

/** Le site lui-même, sur chaque page d'accueil. */
export function websiteSchema(locale: Locale): Schema {
  const url = pageUrl('/', locale)
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name: BRAND.siteName,
    alternateName: [BRAND.product, BRAND.organization],
    url,
    inLanguage: locale,
    publisher: { '@id': ORGANIZATION_ID },
  }
}

/**
 * Une application éditée par Industry X.0 : CIPA (accueil, pages Solution)
 * ou Enti Win.
 */
export function softwareApplicationSchema({
  locale,
  id = CIPA_ID,
  name = BRAND.product,
  url = pageUrl('/', locale),
  description = CIPA_DESCRIPTION[locale],
  // TODO(seo): « Web, iOS, Android » vient du brief SEO. Le site dit
  // « mobile, tablette et desktop » sans nommer de store : confirmer que des
  // applications iOS et Android natives existent, sinon garder « Web ».
  operatingSystem = 'Web, iOS, Android',
  featureList,
}: {
  locale: Locale
  id?: string
  name?: string
  url?: string
  description?: string
  operatingSystem?: string
  featureList?: string[]
}): Schema {
  return {
    '@context': CONTEXT,
    '@type': 'SoftwareApplication',
    '@id': id,
    name,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem,
    ...(featureList?.length ? { featureList } : {}),
    inLanguage: locale,
    publisher: { '@id': ORGANIZATION_ID },
  }
}

/**
 * Questions-réponses telles qu'affichées : section FAQ de l'accueil (`/`) ou
 * page /faq (`path`).
 */
export function faqSchema(entries: FaqEntry[], locale: Locale, path = '/'): Schema {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    '@id': `${pageUrl(path, locale)}#faq`,
    inLanguage: locale,
    mainEntity: entries.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

/** Fil d'Ariane : chaque étape est une page existante du site. */
export function breadcrumbSchema(locale: Locale, items: { name: string; path: string }[]): Schema {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path, locale),
    })),
  }
}

/** Un guide de /resources. */
export function articleSchema(guide: Guide, locale: Locale): Schema {
  const url = pageUrl(`/resources/${guide.slug}`, locale)
  return {
    '@context': CONTEXT,
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: guide.title,
    description: guide.excerpt,
    image: [assetUrl(guide.image.src)],
    datePublished: guide.date,
    dateModified: guide.updated ?? guide.date,
    inLanguage: locale,
    mainEntityOfPage: url,
    // L'auteur affiché est l'équipe : l'organisation, sous son nom d'équipe.
    author: { '@type': 'Organization', name: guide.author, url: SITE_URL },
    publisher: publisher(),
    articleSection: categoryLabel(guide.category, locale),
  }
}

/**
 * JSON prêt à poser dans un <script type="application/ld+json">. Les
 * caractères qui pourraient fermer la balise ou casser le JavaScript
 * environnant sont échappés en séquences \uXXXX, que JSON relit à l'identique.
 */
export function serializeJsonLd(data: Schema | Schema[]): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
