import Hero from '@/components/sections/Hero'
import CipaSection from '@/components/sections/CipaSection'
import HowItWorks from '@/components/sections/HowItWorks'
import IndustriesSection from '@/components/sections/IndustriesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PartnersOrbit from '@/components/sections/PartnersOrbit'
import ArchitectureSection from '@/components/sections/ArchitectureSection'
import CTASection from '@/components/sections/CTASection'
import CasesSection from '@/components/sections/CasesSection'
import WelcomeIntro from '@/components/layout/WelcomeIntro'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <WelcomeIntro />
      <Hero />
      <HowItWorks />
      <CipaSection />
      <CasesSection />
        {/* <IndustriesSection /> */}
      <TestimonialsSection />
      <PartnersOrbit />
      <CTASection />
      <Footer />
    </main>
  )
}
