import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AdminTopBar({ onMenuToggle }) {
  const { t } = useTranslation()
  const session = useAuthStore((s) => s.session)
  const signOut = useAuthStore((s) => s.signOut)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-estate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left: hamburger + page area */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-md p-2 text-estate-500 transition-colors hover:bg-estate-50 hover:text-estate-700 lg:hidden"
          aria-label="Open sidebar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Right: user info + logout */}
      <div className="flex items-center gap-4">
        {session?.user?.email && (
          <span className="hidden text-sm text-estate-500 sm:block">
            {session.user.email}
          </span>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-md border border-estate-200 px-3 py-1.5 text-sm font-medium text-estate-600 transition-colors hover:bg-estate-50 hover:text-estate-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          {t('admin.topBar.logout')}
        </button>
      </div>
    </header>
  )
}
