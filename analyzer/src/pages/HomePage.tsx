import Footer from '@/components/Footer/Footer'
import {
  OurSocials,
  HeroSection,
  Features,
  TrustedBy,
  TryNow,
} from '@/utils/lazyImports'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <OurSocials />
      <TryNow />
      <TrustedBy />
      <Footer />
    </>
  )
}

export default HomePage
