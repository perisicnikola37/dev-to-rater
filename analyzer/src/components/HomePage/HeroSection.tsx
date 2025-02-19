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
      <section className="flex flex-col md:flex-row space-y-6 md:space-y-0 space-x-4 md:space-x-0 max-w-screen-xl mx-auto mt-75">
        <div className="flex-1 text-right pr-10 w-full">
          <h1>
            <motion.h1
              initial={{ filter: 'blur(10px)', opacity: 0 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1 }}
              className="text-7xl font-semibold"
            >
              <span className="inline-block back">Next Gen Blog</span> <br />
              Scanner Tool
            </motion.h1>
          </h1>
        </div>

        <div className="flex-1 text-center md:text-left text-xl">
          <div className="leading-relaxed">
            <p className="mt-2">
              Analyze your blog post to uncover trends, <br /> engagement
              metrics, and content patterns.
            </p>
            <p>
              Gain insights to optimize your posts and reach <br /> a wider
              audience.
            </p>
          </div>
          <div className="flex space-x-4 justify-center md:justify-start mt-5">
            <Link
              to="/rater"
              className="gradient-button duration-300 cursor-pointer text-white font-bold py-2 px-8 rounded-md border-1 "
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
