import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import RelatedPages from '@/components/sections/RelatedPages'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { plateforme } from '@/content/plateforme'

/**
 * Page pilier de la rubrique Plateforme.
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

      {/* 1 — Ouverture : l'accroche et les constats, d'un seul tenant. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...plateforme.hero} nested />
        <ProblemShowcase
          {...plateforme.problem}
          background="cream"
          nested
        />
      </SectionStack>

      {/* 2 — Les six modules. La page pilier n'a pas de bloc de capacites :
          ce qu'elle a a montrer, ce sont ses sous-pages. `id="modules"` est
          la cible du bouton « Voir les modules » du hero — le retirer casserait
          ce lien sans que rien ne le signale. */}
      <SectionStack background="white" labelledBy="related-title">
        <RelatedPages
          {...plateforme.modules}
          background="white"
          nested
          id="modules"
        />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. C'est aussi le dernier appel a l'action de la page. */}
      <MetricsShowcase {...plateforme.outcomes} />

      {/* 4 — Les questions qui restent. */}
      <SectionStack background="cream" labelledBy="faq-title">
        <FaqAccordion {...plateforme.faq} background="cream" nested />
      </SectionStack>
    </>
  )
}
