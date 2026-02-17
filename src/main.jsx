import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './config/i18n'
import './styles/app.css'
import App from './app/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="flex h-screen items-center justify-center font-body text-estate-400">Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
