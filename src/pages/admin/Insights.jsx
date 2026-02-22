import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import AdminModal from '../../components/admin/AdminModal'
import MultilingualInput from '../../components/admin/MultilingualInput'
import { useToast } from '../../hooks/useToast'

// Display text from JSONB or plain string
function getDisplayText(field) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field.en || Object.values(field).find((v) => v) || ''
}

export default function Insights() {
  const { t } = useTranslation()
  const toast = useToast()
  // Market Highlights state
  const [highlights, setHighlights] = useState([])
  const [loadingHighlights, setLoadingHighlights] = useState(true)
  const [highlightModalOpen, setHighlightModalOpen] = useState(false)
  const [editingHighlight, setEditingHighlight] = useState(null)
  const [highlightForm, setHighlightForm] = useState({ text: {}, sort_order: 0 })

  // Top Areas ROI state
  const [areas, setAreas] = useState([])
  const [loadingAreas, setLoadingAreas] = useState(true)
  const [areaModalOpen, setAreaModalOpen] = useState(false)
  const [editingArea, setEditingArea] = useState(null)
  const [areaForm, setAreaForm] = useState({ area: {}, roi: '', price_range: '', trend: 'up', sort_order: 0 })

  // Shared state
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteTable, setDeleteTable] = useState(null)

  useEffect(() => {
    fetchHighlights()
    fetchAreas()
  }, [])

  // ---- Market Highlights ----
  async function fetchHighlights() {
    setLoadingHighlights(true)
    const { data, error: err } = await supabase
      .from('market_highlights')
      .select('*')
      .order('sort_order', { ascending: true })

    if (err) setError(err.message)
    else setHighlights(data || [])
    setLoadingHighlights(false)
  }

  function openHighlightModal(item = null) {
    if (item) {
      setEditingHighlight(item)
      const text = typeof item.text === 'string' ? { en: item.text } : (item.text || {})
      setHighlightForm({ text, sort_order: item.sort_order ?? 0 })
    } else {
      setEditingHighlight(null)
      setHighlightForm({ text: {}, sort_order: highlights.length + 1 })
    }
    setHighlightModalOpen(true)
  }

  function closeHighlightModal() {
    setHighlightModalOpen(false)
    setEditingHighlight(null)
    setHighlightForm({ text: {}, sort_order: 0 })
  }

  async function handleSaveHighlight(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      text: highlightForm.text,
      sort_order: highlightForm.sort_order,
      updated_at: new Date().toISOString(),
    }

    let result
    if (editingHighlight) {
      result = await supabase.from('market_highlights').update(payload).eq('id', editingHighlight.id)
    } else {
      result = await supabase.from('market_highlights').insert([{ ...payload, created_at: new Date().toISOString() }])
    }

    if (result.error) {
      setError(result.error.message)
      toast.error(result.error.message)
    } else {
      closeHighlightModal()
      await fetchHighlights()
      toast.success(t('admin.common.savedSuccessfully'))
    }
    setSaving(false)
  }

  // ---- Top Areas ROI ----
  async function fetchAreas() {
    setLoadingAreas(true)
    const { data, error: err } = await supabase
      .from('top_areas_roi')
      .select('*')
      .order('sort_order', { ascending: true })

    if (err) setError(err.message)
    else setAreas(data || [])
    setLoadingAreas(false)
  }

  function openAreaModal(item = null) {
    if (item) {
      setEditingArea(item)
      const area = typeof item.area === 'string' ? { en: item.area } : (item.area || {})
      setAreaForm({
        area,
        roi: item.roi || '',
        price_range: item.price_range || '',
        trend: item.trend || 'up',
        sort_order: item.sort_order ?? 0,
      })
    } else {
      setEditingArea(null)
      setAreaForm({ area: {}, roi: '', price_range: '', trend: 'up', sort_order: areas.length + 1 })
    }
    setAreaModalOpen(true)
  }

  function closeAreaModal() {
    setAreaModalOpen(false)
    setEditingArea(null)
    setAreaForm({ area: {}, roi: '', price_range: '', trend: 'up', sort_order: 0 })
  }

  function handleAreaFormChange(e) {
    const { name, value } = e.target
    setAreaForm((prev) => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value, 10) || 0 : value,
    }))
  }

  async function handleSaveArea(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      ...areaForm,
      updated_at: new Date().toISOString(),
    }

    let result
    if (editingArea) {
      result = await supabase.from('top_areas_roi').update(payload).eq('id', editingArea.id)
    } else {
      result = await supabase.from('top_areas_roi').insert([{ ...payload, created_at: new Date().toISOString() }])
    }

    if (result.error) {
      setError(result.error.message)
      toast.error(result.error.message)
    } else {
      closeAreaModal()
      await fetchAreas()
      toast.success(t('admin.common.savedSuccessfully'))
    }
    setSaving(false)
  }

  // ---- Delete (shared) ----
  function confirmDelete(item, table) {
    setDeleteTarget(item)
    setDeleteTable(table)
  }

  async function handleDelete() {
    if (!deleteTarget || !deleteTable) return
    setSaving(true)
    setError(null)

    const { error: err } = await supabase
      .from(deleteTable)
      .delete()
      .eq('id', deleteTarget.id)

    if (err) {
      setError(err.message)
      toast.error(err.message)
    } else {
      if (deleteTable === 'market_highlights') await fetchHighlights()
      else await fetchAreas()
      toast.success(t('admin.common.deletedSuccessfully'))
    }
    setDeleteTarget(null)
    setDeleteTable(null)
    setSaving(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-estate-900">{t('admin.nav.insights')}</h1>
        <p className="mt-1 text-sm text-estate-500">
          {t('admin.insights.subtitle')}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ========== Market Highlights ========== */}
      <section className="rounded-lg border border-estate-200 bg-white">
        <div className="flex items-center justify-between border-b border-estate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-estate-900">{t('admin.common.marketHighlights')}</h2>
            <p className="text-xs text-estate-400">{t('admin.common.shortTextItems')}</p>
          </div>
          <button
            onClick={() => openHighlightModal()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t('admin.common.create')}
          </button>
        </div>

        <div className="divide-y divide-estate-100">
          {loadingHighlights ? (
            <div className="space-y-2 p-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 animate-pulse rounded bg-estate-100" />
              ))}
            </div>
          ) : highlights.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-estate-400">{t('admin.insights.noHighlights')}</p>
            </div>
          ) : (
            highlights.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                <span className="w-10 text-center text-xs font-medium text-estate-400">
                  {item.sort_order}
                </span>
                <span className="flex-1 text-sm text-estate-700">{getDisplayText(item.text)}</span>
                <button
                  onClick={() => openHighlightModal(item)}
                  className="rounded-md p-1.5 text-estate-400 hover:bg-estate-100 hover:text-estate-700"
                  title={t('admin.common.edit')}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button
                  onClick={() => confirmDelete(item, 'market_highlights')}
                  className="rounded-md p-1.5 text-estate-400 hover:bg-red-50 hover:text-red-600"
                  title={t('admin.common.delete')}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ========== Top Areas ROI ========== */}
      <section className="rounded-lg border border-estate-200 bg-white">
        <div className="flex items-center justify-between border-b border-estate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-estate-900">{t('admin.common.topAreasROI')}</h2>
            <p className="text-xs text-estate-400">{t('admin.common.investmentReturns')}</p>
          </div>
          <button
            onClick={() => openAreaModal()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t('admin.common.create')}
          </button>
        </div>

        {loadingAreas ? (
          <div className="space-y-2 p-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded bg-estate-100" />
            ))}
          </div>
        ) : areas.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-estate-400">{t('admin.insights.noAreas')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-estate-200 bg-estate-50">
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.common.order')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.insights.area')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.insights.roi')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.insights.priceRange')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.insights.trend')}</th>
                  <th className="px-4 py-3 text-right font-semibold text-estate-600">{t('admin.common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-100">
                {areas.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-yellow-50">
                    <td className="px-4 py-3 text-estate-400">{item.sort_order}</td>
                    <td className="px-4 py-3 font-medium text-estate-900">{getDisplayText(item.area)}</td>
                    <td className="px-4 py-3 font-semibold text-blue-600">{item.roi}</td>
                    <td className="px-4 py-3 text-estate-500">{item.price_range}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.trend === 'up'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {item.trend === 'up' ? (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        ) : (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L7.5 3m0 0l9 9m-9-9l-9 9" />
                          </svg>
                        )}
                        {item.trend === 'up' ? t('admin.insights.trendUp') : t('admin.insights.trendStable')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openAreaModal(item)}
                          className="rounded-md p-1.5 text-estate-400 transition-colors hover:bg-estate-100 hover:text-estate-700"
                          title={t('admin.common.edit')}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          onClick={() => confirmDelete(item, 'top_areas_roi')}
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
      </section>

      {/* ========== MODALS ========== */}

      {/* Highlight Modal */}
      <AdminModal
        open={highlightModalOpen}
        onClose={closeHighlightModal}
        title={editingHighlight ? t('admin.common.editItem') : t('admin.common.addItem')}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveHighlight} className="space-y-4">
          <MultilingualInput
            label={t('admin.common.description')}
            name="text"
            value={highlightForm.text}
            onChange={(_, value) => setHighlightForm((prev) => ({ ...prev, text: value }))}
            placeholder={t('admin.insights.highlightsPlaceholder')}
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.common.sortOrder')}</label>
            <input
              type="number"
              value={highlightForm.sort_order}
              onChange={(e) => setHighlightForm((prev) => ({ ...prev, sort_order: parseInt(e.target.value, 10) || 0 }))}
              min={0}
              className="w-24 rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeHighlightModal}
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
              {editingHighlight ? t('admin.common.update') : t('admin.common.create')}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Area Modal */}
      <AdminModal
        open={areaModalOpen}
        onClose={closeAreaModal}
        title={editingArea ? t('admin.insights.editArea') : t('admin.insights.addArea')}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveArea} className="space-y-4">
          <MultilingualInput
            label={t('admin.insights.area')}
            name="area"
            value={areaForm.area}
            onChange={(_, value) => setAreaForm((prev) => ({ ...prev, area: value }))}
            required
            placeholder={t('admin.insights.areaPlaceholder')}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.insights.roi')}</label>
              <input
                type="text"
                name="roi"
                value={areaForm.roi}
                onChange={handleAreaFormChange}
                required
                placeholder={t('admin.insights.roiPlaceholder')}
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.insights.priceRange')}</label>
              <input
                type="text"
                name="price_range"
                value={areaForm.price_range}
                onChange={handleAreaFormChange}
                placeholder={t('admin.insights.priceRangePlaceholder')}
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.insights.trend')}</label>
              <select
                name="trend"
                value={areaForm.trend}
                onChange={handleAreaFormChange}
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="up">{t('admin.insights.trendUp')}</option>
                <option value="stable">{t('admin.insights.trendStable')}</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.common.sortOrder')}</label>
              <input
                type="number"
                name="sort_order"
                value={areaForm.sort_order}
                onChange={handleAreaFormChange}
                min={0}
                className="w-24 rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeAreaModal}
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
              {editingArea ? t('admin.common.update') : t('admin.common.create')}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={t('admin.common.deleteItem')}
        message={t('admin.common.deleteConfirmMessage', { name: getDisplayText(deleteTarget?.text) || getDisplayText(deleteTarget?.area) })}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteTarget(null)
          setDeleteTable(null)
        }}
      />
    </div>
  )
}
