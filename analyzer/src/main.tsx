import { createRoot } from 'react-dom/client'
import '@/styles/tailwind.css'
import '@/styles/main.css'
import DevToPostAnalyzer from '@/pages/DevToPostAnalyzer'
import ReactGA from 'react-ga4'
import { Environments } from './utils/constants/globalWeb'
import { ENVIRONMENT, GA_4_ID } from './utils/constants/envExpose'

if (ENVIRONMENT == Environments.PRODUCTION && GA_4_ID) {
  ReactGA.initialize(GA_4_ID)
}

createRoot(document.getElementById('root')!).render(<DevToPostAnalyzer />)
