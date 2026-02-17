import { useSupabaseQuery } from './useSupabaseQuery'
import { useTranslation } from 'react-i18next'

// Helper function to get translation from JSONB field
function getTranslation(jsonbField, lang, fallbackLang = 'en') {
  if (!jsonbField || typeof jsonbField !== 'object') return jsonbField
  return jsonbField[lang] || jsonbField[fallbackLang] || jsonbField['en'] || ''
}

// Helper function to map database fields to current language
function mapPropertyFields(property, lang) {
  if (!property) return null

  return {
    ...property,
    name: getTranslation(property.name, lang),
    location: getTranslation(property.location, lang),
    type_label: getTranslation(property.type_label, lang),
  }
}

export function useProperties(typeFilter) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => {
      let query = sb.from('properties').select('*').order('sort_order')
      if (typeFilter && typeFilter !== 'all') query = query.eq('type', typeFilter)
      return query
    },
    [typeFilter]
  )

  return {
    ...result,
    data: result.data?.map(prop => mapPropertyFields(prop, lang))
  }
}

export function useFeaturedProperties() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => sb.from('properties').select('*').eq('featured', true).order('sort_order').limit(6),
    []
  )

  return {
    ...result,
    data: result.data?.map(prop => mapPropertyFields(prop, lang))
  }
}

export function useProperty(slug) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => sb.from('properties').select('*').eq('slug', slug).single(),
    [slug]
  )

  return {
    ...result,
    data: mapPropertyFields(result.data, lang)
  }
}
