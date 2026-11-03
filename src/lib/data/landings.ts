/**
 * Pages d'atterrissage par canal (/lp/<slug>) : la page où mène une campagne
 * (publication LinkedIn, QR code de salon, spot radio, e-mailing), avec un
 * message et un seul appel à l'action adaptés à ce canal.
 *
 * Le CMS en crée autant que nécessaire (lib/cms/landings.ts) ; ces deux-ci
 * servent d'exemple, de repli et d'import initial. Leurs textes reprennent ce
 * que le site affirme déjà (FAQ, pages Solution, Enti Win) : aucune promesse
 * nouvelle.
 *
 * Pages en `noindex`, hors sitemap : elles doublent des contenus du site et
 * n'ont de sens qu'au bout d'un lien de campagne. La source de la visite (UTM,
 * `ref`) et la page d'arrivée sont jointes au lead (lib/analytics/attribution.ts).
 */

import type { Bilingual, Locale } from '@/lib/i18n'

export type LandingChannel = 'linkedin' | 'salon' | 'radio' | 'email' | 'partenaire' | 'autre'

export const LANDING_CHANNELS: readonly LandingChannel[] = ['linkedin', 'salon', 'radio', 'email', 'partenaire', 'autre']

/** Destination du bouton principal. */
export type LandingTarget = 'demo' | 'entiwin' | 'contact'

export type LandingTexts = {
  /** Sur-titre : public visé, événement… */
  eyebrow: string
  title: string
  intro: string
  /** Trois bénéfices, en cartes. */
  benefits: { title: string; text: string }[]
  ctaLabel: string
  /** Sujet pour la balise <title>, sans la marque. */
  metaTitle: string
  metaDescription: string
}

export type LandingPage = LandingTexts & {
  slug: string
  channel: LandingChannel
  target: LandingTarget
  /** Paramètres du lien de campagne à diffuser (voir landingUrl). */
  utm: { source: string; medium: string; campaign: string }
}

type LandingSource = Omit<LandingPage, keyof LandingTexts> & Bilingual<LandingTexts>

