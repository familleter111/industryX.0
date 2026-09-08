import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import ProductShot from '@/components/sections/ProductShot'
import ProofBlock from '@/components/sections/ProofBlock'
import CapaPipeline from '@/components/ui/CapaPipeline'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { nonConformitesCapa as capa } from '@/content/non-conformites-capa'

/**
 * Non-conformites & CAPA — quatrieme page de la rubrique Solutions.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Le tableau des CAPA passe en enfant de `ProductShot`, comme le tableau de
 * bord de /plateforme/tableaux-de-bord : il a besoin du cadre, du chrome de
 * fenetre et de la legende que ce composant fournit deja.
 *
 * Le circuit des reclamations reste apres le contenu d'un dossier CAPA, et pas
 * avant : il ne se comprend que si l'on a d'abord vu le circuit interne dont il
 * est l'application a un cas particulier. Remonte dans la section « reponse »,
 * il se lirait comme un second sujet.
 */
export const metadata = buildMetadata(capa.seo)

export default function NonConformitesCapaPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(capa.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...capa.hero} nested />
        <PainPoints {...capa.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...capa.solution} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : le pipeline, puis ce qu'il fait gagner. Nommee par le
          titre des resultats, seul <h2> de la section. */}
      <SectionStack background="cream" labelledBy="outcomes-title" gap="tight">
        <ProductShot {...capa.shot} background="cream" nested>
          <CapaPipeline />
        </ProductShot>
        <OutcomeMetrics {...capa.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions : le cadre, les reclamations, les renvois, la FAQ. */}
      <SectionStack background="white" labelledBy="proof-title">
        <ProofBlock {...capa.proof} background="white" nested />
        <CapabilityList
          {...capa.claims}
          background="white"
          nested
          id="claims-title"
        />
        <RelatedPages
          {...capa.related}
          background="white"
          nested
          headingId="related-title"
        />
        <FaqAccordion {...capa.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
