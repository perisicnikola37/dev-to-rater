import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import BlogsSection from '../blogs-section'

vi.mock('../wrappers/motion-wrapper', async () => {
  const actual =
    await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    __esModule: true,
    default: {
      div: actual.motion.div,
    },
  }
})

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('BlogsSection', () => {
  it('renders all blog posts by default', () => {
    renderWithRouter(<BlogsSection />)

    expect(screen.getByText('Intro to React')).toBeInTheDocument()
    expect(screen.getByText('Blockchain Basics')).toBeInTheDocument()
  })

  it('shows message when no posts for tag', () => {
    renderWithRouter(<BlogsSection />)

    fireEvent.click(screen.getByText('Artificial Intelligence'))
    expect(
      screen.getByText('No posts available for this tag.'),
    ).toBeInTheDocument()
  })
})
