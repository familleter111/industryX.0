/**
 * Pipedrive — API v2 (v1 pour les notes), jeton API (en-tête `x-api-token`),
 * sur https://{PIPEDRIVE_COMPANY_DOMAIN}.pipedrive.com.
 *
 *   1. Organisation (société) : retrouvée par nom exact
 *      (GET /api/v2/organizations/search), sinon créée (POST /api/v2/organizations).
 *   2. Personne : retrouvée par email exact (GET /api/v2/persons/search),
 *      sinon créée et rattachée à l'organisation (POST /api/v2/persons).
 *   3. Affaire dans PIPEDRIVE_PIPELINE_ID, à l'étape PIPEDRIVE_STAGE_ID
 *      (Qualification), champ personnalisé industrie si
 *      PIPEDRIVE_INDUSTRY_FIELD_KEY est renseigné : POST /api/v2/deals.
 *   4. Note portant le message, sur l'affaire et la personne : POST /api/v1/notes.
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

type SearchResponse = { data?: { items?: { item: { id: number } }[] } | null }
type CreateResponse = { data: { id: number } }

const toInt = (value: string, name: string) => {
  const number = Number(value)
  if (!Number.isInteger(number)) throw new Error(`${name} doit être un nombre`)
  return number
}

export function pipedriveDealBody(
  lead: ContactLead,
  ids: { personId: number; orgId: number; pipelineId: number; stageId?: number; industryField?: string },
) {
  return {
    title: dealTitle(lead),
    person_id: ids.personId,
    org_id: ids.orgId,
    pipeline_id: ids.pipelineId,
    ...(ids.stageId ? { stage_id: ids.stageId } : {}),
    ...(ids.industryField ? { custom_fields: { [ids.industryField]: lead.industryKey } } : {}),
  }
}

export function createPipedriveProvider(env: Env = process.env): CrmProvider {
  const token = requiredEnv(env, 'PIPEDRIVE_API_TOKEN')
  const domain = requiredEnv(env, 'PIPEDRIVE_COMPANY_DOMAIN')
  const pipelineId = toInt(requiredEnv(env, 'PIPEDRIVE_PIPELINE_ID'), 'PIPEDRIVE_PIPELINE_ID')
  const stageValue = optionalEnv(env, 'PIPEDRIVE_STAGE_ID')
  const stageId = stageValue ? toInt(stageValue, 'PIPEDRIVE_STAGE_ID') : undefined
  const industryField = optionalEnv(env, 'PIPEDRIVE_INDUSTRY_FIELD_KEY')

  const base = `https://${domain}.pipedrive.com/api`
  const headers = { 'x-api-token': token, 'Content-Type': 'application/json', Accept: 'application/json' }

  const get = <T>(path: string, params: Record<string, string>) =>
    requestJson<T>(`${base}${path}?${new URLSearchParams(params)}`, { method: 'GET', headers })
  const post = <T>(path: string, body: unknown) =>
    requestJson<T>(`${base}${path}`, { method: 'POST', headers, body: JSON.stringify(body) })

  async function findId(path: string, term: string, field: string): Promise<number | undefined> {
    const found = await get<SearchResponse>(path, { term, fields: field, exact_match: 'true', limit: '1' })
    return found.data?.items?.[0]?.item.id
  }

  return {
    name: 'pipedrive',
    async upsertLead(lead) {
      const orgId =
        (await findId('/v2/organizations/search', lead.company, 'name')) ??
        (await post<CreateResponse>('/v2/organizations', { name: lead.company })).data.id

      const personId =
        (await findId('/v2/persons/search', lead.email, 'email')) ??
        (
          await post<CreateResponse>('/v2/persons', {
            name: `${lead.firstName} ${lead.lastName}`,
            emails: [{ value: lead.email, primary: true, label: 'work' }],
            ...(lead.phone ? { phones: [{ value: lead.phone, primary: true, label: 'work' }] } : {}),
            org_id: orgId,
          })
        ).data.id

      const deal = await post<CreateResponse>(
        '/v2/deals',
        pipedriveDealBody(lead, { personId, orgId, pipelineId, stageId, industryField }),
      )

      await post('/v1/notes', { content: noteHtml(lead), deal_id: deal.data.id, person_id: personId })
    },
  }
}
