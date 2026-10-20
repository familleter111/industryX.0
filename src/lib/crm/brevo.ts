/**
 * Brevo — API v3, clé API (en-tête `api-key`).
 *
 *   1. Contact créé ou mis à jour : POST /v3/contacts, updateEnabled = true,
 *      attribut INDUSTRIE, ajout à la liste BREVO_LIST_ID si renseignée.
 *   2. Si BREVO_PIPELINE_ID et BREVO_DEAL_STAGE_ID sont renseignés (module
 *      Ventes / CRM de Brevo) :
 *        - identifiant du contact : dans la réponse 201 d'une création, sinon
 *          GET /v3/contacts/{email}?identifierType=email_id ;
 *        - affaire : POST /v3/crm/deals, attributs pipeline et deal_stage ;
 *        - note portant le message : POST /v3/crm/notes.
 *
 * Les attributs INDUSTRIE et SOCIETE doivent exister dans Brevo
 * (docs/leads-integration.md). Le téléphone va dans l'attribut SMS ; s'il est
 * déjà porté par un autre contact, Brevo refuse l'envoi : on réessaie alors
 * sans lui plutôt que de perdre le contact.
 */

import { HttpError, requestJson } from '@/lib/leads/http'
import {
  dealTitle,
  noteHtml,
  optionalEnv,
  requiredEnv,
  type ContactLead,
  type CrmProvider,
  type Env,
} from '@/lib/crm/types'

const API = 'https://api.brevo.com/v3'

/** Corps de POST /v3/contacts. */
export function brevoContactBody(lead: ContactLead, listId?: number, withPhone = true) {
  const attributes: Record<string, string> = {
    FIRSTNAME: lead.firstName,
    LASTNAME: lead.lastName,
    SOCIETE: lead.company,
    INDUSTRIE: lead.industryKey,
  }
  if (withPhone && lead.phone) attributes.SMS = lead.phone
  return {
    email: lead.email,
    attributes,
    ...(listId ? { listIds: [listId] } : {}),
    updateEnabled: true,
  }
}

export function createBrevoProvider(env: Env = process.env): CrmProvider {
  const key = requiredEnv(env, 'BREVO_API_KEY')
  const listValue = optionalEnv(env, 'BREVO_LIST_ID')
  const listId = listValue ? Number(listValue) : undefined
  if (listValue && !Number.isInteger(listId)) throw new Error('BREVO_LIST_ID doit être un nombre')
  const pipeline = optionalEnv(env, 'BREVO_PIPELINE_ID')
  const stage = optionalEnv(env, 'BREVO_DEAL_STAGE_ID')

  const call = <T>(method: 'GET' | 'POST', path: string, body?: unknown) =>
    requestJson<T>(`${API}${path}`, {
      method,
      headers: { 'api-key': key, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })

  async function upsertContact(lead: ContactLead): Promise<number | undefined> {
    try {
      const created = await call<{ id?: number } | null>('POST', '/contacts', brevoContactBody(lead, listId))
      return created?.id
    } catch (error) {
      const phoneTaken = error instanceof HttpError && error.status === 400 && /SMS/i.test(error.body)
      if (!phoneTaken) throw error
      const created = await call<{ id?: number } | null>('POST', '/contacts', brevoContactBody(lead, listId, false))
      return created?.id
    }
  }

  return {
    name: 'brevo',
    async upsertLead(lead) {
      const createdId = await upsertContact(lead)
      if (!pipeline || !stage) return

      // Mise à jour d'un contact existant : 204 sans corps, donc sans id.
      const contactId =
        createdId ??
        (
          await call<{ id: number }>(
            'GET',
            `/contacts/${encodeURIComponent(lead.email)}?identifierType=email_id`,
          )
        ).id

      const deal = await call<{ id: string }>('POST', '/crm/deals', {
        name: dealTitle(lead),
        attributes: { pipeline, deal_stage: stage },
        linkedContactsIds: [contactId],
      })

      await call('POST', '/crm/notes', {
        text: noteHtml(lead),
        contactIds: [contactId],
        dealIds: [deal.id],
      })
    },
  }
}
