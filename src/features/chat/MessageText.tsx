/**
 * Texte d'une réponse de l'assistant : retours à la ligne conservés, liens,
 * e-mails et numéros de téléphone cliquables (components/layout/ChatWidget).
 */

/** Liens, e-mails et numéros de téléphone d'une réponse. */
const LINKABLE = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+\d{3}(?: \d{2,3}){3})/g

export default function MessageText({
  text,
  linkClassName,
}: {
  text: string
  /** Couleur des liens, selon le fond (clair dans le widget, sombre sur la page). */
  linkClassName: string
}) {
  return (
    <>
      {text.split(LINKABLE).map((part, i) => {
        if (i % 2 === 0) return part
        // Ponctuation collée au lien (« …contact). ») : elle reste du texte.
        const [, target, tail] = part.match(/^(.*?)([.,;:!?)]*)$/) ?? [part, part, '']
        const href = target.startsWith('http')
          ? target
          : target.includes('@')
            ? `mailto:${target}`
            : `tel:${target.replace(/\s/g, '')}`
        const external = href.startsWith('http')
        return (
          <span key={i}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`break-all font-semibold underline ${linkClassName}`}
            >
              {target}
            </a>
            {tail}
          </span>
        )
      })}
    </>
  )
}
