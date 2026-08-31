import type { Metadata } from 'next'
import { Syne, Outfit, Inter } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CIPA par Industry X.0',
  description:
    'CIPA est l’application Industry X.0 pour piloter la production, la qualité et la maintenance industrielle sur mobile, tablette et desktop.',
  keywords: ['industrie 4.0', 'digitalisation', 'IA industrielle', 'CIPA', 'plateforme SaaS', 'qualité', 'production', 'maintenance'],
  authors: [{ name: 'Industry X.0' }],
  openGraph: {
    title: 'CIPA par Industry X.0',
    description: 'Pilotez votre production avec l\'intelligence digitale',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${outfit.variable} ${inter.variable}`}>
      <head>
        {/*
          Les entrees au scroll sont rendues cote serveur dans leur etat de
          depart, soit `style="opacity:0"` — une cinquantaine d'elements sur la
          page d'accueil. Sans JavaScript pour les animer, ils resteraient
          invisibles pour toujours.

          Meme chose pour l'ecran d'introduction : il se retire via un
          setTimeout, donc sans script il recouvrirait la page indefiniment.

          Ces regles ne s'appliquent que si le navigateur n'execute pas de
          script : le contenu reste alors lisible, sans animation. Elles
          n'introduisent aucun clignotement puisqu'elles n'existent pas quand
          le JavaScript fonctionne.
        */}
        <noscript>
          {/*
            dangerouslySetInnerHTML est indispensable ici : passe en enfant
            texte, React echapperait les guillemets du selecteur en &quot;, que
            le parseur CSS rejette — la regle serait silencieusement ignoree.
          */}
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0"]{opacity:1!important;transform:none!important}' +
                '[data-welcome-intro]{display:none!important}',
            }}
          />
        </noscript>
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
