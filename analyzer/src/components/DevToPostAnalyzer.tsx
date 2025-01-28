import React, { useState, useMemo } from 'react'
import useFetchHTMLContent from '../hooks/useFetchHTMLContent'
import { calculateFullMark, isValidProvidedSourceURL } from '../utils/globals'
import { DEV_TO_SOURCE } from '../utils/constants/sources'
import ExceededSentences from './ExceededSentences'
import FireworksCanvas from './FireworksCanvas'
import { RadarData } from './RadarChart'
import Footer from './FooterComponent'
import AnimatedScore from './AnimatedScore'
import Header from './HeaderComponent'
import URLForm from './URLFormComponent'
import LoadingErrorMessages from './LoadingErrorMessagesComponent'
import RadarChartSection from './RadarChartSectionComponent'

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

  const data: RadarData[] = [
    {
      subject: 'Headings',
      A: content?.headings?.length ?? 0,
      fullMark: fullMark,
    },
    {
      subject: 'Images',
      A: 10,
      fullMark: fullMark,
    },
    {
      subject: 'Links',
      A: content?.links?.length ?? 0,
      fullMark: fullMark,
    },
    {
      subject: 'Paragraphs',
      A: content?.sentences?.length ?? 0,
      fullMark: fullMark,
    },
  ]

  const animatedScore = useMemo(() => {
    return content?.totalScore && <AnimatedScore score={content.totalScore} />
  }, [content?.totalScore])

  return (
    <div>
      {content?.totalScore === 10 && <FireworksCanvas />}
      <div className="min-h-screen flex items-start justify-center mt-16 mb-16">
        <div className="w-full max-w-3xl rounded-3xl h-full flex flex-col items-center">
          <Header />
          <div className="absolute top-5 right-20 flex items-center space-x-4">
            <a
              className="border-b border-transparent hover:border-b-1 hover:border-b-blue-500 duration-200"
              href="https://docs.dev-to-rater.xyz"
              target="_blank"
            >
              docs
            </a>
            <a
              href="https://github.com/perisicnikola37/dev-to-rater"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="GitHub Repo stars"
                src="https://img.shields.io/github/stars/perisicnikola37/dev-to-rater"
              />
            </a>
          </div>
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DevToPostAnalyzer
