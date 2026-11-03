import { ImageResponse } from 'next/og'

import { routing } from '@/i18n/routing'
import { cmsPageSeo, cmsPublicPaths } from '@/lib/cms/seo'
import { OG_SIZE, ogEyebrow, ogImageKey } from '@/lib/seo/og'
import { tokens } from '@/lib/tokens'

/**
 * Image de partage 1200 × 630 de chaque page : /og/<langue>__<chemin>.png
 * (voir lib/seo/og.ts). Un nom inconnu répond 404.
 *
 * Runtime edge, et non Node : sous Windows, la version Node de next/og
 * (Next 14.2) construit le chemin de ses polices avec path.join sur une URL
 * file:// et plante (« Invalid URL »). La version edge charge ses fichiers
 * par fetch et fonctionne partout. Contrepartie : l'image est rendue à la
 * première demande plutôt qu'au build, puis mise en cache.
 *
 * Polices : Syne ExtraBold et Outfit Medium, les polices du site, en TTF
 * statiques (le moteur de rendu ne lit pas le WOFF2 de next/font). Licence
 * SIL Open Font License.
 */

export const runtime = 'edge'

const load = (url: URL) => fetch(url).then((res) => res.arrayBuffer())

const syne = load(new URL('./Syne-ExtraBold.ttf', import.meta.url))
const outfit = load(new URL('./Outfit-Medium.ttf', import.meta.url))
const logo = load(new URL('../../../../public/logoCIPA.png', import.meta.url)).then((buffer) => {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return `data:image/png;base64,${btoa(binary)}`
})

/** La page de l'image, guides du CMS compris ; son titre est celui du CMS. */
async function findPage(key: string) {
  for (const path of await cmsPublicPaths())
    for (const locale of routing.locales)
      if (ogImageKey(path, locale) === key) return { path, locale }
  return undefined
}

/** Corps du titre selon sa longueur : trois lignes au plus. */
const titleSize = (title: string) => (title.length <= 40 ? 72 : title.length <= 48 ? 62 : 56)

export async function GET(_request: Request, { params }: { params: { image: string } }) {
  const page = await findPage(params.image)
  const seo = page && (await cmsPageSeo(page.path, page.locale))
  if (!page || !seo) return new Response('Not found', { status: 404 })

  const [logoSrc, syneData, outfitData] = await Promise.all([logo, syne, outfit])
  const gold = tokens.color.gold.DEFAULT
  const dark = tokens.color.dark.DEFAULT

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: dark,
          backgroundImage:
            'radial-gradient(circle at 88% 8%, rgba(218,162,80,0.28), rgba(12,13,18,0) 52%)',
          fontFamily: 'Outfit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={logoSrc} width={176} height={88} />
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 999,
              border: `1.5px solid ${gold}66`,
              color: gold,
              fontSize: 24,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {ogEyebrow(page.path, page.locale)}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            maxWidth: 1000,
            fontFamily: 'Syne',
            fontSize: titleSize(seo.title),
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: '#F4F3EE',
          }}
        >
          {seo.title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 4, borderRadius: 4, backgroundColor: gold }} />
          <div style={{ fontSize: 26, color: 'rgba(244,243,238,0.65)' }}>industryx0.pro</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Syne', data: syneData, weight: 800, style: 'normal' },
        { name: 'Outfit', data: outfitData, weight: 500, style: 'normal' },
      ],
      // Le contenu d'une image ne change qu'avec le titre de sa page, au
      // déploiement suivant : un jour de cache navigateur, une semaine en CDN.
      // En minuscules : la clé remplace celle que pose ImageResponse (un an,
      // immutable) au lieu de s'y ajouter.
      headers: { 'cache-control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' },
    },
  )
}
