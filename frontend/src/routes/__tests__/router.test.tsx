import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Router from '../router'
import { FrontendApplicationRoutes } from '../routes'

// Mock react-router-dom to provide our own Outlet component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet-placeholder"></div>,
  }
})

// Mock pages
vi.mock('@/pages/homepage', () => ({
  default: () => <div>Mock HomePage</div>,
}))

vi.mock('@/pages/dev-to-post-analyzer', () => ({
  default: () => <div>Mock DevToPostAnalyzer</div>,
}))

vi.mock('@/pages/blogs', () => ({
  default: () => <div>Mock Blogs</div>,
}))

vi.mock('@/pages/layouts/RootLayout', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Outlet } = require('react-router-dom')
  return {
    default: () => (
      <div>
        Mock RootLayout <Outlet />
      </div>
    ),
  }
})

describe('Router', () => {
  it('renders HomePage on default route', () => {
    render(
      <MemoryRouter initialEntries={[FrontendApplicationRoutes.HOME]}>
        <Router />
      </MemoryRouter>,
    )

    expect(screen.getByText('Mock HomePage')).toBeInTheDocument()
    expect(screen.getByText(/Mock RootLayout/)).toBeInTheDocument()
  })

  it('renders DevToPostAnalyzer on /rater route', () => {
    render(
      <MemoryRouter initialEntries={[FrontendApplicationRoutes.RATER]}>
        <Router />
      </MemoryRouter>,
    )

    expect(screen.getByText('Mock DevToPostAnalyzer')).toBeInTheDocument()
    expect(screen.getByText(/Mock RootLayout/)).toBeInTheDocument()
  })

  it('renders Blogs on /blogs route', () => {
    render(
      <MemoryRouter initialEntries={[FrontendApplicationRoutes.BLOGS]}>
        <Router />
      </MemoryRouter>,
    )

    expect(screen.getByText('Mock Blogs')).toBeInTheDocument()
    expect(screen.getByText(/Mock RootLayout/)).toBeInTheDocument()
  })

  it('renders layout wrapper', () => {
    render(
      <MemoryRouter initialEntries={[FrontendApplicationRoutes.HOME]}>
        <Router />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Mock RootLayout/)).toBeInTheDocument()
  })
})
