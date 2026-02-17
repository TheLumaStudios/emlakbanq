import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { RTL_LANGUAGES } from '../config/i18n'

export function useDirection() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const dir = RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr'
}
