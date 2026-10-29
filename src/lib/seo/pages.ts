import { ENTIWIN_PATH } from '@/lib/data/entiwin'
import { guideBySlug } from '@/lib/data/guides'
import { industryData } from '@/lib/data/industries'
import { platformPage } from '@/lib/data/platform'
import type { Bilingual, Locale } from '@/lib/i18n'

/**
 * Titre et description de chaque page publique : une seule table.
 *
 * Les pages à contenu structuré (Solution, secteurs, guides) gardent les
 * leurs dans leur fichier de données ; les autres sont ici. Les deux
 * alimentent les métadonnées (lib/seo/metadata.ts) et les images de partage
 * (app/og). tests/seo.test.ts vérifie que chaque page en a, qu'aucun titre ni
 * aucune description ne se répète, et leurs longueurs.
 *
 * Règles d'écriture : le sujet de la page d'abord, le mot-clé principal en
 * tête ; le titre complet (avec « | CIPA ») vise 50 à 60 caractères, la
 * description 140 à 160 et finit par une invitation à agir.
 */

export type PageSeo = {
  /** Sujet de la page, sans la marque : pageMetadata ajoute « | CIPA ». */
  title: string
  description: string
  /** Marque du suffixe, quand la page ne parle pas de CIPA. */
  brand?: string
}

