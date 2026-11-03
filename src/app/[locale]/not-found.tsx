import { ArrowRight } from 'lucide-react'

import Footer from '@/components/layout/Footer'
import { Link } from '@/i18n/navigation'
import { useCopy } from '@/lib/i18n'

/**
 * Page 404, dans la langue de l'adresse demandée et sous la barre de
 * navigation du site. Next lui donne le statut 404 et `noindex`.
 *
 * Elle répond aux `notFound()` des pages et, via [...rest], à toute adresse
 * inconnue : sans elle, Next servait sa page par défaut, en anglais, sans
 * aucun lien vers le reste du site.
 */

const COPY = {
  fr: {
    code: 'Erreur 404',
    title: 'Cette page est introuvable',
    lead: 'L’adresse a peut-être changé, ou la page n’existe plus. Voici par où reprendre.',
    links: [
      ['/', 'Retour à l’accueil'],
      ['/plateforme/remontee-terrain', 'Découvrir la plateforme CIPA'],
      ['/resources', 'Lire les guides & insights'],
      ['/contact', 'Contacter l’équipe Industry X.0'],
    ],
  },
  en: {
    code: 'Error 404',
    title: 'This page could not be found',
    lead: 'The address may have changed, or the page no longer exists. Here is where to pick up.',
    links: [
      ['/', 'Back to the home page'],
      ['/plateforme/remontee-terrain', 'Discover the CIPA platform'],
      ['/resources', 'Read the guides & insights'],
      ['/contact', 'Contact the Industry X.0 team'],
    ],
  },
}

export default function NotFound() {
  const t = useCopy(COPY)
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream font-body text-dark">
      <section className="mx-auto max-w-2xl px-5 pb-20 pt-[calc(82px+4rem)] text-center sm:px-7 md:pb-28">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gold-ink">{t.code}</p>
        <h1 className="mt-4 font-display text-[32px] font-black leading-tight tracking-[-0.04em] sm:text-[44px]">
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-stone-600">{t.lead}</p>

        <ul className="mx-auto mt-10 grid max-w-md gap-3 text-left">
          {t.links.map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex items-center justify-between rounded-2xl border border-cream-border bg-white px-5 py-4 text-[14.5px] font-semibold transition hover:border-gold/40"
              >
                {label}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="text-gold-ink transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  )
}
