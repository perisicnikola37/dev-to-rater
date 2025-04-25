import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Preloader from '../preloader'

describe('Preloader', () => {
  it('renders the section wrapper', () => {
    render(<Preloader />)
    const section = screen.getByRole('status').closest('section')

    expect(section).toBeInTheDocument()
  })

  it('renders the loading spinner with correct classes', () => {
    render(<Preloader />)
    const spinner = screen.getByRole('status')

    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('spinner-border')
    expect(spinner).toHaveClass('animate-spin')
    expect(spinner).toHaveClass('w-12')
    expect(spinner).toHaveClass('h-12')
    expect(spinner).toHaveClass('border-4')
    expect(spinner).toHaveClass('text-blue-500')
  })

  it('has appropriate aria attributes for accessibility', () => {
    render(<Preloader />)
    const spinner = screen.getByRole('status')

    expect(spinner).toHaveAttribute('aria-label', 'Loading...')
  })
})
