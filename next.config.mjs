/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    // exceljs lit le disque et charge ses propres binaires : le laisser
    // hors du bundle serveur evite que webpack tente de le reecrire.
    serverComponentsExternalPackages: ['exceljs'],
  },
}

export default nextConfig
