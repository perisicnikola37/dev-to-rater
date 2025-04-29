import { render, screen } from '@testing-library/react'
import { useSpring } from 'react-spring'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import AnimatedScore from '../animated-score'

vi.mock('react-spring', () => {
  return {
    animated: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      div: ({ children, className }: any) => (
        <div className={className}>{children}</div>
      ),
    },
    useSpring: vi.fn(),
  }
})

describe('AnimatedScore component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(useSpring as unknown as Mock).mockReturnValue({
      number: {
        to: (cb: (n: number) => string) => cb(42.42),
      },
    })
  })

  it('renders with default props', () => {
    render(<AnimatedScore score={42.42} />)

    expect(screen.getByText('SCORE')).toBeInTheDocument()
    expect(screen.getByText('42.42')).toBeInTheDocument()
    expect(screen.getByText('42.42')).toHaveClass(
      'text-3xl font-bold text-blue-400',
    )
  })

  it('calls useSpring with correct parameters', () => {
    render(<AnimatedScore score={10} />)

    expect(useSpring).toHaveBeenCalledWith({
      number: 10,
      from: { number: 0 },
      reset: true,
      reverse: false,
      config: { tension: 100, friction: 20 },
    })
  })

  it('reverses animation when score is negative', () => {
    render(<AnimatedScore score={-5} />)

    expect(useSpring).toHaveBeenCalledWith(
      expect.objectContaining({ reverse: true }),
    )
  })
})
