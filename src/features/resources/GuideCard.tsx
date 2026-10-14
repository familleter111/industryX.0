import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Clock } from 'lucide-react'

import { categoryLabel, formatGuideDate, type Guide } from '@/lib/data/guides'
import { useCopy, useCurrentLocale } from '@/lib/i18n'

const COPY = { fr: { read: 'Lire' }, en: { read: 'Read' } }

/**
 * Carte d'un guide : visuel, categorie, titre, resume, date et duree.
 *
 * Toute la carte est le lien. Le titre porte le nom accessible ; le reste
 * (resume, meta) est lu a la suite, sans second lien concurrent.
 */
export default function GuideCard({ guide }: { guide: Guide }) {
  const locale = useCurrentLocale()
  const t = useCopy(COPY)
  return (
    <Link
      href={`/resources/${guide.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#E7E5E4] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] outline-none transition-all duration-300 hover:-translate-y-[2px] hover:border-gold/35 hover:shadow-[0_22px_50px_rgba(15,23,42,0.10)] focus-visible:ring-2 focus-visible:ring-gold-deep"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-cream">
        <Image
          src={guide.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-gold-ink shadow-sm">
          {categoryLabel(guide.category, locale)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-pretty text-[16px] font-bold leading-snug tracking-[-0.02em] text-[#111827]">
          {guide.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 flex-1 text-[13px] leading-[1.65] text-stone-600">
          {guide.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#F0EDE6] pt-4 text-[12px] text-subtle">
          <span className="flex items-center gap-3">
            <time dateTime={guide.date}>{formatGuideDate(guide.date, locale)}</time>
            <span className="flex items-center gap-1">
              <Clock size={12} aria-hidden="true" />
              {guide.readingMinutes} min
            </span>
          </span>

          <span className="inline-flex items-center gap-1 font-semibold text-gold-ink">
            {t.read}
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
