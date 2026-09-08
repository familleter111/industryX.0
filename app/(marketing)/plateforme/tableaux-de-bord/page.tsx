import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import ProductShot from '@/components/sections/ProductShot'
import ProofBlock from '@/components/sections/ProofBlock'
import DashboardScreen from '@/components/ui/DashboardScreen'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { tableauxDeBord } from '@/content/tableaux-de-bord'

/**
 * Tableaux de bord — quatrieme sous-page de la rubrique Plateforme.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * La maquette du tableau de bord est passee en enfant de `ProductShot` plutot
 * que rendue par un composant a elle : elle a besoin exactement de ce que
 * celui-ci fournit deja — un cadre, un chrome de fenetre et une legende. Un
 * ecran de pilotage se regarde dans une fenetre de navigateur ; c'est la ou il
 * vit.
 */
export const metadata = buildMetadata(tableauxDeBord.seo)

export default function TableauxDeBordPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(tableauxDeBord.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...tableauxDeBord.hero} nested />
        <PainPoints {...tableauxDeBord.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...tableauxDeBord.solution} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : l'ecran, puis ce qu'il fait gagner. Nommee par le titre
          des resultats, seul <h2> de la section : une figure n'en a pas. */}
      <SectionStack background="cream" labelledBy="outcomes-title" gap="tight">
        <ProductShot {...tableauxDeBord.shot} background="cream" nested>
          <DashboardScreen />
        </ProductShot>
        <OutcomeMetrics {...tableauxDeBord.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions. */}
      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...tableauxDeBord.proof} background="white" nested />
        <RelatedPages
          {...tableauxDeBord.related}
          background="white"
          nested
          headingId="solutions-title"
        />
        <FaqAccordion {...tableauxDeBord.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
