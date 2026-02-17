import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export function useSupabaseQuery(queryFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    queryFn(supabase)
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) throw error
        setData(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, deps)

  return { data, loading, error }
}
