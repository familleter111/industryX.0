import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CipaSection from '@/components/CipaSection'
import FeaturesGrid from '@/components/FeaturesGrid'
import HowItWorks from '@/components/HowItWorks'
import IndustriesSection from '@/components/IndustriesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import ModuleSection from '@/components/Module'
import ProcessSection from '@/components/Process'
import DataSection from '@/components/DataSection'
import TerrainSection from '@/components/TerrainSection'
import CollaborationSection from '@/components/CollaborationSection'
import BeneficeSection from '@/components/BeneficeSection'
import CasesSection from '@/components/CasesSection'
import DifferenciationSection from '@/components/Diferrenciationsection'


export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <CipaSection />
      <CasesSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
