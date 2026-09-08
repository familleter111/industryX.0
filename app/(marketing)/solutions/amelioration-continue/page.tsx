import CapabilityShowcase from '@/components/sections/CapabilityShowcase'
import CardGrid from '@/components/sections/CardGrid'
import ContactCallout from '@/components/sections/ContactCallout'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import PdcaLoop from '@/components/sections/PdcaLoop'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import RelatedPages from '@/components/sections/RelatedPages'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { ameliorationContinue as amelioration } from '@/content/amelioration-continue'

/**
 * Amelioration continue — la page qui porte le nom du produit.
 *
 * CIPA signifie Continuous Improvement Process Audit, et le H1 le developpe en
 * toutes lettres. C'est le seul endroit du site ou le sigle est explicite : ne
 * pas le retirer en reformulant le titre.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  PLUS DE BLOCS QUE LES ONZE AUTRES PAGES, ET C'EST VOULU
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Les autres pages tiennent en quatre blocs. Celle-ci en porte sept : la
 * boucle, le change control et le PDCA decrivent trois mecanismes distincts
 * qu'on ne peut pas fondre l'un dans l'autre sans perdre ce qui les separe.
 * Le decoupage en quatre sections tient quand meme — c'est la deuxieme qui les
 * reunit tous les trois.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  L'ORDRE DE LA FIN N'EST PAS INTERCHANGEABLE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * FAQ, puis renvois, puis l'encart societe, puis le bandeau sombre qui porte
 * l'appel a l'action. L'encart « Industry X.0, au-dela du logiciel » est le
 * dernier bloc de contenu : il dit que l'outil ne suffit pas, juste avant
 * qu'on propose une demonstration de l'outil. Le remonter plus haut lui ferait
 * perdre ce que cette position lui donne.
 */
export const metadata = buildMetadata(amelioration.seo)

export default function AmeliorationContinuePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(amelioration.seo)} />

      {/* 1 — Ouverture : le sigle developpe, puis la situation actuelle. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...amelioration.hero} nested />
        <ProblemShowcase {...amelioration.problem} background="cream" nested />
      </SectionStack>

      {/* 2 — Les trois mecanismes : la boucle, le change control, le PDCA.
          Le PDCA vient en dernier parce qu'il replace les deux premiers dans
          la methode — l'inverse demanderait au lecteur de reconnaitre un cadre
          avant d'avoir vu ce qu'on y met. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityShowcase
          {...amelioration.solution}
          background="white"
          nested
        />
        <CardGrid
          {...amelioration.changeControl}
          background="white"
          nested
          id="change-control-title"
        />
        <PdcaLoop {...amelioration.pdca} background="white" nested />
      </SectionStack>

      {/* 3 — Fin de lecture : questions, renvois, et qui est derriere. */}
      <SectionStack background="cream" labelledBy="faq-title">
        <FaqAccordion {...amelioration.faq} background="cream" nested />
        <RelatedPages
          {...amelioration.related}
          background="cream"
          nested
          headingId="related-title"
        />
        <ContactCallout {...amelioration.company} background="cream" nested />
      </SectionStack>

      {/* 4 — Le bandeau sombre, qui porte l'appel a l'action. Il ouvre sa
          propre section : imbrique dans un `SectionStack` clair, il perdrait
          son fond et son texte blanc. */}
      <MetricsShowcase {...amelioration.outcomes} />
    </>
  )
}
