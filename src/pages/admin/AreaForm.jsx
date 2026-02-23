import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import AdminFormField from '../../components/admin/AdminFormField'
import MultilingualInput from '../../components/admin/MultilingualInput'
import ImageUpload from '../../components/admin/ImageUpload'
import FormSectionHeader from '../../components/admin/FormSectionHeader'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { useToast } from '../../hooks/useToast'
import { useUnsavedChanges } from '../../hooks/useUnsavedChanges'

const generateSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const INITIAL_STATE = {
  name: {},
  key: '',
  slug: '',
  description: {},
  description_long: {},
  image: '',
  avg_price: '',
  roi: '',
  highlights: '',
  featured: false,
  sort_order: 0,
}

export default function AreaForm() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const { isDirty, markClean, blocker } = useUnsavedChanges(formData, INITIAL_STATE)

  useEffect(() => {
    if (isEdit) {
      fetchArea()
    }
  }, [id])

  const fetchArea = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching area:', error)
      setError(t('admin.areas.notFound'))
    } else if (data) {
      const loaded = {
        name: data.name || {},
        key: data.key || '',
        slug: data.slug || '',
        description: data.description || {},
        description_long: data.description_long || {},
        image: data.image || '',
        avg_price: data.avg_price || '',
        roi: data.roi || '',
        highlights: (data.highlights || []).join('\n'),
        featured: data.featured || false,
        sort_order: data.sort_order || 0,
      }
      setFormData(loaded)
      markClean(loaded)
    }
    setLoading(false)
  }

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      // Auto-generate slug and key from first available language
      if (name === 'name' && typeof value === 'object') {
        const firstLang = value.tr || value.de || value.bs || value.ru || Object.values(value)[0] || ''
        const prevFirstLang = prev.name?.tr || prev.name?.de || prev.name?.bs || prev.name?.ru || Object.values(prev.name || {})[0] || ''
        if (!prev.slug || prev.slug === generateSlug(prevFirstLang)) {
          updated.slug = generateSlug(firstLang)
        }
        if (!prev.key || prev.key === generateSlug(prevFirstLang)) {
          updated.key = generateSlug(firstLang)
        }
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Ensure slug and key are unique
    let finalSlug = formData.slug
    let finalKey = formData.key
    let counter = 1

    // Check slug uniqueness
    let slugExists = true
    let testSlug = finalSlug

    while (slugExists) {
      let query = supabase
        .from('areas')
        .select('id')
        .eq('slug', testSlug)
        .limit(1)

      if (isEdit) {
        query = query.neq('id', id)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error checking slug:', error)
        break
      }

      if (data && data.length > 0) {
        testSlug = `${finalSlug}-${counter}`
        counter++
      } else {
        slugExists = false
        finalSlug = testSlug
      }
    }

    // Check key uniqueness
    counter = 1
    let keyExists = true
    let testKey = finalKey

    while (keyExists) {
      let query = supabase
        .from('areas')
        .select('id')
        .eq('key', testKey)
        .limit(1)

      if (isEdit) {
        query = query.neq('id', id)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error checking key:', error)
        break
      }

      if (data && data.length > 0) {
        testKey = `${finalKey}-${counter}`
        counter++
      } else {
        keyExists = false
        finalKey = testKey
      }
    }

    const payload = {
      name: formData.name,
      key: finalKey,
      slug: finalSlug,
      description: formData.description,
      description_long: formData.description_long,
      image: formData.image,
      avg_price: formData.avg_price,
      roi: formData.roi,
      highlights: formData.highlights.split('\n').filter(Boolean),
      featured: formData.featured,
      sort_order: parseInt(formData.sort_order, 10) || 0,
    }

    let result
    if (isEdit) {
      result = await supabase
        .from('areas')
        .update(payload)
        .eq('id', id)
    } else {
      result = await supabase
        .from('areas')
        .insert(payload)
    }

    if (result.error) {
      console.error('Error saving area:', result.error)
      setError(result.error.message || t('admin.areas.failedToSave'))
      setSaving(false)
      return
    }

    toast.success(t('admin.common.savedSuccessfully'))
    markClean()
    setSaving(false)
    navigate('/admin/areas')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-blue-500" />
          <p className="text-sm text-estate-400">{t('admin.areas.loadingArea')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/admin/areas"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-estate-500 transition-colors hover:text-estate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('admin.areas.backToAreas')}
      </Link>

      {/* Title */}
      <h1 className="mb-6 font-heading text-2xl font-bold text-estate-900">
        {isEdit ? t('admin.areas.editArea') : t('admin.areas.addArea')}
      </h1>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            }
            title={t('admin.areaForm.basicInfo')}
          />
          <div className="space-y-6">
            {/* Area Name - All Languages */}
            <MultilingualInput
              label={t('admin.areaForm.areaName')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t('admin.areaForm.areaNamePlaceholder')}
              help={t('admin.areaForm.areaNameHelp')}
            />

            {/* Key & Slug */}
            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField
                label={t('admin.areaForm.key')}
                name="key"
                value={formData.key}
                onChange={handleChange}
                required
                disabled
                placeholder={t('admin.areaForm.keyPlaceholder')}
                help={t('admin.areaForm.keyHelp')}
              />
              <AdminFormField
                label={t('admin.areaForm.slug')}
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                disabled
                placeholder={t('admin.areaForm.slugPlaceholder')}
                help={t('admin.areaForm.slugHelp')}
              />
            </div>

            {/* Other fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <ImageUpload
                label={t('admin.areaForm.imageUrl')}
                name="image"
                value={formData.image}
                onChange={handleChange}
                folder="areas"
              />
              <AdminFormField
                label={t('admin.areaForm.avgPrice')}
                name="avg_price"
                value={formData.avg_price}
                onChange={handleChange}
                placeholder={t('admin.areaForm.avgPricePlaceholder')}
              />
              <AdminFormField
                label={t('admin.areaForm.roi')}
                name="roi"
                value={formData.roi}
                onChange={handleChange}
                placeholder={t('admin.areaForm.roiPlaceholder')}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            }
            title={t('admin.areaForm.descriptions')}
          />
          <div className="space-y-6">
            {/* Short Description - All Languages */}
            <MultilingualInput
              label={t('admin.areaForm.shortDescription')}
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder={t('admin.areaForm.shortDescPlaceholder')}
              help={t('admin.areaForm.shortDescHelp')}
            />

            {/* Long Description - All Languages */}
            <MultilingualInput
              label={t('admin.areaForm.longDescription')}
              name="description_long"
              type="textarea"
              value={formData.description_long}
              onChange={handleChange}
              rows={6}
              placeholder={t('admin.areaForm.longDescPlaceholder')}
              help={t('admin.areaForm.longDescHelp')}
            />

            {/* Highlights */}
            <AdminFormField
              label={t('admin.areaForm.highlights')}
              name="highlights"
              type="textarea"
              value={formData.highlights}
              onChange={handleChange}
              rows={4}
              placeholder={t('admin.areaForm.highlightsPlaceholder')}
              help={t('admin.areaForm.highlightsHelp')}
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title={t('admin.areaForm.settings')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminFormField
              label={t('admin.areaForm.sortOrder')}
              name="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={handleChange}
              placeholder={t('admin.areaForm.sortOrderPlaceholder')}
              help={t('admin.areaForm.sortOrderHelp')}
            />
            <div className="flex items-end">
              <AdminFormField
                label={t('admin.areaForm.featured')}
                name="featured"
                type="checkbox"
                value={formData.featured}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>


        {/* Sticky Actions Bar */}
        <div className="sticky bottom-0 z-10 -mx-6 mt-6 border-t border-estate-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {t('admin.common.saving')}
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {isEdit ? t('admin.areaForm.updateArea') : t('admin.areaForm.createArea')}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/areas')}
              className="rounded-lg border border-estate-200 bg-white px-6 py-2.5 text-sm font-medium text-estate-700 transition-colors hover:bg-estate-50"
            >
              {t('admin.areaForm.cancel')}
            </button>
            {isDirty && (
              <span className="flex items-center gap-1.5 text-xs text-amber-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {t('admin.common.unsavedChanges')}
              </span>
            )}
          </div>
        </div>
      </form>

      {/* Unsaved Changes Confirmation Dialog */}
      <ConfirmDialog
        open={blocker.state === 'blocked'}
        title={t('admin.common.unsavedChangesTitle')}
        message={t('admin.common.unsavedChangesMessage')}
        confirmLabel={t('admin.common.discardChanges')}
        cancelLabel={t('admin.common.keepEditing')}
        variant="danger"
        onConfirm={() => blocker.proceed()}
        onCancel={() => blocker.reset()}
      />
    </div>
  )
}
