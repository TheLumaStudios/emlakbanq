import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTenants } from '../../hooks/useTenants'
import { useToast } from '../../hooks/useToast'
import AdminTable from '../../components/admin/AdminTable'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ListStatCard from '../../components/admin/ListStatCard'
import ListToolbar from '../../components/admin/ListToolbar'

export default function Tenants() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toast = useToast()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const { tenants, loading, deleteTenant } = useTenants({ search, status: statusFilter })

  const stats = useMemo(() => {
    const total = tenants.length
    const active = tenants.filter((t) => t.status === 'active').length
    const inactive = tenants.filter((t) => t.status === 'inactive').length
    const blacklisted = tenants.filter((t) => t.status === 'blacklisted').length
    return { total, active, inactive, blacklisted }
  }, [tenants])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await deleteTenant(deleteTarget.id)
    if (error) {
      console.error('Error deleting tenant:', error)
      toast.error(t('admin.tenants.deleteError', 'Kiracı silinemedi'))
    } else {
      toast.success(t('admin.tenants.deleteSuccess', 'Kiracı silindi'))
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
        { value: '', label: t('admin.tenants.allStatuses', 'Tüm Durumlar') },
        { value: 'active', label: t('admin.tenants.active', 'Aktif') },
        { value: 'inactive', label: t('admin.tenants.inactive', 'Pasif') },
        { value: 'blacklisted', label: t('admin.tenants.blacklisted', 'Kara Liste') },
      ],
    },
  ]

  const columns = [
    {
      key: 'full_name',
      label: t('admin.tenants.fullName', 'Ad Soyad'),
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-estate-900">{value}</p>
          <p className="text-xs text-estate-400">{row.email || row.phone}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      label: t('admin.tenants.phone', 'Telefon'),
      render: (value) => <span className="text-estate-600">{value}</span>,
    },
    {
      key: 'email',
      label: t('admin.tenants.email', 'E-posta'),
      render: (value) => <span className="text-estate-500">{value || '--'}</span>,
    },
    {
      key: 'profession',
      label: t('admin.tenants.profession', 'Meslek'),
      render: (value) => <span className="text-estate-600">{value || '--'}</span>,
    },
    {
      key: 'status',
      label: t('admin.tenants.status', 'Durum'),
      sortable: true,
      render: (value) => {
        const statusConfig = {
          active: { bg: 'bg-green-100', text: 'text-green-700', label: t('admin.tenants.active', 'Aktif') },
          inactive: { bg: 'bg-gray-100', text: 'text-gray-700', label: t('admin.tenants.inactive', 'Pasif') },
          blacklisted: { bg: 'bg-red-100', text: 'text-red-700', label: t('admin.tenants.blacklisted', 'Kara Liste') },
        }
        const config = statusConfig[value] || statusConfig.active
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
          <h1 className="font-heading text-2xl font-bold text-estate-900">{t('admin.tenants.title', 'Kiracılar')}</h1>
          <p className="mt-1 text-sm text-estate-500">
            {t('admin.tenants.subtitle', 'Kiracı bilgilerini yönetin')} ({tenants.length} {t('admin.common.total', 'toplam')})
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/tenants/new')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('admin.tenants.addNew', 'Yeni Kiracı')}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ListStatCard
          label={t('admin.tenants.totalTenants', 'Toplam Kiracı')}
          value={stats.total}
          color="gold"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.tenants.activeTenants', 'Aktif Kiracı')}
          value={stats.active}
          color="green"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.tenants.inactiveTenants', 'Pasif Kiracı')}
          value={stats.inactive}
          color="gray"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.tenants.blacklistedTenants', 'Kara Liste')}
          value={stats.blacklisted}
          color="red"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
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
        data={tenants}
        loading={loading}
        editPath="/admin/tenants/:id"
        onDelete={(row) => setDeleteTarget(row)}
        emptyMessage={t('admin.tenants.noTenants', 'Henüz kiracı eklenmemiş')}
        pageSize={pageSize}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        message={
          deleteTarget
            ? `${t('admin.common.confirmDelete', 'Silmek istediğinize emin misiniz?')} "${deleteTarget.full_name}"? ${t('admin.common.deleteMessage', 'Bu işlem geri alınamaz.')}`
            : ''
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
