import { motion } from 'framer-motion'
import background from '@/assets/background.png'
import Header from '../HomePage/Header'
import { Link } from 'react-router-dom'
import TypewriterEffect from '../TypewriterEffect'
import { useEffect, useState } from 'react'

const BlogsSection = () => {
  const [selectedTag, setSelectedTag] = useState('')

  const blogPosts = [
    {
      title: 'The end: Create React App (2016-2025)',
      image:
        'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fg4o4ue1iutqn3z4w27o7.png',
      url: 'https://dev.to/dev-to-rater-org/the-end-create-react-app-2016-2025-3cdf',
      tags: ['Frontend'],
    },
    {
      title: 'The biggest backend mistakes you can do',
      image:
        'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcdthgrhlcqcvnnu0yg1g.png',
      url: 'https://dev.to/dev-to-rater-org/the-biggest-backend-mistakes-you-can-do-ki0',
      tags: ['Backend'],
    },
    {
      title: 'The biggest frontend mistakes you can do',
      image:
        'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8cgvawrcesh04f8b8pyb.png',
      url: 'https://dev.to/dev-to-rater-org/the-biggest-frontend-mistakes-you-can-do-bng',
      tags: ['Frontend'],
    },
  ]

  const filteredPosts = selectedTag
    ? blogPosts.filter((post) => post.tags.includes(selectedTag))
    : blogPosts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div
      className="relative text-white bg-cover min-h-screen bg-opacity-70 flex flex-col justify-start items-center bg-black"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <Header />
      <div className="absolute top-32 text-center text-3xl sm:text-4xl font-semibold text-white">
        <h3 className="flex justify-center">
          Recent &nbsp;
          <TypewriterEffect strings={['blog posts']} />
        </h3>
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 flex-wrap">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-4 cursor-pointer py-2 text-sm font-medium rounded-sm border-2 border-white hover:bg-white hover:text-black transition duration-200 ${
                !selectedTag ? 'bg-white text-black' : 'bg-transparent'
              } mt-2 mb-2`}
            >
              All
            </button>
            {[
              'Frontend',
              'Backend',
              'Artificial Intelligence',
              'Crypto Industry',
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-sm border-2 border-white hover:bg-white hover:text-black transition duration-200 ${
                  selectedTag === tag ? 'bg-white text-black' : 'bg-transparent'
                } mt-2 mb-2`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto mt-60 mb-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {filteredPosts.length === 0 ? (
          <div className="col-span-full text-center text-xl mt-5 lg:mt-0 text-gray-400">
            No posts available for this tag.
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <Link
              target="_blank"
              to={post.url}
              className="hover:scale-102 duration-200 ease-in-out"
              key={index}
            >
              <motion.div
                className="bg-white text-black rounded-lg shadow-lg"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="block p-4 hover:bg-gray-100 transition duration-300">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex space-x-2 text-sm text-gray-600">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-200 rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </motion.div>

      <div className="mb-8"></div>
    </div>
  )
}

export default BlogsSection
