import React, { useState } from 'react'
import logo from '../assets/logo.webp'
import { isValidDevToLink } from '../utils/globals'
import useFetchHTMLContent from '../hooks/useFetchHTMLContent'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import AnimatedScore from './AnimatedScore'

const DevToPostAnalyzer: React.FC = () => {
  const [inputURL, setInputURL] = useState('')
  const [, setSubmittedURL] = useState('')

  const { content, loading, error, fetchHTMLContent } = useFetchHTMLContent()

  const isValidURL = isValidDevToLink(inputURL)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidURL) {
      setSubmittedURL(inputURL)
      fetchHTMLContent(inputURL)
    }
  }

  const chartData = content
    ? [
        { name: 'Headings', count: content.headings.length },
        { name: 'Paragraphs', count: content.paragraphs.length },
        { name: 'Images', count: content.images.length },
        { name: 'Links', count: content.links.length },
      ]
    : []

  return (
    <div className="min-h-screen flex items-start justify-center mt-16">
      <div className="w-full max-w-3xl rounded-3xl h-full flex flex-col items-center">
        <div className="absolute top-5 right-20 flex items-center space-x-4">
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
            <span className="text-blue-400">Grow your audience.</span>
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
              className="flex-grow p-2 border border-gray-300 rounded-l-md"
            />
            <button
              type="submit"
              className="cursor-pointer p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-200"
            >
              Analyze
            </button>
          </form>
        </div>

        {loading && (
          <div className="mt-8 w-full text-center text-blue-500">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 w-full text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {content?.score && <AnimatedScore score={content.score} />}

        {content && !loading && !error && (
          <div className="mt-8 w-full flex justify-center">
            <div className="w-[2000px] text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Content Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{ fill: 'rgba(72, 124, 255, 0.5)' }} />
                  <Legend />
                  <Bar dataKey="count" fill="#4FD6FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {!content && !loading && !error && (
          <div className="mt-8 w-full text-center text-gray-500">
            <p>Enter a URL to analyze a post.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DevToPostAnalyzer
