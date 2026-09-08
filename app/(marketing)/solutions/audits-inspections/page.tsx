import CapabilityList from '@/components/sections/CapabilityList'
import CardGrid from '@/components/sections/CardGrid'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { auditsInspections as audits } from '@/content/audits-inspections'

/**
 * Audits & inspections — cinquieme page de la rubrique Solutions.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Deux choses manquent ici par rapport aux autres pages, et c'est assume :
 *
 *  - pas de capture produit. Ce que la page a de plus convaincant a montrer
 *    serait un rapport genere ; une maquette de rapport plausible et inventee
 *    serait exactement le genre de piece qu'on retrouve ensuite dans une
 *    presentation client. La grille des types tient donc la place du visuel,
 *    c'est le bloc le plus graphique de la page.
 *  - pas de bloc integrations ou conformite. Apres les capacites, la question
 *    qui reste est de savoir si son propre type d'audit est couvert, et pas
 *    autre chose. Un bloc de plus aurait surtout prouve que le gabarit tourne
 *    a vide.
 */
export const metadata = buildMetadata(audits.seo)

export default function AuditsInspectionsPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(audits.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...audits.hero} nested />
        <PainPoints {...audits.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...audits.solution} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : les types d'audits couverts, puis les benefices. */}
      <SectionStack background="cream" labelledBy="types-title" gap="tight">
        <CardGrid
          {...audits.types}
          background="cream"
          nested
          id="types-title"
        />
        <OutcomeMetrics {...audits.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions. */}
      <SectionStack background="white" labelledBy="related-title">
        <RelatedPages
          {...audits.related}
          background="white"
          nested
          headingId="related-title"
        />
        <FaqAccordion {...audits.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
