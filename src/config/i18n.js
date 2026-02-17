import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  { code: 'ar', name: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', dir: 'rtl' },
  { code: 'ru', name: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'fr', name: 'Fran\u00E7ais', dir: 'ltr' },
  { code: 'fa', name: '\u0641\u0627\u0631\u0633\u06CC', dir: 'rtl' },
  { code: 'hi', name: '\u0939\u093F\u0928\u094D\u0926\u0940', dir: 'ltr' },
]

export const RTL_LANGUAGES = ['ar', 'fa']

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'parcel-estates-lang',
    },
  })

export default i18n
