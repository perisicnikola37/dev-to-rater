import '@/styles/global/main.css'
import '@/styles/tailwind/tailwind.css'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/router'
import { ENVIRONMENT, GA_4_ID } from './utils/constants/envExpose'
import { Environments } from './utils/constants/globalWeb'

if (ENVIRONMENT == Environments.PRODUCTION && GA_4_ID) {
  ReactGA.initialize(GA_4_ID)
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
)
