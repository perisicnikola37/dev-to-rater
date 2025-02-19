import logo from '@/assets/logo.webp'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black shadow-sm dark:bg-gray-900 pt-10">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to={'/'}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Dev.to Rater Logo" />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                to="https://docs.dev-to-rater.xyz/versions/v2/global/our-team"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                About
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:underline me-4 md:me-6">
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="https://docs.dev-to-rater.xyz/versions/v2/global/contact"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="https://docs.dev-to-rater.xyz/versions/v2/global/contact"
                target="_blank"
                className="hover:underline"
              >
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center dark:text-gray-400">
          © &nbsp;{new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
