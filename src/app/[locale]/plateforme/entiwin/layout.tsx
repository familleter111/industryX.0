import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { ENTIWIN_PATH } from '@/lib/data/entiwin'
import { pageMetadata, type Locale } from '@/lib/i18n'

const META = {
  fr: {
    title: 'Enti Win — Évaluation qualité pharmaceutique assistée par IA | Industry X.0',
    description:
      'Enti Win confronte vos procédures, déviations et CAPA aux exigences BPF/GMP. Chaque écart est justifié, sourcé et traçable. Une solution Industry X.0.',
  },
  en: {
    title: 'Enti Win — AI-assisted pharmaceutical quality assessment | Industry X.0',
    description:
      'Enti Win checks your procedures, deviations and CAPAs against GMP requirements. Every gap is justified, sourced and traceable. An Industry X.0 solution.',
  },
}

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Metadata {
  return pageMetadata({ locale, path: ENTIWIN_PATH, ...META[locale] })
}

export default function EntiWinLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  return <>{children}</>
}
