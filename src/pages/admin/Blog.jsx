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

export default function Blog() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const navigate = useNavigate()
  const toast = useToast()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [publishedFilter, setPublishedFilter] = useState('all')
  const [pageSize, setPageSize] = useState(10)

  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      console.error('Error fetching blog posts:', error)
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', deleteTarget.id)
    if (error) {
      console.error('Error deleting blog post:', error)
      toast.error(t('admin.blog.failedToDelete'))
    } else {
      toast.success(t('admin.common.deletedSuccessfully'))
      await fetchPosts()
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  // Derived stats
  const publishedCount = posts.filter((p) => p.published).length
  const draftCount = posts.filter((p) => !p.published).length

  // Filter: published status first, then search
  let filteredPosts = posts
  if (publishedFilter === 'published') filteredPosts = filteredPosts.filter((p) => p.published)
  else if (publishedFilter === 'draft') filteredPosts = filteredPosts.filter((p) => !p.published)

  filteredPosts = filteredPosts.filter((p) => {
    if (!search) return true
    const title = typeof p.title === 'object' ? Object.values(p.title).join(' ') : (p.title || '')
    return title.toLowerCase().includes(search.toLowerCase()) || (p.slug || '').toLowerCase().includes(search.toLowerCase())
  })

  const columns = [
    {
      key: 'image',
      label: t('admin.blog.image'),
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
      label: t('admin.blog.columnTitle'),
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-estate-900">{getLocalizedValue(value, lang)}</p>
          <p className="text-xs text-estate-400">{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: t('admin.blog.category'),
      render: (value, row) => (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${row.category_color || 'bg-estate-100 text-estate-600'}`}>
          {getLocalizedValue(value, lang)}
        </span>
      ),
    },
    {
      key: 'author',
      label: t('admin.blog.author'),
      render: (value) => <span className="text-sm text-estate-600">{value || '--'}</span>,
    },
    {
      key: 'published',
      label: t('admin.blog.published'),
      sortable: true,
      render: (value) =>
        value ? (
          <span className="inline-block rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
            {t('admin.blog.publishedStatus')}
          </span>
        ) : (
          <span className="inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            {t('admin.blog.draftStatus')}
          </span>
        ),
    },
    {
      key: 'date',
      label: t('admin.blog.date'),
      sortable: true,
      render: (value) => <span className="text-sm text-estate-500">{value || '--'}</span>,
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-estate-900">{t('admin.blog.title')}</h1>
          <p className="mt-1 text-sm text-estate-500">
            {t('admin.blog.subtitle')} ({posts.length} {t('admin.common.total')})
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/blog/new')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('admin.blog.addNew')}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ListStatCard
          label={t('admin.blog.totalPosts')}
          value={posts.length}
          color="blue"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.blog.publishedCount')}
          value={publishedCount}
          color="green"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.blog.draftCount')}
          value={draftCount}
          color="gold"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          }
        />
      </div>

      {/* Toolbar: Search + Published Filter + Page Size */}
      <ListToolbar
        search={search}
        onSearchChange={setSearch}
        filters={[
          {
            key: 'published',
            value: publishedFilter,
            onChange: setPublishedFilter,
            options: [
              { value: 'all', label: t('admin.common.all') },
              { value: 'published', label: t('admin.blog.publishedStatus') },
              { value: 'draft', label: t('admin.blog.draftStatus') },
            ],
          },
        ]}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      {/* Table */}
      <AdminTable
        columns={columns}
        data={filteredPosts}
        loading={loading}
        editPath="/admin/blog/:id"
        onDelete={(row) => setDeleteTarget(row)}
        emptyMessage={t('admin.blog.noPosts')}
        pageSize={pageSize}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        message={deleteTarget ? `${t('admin.blog.deleteTitle')} "${getLocalizedValue(deleteTarget.title, lang)}"? ${t('admin.blog.deleteConfirm')}` : ''}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
