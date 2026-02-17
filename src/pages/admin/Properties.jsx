import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import AdminTable from '../../components/admin/AdminTable'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

const getLocalizedValue = (field, lang = 'en') => {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.en || Object.values(field)[0] || ''
}

export default function Properties() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')

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

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', deleteTarget.id)
    if (error) {
      console.error('Error deleting property:', error)
      alert(t('admin.properties.deleteError'))
    } else {
      await fetchProperties()
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  const filteredProperties = properties.filter((p) => {
    if (!search) return true
    const name = typeof p.name === 'object' ? Object.values(p.name).join(' ') : (p.name || '')
    const location = typeof p.location === 'object' ? Object.values(p.location).join(' ') : (p.location || '')
    const q = search.toLowerCase()
    return name.toLowerCase().includes(q) || location.toLowerCase().includes(q) || (p.slug || '').toLowerCase().includes(q)
  })

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
      render: (value) => <span className="font-medium text-estate-800">{value}</span>,
    },
    {
      key: 'featured',
      label: t('admin.properties.featured'),
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

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-estate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin.common.search') + '...'}
            className="w-full rounded-lg border border-estate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-estate-800 placeholder-estate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredProperties}
        loading={loading}
        editPath="/admin/properties/:id"
        onDelete={(row) => setDeleteTarget(row)}
        emptyMessage={t('admin.properties.noProperties')}
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
