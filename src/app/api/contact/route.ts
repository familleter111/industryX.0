/**
 * Réception du formulaire « Planifier une démonstration ».
 *
 * 1. Pot de miel, limite par IP, validation Zod (lib/leads/schema.ts) : la
 *    validation du client sert le confort de saisie, elle ne protège rien —
 *    n'importe qui peut poster directement sur cette route.
 * 2. Le lead est complété (heure du consentement, langue, attribution) puis
 *    livré au tableur, au CRM et au webhook (lib/leads/deliver.ts), avec
 *    email de secours si une destination échoue.
 *
 * Configuration par variables d'environnement : voir .env.example et
 * docs/leads-integration.md.
 */

import { NextResponse } from 'next/server'

import type { ContactLead } from '@/lib/crm'
import { deliverLead } from '@/lib/leads/deliver'
import { parseContact } from '@/lib/leads/schema'
import { clean, clientIp, createRateLimiter } from '@/lib/server/rateLimit'
import { API_MESSAGES, apiLocale } from '@/lib/server/messages'
import { leadAttribution } from '@/lib/analytics/attribution'

// exceljs lit et écrit sur le disque : ni Edge, ni mise en cache.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** 5 envois par IP et par quart d'heure (voir lib/server/rateLimit.ts). */
const rateLimited = createRateLimiter(5, 15 * 60 * 1000)

/* ------------------------------------------------------------- POST */

export async function POST(request: Request) {
  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json(
      { ok: false, error: API_MESSAGES.fr.unreadable },
      { status: 400 },
    )
  }
  if (!payload || typeof payload !== 'object') {
    return NextResponse.json(
      { ok: false, error: API_MESSAGES.fr.unreadable },
      { status: 400 },
    )
  }

  const locale = apiLocale(payload.locale)
  const t = API_MESSAGES[locale]

  // Pot de miel : un champ invisible que seul un robot remplit. On répond
  // « c'est envoyé » sans rien traiter — inutile de lui apprendre qu'il est
  // repéré, il reviendrait autrement.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: t.tooMany }, { status: 429 })
  }

  const parsed = parseContact(payload, locale)
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, error: t.incomplete, fields: parsed.fields },
      { status: 422 },
    )
  }

  // Le consentement est donné à l'envoi : c'est l'heure du serveur qui fait
  // foi, pas celle, réglable, du poste du visiteur.
  const now = new Date().toISOString()
  const lead: ContactLead = {
    ...parsed.data,
    ...leadAttribution(payload),
    locale,
    consentAt: now,
    submittedAt: now,
  }

  const report = await deliverLead(lead)
  if (!report.stored) {
    return NextResponse.json({ ok: false, error: t.contactFailed }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
