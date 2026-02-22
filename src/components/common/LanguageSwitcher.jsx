import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../../config/i18n'
import { cn } from '../../utils/cn'

export default function LanguageSwitcher({ variant = 'dark' }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0]

  const selectLang = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300',
          variant === 'light'
            ? 'border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
            : 'border border-estate-200 bg-estate-50 text-estate-600 hover:border-blue-300 hover:text-estate-800'
        )}
        aria-label="Select language"
        aria-expanded={open}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.73-3.558" />
        </svg>
        <span>{current.code.toUpperCase()}</span>
        <svg
          className={cn('h-3 w-3 transition-transform duration-200', open && 'rotate-180')}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div className={cn(
        'absolute right-0 top-full z-50 mt-2 min-w-[180px] origin-top-right transition-all duration-200',
        open
          ? 'pointer-events-auto scale-100 opacity-100'
          : 'pointer-events-none scale-95 opacity-0'
      )}>
        <div className="overflow-hidden rounded-xl border border-estate-100 bg-white/95 shadow-xl shadow-estate-900/10 backdrop-blur-xl">
          <div className="p-1.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = lang.code === i18n.language
              return (
                <button
                  key={lang.code}
                  onClick={() => selectLang(lang.code)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150',
                    isActive
                      ? 'bg-blue-50 font-semibold text-blue-700'
                      : 'text-estate-600 hover:bg-estate-50 hover:text-estate-800'
                  )}
                >
                  <span className="w-6 text-center text-xs font-semibold uppercase tracking-wider text-estate-400">{lang.code}</span>
                  <span className="flex-1">{lang.name}</span>
                  {isActive && (
                    <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
