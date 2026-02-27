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

export function useRentalPayments(filters = {}) {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPayments = async () => {
    setLoading(true)
    setError(null)

    let query = supabase
      .from('rental_payments')
      .select(`
        *,
        contract:rental_contracts(
          *,
          tenant:tenants(*),
          property:properties(*)
        )
      `)
      .order('due_date', { ascending: true })

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.contract_id) {
      query = query.eq('contract_id', filters.contract_id)
    }
    if (filters.month) {
      // Filter by month/year
      const startDate = new Date(filters.month)
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
      query = query
        .gte('due_date', startDate.toISOString().split('T')[0])
        .lte('due_date', endDate.toISOString().split('T')[0])
    }

    const { data, error: fetchError } = await query

    if (fetchError) {
      setError(fetchError)
      setPayments([])
    } else {
      // Map to localized data
      const localized = data.map(payment => ({
        ...payment,
        notes_text: getTranslation(payment.notes, lang),
        property_name: getTranslation(payment.contract?.property?.name, lang),
        property_location: getTranslation(payment.contract?.property?.location, lang),
      }))
      setPayments(localized)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchPayments()
  }, [filters.status, filters.contract_id, filters.month, lang])

  const markAsPaid = async (id, paidDate, paidAmount, paymentMethod, transactionReference) => {
    const { data, error } = await supabase
      .from('rental_payments')
      .update({
        status: 'paid',
        paid_date: paidDate,
        paid_amount: paidAmount,
        payment_method: paymentMethod,
        transaction_reference: transactionReference,
      })
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      await fetchPayments()
    }

    return { data, error }
  }

  const markAsPending = async (id) => {
    const { data, error } = await supabase
      .from('rental_payments')
      .update({
        status: 'pending',
        paid_date: null,
        paid_amount: 0,
        payment_method: null,
        transaction_reference: null,
      })
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      await fetchPayments()
    }

    return { data, error }
  }

  const updatePayment = async (id, paymentData) => {
    const { data, error } = await supabase
      .from('rental_payments')
      .update(paymentData)
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      await fetchPayments()
    }

    return { data, error }
  }

  const deletePayment = async (id) => {
    const { error } = await supabase
      .from('rental_payments')
      .delete()
      .eq('id', id)

    if (!error) {
      await fetchPayments()
    }

    return { error }
  }

  return {
    payments,
    loading,
    error,
    fetchPayments,
    markAsPaid,
    markAsPending,
    updatePayment,
    deletePayment,
  }
}
