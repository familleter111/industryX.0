import { existsSync } from 'node:fs'
import path from 'node:path'

import Hero from '@/components/sections/Hero'
import CipaSection from '@/components/sections/CipaSection'
import HowItWorks from '@/components/sections/HowItWorks'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PartnersOrbit from '@/components/sections/PartnersOrbit'
import CTASection from '@/components/sections/CTASection'
import CasesSection from '@/components/sections/CasesSection'
import FaqSection from '@/components/sections/FaqSection'
import JsonLd from '@/components/seo/JsonLd'
import WelcomeIntro from '@/components/layout/WelcomeIntro'
import Footer from '@/components/layout/Footer'
import { FAQ_ENTRIES } from '@/lib/data/faq'
import { FEATURE_TABS } from '@/lib/data/features'
import { platformPages } from '@/lib/data/platform'
import type { Locale } from '@/lib/i18n'
import { faqSchema, softwareApplicationSchema, websiteSchema } from '@/lib/seo/schema'

/**
 * Captures presentes dans public/screenshots, relevees au rendu de la page
 * (a la construction : la page est statique). Deposer un fichier au bon nom
 * puis reconstruire suffit a l'afficher — voir public/screenshots/README.md.
 */
const AVAILABLE_SCREENSHOTS = FEATURE_TABS.filter((tab) =>
  existsSync(path.join(process.cwd(), 'public', tab.screenshot.src)),
).map((tab) => tab.id)

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <JsonLd
        data={[
          websiteSchema(locale),
          softwareApplicationSchema({
            locale,
            featureList: platformPages(locale).map((page) => page.menuTitle),
          }),
          // Les questions de la section #faq, telles qu'elles s'affichent.
          faqSchema(FAQ_ENTRIES[locale], locale),
        ]}
      />
      <WelcomeIntro />
      <Hero />
      <HowItWorks />
      <CipaSection />
      <CasesSection availableScreenshots={AVAILABLE_SCREENSHOTS} />
      <TestimonialsSection />
      <PartnersOrbit />
      <FaqSection />
      <CTASection />
      <Footer />
    </main>
  )
}
