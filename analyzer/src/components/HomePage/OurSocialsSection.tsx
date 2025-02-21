import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Card from './Card'
import MotionWrapper from '../Wrappers/MotionWrapper'
import { ourSocials } from '@/utils/constants/configuration'

const OurSocialsSection = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const areCardsInView = useInView(cardsRef, { once: true, amount: 0.5 })

  const renderCards = () =>
    ourSocials.map((card, index) => (
      <Card
        key={index}
        card={card}
        index={index}
        areCardsInView={areCardsInView}
      />
    ))

  return (
    <section
      ref={sectionRef}
      className="bg-transparent text-white w-full flex flex-col justify-center items-center relative overflow-hidden mb-[-60px]"
    >
      <div
        className={`relative bg-black w-full h-[85rem] lg:mb-0 lg:h-[40rem] bg-opacity-50 backdrop-blur-lg transition-all duration-500 ${isInView ? 'opacity-100' : ''} flex justify-center items-center`}
      >
        <MotionWrapper.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold z-10 uppercase text-center"
        >
          Our socials
        </MotionWrapper.h2>
      </div>

      <div
        ref={cardsRef}
        className="w-full flex flex-wrap justify-center gap-8 absolute top-1/2 transform -translate-y-1/2 z-20"
      >
        {renderCards()}
      </div>
    </section>
  )
}

export default OurSocialsSection
