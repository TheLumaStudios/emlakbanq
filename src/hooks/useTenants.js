import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { useTranslation } from 'react-i18next'

// Helper function to get translation from JSONB field
function getTranslation(jsonbField, lang, fallbackLang = 'tr') {
  if (!jsonbField) return ''
  if (typeof jsonbField === 'string') {
    try {
      const parsed = JSON.parse(jsonbField)
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed[lang] || parsed[fallbackLang] || parsed['tr'] || ''
      }
    } catch {
      /* not JSON */
    }
    return jsonbField
  }
  if (typeof jsonbField !== 'object') return jsonbField
  return jsonbField[lang] || jsonbField[fallbackLang] || jsonbField['tr'] || ''
}

export function useTenants(filters = {}) {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTenants = async () => {
    setLoading(true)
    setError(null)

    let query = supabase
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`)
    }

    const { data, error: fetchError } = await query

    if (fetchError) {
      setError(fetchError)
      setTenants([])
    } else {
      // Map to localized data
      const localized = data.map(tenant => ({
        ...tenant,
        current_address_text: getTranslation(tenant.current_address, lang),
        notes_text: getTranslation(tenant.notes, lang),
      }))
      setTenants(localized)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTenants()
  }, [filters.status, filters.search, lang])

  const addTenant = async (tenantData) => {
    const { data, error } = await supabase
      .from('tenants')
      .insert([tenantData])
      .select()
      .single()

    if (!error) {
      await fetchTenants()
    }

    return { data, error }
  }

  const updateTenant = async (id, tenantData) => {
    const { data, error } = await supabase
      .from('tenants')
      .update(tenantData)
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      await fetchTenants()
    }

    return { data, error }
  }

  const deleteTenant = async (id) => {
    const { error } = await supabase
      .from('tenants')
      .delete()
      .eq('id', id)

    if (!error) {
      await fetchTenants()
    }

    return { error }
  }

  return {
    tenants,
    loading,
    error,
    fetchTenants,
    addTenant,
    updateTenant,
    deleteTenant,
  }
}

export function useTenant(id) {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [tenant, setTenant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchTenant = async () => {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        setError(fetchError)
        setTenant(null)
      } else {
        setTenant({
          ...data,
          current_address_text: getTranslation(data.current_address, lang),
          notes_text: getTranslation(data.notes, lang),
        })
      }

      setLoading(false)
    }

    fetchTenant()
  }, [id, lang])

  return { tenant, loading, error }
}
