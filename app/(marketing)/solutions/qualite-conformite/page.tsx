import CapabilityShowcase from '@/components/sections/CapabilityShowcase'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { qualiteConformite } from '@/content/qualite-conformite'

/**
 * Qualite & conformite — premiere page de la rubrique Solutions.
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
 * Une page Solutions se lit autrement qu'une page Plateforme : elle ne decrit
 * pas un module, elle raconte un metier. D'ou le scenario d'audit a la place du
 * visuel produit — c'est le recit qui montre le produit, pas une capture — et
 * le renvoi, en derniere section, vers les deux modules qui le portent
 * reellement.
 *
 * Ce renvoi reste apres le bloc referentiels et avant la FAQ : le lecteur vient
 * d'admettre que le sujet est traite, c'est le moment ou il veut savoir par
 * quoi. Le remonter le sortirait de la page avant l'argument.
 */
export const metadata = buildMetadata(qualiteConformite.seo)

export default function QualiteConformitePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(qualiteConformite.seo)} />

      {/* 1 — Ouverture : l'accroche et les constats, d'un seul tenant. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...qualiteConformite.hero} nested />
        <ProblemShowcase
          {...qualiteConformite.problem}
          background="cream"
          nested
        />
      </SectionStack>

      {/* 2 — Ce que fait CIPA. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityShowcase
          {...qualiteConformite.solution}
          background="white"
          nested
        />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. C'est aussi le dernier appel a l'action de la page. */}
      <MetricsShowcase {...qualiteConformite.outcomes} />

      {/* 4 — Les questions qui restent. */}
      <SectionStack background="cream" labelledBy="faq-title">
        <FaqAccordion {...qualiteConformite.faq} background="cream" nested />
      </SectionStack>
    </>
  )
}
