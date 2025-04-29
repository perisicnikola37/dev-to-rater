import { AddPostProps } from '@/interfaces/props/AddPostProps'
import { PostRoutes } from '@/interfaces/routes/apiRoutes'
import { HttpMethods } from '@/utils/constants/globalWeb'
import createFetchInstance from '@/utils/instance/instance'
import { API_URL } from '@/utils/utilities'

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
