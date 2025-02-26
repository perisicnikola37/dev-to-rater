import ReactGA from 'react-ga4'

const trackEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  })
}

export const trackSubmitEvent = (inputURL: string) => {
  trackEvent('User', 'Clicked submit', inputURL)
}

export const trackClearHistory = () => {
  trackEvent('User', 'Cleared history')
}
