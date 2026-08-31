import Reveal, { RevealItem } from '@/components/ui/Reveal'

type Tone = 'light' | 'dark'

/** Pastille « ● INDUSTRY X.0 » utilisée en tête de section. */
export function SectionBadge({
  label = 'Industry X.0',
  tone = 'light',
}: {
  label?: string
  tone?: Tone
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur-sm ${
        tone === 'dark'
          ? 'border-white/12 bg-white/[0.04]'
          : 'border-stone-200 bg-white/70'
      }`}
    >
      <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-gold" />
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[11px] ${
          tone === 'dark' ? 'text-white/75' : 'text-stone-600'
        }`}
      >
        {label}
      </span>
    </span>
  )
}

/**
 * En-tête de section centré : pastille + titre (dont la fin est en doré)
 * + sous-titre. Partagé par les pages Société et Ressources.
 */
export default function SectionHeading({
  badge = 'Industry X.0',
  title,
  accent,
  subtitle,
  tone = 'light',
  className = '',
  orchestrated = false,
}: {
  badge?: string | null
  title: string
  /** Fin du titre, rendue en doré. */
  accent?: string
  subtitle?: string
  tone?: Tone
  className?: string
  /**
   * `true` quand un conteneur parent orchestre deja l'entree (stagger). Le
   * titre se contente alors de declarer ses variants et herite de l'etat du
   * parent.
   *
   * Sans ce drapeau, un enfant qui declare son propre `initial` et son propre
   * `whileInView` se detache de l'orchestration : Framer ne propage l'etat
   * d'un parent qu'aux enfants qui ne declarent pas les leurs. On obtient
   * alors deux declencheurs concurrents, et le titre apparait avant le
   * contenu qu'il annonce.
   */
  orchestrated?: boolean
}) {
  const inner = (
    <>
      {badge && <SectionBadge label={badge} tone={tone} />}

      <h2
        className={`mt-6 max-w-3xl font-display text-[30px] font-black leading-[1.08] tracking-[-0.04em] sm:text-[40px] lg:text-[52px] ${
          tone === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
        {accent && <span className="text-gold"> {accent}</span>}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-[1.7] sm:text-[16px] ${
            tone === 'dark' ? 'text-white/60' : 'text-stone-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </>
  )

  const wrapper = `flex flex-col items-center text-center ${className}`

  // Orchestre par un parent : RevealItem ne declare que ses variants et herite
  // de l'etat du conteneur. Sinon, Reveal fournit son propre declencheur.
  // Dans les deux cas le contenu reste rendu sur le serveur.
  return orchestrated ? (
    <RevealItem className={wrapper}>{inner}</RevealItem>
  ) : (
    <Reveal className={wrapper}>{inner}</Reveal>
  )
}
