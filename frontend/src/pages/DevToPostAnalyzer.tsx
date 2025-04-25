import React, { useState, useMemo, useEffect } from 'react'
import useFetchHTMLContent from '@/hooks/common/useFetchHTMLContent'
import {
  calculateFullMark,
  copyBlogMarkdownToClipboard,
  getPostHistory,
  getRadarData,
  isValidProvidedSourceURL,
  savePostToHistory,
} from '@/utils/utilities'
import { DEV_TO_SOURCE } from '@/utils/constants/sources'
import { FinalResponse } from '@/core/types/FinalResponse'
import { LOCAL_STORAGE_KEY } from '@/utils/constants/configuration'
import { RadarData } from '@/interfaces/props/RadarComponent'
import { trackClearHistory, trackSubmitEvent } from '@/core/helpers/ga4Events'
import useChangeScannedPostsCount from '@/hooks/common/useChangeScannedPostsCount'
import { OperationType } from '@/interfaces/props/ChangeScannedPostsCountProps'
import useAddFeaturedPost from '@/hooks/common/useAddFeaturedPost'
import {
  AnimatedScore,
  FireworksCanvas,
  Intro,
  LoadingErrorMessages,
  PromotedPosts,
  ScannedPostsHistory,
  ScrollToTopButton,
  Spinner,
  SubFooter,
  SubHeader,
  SuspenseWrapper,
} from '@/utils/lazyImports'
import AnalyzeContentLayout from './layouts/AnalyzeContentLayout'
import RefactoredInfo from './RefactoredInfo'
import { Toaster } from 'sonner'
import URLForm from '@/components/Forms/URLForm'

const DevToPostAnalyzer = () => {
  const [inputURL, setInputURL] = useState('')
  const [, setSubmittedURL] = useState('')
  const { content, error, fetchHTMLContent } = useFetchHTMLContent()
  const [history, setHistory] = useState<FinalResponse[]>(getPostHistory())
  const [triggerRefetch, setTriggerRefetch] = useState(false)
  const isValidURL = isValidProvidedSourceURL(inputURL, DEV_TO_SOURCE)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isContentVisible, setIsContentVisible] = useState(true)

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
      changeScannedPostsCount(1)
      setIsDisabled(false)

      setIsContentVisible(true)
    }
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
      <div
        className={
          'relative dark:text-white min-h-screen flex flex-col bg-white dark:bg-cover dark:bg-bottom dev-to-rater-bg z-5000'
        }
      >
        {content?.totalScore == 10 && <FireworksCanvas />}
        <div className="flex items-start justify-center mt-16 mb-16">
          <div className="w-full max-w-3xl rounded-3xl flex flex-col items-center">
            <Intro />
            <SubHeader />
            <Toaster />
            <URLForm
              inputURL={inputURL}
              setInputURL={setInputURL}
              handleSubmit={handleSubmit}
              handleCopy={() => {
                if (
                  content?.markdown &&
                  (content.changedWords?.length ?? 0) > 0
                ) {
                  copyBlogMarkdownToClipboard({ markdown: content.markdown })
                }
                setIsContentVisible(false)
              }}
              isDisabled={isDisabled}
            />
            <LoadingErrorMessages error={!!error} content={content} />
            {content && (
              <AnalyzeContentLayout
                content={content}
                fullMark={fullMark}
                data={data}
                animatedScore={animatedScore}
                isContentVisible={isContentVisible}
                error={!!error}
              />
            )}
            <RefactoredInfo
              isContentVisible={isContentVisible}
              changedWords={content?.changedWords || []}
            />
          </div>
        </div>
        <ScannedPostsHistory
          history={history}
          clearHistory={clearHistory}
          url={inputURL}
        />
        <SubFooter />
        <PromotedPosts triggerRefetch={triggerRefetch} />
      </div>
      <ScrollToTopButton />
    </SuspenseWrapper>
  )
}

export default DevToPostAnalyzer
