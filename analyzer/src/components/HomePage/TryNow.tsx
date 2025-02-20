import { FrontendApplicationRoutes } from '@/utils/constants/configuration'
import React from 'react'
import { Link } from 'react-router-dom'

const TryNow: React.FC = () => {
  return (
    <section className="relative bg-transparent text-white w-full flex flex-col justify-center items-center overflow-hidden mb-[-60px] transition-all duration-500">
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          backgroundImage: 'url(https://i.postimg.cc/3N4DqXnq/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      ></div>

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>

      <div className="relative w-full h-[30rem] lg:h-[30rem] flex flex-col justify-center items-center">
        <h2 className="text-lg lg:text-2xl font-bold">Dev.to Rater</h2>
        <h2 className="gradient-text text-3xl lg:text-5xl mt-2 mb-4 h-13">
          Grow your audience.
        </h2>
        <Link
          to={FrontendApplicationRoutes.RATER}
          className="gradient-button rounded-md mt-3 text-center text-lg"
        >
          Try Now
        </Link>
      </div>
    </section>
  )
}

export default TryNow
