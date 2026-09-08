import CapabilityList from '@/components/sections/CapabilityList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LimitsBlock from '@/components/sections/LimitsBlock'
import MarketingHero from '@/components/sections/MarketingHero'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import ProductShot from '@/components/sections/ProductShot'
import RelatedPages from '@/components/sections/RelatedPages'
import StatementBand from '@/components/sections/StatementBand'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { maintenanceSecurite as maintenance } from '@/content/maintenance-securite'

/**
 * Maintenance & securite.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  LE TON EST LA CONTRAINTE PRINCIPALE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Aucun superlatif, aucune promesse de securite. Voir l'en-tete de
 * content/maintenance-securite.ts : la regle de relecture y est ecrite, et le
 * bloc « ce que CIPA ne fait pas » est ce qui la tient. Il est place juste
 * avant le visuel, donc avant que la page montre quoi que ce soit — pas en fin
 * de page, ou il passerait pour une precaution qu'on espere voir sautee.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  AUCUNE CARTE, SAUF LE CADRE DE LA CAPTURE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Comme /solutions/non-conformites-capa et /solutions/amelioration-continue.
 * Seule exception : `ProductShot`, qui encadre une capture d'ecran. Ce n'est
 * pas une carte de contenu mais un chrome de fenetre — sans lui, une capture
 * posee a plat sur la page se lit comme une illustration decorative.
 *
 * Il rend ici sa silhouette et non une capture : le module maintenance est
 * vide sur l'instance de demonstration. Le TODO est dans le fichier de
 * contenu, a l'endroit ou `src` devra etre renseigne.
 */
export const metadata = buildMetadata(maintenance.seo)

export default function MaintenanceSecuritePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(maintenance.seo)} />

      {/* 1 — Ouverture : la promesse, puis la situation actuelle. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...maintenance.hero} nested />
        <ProblemShowcase
          {...maintenance.problem}
          variant="list"
          background="cream"
          nested
        />
      </SectionStack>

      {/* 2 — Le module, les situations dangereuses, le cadrage, le visuel.
          Le cadrage vient avant le visuel : le lecteur doit savoir ce que
          l'outil ne fait pas avant qu'on lui montre un ecran. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityList {...maintenance.solution} background="white" nested />
        <CapabilityList
          {...maintenance.hazards}
          background="white"
          nested
          id="hazards-title"
        />
        <LimitsBlock {...maintenance.limits} background="white" nested />
        <ProductShot {...maintenance.shot} background="white" nested />
      </SectionStack>

      {/* 3 — Ce que ca change, seul sur son aplat sombre. */}
      <StatementBand {...maintenance.statement} />

      {/* 4 — Les questions, puis les renvois. */}
      <SectionStack background="cream" labelledBy="faq-title">
        <FaqAccordion {...maintenance.faq} background="cream" nested />
        <RelatedPages
          {...maintenance.related}
          variant="list"
          background="cream"
          nested
          headingId="related-title"
        />
      </SectionStack>
    </>
  )
}
