import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  // JSX des composants testés (tests/*.test.tsx) : runtime automatique, comme Next.
  esbuild: { jsx: 'automatic' },
  resolve: {
    // Même alias que tsconfig.json : @/* → src/*
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    environment: 'node',
  },
})
