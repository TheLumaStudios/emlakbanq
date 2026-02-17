import { useSupabaseQuery } from './useSupabaseQuery'

export function useGoldenVisa(section) {
  return useSupabaseQuery(
    (sb) => sb.from('golden_visa_content').select('*').eq('section', section).order('sort_order'),
    [section]
  )
}
