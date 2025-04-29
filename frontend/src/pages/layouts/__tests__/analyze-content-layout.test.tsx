import { finalResponseMock } from '@/components/data-display/__tests__/__mocks__/finalResponseMock'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import AnalyzeContentLayout from '../AnalyzeContentLayout'
import { mockSubjectData } from './__mocks__/mockSubjectData'

vi.mock('@/utils/lazyImports', () => ({
  ExceededSentences: vi.fn(() => <div>ExceededSentences</div>),
  RepeatedWords: vi.fn(() => <div>RepeatedWords</div>),
  ReadingTime: vi.fn(() => <div>ReadingTime</div>),
  RadarChartSection: vi.fn(() => <div>RadarChartSection</div>),
  SuspenseWrapper: vi.fn(({ children }) => <div>{children}</div>),
  Spinner: vi.fn(() => <div>Spinner</div>),
}))

describe('AnalyzeContentLayout', () => {
  const mockAnimatedScore = <div>Animated Score</div>

  it('should render null when isContentVisible is false', () => {
    render(
      <AnalyzeContentLayout
        fullMark={100}
        content={finalResponseMock}
        data={mockSubjectData}
        animatedScore={mockAnimatedScore}
        isContentVisible={false}
        error={false}
      />,
    )

    expect(screen.queryByText('Animated Score')).not.toBeInTheDocument()
  })

  it('should render null when error is true', () => {
    render(
      <AnalyzeContentLayout
        fullMark={100}
        content={finalResponseMock}
        data={mockSubjectData}
        animatedScore={mockAnimatedScore}
        isContentVisible={false}
        error={true}
      />,
    )

    expect(screen.queryByText('Animated Score')).not.toBeInTheDocument()
  })

  it('should render null when content is null', () => {
    render(
      <AnalyzeContentLayout
        fullMark={100}
        content={null}
        data={mockSubjectData}
        animatedScore={mockAnimatedScore}
        isContentVisible={true}
        error={false}
      />,
    )

    expect(screen.queryByText('Animated Score')).not.toBeInTheDocument()
  })

  it('should render the correct components when content is valid', () => {
    render(
      <AnalyzeContentLayout
        fullMark={100}
        content={finalResponseMock}
        data={mockSubjectData}
        animatedScore={mockAnimatedScore}
        isContentVisible={true}
        error={false}
      />,
    )

    expect(screen.getByText('Animated Score')).toBeInTheDocument()
    expect(screen.getByText('RadarChartSection')).toBeInTheDocument()
    expect(screen.getByText('ExceededSentences')).toBeInTheDocument()
    expect(screen.getByText('RepeatedWords')).toBeInTheDocument()
    expect(screen.getByText('ReadingTime')).toBeInTheDocument()
  })
})
