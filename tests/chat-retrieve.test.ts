import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { chatPassages, slugify } from '@/lib/chat/passages'
import { chatSystemBlocks, chatSystemPrompt } from '@/lib/chat/prompt'
import { MIN_SCORE, rankPassages, retrievePassages, tokenize } from '@/lib/chat/retrieve'
import { chatRetrieval } from '@/lib/chat/server'
import { CHATBOT_BASE } from '@/lib/data/chatbotBase'
import { FAQ_ENTRIES } from '@/lib/data/faq'

// Faux SDK, comme dans tests/chat.test.ts : aucun appel réseau.
const { streamMock } = vi.hoisted(() => ({ streamMock: vi.fn() }))

vi.mock('@anthropic-ai/sdk', () => {
  class APIError extends Error {
    status = 500
  }
  class Anthropic {
    static APIError = APIError
    beta = {
      messages: {
        stream: (params: unknown) => {
          streamMock(params)
          return {
            async *[Symbol.asyncIterator]() {
              yield { type: 'content_block_delta', delta: { type: 'text_delta', text: 'Oui.' } }
            },
            finalMessage: async () => ({ stop_reason: 'end_turn' }),
            abort: vi.fn(),
          }
        },
      },
    }
  }
  return { default: Anthropic }
})

describe('découpage en passages', () => {
  it('est déterministe, aux identifiants uniques et stables', () => {
    const first = chatPassages('fr')
    const second = chatPassages('fr')
    expect(second.map((p) => p.id)).toEqual(first.map((p) => p.id))
    expect(new Set(first.map((p) => p.id)).size).toBe(first.length)
    expect(first.map((p) => p.id)).toEqual(expect.arrayContaining(['solution:remontee-terrain:audits', 'faq:demo-duration']))
  })

  it('couvre les sections Solution, la FAQ et les réponses de prospection', () => {
    const passages = chatPassages('fr')
    const bySource = (source: string) => passages.filter((p) => p.source === source)
    expect(bySource('base')).toHaveLength(CHATBOT_BASE.length)
    expect(bySource('faq')).toHaveLength(FAQ_ENTRIES.fr.length)
    expect(bySource('solution').length).toBeGreaterThanOrEqual(7)
    expect(bySource('solution')[0].url).toMatch(/^https:\/\/www\.industryx0\.pro\/plateforme\/.+#.+/)
  })

  it('prend la FAQ publiée passée en paramètre, avec un slug pour une question sans identifiant', () => {
    const faq = [{ question: 'Quel est le délai de mise en place ?', answer: 'Quelques semaines.' }]
    const ids = chatPassages('fr', faq).filter((p) => p.source === 'faq').map((p) => p.id)
    expect(ids).toEqual([`faq:${slugify('Quel est le délai de mise en place ?')}`])
    expect(slugify('Quel est le délai de mise en place ?')).toBe('quel-est-le-delai-de-mise-en-place')
  })

  it('adapte les liens à la langue', () => {
    const en = chatPassages('en').find((p) => p.text.includes('/plateforme/'))!
    expect(en.text + en.url).toContain('https://www.industryx0.pro/en/')
    expect(chatPassages('fr').some((p) => p.text.includes('/en/'))).toBe(false)
  })
})

describe('recherche par mots-clés', () => {
  const passages = chatPassages('fr')

  it('normalise accents, casse, ponctuation et mots vides', () => {
    expect(tokenize('Est-ce que l’INTÉGRATION à l’ERP fonctionne ?')).toEqual(['integration', 'erp', 'fonctionne'])
    // « integrations » sans accent trouve « Intégrations » ; « erp », la réponse validée.
    const ids = retrievePassages('integrations erp', passages).map((p) => p.id)
    expect(ids).toContain('solution:integrations:integrations')
    expect(ids).toContain('base:cipa-s-integre-t-elle-a-notre-erp')
  })

  it('retrouve, pour chaque question de prospection, sa propre réponse dans les 8 premiers', () => {
    const base = passages.filter((p) => p.source === 'base')
    const missed = CHATBOT_BASE.filter((entry, i) => {
      const top = rankPassages(entry.question, passages).slice(0, 8)
      return !top.some(({ passage }) => passage.id === base[i].id)
    })
    expect(missed.map((e) => e.question)).toEqual([])
  })

  it('renvoie les passages au-dessus du seuil, k au plus, les meilleurs d’abord', () => {
    const found = retrievePassages('CIPA fonctionne hors ligne ?', passages, 3)
    expect(found.length).toBeLessThanOrEqual(3)
    expect(found[0].id).toBe('base:mode-hors-ligne-en-atelier')
    expect(rankPassages('CIPA fonctionne hors ligne ?', passages)[0].score).toBeGreaterThanOrEqual(MIN_SCORE)
  })

  it('ne renvoie rien pour une question hors sujet', () => {
    for (const question of ['Quelle est la capitale de l’Australie ?', 'Raconte-moi une blague', 'Je veux acheter une voiture']) {
      expect(retrievePassages(question, passages)).toEqual([])
    }
  })

  it('complète une question de suivi par la précédente', () => {
    expect(retrievePassages('et pour la pharma ?', passages)).toEqual([])
    const ids = retrievePassages('et pour la pharma ?', passages, 8, 'Quels secteurs industriels sont couverts ?').map((p) => p.id)
    expect(ids[0]).toBe('faq:industries')
  })

  it('classe toujours pareil (index gardé en mémoire)', () => {
    const a = rankPassages('audit trail et traçabilité', passages).map(({ passage }) => passage.id)
    const b = rankPassages('audit trail et traçabilité', passages).map(({ passage }) => passage.id)
    expect(a).toEqual(b)
  })
})

describe('prompt système avec recherche', () => {
  it('CHAT_RETRIEVAL absent ou inconnu : prompt identique à l’actuel, un seul bloc', () => {
    expect(chatRetrieval({})).toBe('off')
    expect(chatRetrieval({ CHAT_RETRIEVAL: 'embeddings' })).toBe('off')
    expect(chatRetrieval({ CHAT_RETRIEVAL: ' Keyword ' })).toBe('keyword')
    expect(chatSystemBlocks('fr')).toEqual({ stable: chatSystemPrompt('fr') })
    expect(chatSystemBlocks('en', FAQ_ENTRIES.en).stable).toBe(chatSystemPrompt('en', FAQ_ENTRIES.en))
  })

  it('keyword : faits de base dans le bloc stable, passages dans le second', () => {
    const passages = retrievePassages('CIPA fonctionne hors ligne ?', chatPassages('fr'))
    const blocks = chatSystemBlocks('fr', undefined, passages)
    expect(blocks.stable).toContain('## Core facts')
    expect(blocks.stable).toContain('closest to the visitor')
    expect(blocks.stable).not.toContain('Q : Combien coûte CIPA ?')
    expect(blocks.retrieved).toContain('hors ligne')
    expect(chatSystemBlocks('fr', undefined, blocks.stable ? passages : []).stable).toBe(blocks.stable)
    expect(chatSystemBlocks('fr', undefined, []).retrieved).toContain('No passage of the site matches')
  })
})

describe('POST /api/chat avec CHAT_RETRIEVAL', () => {
  const env = { ...process.env }
  let ip = 0
  const post = async (question: string) => {
    const { POST } = await import('@/app/api/chat/route')
    return POST(
      new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: { host: 'localhost', origin: 'http://localhost', 'x-forwarded-for': `10.7.0.${++ip}` },
        body: JSON.stringify({ locale: 'fr', messages: [{ role: 'user', content: question }] }),
      }),
    )
  }

  beforeEach(() => {
    streamMock.mockReset()
    process.env.CHAT_PROVIDER = 'anthropic'
    process.env.ANTHROPIC_API_KEY = 'sk-test'
    delete process.env.CHAT_RETRIEVAL
  })
  afterEach(() => {
    process.env = { ...env }
  })

  it('sans la variable : un seul bloc système, identique à aujourd’hui', async () => {
    expect((await post('CIPA fonctionne hors ligne ?')).status).toBe(200)
    const { system } = streamMock.mock.calls[0][0]
    expect(system).toHaveLength(1)
    expect(system[0].text).toBe(chatSystemPrompt('fr'))
    expect(system[0].cache_control).toEqual({ type: 'ephemeral' })
  })

  it('keyword : bloc stable en cache, passages de la question sans cache', async () => {
    process.env.CHAT_RETRIEVAL = 'keyword'
    expect((await post('CIPA fonctionne hors ligne ?')).status).toBe(200)
    const { system } = streamMock.mock.calls[0][0]
    expect(system).toHaveLength(2)
    expect(system[0].cache_control).toEqual({ type: 'ephemeral' })
    expect(system[0].text).toContain('## Core facts')
    expect(system[1]).not.toHaveProperty('cache_control')
    expect(system[1].text).toContain('hors ligne')
    expect(system[1].text.length).toBeLessThan(chatSystemPrompt('fr').length / 3)
  })
})
