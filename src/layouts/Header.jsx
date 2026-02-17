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

  return (
    <header className="sticky top-0 z-50 border-b border-estate-100/80 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 lg:py-4">
        <Link to={ROUTES.HOME} aria-label={t('common.brand')} className="shrink-0">
          <Logo size="2xl" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-gold-600'
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
          <LanguageSwitcher />
          <Link
            to={ROUTES.CONTACT}
            className="hidden rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gold-600 hover:shadow-md lg:inline-block"
          >
            {t('common.cta.contactUs')}
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="relative flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-estate-50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex w-5 flex-col items-center justify-center gap-[5px]">
              <span className={cn(
                'block h-[2px] w-5 rounded-full bg-estate-800 transition-all duration-300',
                isMobileMenuOpen && 'translate-y-[7px] rotate-45'
              )} />
              <span className={cn(
                'block h-[2px] w-5 rounded-full bg-estate-800 transition-all duration-300',
                isMobileMenuOpen && 'opacity-0'
              )} />
              <span className={cn(
                'block h-[2px] w-5 rounded-full bg-estate-800 transition-all duration-300',
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
                        ? 'bg-gold-50 text-gold-600'
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
              className="block w-full rounded-md bg-gold-500 py-3 text-center text-sm font-semibold text-white hover:bg-gold-600"
            >
              {t('common.cta.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
