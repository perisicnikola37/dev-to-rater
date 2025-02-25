import { useState } from 'react'
import { getDocumentationURL } from '@/utils/utilities'
import { CiStar } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import logo from '@/assets/images/logo.webp'
import clsx from 'clsx'
import { NavLink } from '@/interfaces/props/NavLink'
import { FrontendApplicationRoutes } from '@/routes/routes'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const documentationURL = getDocumentationURL()

  const navLinks: NavLink[] = [
    {
      label: 'Documentation',
      href: documentationURL,
      isExternal: true,
    },
    {
      label: 'Blogs',
      href: FrontendApplicationRoutes.BLOGS,
      isExternal: false,
    },
  ]

  const mobileNavLinks: NavLink[] = [
    ...navLinks,
    {
      label: 'Star us on GitHub',
      href: 'https://github.com/perisicnikola37/dev-to-rater',
      isExternal: true,
      icon: <CiStar className="mr-2 text-blue-500" />,
    },
  ]

  return (
    <header className="sticky top-0 flex justify-between items-center w-full px-6 md:px-10 border-b border-gray-800 h-18 backdrop-blur-sm z-50 bg-opacity-60">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Dev.to Rater Logo"
            className="w-8 mr-2"
            loading="lazy"
          />
        </Link>

        <nav className="hidden md:flex items-center ml-8">
          {navLinks.map(({ label, href, isExternal }) => (
            <a
              key={label}
              target={isExternal ? '_blank' : '_self'}
              href={href}
              className="hover:text-blue-400 transition duration-300 mr-5 text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <button
        className="md:hidden text-white cursor-pointer text-2xl"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className="hidden md:flex items-center">
        <a
          target="_blank"
          href="https://github.com/perisicnikola37/dev-to-rater"
          className="flex items-center hover:text-blue-400 transition duration-300 mr-5 text-white"
        >
          <CiStar className="mr-2 text-blue-500" /> Star us on GitHub
        </a>

        <Link
          to="/rater"
          className="bg-blue-700 px-6 py-2 hover:bg-blue-600 duration-300 text-white font-bold rounded-md"
        >
          Scan now
        </Link>
      </div>

      <div
        className={clsx(
          'absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center py-60 shadow-lg md:hidden transition-all',
          { block: menuOpen, hidden: !menuOpen },
        )}
      >
        {mobileNavLinks.map(({ label, href, isExternal, icon }) => (
          <a
            key={label}
            target={isExternal ? '_blank' : '_self'}
            href={href}
            className="py-2 flex items-center hover:text-blue-400 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            {icon} {label}
          </a>
        ))}
        <Link
          to="/rater"
          className="mt-3 bg-blue-700 px-6 py-2 hover:bg-blue-600 duration-300 text-white font-bold rounded-md"
          onClick={() => setMenuOpen(false)}
        >
          Scan now
        </Link>
      </div>
    </header>
  )
}

export default Header
