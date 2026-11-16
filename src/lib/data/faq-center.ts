import { COMPANY, CONTACT, MAILTO, TEL, postalAddress } from '@/content/site-facts'
import type { Locale } from '@/i18n/routing'
import { ENTIWIN_DOCUMENTS, ENTIWIN_FORMATS, ENTIWIN_PATH, entiwinHref } from '@/lib/data/entiwin'
import type { FaqEntry } from '@/lib/data/faq'
import { PARTNERS } from '@/lib/data/partnerLogos'
import { PLATFORM_MENU, platformHref } from '@/lib/data/platform-menu'
import { SECTORS, sectorHref } from '@/lib/data/sectors'
import { ROUTES } from '@/lib/routes'

/**
 * Questions de la page /faq, en trois thèmes : CIPA, Enti Win, Industry X.0.
 *
 * Rien n'est écrit ici qui ne soit déjà publié ailleurs sur le site : chaque
 * réponse cite sa source en commentaire. Les listes (usages, secteurs,
 * partenaires, documents, coordonnées) sont générées depuis leur fichier de
 * référence, pour ne jamais diverger.
 *
 * Les cinq questions de l'accueil (CMS, sinon lib/data/faq.ts) sont reprises
 * dans le thème CIPA, à leur place dans `CIPA_ORDER` : modifiées dans le
 * Studio, elles le sont aussi ici. Une question ajoutée dans le Studio
 * s'affiche en fin de thème.
 */

export type FaqTopicId = 'cipa' | 'entiwin' | 'industryx0'

export type FaqLink = {
  label: string
  href: string
  /** Lien hors du site (nouvel onglet). */
  external?: boolean
  /** `data-cta` pour la mesure d'audience (liens vers Enti Win). */
  cta?: string
}

export type FaqItem = {
  /** Ancre de la question (/faq#id), stable : ne pas renommer. */
  id: string
  question: string
  /** Paragraphes de la réponse. */
  answer: string[]
  links?: FaqLink[]
}

export type FaqTopic = { id: FaqTopicId; title: string; description: string; items: FaqItem[] }

/** Ordre du thème CIPA : questions locales et questions de l'accueil mêlées. */
const CIPA_ORDER = [
  'cipa',
  'usages',
  'industries',
  'mobile-hors-ligne',
  'integrations',
  'audit-trail',
  'droits-donnees',
  'support',
  'pilot-delay',
  'demo-duration',
]

/** « Procédure CAPA » → « procédure CAPA » ; les sigles restent en capitales. */
const lowerFirst = (text: string) => (/^.[a-zà-ÿ]/.test(text) ? text[0].toLowerCase() + text.slice(1) : text)

/** « a, b et c » / « a, b and c ». */
function enumerate(items: string[], locale: Locale): string {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')}${locale === 'fr' ? ' et ' : ' and '}${items.at(-1)}`
}

/** Identifiant d'ancre pour une question du Studio sans clé. */
const slug = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

