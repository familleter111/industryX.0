import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partenaires — Industry X.0',
  description:
    'L’écosystème technologique, institutionnel et académique qui accompagne le déploiement de CIPA à l’échelle industrielle.',
  openGraph: {
    title: 'Partenaires — Industry X.0',
    description: 'L’écosystème technologique, institutionnel et académique qui accompagne le déploiement de CIPA à l’échelle industrielle.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
