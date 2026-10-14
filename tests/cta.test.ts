// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'

import { ctaFromClick } from '@/lib/analytics/cta'

function render(html: string): HTMLElement {
  document.body.innerHTML = html
  return document.body
}

describe('ctaFromClick', () => {
  it('reconnaît un lien vers /contact et sa zone', () => {
    const body = render(`<section data-cta-location="hero"><a href="/contact"><span id="t">Planifier une démo</span></a></section>`)
    expect(ctaFromClick(body.querySelector('#t'))).toEqual({
      cta_id: 'contact_hero',
      cta_label: 'Planifier une démo',
      location: 'hero',
      destination: '/contact',
    })
  })

  it('reconnaît la version anglaise, dans le pied de page', () => {
    const body = render(`<footer><a href="/en/contact?x=1#form">Contact</a></footer>`)
    expect(ctaFromClick(body.querySelector('a'))).toMatchObject({ location: 'footer', destination: '/en/contact' })
  })

  it('prend l’en-tête pour la navbar', () => {
    const body = render(`<header><nav><a href="/contact">Démo</a></nav></header>`)
    expect(ctaFromClick(body.querySelector('a'))?.location).toBe('navbar')
  })

  it('suit un data-cta explicite, même hors /contact', () => {
    const body = render(`<a data-cta="entiwin_hero" href="https://entiwin.example/">Tester Enti Win</a>`)
    expect(ctaFromClick(body.querySelector('a'))).toMatchObject({
      cta_id: 'entiwin_hero',
      location: 'page',
      destination: '/',
    })
  })

  it('ignore les autres liens et les clics hors lien', () => {
    const body = render(`<a href="/faq">FAQ</a><p id="p">texte</p>`)
    expect(ctaFromClick(body.querySelector('a'))).toBeNull()
    expect(ctaFromClick(body.querySelector('#p'))).toBeNull()
    expect(ctaFromClick(null)).toBeNull()
  })
})
