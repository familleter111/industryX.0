import createNextIntlPlugin from 'next-intl/plugin'

// Branche src/i18n/request.ts : c'est lui qui donne la langue de chaque requête.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // /about faisait doublon avec /entreprise : les anciens liens y sont renvoyés.
  async redirects() {
    return [
      { source: '/about', destination: '/entreprise', permanent: true },
      { source: '/en/about', destination: '/en/entreprise', permanent: true },
    ]
  },
  images: {
    remotePatterns: [],
  },
  experimental: {
    // exceljs lit le disque et charge ses propres binaires : le laisser
    // hors du bundle serveur evite que webpack tente de le reecrire.
    serverComponentsExternalPackages: ['exceljs'],
  },
}

export default withNextIntl(nextConfig)
