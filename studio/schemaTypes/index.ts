import { faq } from './faq'
import { guide, localeBody } from './guide'
import { industry, industrySlide } from './industry'
import { landing } from './landing'
import { localeString, localeText } from './locale'
import { testimonial } from './testimonial'

/**
 * Types de contenu du Studio. Chaque document ajouté ici doit avoir son
 * lecteur côté site (src/lib/cms/) : voir docs/cms.md, « Ajouter un contenu ».
 */
export const schemaTypes = [localeString, localeText, localeBody, industrySlide, testimonial, faq, guide, industry, landing]

/** Documents créés par l'import initial seulement (npm run cms:seed) : ni création ni suppression dans le Studio. */
export const FIXED_DOCUMENT_TYPES = ['industry']
