/**
 * Réception du formulaire « Planifier une démonstration ».
 *
 * Une demande valide devient une ligne de data/contacts.xlsx (voir
 * services/leads.ts). La validation du client est refaite ici : elle sert
 * le confort de saisie, elle ne protège rien — n'importe qui peut poster
 * directement sur cette route.
 */

import { NextResponse } from 'next/server'

import { appendLead, type Lead } from '@/services/leads'
import { clean, clientIp, createRateLimiter } from '@/lib/server/rateLimit'
import { API_MESSAGES, apiLocale } from '@/lib/server/messages'
import { findPhoneCountry, DEFAULT_PHONE_COUNTRY } from '@/lib/data/phoneCountries'
import { leadAttribution } from '@/lib/analytics/attribution'

// exceljs lit et écrit sur le disque : ni Edge, ni mise en cache.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MESSAGE_MAX = 1000
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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

  const t = API_MESSAGES[apiLocale(payload.locale)]

  // Pot de miel : un champ invisible que seul un robot remplit. On répond
  // « c'est envoyé » sans rien écrire — inutile de lui apprendre qu'il est
  // repéré, il reviendrait autrement.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        error: t.tooMany,
      },
      { status: 429 },
    )
  }

  const firstName = clean(payload.firstName, 80)
  const lastName = clean(payload.lastName, 80)
  const email = clean(payload.email, 160)
  const company = clean(payload.company, 120)
  const industry = clean(payload.industry, 120)
  const message = clean(payload.message, MESSAGE_MAX)
  const consent = payload.consent === true
  const source = clean(payload.source, 200) || '/contact'

  const country =
    findPhoneCountry(clean(payload.phoneCountry, 2).toUpperCase()) ??
    findPhoneCountry(DEFAULT_PHONE_COUNTRY)!
  const phoneNational = clean(payload.phone, 40).replace(/\D/g, '')

  const errors: Record<string, string> = {}

  if (!firstName) errors.firstName = t.firstName
  if (!lastName) errors.lastName = t.lastName
  if (!email) errors.email = t.email
  else if (!EMAIL.test(email)) errors.email = t.emailInvalid
  if (!company) errors.company = t.company
  if (!industry) errors.industry = t.industry
  if (!message) errors.message = t.message
  if (!consent) errors.consent = t.consent

  // Le téléphone reste facultatif ; renseigné, il doit tenir debout. Pas de
  // longueur imposée par pays : un fixe et un mobile n'ont pas le même
  // nombre de chiffres dans la plupart des pays, et refuser un numéro valide
  // coûte plus cher qu'accepter un numéro bancal.
  if (phoneNational && (phoneNational.length < 6 || phoneNational.length > 15)) {
    errors.phone = t.phone
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: t.incomplete, fields: errors },
      { status: 422 },
    )
  }

  const lead: Lead = {
    firstName,
    lastName,
    email,
    phoneCountry: phoneNational ? country.name : '',
    phoneDial: phoneNational ? `+${country.dial}` : '',
    phone: phoneNational ? `+${country.dial}${phoneNational}` : '',
    company,
    industry,
    message,
    consent,
    source,
    ...leadAttribution(payload),
  }

  try {
    const result = await appendLead(lead)
    if (result.warning) console.warn('[contact]', result.warning)
    else console.info('[contact] demande enregistrée →', result.file)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[contact] enregistrement impossible', error)
    return NextResponse.json(
      {
        ok: false,
        error: t.contactFailed,
      },
      { status: 500 },
    )
  }
}
