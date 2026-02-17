import { useSupabaseQuery } from './useSupabaseQuery'
import { useTranslation } from 'react-i18next'

// Helper function to get translation from JSONB field
function getTranslation(jsonbField, lang, fallbackLang = 'en') {
  if (!jsonbField || typeof jsonbField !== 'object') return jsonbField
  return jsonbField[lang] || jsonbField[fallbackLang] || jsonbField['en'] || ''
}

// Helper function to map database fields to current language
function mapAreaFields(area, lang) {
  if (!area) return null

  return {
    ...area,
    name: getTranslation(area.name, lang),
    description: getTranslation(area.description, lang),
    description_long: getTranslation(area.description_long, lang),
  }
}

export function useAreas({ featured, limit } = {}) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => {
      let query = sb.from('areas').select('*').order('sort_order')
      if (featured) query = query.eq('featured', true)
      if (limit) query = query.limit(limit)
      return query
    },
    [featured, limit]
  )

  return {
    ...result,
    data: result.data?.map(area => mapAreaFields(area, lang))
  }
}

export function useArea(slug) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => sb.from('areas').select('*').eq('slug', slug).single(),
    [slug]
  )

  return {
    ...result,
    data: mapAreaFields(result.data, lang)
  }
}
