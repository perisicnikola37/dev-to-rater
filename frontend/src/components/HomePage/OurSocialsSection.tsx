import { useRef, useEffect, useState } from 'react'
import Card from './Card'
import { ourSocials } from '@/utils/constants/configuration'

const OurSocialsSection = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [areCardsInView, setAreCardsInView] = useState(false)

  useEffect(() => {
    // Intersection Observer for the section
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current)
    }

    // Intersection Observer for the cards
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreCardsInView(true)
        }
      },
      { threshold: 0.5 },
    )
    if (cardsRef.current) {
      cardsObserver.observe(cardsRef.current)
    }

    // Cleanup observers on unmount
    return () => {
      sectionObserver.disconnect()
      cardsObserver.disconnect()
    }
  }, [])

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
      className="bg-black text-white w-full flex flex-col justify-center items-center relative overflow-hidden lg:mb-[-60px]"
    >
      <div
        className={`relative mt-20 bg-black w-full h-[85rem] sm:h-[43rem] md:h-[50rem] lg:mb-0 lg:h-[40rem] bg-opacity-50  transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2
          className={`text-4xl font-semibold z-10 uppercase text-center transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
        >
          Our socials
        </h2>
      </div>

      <div
        ref={cardsRef}
        className={`w-full mt-15 lg:mt-0 flex flex-wrap justify-center gap-8 absolute top-1/2 transform -translate-y-1/2 z-20 transition-opacity duration-500 ${areCardsInView ? 'opacity-100' : 'opacity-0'}`}
      >
        {renderCards()}
      </div>
    </section>
  )
}

export default OurSocialsSection
