/**
 * Injecte un graphe JSON-LD dans le document.
 *
 * `dangerouslySetInnerHTML` est la seule voie possible : passe en enfant
 * texte, React echapperait les guillemets du JSON en `&quot;` et le balisage
 * deviendrait illisible pour les moteurs. Meme raison que la regle `<noscript>`
 * de app/layout.tsx.
 *
 * Le contenu vient de `lib/seo.ts`, jamais d'une saisie utilisateur : il n'y a
 * donc rien a assainir. `JSON.stringify` echappe deja les `<` en `\u003c`,
 * ce qui empeche une chaine de fermer le `<script>` par accident.
 *
 * Pas de 'use client' : rien a hydrater, le balisage n'existe que pour les
 * robots.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
