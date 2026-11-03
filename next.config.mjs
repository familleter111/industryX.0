import createNextIntlPlugin from 'next-intl/plugin'

// Branche src/i18n/request.ts : c'est lui qui donne la langue de chaque requête.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Relais PostHog (région UE par défaut) : voir src/lib/analytics/posthog.ts.
const POSTHOG_HOST = process.env.POSTHOG_INGEST_HOST || 'https://eu.i.posthog.com'
const POSTHOG_ASSETS = process.env.POSTHOG_ASSETS_HOST || 'https://eu-assets.i.posthog.com'

/**
 * En-têtes de sécurité de toutes les réponses. Pas de Content-Security-Policy
 * ici : les scripts en ligne de Next, GA4 et PostHog demandent une politique à
 * construire et tester à part (voir SEO-REPORT.md).
 */
const SECURITY_HEADERS = [
  // HTTPS seulement, un an ; sans includeSubDomains, qui engagerait des
  // sous-domaines que ce dépôt ne connaît pas.
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ne pas annoncer la pile technique dans chaque réponse.
  poweredByHeader: false,
  // Projet Sanity (public, pas un secret) figé au build, côté serveur aussi :
  // une page régénérée en production lit le même projet que la build, même si
  // le serveur ne déclare pas ces variables. Voir src/lib/cms/client.ts.
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ?? '',
    SANITY_DATASET: process.env.SANITY_DATASET ?? '',
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }]
  },
  // Les événements partent vers /ingest sur notre domaine, que Next relaie à
  // PostHog : les bloqueurs de publicité ne coupent pas un appel au site.
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: `${POSTHOG_ASSETS}/static/:path*` },
      { source: '/ingest/:path*', destination: `${POSTHOG_HOST}/:path*` },
    ]
  },
  // PostHog appelle /ingest/e/ : sans ceci, Next le redirige vers /ingest/e.
  skipTrailingSlashRedirect: true,
  // /about faisait doublon avec /entreprise : les anciens liens y sont renvoyés.
  async redirects() {
    return [
      { source: '/about', destination: '/entreprise', permanent: true },
      { source: '/en/about', destination: '/en/entreprise', permanent: true },
      // La FAQ est devenue une section de l'accueil.
      { source: '/faq', destination: '/#faq', permanent: true },
      { source: '/en/faq', destination: '/en#faq', permanent: true },
      // Les trois anciennes pages Plateforme, eclatees en sept pages Solution
      // (lib/data/platform.ts) : chacune renvoie vers la page qui reprend
      // l'essentiel de son contenu.
      ...[
        ['terrain', 'remontee-terrain'],
        ['qualite', 'gestion-ecarts'],
        ['pilotage', 'pilotage-performance'],
      ].flatMap(([from, to]) => [
        { source: `/plateforme/${from}`, destination: `/plateforme/${to}`, permanent: true },
        { source: `/en/plateforme/${from}`, destination: `/en/plateforme/${to}`, permanent: true },
      ]),
      // Onglets de l'accueil de l'ancien site (/solutions/<onglet>, 404 à
      // l'audit du 14/10/2026) : chacun mène à l'usage qu'il présentait,
      // comme les onglets actuels (lib/data/features.ts).
      // L1-02 : provisoire. Quand le hub /solutions existera (L2-06),
      // /solutions/audits pointera vers sa section Audits.
      ...[
        ['audits', 'remontee-terrain#audits'],
        ['quality', 'remontee-terrain#inspections'],
        ['deviations', 'gestion-ecarts#deviations'],
        ['production', 'remontee-terrain#production'],
        ['rounds', 'planification-maintenance#tournees'],
        ['improvement', 'pilotage-performance#amelioration'],
      ].flatMap(([from, to]) => [
        { source: `/solutions/${from}`, destination: `/plateforme/${to}`, permanent: true },
        { source: `/en/solutions/${from}`, destination: `/en/plateforme/${to}`, permanent: true },
      ]),
    ]
  },
  images: {
    // Images des guides envoyées dans le Studio Sanity (voir docs/cms.md).
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' }],
  },
  experimental: {
    // exceljs lit le disque et charge ses propres binaires : le laisser
    // hors du bundle serveur evite que webpack tente de le reecrire.
    serverComponentsExternalPackages: ['exceljs'],
  },
}

export default withNextIntl(nextConfig)
