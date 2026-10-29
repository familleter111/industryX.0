import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

/**
 * Remplaçants de `next/link` et `next/navigation` : ils préfixent `/en`
 * quand la page est en anglais. Un `href="/contact"` écrit une fois mène donc
 * à `/contact` ou `/en/contact` selon la langue affichée.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)

/**
 * Lien vers une ancre de l'accueil (`/#faq`) : passé tel quel, le préfixe de
 * langue donne `/en/#faq`, une URL en double de `/en`. En objet, next-intl
 * produit `/en#faq`. Les autres liens sont rendus inchangés.
 */
export function homeAnchorHref(href: string) {
  const [pathname, hash] = href.split('#')
  return pathname === '/' && hash ? { pathname: '/', hash } : href
}
