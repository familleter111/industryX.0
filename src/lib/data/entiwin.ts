/**
 * Enti Win — évaluation qualité pharmaceutique assistée par IA, produit
 * Industry X.0 hébergé hors de ce site.
 *
 * Les liens sortants portent les UTM du site (source « industryx0 ») et un
 * `utm_content` par emplacement. Au clic, AnalyticsProvider envoie
 * `entiwin_clicked` et ajoute l'identifiant PostHog du visiteur (`ix0_id`),
 * grâce à l'attribut `data-cta="entiwin_…"` des boutons.
 */

export const ENTIWIN_URL = 'https://entiwin.cipa-web.com/'

/** Chemin de la page de présentation sur ce site. */
export const ENTIWIN_PATH = '/plateforme/entiwin'

export function entiwinHref(content: string): string {
  const url = new URL(ENTIWIN_URL)
  url.searchParams.set('utm_source', 'industryx0')
  url.searchParams.set('utm_medium', 'website')
  url.searchParams.set('utm_campaign', 'entiwin_launch')
  url.searchParams.set('utm_content', content)
  return url.toString()
}

/**
 * Documents qualité pris en charge et formats acceptés : affichés par la page
 * /plateforme/entiwin et repris par la FAQ (lib/data/faq-center.ts).
 */
export const ENTIWIN_DOCUMENTS: Record<'fr' | 'en', string[]> = {
  fr: [
    'Procédure de gestion des déviations',
    'Procédure CAPA',
    'Formulaire ou modèle de déviation',
    'Procédure de Change Control',
    'SOP approuvée',
    'Rapport d’audit',
    'Réclamation qualité',
    'Rapport APR / PQR',
  ],
  en: [
    'Deviation management procedure',
    'CAPA procedure',
    'Deviation form or template',
    'Change control procedure',
    'Approved SOP',
    'Audit report',
    'Quality complaint',
    'APR / PQR report',
  ],
}

export const ENTIWIN_FORMATS = ['PDF', 'DOCX', 'XLSX'] as const
