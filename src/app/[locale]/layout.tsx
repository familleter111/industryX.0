import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Syne, Outfit, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import '@/styles/globals.css'

import Navbar from '@/components/layout/Navbar'
import { isLocale, routing } from '@/i18n/routing'
import { pageMetadata, type Locale } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'

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

const META = {
  fr: {
    title: 'CIPA par Industry X.0',
    description:
      'CIPA est l’application Industry X.0 pour piloter la production, la qualité et la maintenance industrielle sur mobile, tablette et desktop.',
    keywords: ['industrie 4.0', 'digitalisation', 'IA industrielle', 'CIPA', 'plateforme SaaS', 'qualité', 'production', 'maintenance'],
  },
  en: {
    title: 'CIPA by Industry X.0',
    description:
      'CIPA is the Industry X.0 application for running industrial production, quality and maintenance on mobile, tablet and desktop.',
    keywords: ['industry 4.0', 'digitalization', 'industrial AI', 'CIPA', 'SaaS platform', 'quality', 'production', 'maintenance'],
  },
}

/** Les deux langues sont construites à l'avance, comme l'était le site. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  const { keywords, ...meta } = META[isLocale(locale) ? locale : routing.defaultLocale]
  return {
    // Base des URL relatives (canonical, hreflang, Open Graph) de toutes les pages.
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({ locale, path: '/', ...meta }),
    keywords,
    authors: [{ name: 'Industry X.0' }],
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${syne.variable} ${outfit.variable} ${inter.variable}`}>
      <head>
        {/*
          Les entrees au scroll sont rendues cote serveur dans leur etat de
          depart, soit `style="opacity:0"` — une cinquantaine d'elements sur la
          page d'accueil. Sans JavaScript pour les animer, ils resteraient
          invisibles pour toujours.

          L'ecran d'introduction, lui, n'a plus besoin de regle : sa sortie
          est une animation CSS, qui tourne sans JavaScript.

          La regle ci-dessous ne s'applique que si le navigateur n'execute
          pas de script : le contenu reste alors lisible, sans animation. Elle
          n'introduit aucun clignotement puisqu'elle n'existe pas quand le
          JavaScript fonctionne.
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
                '[style*="opacity:0"]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
      </head>
      <body className="font-body antialiased">
        {/* La Navbar etait importee et rendue a la main dans les quatorze
            pages : elle vit ici, une seule fois.

            Le Footer, lui, reste au niveau des pages : huit d'entre elles le
            veulent en version complete et six en version compacte. Le
            remonter demanderait soit de le rendre client pour qu'il lise la
            route, soit de reorganiser app/ en groupes de routes — deux prix
            plus eleves que le gain. */}
        {/* Le fournisseur transmet la langue aux composants clients
            (useLocale, Link localisé). Aucun message : les textes sont dans
            les composants. */}
        <NextIntlClientProvider locale={locale} messages={{}}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
