import { afterEach, describe, expect, it, vi } from 'vitest'

import { clean, clientIp, createRateLimiter } from '@/lib/server/rateLimit'

afterEach(() => vi.useRealTimers())

describe('createRateLimiter', () => {
  it('bloque au-delà du quota, puis libère après la fenêtre', () => {
    vi.useFakeTimers()
    const limited = createRateLimiter(2, 1000)
    expect(limited('1.1.1.1')).toBe(false)
    expect(limited('1.1.1.1')).toBe(false)
    expect(limited('1.1.1.1')).toBe(true)
    // Une autre IP a son propre quota.
    expect(limited('2.2.2.2')).toBe(false)
    vi.advanceTimersByTime(1001)
    expect(limited('1.1.1.1')).toBe(false)
  })
})

describe('clientIp', () => {
  it('prend la première adresse de x-forwarded-for', () => {
    const request = new Request('http://x', { headers: { 'x-forwarded-for': '9.9.9.9, 10.0.0.1' } })
    expect(clientIp(request)).toBe('9.9.9.9')
  })

  it('se rabat sur x-real-ip', () => {
    const request = new Request('http://x', { headers: { 'x-real-ip': ' 8.8.8.8 ' } })
    expect(clientIp(request)).toBe('8.8.8.8')
  })
})

describe('clean', () => {
  it('coupe et borne les chaînes, ignore le reste', () => {
    expect(clean('  abc  ', 2)).toBe('ab')
    expect(clean(42, 10)).toBe('')
  })
})
