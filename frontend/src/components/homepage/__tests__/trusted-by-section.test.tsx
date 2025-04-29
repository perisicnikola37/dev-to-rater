import { render, screen } from '@testing-library/react'
import TrustedBySection from '../trusted-by-section'

describe('TrustedBySection', () => {
  it('renders the section title', () => {
    render(<TrustedBySection />)

    expect(screen.getByText(/Trusted by Dev.to Writers/i)).toBeInTheDocument()
  })

  it('renders all profile images with links', () => {
    render(<TrustedBySection />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)

    links.forEach((link) => {
      expect(link).toHaveAttribute('href')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders the "+17" text', () => {
    render(<TrustedBySection />)

    expect(screen.getByText('+17')).toBeInTheDocument()
  })

  it('renders all profile images with correct alt text', () => {
    render(<TrustedBySection />)
    const images = screen.getAllByRole('img')

    expect(images).toHaveLength(4)
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('alt', `Dev.to Writer ${index + 1}`)
      expect(img).toHaveClass('rounded-full')
    })
  })
})
