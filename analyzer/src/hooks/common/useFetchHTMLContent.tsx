import { useState } from 'react'

import { AxiosResponse } from 'axios'
import { FinalResponse } from '@/core/types/FinalResponse'
import createFetchInstance from '@/utils/instance/instance'
import { HttpMethods } from '@/utils/constants/globalWeb'
import { parseHTMLContent } from '@/core/helpers/parser'
import { ErrorMessages } from '@/utils/constants/messages'

const useFetchHTMLContent = () => {
  const [content, setContent] = useState<FinalResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { instance } = createFetchInstance()

  const fetchHTMLContent = async (postUrl: string) => {
    try {
      setLoading(true)
      setError(null)

      const blogPostBodyResponse: AxiosResponse = await instance(
        postUrl,
        HttpMethods.GET,
      )

      let parsedContent: FinalResponse | null = null
      try {
        parsedContent = await parseHTMLContent(postUrl, blogPostBodyResponse)
      } catch (parseError) {
        throw new Error(
          `Failed to parse HTML content: ${(parseError as Error).message}`,
        )
      }

      setContent(parsedContent)
    } catch (err) {
      setError((err as Error).message || ErrorMessages.RequestFailed)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    content,
    loading,
    error,
    fetchHTMLContent,
  }
}

export default useFetchHTMLContent
