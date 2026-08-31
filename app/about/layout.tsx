import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — Industry X.0',
  description:
    'Nos valeurs, notre mission et notre histoire : Industry X.0 accélère la transformation digitale des usines et des entreprises industrielles.',
  openGraph: {
    title: 'À propos — Industry X.0',
    description: 'Nos valeurs, notre mission et notre histoire : Industry X.0 accélère la transformation digitale des usines et des entreprises industrielles.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
