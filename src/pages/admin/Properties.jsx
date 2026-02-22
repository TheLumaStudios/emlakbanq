import { useState, useEffect, useMemo } from 'react'
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

export default function Properties() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const navigate = useNavigate()
  const toast = useToast()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [featuredFilter, setFeaturedFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const fetchProperties = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('Error fetching properties:', error)
    } else {
      setProperties(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  /* ---- Stats ---- */
  const stats = useMemo(() => {
    const total = properties.length
    const featured = properties.filter((p) => p.featured).length
    const typeCounts = {}
    properties.forEach((p) => {
      const type = p.type || 'other'
      typeCounts[type] = (typeCounts[type] || 0) + 1
    })
    return { total, featured, typeCounts }
  }, [properties])

  /* ---- Unique types for filter dropdown ---- */
  const uniqueTypes = useMemo(() => {
    const types = new Set(properties.map((p) => p.type).filter(Boolean))
    return Array.from(types).sort()
  }, [properties])

  /* ---- Type breakdown string ---- */
  const typeBreakdown = useMemo(() => {
    return Object.entries(stats.typeCounts)
      .map(([type, count]) => `${type}: ${count}`)
      .join(', ')
  }, [stats.typeCounts])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', deleteTarget.id)
    if (error) {
      console.error('Error deleting property:', error)
      toast.error(t('admin.properties.deleteError'))
    } else {
      toast.success(t('admin.properties.deleteSuccess', 'Property deleted successfully'))
      await fetchProperties()
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Search filter
      if (search) {
        const name = typeof p.name === 'object' ? Object.values(p.name).join(' ') : (p.name || '')
        const location = typeof p.location === 'object' ? Object.values(p.location).join(' ') : (p.location || '')
        const q = search.toLowerCase()
        const matchesSearch = name.toLowerCase().includes(q) || location.toLowerCase().includes(q) || (p.slug || '').toLowerCase().includes(q)
        if (!matchesSearch) return false
      }
      // Type filter
      if (typeFilter && p.type !== typeFilter) return false
      // Featured filter
      if (featuredFilter === 'yes' && !p.featured) return false
      if (featuredFilter === 'no' && p.featured) return false
      return true
    })
  }, [properties, search, typeFilter, featuredFilter])

  /* ---- Filters config for ListToolbar ---- */
  const filters = [
    {
      key: 'type',
      value: typeFilter,
      onChange: setTypeFilter,
      options: [
        { value: '', label: t('admin.properties.allTypes', 'All Types') },
        ...uniqueTypes.map((type) => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) })),
      ],
    },
    {
      key: 'featured',
      value: featuredFilter,
      onChange: setFeaturedFilter,
      options: [
        { value: '', label: t('admin.properties.allFeatured', 'All') },
        { value: 'yes', label: t('admin.properties.featuredOnly', 'Featured') },
        { value: 'no', label: t('admin.properties.notFeatured', 'Not Featured') },
      ],
    },
  ]

  const columns = [
    {
      key: 'image',
      label: t('admin.properties.image'),
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
      key: 'title',
      label: t('admin.properties.name'),
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-estate-900">{getLocalizedValue(row.name, lang)}</p>
          <p className="text-xs text-estate-400">{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'type',
      label: t('admin.properties.type'),
      sortable: true,
      render: (value) => (
        <span className="inline-block rounded-full bg-estate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-estate-600">
          {value}
        </span>
      ),
    },
    {
      key: 'location',
      label: t('admin.properties.location'),
      render: (value) => <span>{getLocalizedValue(value, lang)}</span>,
    },
    {
      key: 'price',
      label: t('admin.properties.price'),
      sortable: true,
      render: (value) => <span className="font-medium text-estate-800">{value}</span>,
    },
    {
      key: 'featured',
      label: t('admin.properties.featured'),
      sortable: true,
      render: (value) =>
        value ? (
          <span className="inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-700">
            {t('admin.properties.featured')}
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
          <h1 className="font-heading text-2xl font-bold text-estate-900">{t('admin.properties.title')}</h1>
          <p className="mt-1 text-sm text-estate-500">
            {t('admin.properties.subtitle')} ({properties.length} {t('admin.common.total')})
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/properties/new')}
          className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gold-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('admin.properties.addNew')}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ListStatCard
          label={t('admin.properties.totalProperties', 'Total Properties')}
          value={stats.total}
          color="gold"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.properties.featuredCount', 'Featured')}
          value={stats.featured}
          color="blue"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.properties.typeBreakdown', 'Type Breakdown')}
          value={Object.keys(stats.typeCounts).length + ' ' + t('admin.properties.types', 'types')}
          color="purple"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.properties.details', 'Details')}
          value={typeBreakdown || '--'}
          color="green"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          }
        />
      </div>

      {/* Toolbar: Search + Filters + Page Size */}
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
        data={filteredProperties}
        loading={loading}
        editPath="/admin/properties/:id"
        onDelete={(row) => setDeleteTarget(row)}
        emptyMessage={t('admin.properties.noProperties')}
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
