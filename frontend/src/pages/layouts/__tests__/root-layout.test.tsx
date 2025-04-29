import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RootLayout from '../RootLayout'

vi.mock('@/utils/lazyImports', () => ({
  ScrollToTopButton: () => (
    <div data-testid="mock-scroll-button">Scroll To Top</div>
  ),
  Spinner: () => <div data-testid="mock-spinner">Loading...</div>,
  SuspenseWrapper: ({
    children,
    fallback,
  }: {
    children: React.ReactNode
    fallback: React.ReactNode
  }) => (
    <div data-testid="mock-suspense-wrapper">
      <div data-testid="fallback-content">{fallback}</div>
      <div data-testid="suspense-children">{children}</div>
    </div>
  ),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>,
  }
})

describe('RootLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with all required components', () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('mock-suspense-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('fallback-content')).toBeInTheDocument()
    expect(screen.getByTestId('mock-spinner')).toBeInTheDocument()
    expect(screen.getByTestId('suspense-children')).toBeInTheDocument()
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument()
    expect(screen.getByTestId('mock-scroll-button')).toBeInTheDocument()

    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('flex-grow')
  })

  it('renders main element with correct structure', () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>,
    )

    const mainElement = screen.getByRole('main')
    expect(mainElement).toContainElement(screen.getByTestId('mock-outlet'))
  })
})
