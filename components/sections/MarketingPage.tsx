import CapabilityShowcase from '@/components/sections/CapabilityShowcase'
import FaqAccordion from '@/components/sections/FaqAccordion'
import MarketingHero from '@/components/sections/MarketingHero'
import MetricsShowcase from '@/components/sections/MetricsShowcase'
import ProblemShowcase from '@/components/sections/ProblemShowcase'
import JsonLd from '@/components/ui/JsonLd'
import { NAVBAR_CLEARANCE } from '@/components/ui/Section'
import SectionStack from '@/components/ui/SectionStack'
import { softwareApplicationLd } from '@/lib/seo'
import type { MarketingPageContent } from '@/content/types'

/**
 * Assemble une page de rubrique a partir de son seul fichier de contenu.
 *
 * Quatre blocs, dans cet ordre, et il est decide ici, pas page par page :
 *
 *   1. Ouverture — le hero et les constats terrain, d'un seul tenant.
 *   2. Capacites — ce que fait la plateforme, en cartes.
 *   3. Chiffres — le bandeau sombre de ce qu'on y gagne, et l'appel a l'action.
 *   4. Questions — la FAQ.
 *
 * La sequence est l'argument, elle ne se parametre pas. Une rubrique qui
 * placerait ses benefices avant son bloc probleme demanderait au directeur
 * d'usine de croire un chiffre avant de reconnaitre la situation qu'il
 * chiffre.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  QUATRE BLOCS, ET RIEN D'AUTRE
 * ─────────────────────────────────────────────────────────────────────────
 *
 * `MarketingPageContent` porte plus que ces quatre blocs : un visuel produit,
 * un bloc de preuve ou de conformite. Ils ne sont volontairement pas rendus —
 * une page de rubrique se lit d'une traite, et chaque bloc de plus est un
 * defilement de plus avant le bouton.
 *
 * Les champs restent dans le type parce qu'ils restent vrais et rediges : une
 * page qui en a besoin les rend elle-meme, en important la section
 * correspondante. Elles sont toutes autonomes.
 *
 * L'alternance des fonds : creme, blanc, noir, creme. Les blocs recoivent ce
 * fond en `background` sans le peindre eux-memes — c'est de la qu'ils tirent
 * leur remplissage de carte. La troisieme section n'a pas de `SectionStack` :
 * `MetricsShowcase` ouvre son propre aplat sombre, qu'un hote clair
 * effacerait.
 */
export default function MarketingPage({ content }: { content: MarketingPageContent }) {
  return (
    <>
      {/* Le JSON-LD SoftwareApplication decrit le produit et vaut pour toute
          la page ; celui de la FAQ est emis par l'accordeon, au plus pres des
          questions qu'il rend. */}
      <JsonLd data={softwareApplicationLd(content.seo)} />

      <SectionStack
        background="cream"
        labelledBy="hero-title"
        className={NAVBAR_CLEARANCE}
      >
        <MarketingHero {...content.hero} nested />
        <ProblemShowcase {...content.problem} background="cream" nested />
      </SectionStack>

      <SectionStack background="white" labelledBy="solution-title">
        <CapabilityShowcase {...content.solution} background="white" nested />
      </SectionStack>

      <MetricsShowcase {...content.outcomes} />

      <SectionStack background="cream" labelledBy="faq-title">
        <FaqAccordion {...content.faq} background="cream" nested />
      </SectionStack>
    </>
  )
}
