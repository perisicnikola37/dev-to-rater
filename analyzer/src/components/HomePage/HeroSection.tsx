import Header from './Header'
import { Link } from 'react-router-dom'
import VideoModal from './VideoModal'
import background from '@/assets/background.png'
import ScrollArrow from '../ScrollArrow'
import { useState } from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div
      className="relative text-white bg-cover h-screen bg-opacity-70 flex flex-col justify-start items-center bg-black"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <Header />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      <section className="flex flex-col md:flex-row items-center max-w-screen-xl mx-auto mt-52 md:mt-75 px-6 md:px-0">
        <div className="flex-1 text-center lg:text-right lg:pr-10">
          <motion.h1
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            className="text-5xl md:text-7xl font-semibold"
          >
            <span>Next Gen Blog</span> <br />
            Scanner Tool
          </motion.h1>
        </div>
        <div className="flex-1 text-center mr-0 lg:mr-0 mt-5 lg:text-left md:text-left text-lg md:text-xl md:mt-0">
          <div className="leading-relaxed">
            <p>
              Analyze your blog post to uncover trends,
              <br className="hidden md:block" />
              engagement metrics, and content patterns.
            </p>
            <p className="mt-2 hidden md:block">
              Gain insights to optimize your posts and reach&nbsp;
              <br className="hidden md:block" />a wider audience.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-6 lg:justify-start">
            <Link
              to="/rater"
              className="gradient-button duration-300 cursor-pointer text-white font-bold py-2 px-8 rounded-md border-1 text-center"
            >
              Scan
            </Link>
            <VideoModal showVideo={showVideo} setShowVideo={setShowVideo} />
          </div>
        </div>
      </section>

      <ScrollArrow />
    </div>
  )
}

export default HeroSection
