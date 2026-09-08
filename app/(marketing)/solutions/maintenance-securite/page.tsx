import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LifecycleTimeline from '@/components/sections/LifecycleTimeline'
import LimitsBlock from '@/components/sections/LimitsBlock'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import ProofBlock from '@/components/sections/ProofBlock'
import RelatedPages from '@/components/sections/RelatedPages'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { maintenanceSecurite as maintenance } from '@/content/maintenance-securite'

/**
 * Maintenance & securite — troisieme page de la rubrique Solutions.
 *
 * Quatre sections majeures : ouverture · reponse · chiffres · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Le bloc de cadrage — ce que CIPA ne fait pas — ferme la section « reponse »,
 * juste apres le parcours d'une alerte et juste avant le bandeau des chiffres.
 * C'est un choix de fond plutot que de mise en page : le lecteur vient de voir
 * une chaine qui se deroule toute seule, du constat a la verification, et c'est
 * exactement le moment ou une page de securite peut laisser croire que l'outil
 * traite le risque. Le cadrage arrive la, avant qu'on parle de ce qu'on gagne.
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

      {/* 1 — Ouverture : le probleme est pose sans defilement. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...maintenance.hero} nested />
        <ProblemShowcase {...maintenance.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse : ce que fait la plateforme, et comment ca se deroule. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...maintenance.solution} background="white" nested />
        <LifecycleTimeline
                  {...maintenance.escalation}
                  background="white"
                  nested
                />
        <LimitsBlock {...maintenance.limits} background="white" nested />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. */}
      <MetricsShowcase {...maintenance.outcomes} />

      {/* 4 — Questions : le cadre, les renvois, la FAQ. */}
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
