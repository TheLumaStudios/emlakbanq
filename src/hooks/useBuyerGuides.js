import { useSupabaseQuery } from './useSupabaseQuery'

export function useBuyerGuides() {
  return useSupabaseQuery(
    (sb) => sb.from('buyer_guides').select('*').order('sort_order'),
    []
  )
}
