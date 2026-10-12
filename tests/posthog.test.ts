// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Faux PostHog : on vérifie ce que notre couche lui demande, sans réseau.
const { fake } = vi.hoisted(() => {
  const fake = {
    __loaded: false,
    init: vi.fn(() => {
      fake.__loaded = true
    }),
    capture: vi.fn(),
    register: vi.fn(),
    set_config: vi.fn(),
    startSessionRecording: vi.fn(),
    stopSessionRecording: vi.fn(),
    opt_out_capturing: vi.fn(),
    opt_in_capturing: vi.fn(),
    has_opted_out_capturing: vi.fn(() => false),
    get_distinct_id: vi.fn(() => 'ph-123'),
  }
  return { fake }
})
vi.mock('posthog-js', () => ({ default: fake }))

async function load(key: string) {
  vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', key)
  vi.resetModules()
  return import('@/lib/analytics/posthog')
}

function setConsent(value: string | null) {
  document.cookie = value ? `ix0_consent=${value}; Path=/` : 'ix0_consent=; Max-Age=0; Path=/'
}

beforeEach(() => {
  fake.__loaded = false
  vi.clearAllMocks()
  setConsent(null)
})

afterEach(() => vi.unstubAllEnvs())

describe('sans clé PostHog', () => {
  it('ne charge rien et track() ne fait rien', async () => {
    const { initPostHog, track, analyticsEnabled } = await load('')
    expect(analyticsEnabled).toBe(false)
    initPostHog(null, 'fr')
    track('chat_opened', { page: '/' })
    expect(fake.init).not.toHaveBeenCalled()
    expect(fake.capture).not.toHaveBeenCalled()
  })
})

describe('avec une clé', () => {
  it('démarre en mémoire tant que le visiteur n’a pas répondu', async () => {
    const { initPostHog } = await load('phc_test')
    initPostHog(null, 'fr')
    expect(fake.init).toHaveBeenCalledWith(
      'phc_test',
      expect.objectContaining({ api_host: '/ingest', persistence: 'memory', capture_pageview: false, autocapture: false }),
    )
    expect(fake.startSessionRecording).not.toHaveBeenCalled()
  })

  it('persiste et enregistre les sessions après acceptation', async () => {
    const { initPostHog } = await load('phc_test')
    initPostHog('granted', 'en')
    expect(fake.init).toHaveBeenCalledWith('phc_test', expect.objectContaining({ persistence: 'localStorage+cookie' }))
    expect(fake.register).toHaveBeenCalledWith({ locale: 'en' })
    expect(fake.startSessionRecording).toHaveBeenCalled()
  })

  it('ne démarre pas si le visiteur a refusé, et n’envoie rien', async () => {
    setConsent('denied')
    const { initPostHog, track } = await load('phc_test')
    initPostHog('denied', 'fr')
    track('chat_opened', { page: '/' })
    expect(fake.init).not.toHaveBeenCalled()
    expect(fake.capture).not.toHaveBeenCalled()
  })

  it('garde les événements émis avant le démarrage, puis les envoie', async () => {
    const { initPostHog, track } = await load('phc_test')
    track('guide_viewed', { slug: 'x', category: 'Terrain' })
    expect(fake.capture).not.toHaveBeenCalled()
    initPostHog(null, 'fr')
    expect(fake.capture).toHaveBeenCalledWith('guide_viewed', { slug: 'x', category: 'Terrain' })
  })

  it('applyConsent : un refus coupe tout, une acceptation passe en persistant', async () => {
    const { initPostHog, applyConsent } = await load('phc_test')
    initPostHog(null, 'fr')
    applyConsent('denied', 'fr')
    expect(fake.opt_out_capturing).toHaveBeenCalled()

    fake.has_opted_out_capturing.mockReturnValueOnce(true)
    applyConsent('granted', 'fr')
    expect(fake.opt_in_capturing).toHaveBeenCalled()
    expect(fake.set_config).toHaveBeenCalledWith({ persistence: 'localStorage+cookie' })
  })

  it('distinctId() rend l’identifiant seulement si PostHog tourne', async () => {
    const { initPostHog, distinctId } = await load('phc_test')
    expect(distinctId()).toBeUndefined()
    initPostHog(null, 'fr')
    expect(distinctId()).toBe('ph-123')
  })
})
