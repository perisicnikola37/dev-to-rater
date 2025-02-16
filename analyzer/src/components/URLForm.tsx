import { URLFormProps } from '@/interfaces/props/URLForm'
import { CiSearch } from 'react-icons/ci'
import { BsStars } from 'react-icons/bs'
import React from 'react'

const URLForm: React.FC<URLFormProps> = ({
  inputURL,
  setInputURL,
  handleSubmit,
}) => (
  <div className="flex justify-start w-full mt-3">
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center mt-3 relative"
    >
      <CiSearch className="absolute left-3 text-black" />
      <input
        type="text"
        value={inputURL}
        onChange={(e) => setInputURL(e.target.value)}
        placeholder="Enter post URL"
        className="flex-grow p-2 pl-10 border border-gray-300 rounded-md outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="cursor-pointer p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 border-1 border-blue-500 flex items-center ml-2"
      >
        <BsStars className="mr-1" />
        Analyze
      </button>
    </form>
  </div>
)

export default URLForm
