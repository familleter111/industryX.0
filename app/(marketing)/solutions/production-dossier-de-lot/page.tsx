import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LifecycleTimeline from '@/components/sections/LifecycleTimeline'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import ProofBlock from '@/components/sections/ProofBlock'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { productionDossierDeLot as production } from '@/content/production-dossier-de-lot'

/**
 * Production & dossier de lot — deuxieme page de la rubrique Solutions.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Le visuel de cette page est la frise du lot : les cinq mecanismes decrits
 * au-dessus n'ont de sens qu'une fois replaces dans son deroule. C'est aussi la
 * seule frise du site qui porte, sur chaque etape, ce que la plateforme y fait
 * — un lecteur qui reconnait son propre process a besoin qu'on lui montre ou
 * l'outil se branche, pas qu'on lui reexplique son metier.
 *
 * Le bloc des secteurs ouvre la derniere section, apres les benefices : il
 * repond a « est-ce que ca vaut pour moi », question qui se pose une fois la
 * promesse comprise.
 */
export const metadata = buildMetadata(production.seo)

export default function ProductionDossierDeLotPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(production.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...production.hero} nested />
        <PainPoints {...production.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...production.solution} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : la frise du lot, puis ce qu'elle fait gagner. */}
      <SectionStack background="cream" labelledBy="lifecycle-title" gap="tight">
        <LifecycleTimeline
          {...production.lifecycle}
          background="cream"
          nested
        />
        <OutcomeMetrics {...production.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions : les secteurs, le cadre, les renvois, la FAQ. */}
      <SectionStack background="white" labelledBy="sectors-title">
        <CapabilityList
          {...production.sectors}
          background="white"
          nested
          id="sectors-title"
        />
        <ProofBlock {...production.proof} background="white" nested />
        <RelatedPages
          {...production.related}
          background="white"
          nested
          headingId="related-title"
        />
        <FaqAccordion {...production.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
