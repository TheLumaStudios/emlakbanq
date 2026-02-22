import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ListStatCard from '../../components/admin/ListStatCard'
import { useToast } from '../../hooks/useToast'

export default function ContactSubmissions() {
  const { t } = useTranslation()
  const toast = useToast()

  const FILTERS = [
    { key: 'all', label: t('admin.contactSubmissions.all') },
    { key: 'unread', label: t('admin.contactSubmissions.unread') },
    { key: 'read', label: t('admin.contactSubmissions.read') },
  ]

  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [unreadCount, setUnreadCount] = useState(0)

  const totalCount = submissions.length
  const filteredSubmissions = submissions.filter((s) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (s.name || '').toLowerCase().includes(q) || (s.email || '').toLowerCase().includes(q) || (s.property_interest || '').toLowerCase().includes(q)
  })

  // Expanded row for viewing message
  const [expandedId, setExpandedId] = useState(null)

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [filter])

  useEffect(() => {
    fetchUnreadCount()
  }, [])

  async function fetchSubmissions() {
    setLoading(true)
    setError(null)

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter === 'unread') query = query.eq('read', false)
    else if (filter === 'read') query = query.eq('read', true)

    const { data, error: err } = await query

    if (err) setError(err.message)
    else setSubmissions(data || [])
    setLoading(false)
  }

  async function fetchUnreadCount() {
    const { count, error: err } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('read', false)

    if (!err) setUnreadCount(count || 0)
  }

  async function toggleRead(item) {
    setSaving(true)
    setError(null)

    const { error: err } = await supabase
      .from('contact_submissions')
      .update({ read: !item.read })
      .eq('id', item.id)

    if (err) setError(err.message)
    else {
      toast.success(item.read ? t('admin.contactSubmissions.markedUnread') : t('admin.contactSubmissions.markedRead'))
      await fetchSubmissions()
      await fetchUnreadCount()
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setSaving(true)
    setError(null)

    const { error: err } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', deleteTarget.id)

    if (err) setError(err.message)
    else {
      toast.success(t('admin.common.deletedSuccessfully'))
      if (expandedId === deleteTarget.id) setExpandedId(null)
      await fetchSubmissions()
      await fetchUnreadCount()
    }
    setDeleteTarget(null)
    setSaving(false)
  }

  function toggleExpand(id) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  function formatDate(dateStr) {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-estate-900">{t('admin.contactSubmissions.title')}</h1>
            <p className="mt-1 text-sm text-estate-500">
              {t('admin.contactSubmissions.subtitle')}
            </p>
          </div>
          {unreadCount > 0 && (
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-500 px-2 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <ListStatCard
          label={t('admin.contactSubmissions.all')}
          value={totalCount}
          color="estate"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.contactSubmissions.unread')}
          value={unreadCount}
          color="blue"
          icon={
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
            </svg>
          }
        />
        <ListStatCard
          label={t('admin.contactSubmissions.read')}
          value={totalCount - unreadCount}
          color="green"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          }
        />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-estate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('admin.common.search') + '...'}
          className="w-full rounded-lg border border-estate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-estate-800 placeholder-estate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-estate-900 text-white'
                : 'bg-estate-100 text-estate-500 hover:bg-estate-200 hover:text-estate-700'
            }`}
          >
            {f.label}
            {f.key === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1.5 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-estate-100" />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-estate-200 py-16 text-center">
          <svg className="mx-auto h-10 w-10 text-estate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
          </svg>
          <p className="mt-3 text-sm font-medium text-estate-500">
            {filter === 'unread'
              ? t('admin.contactSubmissions.noUnreadMessages')
              : filter === 'read'
                ? t('admin.contactSubmissions.noReadMessages')
                : t('admin.contactSubmissions.noMessagesYet')}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-estate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-estate-200 bg-estate-50">
                  <th className="w-8 px-4 py-3"></th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.contactSubmissions.name')}</th>
                  <th className="hidden px-4 py-3 font-semibold text-estate-600 md:table-cell">{t('admin.contactSubmissions.email')}</th>
                  <th className="hidden px-4 py-3 font-semibold text-estate-600 lg:table-cell">{t('admin.contactSubmissions.phone')}</th>
                  <th className="hidden px-4 py-3 font-semibold text-estate-600 sm:table-cell">{t('admin.contactSubmissions.interest')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.contactSubmissions.date')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.contactSubmissions.status')}</th>
                  <th className="px-4 py-3 text-right font-semibold text-estate-600">{t('admin.contactSubmissions.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-100">
                {filteredSubmissions.map((item) => (
                  <>
                    <tr
                      key={item.id}
                      className={`transition-colors hover:bg-yellow-50 ${!item.read ? 'bg-blue-50/30 border-l-3 border-l-gold-500' : ''}`}
                    >
                      {/* Expand toggle */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="rounded-md p-1 text-estate-400 hover:bg-estate-100 hover:text-estate-700"
                          title={t('admin.contactSubmissions.viewMessage')}
                        >
                          <svg
                            className={`h-4 w-4 transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${!item.read ? 'text-estate-900' : 'text-estate-600'}`}>
                          {item.name}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-estate-500 md:table-cell">
                        <a href={`mailto:${item.email}`} className="hover:text-blue-600 hover:underline">
                          {item.email}
                        </a>
                      </td>
                      <td className="hidden px-4 py-3 text-estate-500 lg:table-cell">{item.phone || '-'}</td>
                      <td className="hidden max-w-[160px] truncate px-4 py-3 text-estate-500 sm:table-cell">
                        {item.property_interest || '-'}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-estate-400">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleRead(item)}
                          disabled={saving}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                            item.read
                              ? 'bg-estate-100 text-estate-500 hover:bg-estate-200'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                          title={item.read ? t('admin.contactSubmissions.markAsUnread') : t('admin.contactSubmissions.markAsRead')}
                        >
                          {item.read ? (
                            <>
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                              </svg>
                              {t('admin.contactSubmissions.readStatus')}
                            </>
                          ) : (
                            <>
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="5" />
                              </svg>
                              {t('admin.contactSubmissions.unreadStatus')}
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="rounded-md p-1.5 text-estate-400 transition-colors hover:bg-estate-100 hover:text-estate-700"
                            title={t('admin.contactSubmissions.viewMessage')}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="rounded-md p-1.5 text-estate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            title={t('admin.common.delete')}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded message row */}
                    {expandedId === item.id && (
                      <tr key={`${item.id}-expanded`}>
                        <td colSpan={8} className="bg-estate-50/50 px-6 py-4">
                          <div className="space-y-3">
                            {/* Mobile-only info */}
                            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 md:hidden">
                              <div>
                                <span className="font-medium text-estate-600">{t('admin.contactSubmissions.email')}: </span>
                                <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">
                                  {item.email}
                                </a>
                              </div>
                              <div>
                                <span className="font-medium text-estate-600">{t('admin.contactSubmissions.phone')}: </span>
                                <span className="text-estate-500">{item.phone || '-'}</span>
                              </div>
                            </div>

                            {item.property_interest && (
                              <div className="text-sm">
                                <span className="font-medium text-estate-600">{t('admin.contactSubmissions.interest')}: </span>
                                <span className="text-estate-500">{item.property_interest}</span>
                              </div>
                            )}

                            <div>
                              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-estate-400">{t('admin.contactSubmissions.message')}</p>
                              <div className="rounded-lg border border-estate-200 bg-white p-4 text-sm leading-relaxed text-estate-700">
                                {item.message || <span className="italic text-estate-300">{t('admin.contactSubmissions.noMessageProvided')}</span>}
                              </div>
                            </div>

                            {item.email && (
                              <a
                                href={`mailto:${item.email}?subject=Re: ${item.property_interest || 'Your inquiry'}`}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                {t('admin.contactSubmissions.replyViaEmail')}
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={t('admin.contactSubmissions.deleteTitle')}
        message={t('admin.contactSubmissions.deleteConfirm', { name: deleteTarget?.name })}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
