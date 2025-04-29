import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ScrollToTopButton from '../scroll-to-top-button'

vi.mock('@/assets/icons/productHunt.svg', () => ({
  default: 'mock-productHunt.svg',
}))

describe('ScrollToTopButton', () => {
  it('should not be visible initially when scrollY is less than 300', () => {
    render(<ScrollToTopButton />)

    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })

  it('should be visible when scrollY is more than 300', () => {
    render(<ScrollToTopButton />)

    act(() => {
      window.scrollY = 301
      window.dispatchEvent(new Event('scroll'))
    })

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should call scrollToTop when button is clicked', () => {
    render(<ScrollToTopButton />)

    act(() => {
      window.scrollY = 301
      window.dispatchEvent(new Event('scroll'))
    })

    const button = screen.getByRole('button')

    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock

    fireEvent.click(button)

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('should clean up the scroll event listener when unmounted', () => {
    const { unmount } = render(<ScrollToTopButton />)

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    )
  })
})
