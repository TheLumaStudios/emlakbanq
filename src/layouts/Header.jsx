import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../config/routes'
import { NAV_ITEMS } from '../config/navigation'
import LanguageSwitcher from '../components/common/LanguageSwitcher'
import Logo from '../components/common/Logo'
import { useUIStore } from '../stores/useUIStore'
import { cn } from '../utils/cn'

export default function Header() {
  const { t } = useTranslation()
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore()
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  const isHome = pathname === '/' || pathname === ''

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen

  return (
    <header className={cn(
      'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
      isTransparent
        ? 'border-b border-transparent bg-transparent'
        : 'border-b border-estate-100/80 bg-white/95 shadow-sm shadow-estate-900/5 backdrop-blur-xl'
    )}>
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 lg:py-4">
        <Link to={ROUTES.HOME} aria-label={t('common.brand')} className="shrink-0">
          <Logo size="2xl" />
        </Link>

        <ul className="hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'rounded-md px-3.5 py-2 text-sm font-medium tracking-[0.08em] transition-all duration-300',
                    isActive
                      ? isTransparent ? 'text-blue-400' : 'text-blue-600'
                      : isTransparent
                        ? 'text-white/80 hover:bg-white/10 hover:text-white'
                        : 'text-estate-500 hover:bg-estate-50 hover:text-estate-800'
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher variant={isTransparent ? 'light' : 'dark'} />
          <Link
            to={ROUTES.CONTACT}
            className={cn(
              'hidden rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-300 lg:inline-block',
              isTransparent
                ? 'border border-blue-400/40 bg-blue-500/10 text-blue-400 backdrop-blur-sm hover:bg-blue-500 hover:text-white'
                : 'btn-glow bg-blue-500 text-white hover:bg-blue-400'
            )}
          >
            {t('common.cta.contactUs')}
          </Link>

          <button
            onClick={toggleMobileMenu}
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-md transition-colors lg:hidden',
              isTransparent ? 'hover:bg-white/10' : 'hover:bg-estate-50'
            )}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex w-5 flex-col items-center justify-center gap-[5px]">
              <span className={cn(
                'block h-[2px] w-5 rounded-full transition-all duration-300',
                isTransparent ? 'bg-white' : 'bg-estate-800',
                isMobileMenuOpen && 'translate-y-[7px] rotate-45'
              )} />
              <span className={cn(
                'block h-[2px] w-5 rounded-full transition-all duration-300',
                isTransparent ? 'bg-white' : 'bg-estate-800',
                isMobileMenuOpen && 'opacity-0'
              )} />
              <span className={cn(
                'block h-[2px] w-5 rounded-full transition-all duration-300',
                isTransparent ? 'bg-white' : 'bg-estate-800',
                isMobileMenuOpen && '-translate-y-[7px] -rotate-45'
              )} />
            </div>
          </button>
        </div>
      </nav>

      <div className={cn(
        'overflow-hidden border-t border-estate-100 bg-white transition-all duration-300 lg:hidden',
        isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 border-t-0 opacity-0'
      )}>
        <div className="px-6 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'block rounded-md px-4 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-estate-600 hover:bg-estate-50'
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-4 border-t border-estate-100 pt-4">
            <Link
              to={ROUTES.CONTACT}
              className="btn-glow block w-full rounded-md bg-blue-500 py-3 text-center text-sm font-semibold text-white hover:bg-blue-400"
            >
              {t('common.cta.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
