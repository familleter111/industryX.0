import type { MetadataRoute } from 'next'

import { BRAND } from '@/lib/site'
import { tokens } from '@/lib/tokens'

/**
 * Manifeste web (/manifest.webmanifest) : nom et icônes du site quand il est
 * épinglé ou ajouté à l'écran d'accueil. Les icônes sont celles de
 * app/icon.png et app/apple-icon.png.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.siteName,
    short_name: BRAND.product,
    description:
      'Logiciel qualité, audits, non-conformités et CAPA pour l’industrie, par Industry X.0.',
    start_url: '/',
    display: 'browser',
    background_color: tokens.color.cream.DEFAULT,
    theme_color: tokens.color.dark.DEFAULT,
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
