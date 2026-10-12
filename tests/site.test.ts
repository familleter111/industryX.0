import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { pageMetadata } from '@/lib/i18n'
import { SITE_URL, publicPaths } from '@/lib/site'

const APP = path.resolve(__dirname, '../src/app/[locale]')

/** Chemins des pages statiques présentes sur le disque (hors segments [slug]). */
function staticPagesOnDisk(dir = APP, prefix = ''): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (!statSync(full).isDirectory()) {
      if (entry === 'page.tsx') out.push(prefix || '/')
      continue
    }
    if (entry.startsWith('[')) continue
    // Les groupes de routes « (marketing) » n'apparaissent pas dans l'URL.
    const segment = entry.startsWith('(') ? '' : `/${entry}`
    out.push(...staticPagesOnDisk(full, prefix + segment))
  }
  return out
}

describe('publicPaths', () => {
  it('liste chaque page statique de src/app', () => {
    expect(publicPaths()).toEqual(expect.arrayContaining(staticPagesOnDisk()))
  })

  it('ne contient ni doublon ni /about', () => {
    const paths = publicPaths()
    expect(new Set(paths).size).toBe(paths.length)
    expect(paths).not.toContain('/about')
  })

  it('inclut les industries servies par la route [slug]', () => {
    expect(publicPaths()).toContain('/industries/automotive')
  })
})

describe('sitemap', () => {
  const entries = sitemap()

  it('donne chaque page en français et en anglais, en URL absolue', () => {
    expect(entries).toHaveLength(publicPaths().length * 2)
    for (const { url } of entries) expect(url.startsWith(SITE_URL)).toBe(true)
    expect(entries.map((e) => e.url)).toEqual(
      expect.arrayContaining([
        SITE_URL + '/',
        SITE_URL + '/en',
        SITE_URL + '/contact',
        SITE_URL + '/en/contact',
      ]),
    )
  })

  it('relie les deux langues par hreflang', () => {
    const contact = entries.find((e) => e.url === SITE_URL + '/en/contact')
    expect(contact?.alternates?.languages).toEqual({
      fr: SITE_URL + '/contact',
      en: SITE_URL + '/en/contact',
    })
  })
})

describe('robots', () => {
  it('pointe vers le sitemap et ferme /api', () => {
    const result = robots()
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`)
    expect(result.rules).toMatchObject({ disallow: '/api/' })
  })
})

describe('pageMetadata', () => {
  it('pose canonical et hreflang selon la langue', () => {
    const meta = pageMetadata({ locale: 'en', path: '/faq', title: 'FAQ', description: '…' })
    expect(meta.alternates).toEqual({
      canonical: '/en/faq',
      languages: { fr: '/faq', en: '/en/faq', 'x-default': '/faq' },
    })
  })
})
