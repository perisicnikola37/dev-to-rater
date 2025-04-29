/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Breadcrumb from '../breadcrumb'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom')
  return {
    ...actual,
    Link: ({ to, children, className }: any) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
  }
})

describe('Breadcrumb', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all breadcrumb links and texts', () => {
    render(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Subcategory')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
  })

  it('applies the passed className', () => {
    render(
      <MemoryRouter>
        <Breadcrumb className="custom-class" />
      </MemoryRouter>,
    )

    const nav = screen.getByRole('navigation')
    expect(nav.className).toContain('custom-class')
  })

  it('has correct href values on links', () => {
    render(
      <MemoryRouter>
        <Breadcrumb />
      </MemoryRouter>,
    )

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Category').closest('a')).toHaveAttribute(
      'href',
      '/category',
    )
    expect(screen.getByText('Subcategory').closest('a')).toHaveAttribute(
      'href',
      '/category/subcategory',
    )
  })
})
