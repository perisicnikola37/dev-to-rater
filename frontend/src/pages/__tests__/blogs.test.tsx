import { render } from '@testing-library/react'
import { vi } from 'vitest'
import Blogs from '../blogs'

vi.mock('@/components/blogs/blogs-section', () => ({
  default: () => <div>Blogs Section</div>,
}))

describe('Blogs', () => {
  it('should render BlogsSection component', () => {
    const { getByText } = render(<Blogs />)

    expect(getByText('Blogs Section')).toBeInTheDocument()
  })
})
