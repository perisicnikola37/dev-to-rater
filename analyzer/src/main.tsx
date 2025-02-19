import { createRoot } from 'react-dom/client'
import '@/styles/tailwind.css'
import '@/styles/main.css'
import ReactGA from 'react-ga4'
import { Environments } from './utils/constants/globalWeb'
import { ENVIRONMENT, GA_4_ID } from './utils/constants/envExpose'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

if (ENVIRONMENT == Environments.PRODUCTION && GA_4_ID) {
  ReactGA.initialize(GA_4_ID)
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
)
