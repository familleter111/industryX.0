import type { ReactNode } from 'react'

import Footer from '@/components/layout/Footer'
import { CONTACT } from '@/lib/data/contact'

/**
 * Gabarit des pages légales (politique de confidentialité, conditions
 * d'utilisation) : titre, date de mise à jour, introduction, table des
 * matières facultative, sections numérotées, encadrés et carte de contact.
 *
 * Composant serveur, sans état : les ancres de la table des matières sont de
 * simples liens `#id`, `scroll-mt` laisse la barre de navigation fixe (82 px)
 * au-dessus du titre visé.
 */

export type LegalSection = {
  /** Ancre stable : elle sert de lien depuis d'autres pages. */
  id: string
  title: string
  body: ReactNode
}

type LegalDocumentProps = {
  title: string
  /** « Dernière mise à jour : 19 octobre 2026 ». */
  updated: string
  intro?: ReactNode
  /** Titre de la table des matières ; absent = pas de table. */
  tocTitle?: string
  sections: LegalSection[]
}

export default function LegalDocument({ title, updated, intro, tocTitle, sections }: LegalDocumentProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream font-body text-dark selection:bg-gold/30">
      <article className="pb-16 pt-[calc(82px+3rem)] md:pb-24 md:pt-[calc(82px+4rem)]">
        <div className="mx-auto max-w-3xl px-5 sm:px-7">
          <header className="text-center">
            <h1 className="font-display text-[30px] font-black leading-tight tracking-[-0.04em] text-dark sm:text-[40px]">
              {title}
            </h1>
            <p className="mt-3 text-[14px] text-subtle">{updated}</p>
          </header>

          {intro && <div className="mt-10 text-[15px] leading-[1.75] text-stone-600">{intro}</div>}

          {tocTitle && (
            <nav aria-labelledby="toc-title" className="mt-10 rounded-2xl border border-cream-border bg-white p-5 sm:p-6">
              <h2 id="toc-title" className="text-[13px] font-bold uppercase tracking-[0.12em] text-dark">
                {tocTitle}
              </h2>
              <ol className="mt-4 grid gap-x-8 gap-y-2 text-[14px] sm:grid-cols-2">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-gold-ink hover:underline">
                      {i + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-12 space-y-12">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-[100px]">
                <h2
                  id={`${section.id}-title`}
                  className="font-display text-[21px] font-black tracking-[-0.02em] text-dark sm:text-[23px]"
                >
                  {i + 1}. {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-stone-600">{section.body}</div>
              </section>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}

/* ------------------------------------------------------------ éléments */

/** Sous-titre d'une section. */
export function Sub({ children }: { children: ReactNode }) {
  return <h3 className="!mt-6 text-[16px] font-bold tracking-[-0.01em] text-dark">{children}</h3>
}

/** Deux-points selon la langue : espace insécable avant en français. */
export const colon = (locale: string) => (locale === 'en' ? ':' : ' :')

/** Liste à puces dont chaque élément peut commencer par un libellé en gras. */
export function Items({ items, locale }: { items: (ReactNode | [string, ReactNode])[]; locale: string }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-gold-deep">
      {items.map((item, i) => (
        <li key={i}>
          {Array.isArray(item) ? (
            <>
              <strong className="font-semibold text-dark">
                {item[0]}
                {colon(locale)}
              </strong>{' '}
              {item[1]}
            </>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  )
}

const TONES = {
  info: 'border-sky-200 bg-sky-50 text-sky-900 [&_strong]:text-sky-950',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900 [&_strong]:text-emerald-950',
  danger: 'border-red-200 bg-red-50 text-red-800 [&_strong]:text-red-900',
  gold: 'border-gold/30 bg-gold/10 text-[#5C4318] [&_strong]:text-[#3F2D0E]',
}

/** Encadré coloré, barre à gauche comme sur les maquettes. */
export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: keyof typeof TONES
  title?: string
  children: ReactNode
}) {
  return (
    <div className={`rounded-r-xl border border-l-4 px-5 py-4 text-[14.5px] leading-relaxed ${TONES[tone]}`}>
      {title && <p className="mb-1 font-bold">{title}</p>}
      <div>{children}</div>
    </div>
  )
}

/** Carte des coordonnées, en fin de document. */
export function ContactCard({ rows, locale }: { rows: [string, ReactNode][]; locale: string }) {
  return (
    <div className="rounded-2xl border border-cream-border bg-white p-5 text-[14.5px] sm:p-6">
      <p className="font-bold text-dark">Industry X.0</p>
      <dl className="mt-3 space-y-1.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-dark">
              {label}
              {colon(locale)}
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ---------------------------------------------------------- coordonnées */

export const LEGAL_EMAIL = CONTACT.email
export const LEGAL_PHONE = CONTACT.phone
export const LEGAL_SITE = 'https://www.industryx0.pro'

export const MailLink = () => (
  <a href={`mailto:${LEGAL_EMAIL}`} className="font-medium text-gold-ink hover:underline">
    {LEGAL_EMAIL}
  </a>
)
