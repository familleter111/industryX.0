import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import IndustryPage from '@/components/industries/IndustryPage'
import { INDUSTRIES, industrySlugs } from '@/lib/data/industries'

/**
 * Route unique des pages sectorielles.
 *
 * Elle remplace six fichiers de 1 100 lignes qui ne differaient que par leur
 * texte. Next donne la priorite aux routes statiques sur les routes
 * dynamiques : tant qu'un dossier app/industries/<slug> subsiste, il
 * l'emporte sur celle-ci. La migration peut donc se faire une industrie a la
 * fois, sans jamais casser les cinq autres.
 */

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return industrySlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const data = INDUSTRIES[params.slug]
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'website',
      locale: 'fr_FR',
    },
  }
}

export default function Page({ params }: Params) {
  if (!INDUSTRIES[params.slug]) notFound()
  // Seul le slug traverse la frontiere serveur / client. La donnee contient
  // des icones Lucide, donc des fonctions, et une fonction ne peut pas etre
  // serialisee vers un composant client : c'est le composant client qui va
  // chercher sa donnee dans le registre.
  return <IndustryPage slug={params.slug} />
}
