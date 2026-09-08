/**
 * Metadonnees des pages marketing.
 *
 * Deux choses vivent ici, et elles sont volontairement separees du contenu :
 * la mise en forme de l'objet `Metadata` de Next, et le JSON-LD. Les chaines,
 * elles, restent dans `content/<page>.ts` — c'est un texte editorial, pas un
 * detail d'implementation.
 *
 * Les longueurs sont verifiees, pas seulement documentees. Un titre de
 * 74 caracteres ne casse rien : il est simplement tronque par Google, six
 * mois plus tard, sans que personne ne s'en apercoive. Le seul moment ou on
 * peut le voir, c'est a l'ecriture.
 */

import type { Metadata } from 'next'

import { COMPANY } from '@/content/shared'
import type { SeoMeta } from '@/content/types'

/** Au-dela, l'affichage dans les resultats de recherche est tronque. */
const MAX_TITLE = 60
const MAX_DESCRIPTION = 155

function warnIfTooLong(field: string, value: string, max: number, path: string) {
  // En production, ce controle n'a plus d'utilite : le texte est fige et
  // l'avertissement ne serait lu par personne. Il ne coute donc rien au
  // visiteur.
  if (process.env.NODE_ENV === 'production') return
  if (value.length <= max) return
  console.warn(
    `[seo] ${path} — ${field} fait ${value.length} caracteres (maximum ${max}) : ` +
      `« ${value.slice(0, max)}… »`,
  )
}

/**
 * Construit l'objet `Metadata` d'une page a partir de son bloc `seo`.
 *
 * L'Open Graph reprend le titre et la description plutot que d'en inventer
 * d'autres : deux formulations pour la meme page, c'est deux textes a tenir a
 * jour et un seul qui le reste.
 */
export function buildMetadata({ title, description, path }: SeoMeta): Metadata {
  warnIfTooLong('title', title, MAX_TITLE, path)
  warnIfTooLong('description', description, MAX_DESCRIPTION, path)

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${COMPANY.siteUrl}${path}`,
      siteName: COMPANY.name,
      type: 'website',
      locale: 'fr_FR',
    },
  }
}

/**
 * JSON-LD `SoftwareApplication` decrivant CIPA.
 *
 * Pas de `aggregateRating`, pas de `offers` avec un prix invente : un balisage
 * qui affirme une note ou un tarif que le site ne montre nulle part est une
 * declaration fausse, et Google sanctionne les rich snippets non etayes.
 * On ne declare que ce qui est verifiable sur la page.
 */
export function softwareApplicationLd({ title, description, path }: SeoMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: COMPANY.product,
    alternateName: COMPANY.productFull,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Industrial operations management',
    operatingSystem: 'Web, iOS, Android',
    description,
    url: `${COMPANY.siteUrl}${path}`,
    inLanguage: 'fr',
    author: {
      '@type': 'Organization',
      name: COMPANY.name,
      url: COMPANY.siteUrl,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: COMPANY.address.locality,
        postalCode: COMPANY.address.postalCode,
        addressCountry: COMPANY.address.country,
      },
    },
    // Le nom de la page, distinct de celui du produit.
    subjectOf: {
      '@type': 'WebPage',
      name: title,
      url: `${COMPANY.siteUrl}${path}`,
    },
  }
}

/**
 * JSON-LD `FAQPage`, derive de l'accordeon rendu sur la page.
 *
 * Il prend les memes questions que le composant : le balisage ne peut pas
 * decrire une FAQ que le visiteur ne voit pas, ce que Google refuse
 * explicitement.
 */
export function faqPageLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}
