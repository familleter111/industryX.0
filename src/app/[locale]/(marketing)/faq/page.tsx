import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import FaqCenter from '@/features/faq/FaqCenter'
import { loadFaq } from '@/lib/cms/faq'
import { faqCenter } from '@/lib/data/faq-center'
import type { Locale } from '@/lib/i18n'
import { seoMetadata } from '@/lib/seo/metadata'
import { HOME_CRUMB, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'

/**
 * Centre d'aide : une vingtaine de questions sur CIPA, Enti Win et
 * Industry X.0 (lib/data/faq-center.ts), avec recherche et filtre par thème
 * (features/faq/FaqCenter.tsx). La section FAQ de l'accueil reste en place et
 * renvoie ici.
 *
 * Les cinq questions de l'accueil viennent du CMS : une modification dans le
 * Studio rafraîchit les deux pages (étiquette `faq`, voir lib/cms/client.ts).
 */

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Metadata {
  return seoMetadata('/faq', locale)
}

export default async function FaqPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const homeFaq = await loadFaq(locale)
  const topics = faqCenter(locale, homeFaq)

  // Données structurées : une question ne doit être balisée qu'à un seul
  // endroit du site. Celles de l'accueil y sont déjà (FAQPage de /) ; la page
  // balise les quinze autres.
  const onHome = new Set(homeFaq.map((entry) => entry.question))
  const ownEntries = topics
    .flatMap((topic) => topic.items)
    .filter((item) => !onHome.has(item.question))
    .map((item) => ({ question: item.question, answer: item.answer.join(' ') }))

  return (
    <main className="overflow-x-hidden bg-white font-body text-dark">
      <JsonLd
        data={[
          faqSchema(ownEntries, locale, '/faq'),
          breadcrumbSchema(locale, [HOME_CRUMB[locale], { name: 'FAQ', path: '/faq' }]),
        ]}
      />
      <FaqCenter topics={topics} />
      <Footer />
    </main>
  )
}