export function faqCenter(locale: Locale, homeFaq: FaqEntry[]): FaqTopic[] {
  const fr = locale === 'fr'
  const L = (frText: string, enText: string) => (fr ? frText : enText)
  /** Lien vers une page Solution, libellé du menu. */
  const pageLink = (slug: string): FaqLink => {
    const item = PLATFORM_MENU.find((entry) => entry.slug === slug)
    if (!item) throw new Error(`Page Solution inconnue : ${slug}`)
    return { label: item.title[locale], href: platformHref(slug) }
  }

  /* Liens ajoutés aux questions de l'accueil, par clé. */
  const homeLinks: Record<string, FaqLink[]> = {
    industries: SECTORS.map((sector) => ({ label: sector.name[locale], href: sectorHref(sector.slug) })),
    integrations: [pageLink('integrations')],
    'demo-duration': [{ label: L('Demander une démo', 'Book a demo'), href: ROUTES.demo }],
  }

  const fromHome: FaqItem[] = homeFaq.map((entry) => {
    const id = entry.id ?? slug(entry.question)
    return { id, question: entry.question, answer: [entry.answer], links: homeLinks[id] }
  })

  const cipaLocal: FaqItem[] = [
    {
      // Sources : badge du hero (« Plateforme d'intelligence opérationnelle »),
      // description de l'accueil (lib/seo/pages.ts).
      id: 'cipa',
      question: L('Qu’est-ce que CIPA ?', 'What is CIPA?'),
      answer: [
        L(
          'CIPA est la plateforme d’intelligence opérationnelle éditée par Industry X.0. Elle digitalise audits, inspections, non-conformités, CAPA et suivi de production sur mobile et web, pour piloter vos opérations sur une donnée fiable.',
          'CIPA is the operational intelligence platform developed by Industry X.0. It digitizes audits, inspections, non-conformities, CAPA and production tracking on mobile and web, so you run your operations on reliable data.',
        ),
      ],
      links: [{ label: L('Découvrir la plateforme', 'Explore the platform'), href: ROUTES.cipa }],
    },
    {
      // Source : menu Plateforme (lib/data/platform-menu.ts), généré.
      id: 'usages',
      question: L('Quels usages couvre CIPA ?', 'What does CIPA cover?'),
      answer: [
        L(
          `Chaque usage de la plateforme a sa page : ${enumerate(PLATFORM_MENU.map((item) => lowerFirst(item.title.fr)), 'fr')}.`,
          `Each area of the platform has its own page: ${enumerate(PLATFORM_MENU.map((item) => lowerFirst(item.title.en)), 'en')}.`,
        ),
      ],
      links: PLATFORM_MENU.map((item) => ({ label: item.title[locale], href: platformHref(item.slug) })),
    },
    {
      // Sources : lib/data/features.ts (« Application mobile, tablette et poste
      // fixe, utilisables en atelier »), page Remontée terrain (planificateur,
      // photos et mesures ; « Mode hors ligne : synchronisation automatique »).
      // TODO(verifier) : la page Remontée terrain demande de confirmer le mode
      // hors ligne avant publication ; retirer la dernière phrase sinon.
      id: 'mobile-hors-ligne',
      question: L('CIPA fonctionne-t-elle sur mobile, et sans réseau ?', 'Does CIPA work on mobile, and offline?'),
      answer: [
        L(
          'Oui. CIPA s’utilise sur application mobile, tablette et poste fixe, directement en atelier : les audits programmés dans le planificateur se saisissent sur mobile ou tablette, avec photos et mesures. En mode hors ligne, les saisies se synchronisent automatiquement au retour du réseau.',
          'Yes. CIPA runs on a mobile app, tablets and desktop computers, right on the shop floor: audits scheduled in the planner are filled in on a phone or tablet, with photos and measurements. In offline mode, entries sync automatically once the network is back.',
        ),
      ],
      links: [pageLink('remontee-terrain')],
    },
    {
      // Sources : page Conformité & traçabilité (audit trail, workflows de
      // validation), architecture (« ajoutés, jamais remplacés »), page
      // Remontée terrain (signature électronique).
      id: 'audit-trail',
      question: L(
        'Comment CIPA assure-t-elle la traçabilité exigée en audit ?',
        'How does CIPA provide the traceability audits require?',
      ),
      answer: [
        L(
          'Chaque action est journalisée : qui, quoi, sur quelle page, quand, depuis le web ou le mobile. Les enregistrements sont ajoutés, jamais remplacés, et les validations passent par des workflows et une signature électronique : les preuves sont prêtes le jour de l’inspection.',
          'Every action is logged: who did what, on which page, when, from the web or mobile. Records are appended, never overwritten, and approvals go through workflows and an electronic signature: the evidence is ready on inspection day.',
        ),
      ],
      links: [pageLink('conformite-tracabilite')],
    },
    {
      // Source : lib/data/architecture.ts (SECURITY_POINTS).
      // TODO(conformite) : formulation à faire relire, comme ces points.
      id: 'droits-donnees',
      question: L('Qui accède à quoi, et à qui appartiennent nos données ?', 'Who can access what, and who owns our data?'),
      answer: [
        L(
          'Les droits suivent la fonction — opérateur, qualité, maintenance, direction : une validation ne peut être produite que par un compte qui en a la responsabilité. Vos données restent les vôtres, exportables dans un format ouvert.',
          'Access rights follow each role — operator, quality, maintenance, management: an approval can only come from an account that holds that responsibility. Your data stays yours, exportable in an open format.',
        ),
      ],
      links: [{ label: L('Architecture et sécurité', 'Architecture and security'), href: '/resources#securite' }],
    },
  ]

  const byId = new Map([...cipaLocal, ...fromHome].map((item) => [item.id, item]))
  const cipa = [
    ...CIPA_ORDER.flatMap((id) => (byId.has(id) ? [byId.get(id)!] : [])),
    ...fromHome.filter((item) => !CIPA_ORDER.includes(item.id)),
  ]

  const documents = ENTIWIN_DOCUMENTS[locale].map(lowerFirst)
  const entiwin: FaqItem[] = [
    {
      // Source : page Enti Win (badge, accroche).
      id: 'entiwin',
      question: L('Qu’est-ce qu’Enti Win ?', 'What is Enti Win?'),
      answer: [
        L(
          'Enti Win est une solution d’évaluation qualité pharmaceutique assistée par IA, éditée par Industry X.0. L’IA confronte vos procédures, déviations et CAPA aux exigences BPF : chaque écart est justifié et traçable.',
          'Enti Win is an AI-assisted pharmaceutical quality assessment solution developed by Industry X.0. AI checks your procedures, deviations and CAPAs against GMP requirements: every gap is justified and traceable.',
        ),
      ],
      links: [
        { label: L('Découvrir Enti Win', 'Discover Enti Win'), href: ENTIWIN_PATH },
        { label: L('Lancer mon analyse', 'Run my analysis'), href: entiwinHref('faq'), external: true, cta: 'entiwin_faq' },
      ],
    },
    {
      // Source : page Enti Win (documents pris en charge), générée.
      id: 'entiwin-documents',
      question: L('Quels documents Enti Win peut-il analyser ?', 'Which documents can Enti Win analyse?'),
      answer: [
        L(
          `Vos documents qualité, tels qu’ils sont : ${enumerate(documents, 'fr')}. Formats acceptés : ${enumerate([...ENTIWIN_FORMATS], 'fr')}.`,
          `Your quality documents, as they are: ${enumerate(documents, 'en')}. Accepted formats: ${enumerate([...ENTIWIN_FORMATS], 'en')}.`,
        ),
      ],
    },
    {
      // Source : page Enti Win (parcours, détection des thèmes, appel final).
      id: 'entiwin-duree',
      question: L('Combien de temps prend une analyse Enti Win ?', 'How long does an Enti Win analysis take?'),
      answer: [
        L(
          'La détection des thèmes prend généralement 2 à 5 minutes selon le volume de documents. Vous vérifiez les thèmes détectés, puis l’IA confronte chaque exigence du référentiel au contenu de vos documents : un aperçu du résultat s’affiche immédiatement, et le rapport complet est accessible en ligne.',
          'Topic detection usually takes 2 to 5 minutes, depending on the number of documents. You review the detected topics, then AI compares every requirement of the standard with the content of your documents: a preview of the result appears right away, and the full report is available online.',
        ),
      ],
    },
    {
      // Source : page Enti Win (le rapport, principes).
      id: 'entiwin-rapport',
      question: L('Que contient le rapport Enti Win ?', 'What is in the Enti Win report?'),
      answer: [
        L(
          'Chaque exigence du référentiel y est classée couverte, partielle ou non identifiée, avec l’extrait source de chaque conclusion et un plan d’action priorisé. La version du référentiel, l’horodatage et l’historique des analyses sont conservés.',
          'Every requirement of the standard is marked as covered, partial or not found, with the source excerpt behind each conclusion and a prioritised action plan. The standard version, timestamps and analysis history are kept.',
        ),
      ],
    },
    {
      // Source : page Enti Win (principes).
      id: 'entiwin-confidentialite',
      question: L('Mes documents restent-ils confidentiels, et qui décide ?', 'Do my documents stay confidential, and who decides?'),
      answer: [
        L(
          'Vos documents ne sont pas réutilisés pour entraîner de modèle. L’analyse est assistée par IA, jamais autonome : l’expert qualité valide chaque conclusion.',
          'Your documents are not reused to train any model. The analysis is AI-assisted, never autonomous: the quality expert validates every conclusion.',
        ),
      ],
    },
  ]

  /** Numéro insécable : il ne se coupe pas en fin de ligne. */
  const phone = CONTACT.phone.replace(/ /g, ' ')
  const founders = COMPANY.founders.map((founder) => `${founder.name} (${founder.role[locale]})`)
  const partners = PARTNERS.map((partner) => partner.alt)
  const industryx0: FaqItem[] = [
    {
      // Sources : page Entreprise (« Depuis 2019… »), lib/seo/pages.ts
      // (« éditeur tunisien du logiciel CIPA »), page Enti Win.
      id: 'industry-x0',
      question: L('Qui est Industry X.0 ?', 'Who is Industry X.0?'),
      answer: [
        L(
          `Industry X.0 est l’éditeur tunisien de CIPA et d’Enti Win. Depuis ${COMPANY.founded}, l’entreprise transforme l’expertise opérationnelle en solutions digitales concrètes, simples à déployer et conçues pour durer.`,
          `Industry X.0 is the Tunisian company behind CIPA and Enti Win. Since ${COMPANY.founded}, it has turned operational expertise into practical digital solutions that are simple to deploy and built to last.`,
        ),
      ],
      links: [{ label: L('À propos', 'About us'), href: '/entreprise' }],
    },
    {
      // Source : page Entreprise (mission, démarche, « Aujourd'hui »).
      id: 'mission',
      question: L('Quelle est la mission d’Industry X.0 ?', 'What is Industry X.0’s mission?'),
      answer: [
        L(
          'Rendre l’excellence opérationnelle accessible, mesurable et continue. Notre démarche : comprendre le terrain, connecter les données et accélérer l’amélioration, avec des solutions déployées dans des environnements industriels exigeants, en Tunisie et à l’international.',
          'Making operational excellence accessible, measurable and continuous. Our approach: understand the shop floor, connect the data and accelerate improvement, with solutions deployed in demanding industrial environments in Tunisia and abroad.',
        ),
      ],
    },
    {
      // Source : content/site-facts.ts (COMPANY), générée.
      id: 'fondateurs',
      question: L('Qui a fondé Industry X.0 ?', 'Who founded Industry X.0?'),
      answer: [
        L(
          `Industry X.0 a été créée à ${COMPANY.city} en ${COMPANY.founded} par ${enumerate(founders, 'fr')}.`,
          `Industry X.0 was founded in ${COMPANY.city} in ${COMPANY.founded} by ${enumerate(founders, 'en')}.`,
        ),
      ],
    },
    {
      // Sources : section Partenaires de l'accueil, logos des partenaires
      // (lib/data/partnerLogos.ts, générée), pied de page (Startup Act).
      id: 'partenaires',
      question: L('Avec quels partenaires travaillez-vous ?', 'Who are your partners?'),
      answer: [
        L(
          `Industry X.0 s’entoure de partenaires technologiques, de cabinets de conseil et d’institutions : ${enumerate(partners, 'fr')}. L’entreprise est labellisée Startup Act en Tunisie.`,
          `Industry X.0 works with technology partners, consulting firms and institutions: ${enumerate(partners, 'en')}. The company holds the Startup Act label in Tunisia.`,
        ),
      ],
      links: [{ label: L('Nos partenaires', 'Our partners'), href: '/partners' }],
    },
    {
      // Source : content/site-facts.ts (CONTACT), générée.
      id: 'contact',
      question: L('Où êtes-vous situés, et comment vous joindre ?', 'Where are you based, and how can I reach you?'),
      answer: [
        L(
          `Nos bureaux sont à ${postalAddress('fr')}. Écrivez-nous à ${CONTACT.email} ou appelez le ${phone}.`,
          `Our offices are at ${postalAddress('en')}. Email us at ${CONTACT.email} or call ${phone}.`,
        ),
      ],
      links: [
        { label: L('Nous contacter', 'Contact us'), href: ROUTES.contact },
        { label: CONTACT.email, href: MAILTO, external: true },
        { label: CONTACT.phone, href: TEL, external: true },
      ],
    },
  ]

  return [
    {
      id: 'cipa',
      title: 'CIPA',
      description: L(
        'La plateforme : usages, terrain, intégrations, traçabilité et déploiement.',
        'The platform: use cases, shop floor, integrations, traceability and rollout.',
      ),
      items: cipa,
    },
    {
      id: 'entiwin',
      title: 'Enti Win',
      description: L(
        'L’évaluation qualité pharmaceutique assistée par IA.',
        'AI-assisted pharmaceutical quality assessment.',
      ),
      items: entiwin,
    },
    {
      id: 'industryx0',
      title: 'Industry X.0',
      description: L('L’entreprise, sa mission, ses partenaires.', 'The company, its mission, its partners.'),
      items: industryx0,
    },
  ]
}
