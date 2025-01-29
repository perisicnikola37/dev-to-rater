import React, { useState, useMemo, Suspense } from 'react'
import ReadingTime from '@/components/ReadingTime'
import RepeatedWords from '@/components/RepeatedWords'
import { RadarData } from '@/interfaces/props/RadarComponentProps'
import useFetchHTMLContent from '@/hooks/useFetchHTMLContent'
import { calculateFullMark, isValidProvidedSourceURL } from '@/utils/utilities'
import { DEV_TO_SOURCE } from '@/utils/constants/sources'

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
].map((component) => React.lazy(() => import(`../components/${component}.tsx`)))

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

  const isValidURL = isValidProvidedSourceURL(inputURL, DEV_TO_SOURCE)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidURL) {
      setSubmittedURL(inputURL)
      fetchHTMLContent(inputURL)
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

  return (
    <SuspenseWrapper fallback={<></>}>
      <div>
        {content?.totalScore === 10 && <FireworksCanvas />}
        <div className="min-h-screen flex items-start justify-center mt-16 mb-16">
          <div className="w-full max-w-3xl rounded-3xl h-full flex flex-col items-center">
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
        <Footer />
      </div>
    </SuspenseWrapper>
  )
}

export default DevToPostAnalyzer
