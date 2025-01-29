import React from 'react'
import logo from '@/assets/logo.webp'

const Header: React.FC = () => (
  <header className="w-full">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Dev.to Rater</h1>
      <img className="ml-4 w-13 h-13" src={logo} alt="Dev.to Rater logo" />
    </div>
    <div className="flex justify-start w-full mt-3">
      <p>
        Make your posts engaging.&nbsp;
        <span className="text-blue-600">Grow your audience.</span>
      </p>
    </div>
  </header>
)

export default Header
