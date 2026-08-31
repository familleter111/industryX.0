import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Industry X.0',
  description:
    'Parlons de vos opérations. Un expert Industry X.0 vous accompagne : démo personnalisée de CIPA, réponse sous 24h et accompagnement métier.',
  openGraph: {
    title: 'Contact — Industry X.0',
    description:
      'Planifiez une démonstration de CIPA avec un expert Industry X.0.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
