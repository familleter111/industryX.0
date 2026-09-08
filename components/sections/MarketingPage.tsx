import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import ProductShot from '@/components/sections/ProductShot'
import ProofBlock from '@/components/sections/ProofBlock'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { softwareApplicationLd } from '@/lib/seo'
import type { MarketingPageContent } from '@/content/types'

/**
 * Assemble une page de rubrique a partir de son seul fichier de contenu.
 *
 * Quatre sections majeures, dans cet ordre, et il est decide ici, pas page par
 * page :
 *
 *   1. Ouverture — le hero et les constats terrain, d'un seul tenant.
 *   2. Reponse — ce que fait la plateforme.
 *   3. Visuel — l'ecran, puis ce qu'il fait gagner.
 *   4. Questions — le cadre, puis la FAQ.
 *
 * La sequence est l'argument, elle ne se parametre pas. Une rubrique qui
 * placerait ses benefices avant son bloc probleme demanderait au directeur
 * d'usine de croire un chiffre avant de reconnaitre la situation qu'il
 * chiffre ; une autre qui sauterait la capture produit laisserait la
 * plateforme abstraite.
 *
 * Une page qui a vraiment besoin d'un agencement different importe les
 * sections une a une : elles sont autonomes et ne dependent pas de ce
 * composant. Les douze pages CIPA le font toutes, chacune ayant au moins un
 * bloc propre a intercaler — ce gabarit reste le point de depart et la
 * reference de structure.
 *
 * L'alternance des fonds est portee par les quatre `SectionStack` : creme,
 * blanc, creme, blanc. Les blocs qu'ils contiennent recoivent ce fond en
 * `background` sans le peindre eux-memes — c'est de la qu'ils tirent leur
 * remplissage de carte.
 */
export default function MarketingPage({ content }: { content: MarketingPageContent }) {
  return (
    <>
      {/* Le JSON-LD SoftwareApplication decrit le produit et vaut pour toute
          la page ; celui de la FAQ est emis par l'accordeon, au plus pres des
          questions qu'il rend. */}
      <JsonLd data={softwareApplicationLd(content.seo)} />

      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...content.hero} nested />
        <PainPoints {...content.problem} background="cream" nested />
      </SectionStack>

      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...content.solution} background="white" nested />
      </SectionStack>

      {/* Nommee par le titre des resultats : un `ProductShot` est une figure,
          il n'a pas de <h2> a designer. */}
      <SectionStack background="cream" labelledBy="outcomes-title" gap="tight">
        <ProductShot {...content.shot} background="cream" nested />
        <OutcomeMetrics {...content.outcomes} background="cream" nested />
      </SectionStack>

      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...content.proof} background="white" nested />
        <FaqAccordion {...content.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
