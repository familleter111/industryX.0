/**
 * CRM actif, choisi par CRM_PROVIDER : hubspot | brevo | pipedrive | none.
 * Vide ou `none` : aucun CRM (le webhook et le tableur restent actifs).
 *
 * Une valeur inconnue ou une variable manquante lève une erreur à l'envoi :
 * la livraison la compte comme un échec et déclenche l'email de secours,
 * plutôt que d'ignorer en silence une configuration cassée.
 */

import { createBrevoProvider } from '@/lib/crm/brevo'
import { createHubspotProvider } from '@/lib/crm/hubspot'
import { createPipedriveProvider } from '@/lib/crm/pipedrive'
import type { CrmProvider, Env } from '@/lib/crm/types'

export type { ContactLead, CrmProvider, Env } from '@/lib/crm/types'

const FACTORIES: Record<string, (env: Env) => CrmProvider> = {
  hubspot: createHubspotProvider,
  brevo: createBrevoProvider,
  pipedrive: createPipedriveProvider,
}

/** Le CRM configuré, ou `null` si aucun. */
export function getCrmProvider(env: Env = process.env): CrmProvider | null {
  const name = env.CRM_PROVIDER?.trim().toLowerCase() || 'none'
  if (name === 'none') return null
  const factory = FACTORIES[name]
  if (!factory) throw new Error(`CRM_PROVIDER inconnu : ${name}`)
  return factory(env)
}
