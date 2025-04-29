import { render } from '@testing-library/react'
import { vi } from 'vitest'
import RefactoredInfo from '../refactored-info'

vi.mock('@/utils/lazyImports', () => ({
  FireworksCanvas: () => <div>Fireworks</div>,
}))

describe('RefactoredInfo', () => {
  it('should render a message when there are no changed words', () => {
    const { getByText } = render(
      <RefactoredInfo changedWords={[]} isContentVisible={false} />,
    )

    expect(
      getByText('Great post sensei 🚀 Nothing to refactor.'),
    ).toBeInTheDocument()
    expect(getByText('Keep writing.')).toBeInTheDocument()
    expect(getByText('Fireworks')).toBeInTheDocument()
  })

  it('should not render anything when isContentVisible is true', () => {
    const { queryByText } = render(
      <RefactoredInfo changedWords={[]} isContentVisible={true} />,
    )

    expect(
      queryByText('Great post sensei 🚀 Nothing to refactor.'),
    ).not.toBeInTheDocument()
    expect(queryByText('Fireworks')).not.toBeInTheDocument()
    expect(queryByText('Changed Words')).not.toBeInTheDocument()
  })
})
