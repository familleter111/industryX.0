import { afterEach, describe, expect, it, vi } from 'vitest'

import { getCrmProvider } from '@/lib/crm'
import { createBrevoProvider } from '@/lib/crm/brevo'
import { createHubspotProvider, hubspotContactProperties } from '@/lib/crm/hubspot'
import { createPipedriveProvider } from '@/lib/crm/pipedrive'

import { LEAD, mockFetch } from './leads-fixtures'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getCrmProvider', () => {
  it('aucun CRM sans CRM_PROVIDER ou avec none', () => {
    expect(getCrmProvider({})).toBeNull()
    expect(getCrmProvider({ CRM_PROVIDER: 'none' })).toBeNull()
  })

  it('refuse un nom inconnu et une variable manquante', () => {
    expect(() => getCrmProvider({ CRM_PROVIDER: 'salesforce' })).toThrow(/inconnu/)
    expect(() => getCrmProvider({ CRM_PROVIDER: 'hubspot' })).toThrow(/HUBSPOT_ACCESS_TOKEN/)
  })

  it('choisit le CRM demandé, casse indifférente', () => {
    const env = { CRM_PROVIDER: 'Brevo', BREVO_API_KEY: 'k' }
    expect(getCrmProvider(env)?.name).toBe('brevo')
  })
})

describe('HubSpot', () => {
  const env = { HUBSPOT_ACCESS_TOKEN: 'pat-123', HUBSPOT_DEAL_STAGE_ID: 'qualif-1' }

  it('upsert du contact par email, affaire en Qualification, note associée', async () => {
    const calls = mockFetch((call) => {
      if (call.url.endsWith('/contacts/batch/upsert')) return { body: { status: 'COMPLETE', results: [{ id: '301' }] } }
      if (call.url.endsWith('/objects/deals')) return { status: 201, body: { id: '401' } }
      return { status: 201, body: { id: '501' } }
    })

    await createHubspotProvider(env).upsertLead(LEAD)

    expect(calls.map((c) => c.url)).toEqual([
      'https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert',
      'https://api.hubapi.com/crm/v3/objects/deals',
      'https://api.hubapi.com/crm/v3/objects/notes',
    ])
    expect(calls[0].headers.Authorization).toBe('Bearer pat-123')
    expect(calls[0].body).toEqual({
      inputs: [
        {
          idProperty: 'email',
          id: 'amel@usine.tn',
          properties: {
            email: 'amel@usine.tn',
            firstname: 'Amel',
            lastname: 'Ben Salah',
            company: 'Usine SA',
            phone: '+21620123456',
            industrie: 'pharma',
          },
        },
      ],
    })
    expect(calls[1].body).toMatchObject({
      properties: { dealname: 'Usine SA — Demande de démo CIPA', pipeline: 'default', dealstage: 'qualif-1' },
      associations: [{ to: { id: '301' }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] }],
    })
    const note = calls[2].body as { properties: Record<string, string>; associations: unknown[] }
    expect(note.properties.hs_timestamp).toBe(LEAD.submittedAt)
    expect(note.properties.hs_note_body).toContain('Démo &lt;CIPA&gt; svp')
    expect(note.associations).toEqual([
      { to: { id: '301' }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] },
      { to: { id: '401' }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 214 }] },
    ])
  })

  it('n’envoie pas de propriété vide (n’efface rien chez HubSpot)', () => {
    expect(hubspotContactProperties({ ...LEAD, phone: '' })).not.toHaveProperty('phone')
  })

  it('remonte une erreur 401 sans réessayer', async () => {
    const calls = mockFetch(() => ({ status: 401, body: { message: 'expired' } }))
    await expect(createHubspotProvider(env).upsertLead(LEAD)).rejects.toThrow('HTTP 401')
    expect(calls).toHaveLength(1)
  })
})

