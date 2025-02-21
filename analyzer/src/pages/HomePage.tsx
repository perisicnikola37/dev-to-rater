import Footer from '@/components/Footer/Footer'
import {
  OurSocialsSection,
  HeroSection,
  FeaturesSection,
  TrustedBySection,
  TryNowSection,
} from '@/utils/lazyImports'

const HomePage = () => {
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

export default HomePage
