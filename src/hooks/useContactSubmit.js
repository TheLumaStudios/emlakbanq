import { useState } from 'react'
import { supabase } from '../utils/supabase'

export function useContactSubmit() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  async function submit(formData) {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        interest: formData.interest,
        message: formData.message || null,
      })

    if (error) {
      setError(error)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return { submit, loading, error, success }
}
