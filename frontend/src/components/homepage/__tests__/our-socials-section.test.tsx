/* eslint-disable @typescript-eslint/no-explicit-any */
import { ourSocials } from '@/utils/constants/configuration'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import OurSocialsSection from '../our-socials-section'

global.IntersectionObserver = class {
  callback: any
  options: any
  constructor(callback: any, options: any) {
    this.callback = callback
    this.options = options
  }
  root = null
  rootMargin = ''
  thresholds = []
  observe() {
    this.callback([{ isIntersecting: true, target: {} }])
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

vi.mock('@/utils/constants/configuration', () => ({
  ourSocials: [
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
  ],
}))

describe('OurSocialsSection', () => {
  test('renders OurSocialsSection with title', () => {
    render(<OurSocialsSection />)
    const title = screen.getByText(/our socials/i)

    expect(title).toBeInTheDocument()
  })

  test('renders the correct number of cards based on ourSocials', () => {
    render(<OurSocialsSection />)
    const cards = screen.getAllByRole('article')

    expect(cards).toHaveLength(ourSocials.length)
  })
})
