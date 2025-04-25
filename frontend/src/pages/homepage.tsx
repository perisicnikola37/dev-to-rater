import Footer from '@/components/footer/footer'
import {
  FeaturesSection,
  HeroSection,
  OurSocialsSection,
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
