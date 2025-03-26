import Footer from '@/components/Footer/Footer'
import {
  OurSocialsSection,
  HeroSection,
  FeaturesSection,
  TrustedBySection,
  TryNowSection,
} from '@/utils/lazyImports'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <OurSocialsSection />
      <TryNowSection />
      <TrustedBySection />
      <Footer />
    </>
  )
}
