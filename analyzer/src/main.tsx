import { createRoot } from 'react-dom/client'
import '@/styles/tailwind.css'
import '@/styles/main.css'
import DevToPostAnalyzer from '@/pages/DevToPostAnalyzer'
import ReactGA from 'react-ga4'

const environment = import.meta.env.VITE_APP_ENVIRONMENT
const ga4Id = import.meta.env.VITE_APP_GA_ID

if (environment == 'production' && ga4Id) {
  ReactGA.initialize(ga4Id)
}

createRoot(document.getElementById('root')!).render(<DevToPostAnalyzer />)
