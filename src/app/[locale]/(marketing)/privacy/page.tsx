import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { ReactNode } from 'react'

import Footer from '@/components/layout/Footer'
import { pageMetadata, useCopy, type Locale } from '@/lib/i18n'

/**
 * Politique de confidentialite.
 *
 * Le formulaire de contact et l'assistant de chat renvoyaient vers /privacy,
 * qui n'existait pas. Le texte ne decrit que ce que fait le code :
 *   - formulaire : champs de services/leads.ts, enregistres cote serveur ;
 *   - chat : reponses generees dans le navigateur, rien n'est envoye ;
 *   - mesure d'audience PostHog (lib/analytics/), soumise a consentement ;
 *     aucun cookie de publicite.
 *
 * A faire relire par un juriste avant publication, en particulier la duree
 * de conservation, qui n'est pas encore fixee. La version anglaise est une
 * traduction : en cas de divergence, c'est la version francaise qui fait foi.
 */

const META = {
  fr: {
    title: 'Politique de confidentialité — Industry X.0',
    description:
      'Quelles données Industry X.0 collecte via son site, pourquoi, et comment exercer vos droits.',
  },
  en: {
    title: 'Privacy policy — Industry X.0',
    description:
      'What data Industry X.0 collects through its website, why, and how to exercise your rights.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: '/privacy', ...META[locale] })
}

const Mail = () => (
  <a href="mailto:hello@industryx0.pro" className="font-medium text-gold-ink hover:underline">
    hello@industryx0.pro
  </a>
)

const ContactLink = ({ label }: { label: string }) => (
  <Link href="/contact" className="font-medium text-gold-ink hover:underline">
    {label}
  </Link>
)

type Section = { title: string; body: ReactNode }

const COPY: Record<Locale, { eyebrow: string; title: string; lead: string; sections: Section[] }> = {
  fr: {
    eyebrow: 'Légal',
    title: 'Politique de confidentialité',
    lead: 'Cette page explique quelles données le site d’Industry X.0 collecte, pourquoi, et comment exercer vos droits.',
    sections: [
      {
        title: 'Responsable du traitement',
        body: (
          <p>
            Industry X.0, Cité les pins, Tunis 1053, Tunisie. Pour toute question relative à vos
            données : <Mail />.
          </p>
        ),
      },
      {
        title: 'Données collectées par le formulaire de contact',
        body: (
          <>
            <p>
              Lorsque vous nous écrivez depuis la page <ContactLink label="Contact" />, nous
              enregistrons :
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>vos prénom, nom, adresse e-mail et société ;</li>
              <li>votre numéro de téléphone et son pays, s’ils sont renseignés (facultatif) ;</li>
              <li>votre secteur d’activité et votre message ;</li>
              <li>votre consentement, la date et la page d’origine de la demande.</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Finalité et base légale',
        body: (
          <p>
            Ces données servent uniquement à répondre à votre demande — démonstration, question ou
            échange avec notre équipe. Leur traitement repose sur votre consentement, donné en
            cochant la case prévue dans le formulaire.
          </p>
        ),
      },
      {
        title: 'Stockage et accès',
        body: (
          <p>
            Les demandes sont enregistrées sur le serveur d’Industry X.0. Seule notre équipe y a
            accès. Elles ne sont ni vendues, ni louées, ni cédées à des tiers.
          </p>
        ),
      },
      {
        title: 'Assistant de chat',
        body: (
          <p>
            L’assistant de chat du site répond directement dans votre navigateur : les messages que
            vous y tapez ne sont pas transmis à nos serveurs.
          </p>
        ),
      },
      {
        title: 'Mesure d’audience et cookies',
        body: (
          <>
            <p>
              Nous mesurons la fréquentation du site et l’efficacité de nos campagnes avec PostHog,
              hébergé dans l’Union européenne (Francfort). Sont mesurés : les pages vues, les clics
              sur les appels à l’action, les étapes des formulaires et l’ouverture de l’assistant de
              chat — jamais le contenu de vos messages ni ce que vous saisissez dans les champs.
            </p>
            <p className="mt-3">
              Tant que vous n’avez pas répondu au bandeau, la mesure reste anonyme et n’enregistre
              rien sur votre appareil. Si vous acceptez, PostHog dépose un cookie (6 mois) et nous
              conservons la source de votre première visite (campagne, QR code ou site d’origine,
              cookie ix0_ft, 90 jours) ; elle est jointe à votre demande si vous remplissez un
              formulaire. Si vous refusez, rien n’est envoyé. Vous pouvez changer d’avis à tout
              moment via « Gérer les cookies », en bas de chaque page.
            </p>
            <p className="mt-3">
              Deux cookies techniques, sans consentement : la langue choisie (NEXT_LOCALE) et votre
              choix de consentement (ix0_consent, 6 mois). Aucun cookie de publicité.
            </p>
          </>
        ),
      },
      {
        title: 'Vos droits',
        body: (
          <p>
            Vous pouvez à tout moment demander l’accès à vos données, leur rectification ou leur
            suppression, ou retirer votre consentement, en écrivant à <Mail />.
          </p>
        ),
      },
    ],
  },
  en: {
    eyebrow: 'Legal',
    title: 'Privacy policy',
    lead: 'This page explains what data the Industry X.0 website collects, why, and how to exercise your rights.',
    sections: [
      {
        title: 'Data controller',
        body: (
          <p>
            Industry X.0, Cité les pins, Tunis 1053, Tunisia. For any question about your data:{' '}
            <Mail />.
          </p>
        ),
      },
      {
        title: 'Data collected through the contact form',
        body: (
          <>
            <p>
              When you write to us from the <ContactLink label="Contact" /> page, we record:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>your first name, last name, email address and company;</li>
              <li>your phone number and its country, if provided (optional);</li>
              <li>your industry and your message;</li>
              <li>your consent, the date and the page the request came from.</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Purpose and legal basis',
        body: (
          <p>
            This data is used only to answer your request — a demo, a question or a conversation
            with our team. It is processed on the basis of your consent, given by ticking the box
            provided in the form.
          </p>
        ),
      },
      {
        title: 'Storage and access',
        body: (
          <p>
            Requests are stored on Industry X.0’s server. Only our team has access to them. They are
            never sold, rented or transferred to third parties.
          </p>
        ),
      },
      {
        title: 'Chat assistant',
        body: (
          <p>
            The website’s chat assistant answers directly in your browser: the messages you type are
            not sent to our servers.
          </p>
        ),
      },
      {
        title: 'Audience measurement and cookies',
        body: (
          <>
            <p>
              We measure site traffic and campaign performance with PostHog, hosted in the European
              Union (Frankfurt). We measure page views, clicks on calls to action, form steps and
              opening the chat assistant — never the content of your messages or what you type into
              form fields.
            </p>
            <p className="mt-3">
              Until you answer the banner, measurement stays anonymous and stores nothing on your
              device. If you accept, PostHog sets a cookie (6 months) and we keep the source of your
              first visit (campaign, QR code or referring site, cookie ix0_ft, 90 days); it is
              attached to your request if you fill in a form. If you decline, nothing is sent. You
              can change your mind at any time through “Cookie settings” at the bottom of every
              page.
            </p>
            <p className="mt-3">
              Two technical cookies, set without consent: your chosen language (NEXT_LOCALE) and
              your consent choice (ix0_consent, 6 months). No advertising cookies.
            </p>
          </>
        ),
      },
      {
        title: 'Your rights',
        body: (
          <p>
            You can ask at any time to access, correct or delete your data, or withdraw your
            consent, by writing to <Mail />.
          </p>
        ),
      },
    ],
  },
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const t = useCopy(COPY)
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream font-body text-dark selection:bg-gold/30">
      <section className="pb-16 pt-[calc(82px+3rem)] md:pb-20 md:pt-[calc(82px+4rem)]">
        <div className="mx-auto max-w-3xl px-5 sm:px-7">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-ink">{t.eyebrow}</p>
          <h1 className="mt-3 font-display text-[32px] font-black leading-tight tracking-[-0.04em] text-dark sm:text-[42px]">
            {t.title}
          </h1>
          <p className="mt-4 leading-relaxed text-stone-600">{t.lead}</p>

          <div className="mt-10 space-y-8">
            {t.sections.map((section) => (
              <section key={section.title} className="border-t border-cream-border pt-6">
                <h2 className="text-[18px] font-bold tracking-[-0.01em] text-dark">{section.title}</h2>
                <div className="mt-3 text-[15px] leading-[1.75] text-stone-600">{section.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
