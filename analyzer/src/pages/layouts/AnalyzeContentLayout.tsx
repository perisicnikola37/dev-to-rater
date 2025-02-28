import React from 'react'
import { RadarData } from '@/interfaces/props/RadarComponent'
import {
  ExceededSentences,
  RepeatedWords,
  ReadingTime,
  RadarChartSection,
} from '@/utils/lazyImports'
import { Spinner, SuspenseWrapper } from '@/utils/lazyImports'
import { FinalResponse } from '@/core/types/FinalResponse'

interface AnalyzeContentLayoutProps {
  content: FinalResponse
  fullMark: number
  data: RadarData[]
  animatedScore: JSX.Element | null
  isContentVisible: boolean
  error: boolean
}

const AnalyzeContentLayout: React.FC<AnalyzeContentLayoutProps> = ({
  content,
  data,
  animatedScore,
  isContentVisible,
  error,
}) => {
  if (!isContentVisible || error || !content) {
    return null
  }

  return (
    <>
      {animatedScore}
      <SuspenseWrapper fallback={<Spinner />}>
        <RadarChartSection data={data} />
      </SuspenseWrapper>
      <ExceededSentences content={content} />
      <RepeatedWords content={content} />
      <ReadingTime readingTime={content?.readingTime} />
    </>
  )
}

export default AnalyzeContentLayout
