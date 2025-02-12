import ReactGA from 'react-ga4'

export const trackSubmitEvent = (inputURL: string) => {
  ReactGA.event({
    category: 'User',
    action: 'Clicked submit',
    label: inputURL,
  })
}

export const trackClearHistory = () => {
  ReactGA.event({
    category: 'User',
    action: 'Cleared history',
  })
}
