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
  excerpt: {},
  content: {},
  image: '',
  category: {},
  category_color: '',
  date: '',
  published: true,
  published_at: '',
  sort_order: 0,
}

export default function BlogForm() {
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
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      setError(t('admin.blog.notFound'))
    } else if (data) {
      const loaded = {
        title: data.title || {},
        slug: data.slug || '',
        excerpt: data.excerpt || {},
        content: data.content || {},
        image: data.image || '',
        category: data.category || {},
        category_color: data.category_color || '',
        date: data.date || '',
        published: data.published ?? true,
        published_at: data.published_at || '',
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
      if (name === 'title' && value.en) {
        const prevEnglishTitle = prev.title?.en || ''
        if (!prev.slug || prev.slug === generateSlug(prevEnglishTitle)) {
          updated.slug = generateSlug(value.en)
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
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
      category: formData.category,
      category_color: formData.category_color,
      date: formData.date,
      published: formData.published,
      published_at: formData.published_at || null,
      sort_order: parseInt(formData.sort_order, 10) || 0,
    }

    let result
    if (isEdit) {
      result = await supabase
        .from('blog_posts')
        .update(payload)
        .eq('id', id)
    } else {
      result = await supabase
        .from('blog_posts')
        .insert(payload)
    }

    if (result.error) {
      console.error('Error saving blog post:', result.error)
      setError(result.error.message || t('admin.blog.failedToSave'))
      setSaving(false)
      return
    }

    toast.success(t('admin.common.savedSuccessfully'))
    markClean()
    setSaving(false)
    navigate('/admin/blog')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-blue-500" />
          <p className="text-sm text-estate-400">{t('admin.blog.loadingPost')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/admin/blog"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-estate-500 transition-colors hover:text-estate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('admin.blog.backToBlog')}
      </Link>

      {/* Title */}
      <h1 className="mb-6 font-heading text-2xl font-bold text-estate-900">
        {isEdit ? t('admin.blog.editPost') : t('admin.blog.addPost')}
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
            title={t('admin.blogForm.basicInfo')}
          />
          <div className="space-y-6">
            {/* Blog Title - All Languages */}
            <MultilingualInput
              label={t('admin.blogForm.title')}
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder={t('admin.blogForm.titlePlaceholder')}
              help={t('admin.blogForm.titleHelp')}
            />

            {/* Slug */}
            <AdminFormField
              label={t('admin.blogForm.slug')}
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              disabled
              placeholder={t('admin.blogForm.slugPlaceholder')}
              help={t('admin.blogForm.slugHelp')}
            />

            {/* Category - All Languages */}
            <MultilingualInput
              label={t('admin.blogForm.category')}
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder={t('admin.blogForm.categoryPlaceholder')}
              help={t('admin.blogForm.categoryHelp')}
            />

            {/* Other fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField
                label={t('admin.blogForm.categoryColor')}
                name="category_color"
                value={formData.category_color}
                onChange={handleChange}
                placeholder={t('admin.blogForm.categoryColorPlaceholder')}
                help={t('admin.blogForm.categoryColorHelp')}
              />
              <AdminFormField
                label={t('admin.blogForm.date')}
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder={t('admin.blogForm.datePlaceholder')}
                help={t('admin.blogForm.dateHelp')}
              />
              <ImageUpload
                label={t('admin.blogForm.imageUrl')}
                name="image"
                value={formData.image}
                onChange={handleChange}
                folder="blog"
              />
              <AdminFormField
                label={t('admin.blogForm.publishedAt')}
                name="published_at"
                value={formData.published_at}
                onChange={handleChange}
                placeholder={t('admin.blogForm.publishedAtPlaceholder')}
                help={t('admin.blogForm.publishedAtHelp')}
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
            title={t('admin.blogForm.content')}
          />
          <div className="space-y-6">
            {/* Excerpt - All Languages */}
            <MultilingualInput
              label={t('admin.blogForm.excerpt')}
              name="excerpt"
              type="textarea"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder={t('admin.blogForm.excerptPlaceholder')}
              help={t('admin.blogForm.excerptHelp')}
            />

            {/* Content - All Languages */}
            <MultilingualInput
              label={t('admin.blogForm.fullContent')}
              name="content"
              type="textarea"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              placeholder={t('admin.blogForm.contentPlaceholder')}
              help={t('admin.blogForm.contentHelp')}
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
            title={t('admin.blogForm.settings')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminFormField
              label={t('admin.blogForm.sortOrder')}
              name="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={handleChange}
              placeholder={t('admin.blogForm.sortOrderPlaceholder')}
              help={t('admin.blogForm.sortOrderHelp')}
            />
            <div className="flex items-end">
              <AdminFormField
                label={t('admin.blogForm.published')}
                name="published"
                type="checkbox"
                value={formData.published}
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
                  {isEdit ? t('admin.blogForm.updatePost') : t('admin.blogForm.createPost')}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/blog')}
              className="rounded-lg border border-estate-200 bg-white px-6 py-2.5 text-sm font-medium text-estate-700 transition-colors hover:bg-estate-50"
            >
              {t('admin.blogForm.cancel')}
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
