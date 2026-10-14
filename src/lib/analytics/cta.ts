import type { AnalyticsEvents } from './events'

/**
 * Reconnaît un clic d'appel à l'action, sans instrumenter chaque lien.
 *
 * Un seul écouteur sur le document (AnalyticsProvider) passe chaque clic
 * ici. Est un CTA :
 *   - tout lien vers /contact ou /en/contact ;
 *   - tout élément portant `data-cta="<identifiant>"` (pour un CTA qui ne
 *     mène pas à /contact, ou pour lui donner un identifiant stable).
 *
 * La zone (`location`) vient du plus proche ancêtre `data-cta-location`,
 * sinon du pied de page ou de l'en-tête, sinon « page ».
 */

const CONTACT_PATH = /^\/(?:en\/)?contact\/?$/

function pathOf(href: string): string {
  try {
    return new URL(href, 'http://local').pathname
  } catch {
    return href
  }
}

export function locationOf(element: Element): string {
  const explicit = element.closest('[data-cta-location]')?.getAttribute('data-cta-location')
  if (explicit) return explicit
  if (element.closest('footer')) return 'footer'
  if (element.closest('header, nav')) return 'navbar'
  return 'page'
}

export function ctaFromClick(target: EventTarget | null): AnalyticsEvents['cta_clicked'] | null {
  if (!(target instanceof Element)) return null
  const element = target.closest('[data-cta], a[href]')
  if (!element) return null

  const explicit = element.getAttribute('data-cta')
  const href = element.getAttribute('href') ?? ''
  const destination = href ? pathOf(href) : ''
  if (!explicit && !CONTACT_PATH.test(destination)) return null

  const location = locationOf(element)
  const label = (element.getAttribute('aria-label') || element.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80)

  return {
    cta_id: explicit || `contact_${location}`,
    cta_label: label,
    location,
    destination: destination || explicit || '',
  }
}
