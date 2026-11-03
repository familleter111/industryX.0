/**
 * Résout l'alias `@/…` (tsconfig.json) pour les scripts Node qui importent
 * directement le code du site, comme cms-seed.mjs : `@/lib/cms/guides` →
 * src/lib/cms/guides.ts. Node retire lui-même les types des fichiers .ts.
 *
 * À importer avant tout module du site.
 */

import { existsSync } from 'node:fs'
import { registerHooks } from 'node:module'

const SRC = new URL('../src/', import.meta.url)

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
      const base = new URL(specifier.slice(2), SRC).href
      const found = ['.ts', '/index.ts', ''].map((ext) => base + ext).find((url) => existsSync(new URL(url)))
      if (found) return nextResolve(found, context)
    }
    return nextResolve(specifier, context)
  },
})
