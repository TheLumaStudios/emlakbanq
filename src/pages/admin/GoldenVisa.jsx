import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { useToast } from '../../hooks/useToast'
import AdminModal from '../../components/admin/AdminModal'

const EMPTY_ITEM = { icon: '', title: '', description: '', sort_order: 0 }

export default function GoldenVisa() {
  const { t } = useTranslation()
  const toast = useToast()

  const TABS = [
    { key: 'benefit', label: t('admin.common.benefits') },
    { key: 'eligibility', label: t('admin.common.eligibility') },
    { key: 'process_step', label: t('admin.common.processSteps') },
  ]

  const [activeTab, setActiveTab] = useState('benefit')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState(EMPTY_ITEM)

  // Delete confirm state
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [activeTab])

  async function fetchItems() {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('golden_visa_content')
      .select('*')
      .eq('section', activeTab)
      .order('sort_order', { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }

  function openAddModal() {
    setEditingItem(null)
    setFormData({ ...EMPTY_ITEM, sort_order: items.length + 1 })
    setModalOpen(true)
  }

  function openEditModal(item) {
    setEditingItem(item)
    setFormData({
      icon: item.icon || '',
      title: item.title || '',
      description: item.description || '',
      sort_order: item.sort_order ?? 0,
    })
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingItem(null)
    setFormData(EMPTY_ITEM)
  }

  function handleFormChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value, 10) || 0 : value,
    }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      ...formData,
      section: activeTab,
      updated_at: new Date().toISOString(),
    }

    let result
    if (editingItem) {
      result = await supabase
        .from('golden_visa_content')
        .update(payload)
        .eq('id', editingItem.id)
    } else {
      result = await supabase
        .from('golden_visa_content')
        .insert([{ ...payload, created_at: new Date().toISOString() }])
    }

    if (result.error) {
      setError(result.error.message)
      toast.error(result.error.message)
    } else {
      closeModal()
      await fetchItems()
      toast.success(t('admin.common.savedSuccessfully'))
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setSaving(true)
    setError(null)

    const { error: delError } = await supabase
      .from('golden_visa_content')
      .delete()
      .eq('id', deleteTarget.id)

    if (delError) {
      setError(delError.message)
      toast.error(delError.message)
    } else {
      await fetchItems()
      toast.success(t('admin.common.deletedSuccessfully'))
    }
    setDeleteTarget(null)
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-estate-900">{t('admin.nav.goldenVisa')}</h1>
          <p className="mt-1 text-sm text-estate-500">
            {t('admin.goldenVisa.subtitle')}
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {t('admin.common.create')}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-estate-200">
        <nav className="-mb-px flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-estate-400 hover:border-estate-300 hover:text-estate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-estate-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-estate-200 py-16 text-center">
          <svg className="mx-auto h-10 w-10 text-estate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <p className="mt-3 text-sm font-medium text-estate-500">
            {t('admin.common.noItemsYet')}
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t('admin.common.addFirstItem')}
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-estate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-estate-200 bg-estate-50">
                <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.common.order')}</th>
                <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.common.icon')}</th>
                <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.common.title')}</th>
                <th className="hidden px-4 py-3 font-semibold text-estate-600 md:table-cell">{t('admin.common.description')}</th>
                <th className="px-4 py-3 text-right font-semibold text-estate-600">{t('admin.common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-estate-100">
              {items.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-yellow-50">
                  <td className="px-4 py-3 text-estate-400">{item.sort_order}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-base">
                      {item.icon}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-estate-900">{item.title}</td>
                  <td className="hidden max-w-xs truncate px-4 py-3 text-estate-500 md:table-cell">
                    {item.description}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="rounded-md p-1.5 text-estate-400 transition-colors hover:bg-estate-100 hover:text-estate-700"
                        title={t('admin.common.edit')}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AdminModal
        open={modalOpen}
        onClose={closeModal}
        title={editingItem ? t('admin.common.editItem') : t('admin.common.addItem')}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.common.icon')}</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleFormChange}
                placeholder={t('admin.goldenVisa.iconPlaceholder')}
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.common.sortOrder')}</label>
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleFormChange}
                min={0}
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.common.title')}</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
              placeholder={t('admin.goldenVisa.titlePlaceholder')}
              className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.common.description')}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              rows={4}
              placeholder={t('admin.goldenVisa.descriptionPlaceholder')}
              className="w-full resize-none rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-estate-200 px-4 py-2 text-sm font-medium text-estate-700 transition-colors hover:bg-estate-50"
            >
              {t('admin.common.cancel')}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              {saving && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {editingItem ? t('admin.common.update') : t('admin.common.create')}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={t('admin.common.deleteItem')}
        message={t('admin.common.deleteConfirmMessage', { name: deleteTarget?.title })}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
