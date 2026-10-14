import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

/**
 * Remplaçants de `next/link` et `next/navigation` : ils préfixent `/en`
 * quand la page est en anglais. Un `href="/contact"` écrit une fois mène donc
 * à `/contact` ou `/en/contact` selon la langue affichée.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
