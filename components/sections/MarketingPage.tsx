import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
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
 *   2. Reponse — ce que fait la plateforme, et l'ecran ou ca se passe.
 *   3. Chiffres — le bandeau sombre de ce qu'on y gagne.
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
 * L'alternance des fonds : creme, blanc, noir, blanc. Les blocs recoivent ce
 * fond en `background` sans le peindre eux-memes — c'est de la qu'ils tirent
 * leur remplissage de carte. La troisieme section n'a pas de `SectionStack` :
 * `MetricsShowcase` ouvre son propre aplat sombre, qu'un hote clair
 * effacerait.
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
        <ProblemShowcase {...content.problem} background="cream" nested />
      </SectionStack>

      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...content.solution} background="white" nested />
        <ProductShot {...content.shot} background="white" nested />
      </SectionStack>

      <MetricsShowcase {...content.outcomes} />

      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...content.proof} background="white" nested />
        <FaqAccordion {...content.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
