import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

import LegalDocument, { ContactCard, LEGAL_PHONE, LEGAL_SITE, MailLink, type LegalSection } from '@/features/legal/LegalDocument'
import { postalAddress } from '@/lib/data/contact'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo/metadata'
import { BRAND } from '@/lib/site'

/**
 * Mentions légales (L1-03).
 *
 * Page en `noindex`, absente du sitemap (lib/site.ts, NOINDEX_PATHS) et du
 * footer tant que les informations ci-dessous ne sont pas confirmées. Une
 * information non confirmée ne s'affiche pas : elle reste en commentaire.
 *
 * TODO(À CONFIRMER, direction / comptabilité) :
 *   - raison sociale exacte et forme juridique (SARL, SA, SUARL…) ;
 *   - identifiant unique RNE / matricule fiscal ;
 *   - capital social, s'il doit figurer ;
 *   - directeur de la publication (nom et fonction) ;
 *   - hébergeur du site : nom, adresse, téléphone.
 * Une fois confirmées : les ajouter à la section « Éditeur », retirer le
 * noindex (robots ci-dessous), ajouter /mentions-legales à publicPaths() et
 * au footer (L1-04).
 */

const UPDATED = { fr: '28 octobre 2026', en: 'October 28, 2026' }

const META = {
  fr: {
    title: 'Mentions légales',
    description: 'Éditeur du site industryx0.pro, coordonnées, propriété intellectuelle et données personnelles.',
  },
  en: {
    title: 'Legal notice',
    description: 'Publisher of the industryx0.pro website, contact details, intellectual property and personal data.',
  },
}

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Metadata {
  return {
    // La marque du suffixe est l'éditeur, pas le produit (« | Industry X.0 »).
    ...pageMetadata({ locale, path: '/mentions-legales', ...META[locale], brand: BRAND.organization }),
    // Tant que les TODO de l'en-tête ne sont pas levés.
    robots: { index: false, follow: true },
  }
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-medium text-gold-ink hover:underline">
    {children}
  </Link>
)

function sectionsFr(): LegalSection[] {
  const l = 'fr'
  return [
    {
      id: 'editeur',
      title: 'Éditeur du site',
      body: (
        <>
          <p>
            Le site <strong>industryx0.pro</strong> est édité par <strong>Industry X.0</strong>, société
            fondée en 2019 à Tunis.
          </p>
          {/* TODO(À CONFIRMER : raison sociale, forme juridique, RNE / matricule fiscal) */}
          <ContactCard
            locale={l}
            rows={[
              ['Siège', postalAddress('fr')],
              ['E-mail', <MailLink key="m" />],
              ['Téléphone', LEGAL_PHONE],
              ['Site', LEGAL_SITE.replace('https://', '')],
            ]}
          />
          {/* TODO(À CONFIRMER : directeur de la publication) */}
        </>
      ),
    },
    // TODO(À CONFIRMER : hébergeur du site — section « Hébergement » à ajouter)
    {
      id: 'propriete',
      title: 'Propriété intellectuelle',
      body: (
        <p>
          Les contenus du site (textes, visuels, logos, marques CIPA et Enti Win) sont protégés. Leur
          reproduction sans autorisation écrite est interdite. Les conditions d’utilisation du site
          sont détaillées dans nos <A href="/conditions-utilisation">conditions générales d’utilisation</A>.
        </p>
      ),
    },
    {
      id: 'donnees',
      title: 'Données personnelles',
      body: (
        <p>
          Les données collectées par le site et vos droits sont décrits dans notre{' '}
          <A href="/privacy">politique de confidentialité</A>.
        </p>
      ),
    },
  ]
}

function sectionsEn(): LegalSection[] {
  const l = 'en'
  return [
    {
      id: 'editeur',
      title: 'Website publisher',
      body: (
        <>
          <p>
            The <strong>industryx0.pro</strong> website is published by <strong>Industry X.0</strong>, a
            company founded in 2019 in Tunis.
          </p>
          <ContactCard
            locale={l}
            rows={[
              ['Head office', postalAddress('en')],
              ['Email', <MailLink key="m" />],
              ['Phone', LEGAL_PHONE],
              ['Website', LEGAL_SITE.replace('https://', '')],
            ]}
          />
        </>
      ),
    },
    {
      id: 'propriete',
      title: 'Intellectual property',
      body: (
        <p>
          The website content (texts, visuals, logos, the CIPA and Enti Win trademarks) is protected.
          Reproducing it without written permission is prohibited. The rules for using the website are
          set out in our <A href="/conditions-utilisation">terms of use</A>.
        </p>
      ),
    },
    {
      id: 'donnees',
      title: 'Personal data',
      body: (
        <p>
          The data collected by the website and your rights are described in our{' '}
          <A href="/privacy">privacy policy</A>.
        </p>
      ),
    },
  ]
}

export default function LegalNoticePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const en = locale === 'en'
  return (
    <LegalDocument
      title={en ? 'Legal notice' : 'Mentions légales'}
      updated={`${en ? 'Last updated:' : 'Dernière mise à jour :'} ${UPDATED[locale]}`}
      sections={en ? sectionsEn() : sectionsFr()}
    />
  )
}
