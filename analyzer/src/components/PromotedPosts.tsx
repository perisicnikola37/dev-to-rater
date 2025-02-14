import { BASE_URLS } from '@/utils/constants/configuration'
import { ENVIRONMENT } from '@/utils/constants/envExpose'
import { Environments } from '@/utils/constants/globalWeb'
import { useEffect, useState } from 'react'

const PromotedPosts = ({ triggerRefetch }: { triggerRefetch: boolean }) => {
  const [featuredPosts, setFeaturedPosts] = useState<
    {
      id: number
      post_title: string
      post_thumbnail: string
      post_url: string
    }[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedPosts()
  }, [triggerRefetch])

  const fetchFeaturedPosts = async () => {
    try {
      const response = await fetch(
        ENVIRONMENT === Environments.PRODUCTION
          ? BASE_URLS.API_URL + '/posts/featured'
          : BASE_URLS.API_URL_LOCAL + '/posts/featured',
        {
          method: 'GET',
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      setFeaturedPosts(data.results)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-center">Last scanned posts</h2>
      <div className="bottom-0 z-50 mt-3 mb-10 max-w-3xl mx-auto px-4 hidden lg:flex space-x-4">
        {featuredPosts.map((post, index) => (
          <a
            key={index}
            href={post.post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 post-history-item flex items-center space-x-4 bg-white p-1 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition duration-300"
          >
            <img
              src={
                post.post_thumbnail ||
                'https://static-00.iconduck.com/assets.00/dev-to-icon-2048x2048-4i261myk.png'
              }
              alt={post.post_title}
              className="post-image w-20 h-20 object-cover rounded-lg m-0 p-0"
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default PromotedPosts
