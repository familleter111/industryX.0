import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import ProductShot from '@/components/sections/ProductShot'
import ProofBlock from '@/components/sections/ProofBlock'
import RelatedPages from '@/components/sections/RelatedPages'
import DashboardScreen from '@/components/ui/DashboardScreen'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { tableauxDeBord } from '@/content/tableaux-de-bord'

/**
 * Tableaux de bord — quatrieme sous-page de la rubrique Plateforme.
 *
 * Quatre sections majeures : ouverture · reponse · chiffres · questions. Voir
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

      {/* 1 — Ouverture : le probleme est pose sans defilement. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...tableauxDeBord.hero} nested />
        <ProblemShowcase {...tableauxDeBord.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse : ce que fait la plateforme, et comment ca se deroule. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...tableauxDeBord.solution} background="white" nested />
        <ProductShot {...tableauxDeBord.shot} background="white" nested>
                  <DashboardScreen />
                </ProductShot>
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. */}
      <MetricsShowcase {...tableauxDeBord.outcomes} />

      {/* 4 — Questions : le cadre, les renvois, la FAQ. */}
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
