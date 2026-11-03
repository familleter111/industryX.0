import type { Locale } from '@/lib/i18n'
import { isPreview } from '@/lib/site'

/**
 * Badge des préversions (lib/site.ts, isPreview) : la branche et le commit
 * déployés, en bas à gauche (la bulle du chat est à droite). Sur le site en
 * ligne, rien ne s'affiche. Ne capte aucun clic.
 */
export default function PreviewBadge({ locale }: { locale: Locale }) {
  if (!isPreview()) return null
  const label = process.env.NEXT_PUBLIC_PREVIEW_LABEL
  return (
    <p
      role="note"
      className="pointer-events-none fixed bottom-4 left-4 z-[60] rounded-full bg-dark/90 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur"
    >
      {locale === 'en' ? 'Preview' : 'Préversion'}
      {label ? ` · ${label}` : ''}
    </p>
  )
}
