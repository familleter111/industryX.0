/**
 * FAQ publiée, lue par le widget de chat pour ses réponses locales
 * (lib/chat/faq.ts) : Sanity quand il est configuré, sinon lib/data/faq.ts.
 *
 * Route statique, une par langue : générée au build, puis régénérée comme
 * les pages (cache d'une heure, rafraîchi aussitôt par le webhook du CMS,
 * étiquette cms:faq). Elle ne reçoit rien du visiteur.
 */

import { NextResponse } from 'next/server'

import { routing, type Locale } from '@/i18n/routing'
import { loadFaq } from '@/lib/cms/faq'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function GET(_request: Request, { params }: { params: { locale: Locale } }) {
  const faq = await loadFaq(params.locale)
  return NextResponse.json({ faq: faq.map(({ id, question, answer }) => ({ id, question, answer })) })
}
