import createFetchInstance from '@/utils/instance/instance'
import { HttpMethods } from '@/utils/constants/globalWeb'
import { AddPostProps } from '@/interfaces/props/AddPostProps'
import { API_URL } from '@/utils/utilities'
import { PostRoutes } from '@/interfaces/routes/apiRoutes'

const useAddFeaturedPost = () => {
  const { instance } = createFetchInstance()

  const addFeaturedPost = async ({ content }: AddPostProps) => {
    if (!content || !content.title || !content.imageUrl || !content.postUrl) {
      return
    }

    try {
      await instance<{ success: boolean }>(
        `${API_URL}/${PostRoutes.POSTS}`,
        HttpMethods.POST,
        {
          post_title: content.title,
          post_thumbnail: content.imageUrl,
          post_url: content.postUrl,
        },
      )
    } catch (error) {
      console.error('Error adding featured post:', error)
    }
  }

  return {
    addFeaturedPost,
  }
}

export default useAddFeaturedPost
