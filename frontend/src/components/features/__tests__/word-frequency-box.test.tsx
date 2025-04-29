import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import WordFrequencyBox from '../word-frequency-box'

vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

vi.mock('@/assets/images/word_frequency.webp', () => ({
  default: 'mocked-word-frequency.webp',
}))

describe('WordFrequencyBox', () => {
  it('should render the Word Frequency title and description', () => {
    render(<WordFrequencyBox />)

    expect(screen.getByText('Word Frequency')).toBeInTheDocument()
    expect(
      screen.getByText('Repeated words are not a problem anymore.'),
    ).toBeInTheDocument()
  })

  it('should render the image with the correct alt text and src', () => {
    render(<WordFrequencyBox />)

    const image = screen.getByAltText(
      'Dev.to Rater - Word repetition frequency',
    ) as HTMLImageElement

    expect(image).toHaveAttribute('src', 'mocked-word-frequency.webp')
    expect(image).toHaveAttribute(
      'alt',
      'Dev.to Rater - Word repetition frequency',
    )
  })
})
