import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

import LegalDocument, {
  Callout,
  ContactCard,
  Items,
  LEGAL_PHONE,
  LEGAL_SITE,
  MailLink,
  Sub,
  type LegalSection,
} from '@/features/legal/LegalDocument'
import { gaEnabled } from '@/lib/analytics/ga'
import { chatAiEnabled } from '@/lib/chat/config'
import { pageMetadata, type Locale } from '@/lib/i18n'

/**
 * Politique de confidentialité.
 *
 * Le texte ne décrit que ce que fait le code :
 *   - formulaire de contact : champs et livraison de lib/leads/ (tableur,
 *     CRM, webhook d'automatisation, email de secours Resend) ;
 *   - inscription aux guides : app/api/subscribe ;
 *   - chat : réponses générées dans le navigateur, rien n'est envoyé ;
 *   - mesure d'audience PostHog (lib/analytics/), soumise à consentement.
 * Toute évolution de ces traitements doit être reportée ici.
 *
 * À faire relire par un juriste avant publication, en particulier les durées
 * de conservation (section 6), proposées et non encore validées. La version
 * anglaise est une traduction : en cas de divergence, la version française
 * fait foi.
 */

const PRIVACY_UPDATED = { fr: '19 octobre 2026', en: 'October 19, 2026' }

const META = {
  fr: {
    title: 'Politique de confidentialité — Industry X.0',
    description:
      'Quelles données Industry X.0 collecte via son site, pourquoi, avec qui elles sont partagées, combien de temps elles sont conservées et comment exercer vos droits.',
  },
  en: {
    title: 'Privacy policy — Industry X.0',
    description:
      'What data Industry X.0 collects through its website, why, who it is shared with, how long it is kept and how to exercise your rights.',
  },
}

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Metadata {
  return pageMetadata({ locale, path: '/privacy', ...META[locale] })
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-medium text-gold-ink hover:underline">
    {children}
  </Link>
)

/* ================================================================ FR */

