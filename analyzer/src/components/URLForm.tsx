import { URLFormProps } from '@/interfaces/props/URLForm'
import React from 'react'

const URLForm: React.FC<URLFormProps> = ({
  inputURL,
  setInputURL,
  handleSubmit,
}) => (
  <div className="flex justify-start w-full mt-3">
    <form onSubmit={handleSubmit} className="w-full flex items-center mt-3">
      <input
        type="text"
        value={inputURL}
        onChange={(e) => setInputURL(e.target.value)}
        placeholder="Enter post URL"
        className="flex-grow p-2 border border-gray-300 rounded-l-md outline-none"
      />
      <button
        type="submit"
        className="cursor-pointer p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-200 border-1 border-blue-500"
      >
        Analyze
      </button>
    </form>
  </div>
)

export default URLForm
