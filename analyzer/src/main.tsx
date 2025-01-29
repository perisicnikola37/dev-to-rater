import { createRoot } from 'react-dom/client'
import '@/styles/tailwind.css'
import '@/styles/main.css'
import DevToPostAnalyzer from '@/pages/DevToPostAnalyzer'

createRoot(document.getElementById('root')!).render(<DevToPostAnalyzer />)
