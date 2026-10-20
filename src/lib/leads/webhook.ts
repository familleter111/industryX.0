/**
 * Webhook d'automatisation (n8n, Make, Zapier) : POST JSON du lead complet
 * vers LEAD_WEBHOOK_URL.
 *
 * Signature : `X-Signature: sha256=<hex>`, HMAC SHA-256 du corps brut avec
 * LEAD_WEBHOOK_SECRET. Le récepteur recalcule la même empreinte sur le corps
 * reçu, octet pour octet, et rejette la requête si elles diffèrent
 * (docs/leads-integration.md). `X-Lead-Id` permet d'ignorer un doublon si un
 * nouvel essai arrive après un premier envoi pourtant reçu.
 */

import { createHmac, randomUUID } from 'node:crypto'

import type { ContactLead, Env } from '@/lib/crm/types'
import { requestJson } from '@/lib/leads/http'

export const WEBHOOK_EVENT = 'lead.created'

export function signPayload(body: string, secret: string): string {
  return `sha256=${createHmac('sha256', secret).update(body, 'utf8').digest('hex')}`
}

export function webhookBody(lead: ContactLead, id: string) {
  return { event: WEBHOOK_EVENT, id, createdAt: lead.submittedAt, lead }
}

/** `true` si un webhook est configuré. */
export function webhookConfigured(env: Env = process.env): boolean {
  return Boolean(env.LEAD_WEBHOOK_URL?.trim())
}

export async function sendWebhook(lead: ContactLead, env: Env = process.env): Promise<void> {
  const url = env.LEAD_WEBHOOK_URL?.trim()
  if (!url) return
  const secret = env.LEAD_WEBHOOK_SECRET?.trim()
  // Un webhook non signé accepterait n'importe quel faux lead : on refuse
  // de l'appeler plutôt que de l'appeler sans preuve d'origine.
  if (!secret) throw new Error('Variable LEAD_WEBHOOK_SECRET manquante')

  const id = randomUUID()
  const body = JSON.stringify(webhookBody(lead, id))

  await requestJson(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Signature': signPayload(body, secret),
      'X-Lead-Id': id,
      'User-Agent': 'IndustryX0-Leads/1.0',
    },
    body,
  })
}
