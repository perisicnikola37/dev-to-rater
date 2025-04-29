import TryNowSection from '@/components/homepage/try-now-section'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('TryNowSection', () => {
  it('renders the title and button correctly', () => {
    render(
      <MemoryRouter>
        <TryNowSection />
      </MemoryRouter>,
    )

    expect(screen.getByText('Dev.to Rater')).toBeInTheDocument()
    expect(screen.getByText('Grow your audience.')).toBeInTheDocument()

    const tryNowButton = screen.getByRole('link', { name: /try now/i })
    expect(tryNowButton).toBeInTheDocument()
    expect(tryNowButton).toHaveAttribute('href', '/rater')
  })
})
