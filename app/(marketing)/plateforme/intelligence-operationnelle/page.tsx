import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LimitsBlock from '@/components/sections/LimitsBlock'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import ProductShot from '@/components/sections/ProductShot'
import ProofBlock from '@/components/sections/ProofBlock'
import RelatedPages from '@/components/sections/RelatedPages'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { intelligenceOperationnelle as ia } from '@/content/intelligence-operationnelle'

/**
 * Intelligence operationnelle — troisieme sous-page de la rubrique Plateforme.
 *
 * Quatre sections majeures : ouverture · reponse · chiffres · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Le bloc des limites — ce que l'IA ne fait pas — reste colle aux capacites,
 * dans la meme section qu'elles, et pas ailleurs. Enonce avant, il refroidirait
 * une promesse que le lecteur n'a pas encore entendue ; relegue en fin de page,
 * il passerait pour une precaution qu'on espere voir sautee. Juste apres, il
 * repond a l'objection au moment ou elle se forme.
 */
export const metadata = buildMetadata(ia.seo)

export default function IntelligenceOperationnellePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(ia.seo)} />

      {/* 1 — Ouverture : le probleme est pose sans defilement. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...ia.hero} nested />
        <ProblemShowcase {...ia.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse : ce que fait la plateforme, et comment ca se deroule. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...ia.solution} background="white" nested />
        <LimitsBlock {...ia.limits} background="white" nested />
        <ProductShot {...ia.shot} background="white" nested />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. */}
      <MetricsShowcase {...ia.outcomes} />

      {/* 4 — Questions : le cadre, les renvois, la FAQ. */}
      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...ia.proof} background="white" nested />
        <RelatedPages
                  {...ia.related}
                  background="white"
                  nested
                  headingId="solutions-title"
                />
        <FaqAccordion {...ia.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
