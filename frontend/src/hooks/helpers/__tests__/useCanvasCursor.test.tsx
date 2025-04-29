import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import useCanvasCursor from '../useCanvasCursor'

const mockCanvas = {
  getContext: vi.fn().mockReturnValue({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    quadraticCurveTo: vi.fn(),
    stroke: vi.fn(),
    closePath: vi.fn(),
    canvas: { width: 800, height: 600 },
    globalCompositeOperation: '',
    strokeStyle: '',
    lineWidth: 1,
  }),
}

global.document.getElementById = vi.fn().mockReturnValue(mockCanvas)
global.document.addEventListener = vi.fn()
global.document.removeEventListener = vi.fn()
global.window.dispatchEvent = vi.fn()
global.window.requestAnimationFrame = vi.fn((cb) => cb())

describe('useCanvasCursor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize canvas and start animation on mount', () => {
    renderHook(() => useCanvasCursor())

    expect(document.getElementById).toHaveBeenCalledWith('canvas')

    expect(mockCanvas.getContext).toHaveBeenCalledWith('2d')
  })

  it('should add event listeners on mount and remove them on unmount', () => {
    const { unmount } = renderHook(() => useCanvasCursor())

    expect(document.addEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
    )

    unmount()

    expect(document.removeEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
    )
  })
})
