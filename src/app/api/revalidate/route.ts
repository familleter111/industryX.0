/**
 * Webhook de publication Sanity : rafraîchit tout de suite les pages qui
 * affichent le type de document publié, sans attendre l'expiration du cache
 * (CMS_REVALIDATE_SECONDS). Réglage : docs/cms.md, « Publication immédiate ».
 *
 * Le webhook envoie `Authorization: Bearer <SANITY_REVALIDATE_SECRET>` et, en
 * corps, la projection `{_type}`. Sans secret configuré, la route répond 404.
 */

import { timingSafeEqual } from 'node:crypto'

import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { CMS_TAG, cmsTag } from '@/lib/cms/client'

function sameSecret(given: string, expected: string): boolean {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim()
  if (!secret) return NextResponse.json({ ok: false }, { status: 404 })
  if (!sameSecret(request.headers.get('authorization') ?? '', `Bearer ${secret}`)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as { _type?: unknown } | null
  const type = body?._type
  // Type absent ou inattendu : tout le contenu du CMS est rafraîchi.
  const tag = typeof type === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(type) ? cmsTag(type) : CMS_TAG
  revalidateTag(tag)
  return NextResponse.json({ ok: true, revalidated: tag })
}
