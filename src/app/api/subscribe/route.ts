/**
 * Inscription « Recevoir les prochains guides » (/resources et pages guide).
 *
 * Même destination que les demandes de démonstration : une ligne de
 * data/contacts.xlsx, reconnaissable à son message et à sa colonne Origine.
 * Un seul fichier de prospects, que l'équipe filtre au besoin.
 */

import { NextResponse } from 'next/server'

import { appendLead } from '@/services/leads'
import { clean, clientIp, createRateLimiter } from '@/lib/server/rateLimit'
import { API_MESSAGES, apiLocale } from '@/lib/server/messages'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Une inscription se fait une fois : 3 envois par IP et par quart d'heure. */
const rateLimited = createRateLimiter(3, 15 * 60 * 1000)

export async function POST(request: Request) {
  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: API_MESSAGES.fr.unreadable }, { status: 400 })
  }

  const t = API_MESSAGES[apiLocale(payload.locale)]

  // Pot de miel : voir app/api/contact/route.ts.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: t.tooMany },
      { status: 429 },
    )
  }

  const email = clean(payload.email, 160)
  const company = clean(payload.company, 120)
  const consent = payload.consent === true
  const source = clean(payload.source, 200) || '/resources'

  const errors: Record<string, string> = {}
  if (!email) errors.email = t.email
  else if (!EMAIL.test(email)) errors.email = t.emailInvalid
  if (!consent) errors.consent = t.consent

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: t.incomplete, fields: errors },
      { status: 422 },
    )
  }

  try {
    const result = await appendLead({
      firstName: '',
      lastName: '',
      email,
      phoneCountry: '',
      phoneDial: '',
      phone: '',
      company,
      industry: '',
      message: 'Inscription aux guides & insights',
      consent,
      source,
    })
    if (result.warning) console.warn('[subscribe]', result.warning)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[subscribe] enregistrement impossible', error)
    return NextResponse.json(
      { ok: false, error: t.subscribeFailed },
      { status: 500 },
    )
  }
}
