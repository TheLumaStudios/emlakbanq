import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import AdminFormField from '../../components/admin/AdminFormField'
import MultilingualInput from '../../components/admin/MultilingualInput'
import ImageUpload from '../../components/admin/ImageUpload'

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
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

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
      setFormData({
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
      })
    }
    setLoading(false)
  }

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      // Auto-generate slug and key from English name
      if (name === 'name' && value.en) {
        const prevEnglishName = prev.name?.en || ''
        if (!prev.slug || prev.slug === generateSlug(prevEnglishName)) {
          updated.slug = generateSlug(value.en)
        }
        if (!prev.key || prev.key === generateSlug(prevEnglishName)) {
          updated.key = generateSlug(value.en)
        }
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      name: formData.name,
      key: formData.key,
      slug: formData.slug,
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

    navigate('/admin/areas')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-gold-500" />
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
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.areaForm.basicInfo')}</h2>
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
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.areaForm.descriptions')}</h2>
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
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.areaForm.settings')}</h2>
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


        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-estate-200 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gold-600 disabled:opacity-50"
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
        </div>
      </form>
    </div>
  )
}
