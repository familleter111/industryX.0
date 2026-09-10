import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entreprise — Industry X.0',
  description:
    'Depuis 2019, Industry X.0 transforme l’expertise opérationnelle en solutions digitales concrètes, simples à déployer et conçues pour durer.',
  openGraph: {
    title: 'Entreprise — Industry X.0',
    description:
      'Depuis 2019, Industry X.0 transforme l’expertise opérationnelle en solutions digitales concrètes, simples à déployer et conçues pour durer.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function EntrepriseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
