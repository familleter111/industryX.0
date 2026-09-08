import AnnotatedScreen from '@/components/sections/AnnotatedScreen'
import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import ProofBlock from '@/components/sections/ProofBlock'
import ChecklistScreen from '@/components/ui/ChecklistScreen'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { captureTerrain } from '@/content/capture-terrain'

/**
 * Capture terrain — premiere sous-page de la rubrique Plateforme.
 *
 * Quatre sections majeures, comme toutes les pages de rubrique :
 * ouverture · reponse · visuel · questions. Les blocs qui les composent sont
 * rendus en `nested` — c'est `SectionStack` qui ouvre la <section>, pose le
 * fond et le rythme. Voir ce composant pour le pourquoi du regroupement.
 *
 * Substitution propre a cette page : le visuel produit standard cede la place
 * a une maquette d'ecran annotee. Un cadre de navigateur vide sur une page qui
 * parle de saisie mobile montrerait le mauvais objet.
 */
export const metadata = buildMetadata(captureTerrain.seo)

export default function CaptureTerrainPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(captureTerrain.seo)} />

      {/* 1 — Ouverture. Le probleme est pose sans defilement : le hero et les
          constats terrain se lisent d'un seul tenant. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...captureTerrain.hero} nested />
        <PainPoints {...captureTerrain.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...captureTerrain.solution} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : l'ecran, puis ce qu'il fait gagner. */}
      <SectionStack background="cream" labelledBy="screen-title" gap="tight">
        <AnnotatedScreen {...captureTerrain.screen} background="cream" nested>
          <ChecklistScreen />
        </AnnotatedScreen>
        <OutcomeMetrics {...captureTerrain.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions : le cadre, les renvois, la FAQ. Le maillage vers
          Solutions dit a quels problemes metier ce module repond. */}
      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...captureTerrain.proof} background="white" nested />
        <RelatedPages
          {...captureTerrain.related}
          background="white"
          nested
          headingId="solutions-title"
        />
        <FaqAccordion {...captureTerrain.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
