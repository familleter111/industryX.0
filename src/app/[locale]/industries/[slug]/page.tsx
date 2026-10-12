import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import IndustryPage from '@/features/industries/IndustryPage'
import { industryData, industrySlugs } from '@/lib/data/industries'
import { pageMetadata, type Locale } from '@/lib/i18n'

/**
 * Route unique des pages sectorielles.
 *
 * Elle remplace six fichiers de 1 100 lignes qui ne differaient que par leur
 * texte. Next donne la priorite aux routes statiques sur les routes
 * dynamiques : tant qu'un dossier app/[locale]/industries/<slug> subsiste,
 * il l'emporte sur celle-ci. La migration peut donc se faire une industrie
 * a la fois, sans jamais casser les cinq autres.
 */

type Params = { params: { slug: string; locale: Locale } }

export function generateStaticParams() {
  return industrySlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const data = industryData(params.slug, params.locale)
  if (!data) return {}
  return pageMetadata({
    locale: params.locale,
    path: `/industries/${params.slug}`,
    title: data.metaTitle,
    description: data.metaDescription,
  })
}

export default function Page({ params }: Params) {
  setRequestLocale(params.locale)
  if (!industryData(params.slug, params.locale)) notFound()
  // Seul le slug traverse la frontiere serveur / client. La donnee contient
  // des icones Lucide, donc des fonctions, et une fonction ne peut pas etre
  // serialisee vers un composant client : c'est le composant client qui va
  // chercher sa donnee dans le registre.
  return <IndustryPage slug={params.slug} />
}
