import { LoadingErrorMessagesProps } from '@/interfaces/props/LoadingErrorMessages'
import { ErrorMessages } from '@/utils/constants/messages'
import React from 'react'

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
        <p>{ErrorMessages.PostNotFound}</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="mt-3 w-full text-left text-gray-500">
        <p>Enter a URL to analyze a post.</p>
      </div>
    )
  }

  return null
}

export default LoadingErrorMessages
