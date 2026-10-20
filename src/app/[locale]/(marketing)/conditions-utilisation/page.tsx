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
  type LegalSection,
} from '@/features/legal/LegalDocument'
import { chatAiEnabled } from '@/lib/chat/config'
import { pageMetadata, type Locale } from '@/lib/i18n'

/**
 * Conditions générales d'utilisation du site vitrine.
 *
 * Le site n'a ni compte utilisateur ni paiement : ces conditions encadrent la
 * consultation, les formulaires, l'assistant de chat et les contenus. L'usage
 * des produits (CIPA, Enti Win) relève des contrats signés avec les clients,
 * pas de cette page.
 *
 * À faire relire par un juriste avant publication, en particulier les
 * sections 11 (responsabilité) et 14 (droit applicable). La version anglaise
 * est une traduction : en cas de divergence, la version française fait foi.
 */

const UPDATED = { fr: '19 octobre 2026', en: 'October 19, 2026' }

const META = {
  fr: {
    title: 'Conditions générales d’utilisation — Industry X.0',
    description:
      'Les règles d’utilisation du site Industry X.0 : accès, formulaires, propriété intellectuelle, responsabilité et droit applicable.',
  },
  en: {
    title: 'Terms of use — Industry X.0',
    description:
      'The rules for using the Industry X.0 website: access, forms, intellectual property, liability and governing law.',
  },
}

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Metadata {
  return pageMetadata({ locale, path: '/conditions-utilisation', ...META[locale] })
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="font-medium text-gold-ink hover:underline">
    {children}
  </Link>
)

/* ================================================================ FR */

const INTRO_FR = (
  <>
    <h2 className="font-display text-[19px] font-black uppercase tracking-[0.02em] text-dark">
      Accord avec nos conditions légales
    </h2>
    <p className="mt-3">
      Le site <strong>industryx0.pro</strong> (le « <strong>Site</strong> ») est édité par{' '}
      <strong>Industry X.0</strong> (« <strong>nous</strong> »), qui conçoit et déploie la
      plateforme industrielle CIPA et ses solutions associées.
    </p>
    <p className="mt-3">
      Les présentes conditions générales d’utilisation (les « <strong>Conditions</strong> »)
      constituent un accord entre vous, en tant que visiteur, que vous agissiez à titre personnel ou
      pour le compte d’une entreprise (« <strong>vous</strong> »), et Industry X.0, concernant
      votre accès au Site et son utilisation.
    </p>
    <div className="mt-4">
      <Callout tone="gold">
        En naviguant sur le Site, vous reconnaissez avoir lu, compris et accepté ces Conditions.{' '}
        <strong>Si vous ne les acceptez pas, vous devez cesser d’utiliser le Site.</strong>
      </Callout>
    </div>
  </>
)

