import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import VideoModal from '../video-modal'

describe('VideoModal', () => {
  it('should show the play button when showVideo is false', () => {
    const setShowVideo = vi.fn()
    render(<VideoModal showVideo={false} setShowVideo={setShowVideo} />)

    const playButton = screen.getByRole('button', {
      name: /Dev\.to Rater in 30 seconds/i,
    })
    expect(playButton).toBeInTheDocument()

    fireEvent.click(playButton)

    expect(setShowVideo).toHaveBeenCalledWith(true)
  })

  it('should close the video modal when close button is clicked', () => {
    const setShowVideo = vi.fn()
    render(<VideoModal showVideo={true} setShowVideo={setShowVideo} />)

    const closeButton = screen.getByRole('button', { name: /✕/ })

    fireEvent.click(closeButton)

    expect(setShowVideo).toHaveBeenCalledWith(false)
  })
})
