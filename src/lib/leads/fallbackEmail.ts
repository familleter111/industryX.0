/**
 * Email de secours : quand le CRM, le webhook ou le tableur échoue, le lead
 * complet part par email vers LEAD_FALLBACK_EMAIL, via l'API Resend
 * (POST https://api.resend.com/emails, jeton RESEND_API_KEY).
 *
 * Le site n'avait aucun service d'email : Resend s'appelle avec un simple
 * fetch, sans SDK. L'expéditeur (LEAD_FALLBACK_FROM) doit appartenir à un
 * domaine vérifié dans Resend.
 */

import type { ContactLead, Env } from '@/lib/crm/types'
import { requestJson } from '@/lib/leads/http'

const RESEND_URL = 'https://api.resend.com/emails'

/** `true` si l'email de secours peut partir. */
export function fallbackConfigured(env: Env = process.env): boolean {
  return Boolean(
    env.LEAD_FALLBACK_EMAIL?.trim() && env.RESEND_API_KEY?.trim() && env.LEAD_FALLBACK_FROM?.trim(),
  )
}

export function fallbackText(lead: ContactLead, failures: string[]): string {
  const rows: [string, string][] = [
    ['Prénom', lead.firstName],
    ['Nom', lead.lastName],
    ['Email', lead.email],
    ['Téléphone', lead.phone],
    ['Société', lead.company],
    ['Industrie', `${lead.industry} (${lead.industryKey})`],
    ['Page', lead.source],
    ['utm_source', lead.utmSource],
    ['utm_medium', lead.utmMedium],
    ['utm_campaign', lead.utmCampaign],
    ['utm_term', lead.utmTerm],
    ['utm_content', lead.utmContent],
    ['ref', lead.ref],
    ['Site référent', lead.referrer],
    ['Première visite', lead.firstTouch],
    ['Langue', lead.locale],
    ['Consentement RGPD', lead.consentAt],
    ['ID PostHog', lead.posthogId],
  ]
  return [
    `Ce lead n'a pas pu être transmis à : ${failures.join(', ')}.`,
    'Merci de le saisir à la main.',
    '',
    ...rows.filter(([, value]) => value).map(([label, value]) => `${label} : ${value}`),
    '',
    'Message :',
    lead.message,
  ].join('\n')
}

export async function sendFallbackEmail(
  lead: ContactLead,
  failures: string[],
  env: Env = process.env,
): Promise<void> {
  if (!fallbackConfigured(env)) throw new Error('Email de secours non configuré')

  await requestJson(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY!.trim()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.LEAD_FALLBACK_FROM!.trim(),
      to: env.LEAD_FALLBACK_EMAIL!.split(',').map((address) => address.trim()).filter(Boolean),
      reply_to: lead.email,
      subject: `[Lead à saisir] ${lead.company} — ${lead.firstName} ${lead.lastName}`,
      text: fallbackText(lead, failures),
    }),
  })
}
