import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import PromotedPosts from '../promoted-posts'

vi.mock('@/utils/lazyImports', () => ({
  Spinner: () => <div>Loading...</div>,
}))

describe('PromotedPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display loading spinner initially', () => {
    render(<PromotedPosts triggerRefetch={false} />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
