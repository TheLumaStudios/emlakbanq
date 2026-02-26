import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from '../components/common/WhatsAppButton'
import { useDirection } from '../hooks/useDirection'
import { useUIStore } from '../stores/useUIStore'

export default function RootLayout() {
  useDirection()

  const { pathname } = useLocation()
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu)

  useEffect(() => {
    closeMobileMenu()
    window.scrollTo(0, 0)
  }, [pathname, closeMobileMenu])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
