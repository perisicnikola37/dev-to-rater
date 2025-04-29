import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ScrollArrow from '../scroll-arrow'

describe('ScrollArrow component', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    window.scrollY = 0
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('hides the arrow when scrollY is greater than 300', () => {
    render(<ScrollArrow />)

    window.scrollY = 400
    window.dispatchEvent(new Event('scroll'))

    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument()
  })

  it('attaches and detaches scroll event listener', () => {
    const { unmount } = render(<ScrollArrow />)

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    )

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    )
  })
})
