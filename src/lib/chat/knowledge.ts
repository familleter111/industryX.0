/**
 * Base de connaissances de l'assistant IA, construite à partir des données
 * du site : pages Solution (lib/data/platform.ts), FAQ (lib/data/faq.ts),
 * secteurs et coordonnées, plus les réponses de prospection validées par
 * l'équipe (lib/data/chatbotBase.ts). Le modèle ne répond que depuis ces faits : le
 * jour où une page change, l'assistant suit sans réécriture du prompt.
 *
 * Le texte est déterministe (même ordre, aucune date) : il sert de préfixe
 * mis en cache par l'API, qu'un octet changé invaliderait.
 *
 * Étape suivante possible (docs/chatbot.md) : y ajouter les guides
 * (lib/data/guides.ts), ou passer à une recherche documentaire si la base
 * devient trop grande pour un seul prompt.
 */

import { CHATBOT_BASE } from '@/lib/data/chatbotBase'
import { CONTACT, postalAddress } from '@/lib/data/contact'
import { FAQ_ENTRIES } from '@/lib/data/faq'
import { platformHref, platformPages } from '@/lib/data/platform'
import type { ChatLocale } from '@/lib/chat/config'

export const SITE = 'https://www.industryx0.pro'

const FACTS: Record<ChatLocale, string> = {
  fr: `## Industry X.0
Industry X.0 est une startup tunisienne fondée en 2019, spécialisée dans la digitalisation et l'optimisation des opérations industrielles. Elle conçoit et déploie CIPA, une plateforme industrielle pour l'industrie africaine et méditerranéenne : remontée des données terrain, gestion des écarts et de la qualité, pilotage de la performance.
Enti Win : nouveau produit, évaluation qualité pharmaceutique assistée par IA (${SITE}/plateforme/entiwin).
Secteurs : pharmaceutique, agroalimentaire et boissons, cosmétique et dispositifs médicaux, automobile et composants, électronique et câblage, packaging et plasturgie.
Parcours après une prise de contact : 1. Qualification, 2. Démonstration ciblée, 3. Cadrage, 4. Plan d'action. Réponse sous 24 h ouvrées.
Demander une démo : ${SITE}/contact
Coordonnées : ${postalAddress('fr')} — ${CONTACT.phone} — ${CONTACT.email}
Candidatures (emploi, stage, PFE) : CV et motivation à ${CONTACT.email}, objet « Candidature – poste visé ».`,
  en: `## Industry X.0
Industry X.0 is a Tunisian startup founded in 2019, specialized in digitizing and optimizing industrial operations. It designs and deploys CIPA, an industrial platform for African and Mediterranean industry: shop-floor data capture, deviation and quality management, performance management.
Enti Win: new product, AI-assisted pharmaceutical quality assessment (${SITE}/en/plateforme/entiwin).
Industries: pharmaceuticals, food and beverage, cosmetics and medical devices, automotive and components, electronics and wiring, packaging and plastics.
After you get in touch: 1. Qualification, 2. Targeted demo, 3. Scoping, 4. Action plan. Reply within one business day.
Book a demo: ${SITE}/en/contact
Contact: ${postalAddress('en')} — ${CONTACT.phone} — ${CONTACT.email}
Job applications (jobs, internships): resume and cover letter to ${CONTACT.email}, subject “Application – target role”.`,
}

function solutions(locale: ChatLocale): string {
  const prefix = locale === 'en' ? `${SITE}/en` : SITE
  return platformPages(locale)
    .map((page) => {
      const uses = page.sections.map((s) => `- ${s.title} : ${s.lead}`).join('\n')
      return `### ${page.menuTitle} (${prefix}${platformHref(page.slug)})\n${page.description}\n${uses}`
    })
    .join('\n\n')
}

function faq(locale: ChatLocale): string {
  return FAQ_ENTRIES[locale].map((entry) => `Q : ${entry.question}\nR : ${entry.answer}`).join('\n\n')
}

/**
 * Réponses de prospection validées (lib/data/chatbotBase.ts), groupées par
 * thème. Rédigées en français : le modèle les traduit. Sur la version
 * anglaise, les liens pointent vers les pages /en.
 */
function referenceAnswers(locale: ChatLocale): string {
  const themes = new Map<string, string[]>()
  for (const entry of CHATBOT_BASE) {
    const answer = locale === 'en' ? entry.answer.replaceAll(`${SITE}/`, `${SITE}/en/`) : entry.answer
    const block = themes.get(entry.theme) ?? []
    block.push(`Q : ${entry.question}\nR : ${answer}`)
    themes.set(entry.theme, block)
  }
  return Array.from(themes).map(([theme, block]) => `### ${theme}\n${block.join('\n\n')}`).join('\n\n')
}

/** Texte complet de la base, dans la langue demandée. */
export function chatKnowledge(locale: ChatLocale): string {
  const heading = locale === 'en'
    ? {
        solutions: '## CIPA solutions',
        faq: '## Frequently asked questions',
        reference: '## Approved reference answers (written in French, reply in the visitor\'s language)',
      }
    : { solutions: '## Solutions CIPA', faq: '## Questions fréquentes', reference: '## Réponses de référence validées' }
  return [
    FACTS[locale],
    heading.solutions,
    solutions(locale),
    heading.faq,
    faq(locale),
    heading.reference,
    referenceAnswers(locale),
  ].join('\n\n')
}
