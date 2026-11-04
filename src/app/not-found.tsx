import type { Metadata } from 'next'

import { tokens } from '@/lib/tokens'

export const metadata: Metadata = {
  title: 'Page introuvable | CIPA',
  robots: { index: false },
}

/**
 * 404 des adresses hors des pages localisées (chemins avec un point, langue
 * inconnue) : voir layout.tsx, à côté. Les adresses inconnues sous / et /en
 * gardent la page 404 du site ([locale]/not-found.tsx).
 *
 * Page autonome : ni police, ni feuille de style, ni JavaScript du site.
 */
export default function NotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: tokens.color.cream.DEFAULT,
          color: tokens.color.dark.DEFAULT,
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        <main>
          <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>Page introuvable</h1>
          <p style={{ margin: '0 0 1.5rem', color: tokens.color.text.muted }}>
            Cette adresse ne correspond à aucune page du site.
          </p>
          <a href="/" style={{ color: tokens.color.gold.ink, fontWeight: 600 }}>
            Retour à l’accueil
          </a>
        </main>
      </body>
    </html>
  )
}
