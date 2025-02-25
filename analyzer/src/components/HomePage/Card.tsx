import React, { useMemo } from 'react'
import { Suspense } from 'react'
import MotionWrapper from '../Wrappers/MotionWrapper'
import Spinner from '../Spinner'
import { CardProps } from '@/interfaces/props/CardProps'

const Card: React.FC<CardProps> = React.memo(
  ({ card, index, areCardsInView }) => {
    const customRotation = useMemo(() => [10, -10, 20, -20][index], [index])
    const customX = useMemo(() => [50, 25, 2, -50][index], [index])

    return (
      <MotionWrapper.div
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
        className="will-change border-1 hover:scale-105 duration-200 border-white bg-opacity-20 bg-black p-6 rounded-lg shadow-lg w-80 h-70 cursor-pointer sm:w-60 sm:h-60 xs:w-48 xs:h-72"
        onClick={() => window.open(card.url, '_blank')}
      >
        <div className="flex flex-col justify-between h-full">
          <Suspense fallback={<Spinner />}>
            <img
              loading="lazy"
              height={'100px'}
              width={'100px'}
              src={card.imgSrc}
              className="m-auto"
              alt="Dev.to Rater's social media"
            />
          </Suspense>
        </div>
      </MotionWrapper.div>
    )
  },
)

export default Card
