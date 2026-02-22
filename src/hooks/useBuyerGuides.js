import { useSupabaseQuery } from './useSupabaseQuery'
import { useTranslation } from 'react-i18next'

function getTranslation(jsonbField, lang, fallbackLang = 'en') {
  if (!jsonbField || typeof jsonbField !== 'object') return jsonbField
  return jsonbField[lang] || jsonbField[fallbackLang] || jsonbField['en'] || ''
}

export function useBuyerGuides() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => sb.from('buyer_guides').select('*').order('sort_order'),
    []
  )

  return {
    ...result,
    data: result.data?.map((item) => ({
      ...item,
      title: getTranslation(item.title, lang),
      description: getTranslation(item.description, lang),
      tag: getTranslation(item.tag, lang),
      read_time: getTranslation(item.read_time, lang),
    })),
  }
}
