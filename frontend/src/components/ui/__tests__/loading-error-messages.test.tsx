import { ErrorMessages } from '@/utils/constants/messages'
import { render, screen } from '@testing-library/react'
import LoadingErrorMessages from '../loading-error-messages'

describe('LoadingErrorMessages', () => {
  it('should display error message when error is true', () => {
    render(<LoadingErrorMessages loading error={true} content={null} />)

    const errorMessage = screen.getByText(ErrorMessages.PostNotFound)
    expect(errorMessage).toBeInTheDocument()
  })

  it('should display content missing message when content is null', () => {
    render(<LoadingErrorMessages loading error={false} content={null} />)

    const missingContentMessage = screen.getByText(
      'Enter a URL to analyze a post.',
    )
    expect(missingContentMessage).toBeInTheDocument()
  })

  it('should render nothing when neither error nor content are present', () => {
    render(<LoadingErrorMessages loading error={false} content={true} />)

    const message = screen.queryByText(ErrorMessages.PostNotFound)
    expect(message).not.toBeInTheDocument()

    const missingContentMessage = screen.queryByText(
      'Enter a URL to analyze a post.',
    )
    expect(missingContentMessage).not.toBeInTheDocument()
  })
})
