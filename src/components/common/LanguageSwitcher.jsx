import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../../config/i18n'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="rounded-sm border border-estate-200 bg-transparent px-2 py-1 text-sm text-estate-600 focus:border-gold-500 focus:outline-none"
      aria-label="Select language"
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  )
}
