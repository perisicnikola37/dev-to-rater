import React, { useState, useMemo } from 'react'
import logo from '../assets/logo.webp'
import useFetchHTMLContent from '../hooks/useFetchHTMLContent'

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  PolarAngleAxis,
} from 'recharts'
import AnimatedScore from './AnimatedScore'
import { isValidProvidedSourceURL } from '../utils/globals'
import { DEV_TO_SOURCE } from '../utils/constants/sources'
import ExceededSentences from './ExceededSentences'
import { ErrorMessages } from '../utils/messages'
import { FinalResponse } from '../core/types/FinalResponse'
import FireworksCanvas from './FireworksCanvas'

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

  const calculateFullMark = (content: FinalResponse) => {
    const totalItems =
      content?.headings.length +
      content?.links.length +
      content?.sentences.length

    const adjustedTotalItems =
      content?.sentences.length < content?.headings.length
        ? totalItems - content?.sentences.length
        : totalItems

    const average = adjustedTotalItems / 3
    return Math.min(average, 10)
  }

  const fullMark = useMemo(
    () => (content ? calculateFullMark(content) : 0),
    [content],
  )

  const data = [
    {
      subject: 'Headings',
      A: content?.headings.length,
      fullMark: fullMark,
    },
    {
      subject: 'Images',
      A: 10,
      fullMark: fullMark,
    },
    {
      subject: 'Links',
      A: content?.links.length,
      fullMark: fullMark,
    },
    {
      subject: 'Paragraphs',
      A: content?.sentences.length,
      fullMark: fullMark,
    },
  ]

  const animatedScore = useMemo(() => {
    return content?.totalScore && <AnimatedScore score={content.totalScore} />
  }, [content?.totalScore])

  return (
    <div>
      {content?.totalScore == 10 && <FireworksCanvas />}
      <div className="min-h-screen flex items-start justify-center mt-16 mb-16">
        <div className="w-full max-w-3xl rounded-3xl h-full flex flex-col items-center">
          <div className="absolute top-5 right-20 flex items-center space-x-4">
            <a
              className="border-b border-transparent hover:border-b-1 hover:border-b-blue-500 duration-200"
              href="http://147.79.101.61:3000"
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
          <div className="flex justify-between w-full items-center">
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              DEV.to Rater
            </h1>
            <img
              className="ml-4"
              src={logo}
              alt="Dev.to Logo"
              width="60"
              height="60"
            />
          </div>
          <div className="flex justify-start w-full mt-3">
            <p>
              Make your posts engaging.&nbsp;
              <span className="text-blue-600">Grow your audience.</span>
            </p>
          </div>
          <div className="flex justify-start w-full mt-3">
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center mt-3"
            >
              <input
                type="text"
                value={inputURL}
                onChange={(e) => setInputURL(e.target.value)}
                placeholder="Enter post URL"
                className="flex-grow p-2 border border-gray-300 rounded-l-md outline-none"
              />

              <button
                type="submit"
                className="cursor-pointer p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-200 border-1 border-blue-500"
              >
                Analyze
              </button>
            </form>
          </div>

          {loading && (
            <div className="mt-8 w-full text-center text-blue-500">
              <p>Calculating...</p>
            </div>
          )}

          {error && (
            <div className="mt-8 w-full text-center text-red-500">
              <p>{ErrorMessages.POST_NOT_FOUND}</p>
            </div>
          )}

          {!error && content && (
            <>
              {animatedScore}
              <div className="mt-8 w-full flex justify-center">
                <div className="w-[2000px] text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Content Breakdown
                  </h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Content"
                        dataKey="A"
                        stroke="#4FD6FF"
                        fill="#4FD6FF"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <ExceededSentences content={content} />
            </>
          )}
          {!content && !loading && !error && (
            <div className="mt-8 w-full text-center text-gray-500">
              <p>Enter a URL to analyze a post.</p>
            </div>
          )}
        </div>
      </div>

      <footer>
        <p className="text-center mb-10 mt-10">
          If you wonder how we measure metrics, visit our documentation{' '}
          <a
            href="http://147.79.101.61:3000/versions/v2/essentials/paragraphs"
            target="_blank"
            className="text-blue-400"
          >
            here
          </a>
          .
        </p>
      </footer>
    </div>
  )
}

export default DevToPostAnalyzer
