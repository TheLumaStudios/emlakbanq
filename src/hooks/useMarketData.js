import { useSupabaseQuery } from './useSupabaseQuery'
import { useTranslation } from 'react-i18next'

// Helper function to get translation from JSONB field
function getTranslation(jsonbField, lang, fallbackLang = 'en') {
  if (!jsonbField || typeof jsonbField !== 'object') return jsonbField
  return jsonbField[lang] || jsonbField[fallbackLang] || jsonbField['en'] || ''
}

export function useMarketHighlights() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => sb.from('market_highlights').select('*').order('sort_order'),
    []
  )

  return {
    ...result,
    data: result.data?.map((item) => ({
      ...item,
      text: getTranslation(item.text, lang),
    })),
  }
}

export function useTopAreasRoi() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => sb.from('top_areas_roi').select('*').order('sort_order'),
    []
  )

  return {
    ...result,
    data: result.data?.map((item) => ({
      ...item,
      area: getTranslation(item.area, lang),
    })),
  }
}
