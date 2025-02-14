import { ScannedPostsHistoryProps } from '@/interfaces/props/ScannedPostsHistory'
import {
  BASE_URLS,
  MAX_SCANNED_VISIBLE_POSTS,
} from '@/utils/constants/configuration'
import { ENVIRONMENT } from '@/utils/constants/envExpose'
import { Environments } from '@/utils/constants/globalWeb'
import { reactionEmojis } from '@/utils/constants/images'
import { useEffect, useState } from 'react'

const ScannedPostsHistory: React.FC<ScannedPostsHistoryProps> = ({
  history,
  clearHistory,
}) => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await fetch(
          ENVIRONMENT == Environments.PRODUCTION
            ? BASE_URLS.API_URL + '/count'
            : BASE_URLS.API_URL_LOCAL + '/count',
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        setCounter(data.count)
      } catch (error) {
        console.error('Error fetching counter:', error)
      }
    }

    fetchCounter()
  }, [])

  if (history.length === 0) {
    return (
      <div className="history-section mt-2 max-w-3xl mx-auto px-4">
        <div className="text-center text-gray-500">
          <p>
            We've scanned: <span className="text-blue-600">{counter}</span>{' '}
            posts
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="history-section mt-8 max-w-3xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">History</h3>
        <button
          className="border-2 border-red-300 text-black cursor-pointer py-2 px-4 rounded-md hover:bg-[#F56565] transition duration-300 hover:text-white outline-none hover:border-2 hover:border-transparent"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>

      <div className="post-history space-y-4">
        {history.slice(0, MAX_SCANNED_VISIBLE_POSTS).map((post, index) => (
          <a
            key={index}
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="post-history-item flex items-center space-x-4 bg-white hover:scale-101 p-5 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition duration-300"
          >
            <img
              src={
                post.imageUrl ||
                'https://static-00.iconduck.com/assets.00/dev-to-icon-2048x2048-4i261myk.png'
              }
              alt={post.title}
              className="post-image w-20 h-20 object-cover rounded-lg"
            />
            <div className="post-details flex flex-col">
              <h4 className="post-title text-lg font-medium text-gray-800">
                {post.title}
              </h4>
              <p className="text-sm text-gray-500 truncate max-w-xs">
                {post.imageUrl}
              </p>
              <div className="flex space-x-2 mt-2">
                {post.reactions.article_reaction_counts
                  .sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0))
                  .map((reaction, index) => (
                    <p key={index} className="flex items-center">
                      <img
                        src={
                          reactionEmojis[
                            reaction.category as keyof typeof reactionEmojis
                          ] || '❓'
                        }
                        alt={reaction.category}
                        className="w-4 h-4 mr-1"
                      />
                      {reaction.percentage && `(${reaction.percentage}%)`}
                    </p>
                  ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ScannedPostsHistory
