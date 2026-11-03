import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import robots from '@/app/robots'
import PreviewBadge from '@/components/layout/PreviewBadge'
import { isPreview } from '@/lib/site'

afterEach(() => vi.unstubAllEnvs())

describe('préversion (NEXT_PUBLIC_SITE_ENV=preview)', () => {
  it('robots.txt ferme tout le site, sans sitemap', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', 'preview')
    expect(isPreview()).toBe(true)
    expect(robots()).toEqual({ rules: { userAgent: '*', disallow: '/' } })
  })

  it('en production : robots.txt habituel', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', '')
    expect(isPreview()).toBe(false)
    expect(robots()).toMatchObject({ rules: { allow: '/', disallow: '/api/' } })
  })

  it('le badge affiche la branche et le commit, seulement en préversion', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', 'preview')
    vi.stubEnv('NEXT_PUBLIC_PREVIEW_LABEL', 'hamza-src · 9236e80')
    expect(renderToStaticMarkup(PreviewBadge({ locale: 'fr' }))).toContain('Préversion · hamza-src · 9236e80')
    expect(renderToStaticMarkup(PreviewBadge({ locale: 'en' }))).toContain('Preview · hamza-src')

    vi.stubEnv('NEXT_PUBLIC_SITE_ENV', '')
    expect(PreviewBadge({ locale: 'fr' })).toBeNull()
  })
})
