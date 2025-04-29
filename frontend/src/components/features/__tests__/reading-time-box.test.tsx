import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ReadingTimeBox from '../reading-time-box'

vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

vi.mock('@/assets/images/reading_time.webp', () => ({
  default: 'mocked-reading-time.webp',
}))

describe('ReadingTimeBox', () => {
  it('should render the Reading Time title and description', () => {
    render(<ReadingTimeBox />)

    expect(screen.getByText('Reading Time')).toBeInTheDocument()

    expect(screen.getByText('Find the perfect balance.')).toBeInTheDocument()
  })

  it('should render the image with the correct alt text and src', () => {
    render(<ReadingTimeBox />)

    const image = screen.getByAltText(
      'Dev.to Rater - Reading time of blog post',
    ) as HTMLImageElement
    expect(image).toHaveAttribute('src', 'mocked-reading-time.webp')
    expect(image).toHaveAttribute(
      'alt',
      'Dev.to Rater - Reading time of blog post',
    )
  })
})