const LANDINGS: LandingSource[] = [
  {
    slug: 'demo-linkedin',
    channel: 'linkedin',
    target: 'demo',
    utm: { source: 'linkedin', medium: 'social', campaign: 'demo-cipa' },
    fr: {
      eyebrow: 'Pour les responsables qualité et production',
      title: 'Vos audits et contrôles terrain, sans papier ni ressaisie',
      intro:
        'CIPA digitalise audits, inspections, non-conformités et suivi de production, sur mobile et web. Une démonstration de 45 minutes, guidée par un expert et adaptée à votre secteur, suffit pour voir ce qu’elle change dans vos opérations.',
      benefits: [
        {
          title: 'Une donnée fiable dès le terrain',
          text: 'Grilles partagées, preuves photo horodatées : chaque contrôle produit une donnée exploitable, sans ressaisie.',
        },
        {
          title: 'Des écarts suivis jusqu’à la clôture',
          text: 'Chaque non-conformité devient une action, avec un responsable et une échéance, suivie jusqu’à sa clôture.',
        },
        {
          title: 'Un pilote en quelques semaines',
          text: 'On démarre sur un processus à forte valeur, puis on étend progressivement à tout le site.',
        },
      ],
      ctaLabel: 'Demander une démo',
      metaTitle: 'Démo CIPA : audits et contrôles terrain sans papier',
      metaDescription:
        'Audits, inspections, non-conformités et suivi de production sur mobile : voyez CIPA en 45 minutes, avec un expert, sur votre secteur. Demandez votre démo.',
    },
    en: {
      eyebrow: 'For quality and production managers',
      title: 'Your shop-floor audits and checks, with no paper or retyping',
      intro:
        'CIPA digitizes audits, inspections, non-conformities and production tracking, on mobile and web. A 45-minute demo, guided by an expert and tailored to your industry, is enough to see what it changes in your operations.',
      benefits: [
        {
          title: 'Reliable data from the shop floor',
          text: 'Shared checklists, time-stamped photo evidence: every check produces usable data, with no retyping.',
        },
        {
          title: 'Deviations tracked to closure',
          text: 'Every non-conformity becomes an action, with an owner and a due date, tracked until it is closed.',
        },
        {
          title: 'A pilot within a few weeks',
          text: 'We start with a high-value process, then gradually extend to the whole site.',
        },
      ],
      ctaLabel: 'Book a demo',
      metaTitle: 'CIPA demo: paperless shop-floor audits and checks',
      metaDescription:
        'Audits, inspections, non-conformities and production tracking on mobile: see CIPA in 45 minutes with an expert, for your industry. Book your demo today.',
    },
  },
  {
    slug: 'entiwin-salon',
    channel: 'salon',
    target: 'entiwin',
    utm: { source: 'salon', medium: 'qr', campaign: 'entiwin' },
    fr: {
      eyebrow: 'Évaluation qualité pharmaceutique',
      title: 'Évaluez un document qualité avec Enti Win',
      intro:
        'Enti Win, le nouveau produit d’Industry X.0, évalue un document qualité pharmaceutique avec l’aide de l’IA : vous déposez le document, un premier aperçu de conformité s’affiche, puis vous recevez le rapport complet.',
      benefits: [
        { title: 'Un premier aperçu immédiat', text: 'Un premier résultat de conformité s’affiche dès le dépôt du document.' },
        { title: 'Le rapport complet', text: 'Vos coordonnées suffisent pour recevoir le rapport détaillé.' },
        { title: 'Une démo, si vous le souhaitez', text: 'Le rapport vous propose, si vous le voulez, une démonstration de CIPA.' },
      ],
      ctaLabel: 'Essayer Enti Win',
      metaTitle: 'Enti Win : évaluez un document qualité pharma',
      metaDescription:
        'Déposez un document qualité pharmaceutique, obtenez un premier aperçu de conformité puis le rapport complet : essayez Enti Win, l’évaluation assistée par IA.',
    },
    en: {
      eyebrow: 'Pharmaceutical quality assessment',
      title: 'Assess a quality document with Enti Win',
      intro:
        'Enti Win, Industry X.0’s new product, assesses a pharmaceutical quality document with the help of AI: you upload the document, a first compliance preview appears, then you receive the full report.',
      benefits: [
        { title: 'An instant first preview', text: 'A first compliance result appears as soon as the document is uploaded.' },
        { title: 'The full report', text: 'Your contact details are all it takes to receive the detailed report.' },
        { title: 'A demo, if you wish', text: 'The report offers, if you want one, a demo of CIPA.' },
      ],
      ctaLabel: 'Try Enti Win',
      metaTitle: 'Enti Win: assess a pharma quality document',
      metaDescription:
        'Upload a pharmaceutical quality document, get a first compliance preview and then the full report: try Enti Win, Industry X.0’s AI-assisted assessment tool.',
    },
  },
]

/** Les pages d'atterrissage du fichier, dans la langue demandée. */
export function landingsFor(locale: Locale): LandingPage[] {
  return LANDINGS.map(({ fr, en, ...page }) => ({ ...page, ...(locale === 'en' ? en : fr) }))
}

/** Lien de campagne à diffuser, UTM compris : https://www.industryx0.pro/lp/<slug>?utm_source=… */
export function landingUrl(site: string, page: Pick<LandingPage, 'slug' | 'utm'>, locale: Locale = 'fr'): string {
  const url = new URL(`${site}${locale === 'en' ? '/en' : ''}/lp/${page.slug}`)
  url.searchParams.set('utm_source', page.utm.source)
  url.searchParams.set('utm_medium', page.utm.medium)
  url.searchParams.set('utm_campaign', page.utm.campaign)
  return url.toString()
}
