import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import { useToast } from '../../hooks/useToast'
import AdminTable from '../../components/admin/AdminTable'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ListStatCard from '../../components/admin/ListStatCard'
import ListToolbar from '../../components/admin/ListToolbar'

const getLocalizedValue = (field, lang = 'en') => {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.en || Object.values(field)[0] || ''
}

export default function Areas() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const navigate = useNavigate()
  const toast = useToast()
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [featuredFilter, setFeaturedFilter] = useState('all')
  const [pageSize, setPageSize] = useState(10)

  const fetchAreas = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('Error fetching areas:', error)
    } else {
      setAreas(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAreas()
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await supabase
      .from('areas')
      .delete()
      .eq('id', deleteTarget.id)
    if (error) {
      console.error('Error deleting area:', error)
      toast.error(t('admin.areas.failedToDelete'))
    } else {
      toast.success(t('admin.common.deletedSuccessfully'))
      await fetchAreas()
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  const filteredAreas = areas.filter((a) => {
    // Search filter
    if (search) {
      const name = typeof a.name === 'object' ? Object.values(a.name).join(' ') : (a.name || '')
      if (!name.toLowerCase().includes(search.toLowerCase())) return false
    }
    // Featured filter
    if (featuredFilter === 'featured' && !a.featured) return false
    if (featuredFilter === 'not_featured' && a.featured) return false
    return true
  })

  const featuredCount = areas.filter((a) => a.featured).length

  const columns = [
    {
      key: 'image',
      label: t('admin.areas.image'),
      render: (value) => (
        <div className="h-10 w-14 overflow-hidden rounded-md bg-estate-100">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-estate-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      label: t('admin.areas.name'),
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-estate-900">{getLocalizedValue(value, lang)}</p>
          <p className="text-xs text-estate-400">{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'description',
      label: t('admin.areas.tagline'),
      render: (value) => (
        <span className="line-clamp-1 max-w-[200px] text-sm text-estate-600">
          {getLocalizedValue(value, lang) || '--'}
        </span>
      ),
    },
    {
      key: 'avg_price',
      label: t('admin.areas.avgPrice'),
      sortable: true,
      render: (value) => <span className="font-medium text-estate-800">{value}</span>,
    },
    {
      key: 'roi',
      label: t('admin.areas.roi'),
      sortable: true,
      render: (value) => (
        <span className="inline-block rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
          {value}
        </span>
      ),
    },
    {
      key: 'featured',
      label: t('admin.areas.featured'),
      sortable: true,
      render: (value) =>
        value ? (
          <span className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            {t('admin.areas.featured')}
          </span>
        ) : (
          <span className="text-xs text-estate-400">--</span>
        ),
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-estate-900">{t('admin.areas.title')}</h1>
          <p className="mt-1 text-sm text-estate-500">
            {t('admin.areas.subtitle')} ({areas.length} {t('admin.common.total')})
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/areas/new')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('admin.areas.addNew')}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ListStatCard
          label={t('admin.common.total')}
          value={areas.length}
          color="blue"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.areas.featured')}
          value={featuredCount}
          color="gold"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          }
        />
      </div>

      {/* Toolbar: Search + Featured Filter + Page Size */}
      <ListToolbar
        search={search}
        onSearchChange={setSearch}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        filters={[
          {
            key: 'featured',
            value: featuredFilter,
            onChange: setFeaturedFilter,
            options: [
              { value: 'all', label: t('admin.common.all') },
              { value: 'featured', label: t('admin.areas.featured') },
              { value: 'not_featured', label: t('admin.areas.notFeatured') },
            ],
          },
        ]}
      />

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredAreas}
        loading={loading}
        editPath="/admin/areas/:id"
        onDelete={(row) => setDeleteTarget(row)}
        emptyMessage={t('admin.areas.noAreas')}
        pageSize={pageSize}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        message={deleteTarget ? `${t('admin.common.confirmDelete')} "${getLocalizedValue(deleteTarget.name, lang)}"? ${t('admin.common.deleteMessage')}` : ''}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
