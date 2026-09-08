import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LifecycleTimeline from '@/components/sections/LifecycleTimeline'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import ProofBlock from '@/components/sections/ProofBlock'
import RelatedPages from '@/components/sections/RelatedPages'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { orchestration } from '@/content/orchestration'

/**
 * Orchestration des processus — deuxieme sous-page de la rubrique Plateforme.
 *
 * Quatre sections majeures : ouverture · reponse · chiffres · questions. Voir
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

      {/* 1 — Ouverture : le probleme est pose sans defilement. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...orchestration.hero} nested />
        <ProblemShowcase {...orchestration.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse : ce que fait la plateforme, et comment ca se deroule. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...orchestration.solution} background="white" nested />
        <LifecycleTimeline
                  {...orchestration.lifecycle}
                  background="white"
                  nested
                />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. */}
      <MetricsShowcase {...orchestration.outcomes} />

      {/* 4 — Questions : le cadre, les renvois, la FAQ. */}
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
