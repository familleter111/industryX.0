import { createHmac } from 'node:crypto'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { deliverLead } from '@/lib/leads/deliver'
import { maskEmail, maskPhone, requestJson } from '@/lib/leads/http'
import { sendWebhook, signPayload } from '@/lib/leads/webhook'

import { LEAD, mockFetch } from './leads-fixtures'

const { appendLead } = vi.hoisted(() => ({ appendLead: vi.fn() }))
vi.mock('@/services/leads', () => ({ appendLead }))

const WEBHOOK = { LEAD_WEBHOOK_URL: 'https://n8n.example.com/webhook/leads', LEAD_WEBHOOK_SECRET: 's3cret' }
const FALLBACK = {
  LEAD_FALLBACK_EMAIL: 'commercial@industryx0.pro',
  LEAD_FALLBACK_FROM: 'Leads <leads@industryx0.pro>',
  RESEND_API_KEY: 're_123',
}

beforeEach(() => {
  appendLead.mockReset()
  appendLead.mockResolvedValue({ file: 'contacts.xlsx', format: 'xlsx' })
  vi.spyOn(console, 'info').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('webhook', () => {
  it('poste le lead complet, signé HMAC SHA-256 sur le corps brut', async () => {
    const calls = mockFetch(() => ({ body: 'Accepted' }))
    await sendWebhook(LEAD, WEBHOOK)

    const [call] = calls
    expect(call.url).toBe(WEBHOOK.LEAD_WEBHOOK_URL)
    const expected = createHmac('sha256', 's3cret').update(call.raw).digest('hex')
    expect(call.headers['X-Signature']).toBe(`sha256=${expected}`)
    expect(call.body).toMatchObject({ event: 'lead.created', id: call.headers['X-Lead-Id'], lead: LEAD })
  })

  it('refuse d’envoyer sans secret', async () => {
    mockFetch(() => ({}))
    await expect(sendWebhook(LEAD, { LEAD_WEBHOOK_URL: WEBHOOK.LEAD_WEBHOOK_URL })).rejects.toThrow(/SECRET/)
  })

  it('signPayload est stable', () => {
    expect(signPayload('{"a":1}', 'k')).toBe(signPayload('{"a":1}', 'k'))
    expect(signPayload('{"a":1}', 'k')).not.toBe(signPayload('{"a":2}', 'k'))
  })
})

describe('requestJson', () => {
  it('réessaie une fois sur 5xx, avec délai', async () => {
    let n = 0
    const calls = mockFetch(() => (++n === 1 ? { status: 503 } : { body: { ok: true } }))
    await expect(requestJson('https://x.example/a', { method: 'POST' }, { backoffMs: 1 })).resolves.toEqual({ ok: true })
    expect(calls).toHaveLength(2)
  })

  it('abandonne après deux essais', async () => {
    const calls = mockFetch(() => ({ status: 500 }))
    await expect(requestJson('https://x.example/a?token=secret', {}, { backoffMs: 1 })).rejects.toThrow(
      'HTTP 500 https://x.example/a',
    )
    expect(calls).toHaveLength(2)
  })

  it('coupe un appel trop long', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_, reject) => init.signal?.addEventListener('abort', () => reject(init.signal?.reason))),
      ),
    )
    await expect(requestJson('https://x.example/slow', {}, { timeoutMs: 20, attempts: 1 })).rejects.toThrow(
      /x.example\/slow/,
    )
  })
})

describe('deliverLead', () => {
  it('tableur seul : livré, sans secours', async () => {
    const report = await deliverLead(LEAD, {})
    expect(report).toEqual({ stored: true, delivered: ['tableur'], failed: [], fallback: 'not-needed' })
  })

  it('CRM et webhook en parallèle', async () => {
    const calls = mockFetch((call) => {
      if (call.url.includes('hubapi')) {
        return call.url.endsWith('upsert') ? { body: { results: [{ id: '1' }] } } : { body: { id: '2' } }
      }
      return { body: {} }
    })
    const env = { CRM_PROVIDER: 'hubspot', HUBSPOT_ACCESS_TOKEN: 't', HUBSPOT_DEAL_STAGE_ID: 's', ...WEBHOOK }

    const report = await deliverLead(LEAD, env)

    expect(report.delivered).toEqual(['tableur', 'crm:hubspot', 'webhook'])
    expect(calls.some((c) => c.url === WEBHOOK.LEAD_WEBHOOK_URL)).toBe(true)
  })

  it('échec du CRM : succès quand même, email de secours envoyé', async () => {
    const calls = mockFetch((call) => (call.url.includes('resend') ? { body: { id: 'em_1' } } : { status: 500 }))
    const env = { CRM_PROVIDER: 'brevo', BREVO_API_KEY: 'k', ...FALLBACK }

    const report = await deliverLead(LEAD, env)

    expect(report).toMatchObject({ stored: true, failed: ['crm:brevo'], fallback: 'sent' })
    const email = calls.find((c) => c.url === 'https://api.resend.com/emails')!
    expect(email.headers.Authorization).toBe('Bearer re_123')
    expect(email.body).toMatchObject({ to: ['commercial@industryx0.pro'], reply_to: LEAD.email })
    expect((email.body as { text: string }).text).toContain('crm:brevo')
  })

  it('configuration CRM cassée : comptée comme un échec', async () => {
    const report = await deliverLead(LEAD, { CRM_PROVIDER: 'pipedrive' })
    expect(report).toMatchObject({ stored: true, failed: ['crm:pipedrive'], fallback: 'not-configured' })
  })

  it('tout échoue : lead non enregistré', async () => {
    appendLead.mockRejectedValue(new Error('disque plein'))
    mockFetch(() => ({ status: 500 }))
    const report = await deliverLead(LEAD, { ...WEBHOOK, ...FALLBACK })
    expect(report).toMatchObject({ stored: false, fallback: 'failed' })
  })

  it('ne journalise ni l’email ni le téléphone en clair', async () => {
    appendLead.mockRejectedValue(new Error('disque plein'))
    await deliverLead(LEAD, {})
    const logged = [
      ...vi.mocked(console.error).mock.calls,
      ...vi.mocked(console.info).mock.calls,
    ]
      .flat()
      .join(' ')
    expect(logged).not.toContain(LEAD.email)
    expect(logged).not.toContain(LEAD.phone)
    expect(logged).toContain(maskEmail(LEAD.email))
  })
})

describe('masquage', () => {
  it('garde de quoi reconnaître sans exposer', () => {
    expect(maskEmail('amel@usine.tn')).toBe('a***@usine.tn')
    expect(maskPhone('+21620123456')).toBe('+216******56')
    expect(maskPhone('')).toBe('')
  })
})
