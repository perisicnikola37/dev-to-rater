import { createRoot } from 'react-dom/client'
import '@/styles/tailwind.css'
import '@/styles/main.css'
import DevToPostAnalyzer from '@/pages/DevToPostAnalyzer'
import ReactGA from 'react-ga4'

ReactGA.initialize('G-P6JEX3V8ST')

createRoot(document.getElementById('root')!).render(<DevToPostAnalyzer />)
