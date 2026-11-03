import { loadTestimonials } from '@/lib/cms/testimonials'
import type { Locale } from '@/lib/i18n'

import CustomersView from './CustomersView'

/**
 * Page serveur : charge les témoignages (Sanity, sinon le fichier local),
 * puis rend la page client CustomersView.
 */
export default async function CustomersPage({ params: { locale } }: { params: { locale: Locale } }) {
  // Verbatims validés + propositions de rédaction, comme sur l'accueil :
  // ces dernières restent à faire approuver (voir lib/data/testimonials.ts).
  const testimonials = await loadTestimonials(locale, { includeDrafts: true })
  return <CustomersView testimonials={testimonials} />
}
