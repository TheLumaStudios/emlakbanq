import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export function useRentalStats() {
  const [stats, setStats] = useState({
    totalTenants: 0,
    activeTenants: 0,
    activeContracts: 0,
    totalContracts: 0,
    pendingPayments: 0,
    overduePayments: 0,
    collectionRate: 0,
    monthlyRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch counts in parallel
      const [
        tenantsRes,
        activeTenantsRes,
        contractsRes,
        activeContractsRes,
        pendingPaymentsRes,
        overduePaymentsRes,
        paidPaymentsRes,
      ] = await Promise.all([
        supabase.from('tenants').select('id', { count: 'exact', head: true }),
        supabase.from('tenants').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('rental_contracts').select('id', { count: 'exact', head: true }),
        supabase.from('rental_contracts').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('rental_payments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('rental_payments').select('id', { count: 'exact', head: true }).eq('status', 'overdue'),
        supabase.from('rental_payments').select('paid_amount').eq('status', 'paid'),
      ])

      // Calculate collection rate and monthly revenue
      const totalPaid = paidPaymentsRes.data?.reduce((sum, p) => sum + (parseFloat(p.paid_amount) || 0), 0) || 0
      const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

      const monthlyRevenueRes = await supabase
        .from('rental_payments')
        .select('paid_amount')
        .eq('status', 'paid')
        .gte('paid_date', `${currentMonth}-01`)
        .lt('paid_date', `${currentMonth}-32`)

      const monthlyRevenue = monthlyRevenueRes.data?.reduce((sum, p) => sum + (parseFloat(p.paid_amount) || 0), 0) || 0

      setStats({
        totalTenants: tenantsRes.count || 0,
        activeTenants: activeTenantsRes.count || 0,
        activeContracts: activeContractsRes.count || 0,
        totalContracts: contractsRes.count || 0,
        pendingPayments: pendingPaymentsRes.count || 0,
        overduePayments: overduePaymentsRes.count || 0,
        collectionRate: totalPaid > 0 ? 100 : 0, // Simplified calculation
        monthlyRevenue,
      })
    } catch (err) {
      setError(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, loading, error, refetch: fetchStats }
}
