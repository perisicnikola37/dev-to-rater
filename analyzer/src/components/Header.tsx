import React from 'react'
import logo from '@/assets/logo.webp'
import { Link } from 'react-router-dom'

const Header: React.FC = () => (
  <header className="w-full">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold mt-4 text-gray-800 dark:text-white">
        Dev.to Rater
      </h1>
      <Link to={'/'}>
        <img className="ml-4 w-13 h-13" src={logo} alt="Dev.to Rater logo" />
      </Link>
    </div>
    <div className="flex justify-start w-full mt-3 text-gray-800 dark:text-white">
      <p>
        Make your posts engaging.&nbsp;
        <span className="text-blue-600 dark:text-blue-400">
          Grow your audience.
        </span>
      </p>
    </div>
  </header>
)

export default Header
