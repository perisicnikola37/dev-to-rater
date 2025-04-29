import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ExceededSentencesBox from '../exceeded-sentences-box'

describe('ExceededSentencesBox', () => {
  beforeAll(() => {
    global.IntersectionObserver = class {
      observe() {}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
  })

  test('should render Exceeded Sentences Box with correct title and description', () => {
    render(
      <BrowserRouter>
        <ExceededSentencesBox />
      </BrowserRouter>,
    )

    expect(screen.getByText('Exceeded sentences.')).toBeInTheDocument()
    expect(screen.getByText('With just one click.')).toBeInTheDocument()
  })

  test('should render sentences with correct exceeded word count', () => {
    render(
      <BrowserRouter>
        <ExceededSentencesBox />
      </BrowserRouter>,
    )

    expect(screen.getByText('exceeded by 15 words.')).toBeInTheDocument()
    expect(screen.getByText('exceeded by 5 words.')).toBeInTheDocument()
  })

  test('should render the "Scan now" link with correct href', () => {
    render(
      <BrowserRouter>
        <ExceededSentencesBox />
      </BrowserRouter>,
    )

    const link = screen.getByText('Scan now')
    expect(link).toHaveAttribute('href', '/rater')
  })

  test('should trigger navigation when clicking "Scan now" button', () => {
    render(
      <BrowserRouter>
        <ExceededSentencesBox />
      </BrowserRouter>,
    )

    const link = screen.getByText('Scan now')
    fireEvent.click(link)

    // Check if the URL has changed, depending on your routing setup
    expect(window.location.pathname).toBe('/rater')
  })
})
