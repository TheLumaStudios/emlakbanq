import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../stores/useAuthStore'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAuthStore()
  const signIn = useAuthStore((s) => s.signIn)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    useAuthStore.getState().initialize()
  }, [])

  useEffect(() => {
    if (!authLoading && session) {
      navigate('/admin', { replace: true })
    }
  }, [session, authLoading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError.message || t('admin.login.invalidCredentials'))
      setLoading(false)
    } else {
      navigate('/admin', { replace: true })
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-estate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-estate-200 border-t-gold-500" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-estate-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="font-heading text-3xl font-bold tracking-tight text-estate-900">
            Emlak<span className="text-gold-500">Banq</span>
          </span>
          <p className="mt-2 text-sm text-estate-500">{t('admin.login.title')}</p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-estate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center font-heading text-xl font-bold text-estate-900">
            {t('admin.login.heading')}
          </h1>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-estate-700">
                {t('admin.login.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder={t('admin.login.emailPlaceholder')}
                className="w-full rounded-lg border border-estate-200 bg-white px-4 py-2.5 text-sm text-estate-800 placeholder-estate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-estate-700">
                {t('admin.login.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder={t('admin.login.passwordPlaceholder')}
                className="w-full rounded-lg border border-estate-200 bg-white px-4 py-2.5 text-sm text-estate-800 placeholder-estate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gold-600 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {t('admin.login.signingIn')}
                </>
              ) : (
                t('admin.login.signIn')
              )}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <p className="mt-6 text-center text-sm text-estate-400">
          <a href="/" className="text-gold-600 transition-colors hover:text-gold-700">
            {t('admin.login.backToSite')}
          </a>
        </p>
      </div>
    </div>
  )
}
