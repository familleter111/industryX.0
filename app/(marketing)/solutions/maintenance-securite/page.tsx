import CapabilityShowcase from '@/components/sections/CapabilityShowcase'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { buildMetadata, softwareApplicationLd } from '@/lib/seo'
import { maintenanceSecurite as maintenance } from '@/content/maintenance-securite'

/**
 * Maintenance & securite — troisieme page de la rubrique Solutions.
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
 * Le bloc de cadrage — ce que CIPA ne fait pas — ferme la section « reponse »,
 * juste apres le parcours d'une alerte et juste avant le bandeau des chiffres.
 * C'est un choix de fond plutot que de mise en page : le lecteur vient de voir
 * une chaine qui se deroule toute seule, du constat a la verification, et c'est
 * exactement le moment ou une page de securite peut laisser croire que l'outil
 * traite le risque. Le cadrage arrive la, avant qu'on parle de ce qu'on gagne.
 *
 * Ce bloc « ce que vous gagnez » ne porte d'ailleurs aucun chiffre invente,
 * contrairement a toutes les autres pages du site : voir l'en-tete de
 * content/maintenance-securite.ts.
 */
export const metadata = buildMetadata(maintenance.seo)

export default function MaintenanceSecuritePage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd(maintenance.seo)} />

      {/* 1 — Ouverture : l'accroche et les constats, d'un seul tenant. */}
      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...maintenance.hero} nested />
        <ProblemShowcase
          {...maintenance.problem}
          background="cream"
          nested
        />
      </SectionStack>

      {/* 2 — Ce que fait CIPA. */}
      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityShowcase
          {...maintenance.solution}
          background="white"
          nested
        />
      </SectionStack>

      {/* 3 — Le bandeau sombre des chiffres. Il ouvre sa propre section :
          imbrique dans un `SectionStack` clair, il perdrait son fond et son
          texte blanc. C'est aussi le dernier appel a l'action de la page. */}
      <MetricsShowcase {...maintenance.outcomes} />

      {/* 4 — Les questions qui restent. */}
      <SectionStack background="cream" labelledBy="faq-title">
        <FaqAccordion {...maintenance.faq} background="cream" nested />
      </SectionStack>
    </>
  )
}
