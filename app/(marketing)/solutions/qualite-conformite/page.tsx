import BeforeAfter from '@/components/sections/BeforeAfter'
import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import ProofBlock from '@/components/sections/ProofBlock'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { qualiteConformite } from '@/content/qualite-conformite'

/**
 * Qualite & conformite — premiere page de la rubrique Solutions.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Une page Solutions se lit autrement qu'une page Plateforme : elle ne decrit
 * pas un module, elle raconte un metier. D'ou le scenario d'audit a la place du
 * visuel produit — c'est le recit qui montre le produit, pas une capture — et
 * le renvoi, en derniere section, vers les deux modules qui le portent
 * reellement.
 *
 * Ce renvoi reste apres le bloc referentiels et avant la FAQ : le lecteur vient
 * d'admettre que le sujet est traite, c'est le moment ou il veut savoir par
 * quoi. Le remonter le sortirait de la page avant l'argument.
 */
export const metadata = buildMetadata(qualiteConformite.seo)

export default function QualiteConformitePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(qualiteConformite.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...qualiteConformite.hero} nested />
        <PainPoints {...qualiteConformite.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList
          {...qualiteConformite.solution}
          background="white"
          nested
        />
      </SectionStack>

      {/* 3 — Visuel : le jour de l'audit, puis ce que ca fait gagner. */}
      <SectionStack background="cream" labelledBy="scenario-title" gap="tight">
        <BeforeAfter
          {...qualiteConformite.scenario}
          background="cream"
          nested
        />
        <OutcomeMetrics
          {...qualiteConformite.outcomes}
          background="cream"
          nested
        />
      </SectionStack>

      {/* 4 — Questions. */}
      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...qualiteConformite.proof} background="white" nested />
        <RelatedPages
          {...qualiteConformite.related}
          background="white"
          nested
          headingId="related-title"
        />
        <FaqAccordion {...qualiteConformite.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
