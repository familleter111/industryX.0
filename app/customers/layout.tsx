import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cas clients — Industry X.0',
  description:
    'Les industriels qui pilotent leurs opérations avec CIPA : témoignages, chiffres clés et cas d’usage par secteur.',
  openGraph: {
    title: 'Cas clients — Industry X.0',
    description: 'Les industriels qui pilotent leurs opérations avec CIPA : témoignages, chiffres clés et cas d’usage par secteur.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
