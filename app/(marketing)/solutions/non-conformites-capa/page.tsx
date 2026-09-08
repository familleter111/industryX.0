import CapaPipeline from '@/components/sections/CapaPipeline'
import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import RelatedPages from '@/components/sections/RelatedPages'
import StatementBand from '@/components/sections/StatementBand'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { nonConformitesCapa as capa } from '@/content/non-conformites-capa'

/**
 * Non-conformites & CAPA — la page centrale de la rubrique Solutions.
 *
 * C'est le circuit que tout le reste du produit alimente : un audit, une
 * tournee qualite, un evenement ou un change control finissent tous en
 * deviation, et une deviation finit en action assignee.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  AUCUNE CARTE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Comme /solutions/amelioration-continue. Les blocs de cette page decrivent un
 * circuit, c'est-a-dire un raisonnement : rendus en cartes, ils se balaient.
 * A filets, ils se lisent. Les composants partages gardent leur forme en
 * cartes pour les autres pages, sous `variant="cards"`.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  L'AFFIRMATION EST AU MILIEU, ET C'EST TOUT LE POINT
 * ─────────────────────────────────────────────────────────────────────────
 *
 * `StatementBand` occupe la troisieme section a lui seul. Le lecteur vient de
 * voir comment une deviation devient une action verifiee ; il n'a pas encore
 * vu le circuit ni les reclamations. C'est le moment ou l'argument porte le
 * plus : assez tard pour etre credible, assez tot pour eclairer ce qui suit.
 *
 * Le bandeau ouvre sa propre section — imbrique dans un `SectionStack` clair,
 * il perdrait son fond et son texte blanc — et il porte l'appel a l'action.
 * C'est le seul de la page en dehors du hero, et il est place juste apres la
 * phrase qui doit convaincre.
 */
export const metadata = buildMetadata(capa.seo)

export default function NonConformitesCapaPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(capa.seo)} />

      {/* 1 — Ouverture : la promesse, puis la situation actuelle. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...capa.hero} nested />
        <ProblemShowcase
          {...capa.problem}
          variant="list"
          background="cream"
          nested
        />
      </SectionStack>

      {/* 2 — Les deux cycles : la deviation, puis l'action corrective. Dans
          cet ordre, parce que l'action n'existe pas sans la deviation qui
          l'ouvre. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...capa.solution} background="white" nested />
        <CapabilityList
          {...capa.capa}
          background="white"
          nested
          id="capa-title"
        />
      </SectionStack>

      {/* 3 — L'affirmation centrale, seule sur son aplat sombre. */}
      <StatementBand {...capa.statement} />

      {/* 4 — Ce que l'affirmation eclaire : le circuit, les reclamations,
          puis les questions et les renvois. */}
      <SectionStack background="cream" labelledBy="pipeline-title">
        <CapaPipeline {...capa.pipeline} background="cream" nested />
        <CapabilityList
          {...capa.claims}
          background="cream"
          nested
          id="claims-title"
        />
        <FaqAccordion {...capa.faq} background="cream" nested />
        <RelatedPages
          {...capa.related}
          variant="list"
          background="cream"
          nested
          headingId="related-title"
        />
      </SectionStack>
    </>
  )
}
