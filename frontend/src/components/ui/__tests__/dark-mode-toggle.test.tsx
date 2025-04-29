import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DarkModeToggle from '../dark-mode-toggle'

beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )

  const store: Record<string, string> = {}
  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((k) => delete store[k])
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
  })

  document.documentElement.className = ''
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('DarkModeToggle', () => {
  it('renders with light mode by default if localStorage is empty and prefers-color-scheme is not dark', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )

    render(<DarkModeToggle />)

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(screen.getByRole('button').textContent).toBe('🌙')
  })

  it('renders with dark mode if localStorage is set to true', () => {
    localStorage.setItem('darkMode', 'true')
    render(<DarkModeToggle />)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByRole('button').textContent).toBe('☀️')
  })

  it('toggles dark mode on button click', () => {
    render(<DarkModeToggle />)
    const button = screen.getByRole('button')

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(button.textContent).toBe('🌙')

    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('darkMode')).toBe('true')
    expect(button.textContent).toBe('☀️')

    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('darkMode')).toBe('false')
    expect(button.textContent).toBe('🌙')
  })
})
