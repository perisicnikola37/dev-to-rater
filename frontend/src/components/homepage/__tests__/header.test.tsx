import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../header'

describe('Header', () => {
  const setup = () => render(<Header />, { wrapper: MemoryRouter })

  it('renders logo image', () => {
    setup()
    const logo = screen.getByAltText('Dev.to Rater Logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders Scan now link to /rater', () => {
    setup()
    const scanNowLinks = screen.getAllByText('Scan now')
    scanNowLinks.forEach((link) => {
      expect(link.closest('a')).toHaveAttribute('href', '/rater')
    })
  })
})