const STATIC_PAGES: Record<string, Bilingual<PageSeo>> = {
  '/': {
    // Titre imposé par le brief SEO : 66 caractères, au-dessus de la cible.
    fr: {
      title: 'Logiciel qualité, audits & non-conformités pour l’industrie',
      description:
        'CIPA digitalise audits, inspections, non-conformités, CAPA et suivi de production sur mobile et web, pour piloter sur une donnée fiable. Demandez une démo.',
    },
    en: {
      title: 'Quality, audit & CAPA software for manufacturing',
      description:
        'CIPA digitizes audits, inspections, non-conformities, CAPA and production tracking on mobile and web, so you run on reliable shop-floor data. Book a demo.',
    },
  },
  '/entreprise': {
    fr: {
      title: 'Industry X.0, éditeur tunisien du logiciel CIPA',
      description:
        'Depuis 2019, Industry X.0 transforme l’expertise opérationnelle en solutions digitales simples à déployer, dont CIPA. Découvrez notre vision et nos valeurs.',
    },
    en: {
      title: 'Industry X.0, the Tunis-based company behind CIPA',
      description:
        'Since 2019, Industry X.0 has turned operational expertise into practical digital tools that are simple to deploy, including CIPA. See our vision and values.',
    },
  },
  '/customers': {
    fr: {
      title: 'Cas clients : digitalisation qualité dans l’industrie',
      description:
        'Pharma, agroalimentaire, packaging : découvrez comment des industriels utilisent CIPA pour leurs audits, la qualité et la production. Lisez leurs témoignages.',
    },
    en: {
      title: 'Customer stories: digitizing quality in manufacturing',
      description:
        'Pharma, food, packaging: see how manufacturers use CIPA for their audits, quality and production, and read what their teams have to say. Explore the stories.',
    },
  },
  '/partners': {
    fr: {
      title: 'Nos partenaires technologiques et institutionnels',
      description:
        'Microsoft, AWS, EY, Deloitte, GIZ, The Dot, Novation City : l’écosystème qui accompagne Industry X.0 et le déploiement de CIPA. Découvrez nos partenaires.',
    },
    en: {
      title: 'Technology, institutional and academic partners',
      description:
        'Microsoft, AWS, EY, Deloitte, GIZ, The Dot, Novation City: the ecosystem that supports Industry X.0 and CIPA deployments at scale. Meet our partners.',
    },
  },
  '/contact': {
    fr: {
      title: 'Demander une démo du logiciel qualité industriel',
      description:
        'Parlons de vos opérations : un expert Industry X.0 vous présente CIPA lors d’une démo de 45 minutes adaptée à votre secteur. Réponse sous 24 h, sans engagement.',
    },
    en: {
      title: 'Book a demo of our industrial quality software',
      description:
        'Let’s talk about your operations: an Industry X.0 expert walks you through CIPA in a 45-minute demo tailored to your industry. We reply within 24 hours.',
    },
  },
  '/privacy': {
    fr: {
      title: 'Politique de confidentialité et données personnelles',
      description:
        'Quelles données Industry X.0 collecte via son site, pourquoi, avec qui elles sont partagées, combien de temps et comment exercer vos droits. Lisez la politique.',
    },
    en: {
      title: 'Privacy policy and personal data protection',
      description:
        'What data Industry X.0 collects through its website, why, who it is shared with, how long it is kept and how to exercise your rights. Read the full policy.',
    },
  },
  '/conditions-utilisation': {
    fr: {
      title: 'Conditions générales d’utilisation du site web',
      description:
        'Les règles d’utilisation du site Industry X.0 : accès, formulaires de contact, propriété intellectuelle, responsabilité et droit applicable. Consultez-les ici.',
    },
    en: {
      title: 'Terms and conditions of use for the website',
      description:
        'The rules for using the Industry X.0 website: access, contact forms, intellectual property, liability and governing law. Read them before using our forms.',
    },
  },
  '/resources': {
    fr: {
      title: 'Guides qualité, audits et digitalisation industrielle',
      description:
        'Guides pratiques pour digitaliser audits terrain, non-conformités, CAPA et indicateurs qualité dans l’industrie. Des méthodes concrètes, sans jargon. Lisez-les.',
    },
    en: {
      title: 'Guides on quality, audits and industrial digitization',
      description:
        'Practical guides to digitizing shop-floor audits, non-conformities, CAPA and quality KPIs in manufacturing. Concrete methods, no jargon. Start reading now.',
    },
  },
  // Page encore servie par son propre dossier (voir lib/site.ts).
  '/industries/cosmetics': {
    fr: {
      title: 'Logiciel qualité cosmétique et dispositifs médicaux',
      description:
        'ISO 22716, ISO 13485, salle blanche, traçabilité UDI et contrôles qualité : CIPA digitalise la production cosmétique et des dispositifs médicaux. Voir la démo.',
    },
    en: {
      title: 'Quality software for cosmetics and medical devices',
      description:
        'ISO 22716 and ISO 13485 compliance, cleanroom work, UDI traceability and quality checks: CIPA digitizes cosmetics and medical device production. Book a demo.',
    },
  },
  // Enti Win est un autre produit : la marque du titre est l'éditeur.
  [ENTIWIN_PATH]: {
    fr: {
      title: 'Enti Win : évaluation BPF assistée par IA',
      description:
        'Enti Win confronte vos procédures, déviations et CAPA aux exigences BPF : chaque écart est justifié, sourcé et traçable. Lancez votre analyse en ligne.',
      brand: 'Industry X.0',
    },
    en: {
      title: 'Enti Win: AI-assisted GMP quality assessment',
      description:
        'Enti Win checks your procedures, deviations and CAPAs against GMP requirements: every gap is justified, sourced and traceable. Start your analysis online today.',
      brand: 'Industry X.0',
    },
  },
}

/** Titre et description d'une page publique (chemin français, sans /en). */
export function pageSeo(path: string, locale: Locale): PageSeo | undefined {
  const known = STATIC_PAGES[path]
  if (known) return known[locale]

  const [, section, slug] = path.split('/')
  if (section === 'plateforme') {
    const page = platformPage(slug, locale)
    return page && { title: page.metaTitle, description: page.metaDescription }
  }
  if (section === 'industries') {
    const data = industryData(slug, locale)
    return data && { title: data.metaTitle, description: data.metaDescription }
  }
  if (section === 'resources') {
    const guide = guideBySlug(slug, locale)
    return guide && { title: guide.metaTitle, description: guide.metaDescription }
  }
  return undefined
}
