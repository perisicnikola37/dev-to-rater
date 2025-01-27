import { useState } from 'react'
import { HttpMethods } from '../utils/constants/globalWebConstants'
import createFetchInstance from '../utils/instance/instance'
import { ErrorMessages } from '../utils/messages'
import { parseHTMLContent } from '../core/helpers/parser'
import { FinalResponse } from '../core/types/FinalResponse'

const useFetchHTMLContent = () => {
  const [content, setContent] = useState<FinalResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { instance } = createFetchInstance()

  const fetchHTMLContent = async (url: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await instance(url, HttpMethods.GET)
      const parsedContent = parseHTMLContent(response as string)
      setContent(parsedContent)
    } catch (err) {
      setError((err as Error).message || ErrorMessages.PARSE_ERROR)
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
