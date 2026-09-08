import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LifecycleTimeline from '@/components/sections/LifecycleTimeline'
import LimitsBlock from '@/components/sections/LimitsBlock'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import ProofBlock from '@/components/sections/ProofBlock'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { maintenanceSecurite as maintenance } from '@/content/maintenance-securite'

/**
 * Maintenance & securite — troisieme page de la rubrique Solutions.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Le bloc de cadrage — ce que CIPA ne fait pas — reste pose entre le parcours
 * d'une alerte et les benefices, dans la meme section qu'eux, et c'est un choix
 * de fond plutot que de mise en page. Le lecteur vient de voir une chaine qui
 * se deroule toute seule, du constat a la verification ; c'est exactement le
 * moment ou une page de securite peut laisser croire que l'outil traite le
 * risque. Le cadrage arrive la, avant qu'on parle de ce qu'on gagne.
 *
 * Ce bloc « ce que vous gagnez » ne porte d'ailleurs aucun chiffre invente,
 * contrairement a toutes les autres pages du site : voir l'en-tete de
 * content/maintenance-securite.ts.
 */
export const metadata = buildMetadata(maintenance.seo)

export default function MaintenanceSecuritePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(maintenance.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...maintenance.hero} nested />
        <PainPoints {...maintenance.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...maintenance.solution} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : l'escalade en temps reel, le cadrage, puis les
          benefices. */}
      <SectionStack background="cream" labelledBy="lifecycle-title" gap="tight">
        <LifecycleTimeline
          {...maintenance.escalation}
          background="cream"
          nested
        />
        <LimitsBlock {...maintenance.limits} background="cream" nested />
        <OutcomeMetrics {...maintenance.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions. */}
      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...maintenance.proof} background="white" nested />
        <RelatedPages
          {...maintenance.related}
          background="white"
          nested
          headingId="related-title"
        />
        <FaqAccordion {...maintenance.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
