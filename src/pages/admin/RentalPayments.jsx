import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRentalPayments } from '../../hooks/useRentalPayments'
import { useToast } from '../../hooks/useToast'
import AdminTable from '../../components/admin/AdminTable'
import ListStatCard from '../../components/admin/ListStatCard'
import ListToolbar from '../../components/admin/ListToolbar'
import PaymentStatusBadge from '../../components/admin/PaymentStatusBadge'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import AdminFormField from '../../components/admin/AdminFormField'

export default function RentalPayments() {
  const { t } = useTranslation()
  const toast = useToast()
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [markPaidTarget, setMarkPaidTarget] = useState(null)
  const [paidData, setPaidData] = useState({
    paid_date: new Date().toISOString().split('T')[0],
    paid_amount: '',
    payment_method: 'bank_transfer',
    transaction_reference: '',
  })
  const [saving, setSaving] = useState(false)

  const { payments, loading, markAsPaid, markAsPending } = useRentalPayments({ status: statusFilter })

  const stats = useMemo(() => {
    const total = payments.length
    const pending = payments.filter((p) => p.status === 'pending').length
    const paid = payments.filter((p) => p.status === 'paid').length
    const overdue = payments.filter((p) => p.status === 'overdue').length
    const totalRevenue = payments
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + parseFloat(p.paid_amount || 0), 0)
    return { total, pending, paid, overdue, totalRevenue }
  }, [payments])

  const filteredPayments = useMemo(() => {
    if (!search) return payments
    const q = search.toLowerCase()
    return payments.filter(
      (p) =>
        p.payment_number?.toLowerCase().includes(q) ||
        p.contract?.tenant?.full_name?.toLowerCase().includes(q) ||
        p.property_name?.toLowerCase().includes(q)
    )
  }, [payments, search])

  const handleMarkPaid = async () => {
    if (!markPaidTarget) return
    setSaving(true)

    const { error } = await markAsPaid(
      markPaidTarget.id,
      paidData.paid_date,
      parseFloat(paidData.paid_amount || markPaidTarget.amount),
      paidData.payment_method,
      paidData.transaction_reference
    )

    if (error) {
      console.error('Error marking payment as paid:', error)
      toast.error(t('admin.payments.markPaidError', 'Ödeme işaretlenemedi'))
    } else {
      toast.success(t('admin.payments.markPaidSuccess', 'Ödeme işaretlendi'))
      setMarkPaidTarget(null)
      setPaidData({
        paid_date: new Date().toISOString().split('T')[0],
        paid_amount: '',
        payment_method: 'bank_transfer',
        transaction_reference: '',
      })
    }

    setSaving(false)
  }

  const handleMarkPending = async (payment) => {
    const { error } = await markAsPending(payment.id)
    if (error) {
      console.error('Error marking payment as pending:', error)
      toast.error(t('admin.payments.markPendingError', 'Ödeme geri alınamadı'))
    } else {
      toast.success(t('admin.payments.markPendingSuccess', 'Ödeme beklemeye alındı'))
    }
  }

  const filters = [
    {
      key: 'status',
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: '', label: t('admin.payments.allStatuses', 'Tüm Durumlar') },
        { value: 'pending', label: t('admin.payments.status.pending', 'Beklemede') },
        { value: 'paid', label: t('admin.payments.status.paid', 'Ödendi') },
        { value: 'overdue', label: t('admin.payments.status.overdue', 'Gecikmiş') },
      ],
    },
  ]

  const columns = [
    {
      key: 'payment_number',
      label: t('admin.payments.paymentNumber', 'Ödeme No'),
      sortable: true,
      render: (value) => <span className="font-mono text-sm font-medium text-estate-900">{value}</span>,
    },
    {
      key: 'due_date',
      label: t('admin.payments.dueDate', 'Vade Tarihi'),
      sortable: true,
      render: (value) => <span className="text-sm text-estate-600">{value}</span>,
    },
    {
      key: 'contract',
      label: t('admin.payments.tenant', 'Kiracı'),
      render: (value) => (
        <div>
          <p className="font-medium text-estate-900">{value?.tenant?.full_name}</p>
          <p className="text-xs text-estate-400">{value?.tenant?.phone}</p>
        </div>
      ),
    },
    {
      key: 'property_name',
      label: t('admin.payments.property', 'Mülk'),
      render: (value) => <span className="text-estate-600">{value}</span>,
    },
    {
      key: 'amount',
      label: t('admin.payments.amount', 'Tutar'),
      sortable: true,
      render: (value, row) => (
        <span className="font-medium text-estate-800">
          {value} {row.currency}
        </span>
      ),
    },
    {
      key: 'status',
      label: t('admin.payments.status', 'Durum'),
      sortable: true,
      render: (value) => <PaymentStatusBadge status={value} />,
    },
    {
      key: 'actions',
      label: t('admin.common.actions', 'İşlemler'),
      render: (_, row) => (
        <div className="flex gap-2">
          {row.status === 'pending' || row.status === 'overdue' ? (
            <button
              onClick={() => {
                setMarkPaidTarget(row)
                setPaidData((prev) => ({ ...prev, paid_amount: String(row.amount) }))
              }}
              className="rounded bg-green-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-green-600"
            >
              {t('admin.payments.markPaid', 'Ödendi İşaretle')}
            </button>
          ) : row.status === 'paid' ? (
            <button
              onClick={() => handleMarkPending(row)}
              className="rounded bg-yellow-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-yellow-600"
            >
              {t('admin.payments.markPending', 'Geri Al')}
            </button>
          ) : null}
        </div>
      ),
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-estate-900">{t('admin.payments.title', 'Kira Ödemeleri')}</h1>
        <p className="mt-1 text-sm text-estate-500">
          {t('admin.payments.subtitle', 'Kira ödemelerini takip edin')} ({payments.length} {t('admin.common.total', 'toplam')})
        </p>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <ListStatCard
          label={t('admin.payments.totalPayments', 'Toplam Ödeme')}
          value={stats.total}
          color="gold"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.payments.pendingPayments', 'Bekleyen')}
          value={stats.pending}
          color="yellow"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.payments.paidPayments', 'Ödendi')}
          value={stats.paid}
          color="green"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.payments.overduePayments', 'Gecikmiş')}
          value={stats.overdue}
          color="red"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.payments.totalRevenue', 'Toplam Tahsilat')}
          value={`${stats.totalRevenue.toLocaleString()} TRY`}
          color="blue"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          }
        />
      </div>

      {/* Toolbar */}
      <ListToolbar
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredPayments}
        loading={loading}
        emptyMessage={t('admin.payments.noPayments', 'Henüz ödeme kaydı yok')}
        pageSize={pageSize}
        hideEditDelete
      />

      {/* Mark as Paid Dialog */}
      <ConfirmDialog
        open={!!markPaidTarget}
        title={t('admin.payments.markPaidTitle', 'Ödemeyi İşaretle')}
        message={
          <div className="space-y-4">
            <p className="text-sm text-estate-600">
              {markPaidTarget?.payment_number} - {markPaidTarget?.amount} {markPaidTarget?.currency}
            </p>
            <div className="space-y-3">
              <AdminFormField
                label={t('admin.payments.paidDate', 'Ödeme Tarihi')}
                name="paid_date"
                type="date"
                value={paidData.paid_date}
                onChange={(name, value) => setPaidData((prev) => ({ ...prev, [name]: value }))}
              />
              <AdminFormField
                label={t('admin.payments.paidAmount', 'Ödenen Tutar')}
                name="paid_amount"
                type="number"
                value={paidData.paid_amount}
                onChange={(name, value) => setPaidData((prev) => ({ ...prev, [name]: value }))}
              />
              <AdminFormField
                label={t('admin.payments.paymentMethod', 'Ödeme Yöntemi')}
                name="payment_method"
                type="select"
                value={paidData.payment_method}
                onChange={(name, value) => setPaidData((prev) => ({ ...prev, [name]: value }))}
                options={[
                  { value: 'bank_transfer', label: t('admin.contractForm.bankTransfer', 'Banka Transferi') },
                  { value: 'cash', label: t('admin.contractForm.cash', 'Nakit') },
                  { value: 'check', label: t('admin.contractForm.check', 'Çek') },
                ]}
              />
              <AdminFormField
                label={t('admin.payments.transactionReference', 'İşlem Referansı')}
                name="transaction_reference"
                type="text"
                value={paidData.transaction_reference}
                onChange={(name, value) => setPaidData((prev) => ({ ...prev, [name]: value }))}
                placeholder={t('admin.payments.transactionReferencePlaceholder', 'Banka dekont no, çek no vb.')}
              />
            </div>
          </div>
        }
        confirmLabel={t('admin.payments.confirmPaid', 'Ödendi Olarak İşaretle')}
        cancelLabel={t('admin.common.cancel', 'İptal')}
        onConfirm={handleMarkPaid}
        onCancel={() => setMarkPaidTarget(null)}
        loading={saving}
      />
    </div>
  )
}
