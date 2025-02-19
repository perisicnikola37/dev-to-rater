import Footer from '@/components/Footer/Footer'
import {
  OurSocials,
  HeroSection,
  Features,
  TrustedBy,
} from '@/utils/lazyImports'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      {/* <RaterDemoThumbnailPreview /> */}
      <Features />
      <OurSocials />
      <TrustedBy />
      <Footer />
    </>
  )
}

export default HomePage
