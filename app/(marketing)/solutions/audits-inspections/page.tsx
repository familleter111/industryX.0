import CapabilityList from '@/components/sections/CapabilityList'
import CardGrid from '@/components/sections/CardGrid'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import RelatedPages from '@/components/sections/RelatedPages'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { auditsInspections as audits } from '@/content/audits-inspections'

/**
 * Audits & inspections — cinquieme page de la rubrique Solutions.
 *
 * Quatre sections majeures : ouverture · reponse · chiffres · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * Deux choses manquent ici par rapport aux autres pages, et c'est assume :
 *
 *  - pas de capture produit. Ce que la page a de plus convaincant a montrer
 *    serait un rapport genere ; une maquette de rapport plausible et inventee
 *    serait exactement le genre de piece qu'on retrouve ensuite dans une
 *    presentation client. La grille des types tient donc la place du visuel,
 *    c'est le bloc le plus graphique de la page.
 *  - pas de bloc integrations ou conformite. Apres les capacites, la question
 *    qui reste est de savoir si son propre type d'audit est couvert, et pas
 *    autre chose. Un bloc de plus aurait surtout prouve que le gabarit tourne
 *    a vide.
 */
export const metadata = buildMetadata(audits.seo)

export default function AuditsInspectionsPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(audits.seo)} />

      {/* 1 — Ouverture : le probleme est pose sans defilement. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...audits.hero} nested />
        <ProblemShowcase {...audits.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse : ce que fait la plateforme, et comment ca se deroule. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...audits.solution} background="white" nested />
        <CardGrid
                  {...audits.types}
                  background="white"
                  nested
                  id="types-title"
                />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. */}
      <MetricsShowcase {...audits.outcomes} />

      {/* 4 — Questions : le cadre, les renvois, la FAQ. */}
      <SectionStack background="white" labelledBy="related-title">
        <RelatedPages
                  {...audits.related}
                  background="white"
                  nested
                  headingId="related-title"
                />
        <FaqAccordion {...audits.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
