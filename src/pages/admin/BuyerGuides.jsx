import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import { useToast } from '../../hooks/useToast'
import AdminTable from '../../components/admin/AdminTable'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ListStatCard from '../../components/admin/ListStatCard'
import ListToolbar from '../../components/admin/ListToolbar'

function getTranslation(field, lang) {
  if (!field) return ''
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field)
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed[lang] || parsed['en'] || ''
      }
    } catch { /* not JSON */ }
    return field
  }
  if (typeof field === 'object') return field[lang] || field['en'] || ''
  return field
}

export default function BuyerGuides() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const navigate = useNavigate()
  const toast = useToast()
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const fetchGuides = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('buyer_guides')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('Error fetching buyer guides:', error)
    } else {
      setGuides(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchGuides()
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await supabase
      .from('buyer_guides')
      .delete()
      .eq('id', deleteTarget.id)
    if (error) {
      console.error('Error deleting buyer guide:', error)
      toast.error(t('admin.buyerGuides.failedToDelete'))
    } else {
      toast.success(t('admin.common.deletedSuccessfully'))
      await fetchGuides()
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  const filteredGuides = guides.filter((g) => {
    if (!search) return true
    const title = getTranslation(g.title, lang)
    return (title || '').toLowerCase().includes(search.toLowerCase())
  })

  const stats = useMemo(() => {
    const total = guides.length
    const withImages = guides.filter((g) => !!g.image).length
    return { total, withImages }
  }, [guides])

  const columns = [
    {
      key: 'image',
      label: t('admin.buyerGuides.image'),
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
      label: t('admin.buyerGuides.columnTitle'),
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-estate-900">{getTranslation(value, lang)}</p>
          <p className="text-xs text-estate-400">{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'tag',
      label: t('admin.buyerGuides.tag'),
      render: (value, row) => (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${row.tag_color || 'bg-estate-100 text-estate-600'}`}>
          {getTranslation(value, lang)}
        </span>
      ),
    },
    {
      key: 'read_time',
      label: t('admin.buyerGuides.readTime'),
      render: (value) => <span className="text-sm text-estate-500">{getTranslation(value, lang) || '--'}</span>,
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-estate-900">{t('admin.buyerGuides.title')}</h1>
          <p className="mt-1 text-sm text-estate-500">
            {t('admin.buyerGuides.subtitle')} ({guides.length} {t('admin.common.total')})
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/buyer-guides/new')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('admin.buyerGuides.addNew')}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ListStatCard
          label={t('admin.buyerGuides.totalGuides')}
          value={stats.total}
          color="blue"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.buyerGuides.withImages')}
          value={stats.withImages}
          color="green"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          }
        />
      </div>

      {/* Toolbar (Search + Page Size) */}
      <ListToolbar
        search={search}
        onSearchChange={setSearch}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredGuides}
        loading={loading}
        editPath="/admin/buyer-guides/:id"
        onDelete={(row) => setDeleteTarget(row)}
        emptyMessage={t('admin.buyerGuides.noGuides')}
        pageSize={pageSize}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        message={deleteTarget ? `${t('admin.common.confirmDelete')} "${getTranslation(deleteTarget.title, lang)}"? ${t('admin.common.deleteMessage')}` : ''}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
