import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import SubHeader from '../subheader'

describe('SubHeader component', () => {
  beforeAll(() => {
    global.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders the docs and repo links', () => {
    render(<SubHeader />)

    expect(
      screen.getByRole('link', { name: /View the documentation/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Visit GitHub repository/i }),
    ).toBeInTheDocument()
  })

  it('renders the DarkModeToggle component', () => {
    render(<SubHeader />)

    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument()
  })
})
