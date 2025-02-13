import React, { useState, useEffect } from 'react'
import productHunt from '@/assets/productHunt.svg'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    isVisible && (
      <div className="fixed bottom-5 right-5 flex items-center gap-3">
        <a
          className="hover:scale-103 duration-300"
          href="https://www.producthunt.com/posts/dev-to-rater-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dev&#0045;to&#0045;rater&#0045;2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={productHunt}
            alt="Dev.to Rater - Analyze blog posts to uncover trends and metrics | Product Hunt"
            width="65"
            height="54"
          />
        </a>
        <button
          onClick={scrollToTop}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg transition-transform transform hover:bg-blue-600 focus:outline-none duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    )
  )
}

export default ScrollToTopButton
