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

export function useRentalContracts(filters = {}) {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchContracts = async () => {
    setLoading(true)
    setError(null)

    let query = supabase
      .from('rental_contracts')
      .select(`
        *,
        tenant:tenants(*),
        property:properties(*)
      `)
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.tenant_id) {
      query = query.eq('tenant_id', filters.tenant_id)
    }
    if (filters.property_id) {
      query = query.eq('property_id', filters.property_id)
    }

    const { data, error: fetchError } = await query

    if (fetchError) {
      setError(fetchError)
      setContracts([])
    } else {
      // Map to localized data
      const localized = data.map(contract => ({
        ...contract,
        terms_text: getTranslation(contract.terms, lang),
        termination_reason_text: getTranslation(contract.termination_reason, lang),
        deposit_deduction_reason_text: getTranslation(contract.deposit_deduction_reason, lang),
        property_name: getTranslation(contract.property?.name, lang),
        property_location: getTranslation(contract.property?.location, lang),
      }))
      setContracts(localized)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchContracts()
  }, [filters.status, filters.tenant_id, filters.property_id, lang])

  const addContract = async (contractData) => {
    const { data, error } = await supabase
      .from('rental_contracts')
      .insert([contractData])
      .select()
      .single()

    if (!error) {
      await fetchContracts()
    }

    return { data, error }
  }

  const updateContract = async (id, contractData) => {
    const { data, error } = await supabase
      .from('rental_contracts')
      .update(contractData)
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      await fetchContracts()
    }

    return { data, error }
  }

  const deleteContract = async (id) => {
    const { error } = await supabase
      .from('rental_contracts')
      .delete()
      .eq('id', id)

    if (!error) {
      await fetchContracts()
    }

    return { error }
  }

  // Create monthly payments for a contract using the database function
  const generatePayments = async (contractId, startDate, endDate, monthlyRent, paymentDay, currency) => {
    const { error } = await supabase.rpc('create_rental_payments', {
      p_contract_id: contractId,
      p_start_date: startDate,
      p_end_date: endDate,
      p_monthly_rent: monthlyRent,
      p_payment_day: paymentDay,
      p_currency: currency,
    })

    return { error }
  }

  return {
    contracts,
    loading,
    error,
    fetchContracts,
    addContract,
    updateContract,
    deleteContract,
    generatePayments,
  }
}

export function useRentalContract(id) {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchContract = async () => {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('rental_contracts')
        .select(`
          *,
          tenant:tenants(*),
          property:properties(*)
        `)
        .eq('id', id)
        .single()

      if (fetchError) {
        setError(fetchError)
        setContract(null)
      } else {
        setContract({
          ...data,
          terms_text: getTranslation(data.terms, lang),
          termination_reason_text: getTranslation(data.termination_reason, lang),
          deposit_deduction_reason_text: getTranslation(data.deposit_deduction_reason, lang),
          property_name: getTranslation(data.property?.name, lang),
          property_location: getTranslation(data.property?.location, lang),
        })
      }

      setLoading(false)
    }

    fetchContract()
  }, [id, lang])

  return { contract, loading, error }
}
