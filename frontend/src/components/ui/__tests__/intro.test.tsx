import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Intro from '../intro'

describe('Intro component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>)
  }

  it('renders heading and subheading', () => {
    renderWithRouter(<Intro />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Dev.to Rater',
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Make your posts engaging.',
    )
    expect(screen.getByText('Grow your audience.')).toBeInTheDocument()
  })

  it('renders logo image with correct alt text', () => {
    renderWithRouter(<Intro />)
    const image = screen.getByAltText('Dev.to Rater Logo') as HTMLImageElement

    expect(image).toBeInTheDocument()
    expect(image.width).toBe(45)
    expect(image.height).toBe(20)
  })

  it('logo image is wrapped in a link to "/"', () => {
    renderWithRouter(<Intro />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')

    const image = screen.getByAltText('Dev.to Rater Logo')
    expect(link).toContainElement(image)
  })
})
