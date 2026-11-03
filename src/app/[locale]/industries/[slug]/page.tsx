import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/seo/JsonLd'
import IndustryPage from '@/features/industries/IndustryPage'
import { loadIndustryText } from '@/lib/cms/industries'
import { cmsSeoMetadata } from '@/lib/cms/seo'
import { industryData, industrySlugs } from '@/lib/data/industries'
import { industryHref, industryName } from '@/lib/data/industries/labels'
import type { Locale } from '@/lib/i18n'
import { HOME_CRUMB, breadcrumbSchema } from '@/lib/seo/schema'

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

export function generateMetadata({ params }: Params): Promise<Metadata> {
  return cmsSeoMetadata(industryHref(params.slug), params.locale)
}

export default async function Page({ params }: Params) {
  setRequestLocale(params.locale)
  if (!industryData(params.slug, params.locale)) notFound()
  // Seuls le slug et les textes du CMS traversent la frontiere serveur /
  // client. La donnee contient des icones Lucide, donc des fonctions, et une
  // fonction ne peut pas etre serialisee vers un composant client : c'est le
  // composant client qui va chercher sa donnee dans le registre, puis y pose
  // les textes (lib/cms/industries.ts).
  const text = await loadIndustryText(params.slug, params.locale)
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(params.locale, [
          HOME_CRUMB[params.locale],
          {
            name: industryName(params.slug, params.locale) ?? params.slug,
            path: industryHref(params.slug),
          },
        ])}
      />
      <IndustryPage slug={params.slug} text={text} />
    </>
  )
}
