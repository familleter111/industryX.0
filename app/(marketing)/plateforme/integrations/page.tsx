import CapabilityList from '@/components/sections/CapabilityList'
import CapabilityShowcase from '@/components/sections/CapabilityShowcase'
import ContactCallout from '@/components/sections/ContactCallout'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import RelatedPages from '@/components/sections/RelatedPages'
import ProofBlock from '@/components/sections/ProofBlock'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { integrations } from '@/content/integrations'

/**
 * Integrations industrielles — derniere sous-page de la rubrique Plateforme.
 *
 * Quatre sections majeures, comme les onze autres pages : ouverture · reponse
 * · chiffres · questions. Voir `SectionStack` pour le regroupement.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LA SEULE PAGE ILLUSTREE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Elle rend ses trois premieres sections avec les variantes `*Showcase` :
 * hero en deux colonnes avec capture, constats en cartes a cote d'une
 * illustration, bandeau sombre pour les chiffres. Les onze autres pages
 * gardent les variantes en pleine largeur.
 *
 * C'etait la page qui en avait le plus besoin. Elle n'a pas de capture
 * produit — une page de plomberie n'a rien a montrer qu'un ecran rendrait plus
 * clair — et sa troisieme section se reduisait donc a une carte de chiffres
 * sur fond creme. Le bandeau sombre lui rend le poids visuel que les autres
 * pages tirent de leur maquette.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  DEUX BLOCS DE CAPACITES DANS LA SECTION « REPONSE »
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Les familles de systemes, puis les interfaces. C'est la seule page ou
 * l'ordre importe a ce point : on repond d'abord a « est-ce que ca parle a mon
 * ERP ? », qui est la question du directeur d'usine, avant « par quel
 * protocole ? », qui est celle de sa DSI.
 *
 * Les six familles passent en `CapabilityShowcase` — six cartes en pleine
 * largeur formeraient un pave que l'oeil traverse sans s'arreter. Les trois
 * interfaces restent en `CapabilityList` : elles portent chacune trois points
 * de detail, que la largeur d'une carte ne tient pas.
 */
export const metadata = buildMetadata(integrations.seo)

export default function IntegrationsPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(integrations.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...integrations.hero} nested />
        <ProblemShowcase
          {...integrations.problem}
          image={integrations.images.problem}
          background="cream"
          nested
        />
      </SectionStack>

      {/* 2 — Reponse : les familles de systemes, puis les interfaces. Le
          second `id` evite deux <h2> homonymes. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityShowcase
          {...integrations.solution}
          background="white"
          nested
        />
        <CapabilityList
          {...integrations.interfaces}
          background="white"
          nested
          id="interfaces-title"
        />
      </SectionStack>

      {/* 3 — Le bandeau sombre. Il ouvre sa propre section : imbrique dans un
          `SectionStack` clair, il perdrait son fond et son texte blanc. */}
      <MetricsShowcase
        {...integrations.outcomes}
        image={integrations.images.outcomes}
      />

      {/* 4 — Questions : le cadre, la relance, les renvois, la FAQ. */}
      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...integrations.proof} background="white" nested />
        <ContactCallout {...integrations.callout} background="white" nested />
        <RelatedPages
          {...integrations.related}
          background="white"
          nested
          headingId="solutions-title"
        />
        <FaqAccordion {...integrations.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
