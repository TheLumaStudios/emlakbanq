import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../../config/i18n'

const ALL_EDIT_LANGUAGES = [
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  ...SUPPORTED_LANGUAGES.filter((l) => l.code !== 'tr'),
]

/**
 * Multilingual Input Component
 * Supports all languages with tab-based interface
 */
export default function MultilingualInput({
  label,
  name,
  value = {}, // JSONB object: { en: '...', tr: '...', de: '...', ... }
  onChange,
  type = 'text', // 'text' or 'textarea'
  required = false,
  placeholder = '',
  rows = 4,
  help = ''
}) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('tr')

  // Ensure value is an object
  const translations = typeof value === 'object' && value !== null ? value : {}

  const handleChange = (lang, newValue) => {
    const updated = {
      ...translations,
      [lang]: newValue
    }
    onChange(name, updated)
  }

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-medium text-estate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {/* Language Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-estate-200">
        {ALL_EDIT_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setActiveTab(lang.code)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === lang.code
                ? 'border-b-2 border-blue-500 text-blue-700'
                : 'text-estate-500 hover:text-estate-700'
            }`}
          >
            {lang.name} ({lang.code.toUpperCase()})
            {translations[lang.code] && (
              <span className="ml-1 text-xs text-emerald-600">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Input Fields */}
      <div className="rounded-lg border border-estate-200 bg-estate-50 p-3">
        {ALL_EDIT_LANGUAGES.map((lang) => (
          <div
            key={lang.code}
            className={activeTab === lang.code ? 'block' : 'hidden'}
          >
            {type === 'textarea' ? (
              <textarea
                value={translations[lang.code] || ''}
                onChange={(e) => handleChange(lang.code, e.target.value)}
                rows={rows}
                placeholder={`${placeholder} (${lang.name})`}
                dir={lang.dir}
                className="w-full rounded-md border border-estate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <input
                type="text"
                value={translations[lang.code] || ''}
                onChange={(e) => handleChange(lang.code, e.target.value)}
                placeholder={`${placeholder} (${lang.name})`}
                dir={lang.dir}
                className="w-full rounded-md border border-estate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            )}

            {/* Character count for active tab */}
            {translations[lang.code] && (
              <div className="mt-1 text-right text-xs text-estate-400">
                {translations[lang.code].length} {t('components.multilingualInput.characters')}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help text */}
      {help && (
        <p className="text-xs text-estate-500">{help}</p>
      )}

      {/* Translation status */}
      <div className="flex flex-wrap gap-2 text-xs">
        {ALL_EDIT_LANGUAGES.map((lang) => (
          <span
            key={lang.code}
            className={`rounded px-2 py-0.5 ${
              translations[lang.code]
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-estate-100 text-estate-400'
            }`}
          >
            {lang.code.toUpperCase()}: {translations[lang.code] ? t('components.multilingualInput.translated') : t('components.multilingualInput.missing')}
          </span>
        ))}
      </div>
    </div>
  )
}
