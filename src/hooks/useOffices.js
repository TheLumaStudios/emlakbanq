import { useSupabaseQuery } from './useSupabaseQuery'

export function useOffices() {
  return useSupabaseQuery(
    (sb) => sb.from('offices').select('*').order('sort_order'),
    []
  )
}
