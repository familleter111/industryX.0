import CapabilityShowcase from '@/components/sections/CapabilityShowcase'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { captureTerrain } from '@/content/capture-terrain'

/**
 * Capture terrain — premiere sous-page de la rubrique Plateforme.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  QUATRE BLOCS, ET RIEN D'AUTRE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Ouverture, capacites, chiffres, FAQ. Les blocs que la page rendait en plus
 * — preuve ou conformite, maillage interne, encart de relance, et le bloc
 * propre a son sujet — ne sont plus rendus.
 *
 * Leur contenu n'a pas ete supprime : il vit toujours dans le fichier de
 * contenu de la page, et le composant qui le rendait existe toujours. En
 * remettre un tient a une ligne de JSX. C'est le seul point a retenir avant
 * de croire ces pages amputees.
 *
 * Ce qui se perd tant qu'ils ne sont pas remis, et qui ne se voit pas a
 * l'ecran : le maillage interne entre Plateforme et Solutions, que les
 * moteurs suivaient pour relier les douze pages entre elles.
 *
 * Quatre sections majeures, comme toutes les pages de rubrique :
 * ouverture · reponse · chiffres · questions. Les blocs qui les composent sont
 * rendus en `nested` — c'est `SectionStack` qui ouvre la <section>, pose le
 * fond et le rythme. Voir ce composant pour le pourquoi du regroupement.
 *
 * Substitution propre a cette page : le visuel produit standard cede la place
 * a une maquette d'ecran annotee. Un cadre de navigateur vide sur une page qui
 * parle de saisie mobile montrerait le mauvais objet.
 */
export const metadata = buildMetadata(captureTerrain.seo)

export default function CaptureTerrainPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(captureTerrain.seo)} />

      {/* 1 — Ouverture : l'accroche et les constats, d'un seul tenant. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...captureTerrain.hero} nested />
        <ProblemShowcase
          {...captureTerrain.problem}
          background="cream"
          nested
        />
      </SectionStack>

      {/* 2 — Ce que fait CIPA. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityShowcase
          {...captureTerrain.solution}
          background="white"
          nested
        />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. C'est aussi le dernier appel a l'action de la page. */}
      <MetricsShowcase {...captureTerrain.outcomes} />

      {/* 4 — Les questions qui restent. */}
      <SectionStack background="cream" labelledBy="faq-title">
        <FaqAccordion {...captureTerrain.faq} background="cream" nested />
      </SectionStack>
    </>
  )
}
