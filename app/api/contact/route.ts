/**
 * Réception du formulaire « Planifier une démonstration ».
 *
 * Une demande valide devient une ligne de data/contacts.xlsx (voir
 * lib/server/leads.ts). La validation du client est refaite ici : elle sert
 * le confort de saisie, elle ne protège rien — n'importe qui peut poster
 * directement sur cette route.
 */

import { NextResponse } from 'next/server'

import { appendLead, type Lead } from '@/lib/server/leads'
import { findPhoneCountry, DEFAULT_PHONE_COUNTRY } from '@/lib/data/phoneCountries'

// exceljs lit et écrit sur le disque : ni Edge, ni mise en cache.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MESSAGE_MAX = 1000
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Coupe et borne : une chaîne de 2 Mo ne doit pas atteindre le classeur. */
function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/* --------------------------------------------------------- anti-rafale */

/**
 * Garde-fou en mémoire : 5 envois par IP et par quart d'heure.
 *
 * Volontairement rudimentaire — il tombe à chaque redéploiement et ne suit
 * pas plusieurs instances. C'est un ralentisseur contre un script naïf, pas
 * une protection : celle-ci se met devant le site (WAF, Cloudflare).
 */
const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  // Purge : sans elle, la Map grossit indéfiniment sur un serveur qui vit.
  if (hits.size > 500) {
    hits.forEach((times, key) => {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key)
    })
  }

  return recent.length > MAX_PER_WINDOW
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip')?.trim() || 'inconnu'
}

/* ------------------------------------------------------------- POST */

export async function POST(request: Request) {
  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Requête illisible.' },
      { status: 400 },
    )
  }

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
        error:
          'Trop de demandes envoyées depuis cette adresse. Réessayez dans quelques minutes.',
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

  if (!firstName) errors.firstName = 'Prénom requis'
  if (!lastName) errors.lastName = 'Nom requis'
  if (!email) errors.email = 'Email requis'
  else if (!EMAIL.test(email)) errors.email = 'Adresse email invalide'
  if (!company) errors.company = 'Société requise'
  if (!industry) errors.industry = 'Sélectionnez votre industrie'
  if (!message) errors.message = 'Message requis'
  if (!consent) errors.consent = 'Merci d’accepter le traitement de vos données'

  // Le téléphone reste facultatif ; renseigné, il doit tenir debout. Pas de
  // longueur imposée par pays : un fixe et un mobile n'ont pas le même
  // nombre de chiffres dans la plupart des pays, et refuser un numéro valide
  // coûte plus cher qu'accepter un numéro bancal.
  if (phoneNational && (phoneNational.length < 6 || phoneNational.length > 15)) {
    errors.phone = 'Numéro de téléphone incomplet'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: 'Formulaire incomplet.', fields: errors },
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
        error:
          'Impossible d’enregistrer votre demande pour le moment. Merci de réessayer ou de nous écrire directement.',
      },
      { status: 500 },
    )
  }
}
