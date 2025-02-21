import logo from '@/assets/logo.webp'
import { Link } from 'react-router-dom'

const Header = () => (
  <header className="w-full">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold mt-4 text-gray-800 dark:text-white">
        Dev.to Rater
      </h1>
      <Link to={'/'}>
        <img
          className="w-13 h-13 transition-transform duration-300 hover:rotate-10 ease-in-out"
          src={logo}
          alt="Dev.to Rater Logo"
        />
      </Link>
    </div>
    <div className="flex justify-start w-full mt-3 text-gray-800 dark:text-white">
      <h2>
        Make your posts engaging.&nbsp;
        <span className="text-blue-600 dark:text-blue-400">
          Grow your audience.
        </span>
      </h2>
    </div>
  </header>
)

export default Header
