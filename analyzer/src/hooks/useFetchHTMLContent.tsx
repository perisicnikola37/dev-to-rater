import { useState } from 'react'
import createFetchInstance from '../utils/instance/instance'
import { parseHTMLContent } from '../core/helpers/parser'
import { FinalResponse } from '../core/types/FinalResponse'
import { HttpMethods } from '../utils/constants/globalWeb'
import { ErrorMessages } from '../utils/constants/messages'

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
      setError((err as Error).message || ErrorMessages.ParseError)
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
