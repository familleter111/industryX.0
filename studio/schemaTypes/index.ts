import { localeString, localeText } from './locale'
import { testimonial } from './testimonial'

/**
 * Types de contenu du Studio. Chaque document ajouté ici doit avoir son
 * lecteur côté site (src/lib/cms/) : voir docs/cms.md, « Ajouter un contenu ».
 */
export const schemaTypes = [localeString, localeText, testimonial]
