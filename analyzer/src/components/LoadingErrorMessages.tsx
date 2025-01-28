import React from 'react'
import { ErrorMessages } from '../utils/messages'
import { LoadingErrorMessagesProps } from '../interfaces/props/LoadingErrorMessagesProps'

const LoadingErrorMessages: React.FC<LoadingErrorMessagesProps> = ({
  loading,
  error,
  content,
}) => {
  if (loading) {
    return (
      <div className="mt-8 w-full text-center text-blue-500">
        <p>Calculating...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 w-full text-center text-red-500">
        <p>{ErrorMessages.POST_NOT_FOUND}</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="mt-8 w-full text-center text-gray-500">
        <p>Enter a URL to analyze a post.</p>
      </div>
    )
  }

  return null
}

export default LoadingErrorMessages