function sectionsFr(): LegalSection[] {
  const l = 'fr'
  return [
    {
      id: 'introduction',
      title: 'Introduction',
      body: (
        <>
          <p>
            Bienvenue sur le site d’Industry X.0 (<strong>industryx0.pro</strong>). Nous accordons
            une grande importance à la protection de vos données personnelles. Cette politique
            explique quelles données nous collectons lorsque vous visitez notre site ou nous
            contactez, pourquoi, avec qui elles sont partagées et comment exercer vos droits.
          </p>
          <Callout tone="info" title="Notre engagement">
            Nous ne collectons que les données utiles pour vous répondre et améliorer notre site.
            Nous ne les vendons jamais, et vous gardez la main sur la mesure d’audience.
          </Callout>
          <Sub>Responsable du traitement</Sub>
          <p>
            Le site est édité par <strong>Industry X.0</strong>.
          </p>
          <p>
            <strong>Siège :</strong> Cité les pins, Tunis 1053, Tunisie
          </p>
        </>
      ),
    },
    {
      id: 'collecte',
      title: 'Données collectées',
      body: (
        <>
          <p>Nous collectons uniquement les données que vous nous transmettez, et les données de navigation strictement nécessaires :</p>
          <Sub>Demande de démonstration (formulaire de contact)</Sub>
          <Items
            locale={l}
            items={[
              ['Identité', 'prénom, nom, adresse e-mail et société'],
              ['Téléphone', 'numéro et pays de l’indicatif, s’ils sont renseignés (facultatif)'],
              ['Votre demande', 'secteur d’activité et message'],
              ['Consentement', 'votre accord au traitement de vos données, avec sa date et son heure'],
              [
                'Contexte',
                'page d’envoi, langue du site et, si vous avez accepté la mesure d’audience, la source de votre visite (campagne, QR code ou site d’origine)',
              ],
            ]}
          />
          <Sub>Inscription aux guides &amp; insights</Sub>
          <Items
            locale={l}
            items={[
              ['Identité', 'adresse e-mail et, si renseignée, société'],
              ['Consentement', 'votre accord et la page d’inscription'],
            ]}
          />
          <Sub>Navigation sur le site</Sub>
          <p>
            Uniquement si vous l’acceptez : pages vues, clics sur les boutons d’action, étapes des
            formulaires (sans leur contenu) et ouverture de l’assistant de chat. Voir la section{' '}
            <a href="#cookies" className="font-medium text-gold-ink hover:underline">
              Cookies et mesure d’audience
            </a>
            .
          </p>
          <Callout tone="success">
            <strong>Note importante :</strong> le site ne comporte ni espace client ni paiement.
            Nous ne vous demandons aucun mot de passe et ne collectons aucune donnée bancaire.
          </Callout>
        </>
      ),
    },
    {
      id: 'utilisation',
      title: 'Utilisation des données',
      body: (
        <>
          <p>Vos données servent uniquement à :</p>
          <Items
            locale={l}
            items={[
              'répondre à votre demande de démonstration, de devis ou d’information ;',
              'organiser les échanges avec notre équipe (rendez-vous, démonstration, cadrage) ;',
              'vous envoyer les guides et analyses auxquels vous vous êtes inscrit ;',
              'mesurer la fréquentation du site et l’efficacité de nos campagnes, si vous l’acceptez ;',
              'protéger le site contre le spam et les envois automatisés abusifs.',
            ]}
          />
          <p>
            <strong>Base légale :</strong> votre consentement, donné en cochant la case prévue dans
            chaque formulaire et en répondant au bandeau de cookies. Vous pouvez le retirer à tout
            moment.
          </p>
        </>
      ),
    },
    {
      id: 'partage',
      title: 'Partage des données',
      body: (
        <>
          <Callout tone="danger">
            <strong>Nous ne vendons, n’échangeons ni ne louons jamais vos données personnelles.</strong>
          </Callout>
          <p>
            Vos données ne sont transmises qu’aux prestataires qui nous aident à vous répondre, et
            seulement pour cet usage :
          </p>
          <Items
            locale={l}
            items={[
              ['Hébergement', 'le serveur qui fait fonctionner le site et enregistre les demandes'],
              [
                'Gestion de la relation client',
                'notre outil de suivi commercial (CRM), où votre demande est enregistrée pour être traitée par notre équipe',
              ],
              [
                'Outils d’automatisation',
                'qui transmettent votre demande à notre équipe (notification, tableau de suivi)',
              ],
              [
                'Envoi d’e-mails',
                'un service d’envoi utilisé pour alerter notre équipe si une transmission échoue',
              ],
              ['Mesure d’audience', 'PostHog, hébergé dans l’Union européenne, si vous l’acceptez'],
              ...(gaEnabled
                ? [['Mesure d’audience', 'Google Analytics (Google, États-Unis), si vous l’acceptez'] as [string, string]]
                : []),
              ...(chatAiEnabled()
                ? [['Assistant de chat', 'Microsoft (service Azure OpenAI), qui génère les réponses de l’assistant à partir de vos messages'] as [string, string]]
                : []),
              ['Obligations légales', 'sur demande d’une autorité ou d’une décision de justice'],
            ]}
          />
          <p>
            Certains de ces prestataires peuvent être situés hors de Tunisie. Ils n’utilisent vos
            données que pour notre compte.
          </p>
        </>
      ),
    },
    {
      id: 'securite',
      title: 'Sécurité des données',
      body: (
        <>
          <p>Nous mettons en œuvre des mesures adaptées pour protéger vos données :</p>
          <Sub>Mesures techniques</Sub>
          <Items
            locale={l}
            items={[
              ['Chiffrement en transit', 'les échanges avec le site passent par une connexion sécurisée (HTTPS)'],
              ['Clés d’accès protégées', 'les accès à nos outils restent sur le serveur, jamais dans votre navigateur'],
              ['Transmissions signées', 'chaque demande envoyée à nos outils d’automatisation est signée, pour en garantir l’origine'],
              ['Journaux discrets', 'les journaux techniques masquent votre adresse e-mail et votre numéro de téléphone'],
              ['Protection anti-abus', 'contrôle des saisies, filtre anti-robots et limitation du nombre d’envois'],
            ]}
          />
          <Sub>Mesures organisationnelles</Sub>
          <Items
            locale={l}
            items={[
              ['Accès restreint', 'seuls les membres de notre équipe qui traitent les demandes y ont accès'],
              ['Minimisation', 'nous ne demandons que les informations utiles à votre demande'],
            ]}
          />
        </>
      ),
    },
    {
      id: 'conservation',
      title: 'Conservation des données',
      body: (
        <>
          <p>Nous conservons vos données le temps nécessaire à leur finalité :</p>
          <Items
            locale={l}
            items={[
              ['Demandes de contact', '3 ans à compter de notre dernier échange, puis suppression'],
              ['Inscription aux guides', 'jusqu’à votre désinscription'],
              ['Cookie de mesure d’audience', '6 mois'],
              ['Source de votre première visite', '90 jours'],
              ['Choix de consentement', '6 mois, puis le bandeau vous est de nouveau proposé'],
            ]}
          />
          <p>Si vous devenez client, vos données sont ensuite conservées selon les termes de notre contrat.</p>
        </>
      ),
    },
    {
      id: 'droits',
      title: 'Vos droits',
      body: (
        <>
          <p>
            Conformément à la loi organique tunisienne n° 2004-63 du 27 juillet 2004 relative à la
            protection des données à caractère personnel et, pour les personnes situées dans
            l’Union européenne, au Règlement général sur la protection des données (RGPD), vous
            disposez des droits suivants :
          </p>
          <Items
            locale={l}
            items={[
              ['Accès', 'obtenir les données que nous détenons à votre sujet'],
              ['Rectification', 'faire corriger des données inexactes ou incomplètes'],
              ['Suppression', 'demander l’effacement de vos données'],
              ['Opposition', 'vous opposer à un traitement'],
              ['Limitation', 'demander la suspension d’un traitement'],
              ['Portabilité', 'recevoir vos données dans un format lisible'],
              ['Retrait du consentement', 'à tout moment, sans remettre en cause ce qui a été fait avant'],
            ]}
          />
          <p>
            Pour exercer ces droits, écrivez-nous à <MailLink />. Vous pouvez aussi adresser une
            réclamation à l’Instance nationale de protection des données personnelles (INPDP) ou,
            dans l’Union européenne, à l’autorité de votre pays (en France, la CNIL).
          </p>
        </>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies et mesure d’audience',
      body: (
        <>
          <p>
            Nous mesurons la fréquentation du site avec PostHog, hébergé dans l’Union européenne
            (Francfort). Tant que vous n’avez pas répondu au bandeau, la mesure reste anonyme et
            rien n’est enregistré sur votre appareil.
            {gaEnabled &&
              ' Si vous l’acceptez, nous utilisons aussi Google Analytics (Google, États-Unis) ; il n’est chargé qu’après votre accord.'}
          </p>
          <Sub>Cookies déposés avec votre accord</Sub>
          <Items
            locale={l}
            items={[
              ['Mesure d’audience', 'cookie PostHog, 6 mois'],
              ...(gaEnabled
                ? [['Statistiques de fréquentation', 'cookies Google Analytics _ga et _ga_*, 6 mois'] as [string, string]]
                : []),
              ['Source de la visite', 'cookie ix0_ft : campagne, QR code ou site d’origine de votre première visite, 90 jours'],
            ]}
          />
          <Sub>Cookies techniques, sans consentement</Sub>
          <Items
            locale={l}
            items={[
              ['Langue', 'cookie NEXT_LOCALE : la langue choisie'],
              ['Consentement', 'cookie ix0_consent : votre réponse au bandeau, 6 mois'],
            ]}
          />
          <Callout tone="success">
            <strong>Aucun cookie publicitaire.</strong> Nous ne mesurons jamais le contenu de vos
            messages ni ce que vous saisissez dans les champs. Vous pouvez changer d’avis à tout
            moment via « Gérer les cookies », en bas de chaque page.
          </Callout>
        </>
      ),
    },
    {
      id: 'chat',
      title: 'Assistant de chat',
      body: (
        chatAiEnabled() ? (
          <>
            <p>
              L’assistant de chat répond grâce à un modèle d’intelligence artificielle fourni par
              Microsoft (service Azure OpenAI). Les messages que vous y tapez, avec l’historique de la conversation en
              cours, sont transmis à notre serveur puis à Microsoft, qui les traite pour notre
              compte afin de générer la réponse.
            </p>
            <p>
              Industry X.0 ne conserve pas ces conversations. N’y saisissez pas de données
              sensibles : pour être recontacté, utilisez le <A href="/contact">formulaire de contact</A>.
              Seule l’ouverture de l’assistant est mesurée, si vous avez accepté la mesure
              d’audience — jamais le contenu des messages.
            </p>
          </>
        ) : (
          <p>
            L’assistant de chat du site répond directement dans votre navigateur : les messages que
            vous y tapez ne sont pas transmis à nos serveurs. Seule l’ouverture de l’assistant est
            mesurée, si vous avez accepté la mesure d’audience.
          </p>
        )
      ),
    },
    {
      id: 'mises-a-jour',
      title: 'Mises à jour de cette politique',
      body: (
        <>
          <p>
            Nous pouvons modifier cette politique pour refléter l’évolution de nos pratiques ou de
            la réglementation. La date de mise à jour figure en haut de la page.
          </p>
          <p>
            L’utilisation du site est par ailleurs régie par nos{' '}
            <A href="/conditions-utilisation">conditions générales d’utilisation</A>.
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      title: 'Contactez-nous',
      body: (
        <>
          <p>Pour toute question sur cette politique ou sur vos données :</p>
          <ContactCard
            locale={l}
            rows={[
              ['E-mail', <MailLink key="m" />],
              ['Téléphone', LEGAL_PHONE],
              ['Site', LEGAL_SITE.replace('https://', '')],
              ['Adresse', 'Cité les pins, Tunis 1053, Tunisie'],
            ]}
          />
          <Callout tone="info">
            <strong>Engagement de réponse :</strong> nous répondons à toute demande concernant vos
            données dans un délai de 30 jours suivant sa réception.
          </Callout>
        </>
      ),
    },
  ]
}

/* ================================================================ EN */

function sectionsEn(): LegalSection[] {
  const l = 'en'
  return [
    {
      id: 'introduction',
      title: 'Introduction',
      body: (
        <>
          <p>
            Welcome to the Industry X.0 website (<strong>industryx0.pro</strong>). We take the
            protection of your personal data seriously. This policy explains what data we collect
            when you visit our website or contact us, why, who it is shared with and how to
            exercise your rights.
          </p>
          <Callout tone="info" title="Our commitment">
            We only collect the data we need to answer you and improve our website. We never sell
            it, and you stay in control of audience measurement.
          </Callout>
          <Sub>Data controller</Sub>
          <p>
            The website is published by <strong>Industry X.0</strong>.
          </p>
          <p>
            <strong>Head office:</strong> Cité les pins, Tunis 1053, Tunisia
          </p>
        </>
      ),
    },
    {
      id: 'collecte',
      title: 'Data we collect',
      body: (
        <>
          <p>We only collect the data you send us, and strictly necessary browsing data:</p>
          <Sub>Demo request (contact form)</Sub>
          <Items
            locale={l}
            items={[
              ['Identity', 'first name, last name, email address and company'],
              ['Phone', 'number and country code, if provided (optional)'],
              ['Your request', 'industry and message'],
              ['Consent', 'your agreement to the processing of your data, with its date and time'],
              [
                'Context',
                'page of submission, website language and, if you accepted audience measurement, the source of your visit (campaign, QR code or referring site)',
              ],
            ]}
          />
          <Sub>Guides &amp; insights subscription</Sub>
          <Items
            locale={l}
            items={[
              ['Identity', 'email address and, if provided, company'],
              ['Consent', 'your agreement and the subscription page'],
            ]}
          />
          <Sub>Browsing the website</Sub>
          <p>
            Only if you accept it: page views, clicks on call-to-action buttons, form steps
            (without their content) and opening the chat assistant. See{' '}
            <a href="#cookies" className="font-medium text-gold-ink hover:underline">
              Cookies and audience measurement
            </a>
            .
          </p>
          <Callout tone="success">
            <strong>Important:</strong> the website has no customer account and no payment. We never
            ask for a password and collect no banking data.
          </Callout>
        </>
      ),
    },
    {
      id: 'utilisation',
      title: 'How we use your data',
      body: (
        <>
          <p>Your data is used only to:</p>
          <Items
            locale={l}
            items={[
              'answer your request for a demo, a quote or information;',
              'organize exchanges with our team (meetings, demo, scoping);',
              'send you the guides and analyses you subscribed to;',
              'measure website traffic and campaign performance, if you accept it;',
              'protect the website against spam and abusive automated submissions.',
            ]}
          />
          <p>
            <strong>Legal basis:</strong> your consent, given by ticking the box in each form and by
            answering the cookie banner. You can withdraw it at any time.
          </p>
        </>
      ),
    },
    {
      id: 'partage',
      title: 'Sharing your data',
      body: (
        <>
          <Callout tone="danger">
            <strong>We never sell, trade or rent your personal data.</strong>
          </Callout>
          <p>Your data is only passed on to the service providers that help us answer you, and only for that purpose:</p>
          <Items
            locale={l}
            items={[
              ['Hosting', 'the server that runs the website and stores requests'],
              ['Customer relationship management', 'our sales tracking tool (CRM), where your request is recorded for our team'],
              ['Automation tools', 'that pass your request on to our team (notification, tracking sheet)'],
              ['Email delivery', 'a sending service used to alert our team if a transfer fails'],
              ['Audience measurement', 'PostHog, hosted in the European Union, if you accept it'],
              ...(gaEnabled
                ? [['Audience measurement', 'Google Analytics (Google, United States), if you accept it'] as [string, string]]
                : []),
              ...(chatAiEnabled()
                ? [['Chat assistant', 'Microsoft (Azure OpenAI Service), which generates the assistant’s answers from your messages'] as [string, string]]
                : []),
              ['Legal obligations', 'at the request of an authority or a court decision'],
            ]}
          />
          <p>Some of these providers may be located outside Tunisia. They only use your data on our behalf.</p>
        </>
      ),
    },
    {
      id: 'securite',
      title: 'Data security',
      body: (
        <>
          <p>We take appropriate measures to protect your data:</p>
          <Sub>Technical measures</Sub>
          <Items
            locale={l}
            items={[
              ['Encryption in transit', 'exchanges with the website use a secure connection (HTTPS)'],
              ['Protected access keys', 'access to our tools stays on the server, never in your browser'],
              ['Signed transfers', 'every request sent to our automation tools is signed to prove its origin'],
              ['Discreet logs', 'technical logs mask your email address and phone number'],
              ['Abuse protection', 'input checks, anti-bot filter and a limit on the number of submissions'],
            ]}
          />
          <Sub>Organizational measures</Sub>
          <Items
            locale={l}
            items={[
              ['Restricted access', 'only the team members who handle requests can access them'],
              ['Data minimization', 'we only ask for the information your request needs'],
            ]}
          />
        </>
      ),
    },
    {
      id: 'conservation',
      title: 'Data retention',
      body: (
        <>
          <p>We keep your data for as long as its purpose requires:</p>
          <Items
            locale={l}
            items={[
              ['Contact requests', '3 years from our last exchange, then deleted'],
              ['Guides subscription', 'until you unsubscribe'],
              ['Audience measurement cookie', '6 months'],
              ['Source of your first visit', '90 days'],
              ['Consent choice', '6 months, after which the banner is shown again'],
            ]}
          />
          <p>If you become a customer, your data is then kept under the terms of our contract.</p>
        </>
      ),
    },
    {
      id: 'droits',
      title: 'Your rights',
      body: (
        <>
          <p>
            Under Tunisian Organic Law No. 2004-63 of 27 July 2004 on the protection of personal
            data and, for people located in the European Union, the General Data Protection
            Regulation (GDPR), you have the following rights:
          </p>
          <Items
            locale={l}
            items={[
              ['Access', 'obtain the data we hold about you'],
              ['Rectification', 'have inaccurate or incomplete data corrected'],
              ['Erasure', 'ask for your data to be deleted'],
              ['Objection', 'object to a processing'],
              ['Restriction', 'ask for a processing to be suspended'],
              ['Portability', 'receive your data in a readable format'],
              ['Withdrawal of consent', 'at any time, without affecting what was done before'],
            ]}
          />
          <p>
            To exercise these rights, write to <MailLink />. You can also lodge a complaint with the
            Tunisian National Authority for the Protection of Personal Data (INPDP) or, in the
            European Union, with your country’s authority.
          </p>
        </>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies and audience measurement',
      body: (
        <>
          <p>
            We measure website traffic with PostHog, hosted in the European Union (Frankfurt). Until
            you answer the banner, measurement stays anonymous and nothing is stored on your device.
            {gaEnabled &&
              ' If you accept, we also use Google Analytics (Google, United States); it only loads after your consent.'}
          </p>
          <Sub>Cookies set with your consent</Sub>
          <Items
            locale={l}
            items={[
              ['Audience measurement', 'PostHog cookie, 6 months'],
              ...(gaEnabled
                ? [['Traffic statistics', 'Google Analytics _ga and _ga_* cookies, 6 months'] as [string, string]]
                : []),
              ['Visit source', 'ix0_ft cookie: campaign, QR code or referring site of your first visit, 90 days'],
            ]}
          />
          <Sub>Technical cookies, set without consent</Sub>
          <Items
            locale={l}
            items={[
              ['Language', 'NEXT_LOCALE cookie: your chosen language'],
              ['Consent', 'ix0_consent cookie: your answer to the banner, 6 months'],
            ]}
          />
          <Callout tone="success">
            <strong>No advertising cookies.</strong> We never measure the content of your messages
            or what you type into form fields. You can change your mind at any time through
            “Cookie settings” at the bottom of every page.
          </Callout>
        </>
      ),
    },
    {
      id: 'chat',
      title: 'Chat assistant',
      body: (
        chatAiEnabled() ? (
          <>
            <p>
              The chat assistant answers using an artificial intelligence model provided by
              Microsoft (Azure OpenAI Service). The messages you type, with the history of the current conversation, are
              sent to our server and then to Microsoft, which processes them on our behalf to
              generate the answer.
            </p>
            <p>
              Industry X.0 does not store these conversations. Do not enter sensitive data: to be
              contacted, use the <A href="/contact">contact form</A>. Only opening the assistant is
              measured, if you accepted audience measurement — never the content of messages.
            </p>
          </>
        ) : (
          <p>
            The website’s chat assistant answers directly in your browser: the messages you type are
            not sent to our servers. Only opening the assistant is measured, if you accepted audience
            measurement.
          </p>
        )
      ),
    },
    {
      id: 'mises-a-jour',
      title: 'Changes to this policy',
      body: (
        <>
          <p>
            We may update this policy to reflect changes in our practices or in regulations. The
            date of the latest update is shown at the top of the page.
          </p>
          <p>
            Use of the website is also governed by our <A href="/conditions-utilisation">terms of use</A>.
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: (
        <>
          <p>For any question about this policy or your data:</p>
          <ContactCard
            locale={l}
            rows={[
              ['Email', <MailLink key="m" />],
              ['Phone', LEGAL_PHONE],
              ['Website', LEGAL_SITE.replace('https://', '')],
              ['Address', 'Cité les pins, Tunis 1053, Tunisia'],
            ]}
          />
          <Callout tone="info">
            <strong>Response commitment:</strong> we answer any request about your data within 30
            days of receiving it.
          </Callout>
        </>
      ),
    },
  ]
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const en = locale === 'en'
  return (
    <LegalDocument
      title={en ? 'Privacy policy' : 'Politique de confidentialité'}
      updated={`${en ? 'Last updated:' : 'Dernière mise à jour :'} ${PRIVACY_UPDATED[locale]}`}
      sections={en ? sectionsEn() : sectionsFr()}
    />
  )
}
