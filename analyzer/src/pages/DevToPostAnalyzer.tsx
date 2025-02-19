import React, { useState, useMemo, useEffect } from 'react'
import ReadingTime from '@/components/ReadingTime'
import RepeatedWords from '@/components/RepeatedWords'
import useFetchHTMLContent from '@/hooks/useFetchHTMLContent'
import {
  calculateFullMark,
  getPostHistory,
  getRadarData,
  isValidProvidedSourceURL,
  savePostToHistory,
} from '@/utils/utilities'
import { DEV_TO_SOURCE } from '@/utils/constants/sources'
import { FinalResponse } from '@/core/types/FinalResponse'
import ScannedPostsHistory from '@/components/ScannedPostsHistory'
import { LOCAL_STORAGE_KEY } from '@/utils/constants/configuration'
import { RadarData } from '@/interfaces/props/RadarComponent'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Spinner from '@/components/Spinner'
import { trackClearHistory, trackSubmitEvent } from '@/core/helpers/ga4Events'
import PromotedPosts from '@/components/PromotedPosts'
import useChangeScannedPostsCount from '@/hooks/useChangeScannedPostsCount'
import { OperationType } from '@/interfaces/props/ChangeScannedPostsCountProps'
import useAddFeaturedPost from '@/hooks/useAddFeaturedPost'
import SuspenseWrapper from '@/components/SuspenseWrapper'
import {
  AnimatedScore,
  ExceededSentences,
  FireworksCanvas,
  Footer,
  Header,
  LoadingErrorMessages,
  RadarChartSection,
  SubHeader,
  URLForm,
} from '@/utils/lazyImports'

const DevToPostAnalyzer: React.FC = () => {
  const [inputURL, setInputURL] = useState('')
  const [, setSubmittedURL] = useState('')
  const { content, loading, error, fetchHTMLContent } = useFetchHTMLContent()
  const [history, setHistory] = useState<FinalResponse[]>(getPostHistory())
  const [triggerRefetch, setTriggerRefetch] = useState(false)
  const isValidURL = isValidProvidedSourceURL(inputURL, DEV_TO_SOURCE)

  // Custom hooks
  const { changeScannedPostsCount } = useChangeScannedPostsCount({
    operation: OperationType.INCREMENT,
  })
  const { addFeaturedPost } = useAddFeaturedPost()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidURL) {
      trackSubmitEvent(inputURL)
      setSubmittedURL(inputURL)
      fetchHTMLContent(inputURL)
    }
    changeScannedPostsCount(1)
  }

  useEffect(() => {
    if (content) {
      addFeaturedPost({ content })
      setTriggerRefetch((prev) => !prev)
    }
  }, [content])

  const fullMark = useMemo(
    () => (content ? calculateFullMark(content) : 0),
    [content],
  )

  const data: RadarData[] = useMemo(
    () => getRadarData(content, fullMark),
    [content, fullMark],
  )

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
    <SuspenseWrapper fallback={<Spinner />}>
      <div className="relative dark:text-white min-h-screen flex flex-col bg-white dark:bg-cover dark:bg-bottom dark:bg-[url('@/assets/background.png')]">
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
        <PromotedPosts triggerRefetch={triggerRefetch} />
      </div>
      <ScrollToTopButton />
    </SuspenseWrapper>
  )
}

export default DevToPostAnalyzer
