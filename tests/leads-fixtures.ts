import { vi } from 'vitest'

import type { ContactLead } from '@/lib/crm'

export const LEAD: ContactLead = {
  firstName: 'Amel',
  lastName: 'Ben Salah',
  email: 'amel@usine.tn',
  phoneCountry: 'Tunisie',
  phoneDial: '+216',
  phone: '+21620123456',
  company: 'Usine SA',
  industry: 'Pharmaceutique',
  industryKey: 'pharma',
  message: 'Démo <CIPA> svp',
  consent: true,
  source: 'https://www.industryx0.pro/contact',
  utmSource: 'linkedin',
  utmMedium: 'social',
  utmCampaign: 'salon-2026-11',
  utmTerm: '',
  utmContent: 'post-1',
  ref: '',
  referrer: 'www.linkedin.com',
  firstTouch: 'linkedin / social',
  posthogId: 'ph-123',
  locale: 'fr',
  consentAt: '2026-10-19T09:00:00.000Z',
  submittedAt: '2026-10-19T09:00:00.000Z',
}

export type Call = { url: string; method: string; headers: Record<string, string>; body: unknown; raw: string }

/**
 * Remplace `fetch` : chaque appel est enregistré, et la réponse vient de
 * `respond` (corps JSON et statut). Renvoie la liste des appels.
 */
export function mockFetch(respond: (call: Call) => { status?: number; body?: unknown } | undefined) {
  const calls: Call[] = []
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init: RequestInit = {}) => {
      const raw = typeof init.body === 'string' ? init.body : ''
      const call: Call = {
        url,
        method: init.method ?? 'GET',
        headers: (init.headers ?? {}) as Record<string, string>,
        body: raw ? JSON.parse(raw) : undefined,
        raw,
      }
      calls.push(call)
      const { status = 200, body } = respond(call) ?? {}
      const text = body === undefined ? '' : typeof body === 'string' ? body : JSON.stringify(body)
      return new Response(status === 204 ? null : text, { status })
    }),
  )
  return calls
}
