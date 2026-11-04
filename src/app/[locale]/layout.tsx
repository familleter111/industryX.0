import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Syne, Outfit, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import '@/styles/globals.css'

import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'
import MotionProvider from '@/components/layout/MotionProvider'
import Navbar from '@/components/layout/Navbar'
import PreviewBadge from '@/components/layout/PreviewBadge'
import RenderGuards from '@/components/layout/RenderGuards'
import JsonLd from '@/components/seo/JsonLd'
import { isLocale, routing } from '@/i18n/routing'
import { organizationSchema } from '@/lib/seo/schema'
import { BRAND, SITE_URL } from '@/lib/site'

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

/** Les deux langues sont construites à l'avance, comme l'était le site. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * Base commune. Chaque page pose ses propres titre, description, canonical et
 * hreflang (lib/seo/metadata.ts) : rien ici qu'une page puisse hériter à tort.
 * Plus de meta keywords : Google l'ignore, et elle était identique partout.
 */
export const metadata: Metadata = {
  // Base des URL relatives (canonical, hreflang, Open Graph) de toutes les pages.
  metadataBase: new URL(SITE_URL),
  title: BRAND.siteName,
  authors: [{ name: BRAND.organization }],
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
    // suppressHydrationWarning : le script ci-dessous peut ajouter `cv-off`
    // aux classes de <html> avant l'hydratation.
    <html
      lang={locale}
      className={`${syne.variable} ${outfit.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Arrivée sur une ancre (`/#faq`) : le navigateur y défile pendant le
          chargement, avant tout JavaScript de page. Les sections en rendu
          différé (`cv-auto`) n'auraient alors que leur hauteur estimée et la
          cible serait mal placée : on les rend toutes d'emblée. Le reste de la
          garde (clics, changements de hash) est dans RenderGuards.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if(location.hash)document.documentElement.classList.add('cv-off')",
          }}
        />
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
        {/* L'organisation, une fois par page : les autres blocs JSON-LD y
            renvoient par son @id (lib/seo/schema.ts). */}
        <JsonLd data={organizationSchema()} />
        {/* La Navbar etait importee et rendue a la main dans les quatorze
            pages : elle vit ici, une seule fois. Le Footer, lui, reste au
            niveau des pages. */}
        {/* Le fournisseur transmet la langue aux composants clients
            (useLocale, Link localisé). Aucun message : les textes sont dans
            les composants. */}
        <NextIntlClientProvider locale={locale} messages={{}}>
          <MotionProvider>
            <Navbar />
            {children}
          </MotionProvider>
          <AnalyticsProvider locale={locale} />
          <PreviewBadge locale={locale} />
          {/* Rendu différé et ancres, animations en pause hors écran. */}
          <RenderGuards />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
