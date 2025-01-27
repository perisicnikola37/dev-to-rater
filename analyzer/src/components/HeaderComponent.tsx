import React from 'react'
import logo from '../assets/logo.webp'

const Header: React.FC = () => (
  <>
    <div className="flex justify-between w-full items-center">
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Dev.to Rater</h1>
      <img
        className="ml-4"
        src={logo}
        alt="Dev.to Logo"
        width="60"
        height="60"
      />
    </div>
    <div className="flex justify-start w-full mt-3">
      <p>
        Make your posts engaging.&nbsp;
        <span className="text-blue-600">Grow your audience.</span>
      </p>
    </div>
  </>
)

export default Header
