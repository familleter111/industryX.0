import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Industry X.0',
  description:
    'Durée d’une démonstration CIPA, intégrations, accompagnement au déploiement et délais : les réponses aux questions fréquentes.',
  openGraph: {
    title: 'FAQ — Industry X.0',
    description: 'Durée d’une démonstration CIPA, intégrations, accompagnement au déploiement et délais : les réponses aux questions fréquentes.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
