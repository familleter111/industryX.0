import AudienceList from '@/components/sections/AudienceList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import RelatedPages from '@/components/sections/RelatedPages'
import OutcomeMetrics from '@/components/sections/OutcomeMetrics'
import PainPoints from '@/components/sections/PainPoints'
import ProcessFlow from '@/components/sections/ProcessFlow'
import ProductShot from '@/components/sections/ProductShot'
import ProofBlock from '@/components/sections/ProofBlock'
import SurfaceSplit from '@/components/sections/SurfaceSplit'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { plateforme } from '@/content/plateforme'

/**
 * Page pilier de la rubrique Plateforme.
 *
 * Quatre sections majeures : ouverture · reponse · visuel · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * C'est la page qui porte le plus de blocs, et la seule dont l'ordre a bouge
 * en passant a quatre sections : le visuel produit etait pose entre la grille
 * des modules et le bloc « web et mobile », il est descendu apres « pour qui ».
 * La section « reponse » reunit maintenant tout ce qui decrit l'offre — les
 * quatre temps, les six modules, les deux surfaces, les publics — et le visuel
 * ouvre la troisieme, comme sur les onze autres pages.
 *
 * Objectif de la page : orienter vers les cinq sous-pages, et prendre
 * rendez-vous. Rien n'y est explique en profondeur, c'est le travail des pages
 * filles.
 */
export const metadata = buildMetadata(plateforme.seo)

export default function PlateformePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(plateforme.seo)} />

      {/* 1 — Ouverture. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...plateforme.hero} nested />
        <PainPoints {...plateforme.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse : les quatre temps, les modules, les surfaces, les
          publics. `id="modules"` est la cible du CTA secondaire du hero. */}
      <SectionStack background="white" labelledBy="flow-title">
        <ProcessFlow {...plateforme.flow} background="white" nested />
        <RelatedPages
          {...plateforme.modules}
          background="white"
          nested
          id="modules"
        />
        <SurfaceSplit {...plateforme.surfaces} background="white" nested />
        <AudienceList {...plateforme.audiences} background="white" nested />
      </SectionStack>

      {/* 3 — Visuel : l'ecran, puis ce qu'il fait gagner. Nommee par le titre
          des resultats, seul <h2> de la section : une figure n'en a pas. */}
      <SectionStack background="cream" labelledBy="outcomes-title" gap="tight">
        <ProductShot {...plateforme.shot} background="cream" nested />
        <OutcomeMetrics {...plateforme.outcomes} background="cream" nested />
      </SectionStack>

      {/* 4 — Questions. Le maillage vers Solutions ouvre la section : la page
          decrivait ses modules sans jamais dire a quel probleme metier ils
          repondent. */}
      <SectionStack background="white" labelledBy="solutions-title">
        <RelatedPages
          {...plateforme.solutions}
          background="white"
          nested
          headingId="solutions-title"
        />
        <ProofBlock {...plateforme.proof} background="white" nested />
        <FaqAccordion {...plateforme.faq} background="white" nested />
      </SectionStack>
    </>
  )
}
