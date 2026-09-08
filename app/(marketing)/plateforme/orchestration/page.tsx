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
import { orchestration } from '@/content/orchestration'

/**
 * Orchestration des processus — deuxieme sous-page de la rubrique Plateforme.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Le visuel de cette page est la frise du cycle de vie, pas une capture
 * d'ecran : c'est elle qui montre les capacites en mouvement, chacune des cinq
 * etapes en mettant au moins une en jeu. Elle vient donc apres elles.
 */
export const metadata = buildMetadata(orchestration.seo)

export default function OrchestrationPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(orchestration.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...orchestration.hero} nested />
        <PainPoints {...orchestration.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...orchestration.solution} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : la frise, puis ce qu'elle fait gagner. */}
      <SectionStack background="cream" labelledBy="lifecycle-title" gap="tight">
        <LifecycleTimeline
          {...orchestration.lifecycle}
          background="cream"
          nested
        />
        <OutcomeMetrics {...orchestration.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions. Le maillage vers Solutions dit a quels problemes
          metier ce module repond. */}
      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...orchestration.proof} background="white" nested />
        <RelatedPages
          {...orchestration.related}
          background="white"
          nested
          headingId="solutions-title"
        />
        <FaqAccordion {...orchestration.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
