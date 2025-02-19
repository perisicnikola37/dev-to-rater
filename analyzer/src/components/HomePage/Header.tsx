import { getDocumentationURL } from '@/utils/utilities'
import { CiStar } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.webp'

const Header = () => {
  const documentationURL = getDocumentationURL()

  return (
    <header className="sticky top-0 flex justify-between items-center w-full px-10 border-b border-gray-800 h-18 backdrop-blur-sm z-100 bg-opacity-60">
      <div className="flex items-center ml-8">
        <Link
          to={'/'}
          className="flex items-center shadow-blue-700 duration-200"
        >
          <img src={logo} alt="logo" className="w-8 mr-2" />
        </Link>
        <a
          target="_blank"
          href={documentationURL}
          className="flex items-center hover:text-blue-400 transition duration-300 mr-5 text-white"
        >
          Documentation
        </a>
        <Link
          to={'/blogs'}
          className="flex items-center hover:text-blue-400 transition duration-300 mr-5 text-white"
        >
          Blogs
        </Link>
      </div>
      <div className="flex items-center mr-8">
        <a
          target="_blank"
          href={'https://github.com/perisicnikola37/dev-to-rater'}
          className="flex items-center hover:text-blue-400 transition duration-300 mr-5 text-white"
        >
          <CiStar className="mr-2 text-blue-500" /> Star on GitHub
        </a>

        <Link
          to="/rater"
          className="bg-blue-700 px-6 py-2 hover:bg-blue-600 duration-300 cursor-pointer text-white font-bold rounded-md"
        >
          Scan now
        </Link>
      </div>
    </header>
  )
}

export default Header
