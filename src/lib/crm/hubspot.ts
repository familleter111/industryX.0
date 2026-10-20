/**
 * HubSpot — API CRM v3, jeton d'application privée (Private App).
 *
 *   1. Contact créé ou mis à jour par email :
 *      POST /crm/v3/objects/contacts/batch/upsert, idProperty = email.
 *   2. Affaire dans le pipeline, à l'étape Qualification, associée au contact
 *      (type d'association 3 : deal → contact) : POST /crm/v3/objects/deals.
 *   3. Note portant le message, associée au contact (202) et à l'affaire
 *      (214) : POST /crm/v3/objects/notes.
 *
 * Portées du jeton : crm.objects.contacts.write, crm.objects.deals.write.
 * La propriété de contact `industrie` doit exister (docs/leads-integration.md).
 */

import { requestJson } from '@/lib/leads/http'
import {
  dealTitle,
  noteHtml,
  optionalEnv,
  requiredEnv,
  type ContactLead,
  type CrmProvider,
  type Env,
} from '@/lib/crm/types'

const API = 'https://api.hubapi.com'

const ASSOCIATION = { dealToContact: 3, noteToContact: 202, noteToDeal: 214 } as const

type UpsertResponse = { results: { id: string }[] }
type CreateResponse = { id: string }

const association = (id: string, typeId: number) => ({
  to: { id },
  types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: typeId }],
})

/** Propriétés du contact ; les champs vides ne sont pas envoyés (rien n'est effacé). */
export function hubspotContactProperties(lead: ContactLead): Record<string, string> {
  const properties: Record<string, string> = {
    email: lead.email,
    firstname: lead.firstName,
    lastname: lead.lastName,
    company: lead.company,
    phone: lead.phone,
    industrie: lead.industryKey,
  }
  return Object.fromEntries(Object.entries(properties).filter(([, value]) => value))
}

export function createHubspotProvider(env: Env = process.env): CrmProvider {
  const token = requiredEnv(env, 'HUBSPOT_ACCESS_TOKEN')
  const pipeline = optionalEnv(env, 'HUBSPOT_PIPELINE_ID') ?? 'default'
  const stage = requiredEnv(env, 'HUBSPOT_DEAL_STAGE_ID')

  const post = <T>(path: string, body: unknown) =>
    requestJson<T>(`${API}${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

  return {
    name: 'hubspot',
    async upsertLead(lead) {
      const upsert = await post<UpsertResponse>('/crm/v3/objects/contacts/batch/upsert', {
        inputs: [{ idProperty: 'email', id: lead.email, properties: hubspotContactProperties(lead) }],
      })
      const contactId = upsert.results[0]?.id
      if (!contactId) throw new Error('HubSpot : identifiant du contact absent de la réponse')

      const deal = await post<CreateResponse>('/crm/v3/objects/deals', {
        properties: { dealname: dealTitle(lead), pipeline, dealstage: stage },
        associations: [association(contactId, ASSOCIATION.dealToContact)],
      })

      await post('/crm/v3/objects/notes', {
        properties: { hs_timestamp: lead.submittedAt, hs_note_body: noteHtml(lead) },
        associations: [
          association(contactId, ASSOCIATION.noteToContact),
          association(deal.id, ASSOCIATION.noteToDeal),
        ],
      })
    },
  }
}
