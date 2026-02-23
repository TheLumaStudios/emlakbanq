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
  title: {},
  slug: '',
  description: {},
  image: '',
  tag: {},
  tag_color: '',
  border_color: '',
  read_time: {},
  sort_order: 0,
}

// Extract English text from JSONB or plain string
function toJsonb(field) {
  if (!field) return {}
  if (typeof field === 'string') return { en: field }
  return field
}

export default function BuyerGuideForm() {
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
      const loaded = {
        title: toJsonb(data.title),
        slug: data.slug || '',
        description: toJsonb(data.description),
        image: data.image || '',
        tag: toJsonb(data.tag),
        tag_color: data.tag_color || '',
        border_color: data.border_color || '',
        read_time: toJsonb(data.read_time),
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
      // Auto-generate slug from English title
      if (name === 'title') {
        const enTitle = typeof value === 'object' ? (value.en || '') : value
        if (!prev.slug || prev.slug === generateSlug(typeof prev.title === 'object' ? (prev.title.en || '') : prev.title)) {
          updated.slug = generateSlug(enTitle)
        }
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Ensure slug is unique
    let finalSlug = formData.slug
    let counter = 1
    let slugExists = true
    let testSlug = finalSlug

    while (slugExists) {
      let query = supabase
        .from('buyer_guides')
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

    const payload = {
      title: formData.title,
      slug: finalSlug,
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

    toast.success(t('admin.common.savedSuccessfully'))
    markClean()
    setSaving(false)
    navigate('/admin/buyer-guides')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-blue-500" />
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
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            }
            title={t('admin.buyerGuideForm.basicInfo')}
          />
          <div className="space-y-5">
            <MultilingualInput
              label={t('admin.buyerGuideForm.title')}
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder={t('admin.buyerGuideForm.titlePlaceholder')}
            />
            <div className="grid gap-5 sm:grid-cols-2">
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
              <AdminFormField
                label={t('admin.buyerGuideForm.readTime')}
                name="read_time_display"
                value={typeof formData.read_time === 'object' ? (formData.read_time.en || '') : formData.read_time}
                onChange={(_, v) => {
                  // Keep read_time as plain string for simple cases, or update en key
                  handleChange('read_time', typeof formData.read_time === 'object'
                    ? { ...formData.read_time, en: v }
                    : v
                  )
                }}
                placeholder={t('admin.buyerGuideForm.readTimePlaceholder')}
              />
            </div>
            <ImageUpload
              label={t('admin.buyerGuideForm.imageUrl')}
              name="image"
              value={formData.image}
              onChange={handleChange}
              folder="buyer-guides"
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            }
            title={t('admin.buyerGuideForm.content')}
          />
          <div className="space-y-5">
            <MultilingualInput
              label={t('admin.buyerGuideForm.description')}
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder={t('admin.buyerGuideForm.descriptionPlaceholder')}
            />
            <MultilingualInput
              label={t('admin.buyerGuideForm.tag')}
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder={t('admin.buyerGuideForm.tagPlaceholder')}
              help={t('admin.buyerGuideForm.tagHelp')}
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            }
            title={t('admin.buyerGuideForm.styling')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
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
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title={t('admin.buyerGuideForm.settings')}
          />
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
