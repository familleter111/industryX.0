import AudienceList from '@/components/sections/AudienceList'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import ProcessFlow from '@/components/sections/ProcessFlow'
import ProductShot from '@/components/sections/ProductShot'
import ProofBlock from '@/components/sections/ProofBlock'
import RelatedPages from '@/components/sections/RelatedPages'
import SurfaceSplit from '@/components/sections/SurfaceSplit'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { plateforme } from '@/content/plateforme'

/**
 * Page pilier de la rubrique Plateforme.
 *
 * Quatre sections majeures : ouverture · reponse · chiffres · questions. Voir
 * `SectionStack` pour le regroupement.
 *
 * C'est la page qui porte le plus de blocs. Sa section « reponse » reunit tout
 * ce qui decrit l'offre — les quatre temps, les six modules, le visuel produit,
 * les deux surfaces, les publics. C'est beaucoup pour une seule section, et
 * c'est assume : la page pilier a plus a montrer que ses filles, et l'eclater
 * en deux bandes de plus lui rendrait le defilement qu'on vient de lui retirer.
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

      {/* 1 — Ouverture : le probleme est pose sans defilement. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...plateforme.hero} nested />
        <ProblemShowcase {...plateforme.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Reponse : ce que fait la plateforme, et comment ca se deroule. */}
      <SectionStack background="white" labelledBy="flow-title">
        <ProcessFlow {...plateforme.flow} background="white" nested />
        <RelatedPages
                  {...plateforme.modules}
                  background="white"
                  nested
                  id="modules"
                />
        <ProductShot {...plateforme.shot} background="white" nested />
        <SurfaceSplit {...plateforme.surfaces} background="white" nested />
        <AudienceList {...plateforme.audiences} background="white" nested />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. */}
      <MetricsShowcase {...plateforme.outcomes} />

      {/* 4 — Questions : le cadre, les renvois, la FAQ. */}
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
