import { useState, useEffect } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopBar from '../components/admin/AdminTopBar'

export default function AdminLayout() {
  const { session, loading } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  // Close mobile sidebar and scroll to top on route change
  useEffect(() => {
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-estate-50">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/logo.png"
            alt="Loading..."
            className="h-16 w-auto animate-pulse"
          />
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gold-500" style={{ animationDelay: '0ms' }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-gold-500" style={{ animationDelay: '150ms' }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-gold-500" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-estate-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-estate-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <AdminTopBar onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
