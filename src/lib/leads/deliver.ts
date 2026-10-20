/**
 * Livraison d'un lead : tableur, CRM et webhook en parallèle, puis email de
 * secours si l'un d'eux échoue.
 *
 * Règle : le lead ne doit jamais être perdu. Le visiteur voit un succès dès
 * qu'au moins une destination l'a reçu ; chaque échec est journalisé (sans
 * email ni téléphone en clair) et déclenche l'email de secours. Seul le cas
 * où rien n'a abouti — ni tableur, ni CRM, ni webhook, ni email — renvoie
 * une erreur au visiteur, qui peut alors réessayer.
 */

import { getCrmProvider, type ContactLead, type Env } from '@/lib/crm'
import { fallbackConfigured, sendFallbackEmail } from '@/lib/leads/fallbackEmail'
import { errorSummary, maskEmail, maskPhone } from '@/lib/leads/http'
import { sendWebhook, webhookConfigured } from '@/lib/leads/webhook'
import { appendLead } from '@/services/leads'

export type DeliveryReport = {
  /** Au moins une destination a reçu le lead. */
  stored: boolean
  delivered: string[]
  failed: string[]
  fallback: 'not-needed' | 'sent' | 'failed' | 'not-configured'
}

type Task = { name: string; run: () => Promise<unknown> }

function tasks(lead: ContactLead, env: Env): Task[] {
  const list: Task[] = [
    {
      name: 'tableur',
      run: async () => {
        const result = await appendLead(lead)
        if (result.warning) console.warn('[leads] tableur :', result.warning)
      },
    },
  ]

  // Une configuration CRM cassée (variable manquante, nom inconnu) est un
  // échec de livraison comme un autre : elle déclenche l'email de secours.
  const crmName = env.CRM_PROVIDER?.trim().toLowerCase() || 'none'
  if (crmName !== 'none') {
    list.push({
      name: `crm:${crmName}`,
      run: async () => {
        await getCrmProvider(env)?.upsertLead(lead)
      },
    })
  }

  if (webhookConfigured(env)) list.push({ name: 'webhook', run: () => sendWebhook(lead, env) })
  return list
}

export async function deliverLead(
  lead: ContactLead,
  env: Env = process.env,
): Promise<DeliveryReport> {
  const list = tasks(lead, env)
  const results = await Promise.allSettled(list.map((task) => task.run()))

  const delivered: string[] = []
  const failed: string[] = []
  results.forEach((result, i) => {
    const { name } = list[i]
    if (result.status === 'fulfilled') {
      delivered.push(name)
    } else {
      failed.push(name)
      console.error(`[leads] échec ${name} pour ${maskEmail(lead.email)} :`, errorSummary(result.reason))
    }
  })

  let fallback: DeliveryReport['fallback'] = 'not-needed'
  if (failed.length > 0) {
    if (!fallbackConfigured(env)) {
      fallback = 'not-configured'
      console.error('[leads] email de secours non configuré (LEAD_FALLBACK_EMAIL, RESEND_API_KEY, LEAD_FALLBACK_FROM)')
    } else {
      try {
        await sendFallbackEmail(lead, failed, env)
        fallback = 'sent'
      } catch (error) {
        fallback = 'failed'
        console.error('[leads] échec de l’email de secours :', errorSummary(error))
      }
    }
  }

  const report: DeliveryReport = {
    stored: delivered.length > 0 || fallback === 'sent',
    delivered,
    failed,
    fallback,
  }

  console.info(
    `[leads] ${maskEmail(lead.email)} ${maskPhone(lead.phone)} → reçu : ${delivered.join(', ') || 'aucun'}` +
      (failed.length ? ` ; échec : ${failed.join(', ')} ; secours : ${fallback}` : ''),
  )
  return report
}
