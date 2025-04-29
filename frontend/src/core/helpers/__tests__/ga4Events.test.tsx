import ReactGA from 'react-ga4'
import { vi } from 'vitest'
import { trackClearHistory, trackSubmitEvent } from '../ga4Events'

vi.mock('react-ga4', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as object),
    event: vi.fn(),
  }
})

describe('trackEvent', () => {
  it('should call ReactGA.event with correct parameters for trackSubmitEvent', () => {
    const mockGAEvent = vi.fn()
    ReactGA.event = mockGAEvent

    const inputURL = 'https://example.com'
    trackSubmitEvent(inputURL)

    expect(mockGAEvent).toHaveBeenCalledTimes(1)
    expect(mockGAEvent).toHaveBeenCalledWith({
      category: 'User',
      action: 'Clicked submit',
      label: inputURL,
    })
  })

  it('should call ReactGA.event with correct parameters for trackClearHistory', () => {
    const mockGAEvent = vi.fn()
    ReactGA.event = mockGAEvent

    trackClearHistory()

    expect(mockGAEvent).toHaveBeenCalledTimes(1)
    expect(mockGAEvent).toHaveBeenCalledWith({
      category: 'User',
      action: 'Cleared history',
      label: undefined,
    })
  })
})
