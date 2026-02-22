import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import AdminModal from '../../components/admin/AdminModal'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ImageUpload from '../../components/admin/ImageUpload'
import MultilingualInput from '../../components/admin/MultilingualInput'
import { useToast } from '../../hooks/useToast'

const HERO_PAGES = [
  'home',
  'properties',
  'areas',
  'about',
  'contact',
  'golden-visa',
  'buyer-guides',
  'insights',
  'blog',
]

const EMPTY_OFFICE = { city: '', address: '', phone: '', email: '', sort_order: 0 }
const EMPTY_STAT = { value: '', label: '', sort_order: 0 }

export default function Settings() {
  const { t } = useTranslation()
  const toast = useToast()

  // Hero Images state
  const [heroImages, setHeroImages] = useState([])
  const [loadingHeroes, setLoadingHeroes] = useState(true)
  const [savingHero, setSavingHero] = useState(null)

  // Offices state
  const [offices, setOffices] = useState([])
  const [loadingOffices, setLoadingOffices] = useState(true)
  const [officeModalOpen, setOfficeModalOpen] = useState(false)
  const [editingOffice, setEditingOffice] = useState(null)
  const [officeForm, setOfficeForm] = useState(EMPTY_OFFICE)

  // Company Stats state
  const [stats, setStats] = useState([])
  const [loadingStats, setLoadingStats] = useState(true)
  const [statModalOpen, setStatModalOpen] = useState(false)
  const [editingStat, setEditingStat] = useState(null)
  const [statForm, setStatForm] = useState(EMPTY_STAT)

  // Site Settings state
  const [siteSettings, setSiteSettings] = useState([])
  const [loadingSiteSettings, setLoadingSiteSettings] = useState(true)
  const [savingSetting, setSavingSetting] = useState(null)

  // Shared state
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteTable, setDeleteTable] = useState(null)

  useEffect(() => {
    fetchHeroImages()
    fetchOffices()
    fetchStats()
    fetchSiteSettings()
  }, [])

  // ========== HERO IMAGES ==========
  async function fetchHeroImages() {
    setLoadingHeroes(true)
    const { data, error: err } = await supabase
      .from('hero_images')
      .select('*')
      .order('page', { ascending: true })

    if (err) {
      setError(err.message)
      toast.error(err.message)
      setHeroImages(HERO_PAGES.map((page) => ({ page, url: '', alt: '', _isNew: true })))
    } else {
      // Merge existing data with all pages
      const map = {}
      ;(data || []).forEach((item) => {
        map[item.page] = item
      })
      setHeroImages(
        HERO_PAGES.map((page) =>
          map[page]
            ? { ...map[page], _isNew: false }
            : { page, url: '', alt: '', _isNew: true }
        )
      )
    }
    setLoadingHeroes(false)
  }

  function handleHeroChange(page, field, value) {
    setHeroImages((prev) =>
      prev.map((h) => (h.page === page ? { ...h, [field]: value, _dirty: true } : h))
    )
  }

  async function saveHeroImage(hero) {
    setSavingHero(hero.page)
    setError(null)

    const payload = {
      page: hero.page,
      url: hero.url,
      alt: hero.alt,
      updated_at: new Date().toISOString(),
    }

    let result
    if (hero._isNew || !hero.id) {
      result = await supabase
        .from('hero_images')
        .upsert([{ ...payload, created_at: new Date().toISOString() }], { onConflict: 'page' })
    } else {
      result = await supabase
        .from('hero_images')
        .update(payload)
        .eq('id', hero.id)
    }

    if (result.error) {
      setError(result.error.message)
      toast.error(result.error.message)
    } else {
      toast.success(t('admin.common.savedSuccessfully'))
      await fetchHeroImages()
    }
    setSavingHero(null)
  }

  // ========== OFFICES ==========
  async function fetchOffices() {
    setLoadingOffices(true)
    const { data, error: err } = await supabase
      .from('offices')
      .select('*')
      .order('sort_order', { ascending: true })

    if (err) {
      setError(err.message)
      toast.error(err.message)
    } else setOffices(data || [])
    setLoadingOffices(false)
  }

  function openOfficeModal(item = null) {
    if (item) {
      setEditingOffice(item)
      setOfficeForm({
        city: item.city || '',
        address: item.address || '',
        phone: item.phone || '',
        email: item.email || '',
        sort_order: item.sort_order ?? 0,
      })
    } else {
      setEditingOffice(null)
      setOfficeForm({ ...EMPTY_OFFICE, sort_order: offices.length + 1 })
    }
    setOfficeModalOpen(true)
  }

  function closeOfficeModal() {
    setOfficeModalOpen(false)
    setEditingOffice(null)
    setOfficeForm(EMPTY_OFFICE)
  }

  function handleOfficeFormChange(e) {
    const { name, value } = e.target
    setOfficeForm((prev) => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value, 10) || 0 : value,
    }))
  }

  async function handleSaveOffice(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = { ...officeForm, updated_at: new Date().toISOString() }

    let result
    if (editingOffice) {
      result = await supabase.from('offices').update(payload).eq('id', editingOffice.id)
    } else {
      result = await supabase.from('offices').insert([{ ...payload, created_at: new Date().toISOString() }])
    }

    if (result.error) {
      setError(result.error.message)
      toast.error(result.error.message)
    } else {
      closeOfficeModal()
      toast.success(t('admin.common.savedSuccessfully'))
      await fetchOffices()
    }
    setSaving(false)
  }

  // ========== COMPANY STATS ==========
  async function fetchStats() {
    setLoadingStats(true)
    const { data, error: err } = await supabase
      .from('company_stats')
      .select('*')
      .order('sort_order', { ascending: true })

    if (err) {
      setError(err.message)
      toast.error(err.message)
    } else setStats(data || [])
    setLoadingStats(false)
  }

  function openStatModal(item = null) {
    if (item) {
      setEditingStat(item)
      // Support both plain string and JSONB label
      const label = item.label && typeof item.label === 'object'
        ? item.label
        : { en: item.label || '' }
      setStatForm({
        value: item.value || '',
        label,
        sort_order: item.sort_order ?? 0,
      })
    } else {
      setEditingStat(null)
      setStatForm({ ...EMPTY_STAT, label: {}, sort_order: stats.length + 1 })
    }
    setStatModalOpen(true)
  }

  function closeStatModal() {
    setStatModalOpen(false)
    setEditingStat(null)
    setStatForm(EMPTY_STAT)
  }

  function handleStatFormChange(e) {
    const { name, value } = e.target
    setStatForm((prev) => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value, 10) || 0 : value,
    }))
  }

  async function handleSaveStat(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = { ...statForm, updated_at: new Date().toISOString() }

    let result
    if (editingStat) {
      result = await supabase.from('company_stats').update(payload).eq('id', editingStat.id)
    } else {
      result = await supabase.from('company_stats').insert([{ ...payload, created_at: new Date().toISOString() }])
    }

    if (result.error) {
      setError(result.error.message)
      toast.error(result.error.message)
    } else {
      closeStatModal()
      toast.success(t('admin.common.savedSuccessfully'))
      await fetchStats()
    }
    setSaving(false)
  }

  // ========== SITE SETTINGS (key-value) ==========
  async function fetchSiteSettings() {
    setLoadingSiteSettings(true)
    const { data, error: err } = await supabase
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true })

    if (err) {
      setError(err.message)
      toast.error(err.message)
    } else setSiteSettings(data || [])
    setLoadingSiteSettings(false)
  }

  function handleSettingValueChange(id, newValue) {
    setSiteSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value: newValue, _dirty: true } : s))
    )
  }

  async function saveSiteSetting(setting) {
    setSavingSetting(setting.id)
    setError(null)

    // value is already the correct type (string for brand/domain/tagline, object for social)
    let parsedValue = setting.value
    if (typeof parsedValue === 'string') {
      try {
        parsedValue = JSON.parse(parsedValue)
      } catch {
        // keep as-is
      }
    }

    const { error: err } = await supabase
      .from('site_settings')
      .update({
        value: parsedValue,
        updated_at: new Date().toISOString(),
      })
      .eq('id', setting.id)

    if (err) {
      setError(err.message)
      toast.error(err.message)
    } else {
      toast.success(t('admin.common.savedSuccessfully'))
      await fetchSiteSettings()
    }
    setSavingSetting(null)
  }

  // ========== DELETE (shared) ==========
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
      if (deleteTable === 'offices') await fetchOffices()
      else if (deleteTable === 'company_stats') await fetchStats()
      toast.success(t('admin.common.deletedSuccessfully'))
    }
    setDeleteTarget(null)
    setDeleteTable(null)
    setSaving(false)
  }

  function getDeleteLabel() {
    if (!deleteTarget) return ''
    const label = deleteTarget.label
    const displayLabel = label && typeof label === 'object'
      ? (label.en || label.tr || Object.values(label)[0] || '')
      : label
    return deleteTarget.city || displayLabel || deleteTarget.key || 'this item'
  }

  // ========== RENDER ==========
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-estate-900">{t('admin.settings.title')}</h1>
        <p className="mt-1 text-sm text-estate-500">
          {t('admin.settings.subtitle')}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ========== HERO IMAGES ========== */}
      <section className="rounded-lg border border-estate-200 bg-white">
        <div className="border-b border-estate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-estate-900">{t('admin.common.heroImages')}</h2>
          <p className="text-xs text-estate-400">{t('admin.common.heroImagesDesc')}</p>
        </div>

        {loadingHeroes ? (
          <div className="space-y-2 p-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded bg-estate-100" />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-estate-100">
            {heroImages.map((hero) => (
              <div key={hero.page} className="px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex rounded-md bg-estate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-estate-600">
                    {hero.page}
                  </span>
                  <button
                    onClick={() => saveHeroImage(hero)}
                    disabled={savingHero === hero.page}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                  >
                    {savingHero === hero.page ? (
                      <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                    {t('admin.common.save')}
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ImageUpload
                    name="url"
                    value={hero.url || ''}
                    onChange={(_, value) => handleHeroChange(hero.page, 'url', value)}
                    folder="hero-images"
                  />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-estate-700">
                      {t('admin.common.altText')}
                    </label>
                    <input
                      type="text"
                      value={hero.alt || ''}
                      onChange={(e) => handleHeroChange(hero.page, 'alt', e.target.value)}
                      placeholder={t('admin.common.altText')}
                      className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========== OFFICES ========== */}
      <section className="rounded-lg border border-estate-200 bg-white">
        <div className="flex items-center justify-between border-b border-estate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-estate-900">{t('admin.common.offices')}</h2>
            <p className="text-xs text-estate-400">{t('admin.common.officesDesc')}</p>
          </div>
          <button
            onClick={() => openOfficeModal()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t('admin.common.create')}
          </button>
        </div>

        {loadingOffices ? (
          <div className="space-y-2 p-5">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded bg-estate-100" />
            ))}
          </div>
        ) : offices.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-estate-400">{t('admin.settings.noOffices')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-estate-200 bg-estate-50">
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.common.order')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.settings.city')}</th>
                  <th className="hidden px-4 py-3 font-semibold text-estate-600 md:table-cell">{t('admin.settings.address')}</th>
                  <th className="hidden px-4 py-3 font-semibold text-estate-600 sm:table-cell">{t('admin.settings.phone')}</th>
                  <th className="hidden px-4 py-3 font-semibold text-estate-600 lg:table-cell">{t('admin.settings.email')}</th>
                  <th className="px-4 py-3 text-right font-semibold text-estate-600">{t('admin.common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-100">
                {offices.map((office) => (
                  <tr key={office.id} className="transition-colors hover:bg-yellow-50">
                    <td className="px-4 py-3 text-estate-400">{office.sort_order}</td>
                    <td className="px-4 py-3 font-medium text-estate-900">{office.city}</td>
                    <td className="hidden max-w-[200px] truncate px-4 py-3 text-estate-500 md:table-cell">
                      {office.address}
                    </td>
                    <td className="hidden px-4 py-3 text-estate-500 sm:table-cell">{office.phone}</td>
                    <td className="hidden px-4 py-3 text-estate-500 lg:table-cell">{office.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openOfficeModal(office)}
                          className="rounded-md p-1.5 text-estate-400 transition-colors hover:bg-estate-100 hover:text-estate-700"
                          title={t('admin.common.edit')}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          onClick={() => confirmDelete(office, 'offices')}
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

      {/* ========== COMPANY STATS ========== */}
      <section className="rounded-lg border border-estate-200 bg-white">
        <div className="flex items-center justify-between border-b border-estate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-estate-900">{t('admin.common.companyStats')}</h2>
            <p className="text-xs text-estate-400">{t('admin.common.companyStatsDesc')}</p>
          </div>
          <button
            onClick={() => openStatModal()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {t('admin.common.create')}
          </button>
        </div>

        {loadingStats ? (
          <div className="space-y-2 p-5">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded bg-estate-100" />
            ))}
          </div>
        ) : stats.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-estate-400">{t('admin.settings.noStats')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-estate-200 bg-estate-50">
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.common.order')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.settings.value')}</th>
                  <th className="px-4 py-3 font-semibold text-estate-600">{t('admin.settings.label')}</th>
                  <th className="px-4 py-3 text-right font-semibold text-estate-600">{t('admin.common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-estate-100">
                {stats.map((stat) => (
                  <tr key={stat.id} className="transition-colors hover:bg-yellow-50">
                    <td className="px-4 py-3 text-estate-400">{stat.sort_order}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-sm font-bold text-blue-700">
                        {stat.value}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-estate-700">
                      {stat.label && typeof stat.label === 'object'
                        ? (stat.label.en || stat.label.tr || Object.values(stat.label)[0] || '')
                        : stat.label}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openStatModal(stat)}
                          className="rounded-md p-1.5 text-estate-400 transition-colors hover:bg-estate-100 hover:text-estate-700"
                          title={t('admin.common.edit')}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          onClick={() => confirmDelete(stat, 'company_stats')}
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

      {/* ========== SITE SETTINGS ========== */}
      <section className="rounded-lg border border-estate-200 bg-white">
        <div className="border-b border-estate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-estate-900">{t('admin.settings.title')}</h2>
          <p className="text-xs text-estate-400">{t('admin.common.brandInfo')}</p>
        </div>

        {loadingSiteSettings ? (
          <div className="space-y-2 p-5">
            {[1, 2].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded bg-estate-100" />
            ))}
          </div>
        ) : siteSettings.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-estate-400">{t('admin.settings.noSiteSettings')}</p>
          </div>
        ) : (
          <div className="divide-y divide-estate-100">
            {/* Simple text settings (brand, domain, tagline) */}
            {siteSettings
              .filter((s) => s.key !== 'social')
              .map((setting) => {
                const displayValue =
                  typeof setting.value === 'string' ? setting.value : JSON.stringify(setting.value).replace(/^"|"$/g, '')
                const labels = { brand: t('admin.settings.brandName'), domain: t('admin.settings.domain'), tagline: t('admin.settings.tagline') }
                return (
                  <div key={setting.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                    <div className="w-28 shrink-0">
                      <span className="text-sm font-medium text-estate-700">
                        {labels[setting.key] || setting.key}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center gap-3">
                      <input
                        type="text"
                        value={displayValue}
                        onChange={(e) => handleSettingValueChange(setting.id, JSON.stringify(e.target.value))}
                        className="flex-1 rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => saveSiteSetting(setting)}
                        disabled={savingSetting === setting.id}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                      >
                        {savingSetting === setting.id ? (
                          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                        {t('admin.common.save')}
                      </button>
                    </div>
                  </div>
                )
              })}

            {/* Social media links */}
            {siteSettings
              .filter((s) => s.key === 'social')
              .map((setting) => {
                const social = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value || {}
                const platforms = [
                  { key: 'instagram', label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                  { key: 'youtube', label: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                  { key: 'linkedin', label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { key: 'twitter', label: 'X (Twitter)', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                ]

                return (
                  <div key={setting.id} className="px-5 py-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-estate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0-12.814a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186-9.566-5.314m9.566 7.5-9.566 5.314" />
                        </svg>
                        <span className="text-sm font-medium text-estate-700">{t('admin.settings.socialMediaLinks')}</span>
                      </div>
                      <button
                        onClick={() => saveSiteSetting(setting)}
                        disabled={savingSetting === setting.id}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                      >
                        {savingSetting === setting.id ? (
                          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                        {t('admin.common.saveAll')}
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {platforms.map((platform) => (
                        <div key={platform.key} className="flex items-center gap-3 rounded-lg border border-estate-100 bg-estate-50/50 px-3 py-2.5">
                          <svg className="h-4 w-4 shrink-0 text-estate-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d={platform.icon} />
                          </svg>
                          <div className="min-w-0 flex-1">
                            <label className="mb-1 block text-xs font-medium text-estate-500">
                              {platform.label}
                            </label>
                            <input
                              type="url"
                              value={social[platform.key] || ''}
                              onChange={(e) => {
                                const updated = { ...social, [platform.key]: e.target.value }
                                handleSettingValueChange(setting.id, updated)
                              }}
                              placeholder={`https://${platform.key}.com/...`}
                              className="w-full rounded border border-estate-200 bg-white px-2.5 py-1.5 text-xs text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </section>

      {/* ========== MODALS ========== */}

      {/* Office Modal */}
      <AdminModal
        open={officeModalOpen}
        onClose={closeOfficeModal}
        title={editingOffice ? t('admin.settings.editOffice') : t('admin.settings.addOffice')}
      >
        <form onSubmit={handleSaveOffice} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.settings.city')}</label>
              <input
                type="text"
                name="city"
                value={officeForm.city}
                onChange={handleOfficeFormChange}
                required
                placeholder={t('admin.settings.cityPlaceholder')}
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.common.sortOrder')}</label>
              <input
                type="number"
                name="sort_order"
                value={officeForm.sort_order}
                onChange={handleOfficeFormChange}
                min={0}
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.settings.address')}</label>
            <input
              type="text"
              name="address"
              value={officeForm.address}
              onChange={handleOfficeFormChange}
              required
              placeholder={t('admin.settings.addressPlaceholder')}
              className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.settings.phone')}</label>
              <input
                type="text"
                name="phone"
                value={officeForm.phone}
                onChange={handleOfficeFormChange}
                placeholder="+971 4 XXX XXXX"
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.settings.email')}</label>
              <input
                type="email"
                name="email"
                value={officeForm.email}
                onChange={handleOfficeFormChange}
                placeholder="office@emlakbanq.com"
                className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeOfficeModal}
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
              {editingOffice ? t('admin.common.update') : t('admin.common.create')}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Stat Modal */}
      <AdminModal
        open={statModalOpen}
        onClose={closeStatModal}
        title={editingStat ? t('admin.settings.editStat') : t('admin.settings.addStat')}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveStat} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.settings.value')}</label>
            <input
              type="text"
              name="value"
              value={statForm.value}
              onChange={handleStatFormChange}
              required
              placeholder={t('admin.settings.valuePlaceholder')}
              className="w-full rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 placeholder:text-estate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <MultilingualInput
            label={t('admin.settings.label')}
            name="label"
            value={statForm.label}
            onChange={(name, value) => setStatForm((prev) => ({ ...prev, [name]: value }))}
            placeholder={t('admin.settings.labelPlaceholder')}
            required
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-estate-700">{t('admin.common.sortOrder')}</label>
            <input
              type="number"
              name="sort_order"
              value={statForm.sort_order}
              onChange={handleStatFormChange}
              min={0}
              className="w-24 rounded-lg border border-estate-200 px-3 py-2 text-sm text-estate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeStatModal}
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
              {editingStat ? t('admin.common.update') : t('admin.common.create')}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={t('admin.common.deleteItem')}
        message={t('admin.common.deleteConfirmMessage', { name: getDeleteLabel() })}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteTarget(null)
          setDeleteTable(null)
        }}
      />
    </div>
  )
}
