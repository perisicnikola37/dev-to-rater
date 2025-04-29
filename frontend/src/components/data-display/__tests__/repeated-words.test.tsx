import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import RepeatedWords from '../repeated-words'
import { finalResponseMock } from './__mocks__/finalResponseMock'

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock)

vi.mock('@/utils/utilities', () => ({
  getRandomMessage: vi.fn(),
}))

describe('RepeatedWords Component', () => {
  it('renders "No data available" when content is null', () => {
    render(<RepeatedWords content={null} />)
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('displays the correct color for average repeats', () => {
    render(<RepeatedWords content={finalResponseMock} />)

    const avgText = screen.getByText('Avg. word frequency:')
    const avgColor = avgText.querySelector('span')

    if (avgColor) {
      expect(avgColor).toHaveClass('text-yellow-400')
    }
  })
})
