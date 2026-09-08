import CapabilityList from '@/components/sections/CapabilityList'
import ContactCallout from '@/components/sections/ContactCallout'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import PdcaLoop from '@/components/sections/PdcaLoop'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { ameliorationContinue as amelioration } from '@/content/amelioration-continue'

/**
 * Amelioration continue — sixieme et derniere page de la rubrique Solutions.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * C'est la page qui porte le nom du produit : CIPA signifie Continuous
 * Improvement Process Audit, et le sous-titre du hero le dit en toutes lettres.
 * Ne pas retirer ce rappel en reformulant, c'est le point de coherence de
 * marque du site.
 *
 * `ContactCallout` est reutilise pour l'encart « Industry X.0, au-dela du
 * logiciel », dernier bloc de la page : il a la meme forme que celui de
 * /plateforme/integrations — une objection, une reponse courte, un lien vers
 * l'interlocuteur pertinent — et pointe ici vers la page societe plutot que
 * vers le contact technique.
 */
export const metadata = buildMetadata(amelioration.seo)

export default function AmeliorationContinuePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(amelioration.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...amelioration.hero} nested />
        <PainPoints {...amelioration.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...amelioration.solution} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : la boucle PDCA, puis ce qu'elle fait gagner. */}
      <SectionStack background="cream" labelledBy="pdca-title" gap="tight">
        <PdcaLoop {...amelioration.pdca} background="cream" nested />
        <OutcomeMetrics {...amelioration.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions, puis l'encart societe qui ferme la page. */}
      <SectionStack background="white" labelledBy="related-title">
        <RelatedPages
          {...amelioration.related}
          background="white"
          nested
          headingId="related-title"
        />
        <FaqAccordion {...amelioration.faq} background="white" nested />
        <ContactCallout {...amelioration.company} background="white" nested />
      </SectionStack>
    </>
  )
}
