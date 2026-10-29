import { serializeJsonLd } from '@/lib/seo/schema'

/**
 * Bloc de données structurées. Composant serveur : le JSON est dans le HTML
 * envoyé, lisible sans JavaScript. Construire `data` avec lib/seo/schema.ts.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Échappé par serializeJsonLd : aucun « </script> » ne peut en sortir.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
