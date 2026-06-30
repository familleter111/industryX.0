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
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
