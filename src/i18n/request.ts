import { getRequestConfig } from 'next-intl/server'

import { isLocale, routing } from './routing'

/**
 * Les textes ne passent pas par des fichiers de messages : chaque composant
 * porte ses deux versions à côté du balisage (voir lib/i18n.ts). next-intl ne
 * sert ici qu'à connaître la langue de la requête.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = requested && isLocale(requested) ? requested : routing.defaultLocale
  return { locale, messages: {} }
})
