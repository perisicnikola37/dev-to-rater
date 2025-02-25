import logo from '@/assets/images/logo.webp'
import { FrontendApplicationRoutes } from '@/routes/routes'
import { Link } from 'react-router-dom'

const footerLinks = [
  {
    label: 'About',
    href: 'https://docs.dev-to-rater.xyz/versions/v2/global/our-team',
    isExternal: true,
  },
  {
    label: 'Blogs',
    href: FrontendApplicationRoutes.BLOGS,
    isExternal: false,
  },
  {
    label: 'Contact Us',
    href: 'https://docs.dev-to-rater.xyz/versions/v2/global/contact',
    isExternal: true,
  },
  {
    label: 'Docs',
    href: 'https://docs.dev-to-rater.xyz/versions/v2/global/contact',
    isExternal: true,
  },
]

const Footer = () => {
  return (
    <footer
      className="relative text-white shadow-sm bg-gray-900 pt-15 bg-cover bg-top"
      style={{
        backgroundImage: 'url(https://i.postimg.cc/3N4DqXnq/background.png)',
      }}
    >
      <div className="absolute top-0 left-0 w-full h-15 bg-gradient-to-b from-black to-transparent"></div>

      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              loading="lazy"
              src={logo}
              className="h-8"
              alt="Dev.to Rater Logo"
            />
          </Link>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0 dark:text-gray-400">
            {footerLinks.map(({ label, href, isExternal }) => (
              <li key={label}>
                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline me-4 md:me-6"
                  >
                    {label}
                  </a>
                ) : (
                  <Link to={href} className="hover:underline me-4 md:me-6">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-3/5 lg:w-full" />

        <span className="block text-sm text-white sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
