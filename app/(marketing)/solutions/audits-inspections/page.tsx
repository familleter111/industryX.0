import CapabilityShowcase from '@/components/sections/CapabilityShowcase'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { auditsInspections as audits } from '@/content/audits-inspections'

/**
 * Audits & inspections — cinquieme page de la rubrique Solutions.
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

      {/* 1 — Ouverture : l'accroche et les constats, d'un seul tenant. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...audits.hero} nested />
        <ProblemShowcase
          {...audits.problem}
          background="cream"
          nested
        />
      </SectionStack>

      {/* 2 — Ce que fait CIPA. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityShowcase
          {...audits.solution}
          background="white"
          nested
        />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. C'est aussi le dernier appel a l'action de la page. */}
      <MetricsShowcase {...audits.outcomes} />

      {/* 4 — Les questions qui restent. */}
      <SectionStack background="cream" labelledBy="faq-title">
        <FaqAccordion {...audits.faq} background="cream" nested />
      </SectionStack>
    </>
  )
}
