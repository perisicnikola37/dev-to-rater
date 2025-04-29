import { FinalResponse } from '@/core/types/FinalResponse'
import { RadarData } from '@/interfaces/props/RadarComponent'
import {
  ExceededSentences,
  RadarChartSection,
  ReadingTime,
  RepeatedWords,
  Spinner,
  SuspenseWrapper,
} from '@/utils/lazyImports'
import React from 'react'

interface AnalyzeContentLayoutProps {
  content: FinalResponse | null
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
