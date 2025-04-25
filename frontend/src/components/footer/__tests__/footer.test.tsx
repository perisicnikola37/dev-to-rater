import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Footer from '../footer'

vi.mock('@/utils/utilities', () => ({
  getDocumentationURL: () => 'https://docs.example.com',
}))

describe('Footer', () => {
  it('should render logo and footer links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    const logo = screen.getByAltText('Dev.to Rater Logo')
    expect(logo).toBeInTheDocument()

    const aboutLink = screen.getByText('About')
    expect(aboutLink).toBeInTheDocument()
    const blogsLink = screen.getByText('Blogs')
    expect(blogsLink).toBeInTheDocument()
    const contactLink = screen.getByText('Contact Us')
    expect(contactLink).toBeInTheDocument()
    const docsLink = screen.getByText('Docs')
    expect(docsLink).toBeInTheDocument()
  })

  it('should open external links in a new tab', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    const aboutLink = screen.getByText('About')
    expect(aboutLink).toHaveAttribute('target', '_blank')
    const contactLink = screen.getByText('Contact Us')
    expect(contactLink).toHaveAttribute('target', '_blank')
    const docsLink = screen.getByText('Docs')
    expect(docsLink).toHaveAttribute('target', '_blank')
  })

  it('should display the current year in the copyright text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    const currentYear = new Date().getFullYear()
    const copyrightText = screen.getByText(
      `© ${currentYear}. All Rights Reserved.`,
    )

    expect(copyrightText).toBeInTheDocument()
  })

  it('should scroll to the top when clicking the logo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock

    const logo = screen.getByAltText('Dev.to Rater Logo')
    fireEvent.click(logo)

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
