import React, { useState, useMemo, Suspense, useEffect } from 'react'
import ReadingTime from '@/components/ReadingTime'
import RepeatedWords from '@/components/RepeatedWords'
import useFetchHTMLContent from '@/hooks/useFetchHTMLContent'
import {
  calculateFullMark,
  getPostHistory,
  isValidProvidedSourceURL,
  savePostToHistory,
} from '@/utils/utilities'
import { DEV_TO_SOURCE } from '@/utils/constants/sources'
import { FinalResponse } from '@/core/types/FinalResponse'
import ScannedPostsHistory from '@/components/ScannedPostsHistory'
import { BASE_URLS, LOCAL_STORAGE_KEY } from '@/utils/constants/configuration'
import { RadarData } from '@/interfaces/props/RadarComponent'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Spinner from '@/components/Spinner'
import { trackClearHistory, trackSubmitEvent } from '@/core/helpers/ga4Events'
import { ENVIRONMENT } from '@/utils/constants/envExpose'
import { Environments } from '@/utils/constants/globalWeb'

const [
  AnimatedScore,
  FireworksCanvas,
  Header,
  URLForm,
  LoadingErrorMessages,
  RadarChartSection,
  ExceededSentences,
  Footer,
  SubHeader,
] = [
  'AnimatedScore',
  'FireworksCanvas',
  'Header',
  'URLForm',
  'LoadingErrorMessages',
  'RadarChartSection',
  'ExceededSentences',
  'Footer',
  'SubHeader',
].map((component) => {
  return React.lazy(() => import(`../components/${component}.tsx`))
})

const SuspenseWrapper = ({
  children,
  fallback,
}: {
  children: React.ReactNode
  fallback: React.ReactNode
}) => <Suspense fallback={fallback}>{children}</Suspense>

const DevToPostAnalyzer: React.FC = () => {
  const [inputURL, setInputURL] = useState('')
  const [, setSubmittedURL] = useState('')
  const { content, loading, error, fetchHTMLContent } = useFetchHTMLContent()
  const [history, setHistory] = useState<FinalResponse[]>(getPostHistory())

  const isValidURL = isValidProvidedSourceURL(inputURL, DEV_TO_SOURCE)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidURL) {
      trackSubmitEvent(inputURL)
      setSubmittedURL(inputURL)
      fetchHTMLContent(inputURL)
    }
    incrementCount(inputURL)
  }

  const incrementCount = async (inputURL: string) => {
    try {
      const response = await fetch(
        ENVIRONMENT == Environments.PRODUCTION
          ? BASE_URLS.API_URL + '/increment'
          : BASE_URLS.API_URL_LOCAL + '/increment',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: inputURL }),
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fullMark = useMemo(
    () => (content ? calculateFullMark(content) : 0),
    [content],
  )

  const data: RadarData[] = useMemo(() => {
    return [
      { subject: 'Headings', A: content?.headings?.length ?? 0, fullMark },
      { subject: 'Images', A: 10, fullMark },
      { subject: 'Links', A: content?.links?.length ?? 0, fullMark },
      { subject: 'Paragraphs', A: content?.sentences?.length ?? 0, fullMark },
    ]
  }, [content, fullMark])

  const animatedScore = useMemo(() => {
    return content ? <AnimatedScore score={content.totalScore} /> : null
  }, [content?.totalScore])

  useEffect(() => {
    if (content) {
      const newPost: FinalResponse = {
        ...content,
        title: content.title,
        imageUrl: content.imageUrl,
      }
      savePostToHistory(newPost)
      setHistory(getPostHistory())
    }
  }, [content])

  const clearHistory = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setHistory([])
    trackClearHistory()
  }

  return (
    <SuspenseWrapper fallback={<Spinner></Spinner>}>
      <div className="min-h-screen flex flex-col">
        {content?.totalScore === 10 && <FireworksCanvas />}
        <div className="flex items-start justify-center mt-16 mb-16">
          <div className="w-full max-w-3xl rounded-3xl flex flex-col items-center">
            <Header />
            <SubHeader />
            <URLForm
              inputURL={inputURL}
              setInputURL={setInputURL}
              handleSubmit={handleSubmit}
            />

            <LoadingErrorMessages
              loading={loading}
              error={!!error}
              content={content}
            />
            {!error && content && (
              <>
                {animatedScore}
                <RadarChartSection data={data} />
                <ExceededSentences content={content} />
                <RepeatedWords content={content} />
                <ReadingTime readingTime={content?.readingTime} />
              </>
            )}
          </div>
        </div>
        <ScannedPostsHistory
          history={history}
          clearHistory={clearHistory}
          url={inputURL}
        />
        <Footer />
      </div>
      <ScrollToTopButton />
    </SuspenseWrapper>
  )
}

export default DevToPostAnalyzer
