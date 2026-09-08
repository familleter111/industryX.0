import Footer from '@/components/layout/Footer'

/**
 * Gabarit des pages de rubrique — Plateforme, Solutions.
 *
 * Groupe de routes : les parentheses excluent `marketing` de l'URL. Il ne
 * sert qu'a donner un layout commun a ces pages sans en donner un aux autres.
 *
 * Deux choses vivent ici, et une seule fois pour toutes les pages :
 *
 *  - Le repere <main>. Les pages existantes n'en ont pas : leur contenu
 *    principal n'est pas identifiable, et le lien d'evitement d'un lecteur
 *    d'ecran n'a nulle part ou aller.
 *  - Le Footer, en version complete. Il reste au niveau des pages ailleurs
 *    parce que six d'entre elles le veulent en version compacte (voir le
 *    commentaire de app/layout.tsx) ; ici, elles le veulent toutes pareil.
 *
 * La Navbar, elle, est deja dans le layout racine.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}
