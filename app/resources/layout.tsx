import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guides & insights — Industry X.0',
  description:
    'Analyses sectorielles, guides pratiques et ressources pour digitaliser vos processus qualité, production et maintenance.',
  openGraph: {
    title: 'Guides & insights — Industry X.0',
    description: 'Analyses sectorielles, guides pratiques et ressources pour digitaliser vos processus qualité, production et maintenance.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
