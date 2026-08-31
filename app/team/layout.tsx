import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Équipe — Industry X.0',
  description:
    'Une équipe produit, terrain et IA au service de la performance industrielle : expertises, façon de travailler et recrutement.',
  openGraph: {
    title: 'Équipe — Industry X.0',
    description: 'Une équipe produit, terrain et IA au service de la performance industrielle : expertises, façon de travailler et recrutement.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
