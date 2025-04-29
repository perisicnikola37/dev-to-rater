import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ReadingTime from '../reading-time'

describe('ReadingTime', () => {
  it('renders correct message for 1 minute', () => {
    render(<ReadingTime readingTime={1} />)

    expect(screen.getByText('Too short!')).toBeInTheDocument()
    expect(
      screen.getByText(/may not provide enough information/),
    ).toBeInTheDocument()
  })

  it('renders correct message for 4 minutes', () => {
    render(<ReadingTime readingTime={4} />)

    expect(screen.getByText('Quick read!')).toBeInTheDocument()
    expect(screen.getByText(/short and easy to read/)).toBeInTheDocument()
  })

  it('renders correct message for 7 minutes', () => {
    render(<ReadingTime readingTime={7} />)

    expect(screen.getByText('Perfect length!')).toBeInTheDocument()
    expect(screen.getByText(/ideal length/)).toBeInTheDocument()
  })

  it('renders correct message for 15 minutes', () => {
    render(<ReadingTime readingTime={15} />)
    expect(screen.getByText('Quite long!')).toBeInTheDocument()
    expect(screen.getByText(/might feel overwhelming/)).toBeInTheDocument()
  })
})
