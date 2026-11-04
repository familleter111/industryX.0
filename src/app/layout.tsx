import type { ReactNode } from 'react'

/**
 * Layout racine, volontairement vide : <html> et <body> sont posés par
 * [locale]/layout.tsx, qui connaît la langue.
 *
 * Il n'existe que pour not-found.tsx, à côté. Sans eux, une adresse que le
 * middleware ne traite pas (tout chemin avec un point : /favicon.ico,
 * /wp-login.php…) et qui ne correspond à aucun fichier finissait en erreur
 * 500 au lieu d'une 404 : Next n'avait aucune page « introuvable » à
 * rendre hors des pages localisées.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
