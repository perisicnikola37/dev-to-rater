import { render, screen } from '@testing-library/react'
import SubFooter from '../subfooter'

describe('SubFooter component', () => {
  it('renders the footer text', () => {
    render(<SubFooter />)

    expect(
      screen.getByText(/Wondering how we measure metrics/i),
    ).toBeInTheDocument()
  })

  it('renders the documentation link with correct href', () => {
    render(<SubFooter />)

    const link = screen.getByRole('link', {
      name: /view the core logic documentation/i,
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      'href',
      'https://docs.example.com/versions/1.2.3/essentials/paragraphs',
    )
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
