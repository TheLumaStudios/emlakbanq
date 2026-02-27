import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRentalStats } from '../../hooks/useRentalStats'
import { useRentalPayments } from '../../hooks/useRentalPayments'
import ListStatCard from '../../components/admin/ListStatCard'
import PaymentStatusBadge from '../../components/admin/PaymentStatusBadge'

export default function RentalDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { stats, loading: statsLoading } = useRentalStats()
  const { payments: upcomingPayments, loading: paymentsLoading } = useRentalPayments({ status: 'pending' })
  const { payments: overduePayments } = useRentalPayments({ status: 'overdue' })

  // Get payments due in next 7 days
  const nextWeekPayments = upcomingPayments.filter((p) => {
    const dueDate = new Date(p.due_date)
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)
    return dueDate >= today && dueDate <= nextWeek
  })

  if (statsLoading || paymentsLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-blue-500" />
          <p className="text-sm text-estate-400">{t('admin.common.loading', 'Yükleniyor...')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-estate-900">{t('admin.rentals.title', 'Kira Yönetimi')}</h1>
        <p className="mt-1 text-sm text-estate-500">{t('admin.rentals.subtitle', 'Kira yönetimi özet bilgiler')}</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ListStatCard
          label={t('admin.rentals.totalTenants', 'Toplam Kiracı')}
          value={stats.totalTenants}
          color="purple"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.rentals.activeContracts', 'Aktif Sözleşme')}
          value={stats.activeContracts}
          color="green"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.rentals.pendingPayments', 'Bekleyen Ödeme')}
          value={stats.pendingPayments}
          color="yellow"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.rentals.overduePayments', 'Gecikmiş Ödeme')}
          value={stats.overduePayments}
          color="red"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button
          onClick={() => navigate('/admin/tenants/new')}
          className="flex items-center gap-3 rounded-lg border-2 border-dashed border-estate-300 bg-white p-4 text-left transition-all hover:border-blue-500 hover:bg-blue-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-estate-900">{t('admin.rentals.addTenant', 'Kiracı Ekle')}</h3>
            <p className="text-sm text-estate-500">{t('admin.rentals.addTenantDesc', 'Yeni kiracı kaydı oluştur')}</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/admin/contracts/new')}
          className="flex items-center gap-3 rounded-lg border-2 border-dashed border-estate-300 bg-white p-4 text-left transition-all hover:border-green-500 hover:bg-green-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-estate-900">{t('admin.rentals.addContract', 'Sözleşme Oluştur')}</h3>
            <p className="text-sm text-estate-500">{t('admin.rentals.addContractDesc', 'Yeni kira sözleşmesi')}</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/admin/payments')}
          className="flex items-center gap-3 rounded-lg border-2 border-dashed border-estate-300 bg-white p-4 text-left transition-all hover:border-purple-500 hover:bg-purple-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-estate-900">{t('admin.rentals.viewPayments', 'Ödemeleri Görüntüle')}</h3>
            <p className="text-sm text-estate-500">{t('admin.rentals.viewPaymentsDesc', 'Tüm ödemeler')}</p>
          </div>
        </button>
      </div>

      {/* Overdue Payments Alert */}
      {overduePayments.length > 0 && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">{t('admin.rentals.overdueAlert', 'Gecikmiş Ödemeler!')}</h3>
              <p className="mt-1 text-sm text-red-700">
                {overduePayments.length} {t('admin.rentals.overdueCount', 'adet gecikmiş ödeme var')}
              </p>
              <button
                onClick={() => navigate('/admin/payments')}
                className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800"
              >
                {t('admin.rentals.viewOverdue', 'Gecikmiş ödemeleri görüntüle')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Payments */}
      <div className="rounded-lg border border-estate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-estate-900">
            {t('admin.rentals.upcomingPayments', 'Yaklaşan Ödemeler')} (7 {t('admin.rentals.days', 'gün')})
          </h2>
          <button
            onClick={() => navigate('/admin/payments')}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {t('admin.rentals.viewAll', 'Tümünü Gör')} →
          </button>
        </div>

        {nextWeekPayments.length === 0 ? (
          <p className="text-center text-sm text-estate-400 py-8">
            {t('admin.rentals.noUpcomingPayments', 'Yaklaşan ödeme yok')}
          </p>
        ) : (
          <div className="space-y-3">
            {nextWeekPayments.slice(0, 10).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-lg border border-estate-200 p-3">
                <div className="flex-1">
                  <p className="font-medium text-estate-900">{payment.contract?.tenant?.full_name}</p>
                  <p className="text-sm text-estate-500">{payment.property_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-estate-800">
                    {payment.amount} {payment.currency}
                  </p>
                  <p className="text-sm text-estate-500">{payment.due_date}</p>
                </div>
                <div className="ml-3">
                  <PaymentStatusBadge status={payment.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
