import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRentalContracts } from '../../hooks/useRentalContracts'
import { useToast } from '../../hooks/useToast'
import AdminTable from '../../components/admin/AdminTable'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ListStatCard from '../../components/admin/ListStatCard'
import ListToolbar from '../../components/admin/ListToolbar'

export default function RentalContracts() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useToast()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const { contracts, loading, deleteContract } = useRentalContracts({ status: statusFilter })

  const stats = useMemo(() => {
    const total = contracts.length
    const active = contracts.filter((c) => c.status === 'active').length
    const expired = contracts.filter((c) => c.status === 'expired').length
    const draft = contracts.filter((c) => c.status === 'draft').length
    return { total, active, expired, draft }
  }, [contracts])

  const filteredContracts = useMemo(() => {
    if (!search) return contracts
    const q = search.toLowerCase()
    return contracts.filter(
      (c) =>
        c.contract_number?.toLowerCase().includes(q) ||
        c.tenant?.full_name?.toLowerCase().includes(q) ||
        c.property_name?.toLowerCase().includes(q)
    )
  }, [contracts, search])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await deleteContract(deleteTarget.id)
    if (error) {
      console.error('Error deleting contract:', error)
      toast.error(t('admin.contracts.deleteError', 'Sözleşme silinemedi'))
    } else {
      toast.success(t('admin.contracts.deleteSuccess', 'Sözleşme silindi'))
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  const filters = [
    {
      key: 'status',
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: '', label: t('admin.contracts.allStatuses', 'Tüm Durumlar') },
        { value: 'draft', label: t('admin.contracts.draft', 'Taslak') },
        { value: 'active', label: t('admin.contracts.active', 'Aktif') },
        { value: 'expired', label: t('admin.contracts.expired', 'Süresi Dolmuş') },
        { value: 'terminated', label: t('admin.contracts.terminated', 'Feshedilmiş') },
      ],
    },
  ]

  const columns = [
    {
      key: 'contract_number',
      label: t('admin.contracts.contractNumber', 'Sözleşme No'),
      sortable: true,
      render: (value) => <span className="font-mono text-sm font-medium text-estate-900">{value}</span>,
    },
    {
      key: 'tenant',
      label: t('admin.contracts.tenant', 'Kiracı'),
      render: (value) => (
        <div>
          <p className="font-medium text-estate-900">{value?.full_name}</p>
          <p className="text-xs text-estate-400">{value?.phone}</p>
        </div>
      ),
    },
    {
      key: 'property_name',
      label: t('admin.contracts.property', 'Mülk'),
      render: (value) => <span className="text-estate-600">{value}</span>,
    },
    {
      key: 'start_date',
      label: t('admin.contracts.startDate', 'Başlangıç'),
      sortable: true,
      render: (value) => <span className="text-sm text-estate-500">{value}</span>,
    },
    {
      key: 'end_date',
      label: t('admin.contracts.endDate', 'Bitiş'),
      sortable: true,
      render: (value) => <span className="text-sm text-estate-500">{value}</span>,
    },
    {
      key: 'monthly_rent',
      label: t('admin.contracts.monthlyRent', 'Aylık Kira'),
      sortable: true,
      render: (value, row) => (
        <span className="font-medium text-estate-800">
          {value} {row.currency}
        </span>
      ),
    },
    {
      key: 'status',
      label: t('admin.contracts.status', 'Durum'),
      sortable: true,
      render: (value) => {
        const statusConfig = {
          draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: t('admin.contracts.draft', 'Taslak') },
          active: { bg: 'bg-green-100', text: 'text-green-700', label: t('admin.contracts.active', 'Aktif') },
          expired: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: t('admin.contracts.expired', 'Süresi Dolmuş') },
          terminated: { bg: 'bg-red-100', text: 'text-red-700', label: t('admin.contracts.terminated', 'Feshedilmiş') },
        }
        const config = statusConfig[value] || statusConfig.draft
        return (
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
            {config.label}
          </span>
        )
      },
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-estate-900">{t('admin.contracts.title', 'Kira Sözleşmeleri')}</h1>
          <p className="mt-1 text-sm text-estate-500">
            {t('admin.contracts.subtitle', 'Kira sözleşmelerini yönetin')} ({contracts.length} {t('admin.common.total', 'toplam')})
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/contracts/new')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('admin.contracts.addNew', 'Yeni Sözleşme')}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ListStatCard
          label={t('admin.contracts.totalContracts', 'Toplam Sözleşme')}
          value={stats.total}
          color="gold"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.contracts.activeContracts', 'Aktif Sözleşme')}
          value={stats.active}
          color="green"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.contracts.expiredContracts', 'Süresi Dolmuş')}
          value={stats.expired}
          color="yellow"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.contracts.draftContracts', 'Taslak')}
          value={stats.draft}
          color="gray"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
        data={filteredContracts}
        loading={loading}
        editPath="/admin/contracts/:id"
        onDelete={(row) => setDeleteTarget(row)}
        emptyMessage={t('admin.contracts.noContracts', 'Henüz sözleşme eklenmemiş')}
        pageSize={pageSize}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        message={
          deleteTarget
            ? `${t('admin.common.confirmDelete', 'Silmek istediğinize emin misiniz?')} "${deleteTarget.contract_number}"? ${t('admin.common.deleteMessage', 'Bu işlem geri alınamaz.')}`
            : ''
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
