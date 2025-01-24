import { useState } from 'react'
import axios from 'axios'
import Content from '../interfaces/Content'
import { parseHTMLContent } from '../utils/parser'

const useFetchHTMLContent = () => {
  const [content, setContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHTMLContent = async (url: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get<string>(url)
      const htmlString = response.data

      const parsedContent = parseHTMLContent(htmlString)

      setContent(parsedContent)
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch and parse content.')
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