function sectionsFr(): LegalSection[] {
  const l = 'fr'
  return [
    {
      id: 'objet',
      title: 'Objet',
      body: (
        <p>
          Ces Conditions fixent les règles d’accès et d’utilisation du Site, qui présente Industry
          X.0, la plateforme CIPA, ses usages par secteur, nos guides et nos moyens de contact.
        </p>
      ),
    },
    {
      id: 'editeur',
      title: 'Éditeur du site',
      body: (
        <Items
          locale={l}
          items={[
            ['Éditeur', 'Industry X.0'],
            ['Siège', 'Cité les pins, Tunis 1053, Tunisie'],
            ['E-mail', <MailLink key="m" />],
            ['Téléphone', LEGAL_PHONE],
          ]}
        />
      ),
    },
    {
      id: 'acces',
      title: 'Accès au site',
      body: (
        <>
          <p>
            Le Site est accessible gratuitement, sans création de compte. Les frais de connexion
            (matériel, accès à Internet) restent à votre charge.
          </p>
          <p>
            Nous nous efforçons de garder le Site disponible, sans pouvoir le garantir : il peut être
            interrompu pour maintenance, mise à jour ou en cas d’incident, sans préavis ni
            indemnité.
          </p>
        </>
      ),
    },
    {
      id: 'services',
      title: 'Solutions présentées',
      body: (
        <>
          <p>
            Les descriptions de CIPA, d’Enti Win et de nos accompagnements sont fournies à titre
            d’information. Elles ne constituent pas une offre contractuelle.
          </p>
          <Callout tone="info">
            L’utilisation de nos solutions fait l’objet d’un contrat distinct, signé avec chaque
            client. En cas de contradiction, ce contrat prévaut sur les présentes Conditions.
          </Callout>
          <p>
            Les résultats et chiffres cités (cas clients, indicateurs d’impact) illustrent des
            situations réelles ou typiques ; ils ne garantissent pas un résultat identique dans votre
            contexte.
          </p>
        </>
      ),
    },
    {
      id: 'formulaires',
      title: 'Formulaires et demandes',
      body: (
        <>
          <p>
            Le Site propose un formulaire de demande de démonstration et une inscription aux guides
            &amp; insights. En les utilisant, vous vous engagez à :
          </p>
          <Items
            locale={l}
            items={[
              'fournir des informations exactes, à jour et vous concernant ;',
              'ne pas usurper l’identité d’une autre personne ou d’une autre entreprise ;',
              'ne pas envoyer de demandes automatisées, répétées ou sans lien avec nos activités.',
            ]}
          />
          <p>
            Les champs sont contrôlés à la saisie et un dispositif anti-spam limite le nombre
            d’envois. Nous pouvons ignorer toute demande manifestement fausse ou abusive.
          </p>
        </>
      ),
    },
    {
      id: 'interdictions',
      title: 'Utilisations interdites',
      body: (
        <>
          <p>Il est interdit, notamment :</p>
          <Items
            locale={l}
            items={[
              'de tenter d’accéder sans autorisation au Site, à ses serveurs ou aux outils qui y sont reliés ;',
              'd’en perturber le fonctionnement (surcharge, code malveillant, contournement des protections) ;',
              'd’extraire de façon automatisée ses contenus (robots, aspiration, scraping) ;',
              'd’utiliser le Site à des fins illicites, frauduleuses ou contraires à ces Conditions ;',
              'de reproduire ou de détourner le Site pour faire croire à un lien avec Industry X.0.',
            ]}
          />
          <p>Tout manquement peut entraîner le blocage de votre accès, sans préjudice de poursuites.</p>
        </>
      ),
    },
    {
      id: 'propriete',
      title: 'Propriété intellectuelle',
      body: (
        <>
          <p>
            Le Site et ses contenus (textes, visuels, captures d’écran, vidéos, graphismes, code,
            mise en page) sont la propriété d’Industry X.0 ou de ses partenaires et sont protégés
            par le droit de la propriété intellectuelle.
          </p>
          <p>
            Les noms et logos <strong>Industry X.0</strong>, <strong>CIPA</strong> et{' '}
            <strong>Enti Win</strong> sont nos marques. Les logos de nos clients et partenaires
            appartiennent à leurs titulaires respectifs.
          </p>
          <p>
            Vous pouvez consulter le Site et partager ses pages par un lien. Toute autre
            reproduction, modification ou diffusion, totale ou partielle, nécessite notre accord
            écrit préalable.
          </p>
        </>
      ),
    },
    {
      id: 'contenus',
      title: 'Guides et contenus éditoriaux',
      body: (
        <p>
          Nos guides, analyses et articles sont fournis à titre d’information générale. Ils ne
          constituent ni un conseil réglementaire, ni un conseil juridique adapté à votre
          situation. Avant toute décision, notamment en matière de conformité (BPF, ISO…), faites
          valider votre démarche par les personnes compétentes.
        </p>
      ),
    },
    {
      id: 'chat',
      title: 'Assistant de chat',
      body: (
        <p>
          L’assistant de chat donne des réponses automatiques et générales sur nos solutions
          {chatAiEnabled()
            ? ', générées par intelligence artificielle : elles peuvent être incomplètes ou inexactes.'
            : '. Il fonctionne dans votre navigateur et ne transmet pas vos messages.'}{' '}
          Ses réponses ne nous engagent pas : pour une réponse précise, utilisez le{' '}
          <A href="/contact">formulaire de contact</A>.
        </p>
      ),
    },
    {
      id: 'liens',
      title: 'Liens externes',
      body: (
        <p>
          Le Site contient des liens vers d’autres sites, notamment l’application Enti Win et nos
          réseaux sociaux. Ces sites ont leurs propres conditions et politiques ; nous ne sommes
          pas responsables de leur contenu ni de leur fonctionnement.
        </p>
      ),
    },
    {
      id: 'responsabilite',
      title: 'Responsabilité',
      body: (
        <>
          <p>
            Nous veillons à l’exactitude des informations publiées, sans pouvoir garantir qu’elles
            soient complètes, exemptes d’erreur ou à jour à tout moment.
          </p>
          <p>Dans les limites autorisées par la loi, Industry X.0 ne peut être tenue responsable :</p>
          <Items
            locale={l}
            items={[
              'd’une interruption ou d’une indisponibilité du Site ;',
              'de dommages liés à l’utilisation des informations du Site ou à l’impossibilité d’y accéder ;',
              'd’un virus ou d’une intrusion malgré les mesures de sécurité mises en place ;',
              'du contenu des sites externes vers lesquels le Site renvoie.',
            ]}
          />
        </>
      ),
    },
    {
      id: 'donnees',
      title: 'Données personnelles et cookies',
      body: (
        <p>
          Le traitement de vos données personnelles et l’usage des cookies sont décrits dans notre{' '}
          <A href="/privacy">politique de confidentialité</A>. Vous pouvez modifier vos choix de
          cookies à tout moment via « Gérer les cookies », en bas de chaque page.
        </p>
      ),
    },
    {
      id: 'modifications',
      title: 'Modification des conditions',
      body: (
        <p>
          Nous pouvons modifier ces Conditions à tout moment, notamment pour suivre l’évolution du
          Site ou de la réglementation. La version applicable est celle en ligne lors de votre
          visite ; sa date figure en haut de la page.
        </p>
      ),
    },
    {
      id: 'droit',
      title: 'Droit applicable et litiges',
      body: (
        <>
          <p>Ces Conditions sont régies par le droit tunisien.</p>
          <p>
            En cas de différend, nous vous invitons à nous contacter d’abord pour rechercher une
            solution amiable. À défaut, le litige sera porté devant les tribunaux compétents de
            Tunis.
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      title: 'Nous contacter',
      body: (
        <>
          <p>Pour toute question sur ces Conditions :</p>
          <ContactCard
            locale={l}
            rows={[
              ['E-mail', <MailLink key="m" />],
              ['Téléphone', LEGAL_PHONE],
              ['Site', LEGAL_SITE.replace('https://', '')],
              ['Adresse', 'Cité les pins, Tunis 1053, Tunisie'],
            ]}
          />
        </>
      ),
    },
  ]
}

/* ================================================================ EN */

const INTRO_EN = (
  <>
    <h2 className="font-display text-[19px] font-black uppercase tracking-[0.02em] text-dark">
      Agreement to our legal terms
    </h2>
    <p className="mt-3">
      The website <strong>industryx0.pro</strong> (the “<strong>Website</strong>”) is published by{' '}
      <strong>Industry X.0</strong> (“<strong>we</strong>”), which designs and deploys the CIPA
      industrial platform and its related solutions.
    </p>
    <p className="mt-3">
      These terms of use (the “<strong>Terms</strong>”) form an agreement between you, as a visitor,
      whether acting personally or on behalf of a company (“<strong>you</strong>”), and Industry
      X.0, regarding your access to and use of the Website.
    </p>
    <div className="mt-4">
      <Callout tone="gold">
        By browsing the Website, you acknowledge that you have read, understood and accepted these
        Terms. <strong>If you do not accept them, you must stop using the Website.</strong>
      </Callout>
    </div>
  </>
)

function sectionsEn(): LegalSection[] {
  const l = 'en'
  return [
    {
      id: 'objet',
      title: 'Purpose',
      body: (
        <p>
          These Terms set the rules for accessing and using the Website, which presents Industry X.0,
          the CIPA platform, its use cases by industry, our guides and the ways to contact us.
        </p>
      ),
    },
    {
      id: 'editeur',
      title: 'Website publisher',
      body: (
        <Items
          locale={l}
          items={[
            ['Publisher', 'Industry X.0'],
            ['Head office', 'Cité les pins, Tunis 1053, Tunisia'],
            ['Email', <MailLink key="m" />],
            ['Phone', LEGAL_PHONE],
          ]}
        />
      ),
    },
    {
      id: 'acces',
      title: 'Access to the website',
      body: (
        <>
          <p>
            The Website is free to access, with no account required. Connection costs (equipment,
            Internet access) remain your responsibility.
          </p>
          <p>
            We strive to keep the Website available but cannot guarantee it: it may be interrupted
            for maintenance, updates or in the event of an incident, without notice or compensation.
          </p>
        </>
      ),
    },
    {
      id: 'services',
      title: 'Solutions presented',
      body: (
        <>
          <p>
            Descriptions of CIPA, Enti Win and our services are provided for information. They do not
            constitute a contractual offer.
          </p>
          <Callout tone="info">
            Use of our solutions is governed by a separate contract signed with each customer. In the
            event of a conflict, that contract prevails over these Terms.
          </Callout>
          <p>
            The results and figures quoted (customer stories, impact indicators) illustrate real or
            typical situations; they do not guarantee an identical result in your context.
          </p>
        </>
      ),
    },
    {
      id: 'formulaires',
      title: 'Forms and requests',
      body: (
        <>
          <p>The Website offers a demo request form and a guides &amp; insights subscription. By using them, you agree to:</p>
          <Items
            locale={l}
            items={[
              'provide accurate, up-to-date information about yourself;',
              'not impersonate another person or company;',
              'not send automated, repeated or unrelated requests.',
            ]}
          />
          <p>
            Fields are checked as you type and an anti-spam system limits the number of submissions.
            We may ignore any request that is clearly false or abusive.
          </p>
        </>
      ),
    },
    {
      id: 'interdictions',
      title: 'Prohibited uses',
      body: (
        <>
          <p>It is prohibited, in particular, to:</p>
          <Items
            locale={l}
            items={[
              'attempt unauthorized access to the Website, its servers or the tools connected to it;',
              'disrupt its operation (overload, malicious code, bypassing protections);',
              'extract its content automatically (bots, scraping);',
              'use the Website for unlawful or fraudulent purposes, or contrary to these Terms;',
              'copy or misuse the Website to suggest a connection with Industry X.0.',
            ]}
          />
          <p>Any breach may lead to your access being blocked, without prejudice to legal action.</p>
        </>
      ),
    },
    {
      id: 'propriete',
      title: 'Intellectual property',
      body: (
        <>
          <p>
            The Website and its content (text, visuals, screenshots, videos, graphics, code, layout)
            belong to Industry X.0 or its partners and are protected by intellectual property law.
          </p>
          <p>
            The names and logos <strong>Industry X.0</strong>, <strong>CIPA</strong> and{' '}
            <strong>Enti Win</strong> are our trademarks. The logos of our customers and partners
            belong to their respective owners.
          </p>
          <p>
            You may browse the Website and share its pages by link. Any other reproduction,
            modification or distribution, in whole or in part, requires our prior written consent.
          </p>
        </>
      ),
    },
    {
      id: 'contenus',
      title: 'Guides and editorial content',
      body: (
        <p>
          Our guides, analyses and articles are provided for general information. They are not
          regulatory or legal advice tailored to your situation. Before any decision, especially on
          compliance (GMP, ISO…), have your approach validated by qualified people.
        </p>
      ),
    },
    {
      id: 'chat',
      title: 'Chat assistant',
      body: (
        <p>
          The chat assistant gives automatic, general answers about our solutions
          {chatAiEnabled()
            ? ', generated by artificial intelligence: they may be incomplete or inaccurate.'
            : '. It runs in your browser and does not send your messages.'}{' '}
          Its answers are not binding on us: for a precise answer, use the{' '}
          <A href="/contact">contact form</A>.
        </p>
      ),
    },
    {
      id: 'liens',
      title: 'External links',
      body: (
        <p>
          The Website contains links to other websites, including the Enti Win application and our
          social networks. These websites have their own terms and policies; we are not responsible
          for their content or operation.
        </p>
      ),
    },
    {
      id: 'responsabilite',
      title: 'Liability',
      body: (
        <>
          <p>
            We take care to keep published information accurate, but cannot guarantee that it is
            complete, error-free or up to date at all times.
          </p>
          <p>To the extent permitted by law, Industry X.0 cannot be held liable for:</p>
          <Items
            locale={l}
            items={[
              'an interruption or unavailability of the Website;',
              'damage resulting from the use of information on the Website or the inability to access it;',
              'a virus or intrusion despite the security measures in place;',
              'the content of external websites linked from the Website.',
            ]}
          />
        </>
      ),
    },
    {
      id: 'donnees',
      title: 'Personal data and cookies',
      body: (
        <p>
          How we process your personal data and use cookies is described in our{' '}
          <A href="/privacy">privacy policy</A>. You can change your cookie choices at any time
          through “Cookie settings” at the bottom of every page.
        </p>
      ),
    },
    {
      id: 'modifications',
      title: 'Changes to these terms',
      body: (
        <p>
          We may change these Terms at any time, in particular to reflect changes to the Website or
          to regulations. The applicable version is the one online at the time of your visit; its
          date is shown at the top of the page.
        </p>
      ),
    },
    {
      id: 'droit',
      title: 'Governing law and disputes',
      body: (
        <>
          <p>These Terms are governed by Tunisian law.</p>
          <p>
            In the event of a dispute, please contact us first to seek an amicable solution. Failing
            that, the dispute will be brought before the competent courts of Tunis.
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: (
        <>
          <p>For any question about these Terms:</p>
          <ContactCard
            locale={l}
            rows={[
              ['Email', <MailLink key="m" />],
              ['Phone', LEGAL_PHONE],
              ['Website', LEGAL_SITE.replace('https://', '')],
              ['Address', 'Cité les pins, Tunis 1053, Tunisia'],
            ]}
          />
        </>
      ),
    },
  ]
}

export default function TermsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale)
  const en = locale === 'en'
  return (
    <LegalDocument
      title={en ? 'Terms of use' : 'Conditions générales d’utilisation'}
      updated={`${en ? 'Last updated:' : 'Dernière mise à jour :'} ${UPDATED[locale]}`}
      intro={en ? INTRO_EN : INTRO_FR}
      tocTitle={en ? 'Table of contents' : 'Table des matières'}
      sections={en ? sectionsEn() : sectionsFr()}
    />
  )
}