describe('Brevo', () => {
  const env = { BREVO_API_KEY: 'xkeysib', BREVO_LIST_ID: '7', BREVO_PIPELINE_ID: 'p1', BREVO_DEAL_STAGE_ID: 's1' }

  it('crée le contact (liste, INDUSTRIE), puis l’affaire et la note', async () => {
    const calls = mockFetch((call) => {
      if (call.url.endsWith('/contacts')) return { status: 201, body: { id: 21 } }
      if (call.url.endsWith('/crm/deals')) return { status: 201, body: { id: 'd1' } }
      return { body: { id: 'n1' } }
    })

    await createBrevoProvider(env).upsertLead(LEAD)

    expect(calls[0].headers['api-key']).toBe('xkeysib')
    expect(calls[0].body).toEqual({
      email: 'amel@usine.tn',
      attributes: {
        FIRSTNAME: 'Amel',
        LASTNAME: 'Ben Salah',
        SOCIETE: 'Usine SA',
        INDUSTRIE: 'pharma',
        SMS: '+21620123456',
      },
      listIds: [7],
      updateEnabled: true,
    })
    expect(calls[1]).toMatchObject({
      url: 'https://api.brevo.com/v3/crm/deals',
      body: { attributes: { pipeline: 'p1', deal_stage: 's1' }, linkedContactsIds: [21] },
    })
    expect(calls[2]).toMatchObject({
      url: 'https://api.brevo.com/v3/crm/notes',
      body: { contactIds: [21], dealIds: ['d1'] },
    })
  })

  it('contact existant (204) : retrouve son id par email avant l’affaire', async () => {
    const calls = mockFetch((call) => {
      if (call.method === 'POST' && call.url.endsWith('/contacts')) return { status: 204 }
      if (call.method === 'GET') return { body: { id: 99, email: LEAD.email } }
      return { status: 201, body: { id: 'x' } }
    })

    await createBrevoProvider(env).upsertLead(LEAD)

    expect(calls[1].url).toBe('https://api.brevo.com/v3/contacts/amel%40usine.tn?identifierType=email_id')
    expect(calls[2].body).toMatchObject({ linkedContactsIds: [99] })
  })

  it('numéro déjà pris : réessaie sans SMS', async () => {
    let first = true
    const calls = mockFetch(() => {
      if (first) {
        first = false
        return { status: 400, body: { code: 'duplicate_parameter', message: 'SMS is already associated with another Contact' } }
      }
      return { status: 201, body: { id: 5 } }
    })

    await createBrevoProvider({ BREVO_API_KEY: 'k' }).upsertLead(LEAD)

    expect(calls).toHaveLength(2)
    expect((calls[1].body as { attributes: object }).attributes).not.toHaveProperty('SMS')
  })

  it('sans pipeline configuré : contact seulement', async () => {
    const calls = mockFetch(() => ({ status: 201, body: { id: 1 } }))
    await createBrevoProvider({ BREVO_API_KEY: 'k' }).upsertLead(LEAD)
    expect(calls).toHaveLength(1)
    expect(calls[0].body).not.toHaveProperty('listIds')
  })
})

describe('Pipedrive', () => {
  const env = {
    PIPEDRIVE_API_TOKEN: 'tok',
    PIPEDRIVE_COMPANY_DOMAIN: 'industryx0',
    PIPEDRIVE_PIPELINE_ID: '3',
    PIPEDRIVE_STAGE_ID: '11',
    PIPEDRIVE_INDUSTRY_FIELD_KEY: 'a'.repeat(40),
  }

  it('crée organisation et personne absentes, puis affaire et note', async () => {
    const calls = mockFetch((call) => {
      if (call.url.includes('/search')) return { body: { success: true, data: { items: [] } } }
      if (call.url.endsWith('/v2/organizations')) return { body: { success: true, data: { id: 70 } } }
      if (call.url.endsWith('/v2/persons')) return { body: { success: true, data: { id: 80 } } }
      if (call.url.endsWith('/v2/deals')) return { body: { success: true, data: { id: 90 } } }
      return { body: { success: true, data: { id: 1 } } }
    })

    await createPipedriveProvider(env).upsertLead(LEAD)

    const base = 'https://industryx0.pipedrive.com/api'
    expect(calls.map((c) => `${c.method} ${c.url.split('?')[0]}`)).toEqual([
      `GET ${base}/v2/organizations/search`,
      `POST ${base}/v2/organizations`,
      `GET ${base}/v2/persons/search`,
      `POST ${base}/v2/persons`,
      `POST ${base}/v2/deals`,
      `POST ${base}/v1/notes`,
    ])
    expect(calls[0].headers['x-api-token']).toBe('tok')
    expect(new URL(calls[2].url).searchParams.get('term')).toBe('amel@usine.tn')
    expect(calls[3].body).toEqual({
      name: 'Amel Ben Salah',
      emails: [{ value: 'amel@usine.tn', primary: true, label: 'work' }],
      phones: [{ value: '+21620123456', primary: true, label: 'work' }],
      org_id: 70,
    })
    expect(calls[4].body).toEqual({
      title: 'Usine SA — Demande de démo CIPA',
      person_id: 80,
      org_id: 70,
      pipeline_id: 3,
      stage_id: 11,
      custom_fields: { ['a'.repeat(40)]: 'pharma' },
    })
    expect(calls[5].body).toMatchObject({ deal_id: 90, person_id: 80 })
  })

  it('réutilise organisation et personne existantes', async () => {
    const calls = mockFetch((call) => {
      if (call.url.includes('/organizations/search')) return { body: { data: { items: [{ item: { id: 7 } }] } } }
      if (call.url.includes('/persons/search')) return { body: { data: { items: [{ item: { id: 8 } }] } } }
      return { body: { data: { id: 9 } } }
    })

    await createPipedriveProvider(env).upsertLead(LEAD)

    expect(calls.filter((c) => c.method === 'POST').map((c) => c.url.split('/api')[1])).toEqual([
      '/v2/deals',
      '/v1/notes',
    ])
    expect(calls[2].body).toMatchObject({ person_id: 8, org_id: 7 })
  })

  it('refuse un identifiant de pipeline non numérique', () => {
    expect(() => createPipedriveProvider({ ...env, PIPEDRIVE_PIPELINE_ID: 'ventes' })).toThrow(/nombre/)
  })
})
