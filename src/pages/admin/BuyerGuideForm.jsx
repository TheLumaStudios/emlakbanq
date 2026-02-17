import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import AdminFormField from '../../components/admin/AdminFormField'
import ImageUpload from '../../components/admin/ImageUpload'

const generateSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const INITIAL_STATE = {
  title: '',
  slug: '',
  description: '',
  image: '',
  tag: '',
  tag_color: '',
  border_color: '',
  read_time: '',
  sort_order: 0,
}

export default function BuyerGuideForm() {
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
      fetchGuide()
    }
  }, [id])

  const fetchGuide = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('buyer_guides')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching buyer guide:', error)
      setError(t('admin.buyerGuides.notFound'))
    } else if (data) {
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        image: data.image || '',
        tag: data.tag || '',
        tag_color: data.tag_color || '',
        border_color: data.border_color || '',
        read_time: data.read_time || '',
        sort_order: data.sort_order || 0,
      })
    }
    setLoading(false)
  }

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updated.slug = generateSlug(value)
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      image: formData.image,
      tag: formData.tag,
      tag_color: formData.tag_color,
      border_color: formData.border_color,
      read_time: formData.read_time,
      sort_order: parseInt(formData.sort_order, 10) || 0,
    }

    let result
    if (isEdit) {
      result = await supabase
        .from('buyer_guides')
        .update(payload)
        .eq('id', id)
    } else {
      result = await supabase
        .from('buyer_guides')
        .insert(payload)
    }

    if (result.error) {
      console.error('Error saving buyer guide:', result.error)
      setError(result.error.message || t('admin.buyerGuides.failedToSave'))
      setSaving(false)
      return
    }

    navigate('/admin/buyer-guides')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-gold-500" />
          <p className="text-sm text-estate-400">{t('admin.buyerGuides.loadingGuide')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/admin/buyer-guides"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-estate-500 transition-colors hover:text-estate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('admin.buyerGuides.backToGuides')}
      </Link>

      {/* Title */}
      <h1 className="mb-6 font-heading text-2xl font-bold text-estate-900">
        {isEdit ? t('admin.buyerGuides.editGuide') : t('admin.buyerGuides.addGuide')}
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
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.buyerGuideForm.basicInfo')}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminFormField
              label={t('admin.buyerGuideForm.title')}
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder={t('admin.buyerGuideForm.titlePlaceholder')}
            />
            <AdminFormField
              label={t('admin.buyerGuideForm.slug')}
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              disabled
              placeholder={t('admin.buyerGuideForm.slugPlaceholder')}
              help={t('admin.buyerGuideForm.slugHelp')}
            />
            <ImageUpload
              label={t('admin.buyerGuideForm.imageUrl')}
              name="image"
              value={formData.image}
              onChange={handleChange}
              folder="buyer-guides"
            />
            <AdminFormField
              label={t('admin.buyerGuideForm.readTime')}
              name="read_time"
              value={formData.read_time}
              onChange={handleChange}
              placeholder={t('admin.buyerGuideForm.readTimePlaceholder')}
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.buyerGuideForm.content')}</h2>
          <div className="space-y-5">
            <AdminFormField
              label={t('admin.buyerGuideForm.description')}
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder={t('admin.buyerGuideForm.descriptionPlaceholder')}
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.buyerGuideForm.styling')}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <AdminFormField
              label={t('admin.buyerGuideForm.tag')}
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder={t('admin.buyerGuideForm.tagPlaceholder')}
              help={t('admin.buyerGuideForm.tagHelp')}
            />
            <AdminFormField
              label={t('admin.buyerGuideForm.tagColor')}
              name="tag_color"
              value={formData.tag_color}
              onChange={handleChange}
              placeholder={t('admin.buyerGuideForm.tagColorPlaceholder')}
              help={t('admin.buyerGuideForm.tagColorHelp')}
            />
            <AdminFormField
              label={t('admin.buyerGuideForm.borderColor')}
              name="border_color"
              value={formData.border_color}
              onChange={handleChange}
              placeholder={t('admin.buyerGuideForm.borderColorPlaceholder')}
              help={t('admin.buyerGuideForm.borderColorHelp')}
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.buyerGuideForm.settings')}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminFormField
              label={t('admin.buyerGuideForm.sortOrder')}
              name="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={handleChange}
              placeholder="0"
              help={t('admin.buyerGuideForm.sortOrderHelp')}
            />
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
                {isEdit ? t('admin.common.save') : t('admin.common.create')}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/buyer-guides')}
            className="rounded-lg border border-estate-200 bg-white px-6 py-2.5 text-sm font-medium text-estate-700 transition-colors hover:bg-estate-50"
          >
            {t('admin.common.cancel')}
          </button>
        </div>
      </form>
    </div>
  )
}
