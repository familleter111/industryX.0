import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { GET } from '@/app/api/chat/faq/[locale]/route'
import { chatFaq, chatFaqPath, prefetchChatFaq, resetChatFaq } from '@/lib/chat/faq'
import { chatKnowledge } from '@/lib/chat/knowledge'
import { faqReply, localReply } from '@/lib/chat/local'
import { faqFromCms } from '@/lib/cms/faq'
import { FAQ_ENTRIES, type FaqEntry } from '@/lib/data/faq'

import { mockFetch } from './leads-fixtures'

/** FAQ publiée dans le Studio : réordonnée, une réponse corrigée, une question nouvelle sans identifiant. */
const PUBLISHED: FaqEntry[] = [
  { question: 'Nouvelle question ?', answer: 'Réponse sans identifiant.' },
  { id: 'industries', question: 'Quels secteurs ?', answer: 'Six secteurs, détaillés sur le site.' },
  { id: 'demo-duration', question: 'Durée de la démo ?', answer: 'Trente minutes, corrigé dans le Studio.' },
]

beforeEach(() => resetChatFaq())

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('identifiants de la FAQ', () => {
  it('chaque question du fichier a un identifiant, le même en français et en anglais', () => {
    const ids = FAQ_ENTRIES.fr.map((entry) => entry.id)
    expect(ids.every(Boolean)).toBe(true)
    expect(new Set(ids).size).toBe(ids.length)
    expect(FAQ_ENTRIES.en.map((entry) => entry.id)).toEqual(ids)
  })

  it('le CMS transmet son identifiant ; une question sans identifiant n’en a pas', () => {
    const list = faqFromCms(
      [
        { key: 'support', question: { fr: 'Q ?' }, answer: { fr: 'R.' } },
        { key: ' ', question: { fr: 'Q2 ?' }, answer: { fr: 'R2.' } },
      ],
      'fr',
    )
    expect(list).toEqual([{ id: 'support', question: 'Q ?', answer: 'R.' }, { question: 'Q2 ?', answer: 'R2.' }])
  })
})

describe('réponses locales avec la FAQ publiée', () => {
  it('reconnaît la question par identifiant, quel que soit l’ordre, avec la réponse du CMS', () => {
    expect(faqReply('Combien de temps dure une démo ?', 'fr', PUBLISHED)).toBe('Trente minutes, corrigé dans le Studio.')
    expect(faqReply('Quels secteurs couvrez-vous ?', 'fr', PUBLISHED)).toBe('Six secteurs, détaillés sur le site.')
  })

  it('une question retirée du CMS n’a plus de réponse locale', () => {
    expect(faqReply('Proposez-vous une formation ?', 'fr', PUBLISHED)).toBeUndefined()
    expect(faqReply('Proposez-vous une formation ?', 'fr')).toBe(FAQ_ENTRIES.fr.find((e) => e.id === 'support')?.answer)
  })

  it('localReply passe la FAQ publiée à la reconnaissance', () => {
    expect(localReply('Combien de temps dure une démo ?', 'fr', PUBLISHED)).toBe('Trente minutes, corrigé dans le Studio.')
  })
})

describe('chargement dans le widget (lib/chat/faq.ts)', () => {
  it('fichier local tant que rien n’est arrivé, puis la FAQ publiée, chargée une fois', async () => {
    const calls = mockFetch(() => ({ body: { faq: PUBLISHED } }))
    expect(chatFaq('fr')).toBe(FAQ_ENTRIES.fr)
    await prefetchChatFaq('fr')
    await prefetchChatFaq('fr')
    expect(calls.map((call) => call.url)).toEqual([chatFaqPath('fr')])
    expect(chatFaq('fr')).toEqual(PUBLISHED)
    expect(chatFaq('en')).toBe(FAQ_ENTRIES.en)
  })

  it('réponse inattendue ou panne : le fichier local, et un nouvel essai à la prochaine ouverture', async () => {
    mockFetch(() => ({ body: { faq: [{ question: 'sans réponse' }] } }))
    await prefetchChatFaq('fr')
    expect(chatFaq('fr')).toBe(FAQ_ENTRIES.fr)

    const calls = mockFetch(() => ({ status: 500 }))
    await prefetchChatFaq('fr')
    expect(calls).toHaveLength(1)
    expect(chatFaq('fr')).toBe(FAQ_ENTRIES.fr)
  })
})

describe('GET /api/chat/faq/[locale]', () => {
  const get = async (locale: 'fr' | 'en') =>
    (await (await GET(new Request(`http://localhost${chatFaqPath(locale)}`), { params: { locale } })).json()) as {
      faq: FaqEntry[]
    }

  it('sans CMS : la FAQ du fichier, identifiants compris', async () => {
    vi.stubEnv('SANITY_PROJECT_ID', '')
    expect((await get('en')).faq).toEqual(FAQ_ENTRIES.en)
  })

  it('avec CMS : la FAQ publiée', async () => {
    vi.stubEnv('SANITY_PROJECT_ID', 'abc123')
    mockFetch(() => ({ body: { result: [{ key: 'support', question: { fr: 'Q ?' }, answer: { fr: 'R.' } }] } }))
    expect((await get('fr')).faq).toEqual([{ id: 'support', question: 'Q ?', answer: 'R.' }])
  })
})

describe('base de connaissances de l’IA', () => {
  it('reprend la FAQ publiée à la place du fichier', () => {
    const base = chatKnowledge('fr', PUBLISHED)
    expect(base).toContain('Trente minutes, corrigé dans le Studio.')
    expect(base).not.toContain(FAQ_ENTRIES.fr[0].answer)
    expect(chatKnowledge('fr')).toContain(FAQ_ENTRIES.fr[0].answer)
  })
})
