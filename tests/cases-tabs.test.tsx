// @vitest-environment happy-dom
/**
 * Onglets des usages de l'accueil (L1-06) : un panneau par onglet, toujours
 * dans le HTML, et l'affichage qui suit l'onglet actif, même en changeant
 * vite d'onglet.
 */
import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/i18n', () => ({
  useCopy: (copy: Record<string, unknown>) => copy.fr,
  useCurrentLocale: () => 'fr',
}))
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))
vi.mock('@/components/ui/AnimatedMeshBackground', () => ({ default: () => null }))
vi.mock('@/components/ui/Section', () => ({
  default: ({ children }: { children: ReactNode }) => <section>{children}</section>,
}))

import CasesSection from '@/components/sections/CasesSection'
import { featureTabs } from '@/lib/data/features'

const TABS = featureTabs('fr')
const ALL = TABS.map((t) => t.id)

// React 18 : act() hors Testing Library.
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => root.render(<CasesSection availableScreenshots={ALL} />))
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

const tabs = () => Array.from(container.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
const visiblePanels = () => Array.from(container.querySelectorAll<HTMLElement>('[role="tabpanel"]')).filter((p) => !p.hidden)

function expectShown(index: number) {
  const tab = TABS[index]
  const panels = visiblePanels()
  expect(panels).toHaveLength(1)
  const panel = panels[0]
  expect(panel.id).toBe(`usage-panel-${tab.id}`)
  expect(panel.querySelector('h3')?.textContent).toBe(tab.title)
  const img = panel.querySelector('img')
  expect(img?.getAttribute('src')).toBe((tab.tablet ?? tab.screenshot).src)
  expect(img?.getAttribute('alt')).toBe(tab.screenshot.alt)
  expect(tabs()[index].getAttribute('aria-selected')).toBe('true')
  expect(tabs().filter((t) => t.getAttribute('aria-selected') === 'true')).toHaveLength(1)
}

describe('onglets des usages (accueil)', () => {
  it('rend les six onglets et les six panneaux, reliés par ARIA', () => {
    expect(tabs()).toHaveLength(6)
    expect(container.querySelector('[role="tablist"]')).not.toBeNull()
    for (const tab of tabs()) {
      const panel = container.querySelector(`#${tab.getAttribute('aria-controls')}`)
      expect(panel?.getAttribute('aria-labelledby')).toBe(tab.id)
    }
    expectShown(0)
  })

  it('suit des changements rapides 1 → 4 → 2 → 6 → 1', () => {
    for (const index of [0, 3, 1, 5, 0]) {
      act(() => tabs()[index].click())
      expectShown(index)
    }
  })

  it('se pilote au clavier : flèches, Début, Fin, un seul onglet tabulable', () => {
    const press = (key: string) =>
      act(() => {
        document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
      })
    act(() => tabs()[0].focus())
    press('ArrowRight')
    expectShown(1)
    expect(document.activeElement).toBe(tabs()[1])
    press('End')
    expectShown(5)
    press('ArrowRight') // boucle
    expectShown(0)
    press('ArrowLeft')
    expectShown(5)
    press('Home')
    expectShown(0)
    expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1, -1, -1, -1])
  })
})

describe('rendu serveur (règle 5)', () => {
  it('met le texte des six usages dans le HTML', () => {
    const html = renderToString(<CasesSection availableScreenshots={ALL} />)
    const escaped = (text: string) => text.replace(/&/g, '&amp;')
    for (const tab of TABS) {
      expect(html).toContain(escaped(tab.title))
      for (const bullet of tab.bullets) expect(html).toContain(escaped(bullet))
    }
    expect(html).toContain('Illustration — valeurs d’exemple')
  })
})
