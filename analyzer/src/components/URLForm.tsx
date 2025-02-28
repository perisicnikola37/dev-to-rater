import { URLFormProps } from '@/interfaces/props/URLForm'
import { CiSearch } from 'react-icons/ci'
import { BsStars } from 'react-icons/bs'
import React from 'react'

const URLForm: React.FC<URLFormProps> = ({
  inputURL,
  setInputURL,
  handleSubmit,
  handleCopy,
  isDisabled,
}) => (
  <div className="flex justify-start w-full mt-3">
    <div className="w-full flex items-center mt-3 relative">
      <CiSearch className="absolute left-3 text-black dark:text-white" />
      <input
        type="text"
        value={inputURL}
        onChange={(e) => setInputURL(e.target.value)}
        placeholder="Enter post URL"
        className="flex-grow p-2 pl-10 border border-gray-300 dark:border-white-300 rounded-md outline-none focus:border-blue-500 dark:focus:border-blue-400"
      />
      <button
        className="cursor-pointer p-2 bg-blue-500  text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-200 border-1 border-blue-400 flex items-center ml-2"
        onClick={handleSubmit}
      >
        Analyze
      </button>
      <button
        className={`cursor-pointer p-2 text-black rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-200 border-1 border-blue-400 flex items-center ml-2 dark:text-white ${isDisabled ? 'bg-gray-300 hover:bg-gray-300 text-gray-700 hover:text-gray-700 border-gray-300 hover:cursor-not-allowed' : 'hover:text-white'}`}
        onClick={handleCopy}
        disabled={isDisabled}
      >
        <BsStars className="mr-1" />
        Refactor
      </button>
    </div>
  </div>
)

export default URLForm
