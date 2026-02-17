import { useSupabaseQuery } from './useSupabaseQuery'

export function useServices() {
  return useSupabaseQuery(
    (sb) => sb.from('services').select('*').order('sort_order'),
    []
  )
}
