import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import CanvasCursor from '../CanvasCursor'

const OurSocials = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const areCardsInView = useInView(cardsRef, { once: true, amount: 0.5 })

  const handleCardClick = (url: string | URL | undefined) => {
    window.open(url, '_blank')
  }

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white w-full min-h-screen pt-20 flex flex-col justify-center items-center relative overflow-hidden mb-[-60px]"
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-lg transition-all duration-500 ${
          isInView ? 'opacity-100' : 'opacity-100'
        }`}
      >
        <CanvasCursor />
      </div>

      <motion.h1
        key={isInView ? 'visible' : 'hidden'}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-semibold mb-10 z-10 uppercase"
      >
        Our socials
      </motion.h1>
      <div
        ref={cardsRef}
        className="w-full flex justify-center gap-8 absolute top-1/2 transform -translate-y-1/2 z-20"
      >
        {[
          {
            imgSrc: 'https://d2fltix0v2e0sb.cloudfront.net/dev-black.png',
            url: 'https://dev.to/dev-to-rater-org',
          },
          {
            imgSrc: 'https://img.icons8.com/m_outlined/512/FFFFFF/github.png',
            url: 'https://github.com/perisicnikola37/dev-to-rater/',
          },
          {
            imgSrc:
              'https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png',
            url: 'https://www.youtube.com/@Dev.toRater',
          },
          {
            imgSrc:
              'https://i.postimg.cc/cLqFCQTc/580b57fcd9996e24bc43c534.png',
            url: 'https://www.producthunt.com/posts/dev-to-rater-2?utm_source=other&utm_medium=social',
          },
        ].map((card, index) => {
          const customRotation = [10, -10, 20, -20][index]
          const customX = [50, 25, 2, -50][index]

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 500, rotate: 0, x: 0 }}
              animate={{
                opacity: areCardsInView ? 1 : 0,
                y: areCardsInView ? 0 : 500,
                rotate: areCardsInView ? customRotation : 0,
                x: areCardsInView ? customX : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                duration: 0.5,
                delay: index * 0.2,
              }}
              className="border-1 hover:scale-105 duration-200 border-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg w-80 h-70 cursor-pointer"
              onClick={() => handleCardClick(card.url)}
            >
              <div className="flex flex-col justify-between h-full">
                <img
                  height={'100px'}
                  width={'100px'}
                  src={card.imgSrc}
                  className="m-auto"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default OurSocials
